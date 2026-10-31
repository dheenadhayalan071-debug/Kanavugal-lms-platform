import React, { useState } from 'react';
import { UserCheck, Link2, Plus, CheckCircle2 } from 'lucide-react';
import { useMockGlobal } from '../../../../context/MockGlobalContext';

export const AdminUsersPage: React.FC = () => {
  const {
    userApprovals,
    setAccountApprovalStatus,
    parentStudentLinks,
    linkParentAndStudent,
  } = useMockGlobal();

  const [parentIdInput, setParentIdInput] = useState('PAR-KA-2026-0119');
  const [studentIdInput, setStudentIdInput] = useState('STU-SBO-2027-0195');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSetAccountStatus = (
    id: string,
    fullName: string,
    nextStatus: 'APPROVED' | 'SUSPENDED'
  ) => {
    setAccountApprovalStatus(id, nextStatus);
    triggerToast(
      `${fullName} account status updated to ${nextStatus} in PostgreSQL.`
    );
  };

  const handleLinkParentStudentId = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentIdInput.trim() || !studentIdInput.trim()) return;
    const newRow = linkParentAndStudent(parentIdInput, studentIdInput);
    triggerToast(
      `Linked Parent ID ${newRow.parentId} to Student ID ${newRow.studentId}.`
    );
  };

  return (
    <div className="bg-[#0A0B0E] text-[#F3F4F6]">
      {toastMessage && (
        <div className="fixed bottom-8 right-6 z-50 max-w-md bg-[#13161F] border border-brand-champagne rounded-lg px-5 py-4 shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-brand-champagne shrink-0" />
          <p className="text-base text-[#F3F4F6]">{toastMessage}</p>
        </div>
      )}

      <header className="px-6 lg:px-10 py-8 border-b border-[#232734] bg-[#11131A] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-brand-champagne uppercase tracking-wider">
            <UserCheck className="w-4 h-4" />
            <span>Identity & Guardian Governance · /dashboard/admin/users</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F4F6]">
            User Management & Parent–Student ID Linking
          </h1>
          <p className="text-base text-[#9CA3AF]">
            Approve or suspend Student and Teacher accounts and manually link a
            Parent ID to a Student ID
          </p>
        </div>
      </header>

      <div className="px-6 lg:px-10 py-10 space-y-10 max-w-7xl">
        {/* Approve / Suspend Students & Teachers Table */}
        <div className="bg-[#13161F] border border-[#232734] rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-[#232734] flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6]">
              Student & Teacher Account Governance (Approve / Suspend)
            </h2>
            <span className="font-mono text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
              {userApprovals.length} Accounts
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#232734] bg-[#0A0B0E] text-xs md:text-sm font-medium uppercase tracking-wider text-[#9CA3AF]">
                  <th className="py-4 px-6">User / ID</th>
                  <th className="py-4 px-4">Role</th>
                  <th className="py-4 px-4">Campus</th>
                  <th className="py-4 px-4">Batch</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Governance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#232734] text-base">
                {userApprovals.map((acc) => (
                  <tr
                    key={acc.id}
                    className="hover:bg-[#0A0B0E]/60 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <p className="font-semibold text-[#F3F4F6]">
                        {acc.fullName}
                      </p>
                      <p className="text-[#9CA3AF] font-mono text-xs md:text-sm">
                        {acc.userCode} · {acc.email}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#0A0B0E] border border-[#232734] text-[#F3F4F6]">
                        {acc.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#9CA3AF]">{acc.campus}</td>
                    <td className="py-4 px-4 font-mono text-[#3B82F6]">
                      {acc.assignedBatch}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`font-mono text-xs px-2.5 py-1 rounded border ${
                          acc.status === 'APPROVED'
                            ? 'bg-[#0A0B0E] text-[#F3F4F6] border-[#232734]'
                            : acc.status === 'PENDING'
                            ? 'bg-brand-champagne/15 text-brand-champagne border-brand-champagne/40'
                            : 'bg-[#0A0B0E] text-[#9CA3AF] border-[#232734]'
                        }`}
                      >
                        {acc.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() =>
                            handleSetAccountStatus(
                              acc.id,
                              acc.fullName,
                              'APPROVED'
                            )
                          }
                          disabled={acc.status === 'APPROVED'}
                          className={`px-3.5 py-2 rounded-md text-xs md:text-sm font-semibold transition-colors ${
                            acc.status === 'APPROVED'
                              ? 'bg-[#0A0B0E] text-[#9CA3AF] border border-[#232734] opacity-50 cursor-not-allowed'
                              : 'bg-brand-champagne hover:bg-[#F1C48F] text-[#0A0B0E]'
                          }`}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleSetAccountStatus(
                              acc.id,
                              acc.fullName,
                              'SUSPENDED'
                            )
                          }
                          disabled={acc.status === 'SUSPENDED'}
                          className={`px-3.5 py-2 rounded-md text-xs md:text-sm font-medium border transition-colors ${
                            acc.status === 'SUSPENDED'
                              ? 'bg-[#0A0B0E] text-[#9CA3AF] border-[#232734] opacity-50 cursor-not-allowed'
                              : 'bg-[#0A0B0E] hover:border-brand-champagne text-[#F3F4F6] border-[#232734]'
                          }`}
                        >
                          Suspend
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Manual Parent ID to Student ID Linker */}
        <div className="bg-[#13161F] border border-[#232734] rounded-lg p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#232734] pb-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-brand-champagne uppercase tracking-wider">
                <Link2 className="w-4 h-4" />
                Manual Relational Mapping (ParentStudentLink)
              </span>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6]">
                Link Parent ID to Student ID
              </h2>
            </div>
            <span className="font-mono text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
              Multi-Child Guardian Support
            </span>
          </div>

          <form
            onSubmit={handleLinkParentStudentId}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
          >
            <div className="md:col-span-5 space-y-2">
              <label className="block text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                Parent ID
              </label>
              <input
                type="text"
                required
                value={parentIdInput}
                onChange={(e) => setParentIdInput(e.target.value)}
                placeholder="e.g., PAR-KA-2026-0119"
                className="w-full bg-[#0A0B0E] border border-[#232734] rounded-md px-4 py-2.5 text-base font-mono text-[#F3F4F6] focus:outline-none focus:border-brand-champagne"
              />
            </div>
            <div className="md:col-span-5 space-y-2">
              <label className="block text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                Student ID
              </label>
              <input
                type="text"
                required
                value={studentIdInput}
                onChange={(e) => setStudentIdInput(e.target.value)}
                placeholder="e.g., STU-SBO-2027-0195"
                className="w-full bg-[#0A0B0E] border border-[#232734] rounded-md px-4 py-2.5 text-base font-mono text-[#F3F4F6] focus:outline-none focus:border-brand-champagne"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full px-4 py-3 rounded-md bg-brand-champagne hover:bg-[#F1C48F] text-[#0A0B0E] text-sm font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Link IDs</span>
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {parentStudentLinks.map((lnk) => (
              <div
                key={lnk.id}
                className="bg-[#0A0B0E] border border-[#232734] rounded-md p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs md:text-sm font-medium text-brand-champagne">
                    {lnk.parentId} → {lnk.studentId}
                  </span>
                  <span className="font-mono text-xs text-[#9CA3AF]">
                    {lnk.linkedAt}
                  </span>
                </div>
                <p className="text-base font-semibold text-[#F3F4F6]">
                  {lnk.parentName} → {lnk.studentName}
                </p>
                <p className="font-mono text-xs text-[#3B82F6]">
                  Batch: {lnk.batchCode}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
