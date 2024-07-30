import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const PressReleaseList = ({ pressReleases, onPressReleaseClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Draft':
        return 'bg-yellow-500';
      case 'Scheduled':
        return 'bg-blue-500';
      case 'Published':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pressReleases.map((pr) => (
          <TableRow key={pr.id} className="cursor-pointer hover:bg-gray-100" onClick={() => onPressReleaseClick(pr)}>
            <TableCell className="font-medium">{pr.title}</TableCell>
            <TableCell>{pr.date}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(pr.status)}>{pr.status}</Badge>
            </TableCell>
            <TableCell>{pr.documents ? pr.documents.length : 0} documents</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PressReleaseList;
