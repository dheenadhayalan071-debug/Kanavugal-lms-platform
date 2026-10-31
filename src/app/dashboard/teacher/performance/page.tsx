import React, { useState } from 'react';
import {
  Flame,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Filter,
  CalendarPlus,
} from 'lucide-react';
import {
  ChapterHeatMapCell,
  classifyChapterStruggleSeverity,
  StruggleSeverity,
} from '../../../../lib/lmsLogic';

const BATCH_COLUMNS = [
  {
    code: 'SBO-JEE-2027-A',
    label: 'SBO-JEE-2027-A',
    campus: 'SBO Colony · 42 Scholars',
  },
  {
    code: 'SBO-NEET-2027-B',
    label: 'SBO-NEET-2027-B',
    campus: 'SBO Colony · 56 Scholars',
  },
  {
    code: 'ANA-CBSE-2027-A',
    label: 'ANA-CBSE-2027-A',
    campus: 'Anaiyur · 38 Scholars',
  },
];

const CHAPTER_HEATMAP_DATA: ChapterHeatMapCell[] = [
  {
    chapterId: 'ch_phy_rot',
    chapterName: 'Rotational Dynamics & Moment of Inertia',
    subject: 'Physics',
    batchScores: {
      'SBO-JEE-2027-A': {
        accuracyPct: 44,
        negativeRatePct: 38,
        avgTimeSec: 164,
        strugglingCount: 25,
        totalStudents: 42,
      },
      'SBO-NEET-2027-B': {
        accuracyPct: 41,
        negativeRatePct: 42,
        avgTimeSec: 158,
        strugglingCount: 34,
        totalStudents: 56,
      },
      'ANA-CBSE-2027-A': {
        accuracyPct: 52,
        negativeRatePct: 29,
        avgTimeSec: 142,
        strugglingCount: 18,
        totalStudents: 38,
      },
    },
  },
  {
    chapterId: 'ch_phy_mag',
    chapterName: 'Moving Charges & Cyclotron Magnetism',
    subject: 'Physics',
    batchScores: {
      'SBO-JEE-2027-A': {
        accuracyPct: 58,
        negativeRatePct: 27,
        avgTimeSec: 138,
        strugglingCount: 17,
        totalStudents: 42,
      },
      'SBO-NEET-2027-B': {
        accuracyPct: 47,
        negativeRatePct: 35,
        avgTimeSec: 149,
        strugglingCount: 30,
        totalStudents: 56,
      },
      'ANA-CBSE-2027-A': {
        accuracyPct: 63,
        negativeRatePct: 22,
        avgTimeSec: 128,
        strugglingCount: 14,
        totalStudents: 38,
      },
    },
  },
  {
    chapterId: 'ch_chem_elec',
    chapterName: 'Electrochemistry & Nernst Equation Cells',
    subject: 'Chemistry',
    batchScores: {
      'SBO-JEE-2027-A': {
        accuracyPct: 48,
        negativeRatePct: 34,
        avgTimeSec: 132,
        strugglingCount: 22,
        totalStudents: 42,
      },
      'SBO-NEET-2027-B': {
        accuracyPct: 56,
        negativeRatePct: 28,
        avgTimeSec: 121,
        strugglingCount: 24,
        totalStudents: 56,
      },
      'ANA-CBSE-2027-A': {
        accuracyPct: 71,
        negativeRatePct: 16,
        avgTimeSec: 108,
        strugglingCount: 10,
        totalStudents: 38,
      },
    },
  },
  {
    chapterId: 'ch_chem_ald',
    chapterName: 'Aldehydes, Ketones & Nucleophilic Addition',
    subject: 'Chemistry',
    batchScores: {
      'SBO-JEE-2027-A': {
        accuracyPct: 68,
        negativeRatePct: 19,
        avgTimeSec: 112,
        strugglingCount: 12,
        totalStudents: 42,
      },
      'SBO-NEET-2027-B': {
        accuracyPct: 61,
        negativeRatePct: 25,
        avgTimeSec: 118,
        strugglingCount: 21,
        totalStudents: 56,
      },
      'ANA-CBSE-2027-A': {
        accuracyPct: 81,
        negativeRatePct: 11,
        avgTimeSec: 96,
        strugglingCount: 6,
        totalStudents: 38,
      },
    },
  },
  {
    chapterId: 'ch_math_def',
    chapterName: 'Definite Integration & King’s Rule Properties',
    subject: 'Mathematics',
    batchScores: {
      'SBO-JEE-2027-A': {
        accuracyPct: 46,
        negativeRatePct: 36,
        avgTimeSec: 178,
        strugglingCount: 24,
        totalStudents: 42,
      },
      'SBO-NEET-2027-B': {
        accuracyPct: 74,
        negativeRatePct: 14,
        avgTimeSec: 105,
        strugglingCount: 12,
        totalStudents: 56,
      },
      'ANA-CBSE-2027-A': {
        accuracyPct: 59,
        negativeRatePct: 26,
        avgTimeSec: 152,
        strugglingCount: 16,
        totalStudents: 38,
      },
    },
  },
  {
    chapterId: 'ch_bio_mol',
    chapterName: 'Molecular Basis of Inheritance & Operon Model',
    subject: 'Biology',
    batchScores: {
      'SBO-JEE-2027-A': {
        accuracyPct: 82,
        negativeRatePct: 9,
        avgTimeSec: 84,
        strugglingCount: 6,
        totalStudents: 42,
      },
      'SBO-NEET-2027-B': {
        accuracyPct: 49,
        negativeRatePct: 33,
        avgTimeSec: 116,
        strugglingCount: 29,
        totalStudents: 56,
      },
      'ANA-CBSE-2027-A': {
        accuracyPct: 86,
        negativeRatePct: 8,
        avgTimeSec: 79,
        strugglingCount: 4,
        totalStudents: 38,
      },
    },
  },
];

