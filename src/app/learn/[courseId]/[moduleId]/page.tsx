import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Play,
  Pause,
  Video,
  FileText,
  Radio,
  Download,
  ExternalLink,
  Clock,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Volume2,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Calendar,
  ShieldCheck,
} from 'lucide-react';
import { useLms } from '../../../../context/LmsContext';

export type ClassroomContentType = 'VOD_LECTURE' | 'PDF_MATERIAL' | 'LIVE_CLASS_ZOOM';

export interface ClassroomModuleItem {
  id: string;
  courseId: string;
  position: number;
  title: string;
  chapterName: string;
  contentType: ClassroomContentType;
  durationMinutes: number;
  instructorName: string;
  description: string;
  // VOD specific
  videoStreamId?: string;
  videoDurationLabel?: string;
  keyTakeaways?: string[];
  // PDF specific
  pdfFileName?: string;
  pdfSizeLabel?: string;
  pdfPageCount?: number;
  pdfPreviewTopics?: string[];
  // Live Zoom specific
  scheduledStartAt?: string;
  scheduledEndAt?: string;
  liveZoomJoinUrl?: string;
  liveZoomMeetingId?: string;
  liveZoomPasscode?: string;
}

export interface ClassroomCourseData {
  id: string;
  title: string;
  subject: 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology';
  classLevel: string;
  trackLabel: string;
  batchCode: string;
  instructorName: string;
  modules: ClassroomModuleItem[];
}

