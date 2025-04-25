
// Certificate and Issue Types
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

// LocalStorage Keys
const CERTIFICATES_KEY = 'ecell_certificates';
const ISSUES_KEY = 'ecell_issues';
const ADMIN_PASSWORD_KEY = 'ecell_admin_password';

// Default Admin Password (in a real app, this would be stored securely on a backend)
const DEFAULT_PASSWORD = 'InnovatExpo2025';

// Initialize default data
const initializeData = () => {
  if (!localStorage.getItem(ADMIN_PASSWORD_KEY)) {
    localStorage.setItem(ADMIN_PASSWORD_KEY, DEFAULT_PASSWORD);
  }
  
  if (!localStorage.getItem(CERTIFICATES_KEY)) {
    localStorage.setItem(CERTIFICATES_KEY, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(ISSUES_KEY)) {
    localStorage.setItem(ISSUES_KEY, JSON.stringify([]));
  }
};

// Certificate Management
export const getCertificates = (): Certificate[] => {
  initializeData();
  return JSON.parse(localStorage.getItem(CERTIFICATES_KEY) || '[]');
};

export const addCertificate = (certificate: Certificate) => {
  const certificates = getCertificates();
  localStorage.setItem(CERTIFICATES_KEY, JSON.stringify([...certificates, certificate]));
};

export const updateCertificate = (certificate: Certificate) => {
  const certificates = getCertificates();
  const updatedCertificates = certificates.map(c => 
    c.id === certificate.id ? certificate : c
  );
  localStorage.setItem(CERTIFICATES_KEY, JSON.stringify(updatedCertificates));
};

export const deleteCertificate = (id: string) => {
  const certificates = getCertificates();
  const updatedCertificates = certificates.filter(c => c.id !== id);
  localStorage.setItem(CERTIFICATES_KEY, JSON.stringify(updatedCertificates));
};

export const searchCertificateByName = (name: string): Certificate | null => {
  const certificates = getCertificates();
  const foundCertificate = certificates.find(
    c => c.name.toLowerCase().includes(name.toLowerCase())
  );
  return foundCertificate || null;
};

export const searchCertificateByToken = (token: string): Certificate | null => {
  const certificates = getCertificates();
  const foundCertificate = certificates.find(
    c => c.token.toLowerCase() === token.toLowerCase()
  );
  return foundCertificate || null;
};

// Issue Management
export const getIssues = (): Issue[] => {
  initializeData();
  return JSON.parse(localStorage.getItem(ISSUES_KEY) || '[]');
};

export const addIssue = (issue: Issue) => {
  const issues = getIssues();
  localStorage.setItem(ISSUES_KEY, JSON.stringify([...issues, issue]));
};

export const updateIssue = (issue: Issue) => {
  const issues = getIssues();
  const updatedIssues = issues.map(i => 
    i.id === issue.id ? issue : i
  );
  localStorage.setItem(ISSUES_KEY, JSON.stringify(updatedIssues));
};

// Admin Authentication
export const verifyAdminPassword = (password: string): boolean => {
  initializeData();
  const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
  return password === storedPassword;
};

// Generate Unique Token
export const generateUniqueToken = (): string => {
  const certificates = getCertificates();
  const tokens = certificates.map(c => c.token);
  
  const generateToken = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };
  
  let token = generateToken();
  while (tokens.includes(token)) {
    token = generateToken();
  }
  
  return token;
};
