Verified with react and react-dom 19.3.1 (latest on npm, 7 Nov 2026), esbuild 0.28.2 JSX, Node 22; meta.json and examples use 19.3, above the 19 floor.
All 153 examples were bundled, linted (eslint 10, eslint-plugin-react-hooks 7.1.1 incl. compiler rules) and rendered in jsdom 31 with react-dom/client, clicking buttons and typing in inputs: no errors, no React warnings.
Unverified: network calls, lazy imports and browser observers were stubbed, so real fetching and code splitting were not exercised; imports from react (and useFormStatus from react-dom) are assumed.
