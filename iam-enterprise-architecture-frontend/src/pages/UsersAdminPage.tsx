/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect, useState } from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import "../style/landingPage.css";
import useAxiosInterceptors from "../api/AxiosConfig";

const UsersAdminPage = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const axiosInstance = useAxiosInterceptors();

  useEffect(() => {
    axiosInstance.get("/api/v1/users").then((response) => {
      setUsers(response.data);
    });
  });

  function deleteUser() {
    axiosInstance.delete(`/api/v1/users/${selectedUserId}`).then(() => {
      setUsers(users.filter((user) => user.id !== selectedUserId));
      setSelectedUserId(null);
    });
  }

  return (
    <div className="p-5">
      <Card>
        <CardBody>
          <Typography variant="h2" className="text-2xl font-bold mb-6">
            Users
          </Typography>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">Full Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => user.role === "customer")
                .map((user) => (
                  <tr
                    key={user.id}
                    className={`cursor-pointer ${
                      selectedUserId === user.id ? "bg-gray-300" : ""
                    }`}
                    onClick={() => setSelectedUserId(user.id)}
                  >
                    <td className="py-2 px-4">{user.full_name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.role.toUpperCase()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {selectedUserId && (
            <div className="mt-4">
              <Button variant="gradient" color="red" onClick={deleteUser}>
                Delete User
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default UsersAdminPage;
