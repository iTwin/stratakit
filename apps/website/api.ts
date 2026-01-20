/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as fs from "node:fs";
import {
	type CallExpression,
	type JSDoc,
	Project,
	type PropertySignature,
	type SourceFile,
	SyntaxKind,
	type Symbol as TSMorphSymbol,
	type Type as TSMorphType,
	TypeFormatFlags,
	type TypeNode,
} from "ts-morph";

const repoPath = process.env.REPO_PATH || "../design-system";
const packageNames = ["foundations", "bricks", "structures"];

const baseTypeNames = ["BaseProps", "FocusableProps"];

type Api = Api.Package[];

namespace Api {
	export interface Package {
		name: string;
		apis: Api[];
	}

	export interface Api {
		name: string;
		description?: string;
		exportName?: string;
		convenience?: Component;
		composition: Component[];
		types?: Type[];
	}

	export interface Component {
		name: string;
		props: Prop[];
		baseProps: string[];
		baseElement?: string;
		jsdoc?: string;
		/**
		 * The name used in barrel exports.
		 * Dot separated if star export: `unstable_ErrorRegion.Root`
		 */
		barrelName?: string;
	}

	export interface Type {
		name: string;
		props: Prop[];
		jsdoc?: string;
	}

	export interface Prop {
		name: string;
		type: string;
		optional: boolean;
		jsdoc?: string;
		defaultValue?: string;
	}
}

function generateApi() {
	const packages: Api = [];

	for (const packageName of packageNames) {
		const packageDir = `${repoPath}/packages/${packageName}`;
		const project = new Project({
			tsConfigFilePath: `${packageDir}/tsconfig.json`,
		});

		const utilsSourceFiles = [
			project.getSourceFile("~utils.d.ts"),
			project.getSourceFile("~utils.tsx"),
		];
		utilsSourceFiles.forEach((sourceFile) => {
			if (!sourceFile) return;
			const mergeProps = sourceFile.getTypeAliasOrThrow("MergeProps");
			// Omits underlying element props
			mergeProps.replaceWithText(
				"type MergeProps<ElementType extends React.ElementType, CustomProps extends Record<string, unknown>> = CustomProps",
			);
		});

		// Read subpath exports
		const packageJsonStr = fs.readFileSync(
			`${packageDir}/package.json`,
			"utf-8",
		);
		const { exports: packageExports } = JSON.parse(packageJsonStr) as {
			exports: { [key: string]: string };
		};
		const subpaths = Object.entries(packageExports)
			.filter(([key]) => {
				if (key === ".") return false;
				if (key === "./secret-internals") return false;
				if (key.endsWith(".json")) return false;
				return true;
			})
			.map(([key]) => {
				const exportName = key.replace("./", "");
				const fileName = exportName.replace("unstable_", "");
				return {
					fileName,
					exportName,
				};
			});

		const apis: Api.Api[] = [];
		for (const { fileName, exportName } of subpaths) {
			const sourceFile = project.getSourceFileOrThrow(`${fileName}.tsx`);
			const convenience = getConvenienceComponent({
				sourceFile,
			});
			const composition = getCompositionComponents({
				sourceFile,
			});

			apis.push({
				name: fileName,
				convenience,
				composition,
				exportName,
			});
		}

		const barrel = project.getSourceFileOrThrow("index.ts");
		const barrelExports = barrel.getExportSymbols();
		for (const barrelExport of barrelExports) {
			const barrelName = barrelExport.getName();

			const barrelExportAlias = barrelExport.getAliasedSymbol();
			if (!barrelExportAlias) continue;

			// Handle star exports from submodules: `export * as ErrorRegion from ...`
			const aliasedExports = barrelExportAlias.getExports();
			const exports =
				aliasedExports.length > 0 ? aliasedExports : [barrelExportAlias];

			for (const exportSymbol of exports) {
				const exportName = exportSymbol.getName();

				const declaration = exportSymbol.getDeclarations().at(0);
				if (!declaration) continue;

				const sourceFile = declaration.getSourceFile();
				const moduleName = sourceFile.getBaseNameWithoutExtension();
				const fullBarrelName =
					aliasedExports.length > 0
						? `${barrelName}.${exportName}`
						: barrelName;

				let api = apis.find((api) => api.name === moduleName);
				const components = [
					...(api?.convenience ? [api.convenience] : []),
					...(api?.composition ?? []),
				];
				let component = components.find((comp) => comp.name === exportName);

				if (!component) {
					// Handle components that are not exported by subpath exports
					component = getComponent({
						exportSymbol,
					});
					if (!component) continue;

					if (!api) {
						apis.push({
							name: moduleName,
							convenience: undefined,
							composition: [],
						});
						api = apis[apis.length - 1];
					}
					if (isDefaultExport(exportSymbol)) {
						api.convenience = component;
					} else {
						api.composition.push(component);
					}
				}

				component.barrelName = fullBarrelName;
			}
		}

		const baseTypesApi = getBaseTypesApi({ project, packageName });
		if (baseTypesApi) {
			apis.push(baseTypesApi);
		}

		packages.push({
			name: packageName,
			apis,
		});
	}

	let apiStr = JSON.stringify(packages, null, "\t");
	apiStr = `${apiStr}\n`;
	fs.writeFileSync("./api.json", apiStr);
}

