import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PlusCircle, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AddPressReleaseModal from '../components/AddPressReleaseModal';
import AddDocumentModal from '../components/AddDocumentModal';
import PressReleaseList from '../components/PressReleaseList';

const Index = () => {
  const [isAddPressReleaseModalOpen, setIsAddPressReleaseModalOpen] = useState(false);
  const [isAddDocumentModalOpen, setIsAddDocumentModalOpen] = useState(false);
  const [selectedPressRelease, setSelectedPressRelease] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: pressReleases = [], refetch } = useQuery({
    queryKey: ['pressReleases'],
    queryFn: () => {
      // Simulated API call - replace with actual API call in production
      return Promise.resolve([
        { id: 1, title: 'New Product Launch', date: '2024-03-15', status: 'Draft', documents: [] },
        { id: 2, title: 'Q1 Financial Results', date: '2024-04-01', status: 'Published', documents: [] },
        { id: 3, title: 'Partnership Announcement', date: '2024-03-20', status: 'Scheduled', documents: [] },
      ]);
    },
  });

  const handleAddDocument = (pressReleaseId, document) => {
    // In a real application, you would make an API call here
    const updatedPressReleases = pressReleases.map(pr => 
      pr.id === pressReleaseId ? { ...pr, documents: [...pr.documents, document] } : pr
    );
    // Update the cache
    refetch();
    setIsAddDocumentModalOpen(false);
  };

  const filteredPressReleases = pressReleases.filter(pr =>
    pr.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">PR Agency Press Release Tracker</CardTitle>
          <CardDescription>Manage and track your press releases efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Search press releases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button onClick={() => setIsAddPressReleaseModalOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Press Release
            </Button>
          </div>
          <PressReleaseList 
            pressReleases={filteredPressReleases} 
            onPressReleaseClick={(pr) => {
              setSelectedPressRelease(pr);
              setIsAddDocumentModalOpen(true);
            }}
          />
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Total Press Releases: {pressReleases.length}</p>
        </CardFooter>
      </Card>
      <AddPressReleaseModal
        isOpen={isAddPressReleaseModalOpen}
        onClose={() => setIsAddPressReleaseModalOpen(false)}
        onAddPressRelease={() => {
          refetch();
          setIsAddPressReleaseModalOpen(false);
        }}
      />
      <AddDocumentModal
        isOpen={isAddDocumentModalOpen}
        onClose={() => setIsAddDocumentModalOpen(false)}
        onAddDocument={handleAddDocument}
        pressRelease={selectedPressRelease}
      />
    </div>
  );
};

export default Index;
