"use client"

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

const FileUpload = ({ 
  onChange,
  endpoint
}: FileUploadProps) => {
  return (
    <UploadDropzone
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => toast.error(`${error?.message}`)}
      endpoint={endpoint}
    />
  );
}
 
export default FileUpload;