function isDefaultExport(symbol: TSMorphSymbol) {
	const declaration = symbol.getDeclarations()[0];
	const sourceFile = declaration.getSourceFile();
	const defaultExport = sourceFile.getDefaultExportSymbol();
	return defaultExport === symbol;
}

function getConvenienceComponent({ sourceFile }: { sourceFile: SourceFile }) {
	const exportSymbol = sourceFile.getDefaultExportSymbol();
	if (!exportSymbol) return undefined;

	return getComponent({
		exportSymbol,
	});
}

function getCompositionComponents({ sourceFile }: { sourceFile: SourceFile }) {
	const defaultExportSymbol = sourceFile.getDefaultExportSymbol();
	const allExportSymbols = sourceFile.getExportSymbols();
	const exportSymbols = allExportSymbols.filter((symbol) => {
		return symbol !== defaultExportSymbol;
	});

	const composition: Api.Component[] = [];
	for (const exportSymbol of exportSymbols) {
		const component = getComponent({
			exportSymbol,
		});
		if (!component) continue;

		composition.push(component);
	}

	return composition;
}

function getComponent({ exportSymbol }: { exportSymbol: TSMorphSymbol }) {
	// Use aliased symbol for `export { X as Y };` OR default export.
	const aliasedSymbol = exportSymbol.getAliasedSymbol();
	// Use export symbol for direct exports `export const X = ...;`
	const symbol = aliasedSymbol ?? exportSymbol;

	const localName = symbol.getName();
	// TODO: handle utility functions
	if (localName === "loadFoundationsStyles") return;

	const name = isDefaultExport(exportSymbol)
		? symbol.getName()
		: exportSymbol.getName();
	const baseElement = getBaseElement({ symbol });
	const baseProperties = getBaseProperties({ symbol });
	const baseProps = baseProperties.map((bp) => {
		const typeName = getBaseTypeName(bp.baseType);
		const propertyName = bp.property.getName();
		return `${typeName}.${propertyName}`;
	});
	const props = getComponentProps({
		symbol,
		baseProperties: baseProperties.map((bp) => bp.property),
	});
	const declaration = symbol.getDeclarations()[0];
	const statement =
		declaration.getFirstAncestorByKind(SyntaxKind.VariableStatement) ??
		declaration.asKind(SyntaxKind.FunctionDeclaration);
	const jsdoc = statement?.getJsDocs().at(0);
	return {
		name,
		baseProps,
		props,
		baseElement,
		jsdoc: getJsdocComment(jsdoc),
	} satisfies Api.Component;
}

