# stratakit-usage

An [agent skill](https://agentskills.io/) that helps AI coding agents how to build, review and refactor frontend code using the [StrataKit design system](https://stratakit.bentley.com/docs/).

## What it does

- Enforces correct usage of StrataKit components, icons, and design tokens
- Prevents use of other UI libraries (iTwinUI, shadcn/ui, Tailwind, Bootstrap, etc.)
- Guides the agent to consult StrataKit documentation and examples before suggesting changes

## How to install

The skill lives in the `skills` directory of the [`iTwin/stratakit`](https://github.com/iTwin/stratakit) repository. Install it using the [`gh`](https://cli.github.com/manual/gh_skill) CLI:

```
gh skill install iTwin/stratakit stratakit-usage
```

## How to invoke

Once installed, the `stratakit-usage` skill is activated automatically whenever an agent is asked to work on a UI related task. If the skill is not triggered for a specific prompt, you can:

- Mention "StrataKit" in your request, e.g. "Add a StrataKit button"
- Explicitly invoke the skill using the [slash command](https://code.visualstudio.com/docs/agent-customization/agent-skills#_use-skills-as-slash-commands): `/stratakit-usage PROMPT`.
