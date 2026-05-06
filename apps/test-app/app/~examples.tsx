/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { Icon } from "@stratakit/mui";
import { createStore, useStore } from "zustand";

import svgConfiguration from "@stratakit/icons/configuration.svg";
import svgLink from "@stratakit/icons/link.svg";
import styles from "./~examples.module.css";

// ----------------------------------------------------------------------------

interface ExamplesShowcaseProps {
	name: string;
	id: string;
	children: React.ReactNode;
	highlight?: boolean;
	tools?: React.ReactNode;
}

export function ExamplesShowcase(props: ExamplesShowcaseProps) {
	const { name, id, highlight, tools, children } = props;

	const toolbar = tools && (
		<div
			role="group"
			aria-labelledby={`${id}-actions ${id}`}
			className={styles.exampleToolbar}
		>
			<p hidden id={`${id}-actions`}>
				Actions
			</p>
			{tools}
		</div>
	);

	return (
		<section
			className={styles.exampleContainer}
			aria-labelledby={id}
			data-highlight={highlight ? "true" : undefined}
		>
			<hgroup className={styles.exampleHeader}>
				<Typography
					variant="h5"
					render={<h2 />}
					id={id}
					className={styles.exampleTitle}
					tabIndex={-1}
				>
					{name}
				</Typography>
				<IconButton
					render={<a />}
					id={`${id}-permalink`}
					aria-labelledby={`${id}-permalink ${id}`}
					className={styles.examplePermalink}
					href={`#${id}`}
				>
					<Icon href={svgLink} />
					<span style={visuallyHidden}>Permalink</span>
				</IconButton>
			</hgroup>

			<div className={styles.exampleContent}>
				{toolbar}
				{children}
			</div>
		</section>
	);
}

// ----------------------------------------------------------------------------

/** A trigger button and a corresponding popover containing the knobs */
export function KnobControlEntrypoint(
	props: React.ComponentProps<typeof IconButton>,
) {
	const { knobs, enabled: enabledKnobs, toggle } = useKnobs();

	const headingId = React.useId();
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const isOpen = anchorEl !== null;

	if (knobs.size === 0) return null;

	return (
		<>
			<IconButton
				label="Knobs"
				size="small"
				aria-expanded={isOpen ? "true" : undefined}
				aria-haspopup="dialog"
				onClick={(event) => setAnchorEl(event.currentTarget)}
				{...props}
			>
				<Icon href={svgConfiguration} />
			</IconButton>

			<Popover
				open={isOpen}
				anchorEl={anchorEl}
				onClose={() => setAnchorEl(null)}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				slotProps={{
					paper: {
						"aria-labelledby": headingId,
						className: styles.exampleKnobsPopover,
					},
				}}
			>
				<Typography variant="body2" render={<h2 />} id={headingId} gutterBottom>
					Knobs
				</Typography>
				<FormGroup>
					{[...knobs].map(([knobName]) => (
						<FormControlLabel
							key={knobName}
							label={knobName}
							control={
								<Switch
									checked={!!enabledKnobs[knobName]}
									onChange={() => toggle(knobName)}
								/>
							}
							slotProps={{
								typography: {
									className: styles.exampleKnobLabel,
								},
							}}
						/>
					))}
				</FormGroup>
			</Popover>
		</>
	);
}

// ----------------------------------------------------------------------------

type KnobsState = {
	/** Currently enabled knobs */
	enabled: Record<string, boolean>;
	/** Change the state of a knob */
	toggle: (knobName: string, enabled?: boolean) => void;
};

function createKnobsStore() {
	return createStore<KnobsState>((set) => ({
		enabled: {},
		toggle: (knobName, enabled) => {
			set((state) => ({
				enabled: {
					...state.enabled,
					[knobName]: enabled ?? !state.enabled[knobName],
				},
			}));
		},
	}));
}

const KnobsContext = React.createContext<
	| {
			knobs: Map<string, React.FC<{ children: React.ReactNode }>>;
			store: ReturnType<typeof createKnobsStore>;
	  }
	| undefined
>(undefined);

type Knobs = Record<string, React.FC<{ children: React.ReactNode }>>;

type KnobsProviderProps = React.PropsWithChildren<{
	/** The original knobs export */ knobs: Promise<Knobs>;
}>;

/** Creates a context with a zustand store containing the state of enabled knobs */
export function KnobsProvider(props: KnobsProviderProps) {
	const knobs = new Map(Object.entries(React.use(props.knobs)));
	const [store] = React.useState(() => createKnobsStore());

	return <KnobsContext value={{ knobs, store }}>{props.children}</KnobsContext>;
}

/** Returns the original knobs and the current state. */
export function useKnobs() {
	const context = React.use(KnobsContext);
	if (!context) throw new Error("useKnobs must be used within a KnobsProvider");

	const { knobs, store } = context;
	const enabled = useStore(store, (state) => state.enabled);
	const toggle = useStore(store, (state) => state.toggle);

	return { knobs, enabled, toggle };
}
