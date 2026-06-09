# PopScene

Interactive streaming-style web app with:

- cinematic PopScene home screen
- Spider-Man trailer cards and study links
- local HLS player for `Michael.2026`
- theater-entry effects and movie playback modes

## Run Locally

From this folder:

```powershell
npm start
```

Then open:

```text
http://127.0.0.1:8787/
```

The local movie player uses:

```text
media/michael-2026/master.m3u8
```

## Notes

The HLS media folder is intentionally not tracked for public deployment. Keep licensed/local video chunks in `media/` on your own machine or replace the player source with a licensed CDN/HLS URL.
