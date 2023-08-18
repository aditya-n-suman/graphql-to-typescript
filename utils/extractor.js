const fs = require("node:fs/promises");

fs.readFile("./output/index.ts", { encoding: "utf-8" })
  .then(async (res) => {
    const newLine = res.indexOf("\r\n") > -1 ? "\r\n" : "\n";
    const allLines = res.split(newLine);
    let result = "";
    try {
      allLines.forEach((line, idx) => {
        if (line.indexOf("WithIndex") > -1) throw new Error();
        if (idx) {
          let modifiedLine = line;
          if (line.indexOf("?:") > -1) {
            const parts = line.split("?:");
            modifiedLine = `${parts[0]}:${parts[1]}`;
          }
          result += `${modifiedLine}${newLine}`;
        }
      });
    } catch (error) {
      await fs.writeFile("./output/index.ts", result, { encoding: "utf-8" });
      console.log(
        "done!!!\n\nYour file is ready to consume at ./output/index.ts"
      );
    }
  })
  .catch((err) => console.log("Error in data conversion"));
