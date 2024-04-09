import React, { FC, useContext, useEffect, useState } from 'react';
import CustomModal from '@/app/components/modal/Modal';
import TextArea from '@/app/components/forms/text-area/TextArea';
import { SubmitHandler, useForm } from 'react-hook-form';
import AnimateClick from '@/app/components/animate-click/AnimateClick';
import { AdminContext } from '@/app/[lang]/(dashboard)/common/context/AdminContext';
import ReportSummary from '../../report-summary/ReportSummary';
import { useFindReport } from '@/app/hooks/useFindReport';
import ReportService from '@/services/reportService';
import { usePathname } from 'next/navigation';

interface ClientDataProps {
  onClose: () => void;
  isOpen: boolean;
  data: string | any;
  mutated?: boolean;
  setMutated: () => void;
  setvisible: () => void;
  text?: string;
  refresh?: any;
}

interface ClientDataFormValues {
  description: string;
}

const CleanData: FC<ClientDataProps> = ({
  onClose,
  isOpen,
  data,
  setMutated,
  setvisible,
  text,
  refresh,
}) => {
  const pathname = usePathname();
  const urlSplit = pathname.split('/');
  const { uncategorizedData } = useFindReport();
  const [cleanDataDynamicVal, setCleanDataDynamicVal] = useState(text!);
  const { setCleanerDes } = useContext(AdminContext);
  const { state, dispatch } = useContext(AdminContext);

  const handleUpdateCleanerDes = () => {
    setCleanerDes(cleanDataDynamicVal);
  
  };


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<ClientDataFormValues>();

  let description: string = watch('description');

  const updateReport = () => {
  

    const report = new ReportService()
      .updateReport(urlSplit[urlSplit.length - 1], {
        description: description,
        status: 'cleaned',
      })
      .then((result) => {
        if (result.status == 200 || result.status == 201) {
          refresh();
          setTimeout(() => {
            onClose();

            setvisible();
          }, 3000);
        }
      })
      .catch((error) => {
        console.log('error', error);

        
      });
  };
 
  const customClassName = 'border border-gray-400 bg-gray-100';



  useEffect(() => {
   
    if (text && text.length > 0) {
      setValue('description', text);
    }

   
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCleanDataDynamicVal(event.target.value);
  };

  const onSubmit: SubmitHandler<ClientDataFormValues> = (data) => {
    let formData = new FormData();
  };

  const toggleCleanData = () => {
    dispatch({ type: 'TOGGLE_CLEAN_DATA', payload: undefined });
  };

  return (
    <CustomModal onClose={onClose} isOpen={isOpen} positon="center">
      <h1 className="font-bold text-2xl text-gray-400">Clean Data</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextArea
              title="What Happened"
              name="clean_data_des"
              type="string"
              props={register('description')}
              placeholder={text!}
             
              className={customClassName}
            ></TextArea>
            <div className="flex justify-end gap-x-3 mt-10 mb-2">
              <AnimateClick>
                <button
                  className="border py-4 px-6 w-fit rounded-lg"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </AnimateClick>
              <AnimateClick>
                <button
                  className="border py-4 px-6 w-fit bg-[#2B8049] rounded-lg text-white"
                  onClick={() => {
                    updateReport(), toggleCleanData();
                    // handleUpdateCleanerDes(), setMutated(), setvisible();
                  }}
                >
                  Clean
                </button>
              </AnimateClick>
            </div>
          </div>
        </form>
      </div>
    </CustomModal>
  );
};

export default CleanData;
