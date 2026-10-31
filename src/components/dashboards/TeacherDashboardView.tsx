import React, { useState } from 'react';
import {
  CheckCircle2,
  FilePlus,
  Lock,
  Plus,
  Radio,
  Unlock,
  Upload,
  Users,
  BarChart3,
  BookOpen,
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';
import {
  AcademicProgramme,
  QuestionBankScope,
  QuestionType,
  VideoSourceType,
} from '../../types/prisma';

export type TeacherTab =
  | 'exam_studio'
  | 'batches'
  | 'upload'
  | 'live_schedule'
  | 'analytics';

export const TeacherDashboardView: React.FC<{
  activeTab: TeacherTab;
  setActiveTab: (tab: TeacherTab) => void;
}> = ({ activeTab }) => {
  const {
    currentUser,
    batches,
    courses,
    modules,
    questions,
    exams,
    submissions,
    liveClasses,
    addQuestionToBank,
    createExamInStudio,
    toggleExamResultRelease,
    evaluateDescriptiveSubmission,
    uploadCourseModule,
    scheduleLiveClass,
    navigate,
  } = useLms();

  // Question Bank Filter & Creation State
  const [bankFilter, setBankFilter] = useState<'ALL' | QuestionBankScope>('ALL');
  const [qPrompt, setQPrompt] = useState<string>('');
  const [qSubject, setQSubject] = useState<
    'Physics' | 'Chemistry' | 'Biology' | 'Mathematics'
  >('Physics');
  const [qChapter, setQChapter] = useState<string>('Electromagnetic Induction');
  const [qProgramme, setQProgramme] =
    useState<AcademicProgramme>('JEE Preparation');
  const [qType, setQType] = useState<QuestionType>('MCQ');
  const [qScope, setQScope] = useState<QuestionBankScope>('SHARED_ACADEMY');
  const [qOptions, setQOptions] = useState<string[]>([
    'B * L * v',
    'B * L / v',
    'Zero',
    '2 * B * L * v',
  ]);
  const [qPositive, setQPositive] = useState<number>(4);
  const [qNegative, setQNegative] = useState<number>(1);
  const [questionSavedToast, setQuestionSavedToast] = useState<boolean>(false);

  // Create Examination State
  const [examTitle, setExamTitle] = useState<string>(
    'JEE & Class 12 Electrostatics + Calculus Unit Test'
  );
  const [examProgramme, setExamProgramme] =
    useState<AcademicProgramme>('JEE Preparation');
  const [examBatchId, setExamBatchId] = useState<string>(batches[0].id);
  const [examDuration, setExamDuration] = useState<number>(60);
  const [examDate, setExamDate] = useState<string>('05 Nov 2026 · 18:00 IST');
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([
    'q_jee_01',
    'q_jee_02',
    'q_jee_04',
  ]);
  const [examCreatedBanner, setExamCreatedBanner] = useState<boolean>(false);

  // Upload Material State
  const [uploadCourseId, setUploadCourseId] = useState<string>(courses[0].id);
  const [uploadTitle, setUploadTitle] = useState<string>(
    'Alternating Current & LCR Phasor Resonance'
  );
  const [uploadSourceType, setUploadSourceType] =
    useState<VideoSourceType>('YOUTUBE_UNLISTED');
  const [uploadVideoUrl, setUploadVideoUrl] = useState<string>(
    'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0'
  );
  const [uploadPdfTitle, setUploadPdfTitle] = useState<string>(
    'LCR_Phasor_Resonance_Problems.pdf'
  );
  const [uploadContent, setUploadContent] = useState<string>(
    'Derivation of impedance Z and quality factor Q in series LCR circuits with Supabase Storage PDF practice problems.'
  );
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  // Schedule Live Class State
  const [liveTitle, setLiveTitle] = useState<string>(
    'NEET & JEE Organic Chemistry: Aldol & Cannizzaro Mechanisms'
  );
  const [liveSubject, setLiveSubject] = useState<string>('Chemistry');
  const [liveBatchId, setLiveBatchId] = useState<string>(batches[0].id);
  const [liveTime, setLiveTime] = useState<string>('03 Nov 2026 · 18:30 IST');

  const visibleQuestions =
    bankFilter === 'ALL'
      ? questions
      : questions.filter((q) => q.scope === bankFilter);

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qPrompt.trim()) return;
    addQuestionToBank({
      programme: qProgramme,
      subject: qSubject,
      chapter: qChapter.trim() || 'Core Topic',
      type: qType,
      scope: qScope,
      authorId: currentUser.id,
      authorName: currentUser.name,
      prompt: qPrompt.trim(),
      options: qType === 'MCQ' ? qOptions : [],
      correctOptionIndex: qType === 'MCQ' ? 0 : undefined,
      positiveMarks: qPositive,
      negativeMarks: qType === 'MCQ' ? qNegative : 0,
      recommendedTimeSeconds: 75,
    });
    setQPrompt('');
    setQuestionSavedToast(true);
    setTimeout(() => setQuestionSavedToast(false), 2500);
  };

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTitle.trim() || selectedQuestionIds.length === 0) return;
    const targetBatch =
      batches.find((b) => b.id === examBatchId) ?? batches[0];
    const totalMarks = questions
      .filter((q) => selectedQuestionIds.includes(q.id))
      .reduce((sum, q) => sum + q.positiveMarks, 0);

    createExamInStudio({
      title: examTitle.trim(),
      programme: examProgramme,
      examType: 'TIMED_TOPIC_EXAM',
      subjects: ['Physics', 'Mathematics'],
      batchId: targetBatch.id,
      batchName: targetBatch.name,
      branchCode: targetBatch.branchId === 'br_sbo' ? 'SBO' : 'ANAIYUR',
      durationMinutes: examDuration,
      scheduledDate: examDate,
      totalMarks,
      resultsReleased: false,
      questionIds: selectedQuestionIds,
      createdByTeacher: currentUser.name,
    });
    setExamCreatedBanner(true);
    setTimeout(() => setExamCreatedBanner(false), 3000);
  };

  const handleUploadModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;
    uploadCourseModule({
      courseId: uploadCourseId,
      title: uploadTitle.trim(),
      videoSourceType: uploadSourceType,
      videoUrl: uploadVideoUrl.trim(),
      pdfTitle: uploadPdfTitle.trim() || 'Lecture_Notes.pdf',
      content: uploadContent.trim(),
      durationMinutes: 45,
    });
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 2500);
  };

  const handleCreateLiveClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveTitle.trim()) return;
    const targetBatch = batches.find((b) => b.id === liveBatchId) ?? batches[0];
    scheduleLiveClass({
      title: liveTitle.trim(),
      programme: targetBatch.programme,
      subject: liveSubject,
      batchId: targetBatch.id,
      batchName: targetBatch.name,
      branchName: targetBatch.branchName,
      teacherName: currentUser.name,
      scheduledAt: liveTime,
      status: 'UPCOMING',
      attendeeCount: 45,
    });
    setLiveTitle('');
  };

  return (
    <div className="space-y-10">
      {/* 1. TEACHER EXAMINATION STUDIO & QUESTION BANK */}
      {activeTab === 'exam_studio' && (
        <section aria-label="Teacher Examination Studio" className="space-y-10">
          {/* Active Examinations & Manual Result Release Control */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-mono text-xs text-[#F2FF00]">
                  TEACHER EXAMINATION STUDIO · MANUAL RESULT PUBLICATION CONTROL
                </div>
                <h2 className="font-display text-2xl font-black text-[#E9E3D5] mt-1">
                  ACTIVE EXAMINATIONS &amp; RESULT RELEASE ({exams.length})
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-zinc-950 border-2 border-[#E9E3D5] p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 brutal-shadow-petrol"
                >
                  <div className="space-y-1.5">
                    <div className="font-mono text-xs flex flex-wrap items-center gap-2">
                      <span className="text-[#F2FF00] font-bold">
                        {exam.programme}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Batch: {exam.batchName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{exam.durationMinutes} Mins</span>
                      <span aria-hidden="true">·</span>
                      <span>Max Marks: {exam.totalMarks}</span>
                    </div>
                    <h3 className="font-display text-xl font-black text-[#E9E3D5]">
                      {exam.title}
                    </h3>
                    <div className="font-mono text-xs text-zinc-400">
                      Scheduled: {exam.scheduledDate} · Questions:{' '}
                      {exam.questionIds.length}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleExamResultRelease(exam.id)}
                      className={`px-5 py-3 font-mono text-xs font-bold border-2 flex items-center gap-2 transition-colors duration-75 rounded-none cursor-pointer ${
                        exam.resultsReleased
                          ? 'bg-[#173F46] text-[#F2FF00] border-[#F2FF00] hover:bg-[#0D0D0D]'
                          : 'bg-[#F2FF00] text-[#0D0D0D] border-[#E9E3D5] brutal-shadow-crimson hover:bg-[#FF0000] hover:text-[#E9E3D5]'
                      }`}
                    >
                      {exam.resultsReleased ? (
                        <>
                          <Unlock className="w-4 h-4" />
                          <span>Results Released (Click to Withhold)</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Release Results to Batch</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/exam/${exam.id}`)}
                      className="px-4 py-3 bg-[#0D0D0D] text-[#E9E3D5] font-mono text-xs font-bold border-2 border-zinc-700 hover:border-[#E9E3D5] rounded-none cursor-pointer"
                    >
                      Preview Exam UI
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Create New Examination + Add Question to Bank Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 6 cols: Create Examination Form */}
            <form
              onSubmit={handleCreateExam}
              className="lg:col-span-6 bg-zinc-950 border-2 border-[#E9E3D5] p-6 sm:p-8 space-y-5 brutal-shadow-yellow"
            >
              <div className="border-b-2 border-zinc-800 pb-3">
                <div className="font-mono text-xs text-[#F2FF00] font-bold">
                  STEP 1 · CONFIGURE TIMED EXAMINATION
                </div>
                <h3 className="font-display text-xl font-black text-[#E9E3D5] mt-1">
                  BUILD &amp; ASSIGN NEW BATCH EXAM
                </h3>
              </div>

              {examCreatedBanner && (
                <div className="p-3 bg-[#173F46] border border-[#F2FF00] font-mono text-xs text-[#F2FF00] font-bold">
                  ✓ Examination scheduled and assigned to batch.
                </div>
              )}

              <div>
                <label
                  htmlFor="exam-title-input"
                  className="block font-mono text-xs text-zinc-300 font-bold mb-1"
                >
                  EXAMINATION TITLE
                </label>
                <input
                  id="exam-title-input"
                  type="text"
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs focus:border-[#F2FF00] focus:outline-none rounded-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="exam-prog-select"
                    className="block font-mono text-xs text-zinc-300 font-bold mb-1"
                  >
                    PROGRAMME / CLASS
                  </label>
                  <select
                    id="exam-prog-select"
                    value={examProgramme}
                    onChange={(e) =>
                      setExamProgramme(e.target.value as AcademicProgramme)
                    }
                    className="w-full px-3 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                  >
                    <option value="JEE Preparation">JEE Preparation</option>
                    <option value="NEET Preparation">NEET Preparation</option>
                    <option value="Classes 11–12">Classes 11–12</option>
                    <option value="Classes 6–10">Classes 6–10</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="exam-batch-select"
                    className="block font-mono text-xs text-zinc-300 font-bold mb-1"
                  >
                    ASSIGN TO BATCH
                  </label>
                  <select
                    id="exam-batch-select"
                    value={examBatchId}
                    onChange={(e) => setExamBatchId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                  >
                    {batches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.branchName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="exam-duration-input"
                    className="block font-mono text-xs text-zinc-300 font-bold mb-1"
                  >
                    DURATION (MINUTES)
                  </label>
                  <input
                    id="exam-duration-input"
                    type="number"
                    min={10}
                    max={240}
                    value={examDuration}
                    onChange={(e) => setExamDuration(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="exam-date-input"
                    className="block font-mono text-xs text-zinc-300 font-bold mb-1"
                  >
                    SCHEDULED DATE &amp; TIME
                  </label>
                  <input
                    id="exam-date-input"
                    type="text"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#F2FF00] text-[#0D0D0D] font-mono text-xs font-bold border-2 border-[#E9E3D5] brutal-shadow-petrol hover:bg-[#173F46] hover:text-[#F2FF00] transition-colors duration-75 rounded-none cursor-pointer"
              >
                + Schedule Examination for Batch ({selectedQuestionIds.length}{' '}
                Questions Selected)
              </button>
            </form>

            {/* Right 6 cols: Contribute Question to Private or Shared Bank */}
            <form
              onSubmit={handleAddQuestion}
              className="lg:col-span-6 bg-zinc-950 border-2 border-[#E9E3D5] p-6 sm:p-8 space-y-4 brutal-shadow-petrol"
            >
              <div className="border-b-2 border-zinc-800 pb-3">
                <div className="font-mono text-xs text-[#F2FF00] font-bold">
                  HYBRID QUESTION BANK · PRIVATE TEACHER + SHARED ACADEMY
                </div>
                <h3 className="font-display text-xl font-black text-[#E9E3D5] mt-1">
                  AUTHOR NEW MCQ OR DESCRIPTIVE QUESTION
                </h3>
              </div>

              {questionSavedToast && (
                <div className="p-3 bg-[#173F46] border border-[#F2FF00] font-mono text-xs text-[#F2FF00] font-bold">
                  ✓ Question added to {qScope.replace('_', ' ')} bank.
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label
                    htmlFor="q-subject"
                    className="block font-mono text-[11px] text-zinc-400 mb-1"
                  >
                    SUBJECT
                  </label>
                  <select
                    id="q-subject"
                    value={qSubject}
                    onChange={(e) =>
                      setQSubject(
                        e.target.value as
                          | 'Physics'
                          | 'Chemistry'
                          | 'Biology'
                          | 'Mathematics'
                      )
                    }
                    className="w-full px-2.5 py-2 bg-[#0D0D0D] border border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Mathematics">Mathematics</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="q-type"
                    className="block font-mono text-[11px] text-zinc-400 mb-1"
                  >
                    QUESTION TYPE
                  </label>
                  <select
                    id="q-type"
                    value={qType}
                    onChange={(e) => setQType(e.target.value as QuestionType)}
                    className="w-full px-2.5 py-2 bg-[#0D0D0D] border border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                  >
                    <option value="MCQ">MCQ (+4 / -1)</option>
                    <option value="DESCRIPTIVE">Descriptive</option>
                  </select>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="q-scope"
                    className="block font-mono text-[11px] text-zinc-400 mb-1"
                  >
                    BANK VISIBILITY
                  </label>
                  <select
                    id="q-scope"
                    value={qScope}
                    onChange={(e) =>
                      setQScope(e.target.value as QuestionBankScope)
                    }
                    className="w-full px-2.5 py-2 bg-[#0D0D0D] border border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                  >
                    <option value="SHARED_ACADEMY">Shared Academy Bank</option>
                    <option value="PRIVATE_TEACHER">My Private Bank</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label
                    htmlFor="q-chapter"
                    className="block font-mono text-[11px] text-zinc-400 mb-1"
                  >
                    CHAPTER
                  </label>
                  <input
                    id="q-chapter"
                    type="text"
                    value={qChapter}
                    onChange={(e) => setQChapter(e.target.value)}
                    className="w-full px-2.5 py-2 bg-[#0D0D0D] border border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="q-pos"
                    className="block font-mono text-[11px] text-zinc-400 mb-1"
                  >
                    +VE MARKS
                  </label>
                  <input
                    id="q-pos"
                    type="number"
                    value={qPositive}
                    onChange={(e) => setQPositive(Number(e.target.value))}
                    className="w-full px-2.5 py-2 bg-[#0D0D0D] border border-zinc-700 text-[#F2FF00] font-mono text-xs rounded-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="q-neg"
                    className="block font-mono text-[11px] text-zinc-400 mb-1"
                  >
                    -VE MARKING
                  </label>
                  <input
                    id="q-neg"
                    type="number"
                    value={qNegative}
                    onChange={(e) => setQNegative(Number(e.target.value))}
                    className="w-full px-2.5 py-2 bg-[#0D0D0D] border border-zinc-700 text-[#FF0000] font-mono text-xs rounded-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="q-prompt"
                  className="block font-mono text-[11px] text-zinc-400 mb-1"
                >
                  QUESTION STATEMENT
                </label>
                <textarea
                  id="q-prompt"
                  rows={2}
                  value={qPrompt}
                  onChange={(e) => setQPrompt(e.target.value)}
                  placeholder="Enter question statement, formula, or derivation prompt..."
                  className="w-full p-3 bg-[#0D0D0D] border border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#173F46] text-[#F2FF00] font-mono text-xs font-bold border-2 border-[#F2FF00] hover:bg-[#F2FF00] hover:text-[#0D0D0D] transition-colors duration-75 rounded-none cursor-pointer"
              >
                + Save Question to Bank
              </button>
            </form>
          </div>

          {/* Question Bank Browser (Shared vs Private) */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-display text-xl font-black text-[#E9E3D5]">
                ACADEMY &amp; PRIVATE QUESTION REPOSITORY ({visibleQuestions.length})
              </h3>
              <div className="flex items-center gap-2">
                {(['ALL', 'SHARED_ACADEMY', 'PRIVATE_TEACHER'] as const).map(
                  (scope) => (
                    <button
                      key={scope}
                      type="button"
                      onClick={() => setBankFilter(scope)}
                      className={`px-3 py-1.5 font-mono text-xs font-bold border rounded-none cursor-pointer ${
                        bankFilter === scope
                          ? 'bg-[#F2FF00] text-[#0D0D0D] border-[#E9E3D5]'
                          : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-[#E9E3D5]'
                      }`}
                    >
                      {scope === 'ALL'
                        ? 'All Questions'
                        : scope === 'SHARED_ACADEMY'
                        ? 'Shared Academy Bank'
                        : 'My Private Bank'}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {visibleQuestions.map((q) => {
                const isSelected = selectedQuestionIds.includes(q.id);
                return (
                  <div
                    key={q.id}
                    className="bg-zinc-950 border border-zinc-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="font-mono text-xs flex flex-wrap items-center gap-2">
                        <span
                          className={`px-2 py-0.5 font-bold ${
                            q.scope === 'SHARED_ACADEMY'
                              ? 'bg-[#173F46] text-[#F2FF00]'
                              : 'bg-zinc-800 text-[#E9E3D5]'
                          }`}
                        >
                          {q.scope === 'SHARED_ACADEMY'
                            ? 'SHARED BANK'
                            : 'PRIVATE BANK'}
                        </span>
                        <span className="text-[#F2FF00] font-bold">
                          {q.subject} · {q.chapter}
                        </span>
                        <span>·</span>
                        <span>
                          {q.type} (+{q.positiveMarks} / -{q.negativeMarks})
                        </span>
                      </div>
                      <p className="text-sm text-[#E9E3D5]">{q.prompt}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedQuestionIds((prev) =>
                          prev.includes(q.id)
                            ? prev.filter((id) => id !== q.id)
                            : [...prev, q.id]
                        )
                      }
                      className={`px-3 py-2 font-mono text-xs font-bold border shrink-0 rounded-none cursor-pointer ${
                        isSelected
                          ? 'bg-[#F2FF00] text-[#0D0D0D] border-[#E9E3D5]'
                          : 'bg-[#0D0D0D] text-zinc-400 border-zinc-700'
                      }`}
                    >
                      {isSelected ? '✓ In Exam Paper' : '+ Add to Exam'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 2. ASSIGNED BATCHES & COURSES */}
      {activeTab === 'batches' && (
        <section aria-label="Assigned Batches" className="space-y-6">
          <h2 className="font-display text-2xl font-black text-[#E9E3D5]">
            ASSIGNED SBO &amp; ANAIYUR BATCHES ({batches.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {batches.map((b) => (
              <div
                key={b.id}
                className="bg-zinc-950 border-2 border-[#E9E3D5] p-6 space-y-3 brutal-shadow-petrol"
              >
                <div className="font-mono text-xs text-[#F2FF00] font-bold">
                  {b.branchName} · {b.programme}
                </div>
                <h3 className="font-display text-2xl font-black text-[#E9E3D5]">
                  {b.name}
                </h3>
                <div className="font-mono text-xs text-zinc-300">
                  Schedule: {b.scheduleSummary}
                </div>
                <div className="font-mono text-xs text-zinc-400">
                  Faculty Lead: {b.mentorTeacherName}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. UPLOAD LEARNING MATERIALS (YouTube Unlisted + Supabase PDF) */}
      {activeTab === 'upload' && (
        <section aria-label="Upload Course Materials" className="max-w-3xl space-y-6">
          <div>
            <div className="font-mono text-xs text-[#F2FF00]">
              VIDEO HOSTING POLICY · YOUTUBE UNLISTED OR STREAM + SUPABASE STORAGE PDF
            </div>
            <h2 className="font-display text-2xl font-black text-[#E9E3D5] mt-1">
              PUBLISH NEW LESSON &amp; WORKSHEET
            </h2>
          </div>

          {uploadSuccess && (
            <div className="p-4 bg-[#173F46] border-2 border-[#F2FF00] font-mono text-xs text-[#F2FF00] font-bold">
              ✓ Lesson published with video stream and Supabase Storage PDF!
            </div>
          )}

          <form
            onSubmit={handleUploadModule}
            className="bg-zinc-950 border-2 border-[#E9E3D5] p-6 sm:p-8 space-y-4 brutal-shadow-yellow"
          >
            <div>
              <label
                htmlFor="up-course"
                className="block font-mono text-xs text-zinc-300 font-bold mb-1"
              >
                TARGET COURSE
              </label>
              <select
                id="up-course"
                value={uploadCourseId}
                onChange={(e) => setUploadCourseId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.programme} — {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="up-title"
                className="block font-mono text-xs text-zinc-300 font-bold mb-1"
              >
                MODULE / LESSON TITLE
              </label>
              <input
                id="up-title"
                type="text"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="up-source"
                  className="block font-mono text-xs text-zinc-300 font-bold mb-1"
                >
                  VIDEO HOSTING SOURCE
                </label>
                <select
                  id="up-source"
                  value={uploadSourceType}
                  onChange={(e) =>
                    setUploadSourceType(e.target.value as VideoSourceType)
                  }
                  className="w-full px-3 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                >
                  <option value="YOUTUBE_UNLISTED">
                    YouTube Unlisted (Recommended)
                  </option>
                  <option value="DIRECT_STREAM">
                    Dedicated Streaming Server
                  </option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="up-pdf"
                  className="block font-mono text-xs text-zinc-300 font-bold mb-1"
                >
                  SUPABASE STORAGE PDF FILENAME
                </label>
                <input
                  id="up-pdf"
                  type="text"
                  value={uploadPdfTitle}
                  onChange={(e) => setUploadPdfTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="up-url"
                className="block font-mono text-xs text-zinc-300 font-bold mb-1"
              >
                VIDEO STREAM / YOUTUBE UNLISTED URL
              </label>
              <input
                id="up-url"
                type="text"
                value={uploadVideoUrl}
                onChange={(e) => setUploadVideoUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3.5 bg-[#F2FF00] text-[#0D0D0D] font-mono text-xs font-bold border-2 border-[#E9E3D5] brutal-shadow-petrol hover:bg-[#173F46] hover:text-[#F2FF00] rounded-none cursor-pointer"
            >
              Publish Lesson &amp; Attach Supabase PDF
            </button>
          </form>
        </section>
      )}

      {/* 4. SCHEDULE LIVE CLASSES */}
      {activeTab === 'live_schedule' && (
        <section aria-label="Schedule Live Classes" className="space-y-6 max-w-3xl">
          <h2 className="font-display text-2xl font-black text-[#E9E3D5]">
            SCHEDULE LIVE BATCH SESSION
          </h2>
          <form
            onSubmit={handleCreateLiveClass}
            className="bg-zinc-950 border-2 border-[#E9E3D5] p-6 space-y-4 brutal-shadow-petrol"
          >
            <div>
              <label
                htmlFor="live-title"
                className="block font-mono text-xs text-zinc-300 font-bold mb-1"
              >
                LIVE SESSION TOPIC
              </label>
              <input
                id="live-title"
                type="text"
                value={liveTitle}
                onChange={(e) => setLiveTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="live-batch"
                  className="block font-mono text-xs text-zinc-300 font-bold mb-1"
                >
                  BATCH
                </label>
                <select
                  id="live-batch"
                  value={liveBatchId}
                  onChange={(e) => setLiveBatchId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                >
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="live-sub"
                  className="block font-mono text-xs text-zinc-300 font-bold mb-1"
                >
                  SUBJECT
                </label>
                <input
                  id="live-sub"
                  type="text"
                  value={liveSubject}
                  onChange={(e) => setLiveSubject(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                />
              </div>
              <div>
                <label
                  htmlFor="live-time"
                  className="block font-mono text-xs text-zinc-300 font-bold mb-1"
                >
                  DATE &amp; TIME
                </label>
                <input
                  id="live-time"
                  type="text"
                  value={liveTime}
                  onChange={(e) => setLiveTime(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#F2FF00] text-[#0D0D0D] font-mono text-xs font-bold border-2 border-[#E9E3D5] rounded-none cursor-pointer"
            >
              + Broadcast Live Class to Batch
            </button>
          </form>
        </section>
      )}

      {/* 5. STUDENT ANALYTICS & MANUAL DESCRIPTIVE EVALUATION */}
      {activeTab === 'analytics' && (
        <section aria-label="Student Submission Evaluation" className="space-y-6">
          <div>
            <div className="font-mono text-xs text-[#F2FF00]">
              BATCH SUBMISSIONS &amp; MANUAL DESCRIPTIVE ANSWER EVALUATION
            </div>
            <h2 className="font-display text-2xl font-black text-[#E9E3D5] mt-1">
              STUDENT EXAM SUBMISSIONS ({submissions.length})
            </h2>
          </div>

          <div className="space-y-4">
            {submissions.map((sub) => {
              const exam = exams.find((e) => e.id === sub.examId);
              return (
                <div
                  key={sub.id}
                  className="bg-zinc-950 border-2 border-[#E9E3D5] p-6 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="font-mono text-xs text-[#F2FF00] font-bold">
                        STUDENT: {sub.studentName.toUpperCase()} · SUBMITTED{' '}
                        {sub.submittedAt}
                      </div>
                      <h3 className="font-display text-xl font-black text-[#E9E3D5]">
                        {exam?.title}
                      </h3>
                    </div>
                    <div className="font-mono text-xs tabular-nums">
                      MCQ Score: <strong>{sub.mcqScore}</strong> · Descriptive
                      Score: <strong className="text-[#F2FF00]">{sub.descriptiveScore}</strong> ·
                      Total:{' '}
                      <strong className="text-[#F2FF00] text-sm">
                        {sub.totalScore}/{sub.maxScore}
                      </strong>
                    </div>
                  </div>

                  {sub.answers['q_jee_05'] && (
                    <div className="p-4 bg-[#0D0D0D] border border-zinc-800 space-y-3">
                      <div className="font-mono text-xs text-zinc-400">
                        DESCRIPTIVE DERIVATION SUBMISSION (MAX 8 MARKS):
                      </div>
                      <p className="font-mono text-xs text-[#E9E3D5]">
                        &ldquo;{String(sub.answers['q_jee_05'])}&rdquo;
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="font-mono text-xs text-zinc-400">
                          Assign Descriptive Marks:
                        </span>
                        {[5, 6, 7, 8].map((pts) => (
                          <button
                            key={pts}
                            type="button"
                            onClick={() =>
                              evaluateDescriptiveSubmission(sub.id, pts)
                            }
                            className={`px-3 py-1 font-mono text-xs font-bold border rounded-none cursor-pointer ${
                              sub.descriptiveScore === pts
                                ? 'bg-[#F2FF00] text-[#0D0D0D] border-[#E9E3D5]'
                                : 'bg-zinc-900 text-zinc-300 border-zinc-700'
                            }`}
                          >
                            {pts} / 8
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
