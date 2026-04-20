/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Divider } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import { unstable_NavigationRail as NavigationRail } from "@stratakit/structures";

import svgBentley from "@stratakit/icons/bentley-systems.svg";
import svgPlaceholder from "@stratakit/icons/placeholder.svg";
import styles from "./NavigationRail.default.module.css";

export default () => {
	return (
		<div className={styles.container}>
			<NavigationRail.Root className={styles.root}>
				<NavigationRail.Header>
					<Icon alt="Acme app" href={`${svgBentley}#icon-large`} size="large" />
					<NavigationRail.ToggleButton />
				</NavigationRail.Header>

				<NavigationRail.Content>
					<NavigationRail.List>
						<NavigationRail.ListItem>
							<NavigationRail.Anchor
								href="#"
								icon={svgPlaceholder}
								label="Item #1"
								active
							/>
						</NavigationRail.ListItem>
						<NavigationRail.ListItem>
							<NavigationRail.Anchor
								href="#"
								icon={svgPlaceholder}
								label="Item #2"
							/>
						</NavigationRail.ListItem>
						<Divider presentational />
						<NavigationRail.ListItem>
							<NavigationRail.Anchor
								href="#"
								icon={svgPlaceholder}
								label="Item #3"
							/>
						</NavigationRail.ListItem>
					</NavigationRail.List>

					<NavigationRail.Footer>
						<NavigationRail.List>
							<NavigationRail.ListItem>
								<NavigationRail.Button icon={svgPlaceholder} label="Item #4" />
							</NavigationRail.ListItem>
							<Divider presentational />
							<NavigationRail.ListItem>
								<NavigationRail.Button icon={svgPlaceholder} label="Item #5" />
							</NavigationRail.ListItem>
						</NavigationRail.List>
					</NavigationRail.Footer>
				</NavigationRail.Content>
			</NavigationRail.Root>
		</div>
	);
};
