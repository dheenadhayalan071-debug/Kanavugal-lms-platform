import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Flag,
  ArrowRight,
  Send,
  AlertCircle,
  BellRing,
} from 'lucide-react';
import { useLms } from '../../../../context/LmsContext';
import { resolveCbtTimerExpiry } from '../../../../lib/lmsLogic';

export type NtaQuestionStatus =
  | 'NOT_VISITED'
  | 'NOT_ANSWERED'
  | 'ANSWERED'
  | 'MARKED_FOR_REVIEW';

export interface NtaExamQuestion {
  id: string;
  number: number;
  subject: 'Physics' | 'Chemistry' | 'Mathematics';
  chapter: string;
  positiveMarks: number;
  negativeMarks: number;
  prompt: string;
  options: {
    label: 'A' | 'B' | 'C' | 'D';
    text: string;
    isCorrect: boolean;
  }[];
}

const NTA_CBT_QUESTIONS: NtaExamQuestion[] = [
  {
    id: 'nta_q_01',
    number: 1,
    subject: 'Physics',
    chapter: 'Rotational Mechanics',
    positiveMarks: 4,
    negativeMarks: 1,
    prompt:
      'A uniform solid cylinder of mass M and radius R rolls without slipping down an inclined plane of inclination θ. What is the magnitude of the static frictional force acting on the cylinder?',
    options: [
      { label: 'A', text: '(1 / 3) M g sin θ', isCorrect: true },
      { label: 'B', text: '(2 / 3) M g sin θ', isCorrect: false },
      { label: 'C', text: '(2 / 5) M g sin θ', isCorrect: false },
      { label: 'D', text: '(1 / 2) M g sin θ', isCorrect: false },
    ],
  },
  {
    id: 'nta_q_02',
    number: 2,
    subject: 'Physics',
    chapter: 'Electrostatics & Capacitors',
    positiveMarks: 4,
    negativeMarks: 1,
    prompt:
      'Two identical air-filled parallel plate capacitors each of capacitance C are connected in series across a battery of constant EMF V. One of the capacitors is now completely filled with a dielectric slab of dielectric constant K = 3. The ratio of final electrostatic energy stored in the network to initial energy is:',
    options: [
      { label: 'A', text: '3 : 2', isCorrect: true },
      { label: 'B', text: '2 : 3', isCorrect: false },
      { label: 'C', text: '3 : 4', isCorrect: false },
      { label: 'D', text: '4 : 3', isCorrect: false },
    ],
  },
  {
    id: 'nta_q_03',
    number: 3,
    subject: 'Physics',
    chapter: 'Moving Charges & Magnetism',
    positiveMarks: 4,
    negativeMarks: 1,
    prompt:
      'A proton and an alpha particle with equal kinetic energies enter a uniform transverse magnetic field B perpendicularly. The ratio of the radii of their circular paths (r_p : r_α) is:',
    options: [
      { label: 'A', text: '1 : 1', isCorrect: true },
      { label: 'B', text: '1 : 2', isCorrect: false },
      { label: 'C', text: '2 : 1', isCorrect: false },
      { label: 'D', text: '1 : √2', isCorrect: false },
    ],
  },
  {
    id: 'nta_q_04',
    number: 4,
    subject: 'Physics',
    chapter: 'Electromagnetic Induction',
    positiveMarks: 4,
    negativeMarks: 1,
    prompt:
      'A conducting circular loop of radius r = 10 cm is placed perpendicular to a uniform magnetic field B(t) = (0.5 t² + 2.0 t) Tesla. If the resistance of the loop is 2 π Ω, the induced current in the loop at t = 2 seconds is:',
    options: [
      { label: 'A', text: '20 mA', isCorrect: true },
      { label: 'B', text: '40 mA', isCorrect: false },
      { label: 'C', text: '10 mA', isCorrect: false },
      { label: 'D', text: '50 mA', isCorrect: false },
    ],
  },
  {
    id: 'nta_q_05',
    number: 5,
    subject: 'Chemistry',
    chapter: 'Electrochemistry',
    positiveMarks: 4,
    negativeMarks: 1,
    prompt:
      'For the Daniell cell Zn(s) | Zn²⁺(0.01 M) || Cu²⁺(1.0 M) | Cu(s) at 298 K, given E°cell = 1.10 V, what is the EMF (E_cell) of the cell? (Use 2.303 RT / F = 0.059 V)',
    options: [
      { label: 'A', text: '1.159 V', isCorrect: true },
      { label: 'B', text: '1.041 V', isCorrect: false },
      { label: 'C', text: '1.129 V', isCorrect: false },
      { label: 'D', text: '1.218 V', isCorrect: false },
    ],
  },
  {
    id: 'nta_q_06',
    number: 6,
    subject: 'Chemistry',
    chapter: 'Chemical Kinetics',
    positiveMarks: 4,
    negativeMarks: 1,
    prompt:
      'A first-order decomposition reaction is 50% complete in 30 minutes at 300 K. How much time is required for 87.5% completion of the same reaction at 300 K?',
    options: [
      { label: 'A', text: '90 minutes', isCorrect: true },
      { label: 'B', text: '60 minutes', isCorrect: false },
      { label: 'C', text: '120 minutes', isCorrect: false },
      { label: 'D', text: '75 minutes', isCorrect: false },
    ],
  },
  {
    id: 'nta_q_07',
    number: 7,
    subject: 'Chemistry',
    chapter: 'Coordination Compounds',
    positiveMarks: 4,
    negativeMarks: 1,
    prompt:
      'Which of the following octahedral complexes is diamagnetic and exhibits d²sp³ inner-orbital hybridization? (Atomic numbers: Co = 27, Fe = 26, Ni = 28)',
    options: [
      { label: 'A', text: '[Co(NH₃)₆]³⁺', isCorrect: true },
      { label: 'B', text: '[CoF₆]³⁻', isCorrect: false },
      { label: 'C', text: '[Fe(H₂O)₆]²⁺', isCorrect: false },
      { label: 'D', text: '[Ni(NH₃)₆]²⁺', isCorrect: false },
    ],
  },
  {
    id: 'nta_q_08',
    number: 8,
    subject: 'Chemistry',
    chapter: 'Aldehydes, Ketones & Carboxylic Acids',
    positiveMarks: 4,
    negativeMarks: 1,
    prompt:
      'Which of the following carbonyl compounds undergoes Cannizzaro reaction upon warming with concentrated 50% NaOH solution?',
    options: [
      {
        label: 'A',
        text: '2,2-Dimethylpropanal (Trimethylacetaldehyde)',
        isCorrect: true,
      },
      { label: 'B', text: 'Acetaldehyde (Ethanal)', isCorrect: false },
      { label: 'C', text: '2-Methylpropanal', isCorrect: false },
      { label: 'D', text: 'Acetone (Propanone)', isCorrect: false },
    ],
  },
  {
    id: 'nta_q_09',
    number: 9,
    subject: 'Mathematics',
    chapter: 'Definite Integration',
    positiveMarks: 4,
    negativeMarks: 1,
    prompt:
      'Evaluate the definite integral I = ∫ (from 0 to π/2) [ √(sin x) / ( √(sin x) + √(cos x) ) ] dx :',
    options: [
      { label: 'A', text: 'π / 4', isCorrect: true },
      { label: 'B', text: 'π / 2', isCorrect: false },
      { label: 'C', text: 'π / 8', isCorrect: false },
      { label: 'D', text: '1', isCorrect: false },
    ],
  },
  {
    id: 'nta_q_10',
    number: 10,
    subject: 'Mathematics',
    chapter: 'Differential Equations',
    positiveMarks: 4,
    negativeMarks: 1,
    prompt:
      'The integrating factor (I.F.) of the first-order linear differential equation (x log x) (dy/dx) + y = 2 log x (for x > 1) is:',
    options: [
      { label: 'A', text: 'log x', isCorrect: true },
      { label: 'B', text: 'x log x', isCorrect: false },
      { label: 'C', text: 'e^x', isCorrect: false },
      { label: 'D', text: '1 / x', isCorrect: false },
    ],
  },
  {
    id: 'nta_q_11',
    number: 11,
    subject: 'Mathematics',
    chapter: 'Vectors & 3D Geometry',
    positiveMarks: 4,
    negativeMarks: 1,
    prompt:
      'If a, b, c are mutually perpendicular unit vectors in R³, then the magnitude of |2a + 3b + 6c| is equal to:',
    options: [
      { label: 'A', text: '7', isCorrect: true },
      { label: 'B', text: '11', isCorrect: false },
      { label: 'C', text: '√11', isCorrect: false },
      { label: 'D', text: '49', isCorrect: false },
    ],
  },
  {
    id: 'nta_q_12',
    number: 12,
    subject: 'Mathematics',
    chapter: 'Matrices & Determinants',
    positiveMarks: 4,
    negativeMarks: 1,
    prompt:
      'If A is a 3 × 3 non-singular matrix such that |A| = 5, then the determinant of adj(adj A) is equal to:',
    options: [
      { label: 'A', text: '625', isCorrect: true },
      { label: 'B', text: '125', isCorrect: false },
      { label: 'C', text: '25', isCorrect: false },
      { label: 'D', text: '3125', isCorrect: false },
    ],
  },
];

