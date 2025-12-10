import React from "react";

const Settings = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-gray-700">
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

      <p className="text-gray-600">User ID: {user.id}</p>

      <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
        Delete Account
      </button>
    </div>
  );
};

export default Settings;