function getBaseElement({ symbol }: { symbol: TSMorphSymbol }) {
	const declaration = symbol.getDeclarations().at(0);
	if (!declaration) return undefined;

	const componentStatement = declaration.getFirstAncestorByKind(
		SyntaxKind.VariableStatement,
	);
	if (!componentStatement) return undefined;

	// Handle `React.memo(forwardRef<"div", BaseProps>)`
	const forwardRef = componentStatement.getFirstDescendant(
		(node): node is CallExpression => {
			return (
				node.getKind() === SyntaxKind.CallExpression &&
				node.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ===
					"forwardRef"
			);
		},
	);
	if (!forwardRef) return undefined;

	const baseElementType = forwardRef.getTypeArguments().at(0);
	const baseElementLiteral = baseElementType?.getFirstDescendantByKind(
		SyntaxKind.StringLiteral,
	);
	const baseElement = baseElementLiteral?.getLiteralText();
	return baseElement;
}

function getBaseProperties({ symbol }: { symbol: TSMorphSymbol }) {
	const declaration = symbol.getDeclarations().at(0);
	if (!declaration) return [];

	const componentStatement = declaration.getFirstAncestorByKind(
		SyntaxKind.VariableStatement,
	);
	if (!componentStatement) return [];

	const forwardRef = componentStatement.getFirstDescendantByKindOrThrow(
		SyntaxKind.CallExpression,
	);
	const propsNode = forwardRef
		.getTypeArguments()
		.at(1)
		?.asKind(SyntaxKind.TypeReference);
	if (!propsNode) return [];

	// Use propsType when `forwardRef<"div", BaseProps>`
	const propsType = propsNode.getType();
	// Alternatively, use base types: `forwardRef<"div", Props>` where `Props` extends `BaseProps`
	const propsBaseTypes = propsType.getBaseTypes();
	const propTypes = [propsType, ...propsBaseTypes];

	const basePropType = propTypes.find((propBaseType) => {
		return getBaseTypeName(propBaseType);
	});
	if (basePropType) {
		return basePropType.getProperties().map((property) => ({
			property,
			baseType: basePropType,
		}));
	}

	// Handle Omit<BaseProps<"div">, "children">
	for (const propType of propTypes) {
		const aliasTypeArguments = propType.getAliasTypeArguments();
		const baseType = aliasTypeArguments.find((aliasTypeArgument) => {
			return getBaseTypeName(aliasTypeArgument);
		});
		if (!baseType) continue;

		const baseTypeProperties = baseType.getProperties();
		const propTypeProperties = propType.getProperties();
		return propTypeProperties
			.filter((prop) => {
				const propName = prop.getName();
				return baseTypeProperties.find((bp) => bp.getName() === propName);
			})
			.map((property) => ({
				property,
				baseType,
			}));
	}
	return [];
}

function getComponentProps({
	symbol,
	baseProperties,
}: {
	symbol: TSMorphSymbol;
	baseProperties: TSMorphSymbol[];
}): Api.Prop[] {
	const declaration = symbol.getDeclarations()[0];
	// Handle function declarations: `DropdownMenuProvider(props: Props) {}`
	const functionDeclaration = declaration.asKind(
		SyntaxKind.FunctionDeclaration,
	);
	const propsParam = functionDeclaration?.getParameters().at(0);

	// Handle variable declarations: `const DropdownMenuItem = forwardRef<"div", Props>(...);`
	const forwardRef = declaration.getFirstDescendant(
		(node): node is CallExpression => {
			if (node.getKind() !== SyntaxKind.CallExpression) return false;
			return (
				node.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ===
				"forwardRef"
			);
		},
	);

	const propsNode =
		propsParam?.getTypeNode() ?? forwardRef?.getTypeArguments()[1];
	if (!propsNode) return [];

	const propsType = propsNode.getType();
	const properties = propsType.getProperties().filter((prop) => {
		return !baseProperties.includes(prop);
	});

	return properties
		.map((property) => {
			const name = property.getName();
			const propertyType = property.getTypeAtLocation(propsNode);
			const signature = property
				.getDeclarations()
				.find(
					(node): node is PropertySignature =>
						!!node.asKind(SyntaxKind.PropertySignature),
				);
			const optional = property.isOptional();
			const type = getPropType(propertyType);
			const jsdoc = signature?.getJsDocs().at(0);
			const defaultValue = jsdoc
				?.getTags()
				.find((tag) => tag.getTagName() === "default")
				?.getCommentText();
			return {
				name,
				type,
				optional,
				jsdoc: getJsdocComment(jsdoc),
				defaultValue,
			};
		})
		.sort((a, b) => {
			if (a.optional !== b.optional) return a.optional ? 1 : -1;
			return a.name.localeCompare(b.name);
		});
}

