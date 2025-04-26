
import { v4 as uuidv4 } from 'uuid';

// Types
export interface Certificate {
  id: string;
  name: string;
  token: string;
  event: string;
  issueDate: string;
  certificateUrl: string;
  downloaded: boolean;
}

export interface Issue {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  resolved: boolean;
}

// Local Storage Keys
const CERTIFICATES_KEY = 'certificates';
const ISSUES_KEY = 'issues';

// Helper functions
const getStorageData = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setStorageData = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Certificate Management
export const getCertificates = async (): Promise<Certificate[]> => {
  return getStorageData<Certificate>(CERTIFICATES_KEY);
};

export const addCertificate = async (certificate: Certificate) => {
  const certificates = getStorageData<Certificate>(CERTIFICATES_KEY);
  certificates.push({ ...certificate, id: uuidv4() });
  setStorageData(CERTIFICATES_KEY, certificates);
};

export const updateCertificate = async (certificate: Certificate) => {
  const certificates = getStorageData<Certificate>(CERTIFICATES_KEY);
  const index = certificates.findIndex(c => c.id === certificate.id);
  if (index !== -1) {
    certificates[index] = certificate;
    setStorageData(CERTIFICATES_KEY, certificates);
  }
};

export const deleteCertificate = async (id: string) => {
  const certificates = getStorageData<Certificate>(CERTIFICATES_KEY);
  const filtered = certificates.filter(c => c.id !== id);
  setStorageData(CERTIFICATES_KEY, filtered);
};

export const searchCertificateByName = async (name: string): Promise<Certificate | null> => {
  const certificates = getStorageData<Certificate>(CERTIFICATES_KEY);
  return certificates.find(c => c.name.toLowerCase().includes(name.toLowerCase())) || null;
};

export const searchCertificateByToken = async (token: string): Promise<Certificate | null> => {
  const certificates = getStorageData<Certificate>(CERTIFICATES_KEY);
  return certificates.find(c => c.token === token) || null;
};

// Issue Management
export const getIssues = async (): Promise<Issue[]> => {
  return getStorageData<Issue>(ISSUES_KEY);
};

export const addIssue = async (issue: Issue) => {
  const issues = getStorageData<Issue>(ISSUES_KEY);
  issues.push({ ...issue, id: uuidv4() });
  setStorageData(ISSUES_KEY, issues);
};

export const updateIssue = async (issue: Issue) => {
  const issues = getStorageData<Issue>(ISSUES_KEY);
  const index = issues.findIndex(i => i.id === issue.id);
  if (index !== -1) {
    issues[index] = issue;
    setStorageData(ISSUES_KEY, issues);
  }
};

// Admin Authentication (simplified mock)
export const verifyAdminPassword = async (email: string, password: string): Promise<boolean> => {
  // For demo purposes, accept any non-empty credentials
  return email.length > 0 && password.length > 0;
};

// Generate Unique Token
export const generateUniqueToken = async (): Promise<string> => {
  const generateToken = () => Math.random().toString(36).substring(2, 8).toUpperCase();
  return generateToken();
};
