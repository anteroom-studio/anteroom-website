# Anteroom — Agency Cinematic Static Build

A deploy-ready static website for Anteroom, the research and engineering studio founded by ZAI in 2019.

## Run locally

```powershell
python -m http.server 5173
```

Open:

```text
http://localhost:5173
```

## Deploy to GitHub Pages

Upload everything inside this folder to your GitHub Pages repository root.

## Edit artifacts

Open `src/main.js` and edit the `artifacts` array near the top.

## Assets

Videos live in:

```text
assets/videos/
```

Images live in:

```text
assets/images/
```

Keep filenames stable if you want to replace assets without touching code.
