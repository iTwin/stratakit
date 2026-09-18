# Support policy

StrataKit employs support policies to facilitate the following objectives:

- Provide a broad set of stable, well-supported UI components.
- Continuously deliver new features, bug fixes, and security updates.
- Evolve APIs over time in response to user feedback.
- Encourage users to keep up to date with the most recent package versions.

Sometimes, APIs evolve in a way that requires making backwards-incompatible changes to them, or removing them altogether. The support policies below detail under what circumstances such breaking changes can occur and how StrataKit endeavors to minimize their impact on consumers of the library.

## Breaking changes

We aim to minimize breaking changes by designing our APIs for future flexibility. However, evolving needs sometimes necessitate such changes. Here's how we handle them in different StrataKit packages:

> [!NOTE]
>
> - APIs or props prefixed with `unstable_` may change at any time without requiring a major version release.
> - Only CSS variables prefixed with `--stratakit` are public and covered by this support policy. Variables prefixed with `--_` or `--🥝` are private implementation details and should not be used by consumers.

<dl>
  <dt><code>@stratakit/foundations</code> breaking changes</dt>
  <dd>
    <ul>
      <li>Removal or renaming of public CSS variables, or significant changes to their values.</li>
      <li>Changes to exported APIs or props.</li>
    </ul>
  </dd>

  <dt><code>@stratakit/icons</code> breaking changes</dt>
  <dd>Removal or renaming of icons, or changes to their supported symbol IDs.</dd>

  <dt><code>@stratakit/mui</code> breaking changes</dt>
  <dd>Changes to component APIs, props, rendering behavior, or DOM structure that break existing usage. The same criteria apply to the APIs from <code>@mui/material</code>. Additions and backwards-compatible changes are not considered breaking changes.</dd>

  <dt><code>@stratakit/structures</code> breaking changes</dt>
  <dd>Changes to component APIs, props, rendering behavior, or DOM structure that break existing usage. Additions and backwards-compatible changes are not considered breaking changes.</dd>
</dl>

> [!NOTE]  
> `@stratakit/internal-utils` is exempt from this support policy.

## Package versioning policy

We adhere to [semantic versioning](https://semver.org/), signaling API changes through our version numbers:

<dl>
  <dt>Patch release</dt>
  <dd>Address bugs or security issues without affecting the API.</dd>

  <dt>Minor release</dt>
  <dd>Introduce new features but maintain compatibility.</dd>

  <dt>Major release</dt>
  <dd>Made for significant changes, possibly including breaking changes.</dd>
</dl>

Rare exceptions may be made to this policy when a breaking API change is required to fix a bug and the severity of the bug significantly outweighs the impact of the API change on existing code.

> [!NOTE]  
> For packages with a `0.x` version, this policy is shifted down by one version component: patch releases may introduce new features while maintaining compatibility, and minor releases may include breaking changes.

## Package support policy

Each major release of a StrataKit package undergoes a support lifecycle consisting of the following consecutive phases:

<dl>
  <dt>✅ Current</dt>
  <dd>The most recent major release. It receives regular updates containing new features, bug fixes, and security patches.</dd>

  <dt>🔧 Maintenance</dt>
  <dd>Immediately after a new major release, the "current" version becomes a "maintenance" version. It receives updates containing bug fixes and security patches.</dd>

  <dt>💀 End-of-life</dt>
  <dd>After six months a "maintenance" version transitions to "end of life", after which it receives no further updates.</dd>
</dl>

> [!NOTE]  
> For `0.x` packages, there is no maintenance period. After a new minor release, the previous version transitions directly to end of life.

## Version support status

### <code>@stratakit/foundations</code>

| Major version | Status         | Release    | Maintenance | End-of-life |
| ------------- | -------------- | ---------- | ----------- | ----------- |
| `1.x`         | ✅ **Current** | 2026-09-04 | TBD         | TBD         |

### <code>@stratakit/icons</code>

| Major version | Status             | Release | Maintenance | End-of-life |
| ------------- | ------------------ | ------- | ----------- | ----------- |
| `1.x`         | 👀 **Coming soon** | TBD     | TBD         | TBD         |

### <code>@stratakit/mui</code>

| Major version | Status         | Release    | Maintenance | End-of-life |
| ------------- | -------------- | ---------- | ----------- | ----------- |
| `1.x`         | ✅ **Current** | 2026-09-04 | TBD         | TBD         |

### <code>@stratakit/structures</code>

| Major version | Status             | Release | Maintenance | End-of-life |
| ------------- | ------------------ | ------- | ----------- | ----------- |
| `1.x`         | 👀 **Coming soon** | TBD     | TBD         | TBD         |
