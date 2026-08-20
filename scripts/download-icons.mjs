import { mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const dest = join(process.cwd(), "public", "icons");
mkdirSync(dest, { recursive: true });

const files = [
  ["info.png", "https://sunfinance.be-website.com/wp-content/uploads/2025/07/info_3475242.png"],
  ["completed.png", "https://sunfinance.be-website.com/wp-content/uploads/2025/07/completed_9020475.png"],
  ["giving.png", "https://sunfinance.be-website.com/wp-content/uploads/2025/07/giving_17338254.png"],
  ["time.png", "https://sunfinance.be-website.com/wp-content/uploads/2025/07/time-is-money_4388120.png"],
];

for (const [name, url] of files) {
  const res = await fetch(url);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(join(dest, name), buf);
  console.log(name, buf.length);
}
