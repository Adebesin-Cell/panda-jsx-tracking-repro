# panda jsx tracking repro

Recipe and pattern JSX tags are only tracked when `jsxFramework` is set. Without it, `<Button size="lg">` and
`<Stack gap="7">` emit no CSS, and nothing warns.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/Adebesin-Cell/panda-jsx-tracking-repro?startScript=repro)

```bash
npm install
npm run repro
```

```
panda.config.ts (no jsxFramework)
  ✗ .button--size_lg  <Button size="lg"> in src/app.tsx
  ✗ .button--size_sm  <Button size="sm"> in src/page.astro
  ✗ .gap_7            <Stack gap="7"> in src/stack.tsx

panda.config.jsx.ts (jsxFramework: "react")
  ✓ .button--size_lg  <Button size="lg"> in src/app.tsx
  ✓ .button--size_sm  <Button size="sm"> in src/page.astro
  ✓ .gap_7            <Stack gap="7"> in src/stack.tsx

✗ 3 of 3 styles dropped without jsxFramework
```

The two configs differ only by `jsxFramework: 'react'`. The sources import from `@acme/ds`, standing in for a design
system: the app renders its components but doesn't need `styled-system/jsx`, so it has no reason to set `jsxFramework`.

`npm run repro` exits 1 while the bug is present.

Pinned to `@pandacss/dev@2.1.1`. v1 has the same gate (`assignRecipeMatcher` returns early when `jsxFramework` is unset).
