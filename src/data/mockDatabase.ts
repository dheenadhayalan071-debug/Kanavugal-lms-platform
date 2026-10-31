import {
  AnnouncementItem,
  ApprovalStatus,
  Batch,
  Branch,
  Course,
  Enrollment,
  Exam,
  ExamSubmission,
  LiveClassSession,
  Module,
  OfflineFeeRecord,
  Progress,
  QuestionItem,
  Role,
  User,
} from '../types/prisma';

export const SEED_BRANCHES: Branch[] = [
  {
    id: 'br_sbo',
    code: 'SBO',
    name: 'SBO Colony Campus',
    city: 'Madurai',
    address: 'Plot 42, SBO 1st Street, Bypass Road, Madurai 625016',
    studentCount: 640,
    teacherCount: 24,
    isActive: true,
  },
  {
    id: 'br_anaiyur',
    code: 'ANAIYUR',
    name: 'Anaiyur Academic Centre',
    city: 'Madurai',
    address: 'No. 18, Main Ring Road, Anaiyur, Madurai 625017',
    studentCount: 480,
    teacherCount: 18,
    isActive: true,
  },
];

export const SEED_BATCHES: Batch[] = [
  {
    id: 'batch_sbo_jee',
    name: 'SBO-JEE-2027-ALPHA',
    programme: 'JEE Preparation',
    branchId: 'br_sbo',
    branchName: 'SBO Colony Campus',
    mentorTeacherId: 'usr_teacher_01',
    mentorTeacherName: 'Dr. Ananya Velu',
    scheduleSummary: 'Mon–Sat · 17:30–20:30 IST',
  },
  {
    id: 'batch_sbo_neet',
    name: 'SBO-NEET-2027-MED',
    programme: 'NEET Preparation',
    branchId: 'br_sbo',
    branchName: 'SBO Colony Campus',
    mentorTeacherId: 'usr_teacher_01',
    mentorTeacherName: 'Dr. Ananya Velu',
    scheduleSummary: 'Mon–Sat · 06:00–08:30 IST',
  },
  {
    id: 'batch_anaiyur_12',
    name: 'ANAIYUR-C12-BOARD',
    programme: 'Classes 11–12',
    branchId: 'br_anaiyur',
    branchName: 'Anaiyur Academic Centre',
    mentorTeacherId: 'usr_teacher_01',
    mentorTeacherName: 'Prof. Vikramaditya Senthil',
    scheduleSummary: 'Tue, Thu, Sat · 16:30–19:00 IST',
  },
  {
    id: 'batch_anaiyur_found',
    name: 'ANAIYUR-FOUNDATION-9A',
    programme: 'Classes 6–10',
    branchId: 'br_anaiyur',
    branchName: 'Anaiyur Academic Centre',
    mentorTeacherId: 'usr_teacher_01',
    mentorTeacherName: 'Meenakshi Sundaram',
    scheduleSummary: 'Mon, Wed, Fri · 16:30–18:30 IST',
  },
];

export const SEED_USERS: User[] = [
  {
    id: 'usr_student_01',
    email: 'kavin.rajan@kanavugal.academy',
    name: 'Kavin Rajan',
    role: Role.STUDENT,
    approvalStatus: ApprovalStatus.APPROVED,
    programme: 'JEE Preparation',
    classGrade: 'Class 12',
    branchId: 'br_sbo',
    batchId: 'batch_sbo_jee',
    assignedTeacherName: 'Dr. Ananya Velu',
    phone: '+91 98421 44012',
    attendancePct: 96.4,
    teacherFeedback:
      'Strong analytical speed in Rotational Mechanics and Calculus. Needs to reduce negative marking in Organic Chemistry assertion-reason questions.',
    cohort: 'SBO-JEE-2027-ALPHA · Class 12',
    school: 'SBO Matriculation Higher Secondary',
  },
  {
    id: 'usr_student_02',
    email: 'divya.rajan@kanavugal.academy',
    name: 'Divya Rajan',
    role: Role.STUDENT,
    approvalStatus: ApprovalStatus.APPROVED,
    programme: 'Classes 6–10',
    classGrade: 'Class 9',
    branchId: 'br_anaiyur',
    batchId: 'batch_anaiyur_found',
    assignedTeacherName: 'Meenakshi Sundaram',
    phone: '+91 98421 44013',
    attendancePct: 94.2,
    teacherFeedback:
      'Consistent top-5 rank in Class 9 Foundation Olympiad quizzes. Excellent clarity in linear equations and optics ray diagrams.',
    cohort: 'ANAIYUR-FOUNDATION-9A · Class 9',
    school: 'Anaiyur Vidya Mandir',
  },
  {
    id: 'usr_student_pending_01',
    email: 'pranav.m@kanavugal.academy',
    name: 'Pranav Muthukumar',
    role: Role.STUDENT,
    approvalStatus: ApprovalStatus.PENDING_APPROVAL,
    programme: 'NEET Preparation',
    classGrade: 'Class 11',
    branchId: 'br_sbo',
    phone: '+91 94430 88219',
    cohort: 'Pending Batch Assignment',
    school: 'Madurai Model Higher Secondary',
  },
  {
    id: 'usr_teacher_01',
    email: 'ananya.velu@kanavugal.academy',
    name: 'Dr. Ananya Velu',
    role: Role.TEACHER,
    approvalStatus: ApprovalStatus.APPROVED,
    branchId: 'br_sbo',
    cohort: 'Senior Physics & Exam Studio Head',
    school: 'SBO & Anaiyur Faculty Fellow',
  },
  {
    id: 'usr_parent_01',
    email: 'rajan.parent@kanavugal.academy',
    name: 'Rajan Sundaram',
    role: Role.PARENT,
    approvalStatus: ApprovalStatus.APPROVED,
    branchId: 'br_sbo',
    childrenIds: ['usr_student_01', 'usr_student_02'],
    phone: '+91 98421 44000',
    cohort: 'Parent of Kavin (Class 12 JEE) & Divya (Class 9)',
    school: 'Guardian Portal',
  },
  {
    id: 'usr_admin_01',
    email: 'ops@kanavugal.academy',
    name: 'Siddharth Narayanan',
    role: Role.ADMIN,
    approvalStatus: ApprovalStatus.APPROVED,
    branchId: 'br_sbo',
    cohort: 'Multi-Branch Operations & Admissions',
    school: 'Kanavugal Academy HQ',
  },
];

