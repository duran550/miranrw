'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
} from '@nextui-org/react';

interface Client {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  // Add more fields as needed
}

interface ClientTableProps {
  data: Client[];
  columns: { uid: string; name: string; sortable?: boolean }[];
  initialVisibleColumns?: string[];
  onRowClick?: (client: Client) => void;
}

const ClientCompTable: React.FC<ClientTableProps> = ({
  data,
  columns,
  initialVisibleColumns = [],
  onRowClick,
}) => {
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(initialVisibleColumns)
  );
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns, columns]);

  const filteredItems = useMemo(() => {
    let filteredClients = [...data];
    if (hasSearchFilter) {
      filteredClients = filteredClients.filter((client) =>
        client.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredClients;
  }, [data, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  return (
    <div>
      {/* Your table JSX */}
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        // Other props
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No users found'} items={items}>
          {(item: any) => (
            <TableRow
              key={item.id}
              className=""
              onClick={() => onRowClick && onRowClick(item)}
            >
              {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* End of table JSX */}
    </div>
  );
};

export default ClientCompTable;
