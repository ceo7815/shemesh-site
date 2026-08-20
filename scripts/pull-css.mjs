const css = await fetch(
  "https://sunfinance.be-website.com/wp-content/uploads/elementor/css/post-10.css?ver=1786552034",
).then((r) => r.text());

const urls = [
  ...css.matchAll(/url\(([^)]+)\)/g),
].map((m) => m[1].replace(/['"]/g, ""));

console.log([...new Set(urls)].join("\n"));
