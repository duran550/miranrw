'use Client';
import { Button } from '@/app/components/button/Button';
import React, { use, useContext, useState } from 'react';

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
import toast, { Toaster } from 'react-hot-toast';
import Irrelevant from './action-modals/Irrelevant';
import Dangerous from './action-modals/Dangerous';
import { reportType } from '@/utils/shared-types';

interface ReportActionProps {
  WhatHappened: string | any;
  refresh?: any
  report?:reportType
}

const ReportActions: React.FC<ReportActionProps> = (whatHappened) => {
  const [openCleanModal, setOpenCleanModal] = useState<boolean>(false);
  // irrelevant state
  const [openIrrelevant, setOpenIrrelevant] = useState<boolean>(false);
  const [markedAsIrrelevant, setMarkedAsIrrelevant] = useState(false);

  // Dangerous state
  const [openDangerous, setOpenDangerous] = useState<boolean>(false);
  const [markedAsDangerous, setMarkedAsDangerous] = useState(false);

  const [mutateContent, setMutateContent] = useState(false);
  const [visible, setVisible] = useState(false);
  const { state, dispatch } = useContext(AdminContext);
  const reportStyles = `border rounded-xl p-4 border-gray-300 w-full`;

  // to be used
  const Toastify = () => toast('Here is your toast.');

  // Toggle isDangerous
  const toggleIsDangerous = () => {
    dispatch({ type: 'TOGGLE_IS_DANGEROUS', payload: undefined });
  };

  // Toggle isIrrelevant
  const toggleIsIrrelevant = () => {
    dispatch({ type: 'TOGGLE_IS_IRRELEVANT', payload: undefined });
  };

  return (
    <div className="w-full">
      <Toaster />
      <CleanData
        onClose={() => {
          setOpenCleanModal(false);
        }}
        isOpen={openCleanModal}
        data={whatHappened}
        setMutated={() => setMutateContent(true)}
        setvisible={() => setVisible(true)}
      />
      <Irrelevant
        onClose={() => {
          setOpenIrrelevant(false), setMarkedAsIrrelevant(true);
        }}
        isOpen={openIrrelevant}
      />
      <Dangerous
        onClose={() => {
          setOpenDangerous(false), setMarkedAsDangerous(true);
        }}
        isOpen={openDangerous}
      />
      {!mutateContent || state.isDangerous || state.isIrrelevant ? (
        <div>
          <div className="p-4 border rounded-xl border-gray-300 w-full h-full">
            <h1 className="font-bold my-3 text-2xl opacity-90 text-[#6B7273]">
              Actions
            </h1>

            <div>
              <div className="flex items-center gap-x-2 my-10 font-bold text-lg">
                <h1>
                  Recommended as:
                  <span className="text-[#E00034] ml-2">
                    {state.isDangerous ? 'Dangerous' : 'Irrelevant'}
                  </span>
                </h1>
                <Image src={warning} alt="warning" className="-mt-1" />
              </div>
            </div>

            <div>
              {state.isDangerous ? (
                <Button
                  className="text-lg w-fit"
                  variant="outlineWarning"
                  icon={DangerousIcon}
                  onClick={() => {
                    // setMarkedAsDangerous(false),
                    toggleIsDangerous();
                  }}
                >
                  Dangerous
                </Button>
              ) : state.isIrrelevant ? (
                <Button
                  className="text-lg w-fit"
                  variant="outlinePrimary"
                  icon={IrrelevantIcon}
                  onClick={() => {
                    toggleIsIrrelevant();
                  }}
                >
                  Unmark
                </Button>
              ) : (
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
                    onClick={() => {
                      setOpenIrrelevant(true), toggleIsIrrelevant();
                    }}
                  >
                    Mark As Irrelevant
                  </Button>
                  <Button
                    className="text-xs"
                    variant="outlineWarning"
                    icon={DangerousIcon}
                    onClick={() => {
                      setOpenDangerous(true), toggleIsDangerous();
                    }}
                  >
                    Mark As Dangerous
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={reportStyles}>
          <ReportSummary
            incidentDescription={state.cleanerDesc}
            className="w-full"
            mutate={mutateContent}
            visible={visible}
            markedAsDangerous={markedAsDangerous}
            markedAsIrrelevant={markedAsIrrelevant}
          />
          <div className="flex  gap-x-4">
            <Button
              className="text-xs w-fit"
              variant="outlineWarning"
              icon={DangerousIcon}
              onClick={() => {
                setOpenDangerous(true),
                  toggleIsDangerous(),
                  setMutateContent(false);
              }}
            >
              Mark As Dangerous
            </Button>
            <Button
              className="text-xs w-fit"
              variant="outlinePrimary"
              icon={IrrelevantIcon}
              onClick={() => {
                setOpenIrrelevant(true),
                  toggleIsIrrelevant(),
                  setMutateContent(false);
              }}
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
