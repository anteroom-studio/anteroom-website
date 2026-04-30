# Anteroom Production Build

A multi-page static cinematic website for Anteroom — a research and engineering studio founded by ZAI in 2019.

## Run locally

```powershell
python -m http.server 5173
```

Open:

```text
http://localhost:5173
```

## Structure

```text
index.html                 Threshold/home journey
archive/index.html          Full artifact archive
research/index.html         Research/PDF library concept
studio/index.html           Private portfolio walkthrough
future/index.html           Future rooms
artifacts/*.html            Individual artifact pages
src/css/base.css            Full design system
src/js/core.js              Animation, cursor, reveals, parallax
src/js/app.js               Home page data mounting
src/data/artifacts.js       Main editable data file
assets/images               Generated images
assets/videos               Generated videos
```

## Edit artifacts

Most archive data lives in:

```text
src/data/artifacts.js
```

For full static artifact pages, edit the matching file in:

```text
artifacts/
```

## Deploy to GitHub Pages

Upload this folder contents to the repo root. No npm required.
