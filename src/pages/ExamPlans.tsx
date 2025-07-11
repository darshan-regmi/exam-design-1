
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Calendar, Search, Filter, Plus, Edit, Trash2, Users, MapPin } from 'lucide-react';

const ExamPlans = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const examPlans = [
    {
      id: 1,
      name: 'Mid-term Mathematics Exam',
      date: '2024-01-15',
      time: '10:00 AM',
      program: 'B.Tech',
      year: '2',
      sections: ['A', 'B', 'C'],
      students: 125,
      rooms: 4,
      status: 'Completed'
    },
    {
      id: 2,
      name: 'Physics Final Examination',
      date: '2024-01-18',
      time: '02:00 PM',
      program: 'B.Sc',
      year: '3',
      sections: ['A', 'B'],
      students: 98,
      rooms: 3,
      status: 'Ongoing'
    },
    {
      id: 3,
      name: 'Chemistry Lab Assessment',
      date: '2024-01-20',
      time: '09:00 AM',
      program: 'B.Tech',
      year: '1',
      sections: ['A', 'B', 'C', 'D'],
      students: 167,
      rooms: 5,
      status: 'Scheduled'
    },
    {
      id: 4,
      name: 'Computer Science Viva Voce',
      date: '2024-01-22',
      time: '11:30 AM',
      program: 'M.Tech',
      year: '1',
      sections: ['A'],
      students: 45,
      rooms: 2,
      status: 'Scheduled'
    }
  ];

  const filteredPlans = examPlans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.program.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-600';
      case 'Ongoing': return 'bg-blue-600';
      case 'Scheduled': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Exam Plans</h1>
              <p className="text-gray-600 mt-1">Manage all examination plans and schedules</p>
            </div>
            <Link to="/create-exam">
              <Button className="bg-red-800 hover:bg-red-900">
                <Plus className="w-4 h-4 mr-2" />
                Create New Plan
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search exam plans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Exam Plans Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Exam Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exam Name</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Sections</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Rooms</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{plan.date}</span>
                        <span className="text-sm text-gray-500">{plan.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{plan.program} Year {plan.year}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {plan.sections.map(section => (
                          <Badge key={section} variant="outline" className="text-xs">
                            {section}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        {plan.students}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {plan.rooms}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(plan.status)}>
                        {plan.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamPlans;
