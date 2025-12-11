import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import ProfileView from './ProfileView'
import Orders from "./Tabs/Oders";
import AddressBook from "./Tabs/AddressBook";
import Settings from "./Tabs/Settings";
import { useNavigate } from 'react-router';

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const { user } = useSelector((state) => state.User);

  const navigate= useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

    const tabs = [
      { id: "profile", label: "Profile" },
      { id: "orders", label: "Orders" },
      { id: "address", label: "Address Book" },
      { id: "settings", label: "Settings" },
    ];
  
  return (
    <>
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