# Principles

When working on StrataKit, we follow these principles.

> [!IMPORTANT]
> When principles conflict, prioritize end users, then the consumers of the system, then its maintainers, then theoretical purity.

## 1. Consistent and intuitive

A design system is nothing if not _consistent_. Similar components should look, behave and be configured similarly. Small, independent pieces should work together harmoniously to form a cohesive whole. When we find reasons to make a change, we apply it everywhere rather than in one place.

Components should be easy to use and hard to misuse. Where it's not possible to bake desired outcomes into the component or where its behavior may otherwise be surprising, we provide copious guidance and sample code to cover the gaps.

## 2. Craft in every detail

"Working" software isn't enough; it has to be well-crafted. Everything in the component should feel _intentional_, whether it's the spacing, the interaction, or the prop names. Users may not notice every single detail, but they can sense when the details are missing.

The same level of care continues after we ship. When we see small problems, we fix them at the root before they turn into bigger problems. This should still be a project that people want to work in five years from now.

## 3. Build with the grain of the web

The web is _flexible_. StrataKit leans into this flexibility instead of trying to control it. We do this by using each part of the platform for what it does best, and letting the browser make the right decision for each user.

We rely on native platform features, and we avoid large runtime dependencies. Client-side JavaScript needs to earn its place. The code we do write should aim to hand off work to the browser, especially as the web platform gains more capabilities each year.

## 4. Accessible by default

Accessibility is embedded into the very fabric of StrataKit. If it's not accessibility-ready, it doesn't ship.

We make sure that accessibility is part of the conversation at every step. By integrating accessibility into the early phases, we reduce the overall amount of work required and we ship accessible experiences right from the start. Whenever we make changes, we continuously _test_ with different assistive technology software, devices, and input modalities.

## 5. Do less so others can do more

A successful design system is critical infrastructure that teams can trust and rely on. We hold StrataKit to a high bar, and we achieve this by focusing on the _essentials_. Our core packages contain only what must be correct everywhere (e.g. design tokens, base components, common icons). Documentation and examples meet the same quality bar as the packages, but are much easier to maintain.

Rather than owning every possible experience, we ship the _building blocks_ that unlock those experiences, and supplement them with high-level guidance. This gives teams control over their specific experiences without making us the bottleneck.