export const SEED_COURSES: Course[] = [
  {
    id: 'crs_fullstack_01',
    title: 'JEE Advanced Physics & Mathematics: Mechanics, Electrostatics & Calculus',
    description:
      'Rigorous problem-solving track for JEE Main & Advanced aspirants. Covers rotational dynamics, Gauss law, electromagnetic induction, and definite integration with full-length timed mock exams.',
    slug: 'fullstack-distributed-systems',
    isPublished: true,
    programme: 'JEE Preparation',
    subject: 'Physics & Mathematics',
    track: 'JEE Preparation',
    difficulty: 'Classes 11–12 · JEE Advanced',
    estimatedHours: 140,
    instructor: {
      name: 'Dr. Ananya Velu',
      roleTitle: 'Senior Physics & JEE Chair',
      credentials: 'IIT Madras PhD · 12 Years JEE Advanced Mentoring (SBO Branch)',
      officeHours: 'Mon–Fri · 19:30 IST (SBO Campus Lab 2)',
      branch: 'SBO Colony Campus',
    },
    techStack: [
      'Rotational Mechanics',
      'Electrostatics & Capacitors',
      'Differential Calculus',
      '3D Coordinate Geometry',
      'JEE Mock Series',
    ],
    bentoSpan: 'large',
    visualVariant: 'systems',
    deliverable: '24 Chapter Tests + 12 Full-Length 180-Min JEE CBT Mock Exams',
  },
  {
    id: 'crs_robotics_02',
    title: 'NEET Medical Mastery: Human Physiology, Genetics & Organic Mechanisms',
    description:
      'Line-by-line NCERT mastery combined with high-speed assertion-reason drills in Zoology, Botany, and Organic Chemistry. Engineered for 680+ score accuracy under negative marking.',
    slug: 'embedded-rust-pcb-telemetry',
    isPublished: true,
    programme: 'NEET Preparation',
    subject: 'Biology & Chemistry',
    track: 'NEET Preparation',
    difficulty: 'Classes 11–12 · NEET UG',
    estimatedHours: 160,
    instructor: {
      name: 'Dr. Karthikeyan Bose',
      roleTitle: 'Head of Medical Sciences',
      credentials: 'MMC Alumnus · Mentored 310+ Govt Medical College Selections',
      officeHours: 'Tue, Thu, Sat · 08:30 IST (SBO & Anaiyur)',
      branch: 'SBO & Anaiyur Branches',
    },
    techStack: [
      'Human Physiology',
      'Molecular Inheritance',
      'GOC & Named Reactions',
      'Chemical Equilibrium',
      '720-Mark NEET Mocks',
    ],
    bentoSpan: 'standard',
    visualVariant: 'robotics',
    deliverable: '30 NCERT Line-by-Line PDF Workbooks + Bi-Weekly 720-Mark NEET Mocks',
  },
  {
    id: 'crs_protocol_03',
    title: 'Classes 11–12 State & CBSE Board Excellence: Physics, Chemistry & Maths',
    description:
      'Structured board examination mastery with step-by-step descriptive derivation evaluation, blueprint-aligned sample papers, and concept clarity sessions.',
    slug: 'applied-cryptography-protocols',
    isPublished: true,
    programme: 'Classes 11–12',
    subject: 'PCM / PCB Core',
    track: 'Classes 11–12',
    difficulty: 'Higher Secondary Board Prep',
    estimatedHours: 120,
    instructor: {
      name: 'Prof. Vikramaditya Senthil',
      roleTitle: 'Senior Board Curriculum Lead',
      credentials: 'State Rank Mentorship Awardee · 15 Years Teaching Experience',
      officeHours: 'Wed & Sat · 18:00 IST (Anaiyur Centre)',
      branch: 'Anaiyur Academic Centre',
    },
    techStack: [
      'Wave Optics Derivations',
      'Coordination Compounds',
      'Matrices & Determinants',
      'Descriptive Answer Writing',
    ],
    bentoSpan: 'standard',
    visualVariant: 'protocol',
    deliverable: 'Evaluated Descriptive Answer Booklets + 100% Board Syllabus Coverage',
  },
  {
    id: 'crs_compiler_04',
    title: 'Classes 6–10 STEM & Olympiad Foundation: Maths, Science & Analytical Reasoning',
    description:
      'Early conceptual foundation for middle and high school scholars in Classes 6 to 10. Builds deep intuition in algebra, geometry, Newtonian mechanics, and atomic structure.',
    slug: 'typed-bytecode-compiler',
    isPublished: true,
    programme: 'Classes 6–10',
    subject: 'Foundation Science & Maths',
    track: 'Classes 6–10',
    difficulty: 'Classes 6–10 Foundation',
    estimatedHours: 96,
    instructor: {
      name: 'Meenakshi Sundaram',
      roleTitle: 'Foundation Wing Coordinator',
      credentials: 'NTSE & Junior Science Olympiad Trainer · Anaiyur Branch',
      officeHours: 'Mon, Wed, Fri · 18:00 IST (Anaiyur Centre)',
      branch: 'Anaiyur Academic Centre',
    },
    techStack: [
      'Number Theory & Algebra',
      'Euclidean Geometry',
      'Motion & Force Laws',
      'Mole Concept Basics',
    ],
    bentoSpan: 'wide',
    visualVariant: 'compiler',
    deliverable: 'Chapter-wise Concept PDFs + Weekly Timed Foundation Quizzes',
  },
];

