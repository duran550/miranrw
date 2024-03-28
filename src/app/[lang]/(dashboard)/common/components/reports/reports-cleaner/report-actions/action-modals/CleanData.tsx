import React, { FC, useContext, useEffect, useState } from 'react';
import CustomModal from '@/app/components/modal/Modal';
import TextArea from '@/app/components/forms/text-area/TextArea';
import { SubmitHandler, useForm } from 'react-hook-form';
import AnimateClick from '@/app/components/animate-click/AnimateClick';
import { AdminContext } from '@/app/[lang]/(dashboard)/common/context/AdminContext';
import ReportSummary from '../../report-summary/ReportSummary';
import { useFindReport } from '@/app/hooks/useFindReport';

interface ClientDataProps {
  onClose: () => void;
  isOpen: boolean;
  data: string | any;
  mutated?: boolean;
  setMutated: () => void;
  setvisible: () => void;
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
}) => {
  const { uncategorizedData } = useFindReport();
  const [cleanDataDynamicVal, setCleanDataDynamicVal] = useState(
    data.WhatHappened
  );
  const { setCleanerDes } = useContext(AdminContext);

  const handleUpdateCleanerDes = () => {
    setCleanerDes(cleanDataDynamicVal);
    onClose();
  };

  // Dynamic hints description
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<ClientDataFormValues>();

  // Define custom classnames
  const customClassName = 'border border-gray-400 bg-gray-100';

  // const watchAllFields = watch();
  let description: string = watch('description');

  useEffect(() => setCleanerDes(cleanDataDynamicVal), []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCleanDataDynamicVal(event.target.value);
  };

  const onSubmit: SubmitHandler<ClientDataFormValues> = (data) => {
    let formData = new FormData();
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
              placeholder="Explain what happened exactly"
              val={cleanDataDynamicVal}
              handleChange={handleChange}
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
                    handleUpdateCleanerDes(), setMutated(), setvisible();
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
