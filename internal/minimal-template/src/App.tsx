import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Icon } from "@stratakit/mui";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

export default function App() {
	return (
		<Container maxWidth="sm">
			<Button startIcon={<Icon href={svgPlaceholder} />}>Hello</Button>
		</Container>
	);
}
