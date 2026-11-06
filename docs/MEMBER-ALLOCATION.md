# Six member allocation

All six accounts had accepted repository access when checked on 7 November 2026. One shared repository: https://github.com/SanukWanniarachchi/AR-Project

These are proposed responsibilities, not a claim of authorship of the prepared starter code. Each member should understand, customise, test and honestly describe their changes.

| Member | Upload branch | Owned files | What to explain and test |
| --- | --- | --- | --- |
| SanukWanniarachchi | `main` | `models/fish.glb`, `models/LICENSE-CC0.txt`, `model-source/fish-builder.js`, `model-studio.html`, `docs/MODEL-CREDITS.md` | Fish design, textures, GLB export, licence and attribution; appearance and animation after loading |
| void-neo-7 | `main` | `index.html`, `styles.css`, `js/app.js`, `js/fish-motion.js` | Page layout, library loading, model loading, fish movement, camera-free preview, final integration and hosting |
| pasindu0720 | `main` | `js/environment.js` | Sand, rocks, coral, plants, shell, starfish, materials and efficient static batching |
| kalpanathisuni-gif | `main` | `js/bubble.js` | Workshop-style colour cycle, scale pulse and ambient bubbles |
| VidumuniTharika | `main` | `js/treasure.js` | Custom grow/shrink component, easing, chest texture and hardware |
| dulendayarathna | `main` | `js/marker-status.js`, `marker.html`, `assets/hiro.jpg`, `assets/ARJS-LICENSE.txt`, `docs/PHONE-TEST-RESULTS.md` | Found/lost banner, permission/model errors, printable marker, actual phone tests and evidence |

## Shared foundation

The initial upload contains `README.md`, `.gitignore`, `.nojekyll`, `js/core.js` and common documentation, together with Sanuk's modeling files. Do not upload the starter/common files again. `js/core.js` contains shared colour, geometry, texture and batching helpers. Coordinate before changing it; do not overwrite shared helpers independently.

The model builder needs `js/core.js` while editing. Its normal runtime uses the exported GLB, so `model-source/fish-builder.js` is not loaded on the phone.

`index.html` creates the A-Frame marker and entities. `js/environment.js` creates the decorative objects. These files must agree on the component names defined in `js/app.js`; do not rename a component without coordinating with the integration member.

## Packages and review

Every member ZIP contains an `UPLOAD/` directory that mirrors the repository root, plus local instructions outside that directory. Upload only the contents of `UPLOAD/` directly to `main`, one member at a time. Do not upload the ZIP, its outer folder, or the instructions file.

The complete reference ZIP is for local testing. Do not upload that whole ZIP as each member's contribution. Read TEAM-GUIDE.md for the current direct-main upload steps. The previous ZIP instructions about feature branches/PRs are superseded.

Current workflow: no separate branches or PRs. Wait for the previous uploader, check filenames and paths, then upload only your own files to main. Review each upload before the next person starts.
