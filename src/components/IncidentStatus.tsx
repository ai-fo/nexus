
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Webcam, Database, HardDrive, Phone, Car,
  FileText, File, Clock, ChartBar, Bug, Image,
  LayoutDashboard, Network, Folder, Check, X, CircleCheck, CircleX,
  PhoneCall, AlertTriangle
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  
  const incidentCount = appIncidents.filter(app => app.status === 'incident').length;
  
  return (
    <Card className="w-full bg-white/95 shadow-md border-blue-100 rounded-xl overflow-hidden">
      {showTitle && (
        <div className="bg-gradient-to-r from-[#004c92]/90 to-[#3380cc]/90 text-white p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <h3 className="font-medium text-sm">Incidents en cours</h3>
          </div>
          {incidentCount > 0 && (
            <Badge className="bg-red-500 hover:bg-red-600 text-[10px] h-5">
              {incidentCount} {incidentCount === 1 ? 'incident' : 'incidents'}
            </Badge>
          )}
        </div>
      )}
      
      {showWaitTime && (
        <div className="bg-blue-50 p-2 flex items-center gap-2 border-b border-blue-100">
          <PhoneCall className="h-3.5 w-3.5 text-[#004c92]" />
          <span className="text-xs">
            <span className="font-medium">Temps d'attente hotline:</span>{' '}
            <span className={`font-bold ${
              waitTimeInfo.status === 'low' ? 'text-green-600' : 
              waitTimeInfo.status === 'high' ? 'text-red-600' : 
              'text-amber-600'
            }`}>
              ~{waitTimeInfo.minutes} minutes
            </span>
            {waitTimeInfo.callers > 0 && (
              <span className="text-gray-600 text-xs ml-1">
                ({waitTimeInfo.callers} {waitTimeInfo.callers === 1 ? 'appelant' : 'appelants'} en attente)
              </span>
            )}
          </span>
        </div>
      )}
      
      <ScrollArea className="h-[280px] max-h-[40vh]">
        <Table>
          <TableHeader className="sticky top-0 bg-blue-50/90 backdrop-blur-sm">
            <TableRow>
              <TableHead className="w-[20px] px-2 py-2"></TableHead>
              <TableHead className="px-2 py-2 text-xs font-medium text-[#004c92]">Application</TableHead>
              <TableHead className="w-[70px] text-right px-2 py-2 text-xs font-medium text-[#004c92]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incidents.length > 0 ? (
              incidents.map((app) => (
                <TableRow key={app.id} className="hover:bg-blue-50/50 transition-colors">
                  <TableCell className="p-1 px-2">
                    <div className={`rounded-full p-1 ${app.status === 'incident' ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'}`}>
                      {app.icon}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium p-1 px-2 text-xs">{app.name}</TableCell>
                  <TableCell className="text-right p-1 px-2">
                    {app.status === 'ok' ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 gap-1 text-[10px] py-0.5">
                        <CircleCheck className="h-2.5 w-2.5" /> OK
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="gap-1 text-[10px] py-0.5 bg-red-500 hover:bg-red-600">
                        <CircleX className="h-2.5 w-2.5" /> Incident
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-sm text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    Aucun incident en cours
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
};

export default IncidentStatus;
