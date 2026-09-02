# Support policy

StrataKit employs support policies to facilitate the following objectives:

- Provide a broad set of stable, well-supported UI components.
- Continuously deliver new features, bug fixes, and security updates.
- Evolve APIs over time in response to user feedback.
- Encourage users to keep up to date with the most recent package versions.

Sometimes, APIs evolve in a way that requires making backwards-incompatible changes to them, or removing them altogether. The support policies below detail under what circumstances such breaking changes can occur and how StrataKit endeavors to minimize their impact on consumers of the library.

## Breaking changes

We aim to minimize breaking changes by designing our APIs for future flexibility. However, evolving needs sometimes necessitate such changes. Here's how we handle them in different StrataKit packages:

<dl>
  <dt><code>@stratakit/foundations</code> breaking changes</dt>
  <dd>Changes to variable names or significant alterations in values.</dd>

  <dt><code>@stratakit/mui</code> breaking changes</dt>
  <dd>Adjustments to the DOM structure, class names, or significant visual updates. The CSS package may adopt a new major version of the Variables package without requiring a new major version of the CSS package.</dd>

  <dt><code>@stratakit/structures</code> breaking changes</dt>
  <dd>Modifications that cause compilation errors or undesirable runtime behavior in existing code. The React package may adopt a new major version of the CSS package without requiring a new major version of the React package.</dd>
</dl>

## Package versioning policy

We adhere to <a href="https://semver.org/">semantic versioning</a>, signaling API changes through our version numbers:

<dl>
  <dt>Patch release</dt>
  <dd>Address bugs or security issues without affecting the API.</dd>

  <dt>Minor release</dt>
  <dd>Introduce new features but maintain compatibility.</dd>

  <dt>Major release</dt>
  <dd>Made for significant changes, possibly including breaking changes.</dd>
</dl>

Rare exceptions may be made to this policy when a breaking API change is required to fix a bug and the severity of the bug significantly outweighs the impact of the API change on existing code.

## Package support policy

Each major release of an StrataKit package undergoes a support lifecycle consisting of the following consecutive phases:

<dl>
  <dt>✅ Current</dt>
  <dd>The most recent major release. It receives regular updates containing new features, bug fixes, and security patches.</dd>

  <dt>🔧 Maintenance</dt>
  <dd>Immediately after a new major release, the "current" version becomes a "maintenance" version. It receives updates containing bug fixes and security patches.</dd>

  <dt>💀 End-of-life</dt>
  <dd>After six months a "maintenance" version transitions to "end of life", after which it receives no further updates.</dd>
</dl>

## Version support status

### <code>@stratakit/foundations</code>

| Major version | Status         | Release    | Maintenance | End-of-life |
| ------------- | -------------- | ---------- | ----------- | ----------- |
| `1.x`         | ✅ **Current** | 2026-09-04 | TBD         | TBD         |

### <code>@stratakit/mui</code>

| Major version | Status         | Release    | Maintenance | End-of-life |
| ------------- | -------------- | ---------- | ----------- | ----------- |
| `1.x`         | ✅ **Current** | 2026-09-04 | TBD         | TBD         |

### <code>@stratakit/structures</code>

| Major version | Status             | Release | Maintenance | End-of-life |
| ------------- | ------------------ | ------- | ----------- | ----------- |
| `1.x`         | 👀 **Coming soon** | TBD     | TBD         | TBD         |
