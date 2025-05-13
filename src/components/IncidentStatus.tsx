
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, PhoneCall, Webcam, Database, HardDrive, Phone, Car, FileText, File, ChartBar, Bug, Image, LayoutDashboard, Network, Folder } from 'lucide-react';

// Type definition for an application incident
export interface AppIncident {
  id: string;
  name: string;
  status: 'ok' | 'incident';
  icon: React.ReactNode;
}

// Current status of all applications
export const appIncidents: AppIncident[] = [{
  id: 'webex',
  name: 'Webex',
  status: 'ok',
  icon: <Webcam className="h-4 w-4" />
}, {
  id: 'cicssam',
  name: 'CICsSAM',
  status: 'incident',
  icon: <Database className="h-4 w-4" />
}, {
  id: 'samnet',
  name: 'SAMnet',
  status: 'ok',
  icon: <HardDrive className="h-4 w-4" />
}, {
  id: 'phonebook',
  name: 'Phonebook',
  status: 'ok',
  icon: <Phone className="h-4 w-4" />
}, {
  id: 'myparking',
  name: 'MyParking',
  status: 'ok',
  icon: <Car className="h-4 w-4" />
}, {
  id: 'triskell',
  name: 'Triskell',
  status: 'incident',
  icon: <FileText className="h-4 w-4" />
}, {
  id: 'lotusnotes',
  name: 'LotusNotes',
  status: 'ok',
  icon: <File className="h-4 w-4" />
}, {
  id: 'ms365',
  name: 'MS365',
  status: 'ok',
  icon: <File className="h-4 w-4" />
}, {
  id: 'horairemobile',
  name: 'Horaire Mobile',
  status: 'ok',
  icon: <Clock className="h-4 w-4" />
}, {
  id: 'sas',
  name: 'SAS',
  status: 'incident',
  icon: <ChartBar className="h-4 w-4" />
}, {
  id: 'artis',
  name: 'Artis',
  status: 'ok',
  icon: <Bug className="h-4 w-4" />
}, {
  id: 'argos',
  name: 'Argos',
  status: 'ok',
  icon: <Image className="h-4 w-4" />
}, {
  id: 'myportal',
  name: 'MyPortal',
  status: 'ok',
  icon: <LayoutDashboard className="h-4 w-4" />
}, {
  id: 'dsknet',
  name: 'DSKNet',
  status: 'incident',
  icon: <Network className="h-4 w-4" />
}, {
  id: 'gesper',
  name: 'Gesper',
  status: 'ok',
  icon: <Folder className="h-4 w-4" />
}, {
  id: 'mygesper',
  name: 'MyGesper',
  status: 'ok',
  icon: <Folder className="h-4 w-4" />
}];

// Simulated wait time information
export const waitTimeInfo = {
  minutes: 8,
  callers: 5,
  status: 'normal' // 'low', 'normal', 'high'
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
  const incidents = compact ? appIncidents.filter(app => app.status === 'incident') : appIncidents;
  const incidentCount = appIncidents.filter(app => app.status === 'incident').length;
  
  return (
    <Card className="w-full rounded-lg overflow-hidden shadow-sm border border-blue-100 bg-white">
      {showTitle && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-100 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <h3 className="font-semibold text-[#004c92]">
                Incidents en cours ({incidentCount})
              </h3>
            </div>
            
            {showWaitTime && (
              <div className="flex items-center gap-2 bg-white rounded-full px-2 py-0.5 shadow-sm border border-blue-100">
                <PhoneCall className="h-3 w-3 text-[#004c92]" />
                <span className="text-xs text-[#004c92]">~{waitTimeInfo.minutes} min</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      <ScrollArea className={compact ? "h-[220px]" : "max-h-[calc(100vh-300px)]"}>
        <CardContent className="p-3">
          {incidents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {incidents.map(app => (
                <div 
                  key={app.id} 
                  className={`flex items-center p-2 rounded-md ${
                    app.status === 'incident' 
                      ? 'bg-red-50 border border-red-100' 
                      : 'bg-gray-50 border border-gray-100'
                  }`}
                >
                  <div className={`p-1.5 rounded-full mr-2 ${
                    app.status === 'incident' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    <span className={app.status === 'incident' ? 'text-red-500' : 'text-blue-500'}>
                      {app.icon}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{app.name}</p>
                  </div>
                  
                  <Badge 
                    className={`ml-2 ${
                      app.status === 'incident' 
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {app.status === 'incident' ? 'Incident' : 'OK'}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
              <h3 className="text-base font-medium text-gray-700">Aucun incident en cours</h3>
              <p className="text-sm text-gray-500">Tous les systèmes fonctionnent correctement</p>
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default IncidentStatus;
