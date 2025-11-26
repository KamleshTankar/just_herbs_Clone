// import React, { memo } from "react";
// import { Link } from "react-router";

// const RatingBreakdown = memo(() => {
//   const stars = [5, 4, 3, 2, 1];

//   return (
//     <div className="space-y-1">
//       {stars.map((star) => (
//         <div key={star} className="flex items-center justify-between text-sm">
//           <span className="text-gray-600">{star} star</span>
//           <div className="w-40 bg-gray-200 rounded h-2 overflow-hidden">
//             <div
//               className="bg-yellow-400 h-full"
//               style={{ width: `${star * 10}%` }}
//             ></div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// });

// const ReviewCard = memo(() => {
//   return (
//     <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white space-y-3">
//       <div className="flex items-center gap-3">
//         <img
//           src=""
//           alt="user-profile"
//           className="w-10 h-10 rounded-full bg-gray-300"
//         />
//         <h4 className="font-semibold text-gray-800">User Name</h4>
//       </div>

//       <div className="flex items-center gap-4">
//       <span className="text-yellow-400 text-lg">★★★★★</span>
//       <h2 className="text-lg font-semibold text-gray-900">Review Title</h2>
//       </div>
      
//       <span>Reviewed in India on 9 October 2025</span>

//       <p className="text-sm text-gray-700 leading-relaxed">
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
//         expedita voluptatibus. Quasi, dolorem velit optio vel labore unde
//         maiores? Magnam minus nesciunt sed voluptatibus fugiat similique
//         laboriosam molestiae.
//       </p>

//       <div className="text-sm text-gray-500">
//         <span className="cursor-pointer hover:underline">Helpful</span> |{" "}
//         <span className="cursor-pointer hover:underline">Report</span>
//       </div>
//     </div>
//   );
// });

// const ProductReview = () => {
//   return (
//     <section className="flex flex-col md:flex-row gap-10 p-6 md:p-10 bg-gray-50">
//       {/* Left Sidebar */}
//       <aside className="md:w-1/3 space-y-8 bg-white p-5 rounded-lg shadow-sm border border-gray-200">
//         <div>
//           <h3 className="text-xl font-bold mb-3">Customer Reviews</h3>

//           <div className="flex items-center gap-2 mb-1">
//             <span className="text-yellow-400 text-lg">★★★★★</span>
//             <span className="text-gray-700 font-medium">4.1 out of 5</span>
//           </div>

//           <span className="text-sm text-gray-500">767 ratings</span>

//           <div className="mt-4">
//             <RatingBreakdown />
//           </div>

//           <div className="border-b border-gray-300 pb-2 mt-4">
//             <span className="text-blue-600 text-sm cursor-pointer hover:underline">
//               How are ratings calculated?
//             </span>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <h3 className="text-lg font-semibold">Review this product</h3>
//           <p className="text-sm text-gray-600">
//             Share your thoughts with other customers
//           </p>
//           <Link to="/review/create-review"
//             className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm shadow"
//           >
//             Write a product review
//           </Link>
//         </div>
//       </aside>

//       {/* Main Reviews Section */}
//       <main className="flex-1 space-y-6">
//         <h2 className="text-xl font-bold text-gray-800">
//           People Top reviews
//         </h2>

//         {/* Example Review */}
//         <ReviewCard />
//         <ReviewCard />
//         <ReviewCard />
//         <ReviewCard />
//       </main>
//     </section>
//   );
// };

// export default ProductReview;

import React, { memo } from "react";
import { Link } from "react-router-dom";

/* --------------------------- STAR RATING COMPONENT --------------------------- */
const StarRating = memo(({ value = 5 }) => {
  const stars = "★★★★★".slice(0, value);
  return <span className="text-yellow-400 text-lg">{stars}</span>;
});

