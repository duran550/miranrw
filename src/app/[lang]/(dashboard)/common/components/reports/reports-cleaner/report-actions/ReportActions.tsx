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
import ReportService from '@/services/reportService';
import { usePathname } from 'next/navigation';

interface ReportActionProps {
  WhatHappened: string | any;
  refresh?: any;
  refreshCurrent?: any;
  report?: reportType;
  text?: string;
  action?: string;
}

const ReportActions: React.FC<ReportActionProps> = (whatHappened) => {
  const [isLoad, setIsload] = useState(false);
  const [stateAction, setStateAction] = useState(whatHappened.action);
  const pathname = usePathname();
  const urlSplit = pathname.split('/');
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
  const reportStyles = `border rounded-xl p-4 border-gray-300 w-full max-h-[70vh] overflow-y-auto overscroll-none no-scrollbar`;
  const updateReport = (status: string) => {
    setIsload(true);
    const report = new ReportService()
      .updateReport(urlSplit[urlSplit.length - 1], {
        status: status,
      })
      .then((result) => {
        if (result.status == 200 || result.status == 201) {
          whatHappened.refreshCurrent();
          setTimeout(() => {
            if (status == 'Irrelevant') {
              setOpenIrrelevant(true), toggleIsIrrelevant();
            }
            if (status == 'Dangerous') {
              setOpenDangerous(true), toggleIsDangerous();
            }
            setIsload(false);
            setStateAction(status);
          }, 1000);
        }
      })
      .catch((error) => {
        console.log('error', error);
        setIsload(true);

        // alert('ok');
      });
  };
  // to be used
  // const Toastify = () => toast('Here is your toast.');
  console.log(whatHappened.text);

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
      {openCleanModal && (
        <CleanData
          onClose={() => {
            setOpenCleanModal(false);
          }}
          isOpen={openCleanModal}
          data={whatHappened}
          setMutated={() => setMutateContent(true)}
          setvisible={() => setVisible(true)}
          text={whatHappened.text}
          refresh={whatHappened.refresh}
        />
      )}
      <Irrelevant
        onClose={() => {
          setOpenIrrelevant(false), setMarkedAsIrrelevant(true);
        }}
        isOpen={openIrrelevant}
        refresh={whatHappened.refreshCurrent}
      />
      <Dangerous
        onClose={() => {
          setOpenDangerous(false), setMarkedAsDangerous(true);
        }}
        isOpen={openDangerous}
        refresh={whatHappened.refreshCurrent}
      />
      {!whatHappened.report ? (
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
                    {stateAction == 'Dangerous' ? 'Dangerous' : 'Irrelevant'}
                  </span>
                </h1>
                <Image src={warning} alt="warning" className="-mt-1" />
              </div>
            </div>

            <div>
              {stateAction == 'Irrelevant' || stateAction == 'Dangerous' ? (
                <Button
                  className="text-lg w-fit"
                  // variant="outlinePrimary"
                  variant={isLoad ? 'disabled' : 'outlinePrimary'}
                  disabled={isLoad}
                  icon={IrrelevantIcon}
                  onClick={() => {
                    toggleIsIrrelevant();
                    updateReport('pending');
                  }}
                >
                  Unmark
                </Button>
              ) : (
                <div className="flex  gap-x-4">
                  <Button
                    className="text-xs bg-[#2B8049]"
                    variant={isLoad ? 'disabled' : null}
                    disabled={isLoad}
                    icon={CleanIcon}
                    onClick={() => {
                      if (whatHappened.text && whatHappened.text.length > 0) {
                        setOpenCleanModal(true);
                      }
                    }}
                  >
                    Clean Data
                  </Button>
                  <Button
                    className="text-xs"
                    disabled={isLoad}
                    variant={isLoad ? 'disabled' : 'outlinePrimary'}
                    icon={IrrelevantIcon}
                    onClick={() => {
                      updateReport('Irrelevant');
                    }}
                  >
                    Mark As Irrelevant
                  </Button>
                  <Button
                    className="text-xs"
                    disabled={isLoad}
                    variant={isLoad ? 'disabled' : 'outlineWarning'}
                    // variant="outlineWarning"
                    icon={DangerousIcon}
                    onClick={() => {
                      updateReport('Dangerous');
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
            report={whatHappened.report}
            update={true}
          />
          <div className="flex  gap-x-4">
            <Button
              className="text-xs w-fit"
              variant={isLoad ? 'disabled' : 'outlineWarning'}
              disabled={isLoad}
              icon={DangerousIcon}
              onClick={() => {
                // setOpenDangerous(true),
                //   toggleIsDangerous(),
                updateReport('Dangerous');
                setMutateContent(false);
              }}
            >
              Mark As Dangerous
            </Button>
            <Button
              className="text-xs w-fit"
              variant={isLoad ? 'disabled' : 'outlinePrimary'}
              icon={IrrelevantIcon}
              disabled={isLoad}
              onClick={() => {
                // setOpenIrrelevant(true),
                //   toggleIsIrrelevant(),
                updateReport('Irrelevant');

                setMutateContent(false);
              }}
            >
              Mark As Irrelevant
            </Button>
            <Button
              className="text-xs bg-[#2B8049] w-fit"
              disabled={isLoad}
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
