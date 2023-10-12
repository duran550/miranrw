import React from 'react';
import UserItem from './UserItem';

const UsersList = () => {
  const users = [
    {
      id: 1,
      name: 'JohnDoe',
      email: 'JohnDoe@email.com',
      role: 'Admin',
      status: 'active',
    },
    {
      id: 2,
      name: 'JaneDoe',
      email: 'JohnDoe@email.com',
      status: 'active',
      role: 'Cleaner',
    },
    {
      id: 1,
      name: 'Jacques',
      email: 'JohnDoe@email.com',
      status: 'active',
      role: 'User',
    },
  ];
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-700 ">
        <thead className="text-xs text-gray-900 bg-slate-200 uppercase  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((el) => (
            <UserItem
              key={el.id}
              name={el.name}
              email={el.email}
              role={el.role}
              status={el.status}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
