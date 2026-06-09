const http = require("http");
const fs = require("fs");
const path = require("path");

const baseDir = __dirname;
const port = Number(process.env.PORT || 8787);

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "application/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".md", "text/markdown; charset=utf-8"],
  [".png", "image/png"],
  [".m3u8", "application/vnd.apple.mpegurl"],
  [".ts", "video/mp2t"],
  [".mp4", "video/mp4"]
]);

http.createServer((req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${port}`);
  const route = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const target = path.resolve(baseDir, `.${route}`);

  if (!target.startsWith(baseDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.stat(target, (error, stat) => {
    if (error || !stat.isFile()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": mime.get(path.extname(target).toLowerCase()) || "application/octet-stream"
    });
    fs.createReadStream(target).pipe(res);
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`PopScene running at http://127.0.0.1:${port}/`);
});
