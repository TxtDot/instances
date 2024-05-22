const fs = require("fs");

const instances = JSON.parse(fs.readFileSync("instances.json", "utf8"));

function badge(url, label, path) {
  return `![${label}](https://img.shields.io/badge/dynamic/json?url=${encodeURIComponent(
    url
  )}&query=${encodeURIComponent(path)}&label=${encodeURIComponent(label)})`;
}

function static(label, text) {
  return `![${label}](https://img.shields.io/badge/${label}-${text}-blue)`;
}

async function run() {
  fs.writeFileSync(
    "README.md",
    `# Instances of TXTDot proxies
    \r${(
      await Promise.all(
        instances.map(async (instance) => {
          if (typeof instance === "string") {
            const config_url = instance + "/configuration/json";
            try {
              await fetch(config_url).then((res) => res.json());

              return `- <${instance}> ${badge(
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
              )}`;
            } catch {
              return `- <${instance}>`;
            }
          } else {
            return `- <${instance.baseUrl}> ${
              instance.search ? static("search", "enabled") : ""
            } ${
              instance.HTTPS
                ? static("protocol", "https")
                : static("protocol", "http")
            }`;
          }
        })
      )
    ).join("\n")}
  `
  );
}

run();
