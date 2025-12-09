import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

  const { user } = useSelector((state) => state.User);

  const address = user?.addresses?.[0];
  
  return (
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
            {/* Optional Image */}
            <img
              src={user.avatar || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            {user.Firstname} {user.Lastname}
          </h1>

          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* User Info Section */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Gender:</span>
            <span className="font-medium">{user.gender}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Phone:</span>
            <span className="font-medium">{user.number}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Joined On:</span>
            <span className="font-medium">{user.joinedOn}</span>
          </div>
        </div>

        {/* Address Section */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Address</h2>

          {address ? (
            <div className="text-gray-600 space-y-1">
              <p>
                {address.House}, {address.Street}
              </p>
              <p>
                {address.City}, {address.State}
              </p>
              <p>
                {address.Country} - {address.Zip}
              </p>
              <p>
                <span className="font-medium">Type:</span> {address.Type}
              </p>
              <p>
                <span className="font-medium">Default:</span>{" "}
                {address.Default ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-medium">Landmark:</span>{" "}
                {address.Landmark}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 italic">No address available</p>
          )}
        </div>
      </div>
  );
}

export default Profile