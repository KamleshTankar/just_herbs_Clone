import React, { useState } from "react";

const AddReviewModal = ({ open, setOpen, addReview }) => {
  const [form, setForm] = useState({
    author: "",
    text: "",
    rating: 5,
  });

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();

    const review = {
      ...form,
      img: "/avatars/default.png",
      verified: true,
    };

    addReview(review);
    setOpen(false);
    setForm({ author: "", text: "", rating: 5 });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Add Review</h2>

        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Your Name"
            required
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="w-full border p-3 rounded mb-3"
          />

          <textarea
            placeholder="Your Review"
            required
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            className="w-full border p-3 rounded mb-3"
          />

          <label className="font-medium">Rating:</label>
          <select
            value={form.rating}
            onChange={(e) =>
              setForm({ ...form, rating: Number(e.target.value) })
            }
            className="w-full border p-2 rounded mb-4"
          >
            <option value={5}>★★★★★</option>
            <option value={4}>★★★★☆</option>
            <option value={3}>★★★☆☆</option>
            <option value={2}>★★☆☆☆</option>
            <option value={1}>★☆☆☆☆</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
