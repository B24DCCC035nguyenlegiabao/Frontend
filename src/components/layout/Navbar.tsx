import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/authSlice";
import { isAdmin, getRoleDisplay } from "../../utils/roleUtils";

const Navbar: React.FC = () => {
  const { username, role, isAuthenticated } = useAppSelector(
    (state: any) => state.auth
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="text-xl font-bold">Quản Lý Trung Tâm</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/dashboard"
              className="hover:bg-primary-700 px-3 py-2 rounded-md transition-colors"
            >
              Tổng quan
            </Link>
            <Link
              to="/students"
              className="hover:bg-primary-700 px-3 py-2 rounded-md transition-colors"
            >
              Học viên
            </Link>
            <Link
              to="/courses"
              className="hover:bg-primary-700 px-3 py-2 rounded-md transition-colors"
            >
              Khóa học
            </Link>
            <Link
              to="/enrollments"
              className="hover:bg-primary-700 px-3 py-2 rounded-md transition-colors"
            >
              Đăng ký học
            </Link>
            {isAdmin(role) && (
              <Link
                to="/certificates"
                className="hover:bg-primary-700 px-3 py-2 rounded-md transition-colors"
              >
                Cấp chứng chỉ
              </Link>
            )}
            <Link
              to="/statistics"
              className="hover:bg-primary-700 px-3 py-2 rounded-md transition-colors"
            >
              Thống kê
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="font-medium">{username}</div>
              <div className="text-xs text-primary-200">
                {getRoleDisplay(role || "")}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-primary-700 hover:bg-primary-800 px-4 py-2 rounded-md transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
