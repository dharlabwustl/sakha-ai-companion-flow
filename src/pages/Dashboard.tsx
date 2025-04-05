
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import EmployeeDashboard from '@/components/dashboard/EmployeeDashboard';
import DoctorDashboard from '@/components/dashboard/DoctorDashboard';
import ResearcherDashboard from '@/components/dashboard/ResearcherDashboard';
import FounderDashboard from '@/components/dashboard/FounderDashboard';
import { UserRole } from '@/components/onboarding/OnboardingFlow';

const Dashboard = () => {
  const { role } = useParams<{ role?: string }>();
  
  // Validate role
  if (!role || !['student', 'employee', 'doctor', 'researcher', 'founder'].includes(role)) {
    return <Navigate to="/" replace />;
  }
  
  // Render appropriate dashboard based on role
  switch (role as UserRole) {
    case 'student':
      return <StudentDashboard />;
    case 'employee':
      return <EmployeeDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'researcher':
      return <ResearcherDashboard />;
    case 'founder':
      return <FounderDashboard />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default Dashboard;
