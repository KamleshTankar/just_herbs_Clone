import React, { useCallback } from "react";
import { FaRegImage, FaTrash } from "react-icons/fa6";

const DragDropUpload = ({ image, setImage, preview, setPreview }) => {
  // const handleFiles = useCallback(
  //   (files) => {
  //     const validFiles = Array.from(files).filter((file) =>
  //       file.type.startsWith("image/")
  //     );

  //     setImages((prev) => [...prev, ...validFiles]);
  //   },
  //   [setImages]
  // );

  // const onDrop = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     handleFiles(e.dataTransfer.files);
  //   },
  //   [handleFiles]
  // );

  // const onChange = useCallback(
  //   (e) => handleFiles(e.target.files),
  //   [handleFiles]
  // );

  const removeImage = useCallback(() => {
    setPreview(null);
    setImage(null);
  }, [setPreview, setImage]);

    const handleImageChange = useCallback((e) => {
      const file = e.target.files[0];
      
      if (!file) return;

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      }
      reader.readAsDataURL(file);

    },[setImage, setPreview]);

  return (
    <div className="space-y-4">
      {/* Drop Area */}
      <label
        // onDrop={onDrop}
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
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {/* Preview Grid */}
      {image && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div
              className="relative group border rounded-lg overflow-hidden"
            >
              <img
                src={preview}
                alt="preview"
                className="w-full h-auto object-cover"
              />

              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <FaTrash size={14} />
              </button>
            </div>
        </div>
      )}
      {/* {images && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div
              className="relative group border rounded-lg overflow-hidden"
            >
              <img
                src={URL.createObjectURL(images)}
                alt="preview"
                className="w-full h-auto object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage()}
                className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <FaTrash size={14} />
              </button>
            </div>
        </div>
      )} */}
    </div>
  );
};

export default DragDropUpload;