function getProps({ typeNode }: { typeNode: TypeNode }): Api.Prop[] {
	const typeSymbol = typeNode.getType();
	const properties = typeSymbol.getProperties();

	return properties
		.map((property) => {
			const name = property.getName();
			const propertyType = property.getTypeAtLocation(typeNode);
			const signature = property
				.getDeclarations()
				.find(
					(node): node is PropertySignature =>
						!!node.asKind(SyntaxKind.PropertySignature),
				);
			const optional = property.isOptional();
			const type = getPropType(propertyType);
			const jsdoc = signature?.getJsDocs().at(0);
			const defaultValue = jsdoc
				?.getTags()
				.find((tag) => tag.getTagName() === "default")
				?.getCommentText();
			return {
				name,
				type,
				optional,
				jsdoc: getJsdocComment(jsdoc),
				defaultValue,
			};
		})
		.sort((a, b) => a.name.localeCompare(b.name));
}

function getJsdocComment(jsdoc: JSDoc | undefined) {
	if (!jsdoc) return undefined;

	let comment = jsdoc.getCommentText();
	if (!comment) return undefined;

	// Remove AK `Live examples:` section
	const sourceFile = jsdoc.getSourceFile();
	if (sourceFile.getFilePath().includes("@ariakit")) {
		const liveExamples = comment.indexOf("Live examples:");
		if (liveExamples !== -1) {
			comment = comment.slice(0, liveExamples).trimEnd();
		}
	}

	return comment;
}

function getPropType(propertyType: TSMorphType) {
	const text = propertyType.getText(
		undefined,
		TypeFormatFlags.OmitParameterModifiers,
	);

	// Patch `render` prop type.
	if (text.includes("RenderProp<")) {
		const isUndefined = propertyType
			.getUnionTypes()
			.some((t) => t.isUndefined());
		return `(props: P) => React.ReactNode | React.ReactElement${isUndefined ? " | undefined" : ""}`;
	}

	return text;
}

function getBaseTypesApi({
	project,
	packageName,
}: {
	project: Project;
	packageName: string;
}): Api.Api | undefined {
	if (packageName !== "foundations") return undefined;

	const sourceFile = project.getSourceFile("~utils.tsx");
	if (!sourceFile) return undefined;

	const types = baseTypeNames.map((name) => {
		const typeAlias = sourceFile.getTypeAliasOrThrow(name);
		const symbol = typeAlias.getSymbolOrThrow();
		const typeNode = symbol
			.getDeclarations()[0]
			.asKindOrThrow(SyntaxKind.TypeAliasDeclaration)
			.getTypeNodeOrThrow();
		const props = getProps({
			typeNode,
		});
		const jsdoc = typeAlias?.getJsDocs().at(0);
		return {
			name,
			props,
			jsdoc: getJsdocComment(jsdoc),
		};
	});

	return {
		name: "Utils",
		exportName: "Internal Utils",
		description: "Utility types used by StrataKit components.",
		composition: [],
		types,
	};
}

function getBaseTypeName(type: TSMorphType) {
	return baseTypeNames.find((baseTypeName) => {
		const text = type.getText(
			undefined,
			TypeFormatFlags.OmitParameterModifiers,
		);
		return text.startsWith(baseTypeName);
	});
}

generateApi();

export type { Api };
