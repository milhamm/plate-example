import { useState } from 'react';

interface UseUploadFileProps {
  onUploadComplete?: (file: UploadedFile) => void;
  onUploadError?: (error: unknown) => void;
  headers?: Record<string, string>;
  onUploadBegin?: (fileName: string) => void;
  onUploadProgress?: (progress: { progress: number }) => void;
  skipPolling?: boolean;
}

interface UploadedFile {
  key: string; // Unique identifier
  url: string; // Public URL of the uploaded file
  name: string; // Original filename
  size: number; // File size in bytes
  type: string; // MIME type
}

const wait = async (ms: number) => new Promise((res) => setTimeout(res, ms));

export function useUploadFile({
  onUploadComplete,
  onUploadError,
  // onUploadProgress,
}: UseUploadFileProps = {}) {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile>();
  const [uploadingFile, setUploadingFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  async function uploadFile(file: File) {
    setIsUploading(true);
    setUploadingFile(file);

    try {
      await wait(5000);

      const fileUrl = 'https://via.placeholder.com/150';
      const fileKey = 'asd';

      // // Get presigned URL and final URL from your backend
      // const { presignedUrl, fileUrl, fileKey } = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     filename: file.name,
      //     contentType: file.type,
      //   }),
      // }).then((r) => r.json());

      // // Upload to S3 using presigned URL
      // await axios.put(presignedUrl, file, {
      //   headers: { 'Content-Type': file.type },
      //   onUploadProgress: (progressEvent) => {
      //     const progress = (progressEvent.loaded / progressEvent.total) * 100;
      //     setProgress(progress);
      //     onUploadProgress?.({ progress });
      //   },
      // });

      const uploadedFile = {
        key: fileKey,
        url: fileUrl,
        name: file.name,
        size: file.size,
        type: file.type,
      };

      setUploadedFile(uploadedFile);
      onUploadComplete?.(uploadedFile);

      return uploadedFile;
    } catch (error) {
      onUploadError?.(error);
      throw error;
    } finally {
      setProgress(0);
      setIsUploading(false);
      setUploadingFile(undefined);
    }
  }

  return {
    isUploading,
    progress,
    uploadFile,
    uploadedFile,
    uploadingFile,
  };
}
