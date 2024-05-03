'use client';
// import RadioSingle from '@/app/[lang]/(dashboard)/dashboard/cleaned-reports/components/radio/RadioSingle';
import { dataCategorizationOptions } from '@/app/[lang]/(dashboard)/dashboard/reports/reportsCardDatas';
import { Button } from '@/app/components/button/Button';
import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Checkbox from '../../../forms/radio/Checkbox';
import { AdminContext } from '../../../../context/AdminContext';
import { DataCategorizationOptionType } from '@/app/[lang]/(dashboard)/dashboard/reports/reportSummaryType';
import CategoryService from '@/services/categoryService';
import { usePathname } from 'next/navigation';
import { reportType, reportType2 } from '@/utils/shared-types';
import Item from 'antd/es/list/Item';
import ReportService from '@/services/reportService';
type AnyInputType = {
  options: string[];
};
type categoryType = {
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
const CategorizeDataForm: React.FC<{
  option?: any;
  report?: reportType2;
  refreshCurrent?: any;
  categoriseReport?: any;
}> = ({ report, refreshCurrent, categoriseReport }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [categoryTable, setCategoryTable] = useState<string[]>([]);

  const [cat, setCat] = useState<categoryType>([]);
  const pathname = usePathname();
  const urlSplit = pathname.split('/');
  const [reportCarData] = useState(dataCategorizationOptions);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<AnyInputType>();

  const { state, dispatch } = useContext(AdminContext);
  let options = watch('options');
  const updateReport = (cat: string[], desc: string) => {
    try {
      setIsLoading(true);
      const report = new ReportService()
        .updateReport(urlSplit[urlSplit.length - 1], {
          category: cat,
          status: 'cleaned',
          description: desc,
        })
        .then((result) => {
          if (result.status == 200 || result.status == 201) {
            // refreshCurrent();
            categoriseReport(desc, cat);
            setTimeout(() => {
              setIsLoading(false);
              setIsEdit(false);
            }, 1000);
          }
        })
        .catch((error) => {
          console.log('error', error);
          setIsLoading(false);

          // alert('ok');
        });
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsLoad(true);

    const response = new CategoryService()
      .getAllCategory()
      .then((result) => {
        if (result.status == 200 || result.status == 201) {
          setCat(result.data.categorys);
          setIsLoad(false);
        }
      })
      .catch((error) => setIsLoad(false));
  }, []);

  useEffect(() => {
    let array: string[] = [];

    if (report?.category2 && report.category2.length > 0) {
      setValue('options', report?.category2);
      report.category2.map((item: string) => {
        array.push(item.split('/')[1]);
      });
      const unique = array.filter((x, i) => array.indexOf(x) === i);
      setCategoryTable(unique);
      // setIsEdit(true)
    }
  }, [report]);

  const onSubmit: SubmitHandler<AnyInputType> = (data) => {
    updateReport(data.options, report?.description2!);
    // dispatch({ type: 'ADD_CATEGORY', payload: state });
  };

  return (
    <div className="border rounded-xl p-4 border-gray-300 w-full mb-6 max-h-[70vh] overflow-y-auto overscroll-none no-scrollbar">
      <h1 className="font-bold text-xl opacity-80 my-4">Categorize Data</h1>
      {((report?.category2 && report.category2.length == 0) ||
        (report?.category2 && report.category2.length > 0 && isEdit)) &&
        !isLoad && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4 flex flex-col gap-4 max-h-[50vh] overflow-y-scroll">
              {cat &&
                cat.length > 0 &&
                cat?.map((reportCard, index) => {
                  return (
                    <div
                      key={index}
                      className="border rounded-xl p-4 border-gray-300 w-full"
                    >
                      <h1>{reportCard?.category.name}</h1>
                      <div className="grid grid-cols-[repeat(auto-fit,minmax(50px,150px))]">
                        {reportCard?.options?.map((option) => {
                          return (
                            <div key={option?._id} className="relative group">
                              <Checkbox
                                name={option?.name}
                                label={option?.name}
                                id={option?._id}
                                value={
                                  option?._id +
                                  '/' +
                                  reportCard?.category.name +
                                  '/' +
                                  option?.name
                                }
                                props={register('options', {
                                  required: true,
                                })}
                              />
                              <div className="absolute w-[250px] bg-white p-4 hidden group-hover:block group-hover:rounded-xl z-10 border">
                                <h2>{option?.name}</h2>
                                <p className="text-[10px] ">{option?.name}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="w-full flex justify-end ">
              <Button
                className={`mt-7 rounded-lg text-sm sm:text-xl  ${
                  !isValid || isLoading ? 'opacity-50' : ' opacity-100'
                } bg-greenDisable w-[30%]`}
                // variant={
                //   !isValid || isLoading ? 'primary' : 'saveCategorizationDisabled'
                // }
                type="submit"
                disabled={!isValid || isLoading ? true : false}
              >
                {isLoading ? (
                  <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  ></div>
                ) : (
                  <span className="text-sm font-bold">
                    {isEdit ? 'Save Edit' : 'Save Categorization'}
                  </span>
                )}
              </Button>
            </div>
          </form>
        )}

      {isLoad && <div className='text-center text-4xl'>loading...</div>}

      {report?.category2 &&
        report.category2.length > 0 &&
        !isEdit &&
        !isLoad && (
          <>
            <div className="py-4 flex flex-col gap-4 max-h-[50vh] overflow-y-auto overscroll-none no-scrollbar">
              {categoryTable.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="border rounded-xl p-4 border-gray-300 w-full font-bold"
                  >
                    <h1 className="text-[#828B8C] text-lg mb-4">{item}</h1>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(50px,150px))]">
                      {report.category2?.map((item2: string) => {
                        if (item2.split('/')[1] == item) {
                          return (
                            <div
                              key={item2}
                              className="relative group font-semibold"
                            >
                              <span>{'-' + item2.split('/')[2]}</span>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex justify-end ">
              <Button
                className={`mt-7 rounded-lg text-sm sm:text-xl   bg-greenDisable w-[30%]`}
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                <span className="text-sm font-bold">edit</span>
              </Button>
            </div>
          </>
        )}
    </div>
  );
};

export default CategorizeDataForm;