export const CLASSROOM_COURSES: Record<string, ClassroomCourseData> = {
  crs_phy_12_01: {
    id: 'crs_phy_12_01',
    title: 'Class 12 Physics: Electrostatics, Current Electricity & Magnetism',
    subject: 'Physics',
    classLevel: 'Class 12',
    trackLabel: 'JEE Main & Advanced · NEET UG',
    batchCode: 'SBO-JEE-2027-A',
    instructorName: 'Dr. Ananya Velu (Ph.D. Physics)',
    modules: [
      {
        id: 'mod_vod_01',
        courseId: 'crs_phy_12_01',
        position: 1,
        title: 'Gauss Law in Dielectrics & Energy Density in Parallel Plate Capacitors',
        chapterName: 'Electrostatic Potential & Capacitance',
        contentType: 'VOD_LECTURE',
        durationMinutes: 68,
        instructorName: 'Dr. Ananya Velu',
        description:
          'Complete derivation of electric displacement vector D, bound surface charge density σ_b = P · n̂, and electrostatic energy density u = (1/2) K ε₀ E² inside dielectric slabs.',
        videoStreamId: 'KA-VOD-PHY-18 (1080p60 HLS)',
        videoDurationLabel: '68:14',
        keyTakeaways: [
          'Gauss Law inside a linear dielectric medium: ∮ K ε₀ E · dA = Q_free',
          'Induced bound charge density σ_b = Q_free (1 - 1/K) / A on dielectric faces',
          'Force on a dielectric slab partially inserted between capacitor plates: F = (1/2) V² dC/dx',
        ],
      },
      {
        id: 'mod_pdf_01',
        courseId: 'crs_phy_12_01',
        position: 2,
        title: 'Daily Practice Problems (DPP #18): Capacitor RC Circuits & Dielectrics',
        chapterName: 'Electrostatic Potential & Capacitance',
        contentType: 'PDF_MATERIAL',
        durationMinutes: 45,
        instructorName: 'Dr. Ananya Velu',
        description:
          'Curated set of 30 single-choice, numerical-value, and matrix-match problems covering transient RC charging/discharging, nodal analysis in capacitor networks, and partial dielectric insertion.',
        pdfFileName: 'DPP_18_Capacitors_And_Dielectrics_Solutions.pdf',
        pdfSizeLabel: '2.8 MB',
        pdfPageCount: 14,
        pdfPreviewTopics: [
          'Section A (Q1–Q15): Equivalent Capacitance & Nodal Potential Method',
          'Section B (Q16–Q25): Transient RC Circuits — q(t) = CV(1 - e^(-t/RC))',
          'Section C (Q26–Q30): Previous 10-Year JEE Advanced & NEET PYQs with Solutions',
        ],
      },
      {
        id: 'mod_live_01',
        courseId: 'crs_phy_12_01',
        position: 3,
        title: 'Live Doubt Clinic & NTA PYQ Marathon: Moving Charges & Cyclotron',
        chapterName: 'Moving Charges & Magnetism',
        contentType: 'LIVE_CLASS_ZOOM',
        durationMinutes: 90,
        instructorName: 'Dr. Ananya Velu',
        description:
          'Interactive live Zoom classroom covering Lorentz force trajectory in crossed E and B fields, Cyclotron resonance frequency, and Biot-Savart Law applications.',
        scheduledStartAt: 'Today · 06:00 PM IST',
        scheduledEndAt: '07:30 PM IST',
        liveZoomJoinUrl: 'https://zoom.us/j/98421104921',
        liveZoomMeetingId: '984 2110 4921',
        liveZoomPasscode: 'KA2026',
      },
      {
        id: 'mod_phy_19',
        courseId: 'crs_phy_12_01',
        position: 4,
        title: 'Biot-Savart Law & Magnetic Field on Axis of Circular Current Loop',
        chapterName: 'Moving Charges & Magnetism',
        contentType: 'VOD_LECTURE',
        durationMinutes: 72,
        instructorName: 'Dr. Ananya Velu',
        description:
          'Vector formulation of Biot-Savart Law dB = (μ₀/4π)(I dl × r)/r³, Helmholtz coils uniform magnetic field region, and magnetic dipole moment of revolving electrons.',
        videoStreamId: 'KA-VOD-PHY-19 (1080p60 HLS)',
        videoDurationLabel: '72:05',
        keyTakeaways: [
          'Magnetic field on the axis of a circular loop: B(x) = μ₀ N I R² / [2(R² + x²)^(3/2)]',
          'Field at the center of a regular n-sided polygon carrying current I',
          'Gyromagnetic ratio e / (2m_e) and Bohr Magneton μ_B = eħ / (2m_e)',
        ],
      },
      {
        id: 'mod_phy_20',
        courseId: 'crs_phy_12_01',
        position: 5,
        title: 'Ampere’s Circuital Law, Solenoid, Toroid & Magnetic Force Between Wires',
        chapterName: 'Moving Charges & Magnetism',
        contentType: 'VOD_LECTURE',
        durationMinutes: 64,
        instructorName: 'Dr. Ananya Velu',
        description:
          'Application of ∮ B · dl = μ₀ I_enclosed to cylindrical conductors with cavity, ideal and finite solenoids, and definition of 1 Ampere via parallel current-carrying wires.',
        videoStreamId: 'KA-VOD-PHY-20 (1080p60 HLS)',
        videoDurationLabel: '64:40',
        keyTakeaways: [
          'Magnetic field inside a solid cylinder with an off-axis cylindrical cavity is uniform',
          'Finite solenoid axial field: B = (1/2) μ₀ n I (cos θ₁ - cos θ₂)',
          'Force per unit length between parallel conductors: dF/dl = μ₀ I₁ I₂ / (2π d)',
        ],
      },
      {
        id: 'mod_phy_21',
        courseId: 'crs_phy_12_01',
        position: 6,
        title: 'Chapter Test & NCERT Exemplar Workbook: Moving Charges & Magnetism',
        chapterName: 'Moving Charges & Magnetism',
        contentType: 'PDF_MATERIAL',
        durationMinutes: 60,
        instructorName: 'Dr. Ananya Velu',
        description:
          'Complete chapter formula summary, NCERT Exemplar subjective & objective solutions, and 45 NTA-pattern assertion-reason and numerical problems.',
        pdfFileName: 'Ch04_Moving_Charges_Magnetism_Workbook.pdf',
        pdfSizeLabel: '3.6 MB',
        pdfPageCount: 22,
        pdfPreviewTopics: [
          'Formula Sheet: Biot-Savart, Ampere Law, Moving Coil Galvanometer',
          'NCERT Exemplar Solved Exercises (MCQs Type I & II)',
          'JEE Main & NEET UG Chapter-wise Rank Booster Problems',
        ],
      },
    ],
  },
  crs_chem_12_02: {
    id: 'crs_chem_12_02',
    title: 'Class 12 Chemistry: Chemical Kinetics, Electrochemistry & Carbonyls',
    subject: 'Chemistry',
    classLevel: 'Class 12',
    trackLabel: 'NEET UG · JEE Main & Advanced',
    batchCode: 'SBO-JEE-2027-A',
    instructorName: 'Prof. Raghavan Subramanian',
    modules: [
      {
        id: 'mod_chem_15',
        courseId: 'crs_chem_12_02',
        position: 1,
        title: 'Galvanic Cells, Standard Hydrogen Electrode & Electrochemical Series',
        chapterName: 'Electrochemistry',
        contentType: 'VOD_LECTURE',
        durationMinutes: 62,
        instructorName: 'Prof. Raghavan Subramanian',
        description:
          'Thermodynamics of Galvanic cells, IUPAC cell notation, ΔG° = -nFE°cell, and predicting spontaneity of redox reactions using standard reduction potentials.',
        videoStreamId: 'KA-VOD-CHM-15 (1080p60 HLS)',
        videoDurationLabel: '62:18',
        keyTakeaways: [
          'Standard cell potential E°cell = E°cathode(SRP) - E°anode(SRP)',
          'Intensive nature of E°: combining half-cell reactions via ΔG°3 = ΔG°1 + ΔG°2',
          'Relation between equilibrium constant K_c and E°cell at 298 K',
        ],
      },
      {
        id: 'mod_pdf_02',
        courseId: 'crs_chem_12_02',
        position: 2,
        title: 'CBSE Board + NEET UG Named Reactions & Electrode Potential Handbook',
        chapterName: 'Electrochemistry',
        contentType: 'PDF_MATERIAL',
        durationMinutes: 30,
        instructorName: 'Prof. Raghavan Subramanian',
        description:
          'Complete reference handbook of Standard Reduction Potentials, Nernst Equation shortcut tables, Faraday Laws of Electrolysis, and Organic Carbonyl Named Reactions.',
        pdfFileName: 'Electrochemistry_Formula_Sheet.pdf',
        pdfSizeLabel: '4.1 MB',
        pdfPageCount: 18,
        pdfPreviewTopics: [
          'Electrochemical Series Mnemonic & Disproportionation Criteria',
          'Molar Conductivity Λ_m vs √c Plots for Strong & Weak Electrolytes',
          'Faraday’s 1st & 2nd Laws: Quantitative Electrolysis Product Rules',
        ],
      },
      {
        id: 'mod_live_02',
        courseId: 'crs_chem_12_02',
        position: 3,
        title: 'Live Interactive Session: Kohlrausch Law & Conductometric Titrations',
        chapterName: 'Electrochemistry',
        contentType: 'LIVE_CLASS_ZOOM',
        durationMinutes: 75,
        instructorName: 'Prof. Raghavan Subramanian',
        description:
          'Live problem-solving session on Kohlrausch Law of independent migration of ions, degree of dissociation α = Λ_m / Λ°_m, and conductometric titration graphs.',
        scheduledStartAt: 'Tomorrow · 05:30 PM IST',
        scheduledEndAt: '06:45 PM IST',
        liveZoomJoinUrl: 'https://zoom.us/j/94102938471',
        liveZoomMeetingId: '941 0293 8471',
        liveZoomPasscode: 'CHEM12',
      },
    ],
  },
};

