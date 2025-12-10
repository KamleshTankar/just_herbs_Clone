import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import ProfileView from './ProfileView'
import Orders from "./Tabs/Oders";
import AddressBook from "./Tabs/AddressBook";
import Settings from "./Tabs/Settings";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const { user } = useSelector((state) => state.User);

  const address = user?.addresses?.[0];

    const tabs = [
      { id: "profile", label: "Profile" },
      { id: "orders", label: "Orders" },
      { id: "address", label: "Address Book" },
      { id: "settings", label: "Settings" },
    ];
  
  return (
    <>
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

      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Account</h1>

        {/* Tab Buttons */}
        <div className="flex gap-4 border-b pb-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 text-lg font-medium ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "profile" && <ProfileView user={user} />}
          {activeTab === "orders" && <Orders />}
          {activeTab === "address" && <AddressBook user={user} />}
          {activeTab === "settings" && <Settings user={user} />}
        </div>
      </div>
    </>
  );
}

export default Profile