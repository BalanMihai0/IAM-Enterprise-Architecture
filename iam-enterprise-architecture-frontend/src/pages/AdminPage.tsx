/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { BrowserRouter as Routes,Route, Link } from 'react-router-dom';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import '../style/landingPage.css';
import UsersAdminPage from './UsersAdminPage';
import JobsAdminPage from './JobsAdminPage.tsx';

const Sidebar = () => (
  <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
    <div className="mb-2 p-4">
      <Typography variant="h5" color="blue-gray">
        Admin Panel
      </Typography>
    </div>
    <List>
      <Link to="/admin/jobs">
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Jobs
        </ListItem>
      </Link>
      <Link to="/admin/users">
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Users
        </ListItem>
      </Link>
    </List>
  </Card>
);

const AdminPage = () => (
  
    <div className="flex">
      <Sidebar />
      <div className="w-3/4 p-5">
        {/* <Routes>
          <Route element={<JobsAdminPage />} />
          <Route element={<UsersAdminPage />} />
        </Routes> */}
      </div>
    </div>

);

export default AdminPage;
