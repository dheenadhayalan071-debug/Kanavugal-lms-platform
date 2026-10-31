import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Lock,
  Play,
  Terminal,
  Unlock,
  UserCheck,
} from 'lucide-react';
import { useLms } from '../../../context/LmsContext';
import {
  calculateCourseProgress,
  getModuleLockStatus,
} from '../../../lib/lmsLogic';
import { ModuleLockStatus } from '../../../types/prisma';

export const CourseOverviewPage: React.FC<{ slug: string }> = ({ slug }) => {
  const {
    courses,
    modules,
    enrollments,
    progress,
    currentUser,
    navigate,
    enrollInCourse,
  } = useLms();

  const course =
    courses.find((c) => c.slug === slug) ?? courses[0];

  const courseModules = modules
    .filter((m) => m.courseId === course.id)
    .sort((a, b) => a.position - b.position);

  const isEnrolled = enrollments.some(
    (e) => e.userId === currentUser.id && e.courseId === course.id
  );

  const progressSummary = calculateCourseProgress(
    currentUser.id,
    course.id,
    modules,
    progress
  );

  return (
    <div className="min-h-[calc(100vh-66px)] bg-black text-white py-10 px-6">
      <div className="max-w-[1280px] mx-auto space-y-10">
        {/* Top Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-zinc-800 pb-5">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="font-mono text-xs font-bold text-zinc-300 hover:text-[#F2FF00] flex items-center gap-2 transition-colors duration-75 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Student Hub (/dashboard)</span>
          </button>

          {/* Course Switcher Pills for fast inspection of all 4 slugs */}
          <div className="flex flex-wrap items-center gap-2">
            {courses.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => navigate(`/course/${c.slug}`)}
                className={`px-3 py-1.5 font-mono text-xs font-bold border transition-colors duration-75 whitespace-nowrap rounded-none cursor-pointer ${
                  c.id === course.id
                    ? 'bg-[#F2FF00] text-black border-white'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-white hover:text-white'
                }`}
              >
                {c.track}
              </button>
            ))}
          </div>
        </div>

        {/* COURSE HEADER & INSTRUCTOR INFO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Course Details (Left 8 columns) */}
          <div className="lg:col-span-8 bg-zinc-950 border-2 border-white p-8 flex flex-col justify-between brutal-shadow-yellow space-y-6">
            <div className="space-y-4">
              <div className="font-mono text-xs text-[#F2FF00] flex flex-wrap items-center gap-2 tabular-nums">
                <span className="font-bold">{course.track}</span>
                <span aria-hidden="true">·</span>
                <span>SLUG: /course/{course.slug}</span>
                <span aria-hidden="true">·</span>
                <span>{course.estimatedHours} HOURS</span>
                <span aria-hidden="true">·</span>
                <span>{courseModules.length} MODULES</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight text-balance">
                {course.title}
              </h1>

              <p className="text-zinc-300 text-base leading-relaxed">
                {course.description}
              </p>

              <div className="pt-4 border-t border-zinc-800 space-y-2 font-mono text-xs">
                <div>
                  <span className="text-zinc-400">CAPSTONE DELIVERABLE: </span>
                  <span className="text-white font-bold">
                    {course.deliverable}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400">REQUIRED STACK: </span>
                  <span className="text-[#F2FF00]">
                    {course.techStack.join(' · ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Course Progress Bar & Primary Action */}
            <div className="pt-6 border-t-2 border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between font-mono text-xs tabular-nums">
                  <span className="text-zinc-300 font-bold">
                    TRACK COMPLETION ({progressSummary.completedCount}/
                    {progressSummary.totalCount} MODULES)
                  </span>
                  <span className="text-[#F2FF00] font-bold">
                    {progressSummary.percentage}%
                  </span>
                </div>
                <div className="w-full h-3.5 bg-black border-2 border-zinc-700 p-0.5">
                  <div
                    className="h-full bg-[#F2FF00] transition-all duration-150"
                    style={{ width: `${progressSummary.percentage}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {!isEnrolled && (
                  <button
                    type="button"
                    onClick={() => enrollInCourse(course.id)}
                    className="px-5 py-3.5 bg-[#173F46] text-[#F2FF00] font-mono text-xs font-bold border-2 border-[#F2FF00] hover:bg-[#F2FF00] hover:text-black transition-colors duration-75 whitespace-nowrap rounded-none cursor-pointer"
                  >
                    + Enroll in Course
                  </button>
                )}

                {progressSummary.nextModule && (
                  <button
                    type="button"
                    onClick={() => {
                      if (!isEnrolled) enrollInCourse(course.id);
                      navigate(
                        `/learn/${course.id}/${progressSummary.nextModule!.id}`
                      );
                    }}
                    className="px-6 py-3.5 bg-[#F2FF00] text-black font-mono text-xs font-bold border-2 border-white brutal-shadow-petrol hover:bg-[#173F46] hover:text-[#F2FF00] transition-colors duration-75 flex items-center gap-2 whitespace-nowrap rounded-none cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>
                      {progressSummary.percentage === 100
                        ? 'Review Classroom'
                        : 'Launch Next Module'}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Instructor Info Card (Right 4 columns) */}
          <aside className="lg:col-span-4 bg-zinc-950 border-2 border-white p-8 flex flex-col justify-between brutal-shadow-petrol">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-3">
                <span className="font-mono text-xs text-[#F2FF00] font-bold">
                  LEAD INSTRUCTOR
                </span>
                <UserCheck className="w-4 h-4 text-[#F2FF00]" />
              </div>

              <div className="space-y-1">
                <h2 className="font-display text-2xl font-black text-white">
                  {course.instructor.name}
                </h2>
                <div className="font-mono text-xs text-[#F2FF00]">
                  {course.instructor.roleTitle}
                </div>
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed">
                {course.instructor.credentials}
              </p>

              <div className="bg-black border border-zinc-800 p-4 space-y-2 font-mono text-xs">
                <div className="text-zinc-400">LIVE MENTOR OFFICE HOURS:</div>
                <div className="text-white font-bold">
                  {course.instructor.officeHours}
                </div>
                <div className="text-zinc-500 pt-1">
                  Code review &amp; hardware debugging via Kanavugal Discord
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-800 font-mono text-xs text-zinc-400">
              ENROLLMENT STATUS:{' '}
              <strong
                className={isEnrolled ? 'text-[#F2FF00]' : 'text-zinc-300'}
              >
                {isEnrolled ? 'ACTIVE BUILDER' : 'NOT ENROLLED'}
              </strong>
            </div>
          </aside>
        </div>

        {/* VERTICALLY LOCKED MODULE PROGRESSION LIST */}
        <section
          aria-label="Vertically Locked Course Modules"
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-zinc-800 pb-4">
            <div>
              <div className="font-mono text-xs text-[#F2FF00] tracking-widest">
                SEQUENTIAL CURRICULUM PIPELINE
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white mt-1">
                VERTICALLY LOCKED MODULE SYLLABUS ({courseModules.length} UNITS)
              </h2>
            </div>
            <div className="font-mono text-xs text-zinc-400">
              Complete each module in <code className="text-white">/learn</code>{' '}
              to unlock the next stage.
            </div>
          </div>

          <div className="relative space-y-0">
            {courseModules.map((mod, idx) => {
              const lockInfo = getModuleLockStatus(
                currentUser.id,
                mod,
                courseModules,
                progress
              );
              const isCompleted =
                lockInfo.status === ModuleLockStatus.COMPLETED;
              const isAvailable =
                lockInfo.status === ModuleLockStatus.AVAILABLE;
              const isLocked = lockInfo.status === ModuleLockStatus.LOCKED;

              return (
                <div key={mod.id} className="relative">
                  {/* Vertical connector bar between sequential modules */}
                  {idx > 0 && (
                    <div className="ml-8 h-6 w-1 bg-zinc-800 flex items-center justify-center">
                      <div
                        className={`w-1 h-full ${
                          isCompleted || isAvailable
                            ? 'bg-[#F2FF00]'
                            : 'bg-zinc-800'
                        }`}
                      />
                    </div>
                  )}

                  <article
                    className={`border-2 p-6 sm:p-7 transition-colors duration-75 flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                      isCompleted
                        ? 'bg-zinc-950 border-white'
                        : isAvailable
                        ? 'bg-zinc-950 border-[#F2FF00] brutal-shadow-yellow'
                        : 'bg-black border-zinc-800 opacity-75'
                    }`}
                  >
                    <div className="flex items-start gap-5">
                      {/* Status Icon Box */}
                      <div
                        className={`w-12 h-12 shrink-0 border-2 flex items-center justify-center font-mono text-sm font-bold ${
                          isCompleted
                            ? 'bg-[#173F46] border-[#F2FF00] text-[#F2FF00]'
                            : isAvailable
                            ? 'bg-[#F2FF00] border-white text-black'
                            : 'bg-zinc-950 border-zinc-700 text-zinc-500'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : isAvailable ? (
                          <Unlock className="w-5 h-5" />
                        ) : (
                          <Lock className="w-5 h-5" />
                        )}
                      </div>

                      <div className="space-y-2 max-w-3xl">
                        <div className="font-mono text-xs flex flex-wrap items-center gap-2 tabular-nums">
                          <span
                            className={`font-bold ${
                              isCompleted
                                ? 'text-[#F2FF00]'
                                : isAvailable
                                ? 'text-white'
                                : 'text-zinc-500'
                            }`}
                          >
                            MODULE 0{mod.position} · {lockInfo.status}
                          </span>
                          <span aria-hidden="true" className="text-zinc-600">
                            ·
                          </span>
                          <span className="text-zinc-400 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {mod.durationMinutes} min video &amp; code lab
                          </span>
                        </div>

                        <h3 className="font-display text-xl sm:text-2xl font-black text-white">
                          {mod.title}
                        </h3>

                        <p className="text-zinc-300 text-sm leading-relaxed">
                          {mod.content.split('\n\n')[0]}
                        </p>

                        {isLocked && lockInfo.prerequisiteTitle && (
                          <div className="pt-1 font-mono text-xs text-amber-400">
                            🔒 Locked — Complete prerequisite &ldquo;
                            {lockInfo.prerequisiteTitle}&rdquo; first to unlock.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Action Column */}
                    <div className="flex items-center gap-3 shrink-0 lg:pl-4">
                      {isLocked ? (
                        <button
                          type="button"
                          disabled
                          aria-disabled="true"
                          className="px-5 py-3 bg-zinc-950 text-zinc-500 font-mono text-xs font-bold border-2 border-zinc-800 flex items-center gap-2 whitespace-nowrap rounded-none cursor-not-allowed"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>Locked Stage</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            if (!isEnrolled) enrollInCourse(course.id);
                            navigate(`/learn/${course.id}/${mod.id}`);
                          }}
                          className={`px-6 py-3 font-mono text-xs font-bold border-2 flex items-center gap-2 transition-colors duration-75 whitespace-nowrap rounded-none cursor-pointer ${
                            isAvailable
                              ? 'bg-[#F2FF00] text-black border-white brutal-shadow-petrol hover:bg-[#173F46] hover:text-[#F2FF00]'
                              : 'bg-black text-white border-white hover:bg-[#F2FF00] hover:text-black'
                          }`}
                        >
                          <Terminal className="w-4 h-4" />
                          <span>
                            {isCompleted ? 'Review Module' : 'Enter Classroom'}
                          </span>
                        </button>
                      )}
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
