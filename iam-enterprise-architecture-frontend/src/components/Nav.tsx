import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Nav() {
  const [openNav, setOpenNav] = React.useState(false);
  const [signedIn, setSignedIn] = React.useState<boolean | null>(null);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const initialize = async () => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false)
      );
      setSignedIn(await isLoggedIn());
    };
    initialize();
  }, [isLoggedIn]);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        placeholder={"home"}
      >
        <a href="/home" className="flex items-center">
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        placeholder={"jobs"}
      >
        <a href="/offers" className="flex items-center">
          Offers
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        placeholder={"bookings"}
      >
        <a href="/bookings" className="flex items-center">
          Bookings
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        placeholder={"account"}
      >
        <a href="/account" className="flex items-center">
          Account
        </a>
      </Typography>
    </ul>
  );

  return (
    <div>
      <Navbar
        className="sticky top-0 z-10 h-max max-w-full rounded-none"
        placeholder={"nav"}
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
            placeholder={"BlackHawk Security"}
          >
            BlackHawk Security
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            {!signedIn ? (
              <div className="flex items-center gap-x-1">
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block"
                  placeholder={"sign_in"}
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Button>
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                  placeholder={"register"}
                  onClick={() => navigate("/register")}
                >
                  <a href="/register" className="flex items-center">
                    Register
                  </a>
                </Button>
              </div>
            ) : (
              <Button
                fullWidth
                variant="gradient"
                size="sm"
                className=""
                placeholder={"sign-out"}
                onClick={() => logout()}
              >
                Sign out
              </Button>
            )}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
              placeholder={"nav-toggle"}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          {!signedIn ? (
            <div className="flex items-center gap-x-1">
              <Button
                fullWidth
                variant="text"
                size="sm"
                className=""
                placeholder={"log-in"}
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
              <Button
                fullWidth
                variant="gradient"
                size="sm"
                className=""
                placeholder={"register"}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </div>
          ) : (
            <Button
              fullWidth
              variant="gradient"
              size="sm"
              className=""
              placeholder={"sign-out"}
              onClick={() => logout()}
            >
              Sign out
            </Button>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
}
