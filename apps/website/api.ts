/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as fs from "node:fs";

import {
	type CallExpression,
	type JSDoc,
	type JSDocableNode,
	Project,
	type PropertySignature,
	type SourceFile,
	SyntaxKind,
	type Symbol as TSMorphSymbol,
	type Type as TSMorphType,
	TypeFormatFlags,
	type TypeNode,
} from "ts-morph";

const repoPath = process.env.REPO_PATH || "../..";

const packageNames = [
	"@stratakit/mui",
	"@stratakit/foundations",
	"@stratakit/bricks",
	"@stratakit/structures",
];

const baseTypeNames = ["BaseProps", "FocusableProps"];
const utilityFunctions = ["loadFoundationsStyles"];

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
		reexport?: Reexport;
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
		deprecated?: string | boolean;
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
		deprecated?: string | boolean;
	}

	export interface Reexport {
		packageName: string;
		apiName: string;
	}
}

function extractMuiMaterialComponents(
	project: Project,
): Api.Package | undefined {
	// Ensure types.ts augmentations are loaded
	const typesPath = `${repoPath}/packages/mui/src/types.ts`;
	if (fs.existsSync(typesPath)) {
		try {
			project.addSourceFilesAtPaths([typesPath]);
		} catch {
			// Continue even if types.ts can't be added
		}
	}

	// Extract MUI Material components (126 stable components)
	// Excludes: utilities (hooks, generators), non-UI exports (constants), and experimental/unstable components
	const muiMaterialComponents = [
		"Accordion",
		"AccordionActions",
		"AccordionDetails",
		"AccordionSummary",
		"Alert",
		"AlertTitle",
		"AppBar",
		"Autocomplete",
		"Avatar",
		"AvatarGroup",
		"Backdrop",
		"Badge",
		"BottomNavigation",
		"BottomNavigationAction",
		"Box",
		"Breadcrumbs",
		"Button",
		"ButtonBase",
		"ButtonGroup",
		"Card",
		"CardActionArea",
		"CardActions",
		"CardContent",
		"CardHeader",
		"CardMedia",
		"Checkbox",
		"Chip",
		"CircularProgress",
		"Collapse",
		"Container",
		"CssBaseline",
		"Dialog",
		"DialogActions",
		"DialogContent",
		"DialogContentText",
		"DialogTitle",
		"Divider",
		"Drawer",
		"Fab",
		"Fade",
		"FilledInput",
		"FormControl",
		"FormControlLabel",
		"FormGroup",
		"FormHelperText",
		"FormLabel",
		"GlobalStyles",
		"Grid",
		"Grow",
		"Icon",
		"IconButton",
		"ImageList",
		"ImageListItem",
		"ImageListItemBar",
		"InitColorSchemeScript",
		"Input",
		"InputAdornment",
		"InputBase",
		"InputLabel",
		"LinearProgress",
		"Link",
		"List",
		"ListItem",
		"ListItemAvatar",
		"ListItemButton",
		"ListItemIcon",
		"ListItemSecondaryAction",
		"ListItemText",
		"ListSubheader",
		"Menu",
		"MenuItem",
		"MenuList",
		"MobileStepper",
		"Modal",
		"NativeSelect",
		"OutlinedInput",
		"Pagination",
		"PaginationItem",
		"Paper",
		"Popover",
		"Popper",
		"Radio",
		"RadioGroup",
		"Rating",
		"ScopedCssBaseline",
		"Select",
		"Skeleton",
		"Slide",
		"Slider",
		"Snackbar",
		"SnackbarContent",
		"SpeedDial",
		"SpeedDialAction",
		"SpeedDialIcon",
		"Stack",
		"Step",
		"StepButton",
		"StepConnector",
		"StepContent",
		"StepIcon",
		"StepLabel",
		"Stepper",
		"SvgIcon",
		"SwipeableDrawer",
		"Switch",
		"Tab",
		"TabScrollButton",
		"Table",
		"TableBody",
		"TableCell",
		"TableContainer",
		"TableFooter",
		"TableHead",
		"TablePagination",
		"TablePaginationActions",
		"TableRow",
		"TableSortLabel",
		"Tabs",
		"TextField",
		"TextareaAutosize",
		"ToggleButton",
		"ToggleButtonGroup",
		"Toolbar",
		"Tooltip",
		"Typography",
		"Zoom",
	];

	// Add @mui/material type files from packages/mui/node_modules/@mui/material
	const muiMaterialPath = `${repoPath}/packages/mui/node_modules/@mui/material`;
	const sourceFilePaths: string[] = [];

	// Load component files - prioritize ComponentName.d.ts over index.d.ts
	for (const componentName of muiMaterialComponents) {
		const componentDtsPath = `${muiMaterialPath}/${componentName}/${componentName}.d.ts`;
		if (fs.existsSync(componentDtsPath)) {
			sourceFilePaths.push(componentDtsPath);
		}
	}

	// Then load index.d.ts files as fallback
	for (const componentName of muiMaterialComponents) {
		const indexPath = `${muiMaterialPath}/${componentName}/index.d.ts`;
		if (fs.existsSync(indexPath)) {
			const componentDtsPath = `${muiMaterialPath}/${componentName}/${componentName}.d.ts`;
			// Only add if we didn't already add the component.d.ts file
			if (!fs.existsSync(componentDtsPath)) {
				sourceFilePaths.push(indexPath);
			}
		}
	}

	// Load dependency files needed for type resolution
	const depPaths = [
		`${muiMaterialPath}/styles/index.d.ts`,
		`${muiMaterialPath}/ButtonBase/index.d.ts`,
		`${muiMaterialPath}/OverridableComponent/index.d.ts`,
	];
	for (const depPath of depPaths) {
		if (fs.existsSync(depPath)) {
			sourceFilePaths.push(depPath);
		}
	}

	// Resolve symlinks to real paths in the pnpm virtual store before adding to the
	// project. The symlinked paths (packages/mui/node_modules/@mui/material/...) walk
	// up through a node_modules tree where transitive deps like @mui/types are absent.
	// The real paths in .pnpm land in a node_modules directory that has @mui/types as
	// a sibling, so TypeScript's module resolution can find it automatically.
	const resolvedSourceFilePaths = sourceFilePaths.map((p) => {
		try {
			return fs.realpathSync(p);
		} catch {
			return p;
		}
	});

	// Add all source files to the project
	if (resolvedSourceFilePaths.length > 0) {
		project.addSourceFilesAtPaths(resolvedSourceFilePaths);
	}

	// Extract components
	const apis: Api.Api[] = [];
	for (const componentName of muiMaterialComponents) {
		try {
			const component = extractMuiComponent(project, componentName);
			if (component) {
				apis.push({
					name: componentName,
					composition: [component],
					exportName: componentName,
				});
			}
		} catch (error) {
			console.error(`Failed to extract ${componentName}`, error);
		}
	}

	return apis.length > 0 ? { name: "@mui/material", apis } : undefined;
}