interface CbtExamAttemptPageProps {
  examId?: string;
}

export const CbtExamAttemptPage: React.FC<CbtExamAttemptPageProps> = ({
  examId = 'exm_jee_mock_01',
}) => {
  const { navigate } = useLms();

  const examCode =
    examId === 'exm_neet_mock_02' ? 'NTA-NEET-PART-07' : 'NTA-JEE-MOCK-04';

  const [questionStatuses, setQuestionStatuses] = useState<
    Record<string, NtaQuestionStatus>
  >({
    nta_q_01: 'ANSWERED',
    nta_q_02: 'ANSWERED',
    nta_q_03: 'NOT_ANSWERED',
    nta_q_04: 'MARKED_FOR_REVIEW',
    nta_q_05: 'ANSWERED',
    nta_q_06: 'NOT_VISITED',
    nta_q_07: 'NOT_VISITED',
    nta_q_08: 'NOT_VISITED',
    nta_q_09: 'NOT_VISITED',
    nta_q_10: 'NOT_VISITED',
    nta_q_11: 'NOT_VISITED',
    nta_q_12: 'NOT_VISITED',
  });

  const [savedOptions, setSavedOptions] = useState<
    Record<string, 'A' | 'B' | 'C' | 'D'>
  >({
    nta_q_01: 'A',
    nta_q_02: 'A',
    nta_q_04: 'A',
    nta_q_05: 'A',
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [draftOption, setDraftOption] = useState<'A' | 'B' | 'C' | 'D' | null>('A');
  const [remainingSeconds, setRemainingSeconds] = useState<number>(179 * 60 + 42);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isAutoSubmitted, setIsAutoSubmitted] = useState<boolean>(false);
  const [autoSubmitNotice, setAutoSubmitNotice] = useState<string | null>(null);

  const currentQuestion = NTA_CBT_QUESTIONS[currentIndex];

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  useEffect(() => {
    const expiryCheck = resolveCbtTimerExpiry(
      remainingSeconds,
      isSubmitted,
      examCode
    );

    if (expiryCheck.shouldAutoSubmit) {
      if (draftOption) {
        const activeId = NTA_CBT_QUESTIONS[currentIndex].id;
        setSavedOptions((prev) => ({ ...prev, [activeId]: draftOption }));
        setQuestionStatuses((prev) => ({ ...prev, [activeId]: 'ANSWERED' }));
      }
      setIsSubmitted(true);
      setIsAutoSubmitted(true);
      setAutoSubmitNotice(expiryCheck.notificationMessage);
    }
  }, [remainingSeconds, isSubmitted, examCode, draftOption, currentIndex]);

  const formatCountdown = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(
      secs
    ).padStart(2, '0')}`;
  };

  const jumpToQuestion = (targetIdx: number) => {
    const targetQ = NTA_CBT_QUESTIONS[targetIdx];
    setCurrentIndex(targetIdx);
    setDraftOption(savedOptions[targetQ.id] || null);
    setQuestionStatuses((prev) => {
      if (prev[targetQ.id] === 'NOT_VISITED') {
        return { ...prev, [targetQ.id]: 'NOT_ANSWERED' };
      }
      return prev;
    });
  };

  const handleSaveAndNext = () => {
    const qId = currentQuestion.id;
    if (draftOption) {
      setSavedOptions((prev) => ({ ...prev, [qId]: draftOption }));
      setQuestionStatuses((prev) => ({ ...prev, [qId]: 'ANSWERED' }));
    } else {
      setQuestionStatuses((prev) => ({ ...prev, [qId]: 'NOT_ANSWERED' }));
    }
    const nextIdx = (currentIndex + 1) % NTA_CBT_QUESTIONS.length;
    jumpToQuestion(nextIdx);
  };

  const handleClearResponse = () => {
    const qId = currentQuestion.id;
    setDraftOption(null);
    setSavedOptions((prev) => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
    setQuestionStatuses((prev) => ({ ...prev, [qId]: 'NOT_ANSWERED' }));
  };

  const handleMarkForReviewAndNext = () => {
    const qId = currentQuestion.id;
    if (draftOption) {
      setSavedOptions((prev) => ({ ...prev, [qId]: draftOption }));
    }
    setQuestionStatuses((prev) => ({ ...prev, [qId]: 'MARKED_FOR_REVIEW' }));
    const nextIdx = (currentIndex + 1) % NTA_CBT_QUESTIONS.length;
    jumpToQuestion(nextIdx);
  };

  const handleManualSubmit = () => {
    setIsAutoSubmitted(false);
    setAutoSubmitNotice(null);
    setIsSubmitted(true);
  };

  const paletteSummary = useMemo(() => {
    const counts = {
      ANSWERED: 0,
      NOT_ANSWERED: 0,
      MARKED_FOR_REVIEW: 0,
      NOT_VISITED: 0,
    };
    NTA_CBT_QUESTIONS.forEach((q) => {
      const st = questionStatuses[q.id] || 'NOT_VISITED';
      counts[st] += 1;
    });
    return counts;
  }, [questionStatuses]);

  const evaluationSummary = useMemo(() => {
    let score = 0;
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    NTA_CBT_QUESTIONS.forEach((q) => {
      const chosen = savedOptions[q.id];
      if (!chosen) {
        unattempted += 1;
      } else {
        const opt = q.options.find((o) => o.label === chosen);
        if (opt?.isCorrect) {
          score += q.positiveMarks;
          correct += 1;
        } else {
          score -= q.negativeMarks;
          wrong += 1;
        }
      }
    });

    const maxScore = NTA_CBT_QUESTIONS.length * 4;
    const attempted = correct + wrong;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

    return { score, maxScore, correct, wrong, unattempted, accuracy };
  }, [savedOptions]);

  const getPaletteButtonClass = (qId: string, isCurrent: boolean) => {
    const status = questionStatuses[qId] || 'NOT_VISITED';
    const ringClass = isCurrent
      ? 'ring-2 ring-brand-champagne ring-offset-2 ring-offset-[#13161F]'
      : '';

    switch (status) {
      case 'ANSWERED':
        return `bg-emerald-600/20 text-emerald-400 border-emerald-500/60 hover:bg-emerald-600/30 ${ringClass}`;
      case 'NOT_ANSWERED':
        return `bg-red-600/20 text-red-400 border-red-500/60 hover:bg-red-600/30 ${ringClass}`;
      case 'MARKED_FOR_REVIEW':
        return `bg-purple-600/25 text-purple-300 border-brand-champagne hover:bg-purple-600/35 ${ringClass}`;
      case 'NOT_VISITED':
      default:
        return `bg-[#0A0B0E] text-[#9CA3AF] border-[#232734] hover:text-[#F3F4F6] ${ringClass}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#F3F4F6] flex flex-col overflow-x-hidden">
      {/* Floating Auto-Submission Notification Toast */}
      {autoSubmitNotice && (
        <div
          role="alert"
          className="fixed bottom-5 right-5 z-50 max-w-md bg-[#13161F] border border-brand-champagne rounded-lg px-4 py-3.5 shadow-2xl flex items-start gap-3"
        >
          <BellRing className="w-4 h-4 text-brand-champagne shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs font-semibold text-brand-champagne">
              Automatic CBT Submission Triggered
            </p>
            <p className="text-xs text-[#F3F4F6] leading-relaxed">
              {autoSubmitNotice}
            </p>
          </div>
        </div>
      )}

      {/* TOP HEADER: Exam Title, Student Roll Number & Monospace Countdown Timer */}
      <header className="sticky top-0 z-30 bg-[#11131A] border-b border-[#232734] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <button
            type="button"
            onClick={() => navigate('/dashboard/student')}
            className="px-3 py-1.5 rounded-md bg-[#0A0B0E] hover:bg-[#191D28] border border-[#232734] text-xs font-medium text-[#9CA3AF] hover:text-[#F3F4F6] inline-flex items-center gap-1.5 transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-brand-champagne" />
            <span>← Back</span>
          </button>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#9CA3AF]">
              <span className="font-mono text-brand-champagne font-semibold">
                {examCode}
              </span>
              <span>•</span>
              <span className="font-mono text-[#3B82F6]">
                Roll No: KA-SBO-26-0142
              </span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Candidate: Kavin Rajan</span>
            </div>
            <h1 className="text-sm sm:text-base font-semibold text-[#F3F4F6] truncate">
              All-Academy JEE Main Full Syllabus CBT Mock Test #04
            </h1>
          </div>
        </div>

        {/* Right Header Controls: Subject Section Tabs + Monospace Countdown Timer */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-1.5 bg-[#0A0B0E] p-1 rounded-md border border-[#232734]">
            {(
              [
                { label: 'Physics', startIdx: 0 },
                { label: 'Chemistry', startIdx: 4 },
                { label: 'Mathematics', startIdx: 8 },
              ] as const
            ).map((sec) => {
              const isCurrentSubject = currentQuestion.subject === sec.label;
              return (
                <button
                  key={sec.label}
                  type="button"
                  onClick={() => jumpToQuestion(sec.startIdx)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                    isCurrentSubject
                      ? 'bg-brand-champagne text-[#0A0B0E]'
                      : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </div>

          {!isSubmitted && (
            <button
              type="button"
              onClick={() => setRemainingSeconds(3)}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#0A0B0E] hover:bg-[#191D28] border border-[#232734] hover:border-brand-champagne font-mono text-[11px] text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
              title="Set timer to 3 seconds to test automatic expiry submission"
            >
              <span>Test 3s Expiry</span>
            </button>
          )}

          <div
            className={`px-4 py-2 rounded-md bg-[#0A0B0E] border flex items-center gap-2.5 ${
              remainingSeconds <= 10
                ? 'border-brand-champagne animate-pulse'
                : 'border-[#232734]'
            }`}
            aria-label="Exam Countdown Timer"
          >
            <Clock className="w-4 h-4 text-brand-champagne" />
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF] block leading-none">
                Time Left
              </span>
              <span
                className={`font-mono text-sm sm:text-base font-semibold ${
                  remainingSeconds === 0 ? 'text-brand-champagne' : 'text-[#F3F4F6]'
                }`}
              >
                {formatCountdown(remainingSeconds)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN 70% / 30% NTA CBT EXAM WORKSPACE */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-8 py-6 flex flex-col lg:flex-row gap-6">
        {/* LEFT COLUMN (70%): Active Question Display & NTA Action Bar */}
        <main className="w-full lg:w-[70%] bg-[#13161F] border border-[#232734] rounded-lg p-6 sm:p-8 flex flex-col justify-between space-y-6 min-w-0">
          {isSubmitted ? (
            /* Post-Submission NTA Performance Scorecard */
            <div className="my-auto space-y-6 py-4">
              {isAutoSubmitted && (
                <div
                  role="status"
                  className="bg-[#0A0B0E] border border-brand-champagne rounded-lg p-4 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-brand-champagne shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-champagne">
                      Automatic Timer Expiry Submission (00:00:00)
                    </p>
                    <p className="text-xs text-[#F3F4F6] leading-relaxed">
                      The allotted examination time reached zero. Your saved MCQ responses and active draft selection were automatically locked and submitted to the NTA CBT server.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pb-5 border-b border-[#232734]">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-champagne">
                    <CheckCircle2 className="w-4 h-4" />
                    {isAutoSubmitted
                      ? 'Auto-Submitted CBT Record'
                      : 'Manual CBT Submission Recorded'}
                  </span>
                  <h2 className="text-2xl font-semibold text-[#F3F4F6]">
                    Instant CBT Telemetry & Score Breakdown
                  </h2>
                </div>
                <span className="font-mono text-xs px-3 py-1.5 rounded bg-[#0A0B0E] border border-[#232734] text-[#3B82F6]">
                  Roll: KA-SBO-26-0142
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#0A0B0E] border border-[#232734] rounded-lg p-4">
                  <p className="text-xs text-[#9CA3AF]">Net Score (+4 / -1)</p>
                  <p className="font-mono text-2xl font-semibold text-brand-champagne mt-1">
                    {evaluationSummary.score} / {evaluationSummary.maxScore}
                  </p>
                </div>
                <div className="bg-[#0A0B0E] border border-[#232734] rounded-lg p-4">
                  <p className="text-xs text-[#9CA3AF]">Accuracy</p>
                  <p className="font-mono text-2xl font-semibold text-[#F3F4F6] mt-1">
                    {evaluationSummary.accuracy}%
                  </p>
                </div>
                <div className="bg-[#0A0B0E] border border-[#232734] rounded-lg p-4">
                  <p className="text-xs text-[#9CA3AF]">Correct Answers</p>
                  <p className="font-mono text-2xl font-semibold text-[#F3F4F6] mt-1">
                    {evaluationSummary.correct}
                  </p>
                </div>
                <div className="bg-[#0A0B0E] border border-[#232734] rounded-lg p-4">
                  <p className="text-xs text-[#9CA3AF]">Incorrect / Unattempted</p>
                  <p className="font-mono text-lg font-semibold text-[#9CA3AF] mt-1.5">
                    {evaluationSummary.wrong} Wrong · {evaluationSummary.unattempted} Skipped
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#232734]">
                <button
                  type="button"
                  onClick={() => {
                    setRemainingSeconds(180 * 60);
                    setIsSubmitted(false);
                    setIsAutoSubmitted(false);
                    setAutoSubmitNotice(null);
                  }}
                  className="px-4 py-2.5 rounded-md bg-[#0A0B0E] border border-[#232734] text-xs font-medium text-[#F3F4F6] hover:border-brand-champagne"
                >
                  Reset Timer & Review Questions
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard/student')}
                  className="px-5 py-2.5 rounded-md bg-brand-champagne hover:bg-[#F1C48F] text-[#0A0B0E] text-xs font-semibold"
                >
                  Return to Student Dashboard
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Active Question Header & Stem */}
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#232734]">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-xs font-semibold px-3 py-1 rounded-md bg-brand-champagne text-[#0A0B0E]">
                      Question {String(currentQuestion.number).padStart(2, '0')} of{' '}
                      {NTA_CBT_QUESTIONS.length}
                    </span>
                    <span className="text-xs font-medium text-[#F3F4F6] px-2.5 py-1 rounded bg-[#0A0B0E] border border-[#232734]">
                      {currentQuestion.subject}
                    </span>
                    <span className="text-xs text-[#9CA3AF]">
                      {currentQuestion.chapter}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded bg-[#0A0B0E] text-[#F3F4F6] border border-[#232734]">
                      +{currentQuestion.positiveMarks} Correct
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#0A0B0E] text-brand-champagne border border-[#232734]">
                      -{currentQuestion.negativeMarks} Incorrect
                    </span>
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="bg-[#0A0B0E] border border-[#232734] rounded-lg p-5 sm:p-6">
                  <p className="text-base sm:text-lg text-[#F3F4F6] leading-relaxed font-normal">
                    {currentQuestion.prompt}
                  </p>
                </div>

                {/* 4 Clickable Options (A, B, C, D) */}
                <div
                  className="space-y-3"
                  role="radiogroup"
                  aria-label="Question Options"
                >
                  {currentQuestion.options.map((opt) => {
                    const isSelected = draftOption === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setDraftOption(opt.label)}
                        className={`w-full text-left p-4 rounded-lg border transition-colors flex items-center gap-4 ${
                          isSelected
                            ? 'bg-brand-champagne/15 border-brand-champagne text-[#F3F4F6]'
                            : 'bg-[#0A0B0E] border-[#232734] text-[#9CA3AF] hover:text-[#F3F4F6] hover:border-[#374151]'
                        }`}
                      >
                        <span
                          className={`w-8 h-8 rounded-md font-mono text-xs font-semibold flex items-center justify-center border shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-brand-champagne text-[#0A0B0E] border-brand-champagne'
                              : 'bg-[#13161F] text-[#9CA3AF] border-[#232734]'
                          }`}
                        >
                          {opt.label}
                        </span>
                        <span className="text-sm sm:text-base font-medium">
                          {opt.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom NTA Action Buttons */}
              <div className="pt-5 border-t border-[#232734] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleMarkForReviewAndNext}
                    className="px-4 py-2.5 rounded-md bg-[#0A0B0E] hover:bg-[#191D28] text-[#F3F4F6] border border-brand-champagne/60 text-xs font-medium inline-flex items-center gap-2 transition-colors"
                  >
                    <Flag className="w-3.5 h-3.5 text-brand-champagne" />
                    <span>Mark for Review & Next</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearResponse}
                    className="px-4 py-2.5 rounded-md bg-[#0A0B0E] hover:bg-[#191D28] text-[#9CA3AF] hover:text-[#F3F4F6] border border-[#232734] text-xs font-medium inline-flex items-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear Response</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSaveAndNext}
                  className="px-6 py-2.5 rounded-md bg-brand-champagne hover:bg-[#F1C48F] text-[#0A0B0E] text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-lg"
                >
                  <span>Save & Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </main>

        {/* RIGHT COLUMN (30%): NTA-Style Question Palette & Final Submit Exam Button */}
        <aside className="w-full lg:w-[30%] bg-[#13161F] border border-[#232734] rounded-lg p-6 flex flex-col justify-between space-y-6 shrink-0">
          <div className="space-y-5">
            {/* Candidate Roll Card */}
            <div className="bg-[#0A0B0E] border border-[#232734] rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#F3F4F6]">Kavin Rajan</p>
                <p className="font-mono text-[11px] text-[#3B82F6] mt-0.5">
                  Roll: KA-SBO-26-0142
                </p>
              </div>
              <span className="font-mono text-[11px] text-brand-champagne px-2.5 py-1 rounded bg-[#13161F] border border-[#232734]">
                SBO-JEE-2027-A
              </span>
            </div>

            {/* NTA Status Color Legend */}
            <div className="space-y-2.5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                NTA Question Palette Legend
              </h2>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-2.5 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-emerald-500/40 border border-emerald-500" />
                    <span className="text-[#F3F4F6]">Answered</span>
                  </span>
                  <span className="font-mono font-semibold text-emerald-400">
                    {paletteSummary.ANSWERED}
                  </span>
                </div>

                <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-2.5 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-red-500/40 border border-red-500" />
                    <span className="text-[#F3F4F6]">Not Answered</span>
                  </span>
                  <span className="font-mono font-semibold text-red-400">
                    {paletteSummary.NOT_ANSWERED}
                  </span>
                </div>

                <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-2.5 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-[#13161F] border border-[#374151]" />
                    <span className="text-[#9CA3AF]">Not Visited</span>
                  </span>
                  <span className="font-mono font-semibold text-[#9CA3AF]">
                    {paletteSummary.NOT_VISITED}
                  </span>
                </div>

                <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-2.5 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-purple-600/40 border border-brand-champagne" />
                    <span className="text-[#F3F4F6]">Marked Review</span>
                  </span>
                  <span className="font-mono font-semibold text-purple-300">
                    {paletteSummary.MARKED_FOR_REVIEW}
                  </span>
                </div>
              </div>
            </div>

            {/* Numbered Question Grid */}
            <div className="space-y-3 pt-2 border-t border-[#232734]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#F3F4F6]">
                  Question Navigation Grid
                </span>
                <span className="font-mono text-[11px] text-[#9CA3AF]">
                  Q01 – Q{NTA_CBT_QUESTIONS.length}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {NTA_CBT_QUESTIONS.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => jumpToQuestion(idx)}
                      className={`h-11 rounded-md font-mono text-xs font-semibold border transition-all flex items-center justify-center disabled:opacity-60 ${getPaletteButtonClass(
                        q.id,
                        isCurrent
                      )}`}
                    >
                      {String(q.number).padStart(2, '0')}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Final Submit Exam Button at Bottom of Palette */}
          <div className="pt-5 border-t border-[#232734] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
              <span>Total Attempted</span>
              <span className="font-mono text-[#F3F4F6]">
                {Object.keys(savedOptions).length} / {NTA_CBT_QUESTIONS.length} Questions
              </span>
            </div>

            <button
              type="button"
              disabled={isSubmitted}
              onClick={handleManualSubmit}
              className="w-full py-3 rounded-md bg-brand-champagne hover:bg-[#F1C48F] disabled:opacity-50 text-[#0A0B0E] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitted ? 'Examination Submitted' : 'Submit Exam'}</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CbtExamAttemptPage;