function getHeatMapCellStyles(severity: StruggleSeverity): string {
  switch (severity) {
    case 'CRITICAL':
      return 'bg-brand-champagne text-[#0A0B0E] border-brand-champagne font-semibold';
    case 'HIGH':
      return 'bg-brand-champagne/20 text-[#F3F4F6] border-brand-champagne';
    case 'MODERATE':
      return 'bg-[#11131A] text-[#3B82F6] border-[#3B82F6]/50';
    case 'MASTERED':
    default:
      return 'bg-[#0A0B0E] text-[#9CA3AF] border-[#232734]';
  }
}

export const TeacherBatchPerformancePage: React.FC = () => {
  const [subjectFilter, setSubjectFilter] = useState<
    'ALL' | 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology'
  >('ALL');
  const [selectedCell, setSelectedCell] = useState<{
    chapterId: string;
    batchCode: string;
  }>({
    chapterId: 'ch_phy_rot',
    batchCode: 'SBO-NEET-2027-B',
  });
  const [remedialToast, setRemedialToast] = useState<string | null>(null);

  const filteredChapters = CHAPTER_HEATMAP_DATA.filter((row) =>
    subjectFilter === 'ALL' ? true : row.subject === subjectFilter
  );

  const activeChapter =
    CHAPTER_HEATMAP_DATA.find((c) => c.chapterId === selectedCell.chapterId) ||
    CHAPTER_HEATMAP_DATA[0];
  const activeBatchStats =
    activeChapter.batchScores[selectedCell.batchCode] ||
    activeChapter.batchScores['SBO-JEE-2027-A'];
  const activeClassification = classifyChapterStruggleSeverity(
    activeBatchStats.accuracyPct
  );

  const handleScheduleRemedial = () => {
    setRemedialToast(
      `Remedial Doubt Clinic scheduled for ${selectedCell.batchCode} on "${activeChapter.chapterName}".`
    );
    setTimeout(() => setRemedialToast(null), 4000);
  };

  return (
    <div className="bg-[#0A0B0E] text-[#F3F4F6]">
      {remedialToast && (
        <div className="fixed bottom-8 right-6 z-50 max-w-md bg-[#13161F] border border-brand-champagne rounded-lg px-5 py-4 shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-brand-champagne shrink-0" />
          <p className="text-base text-[#F3F4F6]">{remedialToast}</p>
        </div>
      )}

      <header className="px-6 lg:px-10 py-8 border-b border-[#232734] bg-[#11131A] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-brand-champagne uppercase tracking-wider">
            <Flame className="w-4 h-4" />
            <span>
              CBT Diagnostic Heat Map · /dashboard/teacher/performance
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F4F6]">
            Batch-wise Exam Performance & Chapter Struggle Heat Map
          </h1>
          <p className="text-base text-[#9CA3AF]">
            Identify high-error chapters across all submitted NTA CBT exams by
            batch, negative marking rate, and question time
          </p>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-[#13161F] border border-[#232734] rounded-md p-1.5">
          <Filter className="w-4 h-4 text-brand-champagne ml-2 mr-1" />
          {(
            ['ALL', 'Physics', 'Chemistry', 'Mathematics', 'Biology'] as const
          ).map((subj) => {
            const isActive = subjectFilter === subj;
            return (
              <button
                key={subj}
                type="button"
                onClick={() => setSubjectFilter(subj)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-brand-champagne text-[#0A0B0E]'
                    : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
                }`}
              >
                {subj === 'ALL' ? 'All Subjects' : subj}
              </button>
            );
          })}
        </div>
      </header>

      <div className="px-6 lg:px-10 py-10 space-y-10 max-w-7xl">
        {/* Heat Map Intensity Legend */}
        <section className="bg-[#13161F] border border-[#232734] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
              Chapter Struggle Heat Map Legend
            </p>
            <p className="text-sm text-[#F3F4F6]">
              Click any batch-chapter cell below to inspect negative marking
              triggers and struggling scholar counts
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-brand-champagne text-[#0A0B0E] font-semibold">
              Critical Struggle (&lt;50% Acc)
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-brand-champagne/20 border border-brand-champagne text-[#F3F4F6]">
              High Struggle (50–64% Acc)
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#11131A] border border-[#3B82F6]/50 text-[#3B82F6]">
              Moderate (65–77% Acc)
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#0A0B0E] border border-[#232734] text-[#9CA3AF]">
              Mastered (≥78% Acc)
            </span>
          </div>
        </section>

        {/* Main Heat Map Matrix + Diagnostic Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Heat Map Grid (8 cols) */}
          <section
            aria-label="Chapter Struggle Heat Map Matrix"
            data-testid="teacher-chapter-heatmap"
            className="lg:col-span-8 bg-[#13161F] border border-[#232734] rounded-lg overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-[#232734] flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6]">
                Chapter vs. Batch Struggle Matrix ({filteredChapters.length}{' '}
                Chapters)
              </h2>
              <span className="font-mono text-xs text-[#3B82F6] uppercase tracking-wider">
                5 CBT EXAMS AGGREGATED
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#232734] bg-[#0A0B0E] text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                    <th className="py-4 px-5 min-w-[230px]">
                      Syllabus Chapter & Subject
                    </th>
                    {BATCH_COLUMNS.map((batch) => (
                      <th key={batch.code} className="py-4 px-4 text-center">
                        <div className="font-mono text-[#F3F4F6]">
                          {batch.label}
                        </div>
                        <div className="font-sans text-[11px] font-normal text-[#9CA3AF] normal-case">
                          {batch.campus}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#232734]">
                  {filteredChapters.map((row) => (
                    <tr
                      key={row.chapterId}
                      className="hover:bg-[#0A0B0E]/40 transition-colors"
                    >
                      <td className="py-4 px-5">
                        <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#0A0B0E] border border-[#232734] text-brand-champagne">
                          {row.subject}
                        </span>
                        <p className="text-sm font-semibold text-[#F3F4F6] mt-1.5">
                          {row.chapterName}
                        </p>
                      </td>

                      {BATCH_COLUMNS.map((batch) => {
                        const cellStats = row.batchScores[batch.code];
                        const { severity, struggleIndex } =
                          classifyChapterStruggleSeverity(
                            cellStats.accuracyPct
                          );
                        const isSelected =
                          selectedCell.chapterId === row.chapterId &&
                          selectedCell.batchCode === batch.code;

                        return (
                          <td key={batch.code} className="p-3 text-center">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedCell({
                                  chapterId: row.chapterId,
                                  batchCode: batch.code,
                                })
                              }
                              aria-label={`${row.chapterName} in ${batch.code}: ${cellStats.accuracyPct}% accuracy`}
                              className={`w-full rounded-md border p-3 transition-all text-left space-y-1 cursor-pointer ${getHeatMapCellStyles(
                                severity
                              )} ${
                                isSelected
                                  ? 'ring-2 ring-[#F3F4F6] ring-offset-2 ring-offset-[#13161F]'
                                  : ''
                              }`}
                            >
                              <div className="flex items-center justify-between font-mono text-xs">
                                <span className="font-bold text-sm">
                                  {cellStats.accuracyPct}% Acc
                                </span>
                                <span className="text-[11px] opacity-90">
                                  -{cellStats.negativeRatePct}% Neg
                                </span>
                              </div>
                              <div className="text-[11px] font-mono opacity-90">
                                {cellStats.strugglingCount}/
                                {cellStats.totalStudents} Struggling · SI{' '}
                                {struggleIndex}
                              </div>
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Selected Cell Diagnostic Inspector (4 cols) */}
          <aside className="lg:col-span-4 bg-[#13161F] border border-[#232734] rounded-lg p-6 space-y-6">
            <div className="space-y-2 border-b border-[#232734] pb-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#0A0B0E] border border-[#232734] text-brand-champagne">
                  {selectedCell.batchCode}
                </span>
                <span className="font-mono text-xs text-[#3B82F6]">
                  {activeChapter.subject}
                </span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-[#F3F4F6]">
                {activeChapter.chapterName}
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-champagne">
                {activeClassification.label}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-4 space-y-1">
                <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
                  Chapter Accuracy
                </p>
                <p className="font-mono text-3xl font-bold tracking-tight text-brand-champagne">
                  {activeBatchStats.accuracyPct}%
                </p>
              </div>

              <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-4 space-y-1">
                <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
                  -1 Negative Rate
                </p>
                <p className="font-mono text-3xl font-bold tracking-tight text-[#3B82F6]">
                  {activeBatchStats.negativeRatePct}%
                </p>
              </div>

              <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-4 space-y-1">
                <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
                  Struggling Scholars
                </p>
                <p className="font-mono text-2xl font-bold text-brand-champagne">
                  {activeBatchStats.strugglingCount} /{' '}
                  {activeBatchStats.totalStudents}
                </p>
              </div>

              <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-4 space-y-1">
                <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
                  Avg Time / MCQ
                </p>
                <p className="font-mono text-2xl font-bold text-[#F3F4F6] inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-champagne" />
                  <span>{activeBatchStats.avgTimeSec}s</span>
                </p>
              </div>
            </div>

            <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-champagne uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Root Cause in Submitted CBT Scripts</span>
              </div>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                {activeBatchStats.strugglingCount} scholars in{' '}
                <span className="text-[#F3F4F6] font-mono">
                  {selectedCell.batchCode}
                </span>{' '}
                triggered <span className="text-brand-champagne">-1</span>{' '}
                negative marking on multi-concept numericals in{' '}
                <span className="text-[#F3F4F6]">
                  {activeChapter.chapterName}
                </span>
                , averaging {activeBatchStats.avgTimeSec}s per question (target:
                90s).
              </p>
            </div>

            <button
              type="button"
              onClick={handleScheduleRemedial}
              className="w-full py-3 px-4 rounded-md bg-brand-champagne hover:bg-[#F1C48F] text-[#0A0B0E] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Schedule Targeted Remedial Clinic</span>
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TeacherBatchPerformancePage;