export const SEED_MODULES: Module[] = [
  // Course 1: JEE Preparation (crs_fullstack_01)
  {
    id: 'mod_fs_101',
    title: '01. Moment of Inertia, Parallel Axis Theorem & Radius of Gyration',
    position: 1,
    videoSourceType: 'YOUTUBE_UNLISTED',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0',
    youtubeEmbedId: 'unlisted_jee_phy_101',
    pdfTitle: 'JEE_Phy_01_Moment_Of_Inertia_Workbook.pdf',
    pdfStoragePath: 'supabase://kanavugal-storage/jee/phy-01-moment-of-inertia.pdf',
    pdfSizeLabel: '3.4 MB · 28 Pages',
    content: `In this recorded lecture (hosted via YouTube Unlisted stream for zero-buffering delivery across SBO and Anaiyur branches), we derive the moment of inertia tensors for continuous rigid bodies: uniform rods, thin rings, circular discs, hollow spheres, and solid spheres.

Students must download the accompanying Supabase Storage PDF worksheet and complete the 15 cavity-subtraction problems before unlocking Module 02.`,
    courseId: 'crs_fullstack_01',
    durationMinutes: 48,
    codeSnippet: `// Fundamental Theorems of Moment of Inertia:
// 1. Parallel Axis Theorem:
I_parallel = I_cm + M * d^2

// 2. Perpendicular Axis Theorem (Planar Laminas):
I_z = I_x + I_y

// 3. Solid Sphere about Tangent:
I_tangent = (2/5) * M * R^2 + M * R^2 = (7/5) * M * R^2`,
    keyTakeaways: [
      'Apply cavity superposition by treating removed mass as negative mass (-dm) at its respective center of mass.',
      'Never apply the Perpendicular Axis Theorem to 3D bodies such as spheres or cylinders.',
      'Complete Questions 1–15 in the Supabase PDF worksheet before advancing.',
    ],
  },
  {
    id: 'mod_fs_102',
    title: '02. Pure Rolling Motion, Frictional Torque & Inclined Plane Dynamics',
    position: 2,
    videoSourceType: 'YOUTUBE_UNLISTED',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0',
    youtubeEmbedId: 'unlisted_jee_phy_102',
    pdfTitle: 'JEE_Phy_02_Rolling_Dynamics_PYQs.pdf',
    pdfStoragePath: 'supabase://kanavugal-storage/jee/phy-02-rolling-dynamics.pdf',
    pdfSizeLabel: '4.1 MB · 34 Pages',
    content: `We analyze combined translational and rotational motion of rigid bodies on rough horizontal and inclined surfaces. Using the Instantaneous Axis of Rotation (IAOR), we solve multi-concept JEE Advanced problems without redundant force equations.

Pay special attention to the direction of static friction when external force is applied at different heights above the center of mass.`,
    courseId: 'crs_fullstack_01',
    durationMinutes: 54,
    codeSnippet: `// Condition for Pure Rolling on Stationary Surface:
v_cm = R * omega
a_cm = R * alpha

// Acceleration down an incline of angle theta:
a_cm = (g * sin(theta)) / (1 + I_cm / (M * R^2))

// Minimum friction coefficient for pure rolling:
mu_min = tan(theta) / (1 + (M * R^2) / I_cm)`,
    keyTakeaways: [
      'Use Instantaneous Axis of Rotation (IAOR) to compute kinetic energy in a single term: K = (1/2) * I_iaor * omega^2.',
      'Static friction performs zero net work during pure rolling on a fixed rigid surface.',
      'Compare solid cylinder vs hollow cylinder race times on inclined planes.',
    ],
  },
  {
    id: 'mod_fs_103',
    title: '03. Gauss Law, Electric Flux & Conductors with Cavities',
    position: 3,
    videoSourceType: 'DIRECT_STREAM',
    videoUrl: 'https://stream.kanavugal.academy/sbo-studio/jee-electrostatics-03.mp4',
    pdfTitle: 'JEE_Phy_03_Gauss_Law_Electrostatics.pdf',
    pdfStoragePath: 'supabase://kanavugal-storage/jee/phy-03-gauss-law.pdf',
    pdfSizeLabel: '2.9 MB · 22 Pages',
    content: `Recorded directly in the SBO Colony Studio. We examine symmetric charge distributions, non-uniform volume charge density rho(r) = k*r^n, electrostatic shielding inside metallic cavities, and earthing of concentric spherical shells.`,
    courseId: 'crs_fullstack_01',
    durationMinutes: 52,
    codeSnippet: `// Gauss's Law in Integral Form:
oint( E . dA ) = Q_enclosed / epsilon_0

// Self-Energy of Uniformly Charged Solid Sphere:
U_self = (3 / 5) * (k * Q^2) / R

// Electrostatic Pressure on Charged Conductor Surface:
P_elec = sigma^2 / (2 * epsilon_0)`,
    keyTakeaways: [
      'Electric field at the Gaussian surface is determined by ALL charges (inside and outside), while net flux depends ONLY on enclosed charge.',
      'Charge induced on the inner wall of a conductor cavity is strictly -q_inside.',
      'Solve concentric shell potential problems before taking the Timed Mock Exam.',
    ],
  },
  {
    id: 'mod_fs_104',
    title: '04. Definite Integration, Leibniz Rule & Area Under Curves',
    position: 4,
    videoSourceType: 'YOUTUBE_UNLISTED',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0',
    youtubeEmbedId: 'unlisted_jee_math_104',
    pdfTitle: 'JEE_Math_04_Definite_Integration_Drill.pdf',
    pdfStoragePath: 'supabase://kanavugal-storage/jee/math-04-definite-integration.pdf',
    pdfSizeLabel: '3.7 MB · 30 Pages',
    content: `Master the King's Property of definite integrals, differentiation under the integral sign (Leibniz Rule), reduction formulas, and limit of a sum using Riemann quadratures.`,
    courseId: 'crs_fullstack_01',
    durationMinutes: 60,
    codeSnippet: `// King's Property:
Integral_a^b f(x) dx = Integral_a^b f(a + b - x) dx

// Newton-Leibniz Differentiation of Variable Limits:
d/dx [ Integral_{phi(x)}^{psi(x)} f(t) dt ]
  = f(psi(x)) * psi'(x) - f(phi(x)) * phi'(x)`,
    keyTakeaways: [
      'Apply King Property first whenever trigonometric or logarithmic symmetry appears.',
      'Check continuity and periodicity before applying n*T integral multipliers.',
      'Complete the JEE Calculus speed drill worksheet.',
    ],
  },

  // Course 2: NEET Preparation (crs_robotics_02)
  {
    id: 'mod_rob_201',
    title: '01. Cardiac Cycle, ECG Waveform & Regulation of Cardiac Output',
    position: 1,
    videoSourceType: 'YOUTUBE_UNLISTED',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0',
    pdfTitle: 'NEET_Bio_01_Body_Fluids_Circulation_NCERT.pdf',
    pdfStoragePath: 'supabase://kanavugal-storage/neet/bio-01-cardiac-cycle.pdf',
    pdfSizeLabel: '5.2 MB · 40 Pages',
    content: `Detailed analysis of joint diastole (0.4s), atrial systole (0.1s), and ventricular systole (0.3s) in the 0.8-second human cardiac cycle. Includes NCERT diagram annotations and P-QRS-T electrocardiograph clinical correlations.`,
    courseId: 'crs_robotics_02',
    durationMinutes: 46,
    codeSnippet: `Cardiac Output (CO) = Stroke Volume (SV) * Heart Rate (HR)
SV = End-Diastolic Volume (120 mL) - End-Systolic Volume (50 mL) = 70 mL
CO = 70 mL * 72 beats/min = 5040 mL/min (~5.0 Litres/min)`,
    keyTakeaways: [
      'First heart sound (LUB) is associated with closure of tricuspid and bicuspid valves at the onset of ventricular systole.',
      'Second heart sound (DUB) is associated with closure of semilunar valves at the onset of ventricular diastole.',
      'QRS complex represents depolarization of ventricles.',
    ],
  },
  {
    id: 'mod_rob_202',
    title: '02. SN1 vs SN2 Nucleophilic Substitution & Stereochemistry',
    position: 2,
    videoSourceType: 'DIRECT_STREAM',
    videoUrl: 'https://stream.kanavugal.academy/sbo-studio/neet-organic-sn1-sn2.mp4',
    pdfTitle: 'NEET_Chem_02_Haloalkanes_Reaction_Chart.pdf',
    pdfStoragePath: 'supabase://kanavugal-storage/neet/chem-02-sn1-sn2.pdf',
    pdfSizeLabel: '2.8 MB · 24 Pages',
    content: `Compare unimolecular (carbocation intermediate, racemization) and bimolecular (concerted transition state, Walden inversion) nucleophilic substitutions across polar protic and polar aprotic solvents.`,
    courseId: 'crs_robotics_02',
    durationMinutes: 50,
    codeSnippet: `SN2 Rate = k * [Substrate] * [Nucleophile] (Walden Inversion)
SN1 Rate = k * [Substrate] (Carbocation Rearrangement Possible)
Reactivity SN2: Methyl > 1° > 2° > 3° Halide`,
    keyTakeaways: [
      'Allylic and benzylic halides show high reactivity in both SN1 and SN2 pathways.',
      'Watch for 1,2-hydride and 1,2-methyl shifts in SN1 solvolysis reactions.',
    ],
  },

  // Course 3: Classes 11-12 Board (crs_protocol_03)
  {
    id: 'mod_cry_301',
    title: '01. Huygens Principle & Young Double Slit Interference Derivation',
    position: 1,
    videoSourceType: 'YOUTUBE_UNLISTED',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0',
    pdfTitle: 'Class12_Wave_Optics_5Mark_Derivations.pdf',
    pdfStoragePath: 'supabase://kanavugal-storage/board12/phy-wave-optics.pdf',
    pdfSizeLabel: '2.1 MB · 18 Pages',
    content: `Step-by-step 5-mark board exam derivation of Laws of Reflection and Refraction using Huygens secondary wavelets, followed by fringe width beta = lambda * D / d in Young's Double Slit Experiment.`,
    courseId: 'crs_protocol_03',
    durationMinutes: 42,
    codeSnippet: `Path Difference: Delta_x = d * sin(theta) ≈ d * (y / D)
Constructive (Bright): y_n = n * lambda * D / d
Fringe Width: beta = (lambda * D) / d`,
    keyTakeaways: [
      'Always draw wavefront normals and label incident/refracted angles clearly for full board diagram marks.',
      'When apparatus is immersed in medium of refractive index mu, fringe width decreases to beta / mu.',
    ],
  },

  // Course 4: Classes 6-10 Foundation (crs_compiler_04)
  {
    id: 'mod_cmp_401',
    title: '01. Euclid Division Lemma, Modular Arithmetic & Polynomial Roots',
    position: 1,
    videoSourceType: 'YOUTUBE_UNLISTED',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0',
    pdfTitle: 'Class9_10_Number_Theory_Olympiad_Sheet.pdf',
    pdfStoragePath: 'supabase://kanavugal-storage/foundation/math-01-euclid.pdf',
    pdfSizeLabel: '1.9 MB · 16 Pages',
    content: `Foundation number theory and Vieta's root relations for Classes 8–10 students preparing for board exams and Junior Mathematics Olympiads at our Anaiyur and SBO branches.`,
    courseId: 'crs_compiler_04',
    durationMinutes: 38,
    codeSnippet: `Euclid's Lemma: a = b * q + r,  where 0 <= r < b
Vieta's Relations for a*x^2 + b*x + c = 0:
  alpha + beta = -b / a
  alpha * beta = c / a`,
    keyTakeaways: [
      'Use Euclidean steps to express GCD(a, b) as a linear combination a*x + b*y.',
      'Construct symmetric expressions alpha^2 + beta^2 without solving for individual irrational roots.',
    ],
  },
];

