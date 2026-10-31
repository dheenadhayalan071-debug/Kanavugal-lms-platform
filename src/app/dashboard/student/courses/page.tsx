import React, { useState } from 'react';
import {
  BookOpen,
  Play,
  Radio,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { useLms } from '../../../../context/LmsContext';

type LearningSubView = 'COURSES' | 'VODS' | 'ZOOM';

const ENROLLED_COURSES = [
  {
    id: 'crs_phy_12_01',
    title: 'Class 12 Physics: Electrostatics, Current Electricity & Magnetism',
    subject: 'Physics',
    classLevel: 'Class 12',
    academicTrack: 'JEE Main & Advanced',
    instructorName: 'Dr. Ananya Velu',
    completedModules: 18,
    totalModules: 24,
    nextModuleTitle:
      'L-19: Biot-Savart Law & Magnetic Field on Axis of Circular Loop',
    resumePath: '/learn/crs_phy_12_01/mod_vod_01',
  },
  {
    id: 'crs_chem_12_02',
    title: 'Class 12 Chemistry: Chemical Kinetics, Electrochemistry & Carbonyls',
    subject: 'Chemistry',
    classLevel: 'Class 12',
    academicTrack: 'NEET UG & JEE',
    instructorName: 'Prof. Raghavan Subramanian',
    completedModules: 15,
    totalModules: 22,
    nextModuleTitle:
      'L-16: Nernst Equation, Gibbs Free Energy & Concentration Cells',
    resumePath: '/learn/crs_chem_12_02/mod_chem_15',
  },
  {
    id: 'crs_math_12_03',
    title:
      'JEE Mathematics: Definite Integration, Differential Equations & 3D Geometry',
    subject: 'Mathematics',
    classLevel: 'Class 12',
    academicTrack: 'JEE Main & Advanced',
    instructorName: 'Prof. Vikramaditya Senthil',
    completedModules: 14,
    totalModules: 20,
    nextModuleTitle:
      'L-15: Properties of Definite Integrals & King’s Rule Applications',
    resumePath: '/learn/crs_phy_12_01/mod_vod_02',
  },
  {
    id: 'crs_bio_12_04',
    title:
      'NEET UG & CBSE Biology: Molecular Basis of Inheritance & Biotechnology',
    subject: 'Biology',
    classLevel: 'Class 12',
    academicTrack: 'NEET UG Medical',
    instructorName: 'Dr. Meenakshi Sundaram',
    completedModules: 11,
    totalModules: 14,
    nextModuleTitle:
      'L-12: Polymerase Chain Reaction (PCR) & Restriction Enzymes',
    resumePath: '/learn/crs_phy_12_01/mod_vod_03',
  },
];

const VOD_LECTURES = [
  {
    id: 'mod_vod_01',
    subject: 'Physics',
    title:
      'Gauss Law in Dielectrics & Energy Density in Parallel Plate Capacitors',
    chapterName: 'Electrostatic Potential & Capacitance',
    position: 18,
    durationMinutes: 68,
    youtubeVideoId: 'KA-VOD-PHY-18',
    instructorName: 'Dr. Ananya Velu',
  },
  {
    id: 'mod_vod_02',
    subject: 'Mathematics',
    title: 'Definite Integration by Reduction Formulae & Walli’s Theorem',
    chapterName: 'Definite Integration',
    position: 14,
    durationMinutes: 74,
    youtubeVideoId: 'KA-VOD-MAT-14',
    instructorName: 'Prof. Vikramaditya Senthil',
  },
  {
    id: 'mod_vod_03',
    subject: 'Biology',
    title:
      'Transcription in Eukaryotes: RNA Splicing, Capping & Polyadenylation',
    chapterName: 'Molecular Basis of Inheritance',
    position: 11,
    durationMinutes: 55,
    youtubeVideoId: 'KA-VOD-BIO-11',
    instructorName: 'Dr. Meenakshi Sundaram',
  },
];

const ZOOM_CLASSES = [
  {
    id: 'mod_live_01',
    subject: 'Physics',
    title: 'Live Doubt Clinic & NTA PYQ Marathon: Moving Charges & Cyclotron',
    chapterName: 'Moving Charges & Magnetism',
    liveZoomMeetingId: '984 2110 4921',
    liveZoomPasscode: 'KA2026',
    scheduledStartAt: 'Today · 06:00 PM IST',
    instructorName: 'Dr. Ananya Velu',
    courseId: 'crs_phy_12_01',
  },
  {
    id: 'mod_live_02',
    subject: 'Chemistry',
    title: 'Live Interactive Session: Kohlrausch Law & Conductometric Titrations',
    chapterName: 'Electrochemistry',
    liveZoomMeetingId: '941 0293 8471',
    liveZoomPasscode: 'CHEM12',
    scheduledStartAt: 'Tomorrow · 05:30 PM IST',
    instructorName: 'Prof. Raghavan Subramanian',
    courseId: 'crs_chem_12_02',
  },
];

export const StudentCoursesPage: React.FC = () => {
  const { navigate } = useLms();
  const [subView, setSubView] = useState<LearningSubView>('COURSES');
  const [completedModuleIds, setCompletedModuleIds] = useState<
    Record<string, boolean>
  >({
    mod_vod_01: true,
    mod_vod_03: true,
  });

  return (
    <div className="bg-[#080808] text-[#F5F3EF]">
      <header className="px-6 lg:px-10 py-8 border-b border-[#292929] bg-[#080808] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-[#FF4B00] uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Learning Hub · /dashboard/student/courses</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F3EF]">
            Enrolled Courses, VODs & Live Zoom Links
          </h1>
        </div>

        {/* Segmented Sub-Tab Switcher */}
        <div className="inline-flex items-center bg-[#111111] border border-[#292929] rounded-md p-1.5 gap-1.5">
          {(
            [
              { key: 'COURSES', label: 'Enrolled Courses (4)' },
              { key: 'VODS', label: 'Recorded VODs (3)' },
              { key: 'ZOOM', label: 'Live Zoom Links (2)' },
            ] as const
          ).map((tab) => {
            const active = subView === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSubView(tab.key)}
                className={`px-4 py-2 rounded text-xs md:text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#FF4B00] text-[#F5F3EF]'
                    : 'text-[#A1A1AA] hover:text-[#F5F3EF]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="px-6 lg:px-10 py-10 max-w-7xl">
        {/* 1. Enrolled Courses View */}
        {subView === 'COURSES' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ENROLLED_COURSES.map((course) => {
              const progressPct = Math.round(
                (course.completedModules / course.totalModules) * 100
              );
              return (
                <div
                  key={course.id}
                  className="bg-[#111111] border border-[#292929] rounded-lg p-6 md:p-8 flex flex-col justify-between space-y-6 hover:border-[#FF4B00]/60 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded text-xs md:text-sm font-medium uppercase tracking-wider bg-[#080808] text-[#FF4B00] border border-[#292929]">
                        {course.subject} · {course.classLevel}
                      </span>
                      <span className="font-mono text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider">
                        {course.academicTrack}
                      </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F5F3EF] leading-snug">
                      {course.title}
                    </h2>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-[#292929]">
                    <div className="flex items-center justify-between text-base">
                      <span className="text-[#A1A1AA]">
                        {course.instructorName}
                      </span>
                      <span className="font-mono text-[#F5F3EF]">
                        {course.completedModules}/{course.totalModules} Modules (
                        {progressPct}%)
                      </span>
                    </div>

                    <div className="w-full h-2 bg-[#080808] border border-[#292929] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FF4B00]"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>

                    <div className="bg-[#080808] border border-[#292929] rounded-md p-4 flex items-center justify-between gap-4">
                      <div className="min-w-0 space-y-0.5">
                        <p className="text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider">
                          Up Next in Syllabus
                        </p>
                        <p className="text-base font-medium text-[#F5F3EF] truncate">
                          {course.nextModuleTitle}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate(course.resumePath)}
                        className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] text-sm font-medium transition-colors"
                      >
                        <span>Continue</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. Recorded VODs View */}
        {subView === 'VODS' && (
          <div className="bg-[#111111] border border-[#292929] rounded-lg divide-y divide-[#292929]">
            {VOD_LECTURES.map((vod) => {
              const isDone = !!completedModuleIds[vod.id];
              return (
                <div
                  key={vod.id}
                  className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5 text-xs md:text-sm font-medium uppercase tracking-wider">
                      <span className="font-mono text-[#FF4B00]">
                        Lecture #{vod.position}
                      </span>
                      <span className="text-[#A1A1AA]">•</span>
                      <span className="text-[#F5F3EF]">{vod.subject}</span>
                      <span className="font-mono text-xs text-[#A1A1AA]">
                        ({vod.durationMinutes} mins · {vod.youtubeVideoId})
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F5F3EF]">
                      {vod.title}
                    </h2>
                    <p className="text-base text-[#A1A1AA]">
                      Chapter: {vod.chapterName} · Faculty: {vod.instructorName}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setCompletedModuleIds((prev) => ({
                          ...prev,
                          [vod.id]: !prev[vod.id],
                        }))
                      }
                      className={`px-4 py-2.5 rounded-md text-sm font-medium border transition-colors inline-flex items-center gap-2 ${
                        isDone
                          ? 'bg-[#080808] text-[#FF4B00] border-[#FF4B00]'
                          : 'bg-[#080808] text-[#A1A1AA] border-[#292929] hover:text-[#F5F3EF]'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isDone ? 'Completed' : 'Mark Complete'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/learn/crs_phy_12_01/${vod.id}`)}
                      className="px-4 py-2.5 rounded-md bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] text-sm font-medium inline-flex items-center gap-2 transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      <span>Watch Lecture</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. Live Zoom Links View */}
        {subView === 'ZOOM' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ZOOM_CLASSES.map((live) => (
              <div
                key={live.id}
                className="bg-[#111111] border border-[#292929] rounded-lg p-6 md:p-8 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs md:text-sm font-medium uppercase tracking-wider bg-[#FF4B00]/15 text-[#FF4B00] border border-[#FF4B00]/30">
                      <Radio className="w-3.5 h-3.5" />
                      Live Zoom Classroom
                    </span>
                    <span className="font-mono text-xs md:text-sm font-medium text-[#F5F3EF] uppercase tracking-wider">
                      {live.scheduledStartAt}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F5F3EF]">
                    {live.title}
                  </h2>

                  <p className="text-base text-[#A1A1AA]">
                    {live.subject} · Chapter: {live.chapterName} · Faculty:{' '}
                    <span className="text-[#F5F3EF]">{live.instructorName}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-[#292929] flex flex-wrap items-center justify-between gap-4">
                  <div className="font-mono text-xs md:text-sm text-[#A1A1AA]">
                    Meeting ID:{' '}
                    <span className="text-[#F5F3EF]">
                      {live.liveZoomMeetingId}
                    </span>{' '}
                    · Passcode:{' '}
                    <span className="text-[#F5F3EF]">
                      {live.liveZoomPasscode}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/learn/${live.courseId}/${live.id}`)
                    }
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] text-sm font-medium transition-colors"
                  >
                    <span>Join Zoom Class</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCoursesPage;
