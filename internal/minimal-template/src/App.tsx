import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { svgPlaceholder } from "@stratakit/icons/placeholder";
import { Icon } from "@stratakit/mui";

export default function App() {
	return (
		<Container maxWidth="md" sx={{ padding: 4 }}>
			<Button startIcon={<Icon href={svgPlaceholder} />}>Hello</Button>
		</Container>
	);
}
