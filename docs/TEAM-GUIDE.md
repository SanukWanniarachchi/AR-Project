# Little Reef simple group upload guide

Shared repository: https://github.com/SanukWanniarachchi/AR-Project

## Current decision: everyone uploads directly to main

The group has chosen to upload one person at a time to **main**, without feature branches or pull requests. This replaces the earlier branching instructions in the distributed packages. The file allocation has not changed.

The common foundation and SanukWanniarachchi's modeling files are the first upload. The other five members should add only their assigned files. Do not upload the starter again or overwrite another member's contribution. The website will be incomplete until all five remaining packages are added.

## What is already supplied

- Common: README.md, .gitignore, .nojekyll, js/core.js and shared documentation.
- Sanuk's modeling part: models/fish.glb, models/LICENSE-CC0.txt, model-source/fish-builder.js, model-studio.html and docs/MODEL-CREDITS.md.

js/core.js is shared by the feature components and the model studio. Coordinate with Sanuk before changing it. Read MEMBER-ALLOCATION.md for the exact other files.

## How each remaining member uploads

1. Wait for the previous person to finish and announce it in the group chat.
2. Sign in to your OWN GitHub account and open the shared repository.
3. Confirm the branch selector says **main**.
4. Extract your assigned member ZIP and open its **UPLOAD** folder.
5. On GitHub select **Add file > Upload files**.
6. Drag the CONTENTS of UPLOAD into the upload area. Keep the js, assets or docs subfolder paths. Do not upload the outer ZIP folder, the UPLOAD folder itself, READ-ME-FIRST.txt, or the ZIP.
7. Review the filenames and paths. Only your assigned files should be added or changed. If files already exist, check with their owner before replacing them.
8. Enter a truthful commit message, such as 'Add aquarium environment component'. Choose **Commit directly to main**, then commit.
9. Check your files on main and tell the next person they can upload.

The supplied code is an AI-assisted starter. Understand your feature and describe your actual changes/testing honestly. An upload is not proof that you originally authored the supplied code.

## Remaining allocation and suggested order

| Member | Files to upload |
| --- | --- |
| void-neo-7 | index.html, styles.css, js/app.js, js/fish-motion.js |
| pasindu0720 | js/environment.js |
| kalpanathisuni-gif | js/bubble.js |
| VidumuniTharika | js/treasure.js |
| dulendayarathna | js/marker-status.js, marker.html, assets/hiro.jpg, assets/ARJS-LICENSE.txt, docs/PHONE-TEST-RESULTS.md |

The complete-project ZIP is for local testing in a separate folder. Do not have every member upload it to main.

## GitHub Desktop alternative

Clone the shared repository, select main, fetch/pull the latest version, and then copy only your assigned UPLOAD contents into that clone. Review Changes, commit to main and Push origin. Announce completion before the next member starts. If a push is rejected, fetch/pull and inspect the changes; do not force-push or overwrite files blindly.

## Command-line alternative

Clone once, using your own Git identity:

```powershell
git clone https://github.com/SanukWanniarachchi/AR-Project.git
cd AR-Project
git switch main
git pull --ff-only origin main
```

Copy only your assigned files. Example for the bubble member:

```powershell
git add -- js/bubble.js
git diff --cached
git commit -m "Add bubble colour interaction and pulse"
git push origin main
```

Substitute your OWN file paths and commit message. Avoid git add . when the clone contains the complete reference project. Never force-push main. If another member has pushed since you pulled, stop and update your clone before retrying.

## Testing

Extract the full-project ZIP into a separate folder. Use VS Code Live Server, or with Python installed run this from the extracted project:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open http://localhost:8000/?preview=1 for camera-free 3D testing. Open http://localhost:8000/ for the laptop-camera Hiro mode. Do not double-click index.html as a file:// page.

Show the complete Hiro image on another screen or print it. Keep the thick black border AND outer white margin visible. Use assets/hiro.jpg or marker.html. Tilt the displaying phone to reduce glare; the Hiro lettering alone is not the full marker.

Internet is needed for the pinned CDN libraries. A phone's localhost points to that phone, not your laptop. For real phone AR testing, use the hosted HTTPS website and record the results in PHONE-TEST-RESULTS.md. A desktop preview is not a phone benchmark.

## Publishing and submission

After every assigned file is on main, open Settings > Pages. Choose Deploy from a branch, main, /(root), then Save. Wait for GitHub to display a successful deployment and its actual HTTPS URL. The expected format is https://sanukwanniarachchi.github.io/AR-Project/; this guide does not claim the site is already published.

Test the hosted site on a phone: camera permission, fish loading/movement, bubble pulse and direct colour tap, chest grow/shrink, and green found/red lost banner. Record real observations and evidence.

One member submits a Word document named with the real group number, containing the PUBLIC REPOSITORY link: https://github.com/SanukWanniarachchi/AR-Project. The website link can be included too but does not replace the required repository link.

## Optional branches for later changes

Branches are not required for the group's current upload plan. For future parallel changes, pull the latest main, create a feature branch, commit and push it, then open a PR with base main. Review and merge it before updating main locally. The older branch names in the ZIP instructions can be used for that optional workflow; do not create those branches just for this direct-main upload.

## Official references

- Upload files: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
- Branches: https://docs.github.com/en/pull-requests/how-tos/commit-changes/managing-branches-within-your-repository
- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
