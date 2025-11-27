import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";

import Bestseller from "../bestseller/BestSeller";
import Explores from "../Explores/ExploresInfo";

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1 text-yellow-400 text-3xl cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => setRating(star)}
          className={`transition text-h2 ${
            (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const AddReview = () => {
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
    title: "",
    media: null,
  });

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    const FetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error("Network response error");

        const data = await response.json();
        if (isMounted) setProduct(data);

      } catch (error) {
        console.log("Failed to fetch product:", error);
        if (isMounted) setError("Failed to load product");

      } finally {
        if (isMounted) setLoading(false);
      }
    };

    FetchProduct();

    return () => (isMounted = false);
  }, [id]);

    const handleChange = (e) => {
      const { name, value, files } = e.target;

      setNewReview((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
  };
  
    const handleSubmit = useCallback(
      (e) => {
        e.preventDefault();
        console.log("Submitted Review:", newReview);
        alert("Review submitted!");
      },
      [newReview]
  );
  
  if (loading) return <p className="text-center mt-10">Loading product...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <section className="w-full mx-auto bg-white shadow-lg space-y-6">
      <div className=" flex items-center gap-4 bg-gray-50 p-3 rounded-md">
        <img src="" alt="user-profile" className="rounded-full" />
        <span className="font-semibold">user name</span>
      </div>

      <div className=" w-4/5 mx-auto flex gap-4 items-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className=" w-40 h-40"
        />
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">How was the item ?</h1>
          <h3 className="text-gray-400 text-xl font-medium mb-4">
            {product?.title}
          </h3>
        </div>
      </div>

      <form onSubmit={handleSubmit} className=" w-4/5 mx-auto space-y-6">
        <div>
          <h5 className="font-semibold mb-2">Rating</h5>
          <StarRating
            rating={newReview.rating}
            setRating={(r) => setNewReview((prev) => ({ ...prev, rating: r }))}
          />
        </div>

        <div>
          <h5 className="font-semibold mb-2">Write a Review</h5>
          <textarea
            name="comment"
            value={newReview.comment}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 h-28 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Share your thoughts..."
          />
        </div>

        <div>
          <h5 className="font-semibold mb-4">Share a video or photo</h5>
          <input
            type="file"
            id="file"
            name="media"
            onChange={handleChange}
            className="hidden"
          />
          <label
            htmlFor="file"
            className=" px-[30rem] py-3 bg-gray-100 border-2 border-dashed rounded-lg"
          >
            upload
          </label>
        </div>

        <div>
          <h5 className="font-semibold mb-2">Title your Review (required)</h5>
          <input
            type="text"
            name="title"
            value={newReview.title}
            onChange={handleChange}
            required
            placeholder="What's most important to know?"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-lg shadow-md transition"
          >
            Submit Review
          </button>
        </div>
      </form>

      <Explores />
      <Bestseller />
    </section>
  );
};

export default AddReview;
