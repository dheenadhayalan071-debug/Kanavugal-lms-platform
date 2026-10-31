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
    <div className="bg-[#0A0B0E] text-[#F3F4F6]">
      {toastMessage && (
        <div className="fixed bottom-8 right-6 z-50 max-w-md bg-[#13161F] border border-brand-champagne rounded-lg px-5 py-4 shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-brand-champagne shrink-0" />
          <p className="text-base text-[#F3F4F6]">{toastMessage}</p>
        </div>
      )}

      <header className="px-6 lg:px-10 py-8 border-b border-[#232734] bg-[#11131A] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
            <span>Global Administration Overview</span>
            <span>•</span>
            <span className="font-mono text-[#3B82F6]">ID: KA-ADM-001</span>
            <span>•</span>
            <span className="text-brand-champagne">
              SBO Colony & Anaiyur Governance
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F4F6]">
            Campus Branch Metrics & Broadcasts
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard/admin/users')}
            className="px-4 py-2.5 rounded-md bg-[#13161F] hover:bg-[#191D28] text-[#F3F4F6] border border-[#232734] hover:border-brand-champagne text-sm font-medium inline-flex items-center gap-2 transition-colors"
          >
            <Users className="w-4 h-4 text-brand-champagne" />
            <span>Approve Pending Users ({pendingApprovalsCount})</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/dashboard/admin/batches')}
            className="px-4 py-2.5 rounded-md bg-brand-champagne hover:bg-[#F1C48F] text-[#0A0B0E] text-sm font-semibold inline-flex items-center gap-2 transition-colors"
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
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6]">
              Branch-Level Performance & Capacity (SBO Colony vs. Anaiyur)
            </h2>
            <p className="text-base text-[#9CA3AF]">
              Live enrollment, batch utilization, attendance, and fee collection
              across both Madurai campuses
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* SBO Colony Campus Card */}
            <div className="bg-[#13161F] border border-[#232734] rounded-lg p-6 md:p-8 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs md:text-sm font-medium text-brand-champagne uppercase tracking-wider px-2.5 py-1 rounded bg-[#0A0B0E] border border-[#232734]">
                    <MapPin className="w-3.5 h-3.5" />
                    BRANCH: SBO_COLONY
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6] pt-1">
                    SBO Colony Main Campus, Madurai
                  </h3>
                  <p className="text-base text-[#9CA3AF]">
                    Plot 42, SBO Colony First Street, Bypass Road
                  </p>
                </div>
                <span className="font-mono text-xs md:text-sm font-medium text-[#3B82F6] bg-[#0A0B0E] px-3 py-1.5 rounded border border-[#232734] uppercase tracking-wider">
                  14 Active Batches
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#232734]">
                <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-4 space-y-1.5">
                  <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                    Enrolled Scholars
                  </p>
                  <p className="font-mono text-3xl xl:text-4xl font-bold tracking-tight text-brand-champagne">
                    684
                  </p>
                </div>
                <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-4 space-y-1.5">
                  <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                    Avg Attendance
                  </p>
                  <p className="font-mono text-3xl xl:text-4xl font-bold tracking-tight text-brand-champagne">
                    95.8%
                  </p>
                </div>
                <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-4 space-y-1.5">
                  <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                    Term Fee Cleared
                  </p>
                  <p className="font-mono text-3xl xl:text-4xl font-bold tracking-tight text-brand-champagne">
                    92.4%
                  </p>
                </div>
              </div>
            </div>

            {/* Anaiyur Campus Card */}
            <div className="bg-[#13161F] border border-[#232734] rounded-lg p-6 md:p-8 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs md:text-sm font-medium text-brand-champagne uppercase tracking-wider px-2.5 py-1 rounded bg-[#0A0B0E] border border-[#232734]">
                    <MapPin className="w-3.5 h-3.5" />
                    BRANCH: ANAIYUR
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6] pt-1">
                    Anaiyur Academic Centre, Madurai
                  </h3>
                  <p className="text-base text-[#9CA3AF]">
                    North Main Road, Near Bus Terminus, Anaiyur
                  </p>
                </div>
                <span className="font-mono text-xs md:text-sm font-medium text-[#3B82F6] bg-[#0A0B0E] px-3 py-1.5 rounded border border-[#232734] uppercase tracking-wider">
                  10 Active Batches
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#232734]">
                <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-4 space-y-1.5">
                  <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                    Enrolled Scholars
                  </p>
                  <p className="font-mono text-3xl xl:text-4xl font-bold tracking-tight text-brand-champagne">
                    442
                  </p>
                </div>
                <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-4 space-y-1.5">
                  <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                    Avg Attendance
                  </p>
                  <p className="font-mono text-3xl xl:text-4xl font-bold tracking-tight text-brand-champagne">
                    94.6%
                  </p>
                </div>
                <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-4 space-y-1.5">
                  <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                    Term Fee Cleared
                  </p>
                  <p className="font-mono text-3xl xl:text-4xl font-bold tracking-tight text-brand-champagne">
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
          <section className="lg:col-span-6 bg-[#13161F] border border-[#232734] rounded-lg p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#232734] pb-4">
              <div className="flex items-center gap-2.5">
                <Megaphone className="w-5 h-5 text-brand-champagne" />
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6]">
                  Announcements Manager
                </h2>
              </div>
              <span className="font-mono text-xs md:text-sm font-medium text-brand-champagne uppercase tracking-wider">
                GLOBAL DISPATCH
              </span>
            </div>

            <form onSubmit={handlePushAnnouncement} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="admin-announcement-title"
                  className="block text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider"
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
                  className="w-full bg-[#0A0B0E] border border-[#232734] rounded-md px-4 py-3 text-base text-[#F3F4F6] placeholder-[#9CA3AF] focus:outline-none focus:border-brand-champagne"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="admin-announcement-branch"
                  className="block text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider"
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
                  className="w-full bg-[#0A0B0E] border border-[#232734] rounded-md px-4 py-3 text-base text-[#F3F4F6] focus:outline-none focus:border-brand-champagne"
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
                  className="block text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider"
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
                  className="w-full bg-[#0A0B0E] border border-[#232734] rounded-md px-4 py-3 text-base text-[#F3F4F6] placeholder-[#9CA3AF] focus:outline-none focus:border-brand-champagne"
                />
              </div>

              <button
                type="submit"
                className="w-full px-5 py-3 rounded-md bg-brand-champagne hover:bg-[#F1C48F] text-[#0A0B0E] text-base font-semibold inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Push Global Notification</span>
              </button>
            </form>
          </section>

          {/* Recent Broadcasts & Module Shortcuts */}
          <section className="lg:col-span-6 bg-[#13161F] border border-[#232734] rounded-lg p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6] border-b border-[#232734] pb-4">
                Recent Global Broadcasts ({globalAnnouncements.length})
              </h3>
              <div className="space-y-3">
                {globalAnnouncements.map((ann) => (
                  <div
                    key={ann.id}
                    className="bg-[#0A0B0E] border border-[#232734] rounded-md p-5 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs md:text-sm font-medium uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#13161F] border border-[#232734] text-brand-champagne">
                        {ann.targetBranches}
                      </span>
                      <span className="font-mono text-xs md:text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
                        {ann.publishedAt}
                      </span>
                    </div>
                    <p className="text-base font-semibold text-[#F3F4F6]">
                      {ann.title}
                    </p>
                    <p className="text-base text-[#9CA3AF] leading-relaxed">
                      {ann.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#232734] flex items-center justify-between">
              <span className="text-base text-[#9CA3AF]">
                Need to log a desk fee receipt?
              </span>
              <button
                type="button"
                onClick={() => navigate('/dashboard/admin/finance')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3B82F6] hover:text-brand-champagne transition-colors"
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
