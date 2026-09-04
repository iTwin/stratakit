var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Rating from "@mui/material/Rating";

export default () => {
	return (
		<>
			<FormControl render={<fieldset />} role="radiogroup">
				<FormLabel render={<legend />}>Small rating</FormLabel>
				<Rating size="small" name="product-rating-small" defaultValue={1} />
			</FormControl>

			<FormControl render={<fieldset />} role="radiogroup">
				<FormLabel render={<legend />}>Medium rating</FormLabel>
				<Rating size="medium" name="product-rating-medium" defaultValue={3} />
			</FormControl>

			<FormControl render={<fieldset />} role="radiogroup">
				<FormLabel render={<legend />}>Large rating</FormLabel>
				<Rating size="large" name="product-rating-large" defaultValue={5} />
			</FormControl>
		</>
	);
};
`;export{e as default};