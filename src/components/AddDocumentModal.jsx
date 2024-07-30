import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AddDocumentModal = ({ isOpen, onClose, onAddDocument, pressRelease }) => {
  const [documentName, setDocumentName] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddDocument(pressRelease.id, { name: documentName, url: documentUrl });
    setDocumentName('');
    setDocumentUrl('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Document to "{pressRelease.title}"</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="documentName" className="text-right">
                Name
              </Label>
              <Input
                id="documentName"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="documentUrl" className="text-right">
                URL
              </Label>
              <Input
                id="documentUrl"
                value={documentUrl}
                onChange={(e) => setDocumentUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Document</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocumentModal;