function extractMuiComponent(
	project: Project,
	componentName: string,
): Api.Component | undefined {
	try {
		const sourceFiles = project.getSourceFiles();
		let componentSourceFile: SourceFile | undefined;

		// Find source file for @mui/material/ComponentName
		// Prefer ComponentName.d.ts over index.d.ts since index.d.ts just re-exports
		for (const sourceFile of sourceFiles) {
			const filePath = sourceFile.getFilePath().replace(/\\/g, "/");

			// Match @mui/material/ComponentName/ComponentName.d.ts first
			if (
				filePath.includes(`/@mui/material/${componentName}/`) &&
				filePath.endsWith(`${componentName}.d.ts`)
			) {
				componentSourceFile = sourceFile;
				break;
			}
		}

		// If not found, try index.d.ts
		if (!componentSourceFile) {
			for (const sourceFile of sourceFiles) {
				const filePath = sourceFile.getFilePath().replace(/\\/g, "/");

				if (
					filePath.includes(`/@mui/material/${componentName}/`) &&
					filePath.endsWith("index.d.ts")
				) {
					componentSourceFile = sourceFile;
					break;
				}
			}
		}

		if (!componentSourceFile) {
			console.warn(`[MUI Extract] Source file not found for ${componentName}`);
			return undefined;
		}

		// Extract props from the component, using StrataKit's types.ts augmentations
		const typesSourceFile = project
			.getSourceFiles()
			.find((f) => f.getFilePath().includes("/packages/mui/src/types.ts"));
		const strataKitProps = typesSourceFile
			? buildStrataKitAugmentedPropsMap(typesSourceFile, componentName)
			: new Map<string, PropertySignature>();
		const props = extractMuiComponentProps(
			componentSourceFile,
			componentName,
			strataKitProps,
		);

		// Extract JSDoc and deprecated flag from the exported symbol
		let jsdoc: JSDoc | undefined;
		let deprecated: string | boolean = false;
		try {
			const exportSymbols = componentSourceFile.getExportSymbols();
			const exportedSymbol = exportSymbols.find(
				(sym) => sym.getName() === componentName,
			);
			if (exportedSymbol) {
				const declaration = exportedSymbol.getDeclarations()[0];
				if (declaration && "getJsDocs" in declaration) {
					const jsDocableNode = declaration as JSDocableNode;
					jsdoc = jsDocableNode.getJsDocs().at(0);
					deprecated = getDeprecated(jsDocableNode);
				}
			}
		} catch (error) {
			console.warn(
				`[MUI Extract] Failed to extract JSDoc for ${componentName}: ${error}`,
			);
		}

		return {
			name: componentName,
			baseProps: [],
			props,
			jsdoc: getJsdocComment(jsdoc),
			...(deprecated ? { deprecated } : {}),
		} satisfies Api.Component;
	} catch (error) {
		console.error(
			`[MUI Extract] Error in extractMuiComponent(${componentName}): ${error}`,
		);
		return undefined;
	}
}

