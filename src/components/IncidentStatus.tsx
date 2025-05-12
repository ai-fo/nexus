
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Webcam, Database, HardDrive, Phone, Car,
  FileText, File, Clock, ChartBar, Bug, Image,
  LayoutDashboard, Network, Folder, Check, X, CircleCheck, CircleX,
  PhoneCall
} from 'lucide-react';
import { Card } from "@/components/ui/card";

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

// Simulated wait time information
export const waitTimeInfo = {
  minutes: 8,
  callers: 5,
  status: 'normal', // 'low', 'normal', 'high'
};

interface IncidentStatusProps {
  showTitle?: boolean;
  compact?: boolean;
  showWaitTime?: boolean;
}

const IncidentStatus: React.FC<IncidentStatusProps> = ({ 
  showTitle = true, 
  compact = false,
  showWaitTime = false
}) => {
  // If compact mode, only show incidents
  const incidents = compact 
    ? appIncidents.filter(app => app.status === 'incident')
    : appIncidents;
  
  return (
    <Card className="w-full bg-white/80 shadow-sm">
      {showTitle && (
        <h3 className="font-medium text-[#004c92] mb-1 px-3 pt-2 text-sm">Incidents en cours</h3>
      )}
      
      {showWaitTime && (
        <div className="bg-blue-50 p-2 flex items-center gap-2 border-b border-blue-100">
          <PhoneCall className="h-4 w-4 text-[#004c92]" />
          <span className="text-sm">
            <span className="font-medium">Temps d'attente hotline:</span>{' '}
            <span className={`font-bold ${
              waitTimeInfo.status === 'low' ? 'text-green-600' : 
              waitTimeInfo.status === 'high' ? 'text-red-600' : 
              'text-amber-600'
            }`}>
              ~{waitTimeInfo.minutes} minutes
            </span>
            {waitTimeInfo.callers > 0 && (
              <span className="text-gray-600 text-xs ml-2">
                ({waitTimeInfo.callers} {waitTimeInfo.callers === 1 ? 'appelant' : 'appelants'} en attente)
              </span>
            )}
          </span>
        </div>
      )}
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30px] px-2"></TableHead>
            <TableHead className="px-2">Application</TableHead>
            <TableHead className="w-[80px] text-right px-2">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.length > 0 ? (
            incidents.map((app) => (
              <TableRow key={app.id} className="hover:bg-blue-50/50">
                <TableCell className="p-1 px-2">{app.icon}</TableCell>
                <TableCell className="font-medium p-1 px-2 text-sm">{app.name}</TableCell>
                <TableCell className="text-right p-1 px-2">
                  {app.status === 'ok' ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 gap-1 text-xs py-0">
                      <CircleCheck className="h-3 w-3" /> OK
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="gap-1 text-xs py-0">
                      <CircleX className="h-3 w-3" /> Incident
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-2 text-sm text-gray-500">
                Aucun incident en cours
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default IncidentStatus;
