const fs = require("fs");

const instances = JSON.parse(fs.readFileSync("instances.json", "utf8"));

fs.writeFileSync(
  "README.md",
  `# instances  

Instances of TXTDot proxies

| Name | Base URL | Secure |
| ---- | -------- | ------ |
${instances.map(
  (instance) =>
    `| ${instance.name} | <${instance.baseUrl}> | ${instance.secure} |`
)}
`
);
