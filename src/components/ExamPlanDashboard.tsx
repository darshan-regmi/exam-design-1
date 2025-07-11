
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Circle, AlertCircle, Users, Calendar, MapPin, FileText } from 'lucide-react';
import CreateExamForm from './CreateExamForm';
import ProgramYearSelector from './ProgramYearSelector';
import SectionSelector from './SectionSelector';
import RoomSelector from './RoomSelector';
import StudentManagement from './StudentManagement';

const ExamPlanDashboard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [examData, setExamData] = useState({
    name: '',
    date: '',
    time: '',
    program: '',
    year: '',
    sections: [],
    rooms: [],
    students: []
  });

  const steps = [
    { id: 0, title: 'Create Exam Plan', icon: FileText, component: CreateExamForm },
    { id: 1, title: 'Select Program & Year', icon: Calendar, component: ProgramYearSelector },
    { id: 2, title: 'Select Sections', icon: Users, component: SectionSelector },
    { id: 3, title: 'Manage Students', icon: Users, component: StudentManagement },
    { id: 4, title: 'Select Rooms', icon: MapPin, component: RoomSelector },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStepComponent = () => {
    const CurrentComponent = steps[currentStep].component;
    return (
      <CurrentComponent
        data={examData}
        onUpdate={setExamData}
        onNext={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}
        onPrevious={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">RTE Exam Management</h1>
              <p className="text-gray-600 mt-1">Create and manage examination plans</p>
            </div>
            <Badge variant="outline" className="text-red-800 border-red-200">
              Department of Education
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Exam Plan Creation Progress</CardTitle>
              <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="mt-2" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 mb-2 ${
                    index < currentStep 
                      ? 'bg-red-800 border-red-800 text-white' 
                      : index === currentStep 
                        ? 'border-red-800 text-red-800 bg-red-50' 
                        : 'border-gray-300 text-gray-400'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`text-xs text-center max-w-20 ${
                    index <= currentStep ? 'text-gray-900 font-medium' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Step Content */}
          <div className="lg:col-span-2">
            {renderStepComponent()}
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Exam Plan Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Exam Name</label>
                  <p className="text-gray-900">{examData.name || 'Not set'}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-700">Date & Time</label>
                  <p className="text-gray-900">{examData.date && examData.time ? `${examData.date} at ${examData.time}` : 'Not set'}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-700">Program & Year</label>
                  <p className="text-gray-900">{examData.program && examData.year ? `${examData.program} - Year ${examData.year}` : 'Not selected'}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-700">Sections</label>
                  <p className="text-gray-900">{examData.sections.length} selected</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-700">Students</label>
                  <p className="text-gray-900">{examData.students.length} registered</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-700">Rooms</label>
                  <p className="text-gray-900">{examData.rooms.length} allocated</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Save as Draft
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule for Later
                </Button>
                <Button className="w-full justify-start bg-red-800 hover:bg-red-900">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Finalize Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPlanDashboard;
