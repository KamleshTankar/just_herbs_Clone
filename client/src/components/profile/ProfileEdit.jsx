import React,{useState} from 'react'

const ProfileEdit = () => {
    const [formData, setFormData] = useState({
      Firstname: "",
      Lastname: "",
      email: "",
      number: "",
      gender: "",
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
  };
  
  return (
    <>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow mt-10">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-gray-600">First Name</label>
            <input
              name="Firstname"
              value={formData.Firstname}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Last Name</label>
            <input
              name="Lastname"
              value={formData.Lastname}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Phone Number</label>
            <input
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <button
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}

export default ProfileEdit