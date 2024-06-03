/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState } from "react";
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
import "../style/landingPage.css";
import UsersAdminPage from "./UsersAdminPage";
import JobsAdminPage from "./JobsAdminPage.tsx";

const Sidebar = ({ setSelectedPage }) => (
  <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
    <div className="mb-2 p-4">
      <Typography variant="h5" color="blue-gray">
        Admin Panel
      </Typography>
    </div>
    <List>
      <ListItem onClick={() => setSelectedPage("jobs")}>
        <ListItemPrefix>
          <PresentationChartBarIcon className="h-5 w-5" />
        </ListItemPrefix>
        Jobs
      </ListItem>
      <ListItem onClick={() => setSelectedPage("users")}>
        <ListItemPrefix>
          <UserCircleIcon className="h-5 w-5" />
        </ListItemPrefix>
        Users
      </ListItem>
    </List>
  </Card>
);

const AdminPage = () => {
  const [selectedPage, setSelectedPage] = useState("jobs");

  return (
    <div className="flex">
      <Sidebar setSelectedPage={setSelectedPage} />
      <div className="w-3/4 p-5">
        {selectedPage === "jobs" && <JobsAdminPage />}
        {selectedPage === "users" && <UsersAdminPage />}
      </div>
    </div>
  );
};

export default AdminPage;
