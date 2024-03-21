import { ReportSummaryType } from '@/app/[lang]/(dashboard)/dashboard/reports/reportSummaryType';
import React, { useContext } from 'react';
import { AdminContext } from '../../../../context/AdminContext';

const ReportSummary: React.FC<ReportSummaryType> = ({
  personAffected,
  genderIdentity,
  age,
  date,
  placeOfIncident,
  incidentDescription,
  characteristic,
  otherMesures,
  className,
  mutate,
  visible,
}) => {
  const { state } = useContext(AdminContext);

  const defaultClassName = `border rounded-xl p-4 border-gray-300 w-full`;
  // focus:border border focus:border-primaryColor border-primaryColor
  const combinedClassName = className ? `${className}` : defaultClassName;

  console.log(mutate, 'this is my mutate style');
  console.log(visible, 'this is my visible');

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
          ) : (
            <div className="rounded-full bg-[#E00034] bg-opacity-20 px-4 py-2 w-fit opacity-[0.7] text-[#E00034] font-bold">
              Raw
            </div>
          )}
        </div>
        {/* )} */}
      </div>
      <div className="py-4 flex flex-col gap-3">
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">
            Person Affected
          </h1>
          <span className="text-gray-500 text-[13px]">{personAffected}</span>
        </div>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">
            Gender Identity
          </h1>
          <span className="text-gray-500 text-[13px]">{genderIdentity}</span>
        </div>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">Age</h1>
          <span className="text-gray-500 text-[13px]">{age}</span>
        </div>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">Date</h1>
          <span className="text-gray-500 text-[13px]">{date}</span>
        </div>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">
            Place of Incident
          </h1>
          <span className="text-gray-500 text-[13px]">{placeOfIncident}</span>
        </div>

        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">
            What Happened
          </h1>
          <span
            className={`text-[15px] ${
              !mutate ? 'text-red-400' : 'text-[#199A46]'
            }`}
          >
            {incidentDescription}
            {/* {state.cleanerDesc} */}
          </span>
        </div>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">
            Characteristics
          </h1>
          <span className="text-gray-500 text-[13px]">{characteristic}</span>
        </div>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">
            Other Measures
          </h1>
          <span className="text-gray-500 text-[13px]">{otherMesures}</span>
        </div>
      </div>
    </div>
  );
};

export default ReportSummary;