export const SEED_QUESTIONS: QuestionItem[] = [
  {
    id: 'q_jee_01',
    programme: 'JEE Preparation',
    subject: 'Physics',
    chapter: 'Rotational Mechanics',
    type: 'MCQ',
    scope: 'SHARED_ACADEMY',
    authorId: 'usr_teacher_01',
    authorName: 'Dr. Ananya Velu',
    prompt:
      'A uniform solid cylinder of mass M and radius R rolls without slipping down an inclined plane of angle θ. What is the magnitude of the static frictional force acting on the cylinder?',
    options: [
      '(1/3) Mg sin θ',
      '(2/3) Mg sin θ',
      '(2/5) Mg sin θ',
      '(1/2) Mg sin θ',
    ],
    correctOptionIndex: 0,
    positiveMarks: 4,
    negativeMarks: 1,
    recommendedTimeSeconds: 90,
  },
  {
    id: 'q_jee_02',
    programme: 'JEE Preparation',
    subject: 'Physics',
    chapter: 'Electrostatics',
    type: 'MCQ',
    scope: 'SHARED_ACADEMY',
    authorId: 'usr_teacher_01',
    authorName: 'Dr. Ananya Velu',
    prompt:
      'A point charge +q is placed at a distance d/2 directly above the center of a square of side d. The magnitude of electric flux through the square is:',
    options: ['q / (6 ε₀)', 'q / ε₀', 'q / (4 ε₀)', 'q / (2 ε₀)'],
    correctOptionIndex: 0,
    positiveMarks: 4,
    negativeMarks: 1,
    recommendedTimeSeconds: 75,
  },
  {
    id: 'q_jee_03',
    programme: 'JEE Preparation',
    subject: 'Chemistry',
    chapter: 'Chemical Kinetics',
    type: 'MCQ',
    scope: 'SHARED_ACADEMY',
    authorId: 'usr_teacher_01',
    authorName: 'Dr. Karthikeyan Bose',
    prompt:
      'For a first-order reaction, if 75% of the reactant decomposes in 60 minutes, what is the half-life (t₁/₂) of the reaction?',
    options: ['30 minutes', '15 minutes', '45 minutes', '20 minutes'],
    correctOptionIndex: 0,
    positiveMarks: 4,
    negativeMarks: 1,
    recommendedTimeSeconds: 60,
  },
  {
    id: 'q_jee_04',
    programme: 'JEE Preparation',
    subject: 'Mathematics',
    chapter: 'Definite Integration',
    type: 'MCQ',
    scope: 'PRIVATE_TEACHER',
    authorId: 'usr_teacher_01',
    authorName: 'Dr. Ananya Velu',
    prompt:
      'Evaluate the definite integral I = ∫₀^(π/2) [ √(sin x) / (√(sin x) + √(cos x)) ] dx using King’s Property:',
    options: ['π / 4', 'π / 2', 'π / 8', '1'],
    correctOptionIndex: 0,
    positiveMarks: 4,
    negativeMarks: 1,
    recommendedTimeSeconds: 60,
  },
  {
    id: 'q_jee_05',
    programme: 'JEE Preparation',
    subject: 'Physics',
    chapter: 'Rotational Mechanics',
    type: 'DESCRIPTIVE',
    scope: 'PRIVATE_TEACHER',
    authorId: 'usr_teacher_01',
    authorName: 'Dr. Ananya Velu',
    prompt:
      'Derive the expression for the moment of inertia of a uniform circular disc of mass M and radius R about an axis passing through its edge and perpendicular to its plane using the Parallel Axis Theorem.',
    options: [],
    positiveMarks: 8,
    negativeMarks: 0,
    recommendedTimeSeconds: 180,
  },
  {
    id: 'q_neet_01',
    programme: 'NEET Preparation',
    subject: 'Biology',
    chapter: 'Human Physiology',
    type: 'MCQ',
    scope: 'SHARED_ACADEMY',
    authorId: 'usr_teacher_01',
    authorName: 'Dr. Karthikeyan Bose',
    prompt:
      'In a standard Electrocardiogram (ECG), the QRS complex represents which physiological event of the cardiac cycle?',
    options: [
      'Depolarization of the ventricles initiating ventricular contraction',
      'Depolarization of the atria (atrial contraction)',
      'Repolarization of the ventricles (return from excited to normal state)',
      'Closure of the semilunar valves',
    ],
    correctOptionIndex: 0,
    positiveMarks: 4,
    negativeMarks: 1,
    recommendedTimeSeconds: 45,
  },
  {
    id: 'q_neet_02',
    programme: 'NEET Preparation',
    subject: 'Chemistry',
    chapter: 'Organic Reaction Mechanisms',
    type: 'MCQ',
    scope: 'SHARED_ACADEMY',
    authorId: 'usr_teacher_01',
    authorName: 'Dr. Karthikeyan Bose',
    prompt:
      'Which of the following alkyl halides undergoes SN2 nucleophilic substitution reaction at the fastest rate?',
    options: [
      'CH₃Br (Bromomethane)',
      'CH₃CH₂Br (Bromoethane)',
      '(CH₃)₂CHBr (2-Bromopropane)',
      '(CH₃)₃CBr (2-Bromo-2-methylpropane)',
    ],
    correctOptionIndex: 0,
    positiveMarks: 4,
    negativeMarks: 1,
    recommendedTimeSeconds: 50,
  },
];

