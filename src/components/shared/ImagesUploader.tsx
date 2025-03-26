import React from "react";
import { UploadDropzone } from "../utils/upload_dropzone";

interface ImagesUploaderProps {
  setValue: (value: string[]) => void;
  name: string;
  currentImages?: string[];
}

const ImagesUploader = ({ setValue, currentImages = [] }: ImagesUploaderProps) => {
  return (
    <>
      <UploadDropzone
        endpoint="imageUploader"

        onClientUploadComplete={(res) => {
          const urls = res.map((file) => file.ufsUrl);
          setValue([...currentImages, ...urls]);
        }}
        onUploadError={(err) => console.error(err)}
        appearance={{
          container: {
            padding: "0.5rem 0",
          },
        }}
      />
    </>
  );
};

export default ImagesUploader;
