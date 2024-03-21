'use Client';
import { Button } from '@/app/components/button/Button';
import React, { useContext, useState } from 'react';

import CleanIcon from '../../../../../../../../../public/icons/dashboard/cleanIcon.svg';
import IrrelevantIcon from '../../../../../../../../../public/icons/dashboard/irrelevantIcon.svg';
import DangerousIcon from '../../../../../../../../../public/icons/dashboard/dangerousIcon.svg';
import CleanData from './action-modals/CleanData';
import ReportSummary from '../report-summary/ReportSummary';
import { useFindReport } from '@/app/hooks/useFindReport';
import { AdminContext } from '../../../../context/AdminContext';
import warning from '../../../../../../../../../public/icons/Shape.svg';
import cleanerEdit from '../../../../../../../../../public/icons/edit2.svg';
import Image from 'next/image';

interface ReportActionProps {
  WhatHappened: string | any;
}

const ReportActions: React.FC<ReportActionProps> = (whatHappened) => {
  const { uncategorizedData } = useFindReport();
  const [openCleanModal, setOpenCleanModal] = useState<boolean>(false);
  const [mutateContent, setMutateContent] = useState(false);
  const [visible, setVisible] = useState(false);
  const { state } = useContext(AdminContext);
  const reportStyles = `border rounded-xl p-4 border-gray-300 w-full`;

  console.log(mutateContent, '00000099088');

  return (
    <div className="w-full">
      <CleanData
        onClose={() => {
          setOpenCleanModal(false);
        }}
        isOpen={openCleanModal}
        data={whatHappened}
        setMutated={() => setMutateContent(true)}
        setvisible={() => setVisible(true)}
      />
      {!mutateContent ? (
        <div>
          <div className="p-4 border rounded-xl border-gray-300 w-full h-full">
            <h1 className="font-bold my-3 text-2xl opacity-90 text-[#6B7273]">
              Actions
            </h1>

            <div>
              <div className="flex items-center gap-x-2 my-10 font-bold text-lg">
                <h1>
                  Recommended as:{' '}
                  <span className="text-[#E00034]">Irrelevant</span>
                </h1>
                <Image src={warning} alt="warning" className="-mt-1" />
              </div>
            </div>

            <div className="flex  gap-x-4">
              <Button
                className="text-xs bg-[#2B8049]"
                icon={CleanIcon}
                onClick={() => setOpenCleanModal(true)}
              >
                Clean Data
              </Button>
              <Button
                className="text-xs"
                variant="outlinePrimary"
                icon={IrrelevantIcon}
              >
                Mark As Irrelevant
              </Button>
              <Button
                className="text-xs"
                variant="outlineWarning"
                icon={DangerousIcon}
              >
                Mark As Dangerous
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className={reportStyles}>
          <ReportSummary
            personAffected={uncategorizedData?.summary?.personAffected}
            genderIdentity={uncategorizedData?.summary?.genderIdentity}
            age={uncategorizedData?.summary?.age}
            date={uncategorizedData?.summary?.date}
            placeOfIncident={uncategorizedData?.summary?.placeOfIncident}
            incidentDescription={state.cleanerDesc}
            characteristic={uncategorizedData?.summary?.characteristic}
            otherMesures={uncategorizedData?.summary?.otherMesures}
            className="w-full"
            mutate={mutateContent}
            visible={visible}
          />
          <div className="flex  gap-x-4">
            <Button
              className="text-xs w-fit"
              variant="outlineWarning"
              icon={DangerousIcon}
            >
              Mark As Dangerous
            </Button>
            <Button
              className="text-xs w-fit"
              variant="outlinePrimary"
              icon={IrrelevantIcon}
            >
              Mark As Irrelevant
            </Button>
            <Button
              className="text-xs bg-[#2B8049] w-fit"
              icon={cleanerEdit}
              onClick={() => setOpenCleanModal(true)}
            >
              Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportActions;
