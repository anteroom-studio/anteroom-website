# Anteroom Studio

A cinematic research and engineering studio website for Anteroom — founded by ZAI in 2019.

## Run locally

```bash
npm install
npm run dev
```

## Build for deployment

```bash
npm run build
```

## Edit artifacts

All repository/archive items live here:

```bash
src/data/artifacts.js
```

Add or edit objects using this shape:

```js
{
  id: '30',
  name: 'New Tool Name',
  category: 'ZAI Core',
  status: 'Live artifact',
  year: '2026',
  repo: 'GitHub-Repo-Name',
  description: 'Short description shown in the archive panel.',
  line: 'Poetic one-line artifact statement.'
}
```

The GitHub link is generated as:

```txt
https://github.com/zawwarsami16/<repo>
```

## Asset names

```txt
public/assets/images/hero-threshold.png
public/assets/videos/hero-threshold.mp4
public/assets/images/archive-field.png
public/assets/videos/archive-field.mp4
public/assets/images/research-chamber.png
public/assets/videos/research-chamber.mp4
public/assets/images/exit-corridor.png
public/assets/videos/exit-corridor.mp4
```

Keep the same filenames if you replace assets later.
