import React, { useCallback } from "react";
import { FaRegImage, FaTrash } from "react-icons/fa6";

const DragDropUpload = ({ images, setImages }) => {
  const handleFiles = useCallback(
    (files) => {
      const validFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );

      setImages((prev) => [...prev, ...validFiles]);
    },
    [setImages]
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const onChange = useCallback(
    (e) => handleFiles(e.target.files),
    [handleFiles]
  );

  const removeImage = useCallback(
    (index) => {
      setImages((prev) => prev.filter((_, i) => i !== index));
    },
    [setImages]
  );

  return (
    <div className="space-y-4">
      {/* Drop Area */}
      <label
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 transition"
      >
        <FaRegImage className="text-4xl text-gray-400" />
        <p className="text-sm text-gray-600 mt-2">
          Drag & drop images here or click to upload
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
      </label>

      {/* Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((file, index) => (
            <div
              key={index}
              className="relative group border rounded-lg overflow-hidden"
            >
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-full h-32 object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <FaTrash size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DragDropUpload;
