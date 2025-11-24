import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * AddReview
 * Props:
 *  - productId (required): id of the product being reviewed
 *  - onReviewAdded (optional): callback(review) called when review is successfully created
 *  - apiPath (optional): override API endpoint base path (default: /api/products)
 *
 * Usage:
 *  <AddReview productId={id} onReviewAdded={(r) => setReviews(prev => [r, ...prev])} />
 */

export default function AddReview({ productId, onReviewAdded, apiPath = "/api/products" }) {
    const [rating, setRating] = useState(5);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const resetForm = () => {
        setRating(5);
        setTitle("");
        setComment("");
    };

    const validate = () => {
        if (!productId) return "Missing product id.";
        if (!rating || rating < 1 || rating > 5) return "Rating must be between 1 and 5.";
        if (!comment || comment.trim().length < 10) return "Comment must be at least 10 characters.";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const err = validate();
        if (err) {
            setError(err);
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch(`${apiPath}/${encodeURIComponent(productId)}/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ rating, title: title.trim(), comment: comment.trim() }),
            });

            if (!res.ok) {
                const payload = await res.json().catch(() => ({}));
                throw new Error(payload.message || `Request failed: ${res.status}`);
            }

            const created = await res.json().catch(() => null);
            setSuccess("Review added.");
            resetForm();
            if (onReviewAdded) onReviewAdded(created);
        } catch (err) {
            setError(err.message || "Unable to submit review.");
        } finally {
            setSubmitting(false);
        }
    };

    const Star = ({ index }) => (
        <button
            type="button"
            aria-label={`${index} stars`}
            onClick={() => setRating(index)}
            className="ar-star"
            style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: 22,
                color: index <= rating ? "#f5a623" : "#ddd",
                padding: 4,
            }}
        >
            ★
        </button>
    );

    return (
        <form onSubmit={handleSubmit} className="add-review-form" style={{ maxWidth: 640 }}>
            <div style={{ marginBottom: 8 }}>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Your rating</label>
                <div>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} index={i} />
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: 8 }}>
                <label style={{ display: "block", marginBottom: 6 }}>Title (optional)</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Short title for your review"
                    maxLength={120}
                    disabled={submitting}
                    style={{ width: "100%", padding: "8px 10px", boxSizing: "border-box" }}
                />
            </div>

            <div style={{ marginBottom: 8 }}>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Comment</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience (min 10 characters)"
                    rows={5}
                    disabled={submitting}
                    style={{ width: "100%", padding: "8px 10px", boxSizing: "border-box" }}
                />
            </div>

            {error && (
                <div role="alert" style={{ color: "crimson", marginBottom: 8 }}>
                    {error}
                </div>
            )}
            {success && (
                <div role="status" style={{ color: "green", marginBottom: 8 }}>
                    {success}
                </div>
            )}

            <div style={{ display: "flex", gap: 8 }}>
                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        padding: "8px 14px",
                        background: "#0070f3",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        cursor: submitting ? "not-allowed" : "pointer",
                    }}
                >
                    {submitting ? "Submitting..." : "Submit review"}
                </button>

                <button
                    type="button"
                    onClick={() => {
                        resetForm();
                        setError("");
                        setSuccess("");
                    }}
                    disabled={submitting}
                    style={{
                        padding: "8px 14px",
                        background: "#eee",
                        border: "1px solid #ccc",
                        borderRadius: 4,
                        cursor: submitting ? "not-allowed" : "pointer",
                    }}
                >
                    Reset
                </button>
            </div>
        </form>
    );
}

AddReview.propTypes = {
    productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onReviewAdded: PropTypes.func,
    apiPath: PropTypes.string,
};