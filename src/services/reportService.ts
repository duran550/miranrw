import { reportType } from '@/utils/shared-types';
import DataService from './dataService';
import axios from 'axios';

export default class ReportService extends DataService {
  sendReport = (data: reportType): Promise<{ data: any; status: number }> => {
    return this.post('/api/report/', data);
  };

  updateReport = (id:string,data: reportType): Promise<{ data: any; status: number }> => {
    return this.put('/api/report/'+id, data);
  };

  getAllReport = (): Promise<{
    data:  reportType[] ;
    status: number;
  }> => {
    return this.get('/api/report');
  };
}

export async function getAllReport(token:string) {









   const options = {
     method: 'GET',
     url: '/api/report',
    //  data:{},
    
     headers: {
       Authorization: `${token}`,
       'content-type': 'application/json',
     },
   };

   try {
     await axios
       .request(options)
       .then(function (response) {
         const { data } = response;
         console.log('data',data.reports);
        //  // setConvertedAmount(Math.floor(data.result));
        //  setValue('new_balance', Math.floor(data.result));
        //  setIsLoad(false);
       })
       .catch(function (error) {
         console.error(error);
        //  setIsLoad(false);
       });
   } catch (error) {
     // setIsLoad(false);
   }
}
