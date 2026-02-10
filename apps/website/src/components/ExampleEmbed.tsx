/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

const { BASE_URL } = import.meta.env;

// ----------------------------------------------------------------------------

export default function ExampleEmbed({ src }: { src: string }) {
	const iframeSrc = `${BASE_URL}/examples/${src}?preview`;

	return (
		<div className="example-preview">
			<iframe src={iframeSrc} title={`${src} example`} />
		</div>
	);
}
