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
    <div className="bg-[#080808] text-[#F5F3EF]">
      {toastMessage && (
        <div className="fixed bottom-8 right-6 z-50 max-w-md bg-[#111111] border border-[#FF4B00] rounded-lg px-4 py-3 shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-[#FF4B00] shrink-0" />
          <p className="text-xs text-[#F5F3EF]">{toastMessage}</p>
        </div>
      )}

      <header className="px-6 lg:px-10 py-6 border-b border-[#292929] bg-[#080808] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#FF4B00] font-medium">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Descriptive Script Grading Queue · /dashboard/teacher/evaluations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F3EF]">
            Exam Script Evaluations
          </h1>
          <p className="text-xs text-[#A1A1AA]">
            Isolated grading workspace for reviewing step-by-step student derivations and awarding marks
          </p>
        </div>

        <span className="font-mono text-xs px-3 py-1.5 rounded-md bg-[#111111] border border-[#292929] text-[#FF4B00]">
          {pendingCount} Pending Scripts
        </span>
      </header>

      <div className="px-6 lg:px-10 py-8 space-y-4 max-w-7xl">
        {evaluations.map((item) => {
          const isGraded = item.status === 'GRADED';
          return (
            <div
              key={item.id}
              className="bg-[#111111] border border-[#292929] rounded-lg p-6 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#080808] text-[#FF4B00] border border-[#292929]">
                    {item.examCode}
                  </span>
                  <span className="text-sm font-semibold text-[#F5F3EF]">
                    {item.studentName}
                  </span>
                  <span className="font-mono text-xs text-[#A1A1AA]">
                    ({item.rollNumber} · {item.batchCode})
                  </span>
                </div>

                <span
                  className={`font-mono text-xs px-2.5 py-1 rounded border ${
                    isGraded
                      ? 'bg-[#080808] text-[#FF4B00] border-[#FF4B00]'
                      : 'bg-[#080808] text-[#A1A1AA] border-[#292929]'
                  }`}
                >
                  {isGraded
                    ? `Graded: ${item.awardedMarks} / ${item.maxMarks}`
                    : `Pending · Max ${item.maxMarks} Marks`}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-[#F5F3EF]">
                  {item.questionPrompt}
                </p>
                <div className="bg-[#080808] border border-[#292929] rounded-md p-3.5">
                  <p className="text-[11px] font-mono text-[#A1A1AA] mb-1">
                    Submitted Student Derivation ({item.submittedAgo}):
                  </p>
                  <p className="text-xs text-[#F5F3EF] leading-relaxed">
                    {item.studentDerivation}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#292929] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-[#A1A1AA]">{item.examTitle}</span>

                <div className="flex items-center gap-2.5">
                  <label className="text-xs text-[#A1A1AA]">Award Marks:</label>
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
                    className="w-20 bg-[#080808] border border-[#292929] rounded-md px-2.5 py-1.5 text-xs font-mono text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                  />
                  <span className="font-mono text-xs text-[#A1A1AA]">
                    / {item.maxMarks}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleGradeSubmission(item.id, item.maxMarks)}
                    disabled={isGraded}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-medium inline-flex items-center gap-1.5 transition-colors ${
                      isGraded
                        ? 'bg-[#080808] text-[#A1A1AA] border border-[#292929] cursor-default'
                        : 'bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF]'
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
