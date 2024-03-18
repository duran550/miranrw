'use client';
import React from 'react';
import ClientCompTable from './Table';
import { columns, users } from '../clientTable/Data';

const CompTable: React.FC = () => {
  // Sample data and column configuration
  const data = [
    // Your client data here
  ];

  const columns = [
    { name: 'ID', uid: 'id', sortable: true },
    { name: 'Contact Name', uid: 'name', sortable: true }, // modified
    { name: 'Company Name', uid: 'company_name', sortable: true }, // modified
    { name: 'Number', uid: 'number' }, // modified
    { name: 'Postition', uid: 'position' },
    { name: 'ROLE', uid: 'role', sortable: true },
    { name: 'Contact Email', uid: 'email' }, // modified
    { name: 'STATUS', uid: 'status', sortable: true },
    { name: 'ACTIONS', uid: 'actions' },
    // Add more columns as needed
  ];

  const handleRowClick = (client: any) => {
    // Handle row click event
    console.log('Clicked client:', client);
  };

  return (
    <ClientCompTable
      data={users}
      columns={columns}
      initialVisibleColumns={['name', 'email', 'actions']}
      onRowClick={handleRowClick}
    />
  );
};

export default CompTable;
