import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  CreditCard,
  Megaphone,
  Plus,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react';
import { useLms } from '../../context/LmsContext';
import {
  AcademicProgramme,
  ApprovalStatus,
  Role,
} from '../../types/prisma';

export type AdminTab =
  | 'approvals'
  | 'users'
  | 'branches'
  | 'payments'
  | 'announcements';

export const AdminDashboardView: React.FC<{
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}> = ({ activeTab }) => {
  const {
    users,
    branches,
    batches,
    feeRecords,
    announcements,
    approveStudent,
    createAccountByAdmin,
    linkChildToParent,
    addBranch,
    recordOfflinePayment,
    postAnnouncement,
  } = useLms();

  // Approval state per pending student
  const [selectedBranchForApproval, setSelectedBranchForApproval] =
    useState<string>('br_sbo');
  const [selectedBatchForApproval, setSelectedBatchForApproval] =
    useState<string>('batch_sbo_neet');
  const [selectedTeacherForApproval, setSelectedTeacherForApproval] =
    useState<string>('Dr. Ananya Velu');

  // Admin Create Account form state
  const [newAccName, setNewAccName] = useState<string>('');
  const [newAccEmail, setNewAccEmail] = useState<string>('');
  const [newAccRole, setNewAccRole] = useState<Role>(Role.STUDENT);
  const [newAccProg, setNewAccProg] =
    useState<AcademicProgramme>('NEET Preparation');
  const [newAccBranch, setNewAccBranch] = useState<string>('br_sbo');
  const [accCreatedBanner, setAccCreatedBanner] = useState<boolean>(false);

  // New Branch form state
  const [branchCode, setBranchCode] = useState<string>('KKNAGAR');
  const [branchName, setBranchName] = useState<string>('KK Nagar South Campus');
  const [branchCity, setBranchCity] = useState<string>('Madurai');
  const [branchAddress, setBranchAddress] = useState<string>(
    '80 Feet Road, KK Nagar, Madurai 625020'
  );

  // Announcement form state
  const [annTitle, setAnnTitle] = useState<string>('');
  const [annMessage, setAnnMessage] = useState<string>('');
  const [annScope, setAnnScope] = useState<
    'ACADEMY_WIDE' | 'BRANCH_SPECIFIC' | 'CLASS_SPECIFIC' | 'INDIVIDUAL'
  >('ACADEMY_WIDE');
  const [annTarget, setAnnTarget] = useState<string>('All SBO & Anaiyur Batches');

  const pendingStudents = users.filter(
    (u) =>
      u.role === Role.STUDENT &&
      u.approvalStatus === ApprovalStatus.PENDING_APPROVAL
  );

  const approvedStudents = users.filter(
    (u) =>
      u.role === Role.STUDENT && u.approvalStatus === ApprovalStatus.APPROVED
  );

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccName.trim() || !newAccEmail.trim()) return;
    createAccountByAdmin({
      name: newAccName,
      email: newAccEmail,
      role: newAccRole,
      programme: newAccRole === Role.STUDENT ? newAccProg : undefined,
      branchId: newAccBranch,
      batchId: 'batch_sbo_neet',
    });
    setNewAccName('');
    setNewAccEmail('');
    setAccCreatedBanner(true);
    setTimeout(() => setAccCreatedBanner(false), 2500);
  };

  const handleAddBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchCode.trim() || !branchName.trim()) return;
    addBranch({
      code: branchCode.trim(),
      name: branchName.trim(),
      city: branchCity.trim(),
      address: branchAddress.trim(),
    });
    setBranchCode('');
    setBranchName('');
  };

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annMessage.trim()) return;
    postAnnouncement({
      title: annTitle.trim(),
      message: annMessage.trim(),
      scope: annScope,
      targetLabel: annTarget,
      authorName: 'Siddharth Narayanan (Admin)',
      authorRole: Role.ADMIN,
      isUrgent: true,
    });
    setAnnTitle('');
    setAnnMessage('');
  };

  return (
    <div className="space-y-10">
      {/* 1. STUDENT REGISTRATION APPROVAL WORKFLOW */}
      {activeTab === 'approvals' && (
        <section aria-label="Student Registration Approvals" className="space-y-6">
          <div>
            <div className="font-mono text-xs text-[#F2FF00]">
              ADMISSIONS GOVERNANCE · STUDENT VERIFICATION &amp; BATCH ASSIGNMENT
            </div>
            <h2 className="font-display text-2xl font-black text-[#E9E3D5] mt-1">
              PENDING STUDENT APPROVALS ({pendingStudents.length})
            </h2>
          </div>

          {pendingStudents.length === 0 ? (
            <div className="bg-zinc-950 border-2 border-[#E9E3D5] p-8 font-mono text-xs text-[#F2FF00]">
              ✓ All pending student registrations have been verified and assigned
              to SBO &amp; Anaiyur batches.
            </div>
          ) : (
            <div className="space-y-5">
              {pendingStudents.map((stu) => (
                <article
                  key={stu.id}
                  className="bg-zinc-950 border-2 border-[#F2FF00] p-6 sm:p-8 space-y-6 brutal-shadow-yellow"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                    <div>
                      <div className="font-mono text-xs text-[#FF0000] font-bold">
                        STATUS: PENDING ADMINISTRATOR VERIFICATION
                      </div>
                      <h3 className="font-display text-2xl font-black text-[#E9E3D5] mt-1">
                        {stu.name} ({stu.classGrade || 'Class 11'})
                      </h3>
                      <div className="font-mono text-xs text-zinc-300 mt-0.5">
                        Email: {stu.email} · Phone: {stu.phone || '+91 94430 88219'} ·
                        Requested Programme:{' '}
                        <strong className="text-[#F2FF00]">{stu.programme}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Step-by-Step Admin Assignment Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor={`branch-${stu.id}`}
                        className="block font-mono text-xs text-zinc-400 font-bold mb-1"
                      >
                        1. ASSIGN BRANCH
                      </label>
                      <select
                        id={`branch-${stu.id}`}
                        value={selectedBranchForApproval}
                        onChange={(e) =>
                          setSelectedBranchForApproval(e.target.value)
                        }
                        className="w-full px-3 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                      >
                        {branches.map((br) => (
                          <option key={br.id} value={br.id}>
                            {br.code} — {br.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor={`batch-${stu.id}`}
                        className="block font-mono text-xs text-zinc-400 font-bold mb-1"
                      >
                        2. ASSIGN BATCH
                      </label>
                      <select
                        id={`batch-${stu.id}`}
                        value={selectedBatchForApproval}
                        onChange={(e) =>
                          setSelectedBatchForApproval(e.target.value)
                        }
                        className="w-full px-3 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                      >
                        {batches.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name} ({b.programme})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor={`teacher-${stu.id}`}
                        className="block font-mono text-xs text-zinc-400 font-bold mb-1"
                      >
                        3. ASSIGN MENTOR TEACHER
                      </label>
                      <select
                        id={`teacher-${stu.id}`}
                        value={selectedTeacherForApproval}
                        onChange={(e) =>
                          setSelectedTeacherForApproval(e.target.value)
                        }
                        className="w-full px-3 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                      >
                        <option value="Dr. Ananya Velu">
                          Dr. Ananya Velu (Physics / JEE)
                        </option>
                        <option value="Dr. Karthikeyan Bose">
                          Dr. Karthikeyan Bose (Biology / NEET)
                        </option>
                        <option value="Prof. Vikramaditya Senthil">
                          Prof. Vikramaditya Senthil (Class 11–12)
                        </option>
                        <option value="Meenakshi Sundaram">
                          Meenakshi Sundaram (Classes 6–10)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        approveStudent(
                          stu.id,
                          selectedBranchForApproval,
                          selectedBatchForApproval,
                          selectedTeacherForApproval
                        )
                      }
                      className="px-6 py-3.5 bg-[#F2FF00] text-[#0D0D0D] font-mono text-xs font-bold border-2 border-[#E9E3D5] brutal-shadow-petrol hover:bg-[#173F46] hover:text-[#F2FF00] flex items-center gap-2 rounded-none cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve Student &amp; Grant Course Access</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Recently Approved Directory */}
          <div className="pt-6 border-t-2 border-zinc-800 space-y-4">
            <h3 className="font-display text-xl font-black text-[#E9E3D5]">
              VERIFIED &amp; ACTIVE STUDENTS ({approvedStudents.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {approvedStudents.map((stu) => (
                <div
                  key={stu.id}
                  className="bg-zinc-950 border border-zinc-800 p-4 flex items-center justify-between font-mono text-xs"
                >
                  <div>
                    <div className="text-[#E9E3D5] font-bold text-sm">
                      {stu.name}
                    </div>
                    <div className="text-zinc-400">
                      {stu.programme} · Mentor: {stu.assignedTeacherName}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-[#173F46] text-[#F2FF00] border border-[#F2FF00] font-bold">
                    APPROVED
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. ADMIN-CREATED ACCOUNTS & PARENT-CHILD LINKING */}
      {activeTab === 'users' && (
        <section aria-label="User Management" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form
              onSubmit={handleCreateAccount}
              className="lg:col-span-6 bg-zinc-950 border-2 border-[#E9E3D5] p-6 sm:p-8 space-y-4 brutal-shadow-yellow"
            >
              <div className="font-mono text-xs text-[#F2FF00] font-bold">
                DIRECT PROVISIONING · ADMIN-CREATED ACCOUNTS
              </div>
              <h3 className="font-display text-xl font-black text-[#E9E3D5]">
                CREATE PRE-APPROVED USER ACCOUNT
              </h3>

              {accCreatedBanner && (
                <div className="p-3 bg-[#173F46] border border-[#F2FF00] font-mono text-xs text-[#F2FF00] font-bold">
                  ✓ Account provisioned with immediate role access.
                </div>
              )}

              <div>
                <label
                  htmlFor="adm-name"
                  className="block font-mono text-xs text-zinc-300 font-bold mb-1"
                >
                  FULL NAME
                </label>
                <input
                  id="adm-name"
                  type="text"
                  value={newAccName}
                  onChange={(e) => setNewAccName(e.target.value)}
                  placeholder="e.g. Vigneshwaran R"
                  className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                />
              </div>

              <div>
                <label
                  htmlFor="adm-email"
                  className="block font-mono text-xs text-zinc-300 font-bold mb-1"
                >
                  EMAIL ADDRESS
                </label>
                <input
                  id="adm-email"
                  type="email"
                  value={newAccEmail}
                  onChange={(e) => setNewAccEmail(e.target.value)}
                  placeholder="vignesh@kanavugal.academy"
                  className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="adm-role"
                    className="block font-mono text-xs text-zinc-300 font-bold mb-1"
                  >
                    ROLE
                  </label>
                  <select
                    id="adm-role"
                    value={newAccRole}
                    onChange={(e) => setNewAccRole(e.target.value as Role)}
                    className="w-full px-3 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                  >
                    <option value={Role.STUDENT}>STUDENT</option>
                    <option value={Role.TEACHER}>TEACHER</option>
                    <option value={Role.PARENT}>PARENT</option>
                    <option value={Role.ADMIN}>ADMIN</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="adm-branch"
                    className="block font-mono text-xs text-zinc-300 font-bold mb-1"
                  >
                    BRANCH
                  </label>
                  <select
                    id="adm-branch"
                    value={newAccBranch}
                    onChange={(e) => setNewAccBranch(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0D0D0D] border-2 border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.code} — {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#F2FF00] text-[#0D0D0D] font-mono text-xs font-bold border-2 border-[#E9E3D5] rounded-none cursor-pointer"
              >
                + Provision Account Immediately
              </button>
            </form>

            {/* Right 6 cols: Directory & Parent-Child Linking */}
            <div className="lg:col-span-6 bg-zinc-950 border-2 border-[#E9E3D5] p-6 sm:p-8 space-y-4 brutal-shadow-petrol">
              <div className="font-mono text-xs text-[#F2FF00] font-bold">
                ROLE DIRECTORY ({users.length} TOTAL ACCOUNTS)
              </div>
              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                {users.map((u) => (
                  <div
                    key={u.id}
                    className="p-3 bg-[#0D0D0D] border border-zinc-800 flex items-center justify-between font-mono text-xs"
                  >
                    <div>
                      <div className="text-[#E9E3D5] font-bold">{u.name}</div>
                      <div className="text-zinc-400">{u.email}</div>
                    </div>
                    <span className="px-2 py-0.5 bg-[#173F46] text-[#F2FF00] border border-[#F2FF00] font-bold">
                      {u.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. MULTI-BRANCH & BATCH MANAGEMENT (SBO, ANAIYUR, + FUTURE) */}
      {activeTab === 'branches' && (
        <section aria-label="Multi-Branch Management" className="space-y-8">
          <div>
            <div className="font-mono text-xs text-[#F2FF00]">
              MULTI-BRANCH ARCHITECTURE · SBO &amp; ANAIYUR + SCALABLE EXPANSION
            </div>
            <h2 className="font-display text-2xl font-black text-[#E9E3D5] mt-1">
              ACTIVE ACADEMY BRANCHES ({branches.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {branches.map((br) => (
              <div
                key={br.id}
                className="bg-zinc-950 border-2 border-[#E9E3D5] p-6 space-y-3 brutal-shadow-yellow"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="px-2.5 py-1 bg-[#F2FF00] text-[#0D0D0D] font-bold">
                    BRANCH CODE: {br.code}
                  </span>
                  <span className="text-[#F2FF00] font-bold">ACTIVE CAMPUS</span>
                </div>
                <h3 className="font-display text-2xl font-black text-[#E9E3D5]">
                  {br.name} ({br.city})
                </h3>
                <p className="font-mono text-xs text-zinc-400">{br.address}</p>
                <div className="pt-2 border-t border-zinc-800 flex items-center gap-6 font-mono text-xs tabular-nums">
                  <span>
                    Students: <strong className="text-[#E9E3D5]">{br.studentCount}</strong>
                  </span>
                  <span>
                    Faculty: <strong className="text-[#F2FF00]">{br.teacherCount}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Future Branch Form */}
          <form
            onSubmit={handleAddBranch}
            className="bg-zinc-950 border-2 border-[#E9E3D5] p-6 space-y-4 max-w-2xl"
          >
            <div className="font-mono text-xs text-[#F2FF00] font-bold">
              EXPAND ACADEMY NETWORK · PROVISION NEW BRANCH
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="br-code"
                  className="block font-mono text-xs text-zinc-400 mb-1"
                >
                  BRANCH CODE
                </label>
                <input
                  id="br-code"
                  type="text"
                  value={branchCode}
                  onChange={(e) => setBranchCode(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0D0D0D] border border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                />
              </div>
              <div>
                <label
                  htmlFor="br-name"
                  className="block font-mono text-xs text-zinc-400 mb-1"
                >
                  CAMPUS NAME
                </label>
                <input
                  id="br-name"
                  type="text"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0D0D0D] border border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#173F46] text-[#F2FF00] font-mono text-xs font-bold border border-[#F2FF00] hover:bg-[#F2FF00] hover:text-[#0D0D0D] rounded-none cursor-pointer"
            >
              + Activate New Branch Campus
            </button>
          </form>
        </section>
      )}

      {/* 4. OFFLINE FEE PAYMENT TRACKING */}
      {activeTab === 'payments' && (
        <section aria-label="Offline Fee Ledger" className="space-y-6">
          <div>
            <div className="font-mono text-xs text-[#F2FF00]">
              OFFLINE FEE MANAGEMENT · CASH COUNTER, NEFT &amp; RECEIPT LEDGER
            </div>
            <h2 className="font-display text-2xl font-black text-[#E9E3D5] mt-1">
              STUDENT OFFLINE FEE RECORDS ({feeRecords.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {feeRecords.map((rec) => {
              const balance = rec.totalAnnualFee - rec.paidAmount;
              return (
                <div
                  key={rec.id}
                  className="bg-zinc-950 border-2 border-[#E9E3D5] p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-1.5 font-mono text-xs tabular-nums">
                    <div className="text-[#F2FF00] font-bold">
                      RECEIPT #{rec.receiptNumber} · BRANCH: {rec.branchCode} ·{' '}
                      {rec.paymentMode}
                    </div>
                    <h3 className="font-display text-xl font-black text-[#E9E3D5]">
                      {rec.studentName} — {rec.programme}
                    </h3>
                    <div className="text-zinc-300">
                      Annual Fee: ₹{rec.totalAnnualFee.toLocaleString()} · Paid
                      Offline:{' '}
                      <strong className="text-[#F2FF00]">
                        ₹{rec.paidAmount.toLocaleString()}
                      </strong>{' '}
                      · Balance: ₹{balance.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {balance > 0 ? (
                      <button
                        type="button"
                        onClick={() =>
                          recordOfflinePayment(
                            rec.id,
                            balance,
                            'CASH_COUNTER'
                          )
                        }
                        className="px-5 py-3 bg-[#F2FF00] text-[#0D0D0D] font-mono text-xs font-bold border-2 border-[#E9E3D5] rounded-none cursor-pointer"
                      >
                        Record Balance ₹{balance.toLocaleString()} Paid Offline
                      </button>
                    ) : (
                      <span className="px-4 py-2 bg-[#173F46] text-[#F2FF00] font-mono text-xs font-bold border border-[#F2FF00]">
                        ✓ FULL FEE PAID OFFLINE
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. ANNOUNCEMENTS & SUPABASE ROW-LEVEL SECURITY (RLS) */}
      {activeTab === 'announcements' && (
        <section aria-label="Announcements and RLS Security" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form
              onSubmit={handlePostAnnouncement}
              className="lg:col-span-6 bg-zinc-950 border-2 border-[#E9E3D5] p-6 space-y-4 brutal-shadow-yellow"
            >
              <div className="font-mono text-xs text-[#F2FF00] font-bold">
                COMMUNICATION ENGINE · MULTI-SCOPE NOTIFICATIONS
              </div>
              <h3 className="font-display text-xl font-black text-[#E9E3D5]">
                DISPATCH ACADEMY / BRANCH NOTIFICATION
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="ann-scope"
                    className="block font-mono text-xs text-zinc-400 mb-1"
                  >
                    SCOPE
                  </label>
                  <select
                    id="ann-scope"
                    value={annScope}
                    onChange={(e) =>
                      setAnnScope(
                        e.target.value as
                          | 'ACADEMY_WIDE'
                          | 'BRANCH_SPECIFIC'
                          | 'CLASS_SPECIFIC'
                          | 'INDIVIDUAL'
                      )
                    }
                    className="w-full px-3 py-2 bg-[#0D0D0D] border border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                  >
                    <option value="ACADEMY_WIDE">Academy-Wide</option>
                    <option value="BRANCH_SPECIFIC">
                      Branch-Specific (SBO / Anaiyur)
                    </option>
                    <option value="CLASS_SPECIFIC">
                      Class / Programme Specific
                    </option>
                    <option value="INDIVIDUAL">Individual Student/Parent</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="ann-target"
                    className="block font-mono text-xs text-zinc-400 mb-1"
                  >
                    TARGET AUDIENCE
                  </label>
                  <input
                    id="ann-target"
                    type="text"
                    value={annTarget}
                    onChange={(e) => setAnnTarget(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0D0D0D] border border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="ann-title"
                  className="block font-mono text-xs text-zinc-400 mb-1"
                >
                  HEADLINE
                </label>
                <input
                  id="ann-title"
                  type="text"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="e.g. SBO Campus Sunday NEET Mock Timing Update"
                  className="w-full px-3 py-2 bg-[#0D0D0D] border border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                />
              </div>

              <div>
                <label
                  htmlFor="ann-msg"
                  className="block font-mono text-xs text-zinc-400 mb-1"
                >
                  MESSAGE BODY
                </label>
                <textarea
                  id="ann-msg"
                  rows={2}
                  value={annMessage}
                  onChange={(e) => setAnnMessage(e.target.value)}
                  placeholder="Enter official announcement details..."
                  className="w-full p-3 bg-[#0D0D0D] border border-zinc-700 text-[#E9E3D5] font-mono text-xs rounded-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#F2FF00] text-[#0D0D0D] font-mono text-xs font-bold border-2 border-[#E9E3D5] rounded-none cursor-pointer"
              >
                Broadcast Notification
              </button>
            </form>

            {/* Database Permission System (Supabase RLS Policies) */}
            <div className="lg:col-span-6 bg-zinc-950 border-2 border-[#E9E3D5] p-6 space-y-4 brutal-shadow-petrol">
              <div className="font-mono text-xs text-[#FF0000] font-bold">
                DATABASE SECURITY · SUPABASE ROW-LEVEL SECURITY (RLS)
              </div>
              <h3 className="font-display text-xl font-black text-[#E9E3D5]">
                ENFORCED POSTGRESQL RLS POLICIES
              </h3>
              <p className="text-xs text-zinc-300">
                Security is enforced at the PostgreSQL database layer via signed
                JWT role claims—never by merely hiding buttons in the frontend.
              </p>
              <pre className="p-4 bg-[#0D0D0D] border border-zinc-800 font-mono text-[11px] text-[#E9E3D5] overflow-x-auto leading-relaxed">
                <code>{`-- 1. Students can only access courses after Admin Approval
CREATE POLICY "approved_student_course_read" ON "Course"
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM "User" u
    WHERE u.id = auth.uid()::text
      AND u."approvalStatus" = 'APPROVED'
  )
);

-- 2. Parents have strictly READ-ONLY access to linked children
CREATE POLICY "parent_readonly_child_submissions" ON "ExamSubmission"
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM "User" p
    WHERE p.id = auth.uid()::text
      AND p.role = 'PARENT'
      AND "ExamSubmission"."studentId" = ANY(p."childrenIds")
  )
);

-- 3. Exam Results hidden until Teacher sets resultsReleased = true
CREATE POLICY "student_view_released_results" ON "ExamSubmission"
FOR SELECT USING (
  "studentId" = auth.uid()::text AND EXISTS (
    SELECT 1 FROM "Exam" e
    WHERE e.id = "examId" AND e."resultsReleased" = true
  )
);`}</code>
              </pre>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
