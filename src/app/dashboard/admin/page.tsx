import React, { useState } from 'react';
import {
  MapPin,
  Megaphone,
  Send,
  CheckCircle2,
  Users,
  Layers,
  Receipt,
  ArrowRight,
} from 'lucide-react';
import { useLms } from '../../../context/LmsContext';
import { useMockGlobal } from '../../../context/MockGlobalContext';

export const AdminDashboardPage: React.FC = () => {
  const { navigate } = useLms();
  const {
    globalAnnouncements,
    pushGlobalAnnouncement,
    userApprovals,
  } = useMockGlobal();

  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [announcementBranch, setAnnouncementBranch] = useState<
    'ALL_BRANCHES' | 'SBO_COLONY' | 'ANAIYUR'
  >('ALL_BRANCHES');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const pendingApprovalsCount = userApprovals.filter(
    (u) => u.status === 'PENDING'
  ).length;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePushAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementTitle.trim() || !announcementMessage.trim()) return;
    const item = pushGlobalAnnouncement({
      title: announcementTitle.trim(),
      message: announcementMessage.trim(),
      targetBranches: announcementBranch,
    });
    setAnnouncementTitle('');
    setAnnouncementMessage('');
    triggerToast(
      `Broadcast pushed to ${item.targetBranches.replace('_', ' ')}: "${item.title}"`
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
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider">
            <span>Global Administration Overview</span>
            <span>•</span>
            <span className="font-mono text-[#F5F3EF]">ID: KA-ADM-001</span>
            <span>•</span>
            <span className="text-[#FF4B00]">
              SBO Colony & Anaiyur Governance
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F3EF]">
            Campus Branch Metrics & Broadcasts
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard/admin/users')}
            className="px-4 py-2.5 rounded-md bg-[#111111] hover:bg-[#181818] text-[#F5F3EF] border border-[#292929] hover:border-[#FF4B00] text-sm font-medium inline-flex items-center gap-2 transition-colors"
          >
            <Users className="w-4 h-4 text-[#FF4B00]" />
            <span>Approve Pending Users ({pendingApprovalsCount})</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/dashboard/admin/batches')}
            className="px-4 py-2.5 rounded-md bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] text-sm font-medium inline-flex items-center gap-2 transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span>Create New Batch</span>
          </button>
        </div>
      </header>

      <div className="px-6 lg:px-10 py-10 space-y-12 max-w-7xl">
        {/* Branch-Level Performance & Capacity (SBO Colony vs. Anaiyur) */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F5F3EF]">
              Branch-Level Performance & Capacity (SBO Colony vs. Anaiyur)
            </h2>
            <p className="text-base text-[#A1A1AA]">
              Live enrollment, batch utilization, attendance, and fee collection
              across both Madurai campuses
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* SBO Colony Campus Card */}
            <div className="bg-[#111111] border border-[#292929] rounded-lg p-6 md:p-8 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs md:text-sm font-medium text-[#FF4B00] uppercase tracking-wider px-2.5 py-1 rounded bg-[#080808] border border-[#292929]">
                    <MapPin className="w-3.5 h-3.5" />
                    BRANCH: SBO_COLONY
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F5F3EF] pt-1">
                    SBO Colony Main Campus, Madurai
                  </h3>
                  <p className="text-base text-[#A1A1AA]">
                    Plot 42, SBO Colony First Street, Bypass Road
                  </p>
                </div>
                <span className="font-mono text-xs md:text-sm font-medium text-[#F5F3EF] bg-[#080808] px-3 py-1.5 rounded border border-[#292929] uppercase tracking-wider">
                  14 Active Batches
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#292929]">
                <div className="bg-[#080808] border border-[#292929] rounded-md p-4 space-y-1.5">
                  <p className="text-xs font-medium text-[#A1A1AA] uppercase tracking-wider">
                    Enrolled Scholars
                  </p>
                  <p className="font-mono text-3xl xl:text-4xl font-bold tracking-tight text-[#FF4B00]">
                    684
                  </p>
                </div>
                <div className="bg-[#080808] border border-[#292929] rounded-md p-4 space-y-1.5">
                  <p className="text-xs font-medium text-[#A1A1AA] uppercase tracking-wider">
                    Avg Attendance
                  </p>
                  <p className="font-mono text-3xl xl:text-4xl font-bold tracking-tight text-[#FF4B00]">
                    95.8%
                  </p>
                </div>
                <div className="bg-[#080808] border border-[#292929] rounded-md p-4 space-y-1.5">
                  <p className="text-xs font-medium text-[#A1A1AA] uppercase tracking-wider">
                    Term Fee Cleared
                  </p>
                  <p className="font-mono text-3xl xl:text-4xl font-bold tracking-tight text-[#FF4B00]">
                    92.4%
                  </p>
                </div>
              </div>
            </div>

            {/* Anaiyur Campus Card */}
            <div className="bg-[#111111] border border-[#292929] rounded-lg p-6 md:p-8 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs md:text-sm font-medium text-[#FF4B00] uppercase tracking-wider px-2.5 py-1 rounded bg-[#080808] border border-[#292929]">
                    <MapPin className="w-3.5 h-3.5" />
                    BRANCH: ANAIYUR
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F5F3EF] pt-1">
                    Anaiyur Academic Centre, Madurai
                  </h3>
                  <p className="text-base text-[#A1A1AA]">
                    North Main Road, Near Bus Terminus, Anaiyur
                  </p>
                </div>
                <span className="font-mono text-xs md:text-sm font-medium text-[#F5F3EF] bg-[#080808] px-3 py-1.5 rounded border border-[#292929] uppercase tracking-wider">
                  10 Active Batches
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#292929]">
                <div className="bg-[#080808] border border-[#292929] rounded-md p-4 space-y-1.5">
                  <p className="text-xs font-medium text-[#A1A1AA] uppercase tracking-wider">
                    Enrolled Scholars
                  </p>
                  <p className="font-mono text-3xl xl:text-4xl font-bold tracking-tight text-[#FF4B00]">
                    442
                  </p>
                </div>
                <div className="bg-[#080808] border border-[#292929] rounded-md p-4 space-y-1.5">
                  <p className="text-xs font-medium text-[#A1A1AA] uppercase tracking-wider">
                    Avg Attendance
                  </p>
                  <p className="font-mono text-3xl xl:text-4xl font-bold tracking-tight text-[#FF4B00]">
                    94.6%
                  </p>
                </div>
                <div className="bg-[#080808] border border-[#292929] rounded-md p-4 space-y-1.5">
                  <p className="text-xs font-medium text-[#A1A1AA] uppercase tracking-wider">
                    Term Fee Cleared
                  </p>
                  <p className="font-mono text-3xl xl:text-4xl font-bold tracking-tight text-[#FF4B00]">
                    89.5%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Announcements Manager + Live Broadcast Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Announcements Manager */}
          <section className="lg:col-span-6 bg-[#111111] border border-[#292929] rounded-lg p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#292929] pb-4">
              <div className="flex items-center gap-2.5">
                <Megaphone className="w-5 h-5 text-[#FF4B00]" />
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F5F3EF]">
                  Announcements Manager
                </h2>
              </div>
              <span className="font-mono text-xs md:text-sm font-medium text-[#FF4B00] uppercase tracking-wider">
                GLOBAL DISPATCH
              </span>
            </div>

            <form onSubmit={handlePushAnnouncement} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="admin-announcement-title"
                  className="block text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider"
                >
                  Notification Headline
                </label>
                <input
                  id="admin-announcement-title"
                  type="text"
                  required
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                  placeholder="e.g., NEET Full-Length CBT #06 Schedule Released"
                  className="w-full bg-[#080808] border border-[#292929] rounded-md px-4 py-3 text-base text-[#F5F3EF] placeholder-[#A1A1AA] focus:outline-none focus:border-[#FF4B00]"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="admin-announcement-branch"
                  className="block text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider"
                >
                  Target Branches
                </label>
                <select
                  id="admin-announcement-branch"
                  value={announcementBranch}
                  onChange={(e) =>
                    setAnnouncementBranch(
                      e.target.value as
                        | 'ALL_BRANCHES'
                        | 'SBO_COLONY'
                        | 'ANAIYUR'
                    )
                  }
                  className="w-full bg-[#080808] border border-[#292929] rounded-md px-4 py-3 text-base text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                >
                  <option value="ALL_BRANCHES">
                    All Branches (SBO Colony & Anaiyur)
                  </option>
                  <option value="SBO_COLONY">SBO Colony Campus Only</option>
                  <option value="ANAIYUR">Anaiyur Campus Only</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="admin-announcement-message"
                  className="block text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider"
                >
                  Broadcast Message
                </label>
                <textarea
                  id="admin-announcement-message"
                  rows={3}
                  required
                  value={announcementMessage}
                  onChange={(e) => setAnnouncementMessage(e.target.value)}
                  placeholder="Enter global circular for students, parents, and faculty..."
                  className="w-full bg-[#080808] border border-[#292929] rounded-md px-4 py-3 text-base text-[#F5F3EF] placeholder-[#A1A1AA] focus:outline-none focus:border-[#FF4B00]"
                />
              </div>

              <button
                type="submit"
                className="w-full px-5 py-3 rounded-md bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] text-base font-semibold inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Push Global Notification</span>
              </button>
            </form>
          </section>

          {/* Recent Broadcasts & Module Shortcuts */}
          <section className="lg:col-span-6 bg-[#111111] border border-[#292929] rounded-lg p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F5F3EF] border-b border-[#292929] pb-4">
                Recent Global Broadcasts ({globalAnnouncements.length})
              </h3>
              <div className="space-y-3">
                {globalAnnouncements.map((ann) => (
                  <div
                    key={ann.id}
                    className="bg-[#080808] border border-[#292929] rounded-md p-5 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs md:text-sm font-medium uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#111111] border border-[#292929] text-[#FF4B00]">
                        {ann.targetBranches}
                      </span>
                      <span className="font-mono text-xs md:text-sm font-medium text-[#A1A1AA] uppercase tracking-wider">
                        {ann.publishedAt}
                      </span>
                    </div>
                    <p className="text-base font-semibold text-[#F5F3EF]">
                      {ann.title}
                    </p>
                    <p className="text-base text-[#A1A1AA] leading-relaxed">
                      {ann.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#292929] flex items-center justify-between">
              <span className="text-base text-[#A1A1AA]">
                Need to log a desk fee receipt?
              </span>
              <button
                type="button"
                onClick={() => navigate('/dashboard/admin/finance')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF4B00] hover:underline"
              >
                <Receipt className="w-4 h-4" />
                <span>Open Finance Tab</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