export const SEED_EXAMS: Exam[] = [
  {
    id: 'exm_jee_mock_01',
    title: 'All-Academy JEE Main & Advanced CBT Mock Test #04',
    programme: 'JEE Preparation',
    examType: 'FULL_LENGTH_MOCK',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    batchId: 'batch_sbo_jee',
    batchName: 'SBO-JEE-2027-ALPHA',
    branchCode: 'SBO',
    durationMinutes: 45,
    scheduledDate: '31 Oct 2026 · 18:00 IST',
    totalMarks: 24,
    resultsReleased: true, // Released so Student & Parent can inspect analytics immediately
    questionIds: ['q_jee_01', 'q_jee_02', 'q_jee_03', 'q_jee_04', 'q_jee_05'],
    createdByTeacher: 'Dr. Ananya Velu',
  },
  {
    id: 'exm_neet_timed_02',
    title: 'NEET Phase-II Timed Biology & Organic Mechanisms Assessment',
    programme: 'NEET Preparation',
    examType: 'TIMED_TOPIC_EXAM',
    subjects: ['Biology', 'Chemistry'],
    batchId: 'batch_sbo_neet',
    batchName: 'SBO-NEET-2027-MED',
    branchCode: 'SBO',
    durationMinutes: 30,
    scheduledDate: '02 Nov 2026 · 07:00 IST',
    totalMarks: 16,
    resultsReleased: false, // Pending teacher manual release in Teacher Examination Studio!
    questionIds: ['q_neet_01', 'q_neet_02', 'q_jee_03', 'q_jee_02'],
    createdByTeacher: 'Dr. Karthikeyan Bose',
  },
  {
    id: 'exm_found_03',
    title: 'Class 9–10 Foundation Olympiad Term Benchmark',
    programme: 'Classes 6–10',
    examType: 'CHAPTER_QUIZ',
    subjects: ['Physics', 'Mathematics'],
    batchId: 'batch_anaiyur_found',
    batchName: 'ANAIYUR-FOUNDATION-9A',
    branchCode: 'ANAIYUR',
    durationMinutes: 30,
    scheduledDate: '29 Oct 2026 · 17:00 IST',
    totalMarks: 16,
    resultsReleased: true,
    questionIds: ['q_jee_01', 'q_jee_02', 'q_jee_04', 'q_jee_03'],
    createdByTeacher: 'Meenakshi Sundaram',
  },
];

