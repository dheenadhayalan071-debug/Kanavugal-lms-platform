import React, { useState } from 'react';
import {
  Radio,
  Video,
  FileText,
  Upload,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

interface PublishedContentItem {
  id: string;
  type: 'PDF_MATERIAL' | 'VOD_LECTURE' | 'LIVE_ZOOM';
  title: string;
  batchCode: string;
  urlOrFile: string;
  publishedAt: string;
}

const INITIAL_CONTENT: PublishedContentItem[] = [
  {
    id: 'cnt_01',
    type: 'LIVE_ZOOM',
    title: 'Biot-Savart Law & Cyclotron Resonance Doubt Clinic',
    batchCode: 'SBO-JEE-2027-A',
    urlOrFile: 'https://zoom.us/j/98421104921',
    publishedAt: 'Today · 06:00 PM IST',
  },
  {
    id: 'cnt_02',
    type: 'PDF_MATERIAL',
    title: 'DPP #19: Moving Charges & Magnetic Force on Conductors',
    batchCode: 'SBO-JEE-2027-A',
    urlOrFile: 'DPP_19_Magnetic_Force_Solutions.pdf (3.1 MB)',
    publishedAt: 'Yesterday',
  },
  {
    id: 'cnt_03',
    type: 'VOD_LECTURE',
    title: 'L-18: Gauss Law in Dielectrics & Capacitor Energy Density',
    batchCode: 'SBO-NEET-2027-B',
    urlOrFile: 'https://youtu.be/KA-VOD-PHY-18',
    publishedAt: '29 Oct 2026',
  },
];

export const TeacherContentPage: React.FC = () => {
  const [contentItems, setContentItems] =
    useState<PublishedContentItem[]>(INITIAL_CONTENT);

  // Zoom form state
  const [zoomBatch, setZoomBatch] = useState('SBO-JEE-2027-A');
  const [zoomTopic, setZoomTopic] = useState(
    'Ampere Circuital Law & Solenoid Field Derivations'
  );
  const [zoomUrl, setZoomUrl] = useState('https://zoom.us/j/98421104921');

  // PDF / VOD upload form state
  const [uploadBatch, setUploadBatch] = useState('SBO-JEE-2027-A');
  const [uploadType, setUploadType] = useState<'PDF_MATERIAL' | 'VOD_LECTURE'>(
    'PDF_MATERIAL'
  );
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadResource, setUploadResource] = useState(
    'Chapter_04_Electrodynamics_Notes.pdf'
  );

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePublishZoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zoomTopic.trim() || !zoomUrl.trim()) return;
    const item: PublishedContentItem = {
      id: `cnt_${Date.now()}`,
      type: 'LIVE_ZOOM',
      title: zoomTopic.trim(),
      batchCode: zoomBatch,
      urlOrFile: zoomUrl.trim(),
      publishedAt: 'Just now',
    };
    setContentItems((prev) => [item, ...prev]);
    triggerToast(`Published scheduled Zoom URL for ${zoomBatch}.`);
  };

  const handleUploadContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadResource.trim()) return;
    const item: PublishedContentItem = {
      id: `cnt_${Date.now()}`,
      type: uploadType,
      title: uploadTitle.trim(),
      batchCode: uploadBatch,
      urlOrFile: uploadResource.trim(),
      publishedAt: 'Just now',
    };
    setContentItems((prev) => [item, ...prev]);
    setUploadTitle('');
    triggerToast(
      `Published ${
        uploadType === 'PDF_MATERIAL' ? 'PDF Study Material' : 'Recorded VOD'
      } "${item.title}" to ${item.batchCode}.`
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
            <FileText className="w-3.5 h-3.5" />
            <span>Curriculum Publishing Studio · /dashboard/teacher/content</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F3EF]">
            Course Content, PDFs & Live Zoom Links
          </h1>
          <p className="text-xs text-[#A1A1AA]">
            Upload chapter PDFs, publish recorded VOD lecture streams, and paste scheduled Zoom URLs
          </p>
        </div>
      </header>

      <div className="px-6 lg:px-10 py-8 space-y-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Paste Scheduled Zoom Link */}
          <form
            onSubmit={handlePublishZoom}
            className="lg:col-span-6 bg-[#111111] border border-[#292929] rounded-lg p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#292929] pb-3">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5F3EF]">
                <Radio className="w-4 h-4 text-[#FF4B00]" />
                Paste Scheduled Zoom URL
              </span>
              <span className="font-mono text-xs text-[#A1A1AA]">
                Meeting ID: 984 2110 4921
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-[#A1A1AA] mb-1">
                  Target Batch
                </label>
                <select
                  value={zoomBatch}
                  onChange={(e) => setZoomBatch(e.target.value)}
                  className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2 text-xs font-mono text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                >
                  <option value="SBO-JEE-2027-A">SBO-JEE-2027-A</option>
                  <option value="SBO-NEET-2027-B">SBO-NEET-2027-B</option>
                  <option value="ANA-CBSE-2027-A">ANA-CBSE-2027-A</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#A1A1AA] mb-1">
                  Live Class Session Topic
                </label>
                <input
                  type="text"
                  required
                  value={zoomTopic}
                  onChange={(e) => setZoomTopic(e.target.value)}
                  className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2 text-xs text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#A1A1AA] mb-1">
                  Scheduled Zoom Join URL
                </label>
                <input
                  type="url"
                  required
                  value={zoomUrl}
                  onChange={(e) => setZoomUrl(e.target.value)}
                  placeholder="https://zoom.us/j/..."
                  className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2 text-xs font-mono text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="font-mono text-xs text-[#A1A1AA]">
                Passcode: <strong className="text-[#F5F3EF]">KA2026</strong>
              </span>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Publish Zoom Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Upload PDF Study Material / VOD Lecture */}
          <form
            onSubmit={handleUploadContent}
            className="lg:col-span-6 bg-[#111111] border border-[#292929] rounded-lg p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#292929] pb-3">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5F3EF]">
                <Upload className="w-4 h-4 text-[#FF4B00]" />
                Upload PDF Material / Recorded VOD
              </span>
              <span className="font-mono text-xs text-[#A1A1AA]">
                Supabase Storage
              </span>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#A1A1AA] mb-1">
                    Target Batch
                  </label>
                  <select
                    value={uploadBatch}
                    onChange={(e) => setUploadBatch(e.target.value)}
                    className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2 text-xs font-mono text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                  >
                    <option value="SBO-JEE-2027-A">SBO-JEE-2027-A</option>
                    <option value="SBO-NEET-2027-B">SBO-NEET-2027-B</option>
                    <option value="ANA-CBSE-2027-A">ANA-CBSE-2027-A</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#A1A1AA] mb-1">
                    Content Format
                  </label>
                  <select
                    value={uploadType}
                    onChange={(e) =>
                      setUploadType(
                        e.target.value as 'PDF_MATERIAL' | 'VOD_LECTURE'
                      )
                    }
                    className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2 text-xs font-mono text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                  >
                    <option value="PDF_MATERIAL">PDF Study Material / DPP</option>
                    <option value="VOD_LECTURE">Recorded VOD Lecture</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#A1A1AA] mb-1">
                  Module / Document Title
                </label>
                <input
                  type="text"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g., DPP #20: Ampere’s Law & Toroid Magnetic Field"
                  className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2 text-xs text-[#F5F3EF] placeholder-[#A1A1AA] focus:outline-none focus:border-[#FF4B00]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#A1A1AA] mb-1">
                  {uploadType === 'PDF_MATERIAL'
                    ? 'PDF Filename (Supabase Storage)'
                    : 'YouTube Unlisted / HLS Stream URL'}
                </label>
                <input
                  type="text"
                  required
                  value={uploadResource}
                  onChange={(e) => setUploadResource(e.target.value)}
                  className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2 text-xs font-mono text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload & Publish to Batch</span>
              </button>
            </div>
          </form>
        </div>

        {/* Recently Published Content Feed */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#F5F3EF]">
            Published Batch Content & Live Zoom Links ({contentItems.length})
          </h2>

          <div className="bg-[#111111] border border-[#292929] rounded-lg divide-y divide-[#292929]">
            {contentItems.map((item) => (
              <div
                key={item.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-[#080808] border border-[#292929] text-[#FF4B00]">
                      {item.type}
                    </span>
                    <span className="font-mono text-xs text-[#F5F3EF]">
                      {item.batchCode}
                    </span>
                    <span className="font-mono text-[11px] text-[#A1A1AA]">
                      • {item.publishedAt}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#F5F3EF]">
                    {item.title}
                  </p>
                  <p className="font-mono text-xs text-[#A1A1AA]">
                    {item.urlOrFile}
                  </p>
                </div>

                <span className="font-mono text-xs px-3 py-1 rounded bg-[#080808] border border-[#292929] text-[#FF4B00] shrink-0">
                  PUBLISHED
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeacherContentPage;
