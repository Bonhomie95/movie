import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-grow bg-gray-100 p-6 ml-16 md:ml-64 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