export const SEED_SUBMISSIONS: ExamSubmission[] = [
  {
    id: 'sub_kavin_jee_01',
    examId: 'exm_jee_mock_01',
    studentId: 'usr_student_01',
    studentName: 'Kavin Rajan',
    // q_jee_01: 0 (correct +4), q_jee_02: 0 (correct +4), q_jee_03: 1 (wrong -1), q_jee_04: 0 (correct +4), q_jee_05: descriptive (+7)
    answers: {
      q_jee_01: 0,
      q_jee_02: 0,
      q_jee_03: 1,
      q_jee_04: 0,
      q_jee_05:
        'By Parallel Axis Theorem, I_edge = I_cm + M*R^2. Since I_cm of a uniform circular disc about perpendicular axis is (1/2)MR^2, we obtain I_edge = (1/2)MR^2 + MR^2 = (3/2)MR^2.',
    },
    markedForReview: ['q_jee_03'],
    timeSpentSeconds: {
      q_jee_01: 68,
      q_jee_02: 54,
      q_jee_03: 82,
      q_jee_04: 49,
      q_jee_05: 145,
    },
    mcqScore: 11,
    descriptiveScore: 7,
    descriptiveEvaluated: true,
    totalScore: 18,
    maxScore: 24,
    accuracyPct: 80,
    submittedAt: '30 Oct 2026 · 19:14 IST',
    previousAttemptPct: 68,
  },
  {
    id: 'sub_divya_found_01',
    examId: 'exm_found_03',
    studentId: 'usr_student_02',
    studentName: 'Divya Rajan',
    answers: {
      q_jee_01: 0,
      q_jee_02: 0,
      q_jee_04: 0,
      q_jee_03: 0,
    },
    markedForReview: [],
    timeSpentSeconds: {
      q_jee_01: 60,
      q_jee_02: 55,
      q_jee_04: 48,
      q_jee_03: 52,
    },
    mcqScore: 16,
    descriptiveScore: 0,
    descriptiveEvaluated: true,
    totalScore: 16,
    maxScore: 16,
    accuracyPct: 100,
    submittedAt: '29 Oct 2026 · 17:26 IST',
    previousAttemptPct: 88,
  },
];