function extractMuiComponentProps(
	sourceFile: SourceFile,
	componentName: string,
	strataKitProps: Map<string, PropertySignature>,
): Api.Prop[] {
	// Strategy 1: Try virtual type extraction via React.ComponentProps
	// This follows the actual component type dependencies
	const virtualProps = extractMuiComponentPropsViaVirtualType(
		sourceFile,
		componentName,
		strataKitProps,
	);
	if (virtualProps.length > 0) {
		return virtualProps;
	}

	// Strategy 2: Fallback to named type patterns (OwnProps, ComponentProps, etc.)
	// This is faster and handles components with simpler patterns
	const namedProps = extractMuiComponentPropsViaNamedTypes(
		sourceFile,
		componentName,
		strataKitProps,
	);
	return namedProps;
}

function extractMuiComponentPropsViaVirtualType(
	sourceFile: SourceFile,
	componentName: string,
	strataKitProps: Map<string, PropertySignature>,
): Api.Prop[] {
	const project = sourceFile.getProject();
	const componentDir = sourceFile.getDirectory().getPath();
	const tempFilePath = `${componentDir}/__extract_${componentName}_props__.ts`;

	let tempFile: SourceFile | undefined;

	try {
		// Write a temporary extraction helper to disk
		// This allows natural module resolution and type evaluation
		const extractorCode = `import { ${componentName} } from './${componentName}';
type _ExtractedProps = React.ComponentProps<typeof ${componentName}>;
export type { _ExtractedProps };`;

		fs.writeFileSync(tempFilePath, extractorCode);

		// Add the temp file to the project
		tempFile = project.addSourceFileAtPath(tempFilePath);

		// Extract the type alias
		const typeAlias = tempFile.getTypeAliasOrThrow("_ExtractedProps");
		const resolvedType = typeAlias.getType();

		// Check if the type resolved meaningfully
		const typeText = resolvedType.getText();
		if (typeText === "never" || typeText === "unknown" || typeText === "any") {
			return [];
		}

		// Extract properties from the resolved type
		const properties = resolvedType.getProperties();
		const props: Api.Prop[] = [];

		for (const property of properties) {
			const name = property.getName();
			const optional = property.isOptional();

			// Get the property type at the type alias location
			const propertyType = property.getTypeAtLocation(typeAlias);
			const type = getPropType(propertyType);

			const {
				comment,
				defaultValue,
				deprecated: propDeprecated,
			} = getMuiPropJsdocData(property, strataKitProps);

			props.push({
				name,
				type,
				optional,
				jsdoc: comment,
				defaultValue,
				...(propDeprecated ? { deprecated: propDeprecated } : {}),
			});
		}

		// Sort: required first, then alphabetically
		return props.sort((a, b) => {
			if (a.optional !== b.optional) return a.optional ? 1 : -1;
			return a.name.localeCompare(b.name);
		});
	} catch {
		// Virtual type extraction failed, will fallback to named types
		return [];
	} finally {
		// Clean up
		if (tempFile) {
			project.removeSourceFile(tempFile);
		}
		if (fs.existsSync(tempFilePath)) {
			fs.unlinkSync(tempFilePath);
		}
	}
}

