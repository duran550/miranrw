'use client';
// import RadioSingle from '@/app/[lang]/(dashboard)/dashboard/cleaned-reports/components/radio/RadioSingle';
import { dataCategorizationOptions } from '@/app/[lang]/(dashboard)/dashboard/reports/reportsCardDatas';
import { Button } from '@/app/components/button/Button';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Checkbox from '../../../forms/radio/Checkbox';
import { AdminContext } from '../../../../context/AdminContext';
import { DataCategorizationOptionType } from '@/app/[lang]/(dashboard)/dashboard/reports/reportSummaryType';
import CategoryService from '@/services/categoryService';
import { usePathname } from 'next/navigation';
import { CategoryType, reportType, reportType2 } from '@/utils/shared-types';
import Item from 'antd/es/list/Item';
import ReportService from '@/services/reportService';
import { Spinner } from '@nextui-org/react';
import Image from 'next/image';
import level1Icon from '../../../../../../../../../public/Property 1=folder 1.svg';
import level2Icon from '../../../../../../../../../public/Property 1=level 2.svg';
import level3Icon from '../../../../../../../../../public/Property 1=level 3.svg';
// import addIcon from '../../../../../../../../../public/Add.svg';
import substractcon from '../../../../../../../../../public/Subtract.svg';
import showcon from '../../../../../../../../../public/Add (1).svg';
import addIcon from '../../../../../../../../../public/Add.svg';
import InputFieldCategorize from '@/app/components/forms/text-field/InputFieldCategorize';
import TextSelector from '@/app/components/text-selector/TextSelector';
import toast, { Toaster } from 'react-hot-toast';
import { CategorizeContext } from '@/app/context/CategorizeContext';
import CardCategory from '@/app/components/settingViewer/card-category/CardCategory';
import CardCategoryShow from '@/app/components/settingViewer/card-category/CardCategoryShow';
import { string } from 'joi';
// import substractcon from '../../../../public/Subtract.svg';
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
const generateArray = (array: any[]) => {
  let array_return: any[] = [];
  array.map((item) => {
    if (!item.parent && item.level == 'level1') {
      array_return.push(item);
    }
  });
  array_return.map((item) => {
    item.children = [];
    array.map((items) => {
      if (
        items.parent &&
        items.parent?._id == item._id &&
        items.level == 'level2'
      ) {
        items.children = [];
        item.children.push(items);
      }
    });
  });

  array_return.map((items) => {
    items.children.map((items2: any) => {
      items2.children = [];
      array.map((items3) => {
        if (
          items3.parent &&
          items3.parent._id == items2._id &&
          items3.level == 'level3'
        ) {
          items3.children = [];
          items2.children.push(items3);
        }
      });
    });
  });

  return array_return;
};
const CategorizeDataForm: React.FC<{
  option?: any;
  report?: reportType2;
  refreshCurrent?: any;
  categoriseReport?: any;
}> = ({ report, refreshCurrent, categoriseReport }) => {
  const {
    arrayIdCate,
    fillArraySave,
    fillReportCategory,
    addcategory,
    arrayId,
    arraySave,
    text,
    setTextHandler,
    arrayReportAndCategory,
    resetHandler,
    arrayDefaultCat,
  } = useContext(CategorizeContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [selectedText, setselectedText] = useState('');
  const [categoryTable, setCategoryTable] = useState<string[]>([]);
  const [arrayCat, setArrayCat] = useState<any[]>([]);
  const [idCat, setidCat] = useState('');
  const [level, setLevel] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [step1, setStep1] = useState('');
  const [step2, setStep2] = useState('');
  const [cat, setCat] = useState<CategoryType[]>([]);
  const pathname = usePathname();
  const urlSplit = pathname.split('/');
  const [reportCarData] = useState(dataCategorizationOptions);
  const hasMounted = useRef(false);
  const deleteHandler = async (id: string) => {
    const splitId = id.split('_');
    if (splitId.length == 1) {
      try {
        setIsLoad(true);
        const categoriseService = new CategoryService();
        await categoriseService.deleteReportAndCategory(id).catch((error) => {
          toast.error(error.response.data.message);
        });
        setIsLoad(false);
        toast.success('categorization deleted');
      } catch (error) {
        console.log(error);

        toast.error('delete failed try later');
        setIsLoad(false);
      }
    }
    const value = arrayReportAndCategory.filter((item) => item._id != id);
    const value2 = arraySave.filter((item) => item.id != id);
    fillArraySave(value2);
    fillReportCategory(value);
    categoriseReport(id, 'delete');
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<{ search: string }>({
    mode: 'onChange' || 'onBlur' || 'onSubmit',
  });

  let search = watch('search');

  const filterAray = useMemo(() => {
    let array: any[] = arrayCat;
    if (search) {
      array = arrayCat.filter((item: any) => item.name.includes(search));
    }
    return array;
  }, [search, cat]);

  useEffect(() => {
    if (!hasMounted.current) {
      setIsLoad(true);

      const response = new CategoryService()
        .getAllCategory()
        .then((result) => {
          if (result.status == 200 || result.status == 201) {
            // setCat(result.data.categorys);
            addcategory(result.data.categorys);
            setIsLoad(false);
          }
        })
        .catch((error) => setIsLoad(false));
      hasMounted.current = true;
    }
  }, []);

  const handleTextSelect = async (selectedText: string) => {
    setTextHandler(selectedText);
  };
  console.log('arraySave', arraySave);

  return (
    <div className="border rounded-xl p-4 border-gray-300 w-full  max-h-[70vh] overflow-y-auto overscroll-none no-scrollbar pb-20">
      <TextSelector onTextSelect={handleTextSelect} />
      <Toaster position="top-center" />
      {isLoad ? (
        <Spinner label="Loading . . . " color="primary" size="lg" />
      ) : (
        <div>
          <h1 className="text-2xl text-[#6B7273] font-bold mt-5">Action</h1>

          <div className="w-full flex my-10">
            <Button
              className="w-fit rounded-lg font-bold py-4 px-7"
              variant={arraySave.length == 0 ? 'disabled' : 'primary'}
              disabled={arraySave.length == 0}
              onClick={async () => {
                const categorizeService = new CategoryService();

                try {
                  if (arraySave.length > 0) {
                    setIsLoading(true);
                    await Promise.all(
                      arraySave.map(async (item) => {
                        await categorizeService
                          .createCategorieByReport({
                            text: item.text,
                            report: report?._id!,
                            category: item.category,
                            level: item.level,
                          })
                          .catch((error) => {
                            toast.error(error.response.data.message);
                          });
                        categoriseReport(
                          report?.categoryandreports
                            ? String(report?.categoryandreports?.length + 1)
                            : '',
                          'add'
                        );
                      })
                    );
                  }
                  toast.success('catégorisé!!');
                  setIsLoading(false);
                  refreshCurrent();
                  resetHandler();
                } catch (error) {
                  resetHandler();
                  console.log("error===========",error);
                  
                  setIsLoading(false);
                  toast.error('échec');
                }
              }}
            >
              {isLoading ? <Spinner color="white" size="sm" /> : 'Save'}
            </Button>
          </div>
          <p className="font-bold"> proposed catégories</p>

          <div className="w-full   my-2 flex flex-wrap gap-3">
            {arrayDefaultCat.length == 0 && (
              <p className=" text-sm">no category proposed</p>
            )}
            {arrayDefaultCat.length > 0 &&
              Object.values(arrayDefaultCat[0]).length > 0 && (
                <CardCategoryShow
                  text={Object.values(arrayDefaultCat[0])[0]}
                  indice="level1"
                />
              )}
            {arrayDefaultCat.length > 0 &&
              Object.values(arrayDefaultCat[0]).length > 1 && (
                <CardCategoryShow
                  text={Object.values(arrayDefaultCat[0])[1]}
                  indice="level2"
                />
              )}
            {arrayDefaultCat.length > 0 &&
              Object.values(arrayDefaultCat[0]).length > 2 && (
                <CardCategoryShow
                  text={Object.values(arrayDefaultCat[0])[2]}
                  indice="level3"
                />
              )}
          </div>
          {/* <InputFieldCategorize
            title="Search data"
            placeholder="Type level name"
            name="search"
          /> */}
          <p className="mt-10 mb-2 font-bold"> shoosen catégories</p>

          <div className=" flex flex-wrap gap-3">
            {arrayReportAndCategory.length > 0 &&
              arrayReportAndCategory.map((items) =>
                arrayIdCate.map((item) => {
                  if (items.category._id == item._id) {
                    return (
                      <CardCategory
                        key={item._id}
                        text={item.name!}
                        indice={item.level!}
                        id={items._id!}
                        deleHandler={deleteHandler}
                      />
                    );
                  }
                })
              )}
          </div>
          {/* {cat.map((item, index) => (
            <div className="mt-10" key={item._id + index}>
              <div
                className={`${item.children.length > 0 && 'cursor-pointer'}  ${
                  index > 0 && 'mt-3'
                } flex  items-center`}
                key={item._id}
              >
                <Image
                  onClick={() => {
                    if (item.children.length > 0 && step1 == item._id) {
                      setStep1('');
                      setStep2('');
                    } else {
                      setStep1(item._id);
                      setStep2('');
                    }
                  }}
                  src={
                    step1 == item._id || item.children.length == 0
                      ? substractcon
                      : showcon
                  }
                  alt=""
                />

                <Image src={level1Icon} alt="" className="mr-1 ml-2" />
                <span
                  onClick={() => {
                    idCat == item._id ? setidCat('') : setidCat(item._id);
                     setLevel('#BDDEFF');
                  }}
                  className={`${item._id == idCat && 'underline font-bold'}`}
                >
                  {item.name}
                </span>
              </div>
              {step1 == item._id &&
                item.children.map((items: any) => (
                  <>
                    <div
                      key={items._id}
                      className={`${
                        items.children.length > 0 && 'cursor-pointer'
                      }   pl-8 flex items-center mt-1`}
                    >
                      <Image
                        onClick={() => {
                          if (step2 == items._id) {
                            setStep2('');
                          } else {
                            setStep2(items._id);
                          }
                        }}
                        src={
                          step2 == items._id || items.children.length == 0
                            ? substractcon
                            : showcon
                        }
                        alt=""
                      />

                      <Image src={level2Icon} alt="" className="mr-1 ml-2" />
                      <span
                        className={`${
                          items._id == idCat && 'underline font-bold'
                        }`}
                        onClick={() => {
                          idCat == items._id
                            ? setidCat('')
                            : setidCat(items._id);
                           
                         
                          setLevel("#FDB79B")
                        }}
                      >
                        {items.name}
                      </span>
                    </div>

                    {step2 == items._id &&
                      items.children.map((items2: any) => {
                        return (
                          <div
                            key={items2._id}
                            className="pl-[52px]  flex items-center mt-1"
                          >
                            <Image
                              src={level3Icon}
                              alt=""
                              className="mr-1 ml-2"
                            />
                            <span
                              className={`${
                                items2._id == idCat && 'underline font-bold'
                              } cursor-pointer`}
                              onClick={() => {
                                idCat == items2._id
                                  ? setidCat('')
                                  : setidCat(items2._id);
                          setLevel('#43AA8B');
                                
                              }}
                            >
                              {items2.name}
                            </span>
                          </div>
                        );
                      })}
                  </>
                ))}
            </div>

            //
          ))} */}
        </div>
      )}
    </div>
  );
};

export default CategorizeDataForm;
