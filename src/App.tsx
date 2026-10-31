/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LmsProvider, useLms } from './context/LmsContext';
import { MockGlobalProvider } from './context/MockGlobalContext';
import { RootRedirectPage } from './app/page';
import { LoginPage } from './app/login/page';
import { DashboardLayout } from './app/dashboard/layout';
import { DashboardPage } from './app/dashboard/page';

// Student Isolated Route Pages
import { StudentDashboardPage } from './app/dashboard/student/page';
import { StudentCoursesPage } from './app/dashboard/student/courses/page';
import { StudentExamsPage } from './app/dashboard/student/exams/page';

// Teacher Isolated Route Pages
import { TeacherDashboardPage } from './app/dashboard/teacher/page';
import { TeacherBatchPerformancePage } from './app/dashboard/teacher/performance/page';
import { TeacherEvaluationsPage } from './app/dashboard/teacher/evaluations/page';
import { TeacherExamsPage } from './app/dashboard/teacher/exams/page';
import { TeacherAttendancePage } from './app/dashboard/teacher/attendance/page';
import { TeacherContentPage } from './app/dashboard/teacher/content/page';

// Admin Isolated Route Pages
import { AdminDashboardPage } from './app/dashboard/admin/page';
import { AdminUsersPage } from './app/dashboard/admin/users/page';
import { AdminBatchesPage } from './app/dashboard/admin/batches/page';
import { AdminFinancePage } from './app/dashboard/admin/finance/page';

// Parent Isolated Route Pages
import { ParentOverviewPage } from './app/dashboard/parent/overview/page';
import { ParentAttendancePage } from './app/dashboard/parent/attendance/page';
import { ParentFeesPage } from './app/dashboard/parent/fees/page';

// Classroom & CBT Exam Interfaces
import { CourseOverviewPage } from './app/course/[slug]/page';
import { ClassroomPage } from './app/learn/[courseId]/[moduleId]/page';
import { CbtExamAttemptPage } from './app/exam/[examId]/attempt/page';

const AppRouter: React.FC = () => {
  const { currentPath } = useLms();

  const cleanPath = currentPath.split('?')[0].replace(/\/+$/, '') || '/';

  // Root (/) automatically redirects to /login
  if (cleanPath === '/') {
    return <RootRedirectPage />;
  }

  if (cleanPath === '/login') {
    return <LoginPage />;
  }

  // Nested Routing for Role Dashboards wrapped in unified role-adaptive DashboardLayout
  if (cleanPath.startsWith('/dashboard')) {
    let pageContent: React.ReactNode = <DashboardPage />;

    // 1. STUDENT ROUTES
    if (cleanPath.startsWith('/dashboard/student')) {
      if (cleanPath === '/dashboard/student/courses') {
        pageContent = <StudentCoursesPage />;
      } else if (cleanPath === '/dashboard/student/exams') {
        pageContent = <StudentExamsPage />;
      } else {
        pageContent = <StudentDashboardPage />;
      }
    }
    // 2. TEACHER ROUTES
    else if (cleanPath.startsWith('/dashboard/teacher')) {
      if (cleanPath === '/dashboard/teacher/performance') {
        pageContent = <TeacherBatchPerformancePage />;
      } else if (cleanPath === '/dashboard/teacher/evaluations') {
        pageContent = <TeacherEvaluationsPage />;
      } else if (cleanPath === '/dashboard/teacher/exams') {
        pageContent = <TeacherExamsPage />;
      } else if (cleanPath === '/dashboard/teacher/attendance') {
        pageContent = <TeacherAttendancePage />;
      } else if (cleanPath === '/dashboard/teacher/content') {
        pageContent = <TeacherContentPage />;
      } else {
        pageContent = <TeacherDashboardPage />;
      }
    }
    // 3. ADMIN ROUTES
    else if (cleanPath.startsWith('/dashboard/admin')) {
      if (cleanPath === '/dashboard/admin/users') {
        pageContent = <AdminUsersPage />;
      } else if (cleanPath === '/dashboard/admin/batches') {
        pageContent = <AdminBatchesPage />;
      } else if (cleanPath === '/dashboard/admin/finance') {
        pageContent = <AdminFinancePage />;
      } else {
        pageContent = <AdminDashboardPage />;
      }
    }
    // 4. PARENT ROUTES
    else if (cleanPath.startsWith('/dashboard/parent')) {
      if (cleanPath === '/dashboard/parent/attendance') {
        pageContent = <ParentAttendancePage />;
      } else if (cleanPath === '/dashboard/parent/fees') {
        pageContent = <ParentFeesPage />;
      } else {
        pageContent = <ParentOverviewPage />;
      }
    }

    return <DashboardLayout>{pageContent}</DashboardLayout>;
  }

  // CBT Exam Interface: /exam/[examId]/attempt (or /exam/[examId])
  if (cleanPath.startsWith('/exam/')) {
    const parts = cleanPath.replace('/exam/', '').split('/');
    const examId = parts[0] || 'exm_jee_mock_01';
    return <CbtExamAttemptPage examId={examId} />;
  }

  // Classroom Interface: /learn/[courseId]/[moduleId]
  if (cleanPath.startsWith('/learn/')) {
    const segments = cleanPath.replace('/learn/', '').split('/');
    const courseId = segments[0] || 'crs_phy_12_01';
    const moduleId = segments[1] || 'mod_vod_01';
    return <ClassroomPage courseId={courseId} moduleId={moduleId} />;
  }

  if (cleanPath.startsWith('/course/')) {
    const slug = cleanPath.replace('/course/', '');
    return <CourseOverviewPage slug={slug} />;
  }

  return <LoginPage />;
};

export default function App() {
  return (
    <LmsProvider>
      <MockGlobalProvider>
        <div className="min-h-screen bg-[#0A0B0E] text-[#F3F4F6] flex flex-col font-sans antialiased overflow-x-hidden">
          <div className="flex-1">
            <AppRouter />
          </div>
        </div>
      </MockGlobalProvider>
    </LmsProvider>
  );
}
