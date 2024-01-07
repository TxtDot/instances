const fs = require("fs");

const instances = JSON.parse(fs.readFileSync("instances.json", "utf8"));

fs.writeFileSync(
  "README.md",
  `# instances  

Instances of TXTDot proxies

| Name | Base URL | Search | Connection |
| ---- | -------- | ------ | ---------- |
${instances
  .map(
    (instance) =>
      `| ${instance.name} | <${instance.baseUrl}> | ${
        instance.search ? "enabled" : ""
      } | ${instance.HTTPS ? "https" : "http"}  |`
  )
  .join("\n")}
`
);
