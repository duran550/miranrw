import { CategorizeContext } from '@/app/context/CategorizeContext';
import { ReportAndCategoryType } from '@/utils/shared-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
// Importez correctement le type
import addIcon from '../../../../public/Add (2).svg';
import Image from 'next/image';
import CardCategory from '../settingViewer/card-category/CardCategory';
import { time } from 'console';
import { usePathname } from 'next/navigation';
import closeIcon from '../../../../public/Dismiss.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormInput } from '../settingViewer/SetingViewer';
import CategoryService from '@/services/categoryService';
import InputFieldCategorize from '../forms/text-field/InputFieldCategorize';
import { Spinner } from '@nextui-org/react';
import CardCategoryShow from '../settingViewer/card-category/CardCategoryShow';

interface HighlightedTextProps {
  description: string;
  selections: ReportAndCategoryType[];
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
  description,
  selections,
}) => {
  const { isShow, addId, IshowHandler, arrayIdCate, addcategory, addReportCategory, text , addarraySave, setTextHandler} =
    useContext(CategorizeContext);
   const [show, setShow] = useState(false);
   const [show2, setShow2] = useState('');
  const [search, setSearch] = useState('');
    const [array, setArray] = useState(arrayIdCate);
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

    const [stepLevel1Id, setstepLevel1Id] = useState('');
    const [stepLevel1Name, setstepLevel1Name] = useState('');
    const [stepLevel2Id, setstepLevel2Id] = useState('');
    const [stepLevel2Name, setstepLevel2Name] = useState('');
  const urlSplit = pathname.split('/');
    const {
      register,
      watch,
      formState: { errors, isSubmitting, isDirty, isValid },
      handleSubmit,
      reset,
      setValue,
    } = useForm<IFormInput>({ mode: 'onChange' || 'onBlur' || 'onSubmit' });
    let level1 = watch('level1');
    let level2 = watch('level2');
    let level3 = watch('level3');
    let search5 = watch('search');
  const escapeRegExp = (string: string) => {
         return string.replace(/([.*+?^${}()|[\]\\])/g, '\\$&');
  };
  const showHandler = (value: string) => {
    alert(value);
  };
 const prevState1Ref = useRef('');
 const prevState2Ref = useRef('');
//  const prevState3Ref = useRef();
  useEffect(() => {
    setArray(
      arrayIdCate.filter((item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    );
  }, [search]);

const getHighlightedText = (
  description: string,
  selections: ReportAndCategoryType[]
) => {
  // Trier les sélections par longueur de texte, du plus long au plus court
  const sortedSelections = [...selections].sort(
    (a, b) => b.text.length - a.text.length
  );
console.log(
  'escapedText2',
  description
    .normalize()
    .replace(/\n/g, ' ')
    .replace(/\u00A0/g, ' ')
    .replace(/[^\x20-\x7E]/g, '')
);
  // Remplacer les sauts de ligne par des espaces
  let highlightedText = description
    .normalize()
    .replace(/\n/g, ' ')
    .replace(/\u00A0/g, ' ')
    .replace(/[^\x20-\x7E]/g, '');

  // Appliquer la mise en surbrillance pour chaque sélection
  sortedSelections.forEach((selection) => {
    const escapedText = escapeRegExp(selection.text);
    const regex = new RegExp(`(${escapedText})`, 'g');
console.log("escapedText", escapedText);
    console.log('escapedText2', regex);
    console.log('escapedText4', highlightedText);
    

    highlightedText = highlightedText.replace(regex, (match) => {
      console.log('escapedText3', match);

      return `<span style="background-color: ${selection.level};" >${match}</span>`;
    });
  });

  // Utilisation de dangerouslySetInnerHTML pour interpréter les balises <span>
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: highlightedText,
      }}
    />
  );
};
 const onSubmit: SubmitHandler<IFormInput> = async (data) => {
   if (data.level3) {
     let count = 1;
     setLoading(true);
     const arrayStep3 = data.level3.split(';');
     const categoriesService = new CategoryService();
     try {
       if (
         stepLevel2Id.length == 0 &&
         stepLevel1Id.length == 0 
       ) {
         const id_livel1 = await categoriesService.createCategorie({
           name: data.level1,
           level: 'level1',
         });
         const id_livel2 = await categoriesService.createCategorie({
           name: data.level2,
           parent: id_livel1.data._id,
           level: 'level2',
         });

         // Attendre la résolution de toutes les promesses
         await Promise.all(
           arrayStep3.map(async (item) => {
             await categoriesService.createCategorie({
               name: item,
               parent: id_livel2.data._id,
               level: 'level3',
             });
             count += 1;
           })
         );
       } else {
         if (stepLevel2Id.length > 0) {
           await Promise.all(
             arrayStep3.map(async (item) => {
               await categoriesService.createCategorie({
                 name: item,
                 parent: stepLevel2Id,
                 level: 'level3',
               });
               count += 1;
             })
           );
         } else {
           const id_livel2 = await categoriesService.createCategorie({
             name: data.level2,
             parent: stepLevel1Id,
             level: 'level2',
           });

           // Attendre la résolution de toutes les promesses
           await Promise.all(
             arrayStep3.map(async (item) => {
               await categoriesService.createCategorie({
                 name: item,
                 parent: id_livel2.data._id,
                 level: 'level3',
               });
               count += 1;
             })
           );
         }
       }

       // Vérification après la résolution de toutes les promesses

      //  getCategorie();
       //  toast.success('created');
         const categori = await categoriesService.getAllCategory();
       
         addcategory(categori.data.categorys);

       reset();
     } catch (error) {
       setLoading(false);
      //  toast.error(
      //    'the creation process could not be completed an error occurred'
      //  );
     } finally {
       setLoading(false);
     }
   }

   if (!data.level3 && data.level2) {
     setLoading(true);
     const arrayStep3 = data.level3.split(';');
     const categoriesService = new CategoryService();
     try {
       if (stepLevel1Id.length == 0) {
         const id_livel1 = await categoriesService.createCategorie({
           name: data.level1,
           level: 'level1',
         });
         const id_livel2 = await categoriesService.createCategorie({
           name: data.level2,
           parent: id_livel1.data._id,
           level: 'level2',
         });
       } else {
         const id_livel2 = await categoriesService.createCategorie({
           name: data.level2,
           parent: stepLevel1Id,
           level: 'level2',
         });
       }

      //  getCategorie();
      //  toast.success('created');
 const categori = await categoriesService.getAllCategory();

 addcategory(categori.data.categorys);
       reset();
     } catch (error) {
      //  toast.error(
      //    'the creation process could not be completed an error occurred'
      //  );

       setLoading(false);
     } finally {
       setLoading(false);
     }
   }
   if (!data.level2 && !data.level3) {
     setLoading(true);

     const arrayStep3 = data.level3.split(';');
     const categoriesService = new CategoryService();
     try {
       const id_livel1 = await categoriesService.createCategorie({
         name: data.level1,
         level: 'level1',
       });

     
 const categori = await categoriesService.getAllCategory();

 addcategory(categori.data.categorys);
       reset();
     } catch (error) {
       setLoading(false);
    
     } finally {
       setLoading(false);
     }
   }
   setShow(false);
   setShow2('');
   setstepLevel1Id('');
   setstepLevel1Name('');
   setstepLevel2Id('');
   setstepLevel2Name('');
 };
  useEffect(() => {
    const lev1 = prevState1Ref.current
    const lev2 = prevState2Ref
  
    if (level1 && lev1 != level1 && level1.length>0) {
      setShow2('1')
      
       console.log('state1 has changed');
     } else if (level2 && lev2.current !== level2 && level2.length > 0) {
       setShow2('2');

       console.log('state2 has changed');
     } 
    // if (show2) {
    //   if (stepLevel1Name) {
    //     setValue('level1', stepLevel1Name);
    //   }

    //   if (stepLevel2Name) {
    //     setValue('level2', stepLevel2Name);
    //   }
    // }
    if (!level1) {
      setValue('level2', '');
    }

    if (!level2) {
      setValue('level3', '');
    }
    prevState1Ref.current=level1
    prevState2Ref.current = level2;
    // const tempArray = arrayCat;
  }, [level1, level2, level3, stepLevel1Name, stepLevel1Name]);
  return (
    <div className="relative">
      <div
        className={`${
          show ? 'block' : 'hidden'
        }  fixed top-14 right-[calc(83vw-570px)]  w-[365px] z-50 bg-white rounded-xl   p-4 `}
      >
        <div className="w-full flex justify-between items-center">
          <span className="text-xl font-semibold">Add new data</span>
          <Image
            src={closeIcon}
            alt=""
            className="cursor-pointer"
            onClick={() => {
              reset();
              setShow(false);
              setShow2('3');
              setstepLevel1Id('');
              setstepLevel1Name('');
              setstepLevel2Id('');
              setstepLevel2Name('');
            }}
          />
        </div>
        <form
          className="w-full flex flex-col gap-2 mt-2"
          action=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative">
            <InputFieldCategorize
              name="level1"
              // type={islevel1Visible ? 'text' : 'level1'}
              id="level1"
              placeholder="Type level name"
              // disabled={false}
              title="Level 1"
              props={{
                ...register('level1', {
                  required: true,
                  minLength: 2,
                }),
              }}
            />
            <div
              className={`${
                show2 == '1' ? 'block' : 'hidden'
              } absolute z-50 py-3 bg-white w-11/12 max-h-[200px] border rounded-lg px-2`}
            >
              <div className="w-full flex justify-end items-center">
                <Image
                  src={closeIcon}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => {
                    // reset();
                    // setShow(false);
                    setShow2('3');
                    // setstepLevel1Id('');
                    // setstepLevel1Name('');
                    // setstepLevel2Id('');
                    // setstepLevel2Name('');
                  }}
                />
              </div>
              {level1 &&
                level1.length > 0 &&
                (arrayIdCate.length > 0 ? (
                  arrayIdCate.map((item) => {
                    if (
                      item.name
                        .toLocaleLowerCase()
                        .includes(level1.toLocaleLowerCase()) &&
                      item.level == 'level1'
                    ) {
                      return (
                        <div
                          className=" cursor-pointer mb-2"
                          key={item._id}
                          onClick={() => {
                            setShow2('');

                            setValue('level1', item.name);
                            setstepLevel1Id(item._id);
                          }}
                        >
                          <CardCategoryShow
                            text={item.name}
                            indice={item.level}
                          />
                        </div>
                      );
                    }
                  })
                ) : (
                  <span>No categorie</span>
                ))}
            </div>
          </div>

          <div>
            <InputFieldCategorize
              name="level2"
              // type={islevel2Visible ? 'text' : 'level2'}
              id="level2"
              placeholder="Type level name"
              // disabled={false}
              title="Level 2"
              props={{
                ...register('level2', {
                  minLength: 2,
                }),
              }}
            />
            <div
              className={`${
                show2 == '2' &&
                stepLevel1Id.length > 0 &&
                arrayIdCate
                  .find((item) => item._id == stepLevel1Id)
                  ?.name.toLocaleLowerCase() == level1.toLocaleLowerCase()
                  ? 'block'
                  : 'hidden'
              } absolute z-50 py-3 bg-white overflow-y-auto w-11/12 no-scrollbar max-h-[200px] border rounded-lg px-2`}
            >
              <div className="w-full flex justify-end items-center">
                <Image
                  src={closeIcon}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => {
                    // reset();
                    // setShow(false);
                    setShow2('');
                    // setstepLevel1Id('');
                    // setstepLevel1Name('');
                    // setstepLevel2Id('');
                    // setstepLevel2Name('');
                  }}
                />
              </div>
              {level2 &&
                level2.length > 0 &&
                arrayIdCate.length > 0 &&
                arrayIdCate.map((item) => {
                  if (
                    item.name
                      .toLocaleLowerCase()
                      .includes(level2.toLocaleLowerCase()) &&
                    item.level == 'level2' &&
                    item.parent._id == stepLevel1Id
                  ) {
                    return (
                      <div
                        className=" cursor-pointer mb-2"
                        key={item._id}
                        onClick={() => {
                          if (stepLevel1Id.length > 0) {
                            setShow2('');
                            setValue('level2', item.name);
                            setstepLevel2Id(item._id);
                          }
                        }}
                      >
                        <CardCategoryShow
                          text={item.name}
                          indice={item.level}
                        />
                      </div>
                    );
                  } else {
                    <span>No categorie</span>;
                  }
                })}
            </div>
          </div>

          <div>
            <InputFieldCategorize
              name="level3"
              // type={islevel3Visible ? 'text' : 'level3'}
              id="level3"
              placeholder="Type level name"
              // disabled={false}
              title="Level 3"
              props={{
                ...register('level3', {
                  minLength: 4,
                }),
              }}
            />
          </div>
          <button
            disabled={!isValid || loading}
            className={`${
              !isValid || (loading && 'opacity-70')
            } w-full rounded-xl bg-[#2B8049] overflow-y-auto py-3 font-bold text-white `}
          >
            {loading ? <Spinner color="white" /> : 'save'}
          </button>
        </form>
      </div>
      {isShow && (
        <div className="fixed z-20 sm:top-14 top-[55vh] sm:right-[calc(83vw-534px)] sm:left-auto left-0   bg-white rounded-xl  sm:w-[434px] w-full max-h-[700px] overflow-y-auto border-white p-4">
          <div className="flex justify-end h-9 font-bold text-lg ">
            <span
              className="cursor-pointer"
              onClick={() => IshowHandler(false)}
            >
              x
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Search data</span>
            <div
              className="flex gap-1 items-center cursor-pointer"
              onClick={() => {
                setShow(true);
              }}
            >
              <Image src={addIcon} alt="" />{' '}
              <span className="text-xs font-medium text-primary ">
                Create Category
              </span>
            </div>
          </div>

          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            className="h-[36px] focus:ring-0 pl-2 w-full text-sm placeholder:text-sm placeholder:text-[#828BBC] placeholder:font-medium border rounded-[4px] border-[#BABCD4]"
          />

          <div className="flex flex-col flex-wrap gap-2 py-3">
            {search.length > 0 &&
              (array.length > 0 ? (
                array.map((item) => (
                  <div
                    className=" cursor-pointer"
                    key={item._id}
                    onClick={() => {
                      addReportCategory({
                        _id: String(selections.length + 1)+"_a",
                        text: text,
                        category: { _id: item._id, name: item.name },
                        level:
                          item.level == 'level1'
                            ? '#BDDEFF'
                            : item.level == 'level2'
                              ? '#FDB79B'
                              : '#43AA8B',
                      });
                      addarraySave({
                        id: String(selections.length + 1) + '_a',
                        text,
                        level:
                          item.level == 'level1'
                            ? '#BDDEFF'
                            : item.level == 'level2'
                              ? '#FDB79B'
                              : '#43AA8B',
                        category: item._id,
                      });
                      addId(item._id);
                      setTextHandler('');
                      setSearch('');
                      IshowHandler(false);
                    }}
                  >
                    <CardCategoryShow text={item.name} indice={item.level} />
                  </div>
                ))
              ) : (
                <span>No categorie</span>
              ))}
          </div>
        </div>
      )}
      <span>{getHighlightedText(description, selections)}</span>
    </div>
  );
};

export default HighlightedText;
