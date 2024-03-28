import { ReportSummaryType } from '@/app/[lang]/(dashboard)/dashboard/reports/reportSummaryType';
import React, { useContext } from 'react';
import { AdminContext } from '../../../../context/AdminContext';
import { useFindReport } from '@/app/hooks/useFindReport';
import { reportType } from '@/utils/shared-types';
import { Span } from 'next/dist/trace';

type ReportSummaryProps = {
  className?: string;
  mutate?: boolean;
  visible?: boolean;
  incidentDescription?: string;
  markedAsIrrelevant?: boolean;
  markedAsDangerous?: boolean;
  report?: reportType;
};

const ReportSummary: React.FC<ReportSummaryProps> = ({
  className,
  mutate,
  visible,
  incidentDescription,
  markedAsDangerous,
  markedAsIrrelevant,
  report,
}) => {
  const { state } = useContext(AdminContext);

  const defaultClassName = `border rounded-xl p-4 border-gray-300 w-full`;
  const combinedClassName = className ? `${className}` : defaultClassName;
  const { uncategorizedData } = useFindReport();

  return (
    <div className={combinedClassName}>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl opacity-80 my-4">Summary</h1>
        {/* {visible && ( */}
        <div>
          {mutate ? (
            <div className="rounded-full bg-opacity-20 px-4 py-2 w-fit opacity-[0.7] bg-[#199A46] font-bold text-[#199A46]">
              Cleaned
            </div>
          ) : state.isDangerous ? (
            <div className="rounded-full bg-opacity-20 px-4 py-2 w-fit opacity-[0.7] bg-[#E00034] font-bold text-[#E00034]">
              Dangerous
            </div>
          ) : state.isIrrelevant ? (
            <div className="rounded-full bg-opacity-20 px-4 py-2 w-fit opacity-[0.7] bg-[#F36D38] font-bold text-[#F36D38]">
              Irrelevant
            </div>
          ) : mutate || (!state.isDangerous && !state.isIrrelevant) ? (
            <div className="rounded-full bg-[#E00034] bg-opacity-20 px-4 py-2 w-fit opacity-[0.7] text-[#E00034] font-bold">
              Raw
            </div>
          ) : (
            ''
          )}
        </div>
        {/* )} */}
      </div>
      <div className="py-4 flex flex-col gap-3">
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">
            Person Affected
          </h1>
          <span className="text-gray-500 text-[13px] ">
            {report?.identity}
            {/* {uncategorizedData?.summary?.personAffected} */}
          </span>
        </div>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">
            Gender Identity
          </h1>
          <div className="text-gray-500 text-[13px] grid grid-cols-5">
            {/* {uncategorizedData?.summary?.genderIdentity} */}
            {report?.gender &&
              report.gender.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
          </div>
        </div>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">Age</h1>
          <span className="text-gray-500 text-[13px]">
            {/* {uncategorizedData?.summary?.age} */}
            {report?.age}
          </span>
        </div>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">Date</h1>
          <span className="text-gray-500 text-[13px]">
            {/* {uncategorizedData?.summary?.date} */}
            {report?.valueDate}
          </span>
        </div>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">
            Place of Incident
          </h1>
          <span className="text-gray-500 text-[13px]">
            {report?.location ? report.location : report?.locationOnline}
          </span>
        </div>

        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">
            What Happened
          </h1>
          <span className={`text-[15px] ${mutate ? 'text-[#199A46]' : ''}`}>
            {report?.description}
            {/* {state.cleanerDesc} */}
          </span>
        </div>
        {/* <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">
            Characteristics
          </h1>
          <span className="text-gray-500 text-[13px]">
            {uncategorizedData?.summary?.characteristic}
          </span>
        </div>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">
            Other Measures
          </h1>
          <span className="text-gray-500 text-[13px]">
            {uncategorizedData?.summary?.otherMesures}
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default ReportSummary;
