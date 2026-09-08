/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { useHref } from "react-router";
import { Divider, IconButton, Link } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Icon } from "@stratakit/mui";
import { useSettingsStore } from "./~settings.tsx";
import { useColorScheme } from "./~utils.tsx";
import { SvgStrataKitLogo } from "./assets/SvgStrataKitLogo.tsx";

import type { LinksFunction, MetaFunction } from "react-router";

import svgComponents from "@stratakit/icons/components.svg";
import svgDeveloper from "@stratakit/icons/developer.svg";
import svgLightbulb from "@stratakit/icons/lightbulb.svg";
import svgMoon from "@stratakit/icons/moon.svg";
import svgSun from "@stratakit/icons/sun.svg";
import svgSwap from "@stratakit/icons/swap.svg";
import svgBentleyWordmark from "./assets/bentley-wordmark.svg";
import svgIcons from "./assets/icons.svg";
import svgTokens from "./assets/tokens.svg";
import styles from "./index.module.css";

// ----------------------------------------------------------------------------

export const meta: MetaFunction = () => {
	return [
		{ title: "StrataKit" },
		{
			name: "description",
			content: "StrataKit is Bentley's open source design system.",
		},
	];
};

export const links: LinksFunction = () => {
	return [{ rel: "canonical", href: "https://stratakit.bentley.com/" }];
};

// ----------------------------------------------------------------------------

const mainContentId = "main-content";

export default function HomePage() {
	return (
		<div className={styles.page}>
			<Header />
			<div className={styles.contentWrapper}>
				<main className={styles.main} tabIndex={-1} id={mainContentId}>
					<HeroSection />
					<GettingStartedSection />
					<StructureSection />
				</main>
				<Footer />
			</div>
		</div>
	);
}

// ----------------------------------------------------------------------------

function Header() {
	return (
		<header className={styles.header}>
			<Button
				className={styles.skipLink}
				nativeButton={false}
				render={<a href={`#${mainContentId}`} />}
			>
				Skip to content
			</Button>

			<p>
				<a href={useHref("/")} className={styles.logoLink}>
					<svg className={styles.bentleyLogo}>
						<use href={`${svgBentleyWordmark}#icon`} />
					</svg>
					<Divider
						orientation="vertical"
						flexItem
						role="presentation"
						render={<span />}
					/>
					<Typography variant="headline-md" render={<span />}>
						StrataKit
					</Typography>
				</a>
			</p>

			<ThemeToggle />
		</header>
	);
}

// ----------------------------------------------------------------------------

function Footer() {
	return (
		<footer className={styles.footer}>
			<Typography>&copy; 2026 Bentley Systems, Incorporated</Typography>

			<ul className={styles.footerList}>
				<li>
					<Link
						className={styles.footerLink}
						href={useHref("/docs/sitemap-0.xml")}
						color="inherit"
					>
						Sitemap
					</Link>
				</li>

				<li>
					<Link
						className={styles.footerLink}
						href="https://github.com/iTwin/stratakit/issues/new/choose"
						color="inherit"
					>
						Report an issue
					</Link>
				</li>
			</ul>
		</footer>
	);
}

// ----------------------------------------------------------------------------

function HeroSection() {
	const headingId = React.useId();

	return (
		<section className={styles.section} aria-labelledby={headingId}>
			<hgroup className={styles.heroHeadingGroup}>
				<Typography
					variant="display-md"
					render={<h1 />}
					id={headingId}
					className={styles.semiBold}
				>
					<Stack direction="column" spacing={3} render={<span />}>
						<Icon render={<SvgStrataKitLogo />} className={styles.strataLogo} />
						StrataKit
					</Stack>
				</Typography>

				<Typography
					variant="display-sm"
					render={<p />}
					className={styles.heroText}
				>
					Build consistent, scalable, and accessible user interfaces. This
					website provides everything you need to understand, set up, and start
					using the design system.
				</Typography>
			</hgroup>

			<ul className={styles.ctaList}>
				<li>
					<Button href={useHref("/docs")} size="large">
						Get started
					</Button>
				</li>
				<li>
					<Button
						href="https://github.com/iTwin/stratakit"
						variant="outlined"
						size="large"
					>
						View source
					</Button>
				</li>
			</ul>
		</section>
	);
}

// ----------------------------------------------------------------------------

function GettingStartedSection() {
	const headingId = React.useId();

	return (
		<section className={styles.section} aria-labelledby={headingId}>
			<Typography
				variant="display-sm"
				render={<h2 />}
				id={headingId}
				className={styles.semiBold}
			>
				Getting Started
			</Typography>

			<ul className={styles.cardList}>
				<li>
					<SectionCard
						title="Introduction"
						icon={`${svgLightbulb}#icon-large`}
						description="Learn the fundamental principles and core philosophies behind the design system."
						href={useHref("/docs")}
					/>
				</li>

				<li>
					<SectionCard
						title="Developer setup"
						icon={`${svgDeveloper}#icon-large`}
						description="Installation guide for React-based projects."
						href={useHref("/docs/getting-started/develop/")}
					/>
				</li>

				<li>
					<SectionCard
						title="Migration"
						icon={`${svgSwap}#icon-large`}
						description="Transitioning from legacy iTwinUI to StrataKit."
						href={useHref(
							"/docs/getting-started/develop/#migrating-from-itwinui",
						)}
					/>
				</li>
			</ul>
		</section>
	);
}

// ----------------------------------------------------------------------------

function StructureSection() {
	const headingId = React.useId();

	return (
		<section className={styles.section} aria-labelledby={headingId}>
			<Typography
				variant="display-sm"
				render={<h2 />}
				id={headingId}
				className={styles.semiBold}
			>
				System Structure
			</Typography>

			<ul className={styles.cardList}>
				<li>
					<SectionCard
						title="Design tokens"
						icon={`${svgTokens}#icon`}
						description="Variables for colors, typography, spacing, and more."
						href={useHref("/tokens")}
					/>
				</li>

				<li>
					<SectionCard
						title="Icons"
						icon={`${svgIcons}#icon`}
						description="Standalone library of 1000+ icons, optimized for different sizes."
						href={useHref("/icons")}
					/>
				</li>

				<li>
					<SectionCard
						title="Components"
						icon={`${svgComponents}#icon-large`}
						description="Browse the complete catalog of production-ready components."
						href={useHref("/docs/components/overview/")}
					/>
				</li>
			</ul>
		</section>
	);
}

// ----------------------------------------------------------------------------

interface SectionCardProps {
	title: string;
	description: string;
	href: string;
	icon: string;
}

function SectionCard(props: SectionCardProps) {
	const { title, description, href, icon } = props;

	return (
		<Card className={styles.card}>
			<CardHeader
				title={
					<CardActionArea render={<a href={href} />} nativeButton={false}>
						<Stack direction="column" spacing={2} render={<span />}>
							<span className={styles.cardIcon}>
								<Icon href={icon} size="large" />
							</span>

							{title}
						</Stack>
					</CardActionArea>
				}
				slotProps={{
					title: {
						render: <h3 />,
					},
				}}
			/>
			<CardContent>
				<Typography variant="body-lg">{description}</Typography>
			</CardContent>
		</Card>
	);
}

// ----------------------------------------------------------------------------

function ThemeToggle() {
	const colorScheme = useColorScheme();
	const setColorScheme = useSettingsStore((state) => state.setColorScheme);

	return (
		<IconButton
			label="Toggle theme"
			onClick={() => setColorScheme(colorScheme === "dark" ? "light" : "dark")}
		>
			<Icon href={colorScheme === "dark" ? svgMoon : svgSun} />
		</IconButton>
	);
}
