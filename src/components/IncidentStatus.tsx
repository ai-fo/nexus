
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Webcam, Database, HardDrive, Phone, Car,
  FileText, File, Clock, ChartBar, Bug, Image,
  LayoutDashboard, Network, Folder, AlertTriangle, PhoneCall
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
    <Card className="w-full rounded-lg overflow-hidden shadow-sm border border-blue-100 bg-white">
      {showTitle && (
        <div className="bg-gradient-to-r from-[#004c92] to-[#0066cc] text-white p-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4" />
            <h3 className="font-medium text-sm">Incidents en cours</h3>
          </div>
          {incidentCount > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
              {incidentCount} {incidentCount === 1 ? 'incident' : 'incidents'}
            </span>
          )}
        </div>
      )}
      
      {showWaitTime && (
        <div className="bg-blue-50 p-1.5 flex items-center gap-1.5 text-xs border-b border-blue-100">
          <PhoneCall className="h-3 w-3 text-[#004c92]" />
          <span className="font-medium">Temps d'attente:</span>{' '}
          <span className={`font-bold ${
            waitTimeInfo.status === 'low' ? 'text-green-600' : 
            waitTimeInfo.status === 'high' ? 'text-red-600' : 
            'text-amber-600'
          }`}>
            ~{waitTimeInfo.minutes} min
          </span>
          {waitTimeInfo.callers > 0 && (
            <span className="text-gray-500 text-[10px]">
              ({waitTimeInfo.callers} en attente)
            </span>
          )}
        </div>
      )}
      
      <ScrollArea className={compact ? "h-[220px]" : "h-[300px]"}>
        <div className="grid grid-cols-2 gap-0 text-sm">
          <div className="font-medium p-2 text-[#004c92] text-sm bg-blue-50 border-b border-r border-blue-100">
            Application
          </div>
          <div className="font-medium p-2 text-[#004c92] text-sm text-center bg-blue-50 border-b border-blue-100">
            Status
          </div>
          
          {incidents.length > 0 ? (
            incidents.map((app) => (
              <React.Fragment key={app.id}>
                <div className="p-2 border-b border-r border-blue-50 flex items-center gap-2">
                  <span className={`${app.status === 'incident' ? 'text-red-500' : 'text-blue-600'}`}>
                    {app.icon}
                  </span>
                  <span className="text-sm">{app.name}</span>
                </div>
                <div className="p-2 border-b border-blue-50 flex justify-center">
                  {app.status === 'ok' ? (
                    <span className="px-2 py-0.5 text-[10px] font-medium text-green-700 bg-green-50 rounded-full flex items-center justify-center">OK</span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] font-medium text-white bg-red-500 rounded-full flex items-center justify-center">Incident</span>
                  )}
                </div>
              </React.Fragment>
            ))
          ) : (
            <div className="col-span-2 p-4 text-center text-sm text-gray-500">
              <div className="flex flex-col items-center gap-2 py-4">
                Aucun incident en cours
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default IncidentStatus;
