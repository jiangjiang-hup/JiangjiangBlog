import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import {
  parse,
  compileScript,
  compileTemplate,
  compileStyle,
} from "@vue/compiler-sfc";
import assert from "node:assert/strict";

// Validate SFCs in memory without running a production build.
function checkDirectory(directory) {
  for (const item of readdirSync(directory, { withFileTypes: true })) {
    const filename = resolve(directory, item.name);
    if (item.isDirectory()) {
      checkDirectory(filename);
      continue;
    }
    if (!filename.endsWith(".vue")) continue;
    const source = readFileSync(filename, "utf8");
    const { descriptor, errors } = parse(source, { filename });
    assert.deepEqual(errors, [], `${filename}: parse errors`);
    const script = compileScript(descriptor, { id: filename });
    const template = compileTemplate({
      source: descriptor.template.content,
      filename,
      id: filename,
      compilerOptions: { bindingMetadata: script.bindings },
    });
    assert.deepEqual(template.errors, [], `${filename}: template errors`);
    for (const match of source.matchAll(/from ['"](\.[^'"]+)['"]/g)) {
      const target = resolve(dirname(filename), match[1].split("?")[0]);
      assert.ok(
        existsSync(target) || existsSync(`${target}.js`),
        `Missing import: ${match[1]}`,
      );
    }
    console.log(`PASS ${filename}`);
  }
}
checkDirectory(resolve("src"));
const css = compileStyle({
  source: readFileSync("src/style.css", "utf8"),
  filename: "src/style.css",
  id: "global",
});
assert.deepEqual(css.errors, [], "Stylesheet parse errors");
const contentSource = readFileSync("src/content.js", "utf8").replace(
  /^import (\w+) from ["']([^"']+)["'];?$/gm,
  (_, binding, path) => {
    assert.ok(existsSync(resolve("src", path)), `Missing content asset: ${path}`);
    const value = path.endsWith(".json")
      ? JSON.parse(readFileSync(resolve("src", path), "utf8"))
      : path;
    return `const ${binding} = ${JSON.stringify(value)};`;
  },
);
const content = await import(
  `data:text/javascript,${encodeURIComponent(contentSource)}`
);
for (const collection of [content.projects, content.articles]) {
  assert.equal(
    new Set(collection.map((item) => item.id)).size,
    collection.length,
    "Duplicate content ID",
  );
  for (const item of collection) {
    assert.match(item.id, /^[a-z-]+$/);
    assert.ok(item.sections.length > 0);
    for (const section of item.sections)
      assert.ok(section.length === 2 && section.every(Boolean));
  }
}
console.log(
  `PASS stylesheet, ${content.projects.length} projects and ${content.articles.length} articles`,
);
