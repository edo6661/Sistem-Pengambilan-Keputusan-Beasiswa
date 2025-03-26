import React from "react";
import { UploadDropzone } from "../utils/upload_dropzone";
interface ImageUploaderProps {
  setValue: (value: string) => void;
  name: string;
}
const ImageUploader = ({ setValue }: ImageUploaderProps) => {
  return (
    <>
      <UploadDropzone
        endpoint="imageUploader"


        onClientUploadComplete={(res) => {
          setValue(
            res[0].ufsUrl
          )
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

export default ImageUploader;
