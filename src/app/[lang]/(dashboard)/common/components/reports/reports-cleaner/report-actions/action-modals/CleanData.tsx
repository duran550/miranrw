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
import TextArea2 from '@/app/components/forms/text-area/TextArea2';

interface ClientDataProps {
  onClose: () => void;
  isOpen: boolean;
  data: string | any;
  mutated?: boolean;
  setMutated: () => void;
  setvisible: () => void;
  text?: string;
  refresh?: any;
  cleanReport?: any;
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
  cleanReport,
}) => {
  const pathname = usePathname();
  const urlSplit = pathname.split('/');
  const { uncategorizedData } = useFindReport();
  const [cleanDataDynamicVal, setCleanDataDynamicVal] = useState(text!);
  const [load, setLoad] = useState(false);
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
    try {
      setLoad(true);
      const report = new ReportService()
        .updateReport(urlSplit[urlSplit.length - 1], {
          description: description,
          status: 'cleaned',
        })
        .then((result) => {
          if (result.status == 200 || result.status == 201) {
            // refresh();
            cleanReport(description);
            setTimeout(() => {
              onClose();

              setvisible();
              setLoad(false);
            }, 1000);
          }
        })
        .catch((error) => {
          setLoad(false);
          console.log('error', error);
        });
    } catch (error) {
      setLoad(false);
    }
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
            <TextArea2
              title="What Happened"
              name="clean_data_des"
              type="string"
              props={register('description')}
              placeholder={text!}
              className={customClassName}
            ></TextArea2>
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
                  disabled={
                    load || (text && description && text.length < description.length)
                      ? true
                      : false
                  }
                  className={`border py-4 px-6 w-fit bg-[#2B8049] rounded-lg text-white ${
                    load || (text && description && text.length < description.length)
                      ? 'opacity-60'
                      : 'opacity-100 '
                  }`}
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
