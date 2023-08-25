import Link from 'next/link';
import React from 'react';

type UserItemProps = {
  key: number;
  name: string;
  email: string;
  role: string;
  status: string;
  onClick?: () => void;
};

const UserItem: React.FC<UserItemProps> = ({
  key,
  name,
  email,
  role,
  status,
  onClick,
}) => {
  return (
    <tr key={key} className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  "
      >
        <Link href="/" className="hover:text-indigo-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-slate-500 mr-2">
              JD
            </div>
            <div className="flex flex-col">
              <Link href="/" className="hover:text-indigo-700">
                {name}
              </Link>
              <div className="text-sm mt-1 text-gray-600">{email}</div>
            </div>
          </div>
        </Link>
      </th>
      <td className="px-6 py-4">{role}</td>
      <td className="px-6 py-4">{status}</td>
      <td className="px-6 py-4">
        <a
          onClick={onClick}
          href="#"
          className="font-medium text-indigo-600  hover:underline"
        >
          Edit
        </a>
      </td>
    </tr>
  );
};

export default UserItem;
