"use client"; 
import RadioSingle from '@/app/[lang]/(dashboard)/dashboard/cleaned-reports/components/radio/RadioSingle';
import { dataCategorizationOptions } from '@/app/[lang]/(dashboard)/dashboard/reports/reportsCardDatas';
import { Button } from '@/app/components/button/Button';
import React, { useState } from 'react'; 
import { SubmitHandler, useForm } from 'react-hook-form';

type AnyInputType = any

const CategorizeDataForm = () => {
    // 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ reportCarData ] = useState (dataCategorizationOptions); 
    console.log("/////", reportCarData, dataCategorizationOptions)
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm<AnyInputType>();

    const onSubmit: SubmitHandler<AnyInputType> = (data) => {
        
    };
    
  return (
    <div className="border rounded-xl p-4 border-gray-300 w-full">
      <h1 className="font-bold text-xl opacity-80 my-4">Categorize Data</h1>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className='py-4 flex flex-col gap-4 h-[600px] overflow-y-scroll'>
            {
                reportCarData && reportCarData?.map((reportCard) => {
                    return (
                        <div key={ reportCard?.id } className='border rounded-xl p-4 border-gray-300 w-full'>
                            <h1>{ reportCard?.name }</h1>
                            <div className='grid grid-cols-[repeat(auto-fit,minmax(50px,150px))]'>
                                {
                                    reportCard?.options?.map((option) => {
                                        return (
                                            <div key={ option?.id } className='relative group'>
                                                <RadioSingle 
                                                    name={ option?.name } 
                                                    label={ option?.name }
                                                    id={ option?.id } 
                                                    props={register(option?.formName, { required: false })}
                                                />
                                                <div className='absolute w-[250px] bg-white p-4 hidden group-hover:block group-hover:rounded-xl z-10 border'>
                                                    <h2>{ option?.description?.title }</h2>
                                                    <p className='text-[10px] '>{ option?.description?.description }</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className='w-full flex justify-end'>
            <Button
                className={`mt-7 rounded-lg text-sm sm:text-xl  ${ !isValid || isLoading ? "opacity-100" : " opacity-50" } bg-greenDisable w-[30%]`}
                variant={!isValid || isLoading ? 'primary' : 'saveCategorizationDisabled'}
                type="submit"
                disabled={!isValid || isLoading ? true : false}
            >
                {isLoading ? (
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                ></div>
                ) : (
                <span className='text-sm font-bold'>Save Categorization</span>
                )}
            </Button>
        </div>
      </form>
    </div>
  )
}

export default CategorizeDataForm