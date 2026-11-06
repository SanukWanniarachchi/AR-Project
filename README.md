# Little Reef Aquarium AR

A miniature aquarium built with A-Frame, AR.js and JavaScript. Open the hosted HTTPS site on a phone, allow camera access and point at a Hiro marker. The fish, coral, plants, rocks, shell, starfish, bubble and treasure chest appear over the marker.

Repository: https://github.com/SanukWanniarachchi/AR-Project

Upload status: common files and Sanuk's modeling assets form the initial upload. The remaining five feature packages must be added before the complete app can run.

Group workflow: upload directly to **main**, one member at a time, using only assigned files. No feature branches or PRs are required for this agreed upload plan.

Hosting status: not published by the preparation task. Add the actual GitHub Pages URL here after publishing and testing it.

## Features

- Hiro marker scene with a box seabed, sphere bubble, cylinder/cone coral, other decorative objects and an explicit A-Frame text label.
- An original fish GLB with embedded textures and a Swim fin/tail animation.
- Fish position animation and a separate bubble scale animation.
- Workshop-style bubble/ball colour cycle on tap.
- A new custom chest grow/shrink interaction.
- Found/lost banner with different text and colours; camera and model error messages.
- Camera-free 3D preview at `?preview=1` and a printable `marker.html` page.
- Separate feature files and six member upload packages documented in `docs/TEAM-GUIDE.md`.

## Start and test

Serve the complete project over HTTP on localhost for development. With Python installed:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open http://localhost:8000/?preview=1 for the desktop 3D preview. VS Code Live Server is another option. Do not open the HTML through a file:// URL. The libraries load from pinned web CDNs, so an internet connection is required.

For actual phone AR, publish the repository over HTTPS. Open the HTTPS page on the phone and show `marker.html` on a different screen, or print the marker with its white border intact. Allow camera access, move the phone toward the whole marker, and tap the bubble and chest. The buttons offer the same actions but do not replace the direct object-tap tests.

Camera-free preview mode does not test marker recognition. Actual phone performance, touch accuracy and camera permissions must be checked by the group. Record results in `docs/PHONE-TEST-RESULTS.md`.

## Model licence and credits

`models/fish.glb` is an original AI-assisted procedural clownfish prepared as a group starter, with original painted stripe/scale and fin textures. Its editable source is `model-source/fish-builder.js`; the browser exporter is `model-studio.html`. It is not a downloaded fish and is not the workshop duck.

The fish asset and embedded textures are dedicated under **CC0 1.0 Universal**: https://creativecommons.org/publicdomain/zero/1.0/. See `models/LICENSE-CC0.txt` and `docs/MODEL-CREDITS.md`. Modeling responsibility is assigned to SanukWanniarachchi; that allocation does not claim authorship of all generated starter code. Members should record their real modifications and tests.

Hiro marker: AR.js project, pinned source https://github.com/AR-js-org/AR.js/blob/3.4.8/data/images/HIRO.jpg. A local copy is included as `assets/hiro.jpg`; the upstream MIT notice is preserved in `assets/ARJS-LICENSE.txt`.

Libraries:

- A-Frame 1.6.0 — https://aframe.io/ — MIT.
- AR.js 3.4.8 — https://github.com/AR-js-org/AR.js — MIT.
- Three.js 0.164.1 in the model studio/exporter, and A-Frame's bundled Three.js at runtime — https://threejs.org/ — MIT.

Third-party libraries retain their own licences. They are loaded from their published CDNs rather than copied into this repository.

## Structure and members

| Path | Purpose / responsibility |
| --- | --- |
| index.html, styles.css, js/app.js | Page integration and preview; void-neo-7 |
| js/core.js | Shared modeling/material helpers; coordinate edits |
| js/environment.js | Seabed, coral, plants and decoration; pasindu0720 |
| js/fish-motion.js | GLB loading and fish motion; void-neo-7 |
| models/, model-source/, model-studio.html | Fish asset, source, licence and export; SanukWanniarachchi |
| js/bubble.js | Bubble colour interaction and animation; kalpanathisuni-gif |
| js/treasure.js | Chest and new custom interaction; VidumuniTharika |
| js/marker-status.js, marker.html, assets/ | Marker state, camera guidance and marker; dulendayarathna |
| docs/ | Team workflow, requirements, credits and honest test records |

This is prepared starter code. Use your own GitHub accounts, review and understand your assigned feature, and document actual contributions. See the current direct-main upload instructions in **docs/TEAM-GUIDE.md** and the exact allocation in **docs/MEMBER-ALLOCATION.md**.

## Publish and submit

After all member files are uploaded to main, configure GitHub **Settings > Pages > Deploy from a branch > main > /(root)**. Wait for the actual deployment URL, then test it on a phone. The expected URL format is `https://sanukwanniarachchi.github.io/AR-Project/`; this is not a claim it is already published.

The assignment submission is one Word document containing the public repository link, named with the group's real number. Only one member submits it. The group should also confirm any lecture-specific instructions with the lecturer; original lecture Step 5 provenance has not been established for the supplied starter.
