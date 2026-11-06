# Assignment requirements and implementation

The assignment brief is AR Activity.docx. It allows a themed scene such as a museum, product demo or greeting card. Little Reef uses an aquarium theme.

| Written requirement | Implementation | Final evidence |
| --- | --- | --- |
| Start from the completed Lecture Step 5 project | Workshop-style A-Frame/AR.js structure and sphere colour interaction are reused from the supplied museum starter | Original lecture provenance is not verified. The group has chosen to proceed with the supplied starter; this is not a lecturer-approved exemption. |
| Hiro marker; four or more objects; two primitive types; one a-text label | Seabed box, sphere bubble/rocks, cylinder coral, cone coral, fish and chest; explicit a-text in js/app.js | Phone photograph showing the scene on the marker |
| Two objects animated using different properties | Fish position changes in fish-motion.js; bubble scale changes in bubble.js. Fin motion is an additional GLB animation. | Phone recording showing fish movement and bubble pulse |
| One glTF/GLB model other than the workshop duck; check licence and credit README | models/fish.glb, original procedural fish with embedded textures/animation, CC0 notice and README credit | Model loads on the hosted URL; source and licence notes available |
| Workshop ball colour change | Bubble sphere cycles colours when tapped | Show at least two colours |
| One new tappable object with a custom component | reef-treasure toggles normal/1.38x scale with easing | Show chest before and after tapping |
| Banner changes text and colour on found/lost | reef-status listens for markerFound/markerLost | Record green found and red lost states |
| HTTPS publication and phone test | GitHub Pages instructions supplied; not enabled automatically | Record actual URL, phone/browser/date and results |
| Group work; one submission; public repo URL in Word document named with group number | TEAM-GUIDE.md explains the final steps | Group completes their own Group_XX.docx and one member submits |

Camera-free preview mode is for development. It does not satisfy the phone-camera or marker-detection tests. A successful code upload is not proof that the AR app works on a phone.
