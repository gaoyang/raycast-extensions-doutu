import { environment } from "@raycast/api";
import fetch from "node-fetch";
import fs from "fs";
import proc from "child_process";

export default {
  imageToClipboard(imageUrl: string) {
    fetch(imageUrl).then((response) => {
      response.arrayBuffer().then((data) => {
        const imagePath = environment.assetsPath + "/test.png";
        fs.writeFile(imagePath, new Uint8Array(data), "binary", (err: any) => {
          if (err) console.error(err);
        });
        proc.exec(`osascript -e 'set the clipboard to (read (POSIX file "${imagePath}") as JPEG picture)'`);
        fs.unlink(imagePath, (err: any) => {
          if (err) console.error(err);
        });
      });
    });
  },
};
