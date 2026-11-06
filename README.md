# Little Reef Aquarium

A small interactive AR aquarium. Point your camera at a Hiro marker to see the fish, coral, bubbles and treasure chest.

## Run

Open the project with VS Code Live Server, or run `python -m http.server 8000 --bind 127.0.0.1` in the project folder and visit `http://localhost:8000/`. Allow camera access and display `marker.html` on another screen or print it. For phone camera testing, host the project over HTTPS. Internet access is required.

Add `?preview=1` to the page URL for a 3D preview without a camera. Tap the bubble to change its colour and the chest to grow or shrink it. Use **Pause motion** to pause the animations.

Fish asset: Little Reef procedural fish, generated from `model-source/fish-builder.js`, licensed under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). See `models/LICENSE-CC0.txt`.
