import React from "react";
import { Link } from "react-router-dom";

const ProfileView = ({ user }) => {
  const address = user?.addresses?.[0];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {/* Profile Info */}
      <div className="flex gap-6">
        <img
          src={user.avatar || "https://via.placeholder.com/100"}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {user.Firstname} {user.Lastname}
          </h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-gray-500">{user.number}</p>

          <Link
            to="/profile/edit"
            className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Address */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Default Address</h3>

        {address ? (
          <p className="text-gray-600">
            {address.House}, {address.Street}, {address.City}, {address.State},
            {address.Country} - {address.Zip}
          </p>
        ) : (
          <p className="text-gray-500 italic">No address added yet</p>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
