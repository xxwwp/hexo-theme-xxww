const fs = require("fs");
const path = require("path");
console.log(__filename);
const config = {
  parseDir: path.join(__filename, "../..", "_posts"),
};

/**
 * @param {String} p
 */
function transformNavPath(p) {
  return path.parse(p).name;
}

/**
 *
 * @param {String} p
 */
async function parseDir(p) {
  if (fs.statSync(p).isFile() && (p.endsWith(".md") || p.endsWith(".MD"))) {
    return { path: transformNavPath(p) };
  } else {
    const files = fs.readdirSync(p, "utf-8");
    const children = [];
    for (const item of files) {
      children.push(await parseDir(path.join(p, item)));
    }
    return {
      path: transformNavPath(p),
      children,
    };
  }
}

parseDir(config.parseDir).then((val) =>
  console.log(JSON.stringify(val.children))
);
