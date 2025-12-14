'use client';

import UploadForm from "../../components/UploadForm/UploadForm";

export default function UploadPage() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <UploadForm className="align-self-center" />
    </div>
  );
}