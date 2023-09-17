"use client";
import { Button, ColorPicker, QRCode } from "antd";
import { useState } from "react";

type ErrorLevelType = "L" | "M" | "Q" | "H";

export default function Home() {
  const [{ value, color, bgColor, icon, errorLevel }, setConfgQR] = useState({
    value: "https://getmyqrcode.vercel.app/",
    color: "#000",
    bgColor: "#fff",
    icon: "",
    errorLevel: "M" as ErrorLevelType,
  });

  const downloadQRCode = () => {
    const canvas = document
      .getElementById("myqrcode")
      ?.querySelector<HTMLCanvasElement>("canvas");
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement("a");
      let downloadTitle;
      try {
        downloadTitle = new URL(value).hostname.replaceAll(".", "_");
      } catch (error) {
        downloadTitle = value;
      }
      a.download = "getmyqrcode_" + downloadTitle;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <main>
      <section className="grid grid-cols-1 sm:grid-cols-2 min-h-screen container mx-auto m-4 font-bold text-xl">
        <div className="s ">
          <div
            id="myqrcode"
            className="flex items-center justify-center h-full border-r border-zinc-300"
          >
            <QRCode
              bordered
              errorLevel={errorLevel}
              bgColor={bgColor}
              color={color}
              value={value || "https://getmyqrcode.vercel.app/"}
              icon={icon}
            />
            <Button type="primary" onClick={downloadQRCode}>
              Download
            </Button>
          </div>
        </div>

        <section className="space-y-2 p-4">
          <div className="flex items-center gap-2">
            <label>Background Color</label>
            <ColorPicker
              className="bg-yellow-500"
              showText
              defaultValue={value}
              onChange={(_, hex) =>
                setConfgQR((prev) => ({ ...prev, bgColor: hex }))
              }
              onOpenChange={(isOpen) =>
                (document.body.style.overflow = isOpen ? "hidden" : "visible")
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Color</label>
            <ColorPicker
              className="bg-yellow-500"
              showText
              defaultValue={value}
              onChange={(_, hex) =>
                setConfgQR((prev) => ({ ...prev, color: hex }))
              }
              onOpenChange={(isOpen) =>
                (document.body.style.overflow = isOpen ? "hidden" : "visible")
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="icon">Value : </label>
            <input
              id="icon"
              type="text"
              className="r rounded-md focus:ring-0 focus:outline-none text-black p-2"
              value={value}
              onChange={(e) =>
                setConfgQR((prev) => ({ ...prev, value: e.target.value }))
              }
            />
          </div>
        </section>
      </section>
    </main>
  );
}
