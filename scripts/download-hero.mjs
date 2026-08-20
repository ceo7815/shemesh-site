import { mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const dest = join(process.cwd(), "public", "hero");
mkdirSync(dest, { recursive: true });

const files = [
  [
    "01.jpg",
    "https://sunfinance.be-website.com/wp-content/uploads/2025/07/%D7%A2%D7%99%D7%A6%D7%95%D7%91-%D7%9C%D7%9C%D7%90-%D7%A9%D7%9D-2.jpg",
  ],
  [
    "02.jpg",
    "https://sunfinance.be-website.com/wp-content/uploads/2025/07/truth-concept-arrangement-with-magnifier-1-scaled.jpg",
  ],
  [
    "03.jpg",
    "https://sunfinance.be-website.com/wp-content/uploads/2025/07/financial-concept-with-wooden-cubes-magnifying-glass-grey-background-flat-lay-scaled.jpg",
  ],
  [
    "04.jpg",
    "https://sunfinance.be-website.com/wp-content/uploads/2025/07/truth-concept-arrangement-with-magnifier-scaled.jpg",
  ],
  [
    "05.jpg",
    "https://sunfinance.be-website.com/wp-content/uploads/2025/07/top-view-finance-business-elements-scaled-1.jpg",
  ],
  [
    "06.jpg",
    "https://sunfinance.be-website.com/wp-content/uploads/2025/07/business-colleagues-collaborating-and-discussing-project-plans-e1603078432543.jpg",
  ],
];

for (const [name, url] of files) {
  const res = await fetch(url);
  if (!res.ok) {
    console.error("FAIL", name, res.status, url);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(join(dest, name), buf);
  console.log("OK", name, buf.length);
}
