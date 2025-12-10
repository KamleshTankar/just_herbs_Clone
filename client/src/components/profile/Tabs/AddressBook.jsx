import React from "react";

const AddressBook = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Address Book</h2>

      {user.addresses?.length ? (
        <ul className="space-y-4">
          {user.addresses.map((address, index) => (
            <li
              key={index}
              className="p-4 border rounded-lg bg-gray-50 text-gray-700"
            >
              <p>
                {address.House}, {address.Street}
              </p>
              <p>
                {address.City}, {address.State}
              </p>
              <p>
                {address.Country} - {address.Zip}
              </p>
              <p className="mt-1 text-sm">
                <span className="font-medium">Type:</span> {address.Type}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No addresses added yet.</p>
      )}
    </div>
  );
};

export default AddressBook;
