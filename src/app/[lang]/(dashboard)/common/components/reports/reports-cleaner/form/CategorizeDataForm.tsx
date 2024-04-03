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
type AnyInputType = {
  options:string[]
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
const CategorizeDataForm: React.FC<{ option?: any }> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cat, setCat] = useState<categoryType>([]);

  const [reportCarData] = useState(dataCategorizationOptions);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<AnyInputType>();

  const { state, dispatch } = useContext(AdminContext);
  // console.log("/./././././: ", state.reportsCardTableUncategorized)

  // useEffect (() => {
  //     setValue ()
  // }, [])
  useEffect(() => {
    const response = new CategoryService().getAllCategory().then((result) => {
      setCat(result.data.categorys);

      if (result.status == 200 || result.status == 201) {
      }
    });
  }, []);

  const onSubmit: SubmitHandler<AnyInputType> = (data) => {
    const newReportData = {};

    dispatch({ type: 'ADD_CATEGORY', payload: state });
  };

  console.log(cat, 'this is my cat');

  return (
    <div className="border rounded-xl p-4 border-gray-300 w-full mb-6">
      <h1 className="font-bold text-xl opacity-80 my-4">Categorize Data</h1>
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
                            value={option?._id}
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
              <span className="text-sm font-bold">Save Categorization</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategorizeDataForm;
