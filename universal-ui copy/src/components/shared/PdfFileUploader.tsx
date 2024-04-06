import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone"; // Import Accept type from react-dropzone

import { Button } from "@/components/ui";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const pdfFiles = acceptedFiles.filter(file => file.type === "application/pdf");
      setFile(pdfFiles);
      fieldChange(pdfFiles);
      setFileUrl(pdfFiles.length ? URL.createObjectURL(pdfFiles[0]) : "");
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
    "appicaton/pdf": [".pdf", "epub"]
    }, // Pass an array of strings
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
          <embed src={fileUrl} type="application/pdf" width="100%" height="500px" />
        </div>
      ) : (
        <div className="file_uploader-box ">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file upload"
          />

          <h3 className="base-medium text-light-2 mb-2 mt-6">Drag PDF file here</h3>
          <p className="text-light-4 small-regular mb-6">PDF files only</p>

          <Button type="button" className="shad-button_dark_4">
            Select PDF from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;

