// lib/imageProcessor.js

import heic2any from "heic2any";


// 真实格式检测（HEIC/PNG/JPEG/...）
export async function detectFileType(file) {
  const header = await file.slice(0, 16).arrayBuffer();
  const u8 = new Uint8Array(header);

  if (u8[0] === 0x89 && u8[1] === 0x50 && u8[2] === 0x4E && u8[3] === 0x47) {
    return "image/png";
  }

  if (u8[0] === 0xFF && u8[1] === 0xD8 && u8[2] === 0xFF) {
    return "image/jpeg";
  }

  if (header.byteLength >= 12) {
    const ftyp = String.fromCharCode(...new Uint8Array(header.slice(4, 8)));
    const brand = String.fromCharCode(...new Uint8Array(header.slice(8, 12)));
    if (ftyp === "ftyp" && ["heic", "heix", "hevc", "mif1"].includes(brand)) {
      return "image/heic";
    }
  }

  return file.type || "application/octet-stream";
}

// 转换 HEIC → JPEG
export async function convertHeicToJpeg(file, quality = 0.9) {
  const blob = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality
  });

  return new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
    type: "image/jpeg"
  });
}

// 主方法：自动判断并处理
export async function processImageFile(file) {
  const realType = await detectFileType(file);
  if (realType === "image/heic") {
    console.log("[HEIC DETECTED] → Converting to JPG");
    return await convertHeicToJpeg(file);
  }
  return file;
}
