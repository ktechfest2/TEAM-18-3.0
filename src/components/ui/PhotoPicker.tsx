"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

type PhotoPickerProps = {
  label: string; // shown in the empty box, e.g. "Result sheet photo"
  height?: number;
};

// Take a photo with the camera or upload one from the gallery, with a preview.
// TODO: upload the chosen file with the report (and keep it for offline sending).
export function PhotoPicker({ label, height = 230 }: PhotoPickerProps) {
  const [photo, setPhoto] = useState<{ file: File; previewUrl: string } | null>(null);
  const cameraInput = useRef<HTMLInputElement>(null);
  const galleryInput = useRef<HTMLInputElement>(null);

  // Free the preview's memory when the photo changes or the screen closes.
  useEffect(() => {
    return () => {
      if (photo) URL.revokeObjectURL(photo.previewUrl);
    };
  }, [photo]);

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const chosen = event.target.files?.[0];
    if (chosen) setPhoto({ file: chosen, previewUrl: URL.createObjectURL(chosen) });
    event.target.value = ""; // allow choosing the same file again
  }

  function removePhoto() {
    setPhoto(null);
  }

  const file = photo?.file;
  const previewUrl = photo?.previewUrl;

  const sizeMb = file ? (file.size / 1024 / 1024).toFixed(1) : null;

  return (
    <>
      <div
        className="img"
        style={{
          height,
          position: "relative",
          flexDirection: "column",
          gap: 8,
          border: "1px solid var(--line)",
          overflow: "hidden",
          backgroundImage: previewUrl ? `url(${previewUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {file ? (
          <>
            <span className="badge" style={{ position: "absolute", top: 12, left: 12, background: "var(--ink)", color: "#fff" }}>
              {file.name} · {sizeMb} MB
            </span>
            <button
              className="ibtn"
              type="button"
              aria-label="Remove photo"
              onClick={removePhoto}
              style={{ position: "absolute", top: 10, right: 10, width: 36, height: 36 }}
            >
              <Icon name="close" size="s" />
            </button>
          </>
        ) : (
          <>
            <Icon name="document" size="l" />
            <span>{label}</span>
          </>
        )}
      </div>

      <div className="grid2" style={{ gap: 10 }}>
        <button className="btn ghost" type="button" style={{ height: 46, fontSize: 14 }} onClick={() => cameraInput.current?.click()}>
          <Icon name="camera" size="s" />
          {file ? "Retake" : "Take photo"}
        </button>
        <button className="btn ghost" type="button" style={{ height: 46, fontSize: 14 }} onClick={() => galleryInput.current?.click()}>
          <Icon name="upload" size="s" />
          Upload
        </button>
      </div>

      {/* Hidden file inputs: "capture" opens the back camera on phones */}
      <input ref={cameraInput} type="file" accept="image/*" capture="environment" hidden onChange={handleFile} />
      <input ref={galleryInput} type="file" accept="image/*" hidden onChange={handleFile} />
    </>
  );
}
