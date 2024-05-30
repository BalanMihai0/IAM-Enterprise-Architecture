/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState } from 'react';
import { Card, CardBody, Typography, Button } from '@material-tailwind/react';
import '../style/landingPage.css';

const UsersAdminPage = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const users = [
    { id: 1, fullName: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, fullName: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, fullName: 'Jack Johnson', email: 'jack.johnson@example.com' },
  ];

  return (
    <div className="p-5">
      <Card>
        <CardBody>
          <Typography variant="h2" className="text-2xl font-bold mb-6">Users</Typography>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Full Name</th>
                <th className="py-2 px-4 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className={`cursor-pointer ${selectedUserId === user.id ? 'bg-gray-300' : ''}`}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  <td className="py-2 px-4">{user.id}</td>
                  <td className="py-2 px-4">{user.fullName}</td>
                  <td className="py-2 px-4">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedUserId && (
            <div className="mt-4">
              <Button variant="gradient" color="red">Delete User</Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default UsersAdminPage;
