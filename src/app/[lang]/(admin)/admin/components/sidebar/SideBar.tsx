import React from 'react';
import Link from 'next/link';
import NavItem from '../nav-item/NavItem';

export default function App() {
  const items = [];

  return (
    <div className="flex flex-col px-4 bg-indigo-100">
      <div className="flex flex-col mt-32">
        <div className="py-4">
          <NavItem href="/dashboard">Dashboard</NavItem>
        </div>
        <div className="py-4">
          <NavItem href="/blog">Blog</NavItem>
        </div>
        <div className="py-4">
          <NavItem href="/users">Users</NavItem>
        </div>
      </div>
    </div>
  );
}
