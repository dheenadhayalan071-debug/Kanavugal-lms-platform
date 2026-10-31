export interface LinkedChildRecord {
  id: string;
  fullName: string;
  rollNumber: string;
  classLevel: string;
  campus: 'SBO Colony' | 'Anaiyur';
  batchCode: string;
  trackLabel: string;
  mentorName: string;
  attendancePercentage: number;
  presentDays: number;
  totalDays: number;
  recentAttendanceLog: {
    date: string;
    session: string;
    status: 'PRESENT' | 'LATE';
  }[];
  recentMockResults: {
    examCode: string;
    examTitle: string;
    date: string;
    totalScore: number;
    maxScore: number;
    accuracyPct: number;
    campusRank: string;
    subjectScores: { subject: string; score: string }[];
    teacherRemark: string;
  }[];
  feeSummary: {
    receiptNo: string;
    termTitle: string;
    totalFee: number;
    paidAmount: number;
    balanceDue: number;
    paymentMethod: string;
    paidOn: string;
    status: 'PAID' | 'PARTIAL';
  };
}

export const LINKED_CHILDREN: LinkedChildRecord[] = [
  {
    id: 'stu_kavin_01',
    fullName: 'Kavin Rajan',
    rollNumber: 'KA-SBO-26-0142',
    classLevel: 'Class 12',
    campus: 'SBO Colony',
    batchCode: 'SBO-JEE-2027-A',
    trackLabel: 'JEE Main & Advanced + CBSE Board',
    mentorName: 'Dr. Ananya Velu (Ph.D. Physics)',
    attendancePercentage: 96.4,
    presentDays: 108,
    totalDays: 112,
    recentAttendanceLog: [
      {
        date: '31 Oct 2026',
        session: 'Physics — Moving Charges & Cyclotron',
        status: 'PRESENT',
      },
      {
        date: '30 Oct 2026',
        session: 'Mathematics — Definite Integration Drills',
        status: 'PRESENT',
      },
      {
        date: '29 Oct 2026',
        session: 'Chemistry — Nernst Equation & Electrochemistry',
        status: 'PRESENT',
      },
      {
        date: '28 Oct 2026',
        session: 'All-Academy JEE Main CBT Mock Test #04',
        status: 'PRESENT',
      },
    ],
    recentMockResults: [
      {
        examCode: 'NTA-JEE-MOCK-04',
        examTitle: 'All-Academy JEE Main Full Syllabus CBT Mock Test #04',
        date: '28 Oct 2026',
        totalScore: 246,
        maxScore: 300,
        accuracyPct: 91.2,
        campusRank: 'Rank #04 / 210 (SBO & Anaiyur)',
        subjectScores: [
          { subject: 'Physics', score: '86 / 100' },
          { subject: 'Chemistry', score: '78 / 100' },
          { subject: 'Mathematics', score: '82 / 100' },
        ],
        teacherRemark:
          'Exceptional speed and accuracy in Rotational Mechanics and Electrostatics. Keep revising Organic Carbonyl mechanisms.',
      },
      {
        examCode: 'CBSE-12-PHY-TERM1',
        examTitle: 'CBSE Class 12 Physics Mid-Term Descriptive & MCQ Assessment',
        date: '20 Oct 2026',
        totalScore: 65,
        maxScore: 70,
        accuracyPct: 94.0,
        campusRank: 'Rank #02 / 140 (SBO Colony)',
        subjectScores: [
          { subject: 'Physics (Theory + Derivations)', score: '65 / 70' },
        ],
        teacherRemark:
          'Clean vector diagrams and step-by-step Gauss Law derivations.',
      },
    ],
    feeSummary: {
      receiptNo: 'KA-SBO-2026-0891',
      termTitle: 'Term 1 & 2 JEE Integrated Tuition + CBT Series (2026–27)',
      totalFee: 68000,
      paidAmount: 68000,
      balanceDue: 0,
      paymentMethod: 'UPI Desk Verified',
      paidOn: '29 Oct 2026',
      status: 'PAID',
    },
  },
  {
    id: 'stu_divya_02',
    fullName: 'Divya Rajan',
    rollNumber: 'KA-ANA-26-0419',
    classLevel: 'Class 9',
    campus: 'Anaiyur',
    batchCode: 'ANA-FND-2027-A',
    trackLabel: 'Olympiad & Junior NEET/JEE Foundation',
    mentorName: 'Prof. Vikramaditya Senthil',
    attendancePercentage: 98.1,
    presentDays: 104,
    totalDays: 106,
    recentAttendanceLog: [
      {
        date: '31 Oct 2026',
        session: 'Foundation Physics — Laws of Motion & Friction',
        status: 'PRESENT',
      },
      {
        date: '30 Oct 2026',
        session: 'Olympiad Mathematics — Number Theory & Modular Arithmetic',
        status: 'PRESENT',
      },
      {
        date: '28 Oct 2026',
        session: 'Foundation Biology — Cell Organelles & Division',
        status: 'PRESENT',
      },
    ],
    recentMockResults: [
      {
        examCode: 'KA-FND-OLYM-03',
        examTitle: 'Junior Science & Maths Olympiad Cumulative Test #03',
        date: '26 Oct 2026',
        totalScore: 184,
        maxScore: 200,
        accuracyPct: 93.5,
        campusRank: 'Rank #01 / 95 (Anaiyur Campus)',
        subjectScores: [
          { subject: 'Mathematics', score: '76 / 80' },
          { subject: 'Science (Phy + Chem + Bio)', score: '108 / 120' },
        ],
        teacherRemark:
          'Consistently top performer in Anaiyur Foundation wing. Ready for NSEJS practice sheets.',
      },
    ],
    feeSummary: {
      receiptNo: 'KA-ANA-2026-0412',
      termTitle: 'Class 9 Olympiad Foundation Annual Programme (2026–27)',
      totalFee: 32000,
      paidAmount: 32000,
      balanceDue: 0,
      paymentMethod: 'NEFT Bank Transfer',
      paidOn: '27 Oct 2026',
      status: 'PAID',
    },
  },
];
