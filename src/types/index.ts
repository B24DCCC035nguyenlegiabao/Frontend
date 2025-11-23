// ============ Enums ============
export const CertificateStatus = {
  PENDING: "PENDING",
  PASS: "PASS",
  FAIL: "FAIL",
} as const;

export type CertificateStatus =
  (typeof CertificateStatus)[keyof typeof CertificateStatus];

export const UserRole = {
  ADMIN: "ROLE_ADMIN",
  STAFF: "ROLE_STAFF",
  USER: "ROLE_USER",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// ============ Auth DTOs ============
export interface LoginRequest {
  username: string;
  password: string;
}

export interface JwtResponse {
  token: string;
  username: string;
  role: string;
}

// ============ Student DTOs ============
export interface StudentDTO {
  id: number;
  msv: string;
  fullName: string;
  ho: string;
  ten: string;
  dateOfBirth: string; // ISO date format
  hometown: string;
  residenceProvince: string;
}

export interface CreateStudentRequest {
  ho: string;
  ten: string;
  dateOfBirth: string; // ISO date format YYYY-MM-DD
  hometown?: string;
  residenceProvince?: string;
}

export interface UpdateStudentRequest {
  ho: string;
  ten: string;
  dateOfBirth: string;
  hometown?: string;
  residenceProvince?: string;
}

// ============ Course DTOs ============
export interface CourseDTO {
  id: number;
  courseCode: string;
  startDate: string; // ISO datetime
  endDate: string; // ISO datetime
  content: string;
}

export interface CreateCourseRequest {
  courseCode: string;
  startDate: string; // ISO datetime YYYY-MM-DDTHH:mm:ss
  endDate: string;
  content?: string;
}

export interface UpdateCourseRequest {
  courseCode: string;
  startDate: string;
  endDate: string;
  content?: string;
}

// ============ Enrollment DTOs ============
export interface EnrollmentDTO {
  id: number;
  studentId: number;
  studentFullName: string;
  courseId: number;
  courseCode: string;
  enrollmentDate: string; // ISO datetime
  status: CertificateStatus;
}

export interface EnrollRequest {
  studentId: number;
  courseId: number;
}

export interface IssueCertificateRequest {
  status: CertificateStatus;
}

export interface EnrollmentHistoryDTO {
  enrollmentId: number;
  courseCode: string;
  courseContent: string;
  enrollmentDate: string;
  courseStartDate: string;
  courseEndDate: string;
  status: CertificateStatus;
}

// ============ Statistics DTOs ============
export interface CourseStatsDTO {
  year: number;
  totalCourses: number;
  totalStudentsEnrolled: number;
  totalPass: number;
  totalFail: number;
}

export interface DashboardSummaryDTO {
  totalStudents: number;
  totalCourses: number;
  totalEnrollments: number;
  pendingCertificates: number;
}

export interface ProvinceStats {
  [province: string]: number;
}

// ============ UI State ============
export interface AuthState {
  token: string | null;
  username: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
}
