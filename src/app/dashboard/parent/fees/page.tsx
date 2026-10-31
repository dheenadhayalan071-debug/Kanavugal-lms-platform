import React, { useState } from 'react';
import { Receipt, Download, CheckCircle2 } from 'lucide-react';
import { LINKED_CHILDREN } from '../data';

export const ParentFeesPage: React.FC = () => {
  const [selectedChildId, setSelectedChildId] = useState<string>(
    LINKED_CHILDREN[0].id
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeChild =
    LINKED_CHILDREN.find((c) => c.id === selectedChildId) || LINKED_CHILDREN[0];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="bg-[#0A0B0E] text-[#F3F4F6]">
      {toastMessage && (
        <div className="fixed bottom-8 right-6 z-50 max-w-md bg-[#13161F] border border-brand-champagne rounded-lg px-4 py-3 shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-brand-champagne shrink-0" />
          <p className="text-xs text-[#F3F4F6]">{toastMessage}</p>
        </div>
      )}

      <header className="px-6 lg:px-10 py-6 border-b border-[#232734] bg-[#11131A] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-brand-champagne font-medium">
            <Receipt className="w-3.5 h-3.5" />
            <span>Read-Only Fee Ledger · /dashboard/parent/fees</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F4F6]">
            Academic Fee Status & Official Receipts
          </h1>
          <p className="text-xs text-[#9CA3AF]">
            Verified offline Cash, UPI, and NEFT tuition receipts for{' '}
            {activeChild.fullName}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {LINKED_CHILDREN.map((child) => {
            const isSelected = child.id === activeChild.id;
            return (
              <button
                key={child.id}
                type="button"
                onClick={() => setSelectedChildId(child.id)}
                className={`px-3.5 py-2 rounded-md text-xs font-semibold border transition-colors ${
                  isSelected
                    ? 'bg-brand-champagne text-[#0A0B0E] border-brand-champagne'
                    : 'bg-[#13161F] text-[#9CA3AF] border-[#232734] hover:text-[#F3F4F6]'
                }`}
              >
                {child.fullName} ({child.campus})
              </button>
            );
          })}
        </div>
      </header>

      <div className="px-6 lg:px-10 py-8 max-w-4xl">
        <div className="bg-[#13161F] border border-[#232734] rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#232734] pb-4">
            <div>
              <p className="text-xs text-[#9CA3AF]">
                Scholar: {activeChild.fullName} ({activeChild.rollNumber})
              </p>
              <h2 className="text-lg font-semibold text-[#F3F4F6] mt-1">
                {activeChild.feeSummary.termTitle}
              </h2>
            </div>
            <span className="font-mono text-xs px-3 py-1 rounded bg-[#0A0B0E] border border-[#232734] text-brand-champagne">
              {activeChild.feeSummary.status}
            </span>
          </div>

          <div className="bg-[#0A0B0E] border border-[#232734] rounded-md p-5 space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-[#232734]">
              <span className="text-[#9CA3AF]">Official Receipt Number</span>
              <span className="font-mono text-[#3B82F6]">
                {activeChild.feeSummary.receiptNo}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#232734]">
              <span className="text-[#9CA3AF]">Campus Branch</span>
              <span className="text-[#F3F4F6]">{activeChild.campus}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#232734]">
              <span className="text-[#9CA3AF]">Total Term Tuition Fee</span>
              <span className="font-mono text-[#F3F4F6]">
                ₹{activeChild.feeSummary.totalFee.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#232734]">
              <span className="text-[#9CA3AF]">Amount Paid</span>
              <span className="font-mono font-semibold text-brand-champagne">
                ₹{activeChild.feeSummary.paidAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#232734]">
              <span className="text-[#9CA3AF]">Balance Due</span>
              <span className="font-mono text-[#F3F4F6]">
                ₹{activeChild.feeSummary.balanceDue.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#9CA3AF]">Payment Mode & Date</span>
              <span className="text-[#F3F4F6]">
                {activeChild.feeSummary.paymentMethod} ·{' '}
                {activeChild.feeSummary.paidOn}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              triggerToast(
                `Downloading official fee receipt ${activeChild.feeSummary.receiptNo}.pdf...`
              )
            }
            className="w-full py-2.5 rounded-md bg-brand-champagne hover:bg-[#F1C48F] text-[#0A0B0E] text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>
              Download Official Receipt ({activeChild.feeSummary.receiptNo})
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentFeesPage;
