import React, { useState } from 'react';
import { FilePlus2, Upload, Plus, CheckCircle2, Award } from 'lucide-react';

interface CreatedCbtExam {
  id: string;
  code: string;
  title: string;
  batchCode: string;
  durationMinutes: number;
  positiveMarks: number;
  negativeMarks: number;
  questionCount: number;
  questionPaperPdf: string;
  resultsReleased: boolean;
}

const INITIAL_CBT_EXAMS: CreatedCbtExam[] = [
  {
    id: 'exm_jee_mock_01',
    code: 'NTA-JEE-MOCK-04',
    title: 'All-Academy JEE Main Full Syllabus CBT Mock Test #04',
    batchCode: 'SBO-JEE-2027-A',
    durationMinutes: 180,
    positiveMarks: 4,
    negativeMarks: 1,
    questionCount: 75,
    questionPaperPdf: 'NTA_JEE_Mock_04_Master_Paper.pdf',
    resultsReleased: true,
  },
  {
    id: 'exm_neet_mock_02',
    code: 'NTA-NEET-PART-07',
    title: 'NEET UG Grand Test #07 — Electrostatics & Genetics',
    batchCode: 'SBO-NEET-2027-B',
    durationMinutes: 200,
    positiveMarks: 4,
    negativeMarks: 1,
    questionCount: 180,
    questionPaperPdf: 'NEET_Grand_Test_07_Paper.pdf',
    resultsReleased: false,
  },
];