export const SEED_LIVE_CLASSES: LiveClassSession[] = [
  {
    id: 'live_01',
    title: 'JEE Advanced: Rotational Collision & Angular Impulse Problem Solving',
    programme: 'JEE Preparation',
    subject: 'Physics',
    batchId: 'batch_sbo_jee',
    batchName: 'SBO-JEE-2027-ALPHA',
    branchName: 'SBO Colony Campus',
    teacherName: 'Dr. Ananya Velu',
    scheduledAt: 'Today · 18:30 IST',
    status: 'LIVE_NOW',
    attendeeCount: 58,
  },
  {
    id: 'live_02',
    title: 'NEET Zoology: Human Neural Control & Chemical Coordination',
    programme: 'NEET Preparation',
    subject: 'Biology',
    batchId: 'batch_sbo_neet',
    batchName: 'SBO-NEET-2027-MED',
    branchName: 'SBO Colony Campus',
    teacherName: 'Dr. Karthikeyan Bose',
    scheduledAt: 'Tomorrow · 06:30 IST',
    status: 'UPCOMING',
    attendeeCount: 74,
  },
  {
    id: 'live_03',
    title: 'Class 9–10 Olympiad: Euclidean Geometry & Circle Theorems',
    programme: 'Classes 6–10',
    subject: 'Mathematics',
    batchId: 'batch_anaiyur_found',
    batchName: 'ANAIYUR-FOUNDATION-9A',
    branchName: 'Anaiyur Academic Centre',
    teacherName: 'Meenakshi Sundaram',
    scheduledAt: '02 Nov 2026 · 17:00 IST',
    status: 'UPCOMING',
    attendeeCount: 42,
  },
];

