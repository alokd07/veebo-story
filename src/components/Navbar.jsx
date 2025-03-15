import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  Dialog,
  Drawer,
  Menu,
  MenuItem,
  Tab,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { BASE_URL } from "../../config";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router";

export default function Navbar({ setModalOpen }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("login");
  const [isAuth, setIsAuth] = useState(false);
  const { isAdmin } = useContext(AuthContext);
  const isAdminRoute = window.location.pathname === "/admin";

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuth(true);
    }
  }, [isAuth, open]);

  return (
    <>
      {isAdmin && isAdminRoute ? (
        <AdminHeader setModalOpen={setModalOpen} />
      ) : (
        <UserHeader
          handleOpen={handleOpen}
          open={open}
          type={type}
          setType={setType}
          isAuth={isAuth}
          setIsAuth={setIsAuth}
        />
      )}
    </>
  );
}

function AdminHeader({ setModalOpen }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header className="bg-white shadow-sm lg:static lg:overflow-y-visible">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
          <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/admin">
                <img
                  className="block h-8 w-24 scale-[3] ml-6"
                  src="./assets/images/Frame 7.svg"
                  alt="veebo"
                />
              </Link>
            </div>
          </div>
          <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
            <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
              <div className="w-full">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-rose-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-500 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
            <button
              onClick={()=>setShow(!show)}
              type="button"
              className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
            <a
              href="#"
              className="ml-5 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                x-description="Heroicon name: outline/bell"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </a>
            <div className="relative ml-5 flex-shrink-0">
              <div>
                <button
                  type="button"
                  className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    Cookies.remove("token");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              type="button"
              className="ml-6 inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-bold focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              New Post
            </button>
          </div>
        </div>
      </div>
      {show && (
      <nav className="lg:hidden">
        <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
          <a
            href="#"
            aria-current="page"
            className="bg-gray-100 text-gray-900 block rounded-md py-2 px-3 text-base font-medium"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium"
          >
            Popular
          </a>
          <a
            href="#"
            className="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium"
          >
            Communities
          </a>
          <a
            href="#"
            className="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium"
          >
            Trending
          </a>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">
                Chelsea Hagon
              </div>
              <div className="text-sm font-medium text-gray-500">
                chelsea.hagon@example.com
              </div>
            </div>
            <button
              type="button"
              className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                x-description="Heroicon name: outline/bell"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>
          </div>
          <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
            <a
              href="#"
              className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >
              Your Profile
            </a>
            <a
              href="#"
              className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >
              Settings
            </a>
            <a
              href="#"
              className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >
              Sign out
            </a>
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
          <a
            href="#"
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700"
          >
            New Post
          </a>
          <div className="mt-6 flex justify-center">
            <a
              href="#"
              className="text-base font-medium text-gray-900 hover:underline"
            >
              Go Premium
            </a>
          </div>
        </div>
      </nav>
      )}
    </header>
  );
}

