// src/components/ImageUpload.jsx

import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";
import "./CreateListing.css"; // Or your unified CSS file path

const ImageUpload = ({ value = [], onFilesChange, error }) => {
  const [previews, setPreviews] = useState([]);

  // ✅ This effect is the key to fixing "sticky previews".
  useEffect(() => {
    // If the parent form's value for this field is empty, we MUST clear our previews.
    if (!value || value.length === 0) {
      // Before clearing the state, clean up any existing blob URLs from memory.
      previews.forEach((file) => URL.revokeObjectURL(file.preview));
      setPreviews([]);
      return;
    }

    // This part runs if the parent provides files, creating the visual previews.
    const newPreviews = value.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setPreviews(newPreviews);

    // This is a CRITICAL cleanup function. It runs when the component unmounts OR when `value` changes again.
    return () =>
      newPreviews.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [value]); // The dependency array `[value]` makes this component truly controlled by its parent.

  const onDrop = useCallback(
    (acceptedFiles) => {
      onFilesChange(acceptedFiles);
    },
    [onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".jpg", ".webp"] },
  });

  const removeAllPreviews = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onFilesChange([]); // Tell the parent form to clear the 'newImages' field.
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
          {previews.map((file) => (
            <div key={file.name} className="preview-item">
              <img src={file.preview} alt="Preview" />
            </div>
          ))}
          <button
            onClick={removeAllPreviews}
            className="preview-remove-btn"
            aria-label="Clear all new images"
            title="Clear all new images"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
