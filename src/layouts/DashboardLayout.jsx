import React from "react";
import { NavLink, Outlet } from "react-router";
import ProFastLogo from "../Pages/Shared/Navbar/ProFastLogo/ProFastLogo";
import {
  FaHome,
  FaBoxOpen,
  FaHistory,
  FaSearchLocation,
  FaUserEdit,
  FaHourglassHalf,
  FaMotorcycle,
  FaUserShield,
  FaTasks,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  console.log(role);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dash Bord</div>
          <div className="hidden flex-none lg:hidden"></div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <ProFastLogo></ProFastLogo>
          <li>
            <NavLink to="/dashboard/home" className="flex items-center gap-2">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/myParcels"
              className="flex items-center gap-2"
            >
              <FaBoxOpen /> My Parcels
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/paymentHistory"
              className="flex items-center gap-2"
            >
              <FaHistory /> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/track" className="flex items-center gap-2">
              <FaSearchLocation /> Track a Package
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/profile"
              className="flex items-center gap-2"
            >
              <FaUserEdit /> Update Profile
            </NavLink>
          </li>


          {/* rider links */}
          {
            !roleLoading && role === 'rider' && <>
            <li>
                <NavLink
                  to="/dashboard/PandingDeliveries"
                  className="flex items-center gap-2"
                >
                  <FaTasks />Panding Deliveries
                </NavLink>
              </li>
            <li>
                <NavLink
                  to="/dashboard/completedDeliveries"
                  className="flex items-center gap-2"
                >
                  <FaCheckCircle />Completed Deliveries
                </NavLink>
              </li>
            <li>
                <NavLink
                  to="/dashboard/myEarnings"
                  className="flex items-center gap-2"
                >
                  <FaWallet />My Earnings
                </NavLink>
              </li>
            </>
          }

          {/* rideers link */}
          { !roleLoading && role === 'admin' &&
            <>
              <li>
                <NavLink
                  to="/dashboard/assinRiders"
                  className="flex items-center gap-2"
                >
                  <FaMotorcycle />Assin Riders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/activeRiders"
                  className="flex items-center gap-2"
                >
                  <FaMotorcycle /> Active Riders
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/pendingRiders"
                  className="flex items-center gap-2"
                >
                  <FaHourglassHalf /> Pending Riders
                </NavLink>
              </li>
              {/* admin router  */}
              <li>
                <NavLink
                  to="/dashboard/makeAdmin"
                  className="flex items-center gap-2"
                >
                  <FaUserShield /> Make Admin
                </NavLink>
              </li>
            </>
          }
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
