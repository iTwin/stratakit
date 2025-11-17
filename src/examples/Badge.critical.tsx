import { Badge } from "@stratakit/bricks";
import warningIcon from "@stratakit/icons/status-warning.svg";

export default () => {
	return <Badge label="Unstable" tone="critical" icon={warningIcon} />;
};
