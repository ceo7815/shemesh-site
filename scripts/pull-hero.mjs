import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const html = await fetch("https://sunfinance.be-website.com/").then((r) => r.text());
writeFileSync(join(process.cwd(), "scripts", "old-home.html"), html);

const urls = new Set();
const re = /https?:\/\/sunfinance\.be-website\.com\/wp-content\/uploads\/[^"'\\\s)]+/g;
for (const m of html.matchAll(re)) {
  urls.add(m[0].replace(/\\u002d/g, "-").replace(/\\\//g, "/"));
}

const bgRe = /url\((?:&quot;|"|')?(https?:\/\/[^)"']+)(?:&quot;|"|')?\)/g;
for (const m of html.matchAll(bgRe)) urls.add(m[1]);

console.log([...urls].join("\n"));
