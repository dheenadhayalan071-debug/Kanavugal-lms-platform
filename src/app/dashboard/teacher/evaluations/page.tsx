import React, { useState } from 'react';
import { CheckSquare, Send, CheckCircle2 } from 'lucide-react';

interface PendingEvaluationRow {
  id: string;
  examCode: string;
  examTitle: string;
  studentName: string;
  rollNumber: string;
  batchCode: string;
  submittedAgo: string;
  questionPrompt: string;
  studentDerivation: string;
  maxMarks: number;
  awardedMarks: number | null;
  status: 'PENDING' | 'GRADED';
}

const INITIAL_EVALUATIONS: PendingEvaluationRow[] = [
  {
    id: 'eval_01',
    examCode: 'CBSE-12-PHY-TERM1',
    examTitle: 'CBSE Class 12 Physics Mid-Term Descriptive Assessment',
    studentName: 'Kavin Rajan',
    rollNumber: 'KA-SBO-26-0142',
    batchCode: 'SBO-JEE-2027-A',
    submittedAgo: '2 hours ago',
    questionPrompt:
      'Q14 (5 Marks): Using Gauss’s Law, derive the expression for electric field intensity due to an infinitely long straight uniformly charged wire.',
    studentDerivation:
      'Constructed cylindrical Gaussian surface of radius r and length l coaxial with the wire. Flux Φ = E(2πrl) = q_in / ε₀ = λl / ε₀ ⇒ E = λ / (2π ε₀ r) directed radially outward.',
    maxMarks: 5,
    awardedMarks: null,
    status: 'PENDING',
  },
  {
    id: 'eval_02',
    examCode: 'CBSE-12-PHY-TERM1',
    examTitle: 'CBSE Class 12 Physics Mid-Term Descriptive Assessment',
    studentName: 'Arjun Narayanan',
    rollNumber: 'KA-SBO-26-0158',
    batchCode: 'SBO-JEE-2027-A',
    submittedAgo: '4 hours ago',
    questionPrompt:
      'Q15 (5 Marks): State Biot-Savart Law in vector form and derive the magnetic field at a point on the axis of a circular current-carrying loop of radius R.',
    studentDerivation:
      'Applied dB = (μ₀ / 4π) (I dl × r̂) / r². Resolved dB into axial (dB sin φ) and perpendicular components. Integrated around 0 to 2πR to obtain B_x = μ₀ I R² / [2(x² + R²)^(3/2)].',
    maxMarks: 5,
    awardedMarks: null,
    status: 'PENDING',
  },
];

export const TeacherEvaluationsPage: React.FC = () => {
  const [evaluations, setEvaluations] =
    useState<PendingEvaluationRow[]>(INITIAL_EVALUATIONS);
  const [marksInput, setMarksInput] = useState<Record<string, string>>({
    eval_01: '5',
    eval_02: '4.5',
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleGradeSubmission = (id: string, maxMarks: number) => {
    const raw = parseFloat(marksInput[id] || String(maxMarks));
    const clamped = Number.isNaN(raw)
      ? maxMarks
      : Math.min(maxMarks, Math.max(0, raw));
    setEvaluations((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, awardedMarks: clamped, status: 'GRADED' }
          : item
      )
    );
    triggerToast(
      `Awarded ${clamped}/${maxMarks} marks and published to Student & Parent transcripts.`
    );
  };

  const pendingCount = evaluations.filter((e) => e.status === 'PENDING').length;

  return (
    <div className="bg-[#0A0B0E] text-[#F3F4F6]">
      {toastMessage && (
        <div className="fixed bottom-8 right-6 z-50 max-w-md bg-[#13161F] border border-brand-champagne rounded-lg px-4 py-3 shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-brand-champagne shrink-0" />
          <p className="text-xs text-[#F3F4F6]">{toastMessage}</p>
        </div>
      )}

      <header className="px-6 lg:px-10 py-6 border-b border-[#232734] bg-[#11131A] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-brand-champagne font-medium">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Descriptive Script Grading Queue · /dashboard/teacher/evaluations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F4F6]">
            Exam Script Evaluations
          </h1>
          <p className="text-xs text-[#9CA3AF]">
            Isolated grading workspace for reviewing step-by-step student derivations and awarding marks
          </p>
        </div>

        <span className="font-mono text-xs px-3 py-1.5 rounded-md bg-[#13161F] border border-[#232734] text-brand-champagne">
          {pendingCount} Pending Scripts
        </span>
      </header>

      <div className="px-6 lg:px-10 py-8 space-y-4 max-w-7xl">
        {evaluations.map((item) => {
          const isGraded = item.status === 'GRADED';
          return (
            <div
              key={item.id}
              className="bg-[#13161F] border border-[#232734] rounded-lg p-6 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#0A0B0E] text-brand-champagne border border-[#232734]">
                    {item.examCode}
                  </span>
                  <span className="text-sm font-semibold text-[#F3F4F6]">
                    {item.studentName}
                  </span>
                  <span className="font-mono text-xs text-[#3B82F6]">
                    ({item.rollNumber} · {item.batchCode})
                  </span>
                </div>

                <span
                  className={`font-mono text-xs px-2.5 py-1 rounded border ${
                    isGraded
                      ? 'bg-[#0A0B0E] text-brand-champagne border-brand-champagne'
                      : 'bg-[#0A0B0E] text-[#9CA3AF] border-[#232734]'
                  }`}
                >
                  {isGraded
                    ? `Graded: ${item.awardedMarks} / ${item.maxMarks}`
                    : `Pending · Max ${item.maxMarks} Marks`}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-[#F3F4F6]">
                  {item.questionPrompt}
                </p>
                <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-3.5">
                  <p className="text-[11px] font-mono text-[#9CA3AF] mb-1">
                    Submitted Student Derivation ({item.submittedAgo}):
                  </p>
                  <p className="text-xs text-[#F3F4F6] leading-relaxed">
                    {item.studentDerivation}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#232734] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-[#9CA3AF]">{item.examTitle}</span>

                <div className="flex items-center gap-2.5">
                  <label className="text-xs text-[#9CA3AF]">Award Marks:</label>
                  <input
                    type="number"
                    step="0.5"
                    min={0}
                    max={item.maxMarks}
                    disabled={isGraded}
                    value={marksInput[item.id] ?? ''}
                    onChange={(e) =>
                      setMarksInput((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                    className="w-20 bg-[#0A0B0E] border border-[#232734] rounded-md px-2.5 py-1.5 text-xs font-mono text-[#F3F4F6] focus:outline-none focus:border-brand-champagne"
                  />
                  <span className="font-mono text-xs text-[#9CA3AF]">
                    / {item.maxMarks}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleGradeSubmission(item.id, item.maxMarks)}
                    disabled={isGraded}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${
                      isGraded
                        ? 'bg-[#0A0B0E] text-[#9CA3AF] border border-[#232734] cursor-default'
                        : 'bg-brand-champagne hover:bg-[#F1C48F] text-[#0A0B0E]'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {isGraded ? 'Marks Published' : 'Approve & Grade'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeacherEvaluationsPage;
