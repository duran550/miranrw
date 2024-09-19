'use Client';
import { Button } from '@/app/components/button/Button';
import React, { use, useContext, useEffect, useState } from 'react';

import CleanIcon from '../../../../../../../../../public/icons/dashboard/cleanIcon.svg';
import IrrelevantIcon from '../../../../../../../../../public/icons/dashboard/irrelevantIcon.svg';
import DangerousIcon from '../../../../../../../../../public/icons/dashboard/dangerousIcon.svg';
import CleanData from './action-modals/CleanData';
import ReportSummary from '../report-summary/ReportSummary';
import { useFindReport } from '@/app/hooks/useFindReport';
import { AdminContext } from '../../../../context/AdminContext';
import warning from '../../../../../../../../../public/icons/Shape.svg';
import cleanerEdit from '../../../../../../../../../public/icons/edit2.svg';
import relevantIcon from '../../../../../../../../../public/icons/Shield Question.svg';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import Irrelevant from './action-modals/Irrelevant';
import Dangerous from './action-modals/Dangerous';
import { reportType, reportType2 } from '@/utils/shared-types';
import ReportService from '@/services/reportService';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import Managed from './action-modals/Managed';

interface ReportActionProps {
  WhatHappened: string | any;
  refresh?: any;
  refreshCurrent?: any;
  report?: reportType2;
  text?: string;
  action?: string;
  updateReport?: any;
  cleanReport?: any;
}