interface ClassroomPageProps {
  courseId: string;
  moduleId: string;
}

export const ClassroomPage: React.FC<ClassroomPageProps> = ({ courseId, moduleId }) => {
  const { navigate } = useLms();

  const course =
    CLASSROOM_COURSES[courseId] || CLASSROOM_COURSES.crs_phy_12_01;

  // Initial completed modules: first two modules completed so user can see green checkmarks, active module, and sequential locking
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>({
    mod_vod_01: true,
    mod_pdf_01: true,
    mod_chem_15: true,
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<string>('1.0x');
  const [pdfPage, setPdfPage] = useState<number>(1);
  const [pdfZoom, setPdfZoom] = useState<number>(100);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Find active module or default to first module in course
  const activeModule = useMemo(() => {
    return (
      course.modules.find((m) => m.id === moduleId) || course.modules[0]
    );
  }, [course, moduleId]);

  const activeIndex = course.modules.findIndex((m) => m.id === activeModule.id);

  // Determine sequential lock status: a module is unlocked if it's index 0, or already completed, or the previous module is completed
  const isModuleLocked = (idx: number): boolean => {
    if (idx <= 0) return false;
    const mod = course.modules[idx];
    if (completedIds[mod.id]) return false;
    const prevMod = course.modules[idx - 1];
    return !completedIds[prevMod.id];
  };

  const completedCount = course.modules.filter((m) => completedIds[m.id]).length;
  const progressPercentage = Math.round(
    (completedCount / course.modules.length) * 100
  );

  const isCurrentCompleted = !!completedIds[activeModule.id];

  const handleToggleComplete = () => {
    const nextState = !completedIds[activeModule.id];
    setCompletedIds((prev) => ({
      ...prev,
      [activeModule.id]: nextState,
    }));
    triggerToast(
      nextState
        ? `Marked "${activeModule.title}" as Complete. Next module unlocked.`
        : `Marked "${activeModule.title}" as Incomplete.`
    );
  };

  const handleSelectModule = (mod: ClassroomModuleItem, idx: number) => {
    if (isModuleLocked(idx)) {
      triggerToast(
        `Complete Module #${idx} ("${course.modules[idx - 1].title}") first to unlock this module.`
      );
      return;
    }
    setIsPlaying(false);
    setPdfPage(1);
    navigate(`/learn/${course.id}/${mod.id}`);
  };

  const prevModule = activeIndex > 0 ? course.modules[activeIndex - 1] : null;
  const nextModule =
    activeIndex < course.modules.length - 1
      ? course.modules[activeIndex + 1]
      : null;

  const contentTypeBadge = (type: ClassroomContentType) => {
    switch (type) {
      case 'VOD_LECTURE':
        return {
          label: 'VOD Lecture',
          icon: <Video className="w-3.5 h-3.5 text-[#FF4B00]" />,
        };
      case 'PDF_MATERIAL':
        return {
          label: 'PDF Study Material',
          icon: <FileText className="w-3.5 h-3.5 text-[#FF4B00]" />,
        };
      case 'LIVE_CLASS_ZOOM':
        return {
          label: 'Live Zoom Classroom',
          icon: <Radio className="w-3.5 h-3.5 text-[#FF4B00]" />,
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F3EF] flex flex-col overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md bg-[#111111] border border-[#FF4B00] rounded-lg px-4 py-3 shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-[#FF4B00] shrink-0" />
          <p className="text-xs text-[#F5F3EF]">{toastMessage}</p>
        </div>
      )}

      {/* Top Classroom Bar */}
      <header className="sticky top-0 z-30 bg-[#111111] border-b border-[#292929] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <button
            type="button"
            onClick={() => navigate('/dashboard/student')}
            className="px-3 py-1.5 rounded-md bg-[#080808] hover:bg-[#181818] border border-[#292929] text-xs font-medium text-[#A1A1AA] hover:text-[#F5F3EF] inline-flex items-center gap-1.5 transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#FF4B00]" />
            <span>Back to Student Dashboard</span>
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] text-[#A1A1AA]">
              <span className="text-[#FF4B00] font-medium">{course.subject}</span>
              <span>•</span>
              <span className="font-mono">{course.batchCode}</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline truncate">{course.trackLabel}</span>
            </div>
            <h1 className="text-sm sm:text-base font-semibold text-[#F5F3EF] truncate">
              {course.title}
            </h1>
          </div>
        </div>

        {/* Course Switcher & Progress Pill */}
        <div className="flex items-center gap-3">
          <select
            aria-label="Switch Classroom Course"
            value={course.id}
            onChange={(e) => {
              const nextCourse = CLASSROOM_COURSES[e.target.value];
              if (nextCourse) {
                navigate(`/learn/${nextCourse.id}/${nextCourse.modules[0].id}`);
              }
            }}
            className="bg-[#080808] border border-[#292929] rounded-md px-3 py-1.5 text-xs text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
          >
            <option value="crs_phy_12_01">Physics (Class 12 · Electrostatics & Magnetism)</option>
            <option value="crs_chem_12_02">Chemistry (Class 12 · Electrochemistry)</option>
          </select>

          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-[#080808] border border-[#292929]">
            <span className="text-xs text-[#A1A1AA]">Progress:</span>
            <span className="font-mono text-xs font-semibold text-[#FF4B00]">
              {completedCount}/{course.modules.length} ({progressPercentage}%)
            </span>
          </div>
        </div>
      </header>

      {/* Main 70% / 30% Classroom Split Workspace */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-8 py-6 flex flex-col lg:flex-row gap-6">
        {/* LEFT COLUMN (70%): Active Learning Stage */}
        <main className="w-full lg:w-[70%] flex flex-col justify-between space-y-6 min-w-0">
          <div className="space-y-6">
            {/* Active Module Header Card */}
            <div className="bg-[#111111] border border-[#292929] rounded-lg p-5 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#080808] text-[#FF4B00] border border-[#292929]">
                    MODULE {String(activeModule.position).padStart(2, '0')}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded bg-[#080808] text-[#F5F3EF] border border-[#292929]">
                    {contentTypeBadge(activeModule.contentType).icon}
                    <span>{contentTypeBadge(activeModule.contentType).label}</span>
                  </span>
                  <span className="text-xs text-[#A1A1AA]">
                    Chapter: {activeModule.chapterName}
                  </span>
                </div>

                <span className="font-mono text-xs text-[#A1A1AA] inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FF4B00]" />
                  {activeModule.durationMinutes} mins
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-semibold text-[#F5F3EF]">
                {activeModule.title}
              </h2>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                {activeModule.description}
              </p>
            </div>

            {/* DYNAMIC CONTENT STAGE BASED ON MODULE TYPE */}
            {/* CASE 1: VOD_LECTURE */}
            {activeModule.contentType === 'VOD_LECTURE' && (
              <div className="bg-[#111111] border border-[#292929] rounded-lg overflow-hidden space-y-0">
                {/* 16:9 Video Player Placeholder */}
                <div className="relative aspect-video bg-[#080808] flex flex-col justify-between p-6 border-b border-[#292929]">
                  {/* Top Video Overlay Bar */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-[#111111]/90 border border-[#292929] text-[#A1A1AA]">
                      STREAM ID: <strong className="text-[#F5F3EF]">{activeModule.videoStreamId}</strong>
                    </span>
                    <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-[#111111]/90 border border-[#292929] text-[#FF4B00]">
                      DRM PROTECTED · 1080p60
                    </span>
                  </div>

                  {/* Center Play Button & Equation Chalkboard Preview */}
                  <div className="my-auto flex flex-col items-center text-center max-w-xl mx-auto space-y-4">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-16 h-16 rounded-full bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] flex items-center justify-center transition-transform hover:scale-105 shadow-xl"
                      aria-label={isPlaying ? 'Pause lecture video' : 'Play lecture video'}
                    >
                      {isPlaying ? (
                        <Pause className="w-7 h-7" />
                      ) : (
                        <Play className="w-7 h-7 ml-0.5" />
                      )}
                    </button>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-[#F5F3EF]">
                        {isPlaying ? 'Playing Lecture Stream...' : activeModule.title}
                      </p>
                      <p className="font-mono text-xs text-[#A1A1AA]">
                        Faculty: {activeModule.instructorName} · Duration:{' '}
                        {activeModule.videoDurationLabel || `${activeModule.durationMinutes}:00`}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Player Scrubber & Controls */}
                  <div className="space-y-2.5 bg-[#111111]/90 border border-[#292929] rounded-md p-3">
                    <div className="w-full h-1.5 bg-[#080808] rounded-full overflow-hidden cursor-pointer">
                      <div
                        className="h-full bg-[#FF4B00] transition-all"
                        style={{ width: isPlaying ? '48%' : '32%' }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="text-[#F5F3EF] hover:text-[#FF4B00] font-medium inline-flex items-center gap-1"
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              <span>Pause</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5" />
                              <span>Play</span>
                            </>
                          )}
                        </button>
                        <span className="font-mono text-[11px] text-[#A1A1AA]">
                          21:45 / {activeModule.videoDurationLabel || '68:14'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {(['1.0x', '1.25x', '1.5x', '2.0x'] as const).map((spd) => (
                            <button
                              key={spd}
                              type="button"
                              onClick={() => setPlaybackSpeed(spd)}
                              className={`px-2 py-0.5 rounded font-mono text-[11px] transition-colors ${
                                playbackSpeed === spd
                                  ? 'bg-[#FF4B00] text-[#F5F3EF]'
                                  : 'bg-[#080808] text-[#A1A1AA] hover:text-[#F5F3EF]'
                              }`}
                            >
                              {spd}
                            </button>
                          ))}
                        </div>
                        <Volume2 className="w-4 h-4 text-[#A1A1AA]" />
                        <Maximize2 className="w-4 h-4 text-[#A1A1AA]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Lecture Takeaways */}
                {activeModule.keyTakeaways && (
                  <div className="p-5 space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
                      Key Board & NTA Formula Derivations Covered
                    </h3>
                    <ul className="space-y-2">
                      {activeModule.keyTakeaways.map((point, i) => (
                        <li
                          key={i}
                          className="text-xs text-[#F5F3EF] flex items-start gap-2.5 bg-[#080808] border border-[#292929] rounded-md p-3 font-mono"
                        >
                          <span className="text-[#FF4B00] font-semibold">
                            0{i + 1}.
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* CASE 2: PDF_MATERIAL */}
            {activeModule.contentType === 'PDF_MATERIAL' && (
              <div className="bg-[#111111] border border-[#292929] rounded-lg overflow-hidden">
                {/* PDF Viewer Top Toolbar */}
                <div className="bg-[#080808] border-b border-[#292929] px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#FF4B00]" />
                    <span className="font-mono text-xs text-[#F5F3EF]">
                      {activeModule.pdfFileName}
                    </span>
                    <span className="font-mono text-[11px] text-[#A1A1AA] px-2 py-0.5 rounded bg-[#111111] border border-[#292929]">
                      {activeModule.pdfSizeLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1 bg-[#111111] border border-[#292929] rounded-md px-2 py-1">
                      <button
                        type="button"
                        onClick={() => setPdfZoom((z) => Math.max(75, z - 15))}
                        className="p-1 text-[#A1A1AA] hover:text-[#F5F3EF]"
                        aria-label="Zoom out PDF"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-[11px] text-[#F5F3EF] px-1.5">
                        {pdfZoom}%
                      </span>
                      <button
                        type="button"
                        onClick={() => setPdfZoom((z) => Math.min(160, z + 15))}
                        className="p-1 text-[#A1A1AA] hover:text-[#F5F3EF]"
                        aria-label="Zoom in PDF"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 bg-[#111111] border border-[#292929] rounded-md px-2.5 py-1 text-xs font-mono">
                      <button
                        type="button"
                        disabled={pdfPage <= 1}
                        onClick={() => setPdfPage((p) => Math.max(1, p - 1))}
                        className="text-[#A1A1AA] hover:text-[#F5F3EF] disabled:opacity-40"
                      >
                        Prev
                      </button>
                      <span className="text-[#F5F3EF]">
                        Page {pdfPage} / {activeModule.pdfPageCount || 14}
                      </span>
                      <button
                        type="button"
                        disabled={pdfPage >= (activeModule.pdfPageCount || 14)}
                        onClick={() =>
                          setPdfPage((p) =>
                            Math.min(activeModule.pdfPageCount || 14, p + 1)
                          )
                        }
                        className="text-[#A1A1AA] hover:text-[#F5F3EF] disabled:opacity-40"
                      >
                        Next
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        triggerToast(
                          `Downloading ${activeModule.pdfFileName} from Supabase Storage...`
                        )
                      }
                      className="px-3 py-1.5 rounded-md bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>

                {/* Document Viewer Canvas Placeholder */}
                <div className="p-6 sm:p-10 bg-[#080808] flex justify-center">
                  <div className="w-full max-w-2xl bg-[#111111] border border-[#292929] rounded-lg p-6 sm:p-8 space-y-6 shadow-xl">
                    <div className="flex items-center justify-between pb-4 border-b border-[#292929]">
                      <div>
                        <p className="font-mono text-[11px] text-[#FF4B00]">
                          KANAVUGAL ACADEMY · {course.batchCode}
                        </p>
                        <h3 className="text-base font-semibold text-[#F5F3EF] mt-0.5">
                          {activeModule.title}
                        </h3>
                      </div>
                      <span className="font-mono text-xs text-[#A1A1AA]">
                        Page {pdfPage} of {activeModule.pdfPageCount || 14}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs text-[#A1A1AA] leading-relaxed">
                        {activeModule.description}
                      </p>

                      {activeModule.pdfPreviewTopics && (
                        <div className="space-y-2 pt-2">
                          <p className="text-xs font-semibold text-[#F5F3EF]">
                            Document Structure & Problem Sets:
                          </p>
                          {activeModule.pdfPreviewTopics.map((topic, index) => (
                            <div
                              key={index}
                              className="bg-[#080808] border border-[#292929] rounded-md p-3.5 font-mono text-xs text-[#F5F3EF]"
                            >
                              {topic}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#292929] flex items-center justify-between text-[11px] text-[#A1A1AA] font-mono">
                      <span>Author: {activeModule.instructorName}</span>
                      <span>Supabase Storage Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CASE 3: LIVE_CLASS_ZOOM */}
            {activeModule.contentType === 'LIVE_CLASS_ZOOM' && (
              <div className="bg-[#111111] border border-[#292929] rounded-lg p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#292929]">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF4B00]/15 text-[#FF4B00] border border-[#FF4B00]/30 text-xs font-medium">
                      <Radio className="w-3.5 h-3.5" />
                      Scheduled Live Zoom Classroom
                    </span>
                    <h3 className="text-xl font-semibold text-[#F5F3EF] pt-2">
                      {activeModule.title}
                    </h3>
                  </div>

                  <div className="bg-[#080808] border border-[#292929] rounded-lg px-4 py-3 text-right">
                    <p className="text-[11px] text-[#A1A1AA]">Scheduled Start Time</p>
                    <p className="font-mono text-base font-semibold text-[#FF4B00] mt-0.5">
                      {activeModule.scheduledStartAt}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#080808] border border-[#292929] rounded-md p-4">
                    <p className="text-[11px] text-[#A1A1AA]">Zoom Meeting ID</p>
                    <p className="font-mono text-sm font-semibold text-[#F5F3EF] mt-1">
                      {activeModule.liveZoomMeetingId}
                    </p>
                  </div>
                  <div className="bg-[#080808] border border-[#292929] rounded-md p-4">
                    <p className="text-[11px] text-[#A1A1AA]">Session Passcode</p>
                    <p className="font-mono text-sm font-semibold text-[#F5F3EF] mt-1">
                      {activeModule.liveZoomPasscode}
                    </p>
                  </div>
                  <div className="bg-[#080808] border border-[#292929] rounded-md p-4">
                    <p className="text-[11px] text-[#A1A1AA]">Host Faculty</p>
                    <p className="text-sm font-semibold text-[#F5F3EF] mt-1">
                      {activeModule.instructorName}
                    </p>
                  </div>
                </div>

                <div className="bg-[#080808] border border-[#292929] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-[#F5F3EF]">
                      Ready to join the interactive classroom?
                    </p>
                    <p className="text-xs text-[#A1A1AA]">
                      Attendance is automatically logged in AttendanceRecord when you join with your academy roll number.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      triggerToast(
                        `Launching Zoom Classroom (${activeModule.liveZoomMeetingId}) for ${activeModule.title}...`
                      )
                    }
                    className="shrink-0 px-6 py-3.5 rounded-md bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] text-sm font-semibold inline-flex items-center justify-center gap-2.5 transition-colors shadow-lg"
                  >
                    <Radio className="w-4 h-4" />
                    <span>Join Zoom Class</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Classroom Action Bar (Mark as Complete + Prev/Next Module) */}
          <div className="bg-[#111111] border border-[#292929] rounded-lg p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                disabled={!prevModule}
                onClick={() =>
                  prevModule && handleSelectModule(prevModule, activeIndex - 1)
                }
                className="px-3.5 py-2 rounded-md bg-[#080808] border border-[#292929] text-xs font-medium text-[#F5F3EF] hover:border-[#FF4B00] disabled:opacity-40 inline-flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous Module</span>
              </button>

              <button
                type="button"
                disabled={!nextModule}
                onClick={() =>
                  nextModule && handleSelectModule(nextModule, activeIndex + 1)
                }
                className="px-3.5 py-2 rounded-md bg-[#080808] border border-[#292929] text-xs font-medium text-[#F5F3EF] hover:border-[#FF4B00] disabled:opacity-40 inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Next Module</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleToggleComplete}
              className={`px-5 py-2.5 rounded-md text-xs font-semibold inline-flex items-center gap-2 transition-colors border ${
                isCurrentCompleted
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/25'
                  : 'bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] border-[#FF4B00]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isCurrentCompleted ? 'Completed (Click to Undo)' : 'Mark as Complete'}
              </span>
            </button>
          </div>
        </main>

        {/* RIGHT COLUMN (30%): Vertically Scrollable Course Curriculum Sidebar */}
        <aside className="w-full lg:w-[30%] bg-[#111111] border border-[#292929] rounded-lg flex flex-col max-h-[calc(100vh-7rem)] shrink-0">
          {/* Sidebar Header & Overall Course Completion */}
          <div className="p-5 border-b border-[#292929] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#F5F3EF] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#FF4B00]" />
                <span>Course Curriculum</span>
              </h2>
              <span className="font-mono text-xs text-[#FF4B00]">
                {completedCount}/{course.modules.length} Done
              </span>
            </div>

            <div className="w-full h-1.5 bg-[#080808] border border-[#292929] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FF4B00] transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <p className="text-[11px] text-[#A1A1AA]">
              Complete modules sequentially to unlock advanced chapter problem sets.
            </p>
          </div>

          {/* Vertically Scrollable Module List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#292929]">
            {course.modules.map((mod, idx) => {
              const isCompleted = !!completedIds[mod.id];
              const isLocked = isModuleLocked(idx);
              const isActive = mod.id === activeModule.id;

              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => handleSelectModule(mod, idx)}
                  className={`w-full text-left p-4 transition-colors flex items-start gap-3.5 ${
                    isActive
                      ? 'bg-[#FF4B00]/10 border-l-2 border-l-[#FF4B00]'
                      : isLocked
                      ? 'opacity-60 hover:bg-[#080808]/40'
                      : 'hover:bg-[#080808]/70'
                  }`}
                >
                  {/* Status Icon: Green Checkmark / Lock / Position Number */}
                  <div className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <div
                        className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400"
                        title="Completed"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    ) : isLocked ? (
                      <div
                        className="w-6 h-6 rounded-full bg-[#080808] border border-[#292929] flex items-center justify-center text-[#A1A1AA]"
                        title="Locked — Complete previous module first"
                      >
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div
                        className={`w-6 h-6 rounded-full font-mono text-[11px] flex items-center justify-center border ${
                          isActive
                            ? 'bg-[#FF4B00] text-[#F5F3EF] border-[#FF4B00]'
                            : 'bg-[#080808] text-[#F5F3EF] border-[#292929]'
                        }`}
                      >
                        {String(mod.position).padStart(2, '0')}
                      </div>
                    )}
                  </div>

                  {/* Module Details */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#A1A1AA]">
                        {mod.contentType === 'VOD_LECTURE'
                          ? 'VOD Lecture'
                          : mod.contentType === 'PDF_MATERIAL'
                          ? 'PDF Material'
                          : 'Live Zoom'}
                      </span>
                      <span className="font-mono text-[11px] text-[#A1A1AA]">
                        {mod.durationMinutes}m
                      </span>
                    </div>

                    <p
                      className={`text-xs font-medium leading-snug ${
                        isActive ? 'text-[#FF4B00]' : 'text-[#F5F3EF]'
                      }`}
                    >
                      {mod.title}
                    </p>

                    <p className="text-[11px] text-[#A1A1AA] truncate">
                      {mod.chapterName}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ClassroomPage;
