import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'isomorphic-fetch';
import AddUser from '../AddUserModal';
import InputField from '@/app/components/forms/text-field/InputField';
import { Button } from '@/app/components/button/Button';
import { setupServer } from 'msw/node';
import { http } from 'msw';
import 'text-encoding';

const handlers = [
  http.post('/api/user', ({ req, res, ctx }: any) => {
    return res(ctx.status(201));
  }),
];

const server = setupServer(...handlers);

describe('Adding New User to table', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.restoreHandlers());
  beforeAll(() => server.close());

  const clientDataProps = {
    onClose: jest.fn(),
    isOpen: true,
    data: 'example data',
    refresh: jest.fn(), // Mock the refresh function
    addUser: jest.fn(), // Mock the addUser function
  };

  it('should add a new user', async () => {
    render(<AddUser {...clientDataProps} />);
    render(<Button type="submit" />);
    render(
      <InputField
        name=""
        type=""
        props={{ register: jest.fn() }} // Mock register function
      />
    );

    // const fullname = screen.getByText(/Full Name/);
    const email = screen.getByText(/Email/);

    // Assert that the text content of the elements matches what you expect
    // expect(fullname).toBeInTheDocument();
    // expect(email).toBeInTheDocument();

    // Find the input field by its name
    // const inputField = screen.getByLabelText('Full Name'); // Add appropriate label text here

    // Checking the onChange values
    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: {
        value: 'MengotDuran',
      },
    });

    fireEvent.change(screen.getByLabelText('Email'), {
      target: {
        value: 'mengotduan@gmail.com',
      },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: {
        value: 'Duran34$ge',
      },
    });

    fireEvent.change(screen.getByLabelText('Role'), {
      target: {
        value: 'Admin',
      },
    });

    fireEvent.submit(
      screen.getByRole('button', {
        name: 'Save User',
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText('This user Could not be added')
      ).toBeInTheDocument();
    });
  });
});
