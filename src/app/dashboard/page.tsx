import React from 'react';
import { useLms } from '../../context/LmsContext';
import { StudentDashboardPage } from './student/page';
import { TeacherDashboardPage } from './teacher/page';
import { AdminDashboardPage } from './admin/page';
import { ParentDashboardPage } from './parent/page';

export const DashboardPage: React.FC = () => {
  const { mockRole } = useLms();

  if (mockRole === 'TEACHER') return <TeacherDashboardPage />;
  if (mockRole === 'ADMIN') return <AdminDashboardPage />;
  if (mockRole === 'PARENT') return <ParentDashboardPage />;
  return <StudentDashboardPage />;
};

export default DashboardPage;