const ReportActions: React.FC<ReportActionProps> = (whatHappened) => {
  const { user } = useAuth();
  const [isLoad, setIsload] = useState(false);
  const [stateAction, setStateAction] = useState(whatHappened.action);
  const pathname = usePathname();
  const urlSplit = pathname.split('/');
  const [openCleanModal, setOpenCleanModal] = useState<boolean>(false);
  // irrelevant state
  const [openIrrelevant, setOpenIrrelevant] = useState<boolean>(false);
  const [markedAsIrrelevant, setMarkedAsIrrelevant] = useState(false);
  const [openManaged, setOpenManaged] = useState<boolean>(false);
  const [markedAsManaged, setMarkedAsManaged] = useState(false);

  // Dangerous state
  const [openDangerous, setOpenDangerous] = useState<boolean>(false);
  const [markedAsDangerous, setMarkedAsDangerous] = useState(false);

  const [mutateContent, setMutateContent] = useState(false);
  const [visible, setVisible] = useState(false);
  const { state, dispatch } = useContext(AdminContext);
  const reportStyles = `border rounded-xl p-4 border-gray-300  w-full max-h-[70vh] overflow-y-auto overscroll-none no-scrollbar`;
  const updateReport = (status: string) => {
    setIsload(true);
    const report = new ReportService()
      .updateReport(urlSplit[urlSplit.length - 1], {
        status: status,
      })
      .then((result) => {
        if (result.status == 200 || result.status == 201) {
          whatHappened.updateReport(status);
          setTimeout(() => {
            if (status == 'Irrelevant') {
              setOpenIrrelevant(true), toggleIsIrrelevant();
            }
            if (status == 'Dangerous' && user?.role !== 4) {
              setOpenDangerous(true), toggleIsDangerous();
            }
            if (status == 'Managed' ) {
              setOpenManaged(true);
            }
            setIsload(false);
            setStateAction(status);
          }, 1000);
        }
      })
      .catch((error) => {
        console.log('error', error);
        setIsload(false);

        // alert('ok');
      });
  };
  // to be used
  // const Toastify = () => toast('Here is your toast.');

  // Toggle isDangerous
  const toggleIsDangerous = () => {
    dispatch({ type: 'TOGGLE_IS_DANGEROUS', payload: undefined });
  };

  // Toggle isIrrelevant
  const toggleIsIrrelevant = () => {
    dispatch({ type: 'TOGGLE_IS_IRRELEVANT', payload: undefined });
  };

  useEffect(() => {
    console.log('stateAction', stateAction);
  }, [stateAction]);
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
          cleanReport={whatHappened.cleanReport}
        />
      )}
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
      <Managed
        isOpen={openManaged}
        onClose={() => {
          setOpenManaged(false);
        }}
      />
      {(user?.role == 3 && !whatHappened.report) ||
      (user?.role == 4 && stateAction == 'Dangerous') ? (
        <div className="p-4 border rounded-xl border-gray-300 w-full h-full">
          {user?.role == 4 && (
            <div className="flex gap-x-4">
              <Button
                className="text-xs bg-[#2B8049]"
                variant={isLoad ? 'disabled' : null}
                disabled={isLoad}
                icon={CleanIcon}
                onClick={() => {
                  updateReport('Managed');
                }}
              >
                {'Mark As Managed'}
              </Button>
              <Button
                className="text-xs"
                disabled={isLoad}
                variant={isLoad ? 'disabled' : 'outlineWarning'}
                icon={relevantIcon}
                onClick={() => {
                  updateReport('pending');
                }}
              >
                Mark As Relevant
              </Button>
            </div>
          )}
          {user?.role == 3 && (
            <div className="  w-full h-full">
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
                      {user?.role == 3 ? 'Clean Data' : 'Mark As Managed'}
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
                    {/* <Button
                      className="text-xs"
                      disabled={isLoad}
                      variant={isLoad ? 'disabled' : 'outlineWarning'}
                      icon={DangerousIcon}
                      onClick={() => {
                        updateReport('Dangerous');
                      }}
                    >
                      Mark As Dangerous
                    </Button> */}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={reportStyles}>
          {user?.role == 3 && (
            <ReportSummary
              incidentDescription={state.cleanerDesc}
              className="w-full"
              mutate={mutateContent}
              visible={visible}
              markedAsDangerous={markedAsDangerous}
              markedAsIrrelevant={markedAsIrrelevant}
              report={whatHappened.report}
              update={true}
              role={whatHappened.report ? true : false}
              status={stateAction}
            />
          )}
          {user?.role == 4 && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div></div>
                {stateAction == 'Managed' ? (
                  <div className="rounded-full bg-opacity-20 px-4 py-2 w-fit opacity-[0.7] bg-[#199A46] font-bold text-[#199A46]">
                    {stateAction}
                  </div>
                ) : (
                  <div className="rounded-full bg-opacity-20 px-4 py-2 w-fit opacity-[0.7] bg-[#F36D38] font-bold text-[#F36D38]">
                    {'Relevant'}
                  </div>
                )}
              </div>
              <div className="flex gap-x-4">
                <Button
                  className="text-lg w-fit"
                  // variant="outlinePrimary"
                  variant={isLoad ? 'disabled' : 'outlinePrimary'}
                  disabled={isLoad}
                  icon={IrrelevantIcon}
                  onClick={() => {
                    // toggleIsIrrelevant();
                    updateReport('Dangerous');
                  }}
                >
                  Unmark
                </Button>
                {stateAction == 'Managed' ? (
                  <Button
                    className="text-xs w-fit"
                    disabled={isLoad}
                    variant={isLoad ? 'disabled' : 'outlineWarning'}
                    icon={relevantIcon}
                    onClick={() => {
                      updateReport('pending');
                    }}
                  >
                    Mark As Relevant
                  </Button>
                ) : (
                  <Button
                    className="text-xs bg-[#2B8049] w-fit"
                    variant={isLoad ? 'disabled' : null}
                    disabled={isLoad}
                    icon={CleanIcon}
                    onClick={() => {
                      updateReport('Managed');
                    }}
                  >
                    {'Mark As Managed'}
                  </Button>
                )}
              </div>
            </>
          )}
          {user?.role == 3 && (
            <div className="flex  gap-x-4">
              <Button
                className="text-xs w-fit"
                variant={isLoad ? 'disabled' : 'outlineWarning'}
                disabled={isLoad}
                icon={DangerousIcon}
                onClick={() => {
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
          )}
        </div>
      )}
    </div>
  );
};

export default ReportActions;
