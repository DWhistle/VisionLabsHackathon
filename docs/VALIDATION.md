# Validation record

Date: 2026-09-12. Baseline: `master` at `34feddbc`.
Environment: macOS, Node.js 24.4.0, npm 11.4.2.

| Check | Actual result |
| --- | --- |
| Original `npm ci --ignore-scripts --legacy-peer-deps --no-audit` | Passed: 1,208 packages; lifecycle/native build deliberately skipped |
| Original `npm run build-client` | Failed: webpack 4.34.0 MD4 hashing triggers `ERR_OSSL_EVP_UNSUPPORTED` |
| `npm rebuild zeromq` | Failed: native C++ binding/NAN errors against Node.js 24 |
| Updated `npm ci --omit=optional --legacy-peer-deps --no-audit` | Passed: 1,156 packages, including normal lifecycle scripts |
| Updated `npm run build-client` | Passed: production bundle and seven source video assets regenerated; bundle/asset size warnings |
| `npm run lint` | Failed: ESLint 4.19.1 cannot find a configuration file |
| `npm test` | Failed: no files match the three configured Mocha spec globs |
| Local HTTP smoke using real Express app and Node fetch/assert | Passed: `/`, `/prised/camera`, `/bundle.js`, `/images/Prised.mp4` return 200 with expected content types; missing JS returns 404 |
| `npm audit --json` | 132 findings: 14 low, 33 moderate, 58 high, 27 critical (includes development and optional dependency tree; advisory snapshot can change) |
| Targeted project-source credential scan | No candidate found; `secrets.js` is empty. Generated bundles, dependencies and full history were not certified |
| Webcam, pretrained model loading, single/multiple-person inference | Not run; no camera/browser runtime validation |
| Python backend and exercise model accuracy | Not run; no verified compatible Python environment or end-to-end native RPC installation |

The frontend build fixes preserve React 16, PoseNet 1 and webpack 4. Dependency
changes do not change the intended inference algorithm; browser behavior has
not been verified. Making `zerorpc` optional changes installation behavior only:
a frontend install omits the incompatible native backend. The generated bundle
is approximately 1.53 MiB and the largest video approximately 24.4 MiB; these
are build-output sizes, not performance measurements.

`build.sh` previously referenced absent `requirements.txt` and `socket/` paths
and started a blocking server before later commands. It now installs and builds
the frontend; start the server separately with `npm start`.

All seven removed `public/images` videos were byte-identical to their preserved
`client/components/images` sources before deletion. The build regenerates them.
Tracked dependencies, two Python cache files, one Finder metadata file, and
webpack bundle/map are removed. The root license and source media remain.
The tracked database and serialized model remain because equivalent regeneration
from a verified input dataset was not established.

Follow-ups: add a deliberate ESLint configuration and behavioral tests; resolve
the historical dependency advisories and native RPC compatibility; validate a
camera session; confirm model/data/media provenance and team contributions.
