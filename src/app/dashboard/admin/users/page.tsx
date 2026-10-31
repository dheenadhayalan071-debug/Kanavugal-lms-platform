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
    <div className="bg-[#080808] text-[#F5F3EF]">
      {toastMessage && (
        <div className="fixed bottom-8 right-6 z-50 max-w-md bg-[#111111] border border-[#FF4B00] rounded-lg px-5 py-4 shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#FF4B00] shrink-0" />
          <p className="text-base text-[#F5F3EF]">{toastMessage}</p>
        </div>
      )}

      <header className="px-6 lg:px-10 py-8 border-b border-[#292929] bg-[#080808] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-[#FF4B00] uppercase tracking-wider">
            <UserCheck className="w-4 h-4" />
            <span>Identity & Guardian Governance · /dashboard/admin/users</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F3EF]">
            User Management & Parent–Student ID Linking
          </h1>
          <p className="text-base text-[#A1A1AA]">
            Approve or suspend Student and Teacher accounts and manually link a
            Parent ID to a Student ID
          </p>
        </div>
      </header>

      <div className="px-6 lg:px-10 py-10 space-y-10 max-w-7xl">
        {/* Approve / Suspend Students & Teachers Table */}
        <div className="bg-[#111111] border border-[#292929] rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-[#292929] flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F5F3EF]">
              Student & Teacher Account Governance (Approve / Suspend)
            </h2>
            <span className="font-mono text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider">
              {userApprovals.length} Accounts
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#292929] bg-[#080808] text-xs md:text-sm font-medium uppercase tracking-wider text-[#A1A1AA]">
                  <th className="py-4 px-6">User / ID</th>
                  <th className="py-4 px-4">Role</th>
                  <th className="py-4 px-4">Campus</th>
                  <th className="py-4 px-4">Batch</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Governance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#292929] text-base">
                {userApprovals.map((acc) => (
                  <tr
                    key={acc.id}
                    className="hover:bg-[#080808]/60 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <p className="font-semibold text-[#F5F3EF]">
                        {acc.fullName}
                      </p>
                      <p className="text-[#A1A1AA] font-mono text-xs md:text-sm">
                        {acc.userCode} · {acc.email}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#080808] border border-[#292929] text-[#F5F3EF]">
                        {acc.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#A1A1AA]">{acc.campus}</td>
                    <td className="py-4 px-4 font-mono text-[#FF4B00]">
                      {acc.assignedBatch}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`font-mono text-xs px-2.5 py-1 rounded border ${
                          acc.status === 'APPROVED'
                            ? 'bg-[#080808] text-[#F5F3EF] border-[#292929]'
                            : acc.status === 'PENDING'
                            ? 'bg-[#FF4B00]/15 text-[#FF4B00] border-[#FF4B00]/40'
                            : 'bg-[#080808] text-[#A1A1AA] border-[#292929]'
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
                          className={`px-3.5 py-2 rounded-md text-xs md:text-sm font-medium transition-colors ${
                            acc.status === 'APPROVED'
                              ? 'bg-[#080808] text-[#A1A1AA] border border-[#292929] opacity-50 cursor-not-allowed'
                              : 'bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF]'
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
                              ? 'bg-[#080808] text-[#A1A1AA] border-[#292929] opacity-50 cursor-not-allowed'
                              : 'bg-[#080808] hover:border-[#FF4B00] text-[#F5F3EF] border-[#292929]'
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
        <div className="bg-[#111111] border border-[#292929] rounded-lg p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#292929] pb-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-[#FF4B00] uppercase tracking-wider">
                <Link2 className="w-4 h-4" />
                Manual Relational Mapping (ParentStudentLink)
              </span>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F5F3EF]">
                Link Parent ID to Student ID
              </h2>
            </div>
            <span className="font-mono text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider">
              Multi-Child Guardian Support
            </span>
          </div>

          <form
            onSubmit={handleLinkParentStudentId}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
          >
            <div className="md:col-span-5 space-y-2">
              <label className="block text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider">
                Parent ID
              </label>
              <input
                type="text"
                required
                value={parentIdInput}
                onChange={(e) => setParentIdInput(e.target.value)}
                placeholder="e.g., PAR-KA-2026-0119"
                className="w-full bg-[#080808] border border-[#292929] rounded-md px-4 py-2.5 text-base font-mono text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
              />
            </div>
            <div className="md:col-span-5 space-y-2">
              <label className="block text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider">
                Student ID
              </label>
              <input
                type="text"
                required
                value={studentIdInput}
                onChange={(e) => setStudentIdInput(e.target.value)}
                placeholder="e.g., STU-SBO-2027-0195"
                className="w-full bg-[#080808] border border-[#292929] rounded-md px-4 py-2.5 text-base font-mono text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full px-4 py-3 rounded-md bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] text-sm font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
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
                className="bg-[#080808] border border-[#292929] rounded-md p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs md:text-sm font-medium text-[#FF4B00]">
                    {lnk.parentId} → {lnk.studentId}
                  </span>
                  <span className="font-mono text-xs text-[#A1A1AA]">
                    {lnk.linkedAt}
                  </span>
                </div>
                <p className="text-base font-semibold text-[#F5F3EF]">
                  {lnk.parentName} → {lnk.studentName}
                </p>
                <p className="font-mono text-xs text-[#A1A1AA]">
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
