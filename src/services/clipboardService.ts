import { environment, showHUD, showToast, Toast } from "@raycast/api";
import fetch from "node-fetch";
import fs from "fs";
import proc from "child_process";
import imageType from "image-type";

export default {
  imageToClipboard: async (imageUrl: string) => {
    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Waiting",
      message: "Being copied to the clipboard...",
    });
    const tempDir = `${environment.assetsPath}/temp`;
    if (!fs.existsSync(tempDir)) await fs.mkdirSync(tempDir);
    else {
      const files = fs.readdirSync(tempDir);
      if (files.length >= 10) files.forEach((file) => fs.unlinkSync(`${tempDir}/${file}`));
    }

    // console.log(imageUrl);
    const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    const response = await fetch(imageUrl);
    const data = await response.arrayBuffer();
    const buffer = new Uint8Array(data);
    const type = await imageType(buffer);
    let file = `${tempDir}/${fileName}`;
    if (!fileName.endsWith(`.${type?.ext}`)) file += `.${type?.ext}`;
    // console.log(file);
    await fs.writeFileSync(file, new Uint8Array(data), "binary");
    proc.exec(`osascript -e 'set the clipboard to POSIX file "${file}"'`);
    toast.hide();
    showHUD("✅ Copied to clipboard");
  },
};
