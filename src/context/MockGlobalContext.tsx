import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  GlobalAnnouncementRecord,
  ManagedUserApprovalRecord,
  prependGlobalAnnouncement,
  updateManagedUserStatus,
} from '../lib/lmsLogic';

export interface ParentStudentLinkRecord {
  id: string;
  parentId: string;
  parentName: string;
  studentId: string;
  studentName: string;
  batchCode: string;
  relationship: string;
  linkedAt: string;
}

const INITIAL_GLOBAL_ANNOUNCEMENTS: GlobalAnnouncementRecord[] = [
  {
    id: 'ann_01',
    title: 'All-India NTA Pattern Mock CBT #05 Window Open',
    message:
      'Mandatory full-length 180-minute CBT examination for all SBO Colony and Anaiyur Class 12 batches this Sunday at 09:00 AM IST.',
    targetBranches: 'ALL_BRANCHES',
    publishedAt: 'Today · 08:30 AM',
  },
  {
    id: 'ann_02',
    title: 'Diwali Academic Break & Special Doubt Clearing Cell',
    message:
      'Morning doubt counters for Physics and Organic Chemistry will remain open from 09:30 AM to 12:30 PM at both Madurai campuses.',
    targetBranches: 'ALL_BRANCHES',
    publishedAt: '29 Oct 2026',
  },
];

const INITIAL_USER_APPROVALS: ManagedUserApprovalRecord[] = [
  {
    id: 'acc_01',
    userCode: 'STU-SBO-2027-0195',
    fullName: 'Pranav Muthukumar',
    email: 'pranav.m@kanavugal.academy',
    role: 'STUDENT',
    campus: 'SBO Colony',
    programmeOrSubject: 'Class 12 · NEET UG Medical',
    assignedBatch: 'SBO-NEET-2027',
    status: 'PENDING',
  },
  {
    id: 'acc_02',
    userCode: 'STU-ANA-2028-0304',
    fullName: 'Karthik Vaidyanathan',
    email: 'karthik.v@kanavugal.academy',
    role: 'STUDENT',
    campus: 'Anaiyur',
    programmeOrSubject: 'Class 11 · JEE Main & Advanced',
    assignedBatch: 'ANA-JEE-2028-A',
    status: 'PENDING',
  },
  {
    id: 'acc_03',
    userCode: 'FAC-SBO-BIO-014',
    fullName: 'Prof. S. Meenakshi',
    email: 'meenakshi.bio@kanavugal.academy',
    role: 'TEACHER',
    campus: 'SBO Colony',
    programmeOrSubject: 'Senior Faculty — NEET Botany & Genetics',
    assignedBatch: 'SBO-NEET-2027',
    status: 'APPROVED',
  },
  {
    id: 'acc_04',
    userCode: 'STU-SBO-2027-0142',
    fullName: 'Kavin Rajan',
    email: 'kavin.rajan@kanavugal.academy',
    role: 'STUDENT',
    campus: 'SBO Colony',
    programmeOrSubject: 'Class 12 · JEE Main & Advanced',
    assignedBatch: 'SBO-JEE-2027-A',
    status: 'APPROVED',
  },
  {
    id: 'acc_05',
    userCode: 'STU-ANA-2027-0419',
    fullName: 'Nithya Subramanian',
    email: 'nithya.s@kanavugal.academy',
    role: 'STUDENT',
    campus: 'Anaiyur',
    programmeOrSubject: 'Class 10 · Olympiad & NTSE Foundation',
    assignedBatch: 'ANA-FND-2027-A',
    status: 'SUSPENDED',
  },
];

const INITIAL_PARENT_LINKS: ParentStudentLinkRecord[] = [
  {
    id: 'lnk_01',
    parentId: 'PAR-KA-2026-0088',
    parentName: 'Rajan Sundaram',
    studentId: 'STU-SBO-2027-0142',
    studentName: 'Kavin Rajan',
    batchCode: 'SBO-JEE-2027-A',
    relationship: 'Father / Guardian',
    linkedAt: '12 Jun 2026',
  },
  {
    id: 'lnk_02',
    parentId: 'PAR-KA-2026-0088',
    parentName: 'Rajan Sundaram',
    studentId: 'STU-ANA-2027-0419',
    studentName: 'Divya Rajan',
    batchCode: 'ANA-FND-2027-A',
    relationship: 'Father / Guardian',
    linkedAt: '12 Jun 2026',
  },
  {
    id: 'lnk_03',
    parentId: 'PAR-KA-2026-0104',
    parentName: 'Lakshmi Narayanan',
    studentId: 'STU-SBO-2027-0158',
    studentName: 'Arjun Narayanan',
    batchCode: 'SBO-JEE-2027-A',
    relationship: 'Mother / Guardian',
    linkedAt: '18 Jun 2026',
  },
];

