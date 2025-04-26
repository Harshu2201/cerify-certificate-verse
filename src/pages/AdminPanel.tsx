import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Certificate, Issue, getCertificates, getIssues, addCertificate, updateIssue, deleteCertificate, generateUniqueToken } from '@/services/dataService';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, Trash2, Check, LogOut } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [event, setEvent] = useState('');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      navigate('/admin-login');
      return;
    }
    
    loadData();
    
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, [navigate]);
  
  const loadData = async () => {
    const certificatesData = await getCertificates();
    const issuesData = await getIssues();
    setCertificates(certificatesData);
    setIssues(issuesData);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin-login');
  };
  
  const handleGenerateToken = async () => {
    const newToken = await generateUniqueToken();
    setToken(newToken);
  };
  
  const handleCertificateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!certificateFile) {
      toast({
        title: "Certificate file required",
        description: "Please upload a certificate file",
        variant: "destructive",
      });
      return;
    }

    const fakeUrl = URL.createObjectURL(certificateFile);
    
    const newCertificate: Certificate = {
      id: uuidv4(),
      name,
      token: token || generateUniqueToken(),
      event,
      issueDate,
      certificateUrl: fakeUrl,
      downloaded: false
    };
    
    addCertificate(newCertificate);
    loadData();
    
    toast({
      title: "Certificate Added",
      description: `Certificate for ${name} has been added successfully.`,
    });
    
    setName('');
    setToken('');
    setEvent('');
    setIssueDate(new Date().toISOString().split('T')[0]);
    setCertificateFile(null);
    
    const fileInput = document.getElementById('certificate-file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };
  
  const handleDeleteCertificate = (id: string) => {
    deleteCertificate(id);
    loadData();
    
    toast({
      title: "Certificate Deleted",
      description: "The certificate has been deleted successfully.",
    });
  };
  
  const handleResolveIssue = (issue: Issue) => {
    const updatedIssue = { ...issue, resolved: true };
    updateIssue(updatedIssue);
    loadData();
    
    toast({
      title: "Issue Resolved",
      description: "The issue has been marked as resolved.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold font-poppins bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
        
        <Tabs defaultValue="certificates" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="certificates">Certificate Management</TabsTrigger>
            <TabsTrigger value="issues">Issue Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="certificates" className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg border shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Add New Certificate</h2>
              <form onSubmit={handleCertificateSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Participant Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="token">Token Number</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="token" 
                        value={token} 
                        onChange={(e) => setToken(e.target.value)} 
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleGenerateToken}
                        size="sm"
                      >
                        Generate
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event">Event Name</Label>
                    <Input 
                      id="event" 
                      value={event} 
                      onChange={(e) => setEvent(e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="issue-date">Issue Date</Label>
                    <Input 
                      id="issue-date" 
                      type="date" 
                      value={issueDate} 
                      onChange={(e) => setIssueDate(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="certificate-file">Upload Certificate (PDF/Image)</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <Input
                      id="certificate-file"
                      type="file"
                      onChange={(e) => setCertificateFile(e.target.files ? e.target.files[0] : null)}
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg"
                      required
                    />
                    <label 
                      htmlFor="certificate-file"
                      className="cursor-pointer flex flex-col items-center space-y-2 text-gray-500"
                    >
                      <Upload className="h-8 w-8" />
                      <span>
                        {certificateFile 
                          ? certificateFile.name 
                          : 'Click or drag file to upload'}
                      </span>
                      <span className="text-xs">
                        Supports: PDF, PNG, JPG (max 5MB)
                      </span>
                    </label>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
                  >
                    Add Certificate
                  </Button>
                </div>
              </form>
            </motion.div>
            
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <h2 className="text-xl font-semibold p-6 border-b">All Certificates</h2>
              
              {certificates.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No certificates added yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Token</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {certificates.map((certificate) => (
                          <motion.tr 
                            key={certificate.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="border-b last:border-b-0"
                          >
                            <TableCell className="font-medium">{certificate.name}</TableCell>
                            <TableCell className="font-mono">{certificate.token}</TableCell>
                            <TableCell>{certificate.event}</TableCell>
                            <TableCell>{certificate.issueDate}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteCertificate(certificate.id)}
                                className="text-red-600 hover:text-red-800 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="issues">
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <h2 className="text-xl font-semibold p-6 border-b">Enquiries</h2>
              
              {issues.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No enquiries received yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {issues.map((issue) => (
                          <motion.tr 
                            key={issue.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`border-b last:border-b-0 ${issue.resolved ? 'bg-gray-50' : ''}`}
                          >
                            <TableCell className="font-medium">{issue.name}</TableCell>
                            <TableCell>{issue.email}</TableCell>
                            <TableCell>{issue.subject}</TableCell>
                            <TableCell>{new Date(issue.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <span 
                                className={`px-2 py-1 text-xs rounded-full ${
                                  issue.resolved 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {issue.resolved ? 'Resolved' : 'Pending'}
                              </span>
                            </TableCell>
                            <TableCell>
                              {!issue.resolved && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleResolveIssue(issue)}
                                  className="text-green-600 hover:text-green-800 hover:bg-green-50"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
