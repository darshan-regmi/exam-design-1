
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-red-800 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">RTE</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">RTE Exam Seat Allocation System</h1>
          </div>

          {/* Admin Profile and Logout */}
          <div className="flex items-center gap-4">
            {/* Admin Profile */}
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-red-100 text-red-800">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block text-gray-700">Admin</span>
            </div>

            {/* Logout Button */}
            <Button variant="ghost" className="text-gray-700 hover:bg-gray-50 border-0">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
