const fs = require("fs");

const instances = JSON.parse(fs.readFileSync("instances.json", "utf8"));

function badge(url, label, path) {
  return `![${label}](https://img.shields.io/badge/dynamic/json?url=${encodeURIComponent(
    url
  )}&query=${encodeURIComponent(path)}&label=${encodeURIComponent(label)})`;
}

async function run() {
  fs.writeFileSync(
    "README.md",
    `# Instances of TXTDot proxies\n\n|link|tags|\n|-|-|\n${(

        instances.map((instance) => {
          if (typeof instance === "string") {
            const config_url = instance + "/configuration/json";
            return `|<${instance}>|${badge(
              config_url,
              "version",
              "version"
            )} ${badge(config_url, "protocol", "protocol")} ${badge(
              config_url,
              "searx",
              "third_party.searx_url"
            )} ${badge(
              config_url,
              "webder",
              "third_party.webder_url"
            )} ${badge(
              config_url,
              "image compression",
              "proxy.img_compress"
            )}|`;

          }
        })
      )
.join("\n")}
  `
  );
}

run();
