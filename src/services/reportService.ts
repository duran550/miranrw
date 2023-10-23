import { reportType } from '@/utils/shared-types';
import DataService from './dataService';

export default class ReportService extends DataService {
  sendReport = (data: reportType) => {
    return this.post('/api/report/', data);
  };

  getAllReport = (): reportType => {
    return this.get('/');
  };
}
