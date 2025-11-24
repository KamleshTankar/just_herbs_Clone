import React, { useMemo } from "react";

/**
 * ProductReview.jsx
 *
 * Usage:
 * <ProductReview
 *   reviews={[{ id, user, rating, comment, createdAt }]}
 *   onSubmit={(review) => {}}
 *   user={{ id, name }}
 * />
 *
 * This component renders:
 * - average rating
 * - list of reviews
 * - accessible form to submit a new review (if user prop present)
 */

const starStyle = {
    cursor: "pointer",
    fontSize: "1.4rem",
    color: "#d0d0d0",
    marginRight: 6,
};

const filledStarStyle = {
    ...starStyle,
    color: "#f5a623",
};

function StarsDisplay ({ value, size = 20 }) {
    const rounded = Math.round(value * 2) / 2; // half-star resolution
    const stars = [1, 2, 3, 4, 5].map((n) => {
        const diff = rounded - n;
        let char = "☆";
        if (diff >= 0) char = "★";
        else if (diff >= -0.5) char = "⯪"; // visual half-star fallback
        return (
            <span
                key={n}
                aria-hidden="true"
                style={char === "★" ? { ...filledStarStyle, fontSize: size } : { ...starStyle, fontSize: size }}
            >
                {char}
            </span>
        );
    });
    return (
        <span aria-label={`Rating: ${value} out of 5`} title={`${value.toFixed(1)} / 5`}>
            {stars}
        </span>
    );
}

const  ProductReview=({ reviews = [] })=> {

    const avgRating = useMemo(() => {
        if (!reviews || reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
        return sum / reviews.length;
    }, [reviews]);

    function formatDate(iso) {
        try {
            return new Date(iso).toLocaleDateString();
        } catch {
            return iso;
        }
    }

    return (
        <section aria-label="product-reviews-heading" style={{ maxWidth: 800 }}>
            <h2 id="product-reviews-heading" style={{ marginBottom: 8 }}>Reviews</h2>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ fontSize: 28, fontWeight: 700 }}>{avgRating ? avgRating.toFixed(1) : "0.0"}</div>
                    <div>
                        <StarsDisplay value={avgRating} size={18} />
                        <div style={{ fontSize: 13, color: "#666" }}>{reviews.length} review{reviews.length !== 1 ? "s" : ""}</div>
                    </div>
                </div>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 20px" }}>
                {reviews.length === 0 && <li style={{ color: "#666" }}>Be the first to review this product.</li>}
                {reviews.map((r) => (
                    <li key={r.id} style={{ borderTop: "1px solid #eee", padding: "12px 0" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                            <div>
                                <div style={{ fontWeight: 600 }}>{r.user?.name || "Anonymous"}</div>
                                <div style={{ fontSize: 13, color: "#666" }}>{formatDate(r.createdAt)}</div>
                            </div>
                            <div><StarsDisplay value={Number(r.rating) || 0} size={14} /></div>
                        </div>
                        <p style={{ marginTop: 8, marginBottom: 0 }}>{r.comment}</p>
                    </li>
                ))}
            </ul>

        </section>
    );
}

export default ProductReview;