export const SEED_FEE_RECORDS: OfflineFeeRecord[] = [
  {
    id: 'fee_01',
    studentId: 'usr_student_01',
    studentName: 'Kavin Rajan',
    programme: 'JEE Preparation',
    branchCode: 'SBO',
    totalAnnualFee: 48000,
    paidAmount: 48000,
    status: 'PAID_OFFLINE',
    receiptNumber: 'KNV-SBO-2026-0891',
    lastPaymentDate: '12 Aug 2026',
    paymentMode: 'BANK_NEFT',
  },
  {
    id: 'fee_02',
    studentId: 'usr_student_02',
    studentName: 'Divya Rajan',
    programme: 'Classes 6–10',
    branchCode: 'ANAIYUR',
    totalAnnualFee: 28000,
    paidAmount: 20000,
    status: 'PARTIAL_OFFLINE',
    receiptNumber: 'KNV-ANA-2026-0314',
    lastPaymentDate: '05 Sep 2026',
    paymentMode: 'CASH_COUNTER',
  },
];

export const SEED_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann_01',
    title: 'All-Academy JEE & NEET Full-Length Mock Schedule — November 2026',
    message:
      'Offline OMR and online CBT mock tests will be conducted simultaneously at both SBO Colony and Anaiyur branches every Sunday from 09:00 to 12:00 IST.',
    scope: 'ACADEMY_WIDE',
    targetLabel: 'All Branches (SBO & Anaiyur)',
    authorName: 'Siddharth Narayanan',
    authorRole: Role.ADMIN,
    createdAt: '31 Oct 2026 · 09:00 IST',
    isUrgent: true,
  },
  {
    id: 'ann_02',
    title: 'SBO Branch Physics Lab: Extra Doubt Clearing Session',
    message:
      'Dr. Ananya Velu will hold an extra problem-solving clinic on Electrostatics and Gauss Law this Saturday at SBO Hall 2.',
    scope: 'BRANCH_SPECIFIC',
    targetLabel: 'SBO Colony Campus · JEE & Class 12',
    authorName: 'Dr. Ananya Velu',
    authorRole: Role.TEACHER,
    createdAt: '30 Oct 2026 · 16:45 IST',
  },
  {
    id: 'ann_03',
    title: 'Anaiyur Class 9–10 Parent-Teacher Academic Review',
    message:
      'Parents of Anaiyur Foundation batch students can review Term-1 descriptive answer sheets online or visit the Anaiyur office.',
    scope: 'CLASS_SPECIFIC',
    targetLabel: 'Classes 6–10 · Anaiyur Branch',
    authorName: 'Meenakshi Sundaram',
    authorRole: Role.TEACHER,
    createdAt: '28 Oct 2026 · 11:20 IST',
  },
];

export const SEED_ENROLLMENTS: Enrollment[] = [
  { userId: 'usr_student_01', courseId: 'crs_fullstack_01' },
  { userId: 'usr_student_01', courseId: 'crs_protocol_03' },
  { userId: 'usr_student_02', courseId: 'crs_compiler_04' },
  { userId: 'usr_teacher_01', courseId: 'crs_fullstack_01' },
  { userId: 'usr_teacher_01', courseId: 'crs_robotics_02' },
  { userId: 'usr_teacher_01', courseId: 'crs_protocol_03' },
  { userId: 'usr_teacher_01', courseId: 'crs_compiler_04' },
];

export const SEED_PROGRESS: Progress[] = [
  { userId: 'usr_student_01', moduleId: 'mod_fs_101', isCompleted: true },
  { userId: 'usr_student_01', moduleId: 'mod_fs_102', isCompleted: true },
  { userId: 'usr_student_01', moduleId: 'mod_fs_103', isCompleted: false },
  { userId: 'usr_student_01', moduleId: 'mod_cry_301', isCompleted: true },
  { userId: 'usr_student_02', moduleId: 'mod_cmp_401', isCompleted: true },
];

export const TECH_STACK_MARQUEE_ITEMS = [
  'CLASSES 6–10 FOUNDATION',
  'CLASSES 11–12 BOARD EXCELLENCE',
  'NEET UG MEDICAL PREP',
  'JEE MAIN & ADVANCED',
  'SBO COLONY CAMPUS',
  'ANAIYUR ACADEMIC CENTRE',
  'TIMED CBT EXAM ENGINE',
  'SUBJECT & CHAPTER ANALYTICS',
  'PARENT MULTI-CHILD PORTAL',
  'YOUTUBE UNLISTED + SUPABASE PDFS',
  'SUPABASE ROW-LEVEL SECURITY',
];
