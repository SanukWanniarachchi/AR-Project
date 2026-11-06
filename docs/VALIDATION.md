# Preparation validation

Prepared on 7 November 2026. This describes checks performed during project preparation, not tests performed by group members.

## Checked

- JavaScript syntax of the runtime files and fish modeling source using Node's syntax checker.
- Actual exported `models/fish.glb` loaded through A-Frame 1.6.0 in the camera-free project preview, rather than showing a procedural substitute.
- Aquarium rendered with the environment, fish, bubble, chest and text label.
- Direct pointer tap on the visible bubble changed its colour; the status notice changed from turquoise to purple.
- Direct pointer tap on the visible treasure chest enlarged it.
- The button form of the colour interaction worked.
- The browser fish model studio loaded the editable source and successfully downloaded a new GLB.
- The preview was checked in a 390-pixel-wide iframe; body width and scroll width were both 390 pixels. This is a layout check, not a phone hardware benchmark.
- No JavaScript errors were reported in the checked preview/model-studio browser logs.
- The preparation phase inspected the repository and collaborators without publishing the project. The later authorised initial upload contains only the common foundation and modeling assets.
- Packaging checks verify unique file ownership, expected paths, file hashes and ZIP integrity.

## Still required

- Real phone camera access, Hiro marker detection, direct touch precision, found/lost transitions and sustained performance.
- Denied-camera behaviour on the actual phone/browser combination.
- HTTPS publication and test of the actual hosted URL.
- Remaining member uploads to main, group review and real contribution/test notes.
- Submission Word document with the real group number and public repository link.

The preview does not emulate marker tracking. Desktop rendering and responsive layout do not establish phone AR frame rates. The complete reference package is the local assembled version; the common foundation and modeling assets are the first GitHub upload; the remaining members must add their assigned files.

## User-reported local result

The user reported that the local Hiro-marker test worked after displaying the complete marker with its border. This is user-reported laptop-camera testing, not an independently measured phone-performance result.
