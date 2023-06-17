import * as path from "node:path";
import * as url from "node:url";
import * as fs from "node:fs/promises";
import * as os from "node:os";
import { execSync } from "child_process";

(async () => {
  try {
    const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
    const chromeExecutablePath = "/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome";
    const app = `file://${path.join(__dirname, "index.html")}`;

    const screenshotsDirectory = path.join(os.homedir(), "Desktop");
    const watcher = fs.watch(screenshotsDirectory);
    for await (const event of watcher) {
      if (event.eventType === "change" && event.filename.startsWith("Screenshot")) {
        const screenshot = `file:///Users/jamescraig/Desktop/${encodeURIComponent(event.filename)}`;
        execSync(`${chromeExecutablePath} --app=${app}?screenshot=${screenshot}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
})();
