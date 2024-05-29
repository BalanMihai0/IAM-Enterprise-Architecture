// src/pages/AdminPage.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Typography, Card, CardBody, Input, Textarea } from '@material-tailwind/react';

// Sidebar component
const Sidebar = () => (
  <div className="h-screen w-1/4 bg-gray-800 text-white flex flex-col">
    <Typography variant="h4" className="p-4">Admin Panel</Typography>
    <nav className="flex flex-col p-4">
      <Link to="/jobs" className="mb-2 p-2 hover:bg-gray-700 rounded">Jobs</Link>
      <Link to="/users" className="mb-2 p-2 hover:bg-gray-700 rounded">Users</Link>
    </nav>
  </div>
);

// JobsPage component
const JobsPage = () => {
  const [job, setJob] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
  });



  return (
    <div className="p-5">
      <Card>
        <CardBody>
          <Typography variant="h2" className="text-2xl font-bold mb-6">Create Jobs</Typography>
          <form >
            <div className="flex flex-col space-y-4">
              <label htmlFor="title">Title</label>
              <Input
                type="text"
                name="title"
                value={job.title}
                // onChange={handleChange}
                placeholder="Title"
                className="p-4 rounded-lg bg-white bg-opacity-70 border border-gray-600"
                required
              />
              <label htmlFor="description">Description</label>
              <Textarea
                name="description"
                value={job.description}
                // onChange={handleChange}
                placeholder="Description"
                className="p-4 rounded-lg bg-white bg-opacity-70 border border-gray-600"
                required
              />
              <label htmlFor="location">Location</label>
              <Input
                type="text"
                name="location"
                value={job.location}
                // onChange={handleChange}
                placeholder="Location"
                className="p-4 rounded-lg bg-white bg-opacity-70 border border-gray-600"
                required
              />
              <label htmlFor="price">Price</label>
              <Input
                type="number"
                name="price"
                value={job.price}
                // onChange={handleChange}
                placeholder="Price"
                className="p-4 rounded-lg bg-white bg-opacity-70 border border-gray-600"
                required
              />
            </div>
            <Button type="submit" variant="gradient" color="blue" className="mt-4">Create Job</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

// UsersPage component
const UsersPage = () => {
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

// Main AdminPage component with routing
const AdminPage = () => (
  <Router>
    <div className="flex">
      <Sidebar />
      <div className="w-3/4">
        <Routes>
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default AdminPage;