/* --------------------------- RATING BREAKDOWN --------------------------- */
const RatingBreakdown = memo(() => {
  const ratings = [
    { star: 5, percent: 70 },
    { star: 4, percent: 20 },
    { star: 3, percent: 7 },
    { star: 2, percent: 2 },
    { star: 1, percent: 1 },
  ];

  return (
    <div className="space-y-2">
      {ratings.map((item) => (
        <div
          key={item.star}
          className="flex items-center justify-between text-sm"
        >
          <span className="text-gray-600">{item.star} star</span>
          <div className="w-40 bg-gray-200 rounded h-2">
            <div
              className="bg-yellow-400 h-full rounded"
              style={{ width: `${item.percent}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
});

/* --------------------------- INDIVIDUAL REVIEW CARD --------------------------- */
const ReviewCard = memo(({ review }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white space-y-3">
      <div className="flex items-center gap-3">
        <img
          src={review.profileImg || ""}
          alt="user-profile"
          className="w-10 h-10 rounded-full bg-gray-300"
        />
        <h4 className="font-semibold text-gray-800">{review.userName}</h4>
      </div>

      <div className="flex items-center gap-4">
        <StarRating value={review.rating} />
        <h2 className="text-lg font-semibold text-gray-900">{review.title}</h2>
      </div>

      <span className="text-xs text-gray-500">
        Reviewed in {review.location} on {review.date}
      </span>

      <p className="text-sm text-gray-700 leading-relaxed">
        {review.description}
      </p>

      <div className="text-sm text-gray-500">
        <span className="cursor-pointer hover:underline">Helpful</span> |{" "}
        <span className="cursor-pointer hover:underline">Report</span>
      </div>
    </div>
  );
});

/* --------------------------- MAIN PRODUCT REVIEW COMPONENT --------------------------- */
const ProductReview = ({Id}) => {
  // Mock reviews (can be replaced with API data)
  const reviews = [
    {
      userName: "Aman Verma",
      rating: 5,
      title: "Amazing product!",
      location: "India",
      date: "9 October 2025",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    },
    {
      userName: "Kiran Sharma",
      rating: 4,
      title: "Very good but expensive",
      location: "India",
      date: "12 October 2025",
      description:
        "Praesentium culpa voluptates sunt temporibus eius perferendis...",
    },
    {
      userName: "Rahul Singh",
      rating: 3,
      title: "Decent, could be better",
      location: "India",
      date: "5 October 2025",
      description:
        "Minus nesciunt sed voluptatibus fugiat similique laboriosam...",
    },
    {
      userName: "Priya Mehta",
      rating: 5,
      title: "Loved it!",
      location: "India",
      date: "1 October 2025",
      description:
        "Molestiae expedita voluptatibus quasi dolorem velit optio...",
    },
  ];

  return (
    <section className="flex flex-col md:flex-row gap-10 p-6 md:p-10 bg-gray-50">
      {/* --------------------------- LEFT SIDEBAR --------------------------- */}
      <aside className="md:w-1/3 space-y-8 bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <div>
          <h3 className="text-xl font-bold mb-3">Customer Reviews</h3>

          <div className="flex items-center gap-2 mb-1">
            <StarRating value={4} />
            <span className="text-gray-700 font-medium">4.1 out of 5</span>
          </div>

          <span className="text-sm text-gray-500">767 ratings</span>

          <div className="mt-4">
            <RatingBreakdown />
          </div>

          <div className="border-b border-gray-300 pb-2 mt-4">
            <span className="text-blue-600 text-sm cursor-pointer hover:underline">
              How are ratings calculated?
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Review this product</h3>
          <p className="text-sm text-gray-600">
            Share your thoughts with other customers
          </p>

          <Link
            to={`/review/create-review/${Id}`}
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm shadow"
          >
            Write a product review
          </Link>
        </div>
      </aside>

      {/* --------------------------- MAIN REVIEWS LIST --------------------------- */}
      <main className="flex-1 space-y-6">
        <h2 className="text-xl font-bold text-gray-800">Top reviews</h2>

        {reviews.map((rev, index) => (
          <ReviewCard key={index} review={rev} />
        ))}
      </main>
    </section>
  );
};

export default ProductReview;
