import { reportType } from '@/utils/shared-types';
import DataService from './dataService';
import axios from 'axios';

export default class CategoryService extends DataService {
  getAllCategory = (): Promise<{
    data: {
      categorys: {
        category: {
          _id: string;
          name: string;
          createdAt: string;
          updatedAt: string;
        
        };
        options: {
          _id: string;
          name: string;
          category: string;
          createdAt: string;
          updatedAt: string;
        
        }[];
      }[];
    };
    status: number;
  }> => {
    return this.get('/api/category');
  };
}