interface MockGlobalContextValue {
  globalAnnouncements: GlobalAnnouncementRecord[];
  userApprovals: ManagedUserApprovalRecord[];
  parentStudentLinks: ParentStudentLinkRecord[];
  pushGlobalAnnouncement: (payload: {
    title: string;
    message: string;
    targetBranches: 'ALL_BRANCHES' | 'SBO_COLONY' | 'ANAIYUR';
  }) => GlobalAnnouncementRecord;
  setAccountApprovalStatus: (
    id: string,
    nextStatus: 'APPROVED' | 'SUSPENDED'
  ) => void;
  linkParentAndStudent: (
    parentId: string,
    studentId: string
  ) => ParentStudentLinkRecord;
}

const GLOBAL_STATE_STORAGE_KEY = 'kanavugal_enterprise_global_ctx_v1';

const MockGlobalContext = createContext<MockGlobalContextValue | undefined>(
  undefined
);

export const MockGlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [globalAnnouncements, setGlobalAnnouncements] = useState<
    GlobalAnnouncementRecord[]
  >(() => {
    try {
      const saved = localStorage.getItem(GLOBAL_STATE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.globalAnnouncements)) {
          return parsed.globalAnnouncements;
        }
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_GLOBAL_ANNOUNCEMENTS;
  });

  const [userApprovals, setUserApprovals] = useState<
    ManagedUserApprovalRecord[]
  >(() => {
    try {
      const saved = localStorage.getItem(GLOBAL_STATE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.userApprovals)) {
          return parsed.userApprovals;
        }
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_USER_APPROVALS;
  });

  const [parentStudentLinks, setParentStudentLinks] = useState<
    ParentStudentLinkRecord[]
  >(() => {
    try {
      const saved = localStorage.getItem(GLOBAL_STATE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.parentStudentLinks)) {
          return parsed.parentStudentLinks;
        }
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_PARENT_LINKS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        GLOBAL_STATE_STORAGE_KEY,
        JSON.stringify({
          globalAnnouncements,
          userApprovals,
          parentStudentLinks,
        })
      );
    } catch {
      // ignore storage errors
    }
  }, [globalAnnouncements, userApprovals, parentStudentLinks]);

  const pushGlobalAnnouncement = (payload: {
    title: string;
    message: string;
    targetBranches: 'ALL_BRANCHES' | 'SBO_COLONY' | 'ANAIYUR';
  }): GlobalAnnouncementRecord => {
    const newId = `ann_${Date.now()}`;
    const created: GlobalAnnouncementRecord = {
      id: newId,
      title: payload.title.trim(),
      message: payload.message.trim(),
      targetBranches: payload.targetBranches,
      publishedAt: 'Just now',
    };
    setGlobalAnnouncements((prev) =>
      prependGlobalAnnouncement(prev, {
        id: created.id,
        title: created.title,
        message: created.message,
        targetBranches: created.targetBranches,
        publishedAt: created.publishedAt,
      })
    );
    return created;
  };

  const setAccountApprovalStatus = (
    id: string,
    nextStatus: 'APPROVED' | 'SUSPENDED'
  ) => {
    setUserApprovals((prev) => updateManagedUserStatus(prev, id, nextStatus));
  };

  const linkParentAndStudent = (
    parentId: string,
    studentId: string
  ): ParentStudentLinkRecord => {
    const newRow: ParentStudentLinkRecord = {
      id: `lnk_${Date.now()}`,
      parentId: parentId.trim().toUpperCase(),
      parentName: 'Muthukumar Perumal',
      studentId: studentId.trim().toUpperCase(),
      studentName: 'Pranav Muthukumar',
      batchCode: 'SBO-NEET-2027',
      relationship: 'Parent / Guardian',
      linkedAt: 'Just now',
    };
    setParentStudentLinks((prev) => [newRow, ...prev]);
    return newRow;
  };

  return (
    <MockGlobalContext.Provider
      value={{
        globalAnnouncements,
        userApprovals,
        parentStudentLinks,
        pushGlobalAnnouncement,
        setAccountApprovalStatus,
        linkParentAndStudent,
      }}
    >
      {children}
    </MockGlobalContext.Provider>
  );
};

export function useMockGlobal(): MockGlobalContextValue {
  const ctx = useContext(MockGlobalContext);
  if (!ctx) {
    throw new Error('useMockGlobal must be used within a MockGlobalProvider');
  }
  return ctx;
}
