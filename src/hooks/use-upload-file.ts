"use client";

import { useState, useCallback } from "react";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import { useFirebase } from "@/firebase/provider";

export function useUploadFile() {
  const { storage } = useFirebase();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [uploadTask, setUploadTask] = useState<UploadTask | null>(null);

  const uploadFile = useCallback(
    (file: File, folder: string = "misc") => {
      if (!storage) {
        setError(new Error("Firebase Storage is not available."));
        return;
      }

      setIsUploading(true);
      setUploadProgress(0);
      setDownloadURL(null);
      setError(null);

      const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
      const task = uploadBytesResumable(storageRef, file);
      setUploadTask(task);

      task.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (err) => {
          setError(err);
          setIsUploading(false);
          setUploadTask(null);
        },
        async () => {
          try {
            const url = await getDownloadURL(task.snapshot.ref);
            setDownloadURL(url);
          } catch (err: any) {
            setError(err);
          } finally {
            setIsUploading(false);
            setUploadTask(null);
          }
        }
      );
    },
    [storage]
  );

  const cancelUpload = useCallback(() => {
    if (uploadTask) {
      uploadTask.cancel();
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [uploadTask]);

  return {
    uploadFile,
    cancelUpload,
    uploadProgress,
    downloadURL,
    isUploading,
    error,
  };
}
