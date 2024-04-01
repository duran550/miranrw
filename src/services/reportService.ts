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
    data: { reports: reportType[] };
    status: number;
  }> => {
    return this.get('/api/report');
  };
}

export async function getAllReport(token:string) {
  // try {
  //   const response = await fetch('/api/report', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `${token}`,
  //       'content-type': 'application/json',
  //     },
  //   }).then((result) => {
  //     if (result.status === 200 || result.status == 2001) {
  //       console.log('result',result);
        
  //       return result.json()
  //     }
  //   });
   
  // } catch (error) {
  //   console.error('Error fetching users:', error);
  //   throw error; // Re-throw the error to handle it in the component
  // }









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
