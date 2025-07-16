import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";
import "../../utils css/CreateListing.css";

const ImageUpload = ({ value = [], onFilesChange, error }) => {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (!value || value.length === 0) {
      previews.forEach((file) => URL.revokeObjectURL(file.preview));
      setPreviews([]);
      return;
    }

    const newPreviews = value.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setPreviews(newPreviews);

    return () =>
      newPreviews.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      onFilesChange([...value, ...acceptedFiles]); // Append new files to existing ones
    },
    [onFilesChange, value]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".jpg", ".webp"] },
  });

  const removeFile = (e, fileToRemove) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedFiles = value.filter((file) => file !== fileToRemove);
    onFilesChange(updatedFiles);
  };

  return (
    <div className="form-group">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""} ${
          error ? "error-border" : ""
        }`}
      >
        <input {...getInputProps()} />
        <div className="dropzone-content">
          <UploadCloud size={48} />
          <p>
            {isDragActive
              ? "Drop files here..."
              : "Drag 'n' drop or click to upload"}
          </p>
        </div>
      </div>
      {error && <p className="error-message">{error.message}</p>}

      {previews.length > 0 && (
        <div className="previews-grid">
          {previews.map((file, index) => (
            <div key={index} className="preview-item">
              <img src={file.preview} alt="Preview" />
              <button
                onClick={(e) => removeFile(e, file)}
                className="preview-remove-btn"
                aria-label="Remove image"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
