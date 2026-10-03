import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const expected = [
  ['button--size_lg', '<Button size="lg"> in src/app.tsx'],
  ['button--size_sm', '<Button size="sm"> in src/page.astro'],
  ['gap_7', '<Stack gap="7"> in src/stack.tsx'],
]

const run = (config) => {
  const outfile = `out.${config}.css`
  execFileSync('npx', ['panda', 'cssgen', '--config', config, '--outfile', outfile], { stdio: 'ignore' })
  return readFileSync(outfile, 'utf8')
}

const results = ['panda.config.ts', 'panda.config.jsx.ts'].map((config) => [config, run(config)])

for (const [config, css] of results) {
  console.log(`\n${config}${config.includes('jsx') ? ' (jsxFramework: "react")' : ' (no jsxFramework)'}`)
  for (const [className, source] of expected) {
    console.log(`  ${css.includes(className) ? '✓' : '✗'} .${className.padEnd(16)} ${source}`)
  }
}

const missing = expected.filter(([className]) => !results[0][1].includes(className))
if (missing.length > 0) {
  console.log(`\n✗ ${missing.length} of ${expected.length} styles dropped without jsxFramework`)
  process.exit(1)
}
