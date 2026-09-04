var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Rating from "@mui/material/Rating";

export default () => {
	return (
		<FormControl render={<fieldset />} role="radiogroup">
			<FormLabel render={<legend />}>Product rating</FormLabel>
			<Rating name="product-rating" defaultValue={2} />
		</FormControl>
	);
};
`;export{e as default};