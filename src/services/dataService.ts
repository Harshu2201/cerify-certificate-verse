
import { supabase } from '@/lib/supabase';

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

// Certificate Management
export const getCertificates = async (): Promise<Certificate[]> => {
  const { data, error } = await supabase
    .from('certificates')
    .select('*');

  if (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }

  return data || [];
};

export const addCertificate = async (certificate: Certificate) => {
  const { error } = await supabase
    .from('certificates')
    .insert([certificate]);

  if (error) {
    console.error('Error adding certificate:', error);
    throw error;
  }
};

export const updateCertificate = async (certificate: Certificate) => {
  const { error } = await supabase
    .from('certificates')
    .update(certificate)
    .eq('id', certificate.id);

  if (error) {
    console.error('Error updating certificate:', error);
    throw error;
  }
};

export const deleteCertificate = async (id: string) => {
  const { error } = await supabase
    .from('certificates')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting certificate:', error);
    throw error;
  }
};

export const searchCertificateByName = async (name: string): Promise<Certificate | null> => {
  const { data, error } = await supabase
    .from('certificates')
    .select()
    .ilike('name', `%${name}%`)
    .limit(1)
    .single();

  if (error) {
    console.error('Error searching certificate:', error);
    return null;
  }

  return data;
};

export const searchCertificateByToken = async (token: string): Promise<Certificate | null> => {
  const { data, error } = await supabase
    .from('certificates')
    .select()
    .eq('token', token)
    .limit(1)
    .single();

  if (error) {
    console.error('Error searching certificate:', error);
    return null;
  }

  return data;
};

// Issue Management
export const getIssues = async (): Promise<Issue[]> => {
  const { data, error } = await supabase
    .from('issues')
    .select('*');

  if (error) {
    console.error('Error fetching issues:', error);
    return [];
  }

  return data || [];
};

export const addIssue = async (issue: Issue) => {
  const { error } = await supabase
    .from('issues')
    .insert([issue]);

  if (error) {
    console.error('Error adding issue:', error);
    throw error;
  }
};

export const updateIssue = async (issue: Issue) => {
  const { error } = await supabase
    .from('issues')
    .update(issue)
    .eq('id', issue.id);

  if (error) {
    console.error('Error updating issue:', error);
    throw error;
  }
};

// Admin Authentication
export const verifyAdminPassword = async (email: string, password: string): Promise<boolean> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error during login:', error);
    return false;
  }

  return !!data.user;
};

// Generate Unique Token
export const generateUniqueToken = async (): Promise<string> => {
  const generateToken = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };
  
  let token = generateToken();
  let isUnique = false;
  
  while (!isUnique) {
    const certificate = await searchCertificateByToken(token);
    if (!certificate) {
      isUnique = true;
    } else {
      token = generateToken();
    }
  }
  
  return token;
};
