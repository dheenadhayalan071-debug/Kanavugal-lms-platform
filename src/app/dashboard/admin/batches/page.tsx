import React, { useState } from 'react';
import { Layers, Plus, CheckCircle2 } from 'lucide-react';

interface AcademyBatchRow {
  id: string;
  batchCode: string;
  title: string;
  campus: 'SBO Colony' | 'Anaiyur';
  stream: string;
  leadTeacher: string;
  enrolledCount: number;
  capacity: number;
}

const INITIAL_BATCHES: AcademyBatchRow[] = [
  {
    id: 'bat_01',
    batchCode: 'SBO-NEET-2027',
    title: 'Class 12 NEET UG Medical Intensive',
    campus: 'SBO Colony',
    stream: 'NEET UG · PCB',
    leadTeacher: 'Prof. S. Meenakshi',
    enrolledCount: 54,
    capacity: 60,
  },
  {
    id: 'bat_02',
    batchCode: 'SBO-JEE-2027-A',
    title: 'Class 12 JEE Main & Advanced Rankers',
    campus: 'SBO Colony',
    stream: 'JEE Main & Adv · PCM',
    leadTeacher: 'Dr. R. Aravindhan',
    enrolledCount: 48,
    capacity: 50,
  },
  {
    id: 'bat_03',
    batchCode: 'ANA-JEE-2028-A',
    title: 'Class 11 JEE Integrated Foundation',
    campus: 'Anaiyur',
    stream: 'JEE Main & Adv · PCM',
    leadTeacher: 'Prof. V. Subramanian',
    enrolledCount: 42,
    capacity: 50,
  },
];

export const AdminBatchesPage: React.FC = () => {
  const [batches, setBatches] = useState<AcademyBatchRow[]>(INITIAL_BATCHES);
  const [newBatchCode, setNewBatchCode] = useState('SBO-NEET-2027-C');
  const [newBatchTitle, setNewBatchTitle] = useState(
    'Class 12 NEET UG Crash & Test Series'
  );
  const [newBatchCampus, setNewBatchCampus] = useState<'SBO Colony' | 'Anaiyur'>(
    'SBO Colony'
  );
  const [newBatchLeadTeacher, setNewBatchLeadTeacher] = useState(
    'Dr. R. Aravindhan'
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatchCode.trim() || !newBatchTitle.trim()) return;
    const created: AcademyBatchRow = {
      id: `bat_${Date.now()}`,
      batchCode: newBatchCode.trim().toUpperCase(),
      title: newBatchTitle.trim(),
      campus: newBatchCampus,
      stream: newBatchCode.toUpperCase().includes('NEET')
        ? 'NEET UG · PCB'
        : 'JEE Main & Adv · PCM',
      leadTeacher: newBatchLeadTeacher,
      enrolledCount: 1,
      capacity: 60,
    };
    setBatches((prev) => [created, ...prev]);
    triggerToast(
      `Created batch ${created.batchCode} (${created.campus}) with Lead Teacher ${created.leadTeacher}.`
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
            <Layers className="w-3.5 h-3.5" />
            <span>Academic Cohort Provisioning · /dashboard/admin/batches</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F3EF]">
            Batch & Lead Faculty Control
          </h1>
          <p className="text-xs text-[#A1A1AA]">
            Create new batches (e.g., SBO-NEET-2027) and assign Lead Teachers across SBO Colony and Anaiyur
          </p>
        </div>
      </header>

      <div className="px-6 lg:px-10 py-8 space-y-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Create Batch Form */}
          <form
            onSubmit={handleCreateBatch}
            className="lg:col-span-5 bg-[#111111] border border-[#292929] rounded-lg p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#292929] pb-3">
              <h2 className="text-sm font-semibold text-[#F5F3EF]">
                Create New Batch & Assign Lead Teacher
              </h2>
              <span className="font-mono text-[11px] text-[#FF4B00]">
                BATCH BUILDER
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-[#A1A1AA] mb-1">
                  Batch Code
                </label>
                <input
                  type="text"
                  required
                  value={newBatchCode}
                  onChange={(e) => setNewBatchCode(e.target.value)}
                  placeholder="e.g., SBO-NEET-2027"
                  className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2 text-xs font-mono text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#A1A1AA] mb-1">
                  Batch Programme Title
                </label>
                <input
                  type="text"
                  required
                  value={newBatchTitle}
                  onChange={(e) => setNewBatchTitle(e.target.value)}
                  placeholder="Class 12 NEET UG Intensive"
                  className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2 text-xs text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#A1A1AA] mb-1">
                    Branch Campus
                  </label>
                  <select
                    value={newBatchCampus}
                    onChange={(e) =>
                      setNewBatchCampus(
                        e.target.value as 'SBO Colony' | 'Anaiyur'
                      )
                    }
                    className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2 text-xs text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                  >
                    <option value="SBO Colony">SBO Colony</option>
                    <option value="Anaiyur">Anaiyur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#A1A1AA] mb-1">
                    Assign Lead Teacher
                  </label>
                  <select
                    value={newBatchLeadTeacher}
                    onChange={(e) => setNewBatchLeadTeacher(e.target.value)}
                    className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2 text-xs text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                  >
                    <option value="Dr. R. Aravindhan">Dr. R. Aravindhan</option>
                    <option value="Prof. S. Meenakshi">Prof. S. Meenakshi</option>
                    <option value="Prof. V. Subramanian">
                      Prof. V. Subramanian
                    </option>
                    <option value="Dr. K. Senthamarai">Dr. K. Senthamarai</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2.5 rounded-md bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] text-xs font-medium inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Batch & Assign Lead Teacher</span>
            </button>
          </form>

          {/* Active Batches List */}
          <div className="lg:col-span-7 bg-[#111111] border border-[#292929] rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#292929] pb-3">
              <h2 className="text-sm font-semibold text-[#F5F3EF]">
                Configured Campus Batches ({batches.length})
              </h2>
              <span className="font-mono text-[11px] text-[#A1A1AA]">
                SBO COLONY / ANAIYUR
              </span>
            </div>

            <div className="space-y-3">
              {batches.map((batch) => (
                <div
                  key={batch.id}
                  className="bg-[#080808] border border-[#292929] rounded-md p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[#FF4B00]">
                        {batch.batchCode}
                      </span>
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#111111] border border-[#292929] text-[#A1A1AA]">
                        {batch.campus}
                      </span>
                      <span className="font-mono text-[11px] text-[#A1A1AA]">
                        {batch.stream}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-[#F5F3EF]">
                      {batch.title}
                    </p>
                    <p className="text-xs text-[#A1A1AA]">
                      Lead Teacher:{' '}
                      <span className="text-[#F5F3EF] font-medium">
                        {batch.leadTeacher}
                      </span>
                    </p>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <p className="font-mono text-xs text-[#F5F3EF]">
                      {batch.enrolledCount} / {batch.capacity} Scholars
                    </p>
                    <span className="inline-block mt-1 font-mono text-[10px] px-2 py-0.5 rounded bg-[#111111] border border-[#292929] text-[#FF4B00]">
                      ACTIVE BATCH
                    </span>
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

export default AdminBatchesPage;
