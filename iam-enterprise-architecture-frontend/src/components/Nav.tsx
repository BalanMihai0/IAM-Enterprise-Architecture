import React from "react";
import { Navbar, Collapse, Button, IconButton } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isAuthenticated } from "../authService";

export function Nav() {
  const [openNav, setOpenNav] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [signedIn, setSignedIn] = React.useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  async function logOut() {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
  }

  React.useEffect(() => {
    const initialize = async () => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false)
      );
      const loggedIn = await isLoggedIn();
      setSignedIn(loggedIn);
      if (loggedIn) {
        setIsAdmin(await isAuthenticated());
      }
    };
    initialize();

    return () =>
      window.removeEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false)
      );
  }, [isLoggedIn, signedIn]);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {isAdmin && (
        <Button
          variant="text"
          color="black"
          size="sm"
          className="items-center"
          onClick={() => navigate("/admin")}
          placeholder={undefined}
        >
          Admin
        </Button>
      )}
      <Button
        variant="text"
        color="black"
        size="sm"
        className="items-center"
        onClick={() => navigate("/")}
        placeholder={undefined}
      >
        Home
      </Button>
      <Button
        variant="text"
        color="black"
        size="sm"
        className="items-center"
        onClick={() => navigate("/offers")}
        placeholder={undefined}
      >
        Offers
      </Button>
      {!isAdmin && signedIn && (
        <Button
          variant="text"
          color="black"
          size="sm"
          className="items-center"
          onClick={() => navigate("/bookings")}
          placeholder={undefined}
        >
          Bookings
        </Button>
      )}
      {signedIn && (
        <Button
          variant="text"
          color="black"
          size="sm"
          className="items-center"
          onClick={() => navigate("/account")}
          placeholder={undefined}
        >
          Account
        </Button>
      )}
    </ul>
  );

  return (
    <div>
      <Navbar
        className="sticky top-0 z-10 h-max max-w-full rounded-none"
        placeholder={"nav"}
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <div
            className="ml-3 cursor-pointer flex items-center"
            onClick={() => navigate("/")}
          >
            <img
              src="black-logo-no-bg.png"
              alt="BlackHawk Security"
              className="h-10"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            {!signedIn ? (
              <div className="flex items-center gap-x-1">
                <Button
                  variant="outlined"
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
                  Register
                </Button>
              </div>
            ) : (
              <Button
                fullWidth
                variant="gradient"
                size="sm"
                className="flex flex-row invisible lg:visible"
                placeholder={"sign-out"}
                onClick={logOut}
                loading={isLoading}
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
                variant="outlined"
                size="sm"
                className="items-center"
                placeholder={"log-in"}
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
              <Button
                fullWidth
                variant="gradient"
                size="sm"
                className="items-center"
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
              className="flex flex-row items-center"
              placeholder={"sign-out"}
              onClick={logOut}
              loading={isLoading}
            >
              Sign out
            </Button>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
}
