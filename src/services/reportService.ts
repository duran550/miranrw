import { reportType } from '@/utils/shared-types';
import DataService from './dataService';

export default class ReportService extends DataService {
  sendReport = (data: reportType): Promise<{ data: any; status: number }> => {
    return this.post('/api/report/', data);
  };

  getAllReport = (): Promise<{
    data: { reports: reportType[] };
    status: number;
  }> => {
    return this.get('/api/report');
  };
}
