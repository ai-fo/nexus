
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Webcam, Database, HardDrive, Phone, Car,
  FileText, File, Clock, ChartBar, Bug, Image,
  LayoutDashboard, Network, Folder, Check, X, CircleCheck, CircleX
} from 'lucide-react';

// Type definition for an application incident
export interface AppIncident {
  id: string;
  name: string;
  status: 'ok' | 'incident';
  icon: React.ReactNode;
}

// Current status of all applications
export const appIncidents: AppIncident[] = [
  { id: 'webex', name: 'Webex', status: 'ok', icon: <Webcam className="h-4 w-4" /> },
  { id: 'cicssam', name: 'CICsSAM', status: 'incident', icon: <Database className="h-4 w-4" /> },
  { id: 'samnet', name: 'SAMnet', status: 'ok', icon: <HardDrive className="h-4 w-4" /> },
  { id: 'phonebook', name: 'Phonebook', status: 'ok', icon: <Phone className="h-4 w-4" /> },
  { id: 'myparking', name: 'MyParking', status: 'ok', icon: <Car className="h-4 w-4" /> },
  { id: 'triskell', name: 'Triskell', status: 'incident', icon: <FileText className="h-4 w-4" /> },
  { id: 'lotusnotes', name: 'LotusNotes', status: 'ok', icon: <File className="h-4 w-4" /> },
  { id: 'ms365', name: 'MS365', status: 'ok', icon: <File className="h-4 w-4" /> },
  { id: 'horairemobile', name: 'Horaire Mobile', status: 'ok', icon: <Clock className="h-4 w-4" /> },
  { id: 'sas', name: 'SAS', status: 'incident', icon: <ChartBar className="h-4 w-4" /> },
  { id: 'artis', name: 'Artis', status: 'ok', icon: <Bug className="h-4 w-4" /> },
  { id: 'argos', name: 'Argos', status: 'ok', icon: <Image className="h-4 w-4" /> },
  { id: 'myportal', name: 'MyPortal', status: 'ok', icon: <LayoutDashboard className="h-4 w-4" /> },
  { id: 'dsknet', name: 'DSKNet', status: 'incident', icon: <Network className="h-4 w-4" /> },
  { id: 'gesper', name: 'Gesper', status: 'ok', icon: <Folder className="h-4 w-4" /> },
  { id: 'mygesper', name: 'MyGesper', status: 'ok', icon: <Folder className="h-4 w-4" /> },
];

interface IncidentStatusProps {
  showTitle?: boolean;
}

const IncidentStatus: React.FC<IncidentStatusProps> = ({ showTitle = true }) => {
  return (
    <div className="w-full">
      {showTitle && (
        <h3 className="font-medium text-[#004c92] mb-2">Incidents en cours</h3>
      )}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Application</TableHead>
              <TableHead className="w-[100px] text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appIncidents.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="p-2">{app.icon}</TableCell>
                <TableCell className="font-medium">{app.name}</TableCell>
                <TableCell className="text-right">
                  {app.status === 'ok' ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 gap-1">
                      <CircleCheck className="h-3 w-3" /> OK
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="gap-1">
                      <CircleX className="h-3 w-3" /> Incident
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IncidentStatus;
