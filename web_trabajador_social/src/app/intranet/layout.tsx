"use client";
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function IntranetLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Backdrop para móvil */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 opacity-50 bg-black z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:ml-64 bg-gray-100">
          <Header onOpenSidebar={() => setSidebarOpen(true)} />
          <main className="flex-1 p-4 overflow-y-auto">
            <Toaster />
            {children}
          </main>
        </div>

    </ProtectedRoute>
  );
} 