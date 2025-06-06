

import React, { useEffect, useState, useContext } from 'react';
import { getAllUsers } from '../service/api';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers(user.token);
      console.log('Fetched users:', res.data);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center"> Users</h1>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Username
                </th>
                <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="border-b border-gray-300 px-6 py-4 text-sm text-gray-800">
                    {user.username}
                  </td>
                  <td className="border-b border-gray-300 px-6 py-4 text-sm text-gray-800">
                    {user.email}
                  </td>
                  <td className="border-b border-gray-300 px-6 py-4 text-sm text-gray-800">
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