function extractMuiComponentPropsViaNamedTypes(
	sourceFile: SourceFile,
	componentName: string,
	strataKitProps: Map<string, PropertySignature>,
): Api.Prop[] {
	const props: Api.Prop[] = [];

	// Strategy 2a: Try ComponentNameOwnProps interface
	let ownPropsInterface = sourceFile.getInterface(`${componentName}OwnProps`);

	// Strategy 2b: Try ComponentNameProps type alias
	let propsTypeAlias =
		ownPropsInterface === undefined
			? sourceFile.getTypeAlias(`${componentName}Props`)
			: undefined;

	// Strategy 2c: Try any exported type with "Props" that contains component name
	if (!ownPropsInterface && !propsTypeAlias) {
		const exportSymbols = sourceFile.getExportSymbols();
		const propsSymbol = exportSymbols.find((sym) => {
			const name = sym.getName();
			// Match: AlertProps, StandardTextFieldProps, OutlinedTextFieldProps, etc.
			return (
				name.endsWith("Props") &&
				name.toLowerCase().includes(componentName.toLowerCase())
			);
		});

		if (propsSymbol) {
			const decl = propsSymbol.getDeclarations().at(0);
			// Try to get as type alias or interface
			if (decl) {
				const typeAlias = sourceFile.getTypeAlias(propsSymbol.getName());
				if (typeAlias) {
					propsTypeAlias = typeAlias;
				} else {
					const iface = sourceFile.getInterface(propsSymbol.getName());
					if (iface) {
						ownPropsInterface = iface;
					}
				}
			}
		}
	}

	// Get properties from whichever we found
	let properties: TSMorphSymbol[] = [];

	try {
		if (ownPropsInterface) {
			properties = ownPropsInterface.getType().getProperties();
		} else if (propsTypeAlias) {
			const typeNode = propsTypeAlias.getTypeNodeOrThrow();
			properties = typeNode.getType().getProperties();
		} else {
			return [];
		}
	} catch (err) {
		console.warn(
			`[MUI Extract] Type resolution failed for ${componentName} named types: ${err}`,
		);
		return [];
	}

	// Extract props from the properties
	for (const property of properties) {
		const name = property.getName();
		const optional = property.isOptional();

		// Get the property type at the location
		const location = ownPropsInterface ?? propsTypeAlias;
		if (!location) {
			throw new Error(
				`Missing ownProps and propTypeAlias for ${componentName}`,
			);
		}
		const propertyType = property.getTypeAtLocation(location);
		const type = getPropType(propertyType);

		const {
			comment,
			defaultValue,
			deprecated: propDeprecated,
		} = getMuiPropJsdocData(property, strataKitProps);

		props.push({
			name,
			type,
			optional,
			jsdoc: comment,
			defaultValue,
			...(propDeprecated ? { deprecated: propDeprecated } : {}),
		});
	}

	// Sort: required first, then alphabetically
	return props.sort((a, b) => {
		if (a.optional !== b.optional) return a.optional ? 1 : -1;
		return a.name.localeCompare(b.name);
	});
}

/**
 * Builds a map of prop name → PropertySignature from StrataKit's types.ts
 * module augmentations for the given component. Component-specific props
 * take priority over shared props from OverridableComponent.
 */
