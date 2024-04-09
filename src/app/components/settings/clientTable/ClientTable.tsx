'use client';

import React, { useCallback, useEffect, useState } from 'react';
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
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from '@nextui-org/react';
import { PlusIcon } from './PlusIcon';
import { VerticalDotsIcon } from './VerticalDotsIcon';
import { ChevronDownIcon } from './ChevronDownIcon';
import { SearchIcon } from './SearchIcon';
import { columns, users, statusOptions } from './Data';
import { capitalize } from './Utils';
import { APIURL } from '@/app/api/lib/url';
import CustomModal from '@/app/components/modal/Modal';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, DatePickerProps } from 'antd';
import SeeDetails from '../SeeDetails';
import EditUser from '@/app/components/settings/EditUser';
import DeleteUser from '@/app/components/settings/DeleteUser';
import { getAllUsers } from '@/services/userService';
import { AdminContext } from '@/app/[lang]/(dashboard)/common/context/AdminContext';
import { useContext } from 'react';
import AddUser from './AddUserModal';
import { useAuth } from '@/app/hooks/useAuth';

interface ClientInfoProps {
  createdAt: string;
  email: string;
  fullname: string;
  password: string;
  role: number;
  updatedAt: string;
  __v: number;
  _id: string;
}

const statusColorMap: Record<string, ChipProps['color']> = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
};

const INITIAL_VISIBLE_COLUMNS = [
  'fullname',
  'createdAt',
  'actions',
  'email',
  'role',
];

type User = (typeof users)[0];

export default function ClientTable() {
  const { user } = useAuth();

  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending',
  });
  const [getUsers, setGetUsers] = useState<ClientInfoProps[] | any>([]);
  const [selectedCell, setSelectedCell] = useState<ClientInfoProps | any>();
  // modal states
  const [openModal, setOpenModal] = useState<boolean>(false);
  // date states
  const [date, setDate] = useState<Date>(new Date());

  // set Add users modal
  const [addUser, setAddUser] = useState<boolean>(false);

  const [refresh, setRefresh] = useState<boolean>(false);

  const { dispatch } = useContext(AdminContext);

  const setClientInfo = (info: ClientInfoProps | null) => {
    dispatch({ type: 'SET_CLIENT_INFO', payload: info });
  };

  const refreshHandler = () => {
    setRefresh(true);
  };

  // get All Clients
  useEffect(() => {
    async function fetchUsers(token: string) {
      try {
        const usersData = await getAllUsers(token);
        setGetUsers(usersData.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    if (refresh || getUsers.length < 1) {
      fetchUsers(user?.token!);
      setRefresh(false);
    }
    // setClientInfo(selectedCell);
  }, [refresh, getUsers]);

  // date variable
  const dateFormat = 'DD-MM-YYYY';
  // console.log(getUsers?.users, 'this is my get users');

  function disabledDate(current: any) {
    // Disable dates after today
    return current && current.isAfter(dayjs().endOf('day'));
  }

  function onChange(date: any, dateString: any) {
    setDate(date);
  }

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...getUsers];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (user: ClientInfoProps) =>
          user &&
          user.fullname?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUsers, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  function selectedCellInfo(id: number) {
    const currentCellInfo = sortedItems.find(
      (item) => item._id === id.toString()
    );
    // setSelectedCell(currentCellInfo);
    setClientInfo(currentCellInfo);
  }

  const replaceRoleNames = (users: any) => {
    return users.map((user: any) => {
      switch (user.role) {
        case 1:
          return { ...user, role: 'Admin' };
        case 2:
          return { ...user, role: 'Viewer' };
        case 3:
          return { ...user, role: 'Cleaner' };
        case 4:
          return { ...user, role: 'Risk-manager' };
        default:
          return user;
      }
    });
  };

  const updatedUsers = replaceRoleNames(sortedItems);

  

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'full', size: 'sm', src: user.avatar }}
            classNames={{
              description: 'text-default-500',
            }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case 'role':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            {/* <p className="text-bold text-tiny capitalize text-default-500">
              {user.role}
            </p> */}
          </div>
        );
      case 'status':
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user.status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case 'actions':
        return (
          <div className="">
            <div className="flex gap-x-2">
              <SeeDetails />
              <EditUser refresh={refreshHandler} />
              <DeleteUser refresh={refreshHandler} />
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);
  const topContent = React.useMemo(() => {
    return (
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by name..."
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                  >
                    Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                  >
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {columns.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Button
                color="primary"
                endContent={<PlusIcon />}
                onClick={() => setAddUser(true)}
              >
                Add New
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">
              Total {getUsers.length} users
            </span>
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    getUsers.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div>
      <CustomModal
        onClose={() => setOpenModal(false)}
        isOpen={openModal}
        classStyle="text-black"
        showFooter={false}
        positon="center"
      >
        <div className="space-y-4">
          <div className="w-[70%] m-auto">
            <DatePicker
              format={dateFormat}
              disabledDate={disabledDate}
              className=" appearance-none border rounded-cs w-full py-3 px-3 leading-tight border-gray-300  focus:outline-none focus:border-primaryColor focus:bg-white text-gray-700 pr-16 font-mono"
              onChange={onChange}
            />
          </div>
          <div className="text-center">
            <h1>{selectedCell?.fullname}</h1>
            <h1>{selectedCell?.email}</h1>
          </div>
          <div className="flex gap-x-2 justify-center">
            <Button>Cancel</Button>
            <Button>save</Button>
          </div>
        </div>
      </CustomModal>
      <AddUser
        onClose={() => {
          setAddUser(false);
        }}
        isOpen={addUser}
        refresh={refreshHandler}
      />
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: 'max-h-[382px]',
        }}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
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
        <TableBody emptyContent={'Loading Users...'} items={updatedUsers}>
          {(item: any) => (
            <TableRow
              key={item._id}
              className=""
              onClick={() => {
                {
                  selectedCellInfo(item._id);
                }
              }}
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
