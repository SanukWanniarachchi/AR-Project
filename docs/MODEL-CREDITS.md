# Model credit and modeling work

## Fish asset

- Title: Little Reef procedural clownfish
- Runtime file: `models/fish.glb`
- Source: `model-source/fish-builder.js`, using the shared helpers in `js/core.js`
- Creator: AI-assisted procedural starter prepared for this group project
- Modeling responsibility: SanukWanniarachchi
- Asset licence: CC0 1.0 Universal, https://creativecommons.org/publicdomain/zero/1.0/
- Local licence notice: `models/LICENSE-CC0.txt`
- External fish model website: none; this asset was generated from original procedural geometry.
- Details: painted stripe and scale texture, gill lines, eyes and irises, textured fins, and a named Swim fin/tail animation embedded in the GLB.

The asset may be used and redistributed in this public repository. Credit is retained even though CC0 does not require attribution. The workshop duck is not used. Other aquarium objects are procedural meshes built by the feature files; the scene also includes an explicit A-Frame text label.

## Record actual modeling changes

This allocation does not claim the member authored all starter geometry. Before submitting, replace this paragraph with the modifications actually performed and tested, such as fish colours, proportions, fins, stripe placement or texture changes. Do not invent work or manually change commit authors.

## Editing and exporting

1. Work from a clone of the shared repo with the common starter files present.
2. Edit `model-source/fish-builder.js`. Colour defaults are shared in `js/core.js`; coordinate before editing that shared file.
3. Serve the folder with VS Code Live Server or a local static server.
4. Open `model-studio.html`; drag to inspect both sides.
5. Select **Export fish.glb**. Copy the downloaded file into `models/fish.glb`.
6. Open `index.html?preview=1` through the same local server. Check the fish, markings and fin motion.
7. Commit the source, exported GLB and updated credit notes on `feature/models-sanuk`.

No Blender installation or Node build is required to use the supplied model or the browser model studio. If importing a replacement fish from a website instead, check its licence permits public redistribution, preserve its source URL and creator credit, and adapt the placement/animation as needed.