function UserHeader({ handleOpen, open, type, setType, isAuth, setIsAuth }) {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = (value) => () => {
    setOpenDrawer(value);
  };
  const logout = () => {
    Cookies.remove("token");
    setIsAuth(false);
  };
  return (
    <header className="bg-primary">
      <div className="container mx-auto text-white p-4 flex justify-between items-center">
      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        <nav className="w-64 flex-1 overflow-y-auto bg-secondary">
          <ul className="p-4 space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-primary-bold"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-primary-bold"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-primary-bold"
              >
                Write
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-primary-bold"
              >
                Read
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-primary-bold"
              >
                Pricing
              </a>
            </li>
          </ul>
        </nav>
      </Drawer>
      <img
        className="size-12 scale-[3] ml-10"
        src="./assets/images/Frame 7.svg"
        alt="veebo Story"
      />
      <nav className="hidden md:block">
        <ul className="flex space-x-4">
          <li>Home</li>
          <li>About us</li>
          <li>Write</li>
          <li>Read</li>
          <li>Pricing</li>
        </ul>
      </nav>
      <button
        onClick={toggleDrawer(true)}
        className="bg-secondary text-purple-800 font-bold px-3 py-1.5 rounded ml-2 md:!hidden cursor-pointer hover:bg-amber-400"
      >
        <i className="fas fa-bars"></i>
      </button>
      <div className="md:flex items-center hidden">
        <select className="border-2 border-secondary px-4 py-1.5 rounded cursor-pointer hover:bg-amber-400">
          <option>English</option>
        </select>
        {!isAuth ? (
          <button
            onClick={() => handleOpen()}
            className="bg-secondary text-purple-800 font-bold px-8 py-1.5 rounded ml-2 cursor-pointer hover:bg-amber-400"
          >
            Sign in
          </button>
        ) : (
          <button
            onClick={() => logout()}
            className="bg-secondary text-purple-800 font-bold px-8 py-1.5 rounded ml-2 cursor-pointer hover:bg-amber-400"
          >
            Logout
          </button>
        )}
      </div>
      </div>
      <Dialog open={open} onClose={handleOpen} fullWidth maxWidth="md">
        <Card className="w-full p-2">
          <TabContext value={type}>
            <TabList
              onChange={(e, newValue) => setType(newValue)}
              className="bg-transparent w-max mx-auto mb-1"
              aria-label="auth tabs"
            >
              <Tab
                label={
                  <span className="text-sm">
                    Don&apos;t have a bank account?{" "}
                    <span className="text-blue-600 uppercase text-sm">
                      Sign up
                    </span>
                  </span>
                }
                value="signup"
              />
              <Tab
                label={
                  <span className="text-sm">
                    Already registered?{" "}
                    <span className="text-blue-600 uppercase text-sm">
                      Sign In
                    </span>
                  </span>
                }
                value="login"
              />
            </TabList>

            <TabPanel value="login" className="!p-0">
              <LoginForm handleOpen={handleOpen} />
            </TabPanel>
            <TabPanel value="signup" className="!p-0">
              <RegisterForm handleOpen={handleOpen} setType={setType} />
            </TabPanel>
          </TabContext>
        </Card>
      </Dialog>
    </header>
  );
}

function LoginForm({ handleOpen }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLoginData = () => {
    setLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: loginData.email,
      password: loginData.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(`${BASE_URL}user/login`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        toast.success("Login successful");
        Cookies.set("token", result.token);
        if (result.isAdmin) {
          window.location.href = "/admin";
        }
        setLoading(false);
        handleOpen();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error(
          "An error occurred while processing your request. Please try again later."
        );
      });
  };

  return (
    <div className="bg-gray-100 text-gray-900 flex justify-center">
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="bg-white sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 p-6 sm:p-12">
          <div>
            <img
              src="./assets/images/Frame 7.svg"
              alt="veebo"
              className="w-12 scale-[3] justify-center flex mx-auto"
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1">
              <div className="mx-auto">
                <input
                  className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
                <input
                  className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <button
                  onClick={() => handleLoginData()}
                  className="text-white cursor-pointer mt-5 tracking-wide font-semibold bg-primary w-full py-3 rounded-lg hover:bg-primary-bold transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-">Sign In</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by Veebo Story{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Terms of Service{" "}
                  </a>
                  and its{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-fuchsia-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat bg-login"></div>
        </div>
      </div>
    </div>
  );
}

function RegisterForm({ handleOpen, setType }) {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleRegisterData = () => {
    setLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var raw = JSON.stringify({
      name: registerData.name,
      password: registerData.password,
      email: registerData.email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(`${BASE_URL}register`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        toast.success(result.message);
        setType("login");
        setLoading(false);
        handleOpen();
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(
          "An error occurred while processing your request. Please try again later."
        );
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-100 text-gray-900 flex justify-center">
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="bg-white sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-fuchsia-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat bg-login"></div>
        </div>
        <div className="lg:w-1/2 p-6 sm:p-12">
          <div>
            <img
              src="./assets/images/Frame 7.svg"
              alt="veebo"
              className="w-12 scale-[3] justify-center flex mx-auto"
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1">
              <div className="mx-auto">
                <input
                  className="w-full mb-5 px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Name"
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, name: e.target.value })
                  }
                />
                <input
                  className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                />
                <input
                  className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                />
                <button
                  onClick={() => handleRegisterData()}
                  className="text-white mt-5 tracking-wide font-semibold bg-primary w-full py-3 rounded-lg hover:bg-primary-bold transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-">Register</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by Veebo Story{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Terms of Service{" "}
                  </a>
                  and its{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
