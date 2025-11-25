import React,{useState} from 'react'

const AddReview = () => {
      const [newReview, setNewReview] = useState({
        name: "",
        rating: 0,
        comment: "",
      });
    
      const handleChange = (e) => {
        setNewReview({ ...newReview, [e.target.name]: e.target.value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!newReview.name || !newReview.rating || !newReview.comment) return;

        setNewReview({ name: "", rating: 0, comment: "" });
      };
    
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <h3>⭐ Add a Review</h3>

        <input
          name="name"
          type="text"
          placeholder="Your Name"
          value={newReview.name}
          onChange={handleChange}
        />

        <select
          name="rating"
          value={newReview.rating}
          onChange={handleChange}
        >
          <option value="0">Select Rating</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star
            </option>
          ))}
        </select>

        <textarea
          name="comment"
          placeholder="Your Review"
          value={newReview.comment}
          onChange={handleChange}
        />

        <button type="submit">
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default AddReview