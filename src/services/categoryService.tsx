import {
  CategoryType,
  ReportAndCategoryType,
  reportType,
} from '@/utils/shared-types';
import DataService from './dataService';
import axios from 'axios';
import { getUserCookies } from '@/cookies/cookies';

export default class CategoryService extends DataService {
  getAllCategory = (): Promise<{
    data: {
      categorys: CategoryType[];
    };
    status: number;
  }> => {
    return this.get('/api/category');
  };

  getCategoryByReport = (
    id: string
  ): Promise<{
    data: {
      data: ReportAndCategoryType[];
    };
    status: number;
  }> => {
    return this.get('/api/report-and-category/');
  };
  deleteCategory = (
    id: string
  ): Promise<{
    data: any;
    status: number;
  }> => {
    return this.delete('/api/category?id=' + id);
  };

  deleteReportAndCategory = (
    id: string
  ): Promise<{
    data: any;
    status: number;
  }> => {
    return this.delete('/api/report-and-category?id=' + id);
  };

  showDefaultCat = (
    id: string
  ): Promise<{
    data: string[];
    status: number;
  }> => {
    return this.get(
      'https://api.medar.nrw/categorization?token=' +
        getUserCookies().token +
        '&id=' +
        id
    );
  };
  createCategorieByReport = (data: {
    text: string;
    level: string;
    category: string;
    report: string;
  }): Promise<{
    status: number;
    data: any;
  }> => {
    return this.post('/api/report-and-category', data);
  };

  createCategorie = (data: {
    name: string;
    level: string;
    parent?: string;
    childre?: string;
  }): Promise<{
    status: number;
    data: {
      name: string;
      parent: string;
      level: string;

      _id: string;
    };
  }> => {
    return this.post('/api/category', data);
  };
}
