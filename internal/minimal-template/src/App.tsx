import Button from "@mui/material/Button";
import { svgPlaceholder } from "@stratakit/icons/placeholder";
import { Icon } from "@stratakit/mui";

import styles from "./App.module.css";

export default function App() {
	return (
		<div className={styles.container}>
			<Button startIcon={<Icon href={svgPlaceholder} />}>Hello</Button>
		</div>
	);
}
