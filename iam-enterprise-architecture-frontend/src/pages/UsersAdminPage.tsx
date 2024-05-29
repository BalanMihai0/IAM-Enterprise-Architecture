/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Card, CardBody, Typography } from '@material-tailwind/react';
import '../style/landingPage.css'

const UsersAdminPage = () => {
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
                <th className="py-2">ID</th>
                <th className="py-2">Full Name</th>
                <th className="py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-2">{user.id}</td>
                  <td className="py-2">{user.fullName}</td>
                  <td className="py-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default UsersAdminPage;