export const TeacherExamsPage: React.FC = () => {
  const [cbtExams, setCbtExams] = useState<CreatedCbtExam[]>(INITIAL_CBT_EXAMS);
  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamCode, setNewExamCode] = useState('NTA-JEE-MOCK-05');
  const [newExamBatch, setNewExamBatch] = useState('SBO-JEE-2027-A');
  const [newExamDuration, setNewExamDuration] = useState('180');
  const [newPositiveMarks, setNewPositiveMarks] = useState('4');
  const [newNegativeMarks, setNewNegativeMarks] = useState('1');
  const [questionPaperFile, setQuestionPaperFile] = useState(
    'JEE_Main_Unit_Test_05_Questions.pdf'
  );
  const [sampleQuestionPrompt, setSampleQuestionPrompt] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateCbtExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamTitle.trim()) return;
    const created: CreatedCbtExam = {
      id: `exm_${Date.now()}`,
      code: newExamCode.trim() || 'NTA-CBT-NEW',
      title: newExamTitle.trim(),
      batchCode: newExamBatch,
      durationMinutes: Number(newExamDuration) || 180,
      positiveMarks: Number(newPositiveMarks) || 4,
      negativeMarks: Number(newNegativeMarks) || 1,
      questionCount: 75,
      questionPaperPdf: questionPaperFile || 'Uploaded_Question_Paper.pdf',
      resultsReleased: false,
    };
    setCbtExams((prev) => [created, ...prev]);
    setNewExamTitle('');
    setSampleQuestionPrompt('');
    triggerToast(
      `Created CBT Exam "${created.code}" (+${created.positiveMarks} / -${created.negativeMarks}) for ${created.batchCode}.`
    );
  };

  const handleToggleReleaseResults = (examId: string, code: string) => {
    setCbtExams((prev) =>
      prev.map((ex) => {
        if (ex.id !== examId) return ex;
        const nextVal = !ex.resultsReleased;
        triggerToast(
          nextVal
            ? `Released "${code}" results to Student & Parent dashboards.`
            : `Withheld "${code}" results from Student & Parent dashboards.`
        );
        return { ...ex, resultsReleased: nextVal };
      })
    );
  };

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
            <Award className="w-3.5 h-3.5" />
            <span>NTA CBT Authoring Engine · /dashboard/teacher/exams</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F3EF]">
            Examination Studio
          </h1>
          <p className="text-xs text-[#A1A1AA]">
            Create timed CBT examinations, configure +4 / -1 marking schemes, upload Question Paper PDFs, and release results
          </p>
        </div>
      </header>

      <div className="px-6 lg:px-10 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Create New CBT Exam Form */}
          <form
            onSubmit={handleCreateCbtExam}
            className="lg:col-span-6 bg-[#111111] border border-[#292929] rounded-lg p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#292929] pb-3">
              <div className="flex items-center gap-2">
                <FilePlus2 className="w-4 h-4 text-[#FF4B00]" />
                <h2 className="text-base font-semibold text-[#F5F3EF]">
                  Create New CBT Exam
                </h2>
              </div>
              <span className="font-mono text-xs text-[#FF4B00]">
                +4 / -1 Default
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs text-[#A1A1AA]">Exam Code</label>
                <input
                  type="text"
                  required
                  value={newExamCode}
                  onChange={(e) => setNewExamCode(e.target.value)}
                  className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2 text-xs font-mono text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs text-[#A1A1AA]">
                  Assign Batch
                </label>
                <select
                  value={newExamBatch}
                  onChange={(e) => setNewExamBatch(e.target.value)}
                  className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2 text-xs font-mono text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                >
                  <option value="SBO-JEE-2027-A">SBO-JEE-2027-A</option>
                  <option value="SBO-NEET-2027-B">SBO-NEET-2027-B</option>
                  <option value="ANA-CBSE-2027-A">ANA-CBSE-2027-A</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs text-[#A1A1AA]">
                Examination Title
              </label>
              <input
                type="text"
                required
                value={newExamTitle}
                onChange={(e) => setNewExamTitle(e.target.value)}
                placeholder="e.g., JEE Main & Advanced Unit Test #05 — Electrodynamics"
                className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2 text-xs text-[#F5F3EF] placeholder-[#A1A1AA] focus:outline-none focus:border-[#FF4B00]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="block text-xs text-[#A1A1AA]">
                  Duration (Mins)
                </label>
                <input
                  type="number"
                  required
                  value={newExamDuration}
                  onChange={(e) => setNewExamDuration(e.target.value)}
                  className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2 text-xs font-mono text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs text-[#A1A1AA]">
                  Correct Marks (+)
                </label>
                <input
                  type="number"
                  step="0.5"
                  required
                  value={newPositiveMarks}
                  onChange={(e) => setNewPositiveMarks(e.target.value)}
                  className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2 text-xs font-mono text-[#FF4B00] focus:outline-none focus:border-[#FF4B00]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs text-[#A1A1AA]">
                  Negative Marks (-)
                </label>
                <input
                  type="number"
                  step="0.25"
                  required
                  value={newNegativeMarks}
                  onChange={(e) => setNewNegativeMarks(e.target.value)}
                  className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2 text-xs font-mono text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                />
              </div>
            </div>

            <div className="bg-[#080808] border border-[#292929] rounded-md p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#F5F3EF]">
                  Question Paper (PDF) & Question Bank Builder
                </span>
                <span className="font-mono text-[11px] text-[#A1A1AA]">
                  Supabase Storage
                </span>
              </div>

              <div className="space-y-2.5">
                <input
                  type="text"
                  value={questionPaperFile}
                  onChange={(e) => setQuestionPaperFile(e.target.value)}
                  placeholder="Question_Paper_Filename.pdf"
                  className="w-full bg-[#111111] border border-[#292929] rounded-md px-3 py-2 text-xs font-mono text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                />
                <button
                  type="button"
                  onClick={() =>
                    triggerToast(
                      `Attached Question Paper PDF (${questionPaperFile}) and added to Question Bank.`
                    )
                  }
                  className="w-full px-3.5 py-2 rounded-md bg-[#111111] hover:bg-[#181818] text-[#F5F3EF] border border-[#FF4B00] text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-[#FF4B00]" />
                  <span>Upload Question Paper (PDF) / Add Questions</span>
                </button>
              </div>

              <input
                type="text"
                value={sampleQuestionPrompt}
                onChange={(e) => setSampleQuestionPrompt(e.target.value)}
                placeholder="Optional: Quick-add MCQ stem (e.g., Magnetic field at center of current loop...)"
                className="w-full bg-[#111111] border border-[#292929] rounded-md px-3 py-2 text-xs text-[#F5F3EF] placeholder-[#A1A1AA] focus:outline-none focus:border-[#FF4B00]"
              />
            </div>

            <div className="pt-1 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2.5 rounded-md bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New CBT Exam</span>
              </button>
            </div>
          </form>

          {/* Active CBT Exams & Result Release Control */}
          <div className="lg:col-span-6 bg-[#111111] border border-[#292929] rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#292929] pb-3">
              <h2 className="text-base font-semibold text-[#F5F3EF]">
                Configured CBT Examinations ({cbtExams.length})
              </h2>
              <span className="font-mono text-xs text-[#A1A1AA]">
                Teacher Result Control
              </span>
            </div>

            <div className="space-y-3">
              {cbtExams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-[#080808] border border-[#292929] rounded-md p-4 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#FF4B00] font-semibold">
                        {exam.code}
                      </span>
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#111111] border border-[#292929] text-[#A1A1AA]">
                        {exam.batchCode}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#F5F3EF] bg-[#111111] px-2.5 py-0.5 rounded border border-[#292929]">
                      +{exam.positiveMarks} / -{exam.negativeMarks} Marking
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-[#F5F3EF]">
                    {exam.title}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#292929] text-xs">
                    <span className="font-mono text-[11px] text-[#A1A1AA]">
                      {exam.durationMinutes} mins · {exam.questionPaperPdf}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        handleToggleReleaseResults(exam.id, exam.code)
                      }
                      className={`px-3 py-1.5 rounded-md font-medium transition-colors border ${
                        exam.resultsReleased
                          ? 'bg-[#FF4B00] text-[#F5F3EF] border-[#FF4B00]'
                          : 'bg-[#111111] text-[#A1A1AA] border-[#292929] hover:text-[#F5F3EF]'
                      }`}
                    >
                      {exam.resultsReleased
                        ? 'Results Released'
                        : 'Release Results'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherExamsPage;
