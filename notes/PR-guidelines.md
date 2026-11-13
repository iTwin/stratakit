# PR guidelines

The pull request (PR) process serves a few different purposes:

- PRs help build a shared understanding of the codebase. Every approved PR has been read and understood by multiple people.
- PR review is a quality + correctness gate. Review is the cheapest way to catch problems before they get shipped.
- The PR also serves as a historical record, useful when revisiting old commits to understand past changes.

We follow Google's engineering practices: [the reviewer guide](https://google.github.io/eng-practices/review/reviewer/) and [the author guide](https://google.github.io/eng-practices/review/developer/). This page covers only what we want to add or stress. Note: Google's term for a PR is "CL" (changelist).

## For authors

- Keep PRs scoped to one semantic, self-contained change. Smaller PRs are easier and faster to review + merge. ([small CLs](https://google.github.io/eng-practices/review/developer/small-cls.html))
  - Consider splitting large changes into smaller, [stacked PRs](https://docs.github.com/en/pull-requests/get-started/about-stacked-prs) that can be reviewed individually.
- [Review](#for-reviewers) your own PR before submitting it for wider review. Re-review it after every later change.
- Test your own changes and provide evidence (e.g. screenshots) that it works. Don't rely on reviewers to test for you.
- Write meaningful PR descriptions that provide enough context to reviewers and future readers. ([good CL descriptions](https://google.github.io/eng-practices/review/developer/cl-descriptions.html))
  - Include links to related issues, discussions or comments.
  - Mention any API changes prominently.
  - List alternative solutions considered (if any) and deferred work (for future PRs).
- Consider preemptively starting comment threads around any specific areas that you want to draw attention towards.
- Respond to every individual comment, and do so promptly. ([handling comments](https://google.github.io/eng-practices/review/developer/handling-comments.html))
- Consider [dismissing](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/dismissing-a-pull-request-review) stale approvals if significant changes have been pushed since.
- Consider requesting additional reviews from individuals who may be interested in the change. This can even include non-maintainers (e.g. designers or consumers).
- Before proposing _substantial_ changes (e.g. architectural changes or entirely new features), consider opening an issue or RFC discussion to get alignment and feedback. (see [Rust's RFC process](https://rust-lang.github.io/rfcs/0002-rfc-process.html))
- Keep your branch up-to-date and free of conflicts. Make sure CI checks are passing. If the PR state has deteriorated since it was opened, consider moving it back to draft. Don't leave open PRs hanging.

## For reviewers

- Code reviews should be _fast_. This is the single best way to ensure team velocity. ([speed of reviews](https://google.github.io/eng-practices/review/reviewer/speed.html))
  - Respond within one business day. This also applies when responding to individual comments.
  - If you can't do a full review, leave broad comments first or ask another maintainer to review it.
  - Importantly, this is about turnaround time. Responding fast does not equate to reviewing less thoroughly.
  - Take advantage of differences in working hours. For example, leave a review before the other person starts their next day.
- If a PR is too large to review well, ask the author to split it. ([small CLs](https://google.github.io/eng-practices/review/developer/small-cls.html))
- Read the entire PR before approving. An approval means you share responsibility for the change. Ask questions. ([what to look for](https://google.github.io/eng-practices/review/reviewer/looking-for.html))
- Favor approving the PR once it is in a state where it _definitely_ improves the overall codebase health. ([the standard of code review](https://google.github.io/eng-practices/review/reviewer/standard.html))
  - The main exception is for [high-risk changes](#merge-risk), where extra scrutiny is warranted before approving.
- Comment on the code, not the person. Explain why. ([writing comments](https://google.github.io/eng-practices/review/reviewer/comments.html))
  - Continue advocating for changes if you believe the additional work is justified. _Be polite._ ([handling pushback](https://google.github.io/eng-practices/review/reviewer/pushback.html))
  - Consider labelling comments by severity or category. For example, "nit:", "optional:", "question:", or "pre-existing:".
- Test the change, rather than judging it solely from the diff. Test it in different environments and using different input devices.
- On matters of code style, the [style guide](./STYLEGUIDE.md) is the ultimate authority. If a specific case is not covered, follow existing patterns and consider expanding the style guide. ([the standard of code review](https://google.github.io/eng-practices/review/reviewer/standard.html))

### Questions to ask

- "Do we want it?" Settle this one first when in doubt. If the change is undesirable, then additional review is wasted effort.
- "Does it work?" i.e. The change does what it says, and behaves correctly in all intended scenarios (including edge cases).
- "Does it fit?" i.e. The code should align with the existing patterns and conventions of the project.

[What to look for in a code review](https://google.github.io/eng-practices/review/reviewer/looking-for.html) & [Navigating a CL in review](https://google.github.io/eng-practices/review/reviewer/navigate.html)

### Merge risk

The degree of rigor applied when reviewing a PR should scale to the risk associated with merging it.

A few examples of "high-risk" changes where a more thorough review may be required:

- Breaking changes that force consumers to update their code.
- Public API changes (e.g. new components, new or changed props, new tokens).
- Visual or behavioral changes affecting critical or widely-used components.
- Changes that touch complex or fragile parts of the codebase.
- Changes that are impossible or practically difficult to revert (e.g. after a release has been published)

In contrast, bug fixes, docs content, or internal tooling changes are generally lower risk and can always be iterated on in a follow-up PR.

## Disagreements

When disagreements happen, try to settle them within the PR thread first. State your reasoning and the tradeoffs; technical facts and data outweigh opinions. Make a genuine effort to understand the other perspective. _Be polite._

If the thread isn't converging, talk synchronously outside of GitHub, either 1:1 or as a team. Escalate if necessary. Record the outcome on the PR.

[Resolving conflicts](https://google.github.io/eng-practices/review/reviewer/standard.html#conflicts)
