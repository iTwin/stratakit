/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Divider } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import bentleyIcon from "@stratakit/icons/bentley-systems.svg";
import placeholderIcon from "@stratakit/icons/placeholder.svg";
import { unstable_NavigationRail as NavigationRail } from "@stratakit/structures";

export default () => {
	return (
		<div
			style={{
				blockSize: "calc(100dvh - 16px * 2)",
			}}
		>
			<NavigationRail.Root>
				<NavigationRail.Header>
					<Icon
						alt="Acme app"
						href={`${bentleyIcon}#icon-large`}
						size="large"
					/>
					<NavigationRail.ToggleButton />
				</NavigationRail.Header>

				<NavigationRail.Content>
					<NavigationRail.List>
						<NavigationRail.ListItem>
							<NavigationRail.Anchor
								href="#"
								icon={placeholderIcon}
								label="Item #1"
								active
							/>
						</NavigationRail.ListItem>
						<NavigationRail.ListItem>
							<NavigationRail.Anchor
								href="#"
								icon={placeholderIcon}
								label="Item #2"
							/>
						</NavigationRail.ListItem>
						<Divider presentational />
						<NavigationRail.ListItem>
							<NavigationRail.Anchor
								href="#"
								icon={placeholderIcon}
								label="Item #3"
							/>
						</NavigationRail.ListItem>
					</NavigationRail.List>

					<NavigationRail.Footer>
						<NavigationRail.List>
							<NavigationRail.ListItem>
								<NavigationRail.Button icon={placeholderIcon} label="Item #4" />
							</NavigationRail.ListItem>
							<Divider presentational />
							<NavigationRail.ListItem>
								<NavigationRail.Button icon={placeholderIcon} label="Item #5" />
							</NavigationRail.ListItem>
						</NavigationRail.List>
					</NavigationRail.Footer>
				</NavigationRail.Content>
			</NavigationRail.Root>
		</div>
	);
};