function buildStrataKitAugmentedPropsMap(
	typesSourceFile: SourceFile,
	componentName: string,
): Map<string, PropertySignature> {
	const result = new Map<string, PropertySignature>();

	for (const mod of typesSourceFile.getModules()) {
		const modName = mod.getName().replace(/["']/g, "");
		const isComponentModule = modName === `@mui/material/${componentName}`;
		// OverridableComponent augments CommonProps with shared props (render, component)
		const isSharedModule = modName === "@mui/material/OverridableComponent";

		if (!isComponentModule && !isSharedModule) continue;

		for (const iface of mod.getInterfaces()) {
			for (const prop of iface.getProperties()) {
				// Component-specific props overwrite shared props
				if (!result.has(prop.getName()) || isComponentModule) {
					result.set(prop.getName(), prop);
				}
			}
		}
	}

	return result;
}

interface MuiPropJsdocData {
	comment: string | undefined;
	defaultValue: string | undefined;
	deprecated: string | boolean;
}

function getMuiPropJsdocData(
	property: TSMorphSymbol,
	strataKitProps: Map<string, PropertySignature>,
): MuiPropJsdocData {
	// Look up the StrataKit override directly from types.ts module augmentation
	const strataKitJsdoc = strataKitProps
		.get(property.getName())
		?.getJsDocs()
		.at(0);

	// Fall back to MUI's original declaration
	const muiJsdoc = property
		.getDeclarations()
		.find(
			(node): node is PropertySignature =>
				!!node.asKind(SyntaxKind.PropertySignature),
		)
		?.getJsDocs()
		.at(0);

	const getDefault = (jsdoc: JSDoc | undefined) =>
		jsdoc
			?.getTags()
			.find((tag) => tag.getTagName() === "default")
			?.getCommentText();

	const isDeprecated = (jsdoc: JSDoc | undefined): string | boolean => {
		const tag = jsdoc
			?.getTags()
			.find((tag) => tag.getTagName() === "deprecated");
		if (!tag) return false;
		return tag.getCommentText() || true;
	};

	return {
		comment: getJsdocComment(strataKitJsdoc) ?? getJsdocComment(muiJsdoc),
		defaultValue: getDefault(strataKitJsdoc) ?? getDefault(muiJsdoc),
		deprecated: isDeprecated(strataKitJsdoc) || isDeprecated(muiJsdoc),
	};
}

function generateApi() {
	const packages: Api = [];
	let muiProject: Project | undefined;

	for (const packageName of packageNames) {
		const dirName = packageName.replace(/^@stratakit\//, "");
		const packageDir = `${repoPath}/packages/${dirName}`;
		const project = new Project({
			tsConfigFilePath: `${packageDir}/tsconfig.json`,
		});

		// Store the mui project for later use in extracting @mui/material components
		if (packageName === "@stratakit/mui") {
			muiProject = project;
		}

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
				if (key === "./types.d.ts") return false;
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

				function addApi() {
					apis.push({
						name: moduleName,
						composition: [],
					});
					return apis[apis.length - 1];
				}

				const reexport = getReexport(barrelExport);
				if (reexport) {
					api = api ?? addApi();
					api.reexport = reexport;
					continue;
				}

				if (!component) {
					// Handle components that are not exported by subpath exports
					component = getComponent({
						exportSymbol,
					});
					if (!component) continue;

					api = api ?? addApi();
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

	// Extract @mui/material components using the mui project
	// This ensures type augmentations from packages/mui/src/types.ts are applied
	if (muiProject) {
		const muiMaterialPackage = extractMuiMaterialComponents(muiProject);
		if (muiMaterialPackage) {
			packages.push(muiMaterialPackage);
		}
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

function getReexport(symbol: TSMorphSymbol): Api.Reexport | undefined {
	const alias = symbol.getAliasedSymbol();
	if (!alias) return undefined;

	const aliasDeclaration = alias.getDeclarations().at(0);
	if (!aliasDeclaration) return undefined;

	const packageName = getPackageNameFromFilePath(symbol);
	const aliasPackageName = getPackageNameFromFilePath(alias);

	if (!aliasPackageName) return undefined;
	if (packageName === aliasPackageName) return undefined;
	return {
		packageName: aliasPackageName,
		apiName: alias.getName(),
	};
}

function getPackageNameFromFilePath(symbol: TSMorphSymbol) {
	const name = symbol.getFullyQualifiedName();
	const match = name.match(/\/packages\/([^/]+)\//);
	return match ? `@stratakit/${match[1]}` : undefined;
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
	const exportSymbols = allExportSymbols
		// Exclude default export, which is extracted as a convenience component.
		.filter((symbol) => symbol !== defaultExportSymbol)
		// Sort by source order, instead of order in the export declaration.
		.sort((a, b) => {
			const aPos = getSymbolSourcePos(sourceFile, a);
			const bPos = getSymbolSourcePos(sourceFile, b);
			return aPos - bPos;
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

/** Returns the earliest position of the symbol declaration in the specific source file. */
function getSymbolSourcePos(sourceFile: SourceFile, symbol: TSMorphSymbol) {
	const aliasedSymbol = symbol.getAliasedSymbol();
	const declarations = [
		...symbol.getDeclarations(),
		...(aliasedSymbol?.getDeclarations() ?? []),
	];
	return declarations.reduce((pos, decl) => {
		if (decl.getSourceFile() !== sourceFile) return pos;
		return Math.min(pos, decl.getPos());
	}, Infinity);
}

function getComponent({ exportSymbol }: { exportSymbol: TSMorphSymbol }) {
	// Use aliased symbol for `export { X as Y };` OR default export.
	const aliasedSymbol = exportSymbol.getAliasedSymbol();
	// Use export symbol for direct exports `export const X = ...;`
	const symbol = aliasedSymbol ?? exportSymbol;

	const localName = symbol.getName();
	// TODO: handle utility functions
	if (utilityFunctions.includes(localName)) return;

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
	const deprecated = statement ? getDeprecated(statement) : false;
	return {
		name,
		baseProps,
		props,
		baseElement,
		jsdoc: getJsdocComment(jsdoc),
		deprecated,
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

function getDeprecated(node: JSDocableNode): string | boolean {
	const jsdoc = node.getJsDocs().at(0);
	if (!jsdoc) return false;
	const deprecated = jsdoc
		.getTags()
		.find((tag) => tag.getTagName() === "deprecated");
	if (!deprecated) return false;
	return deprecated.getCommentText() || true;
}

generateApi();

export type { Api };
