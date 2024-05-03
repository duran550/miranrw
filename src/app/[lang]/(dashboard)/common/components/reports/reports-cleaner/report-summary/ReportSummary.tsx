'use client'
import { ReportSummaryType } from '@/app/[lang]/(dashboard)/dashboard/reports/reportSummaryType';
import React, { useContext } from 'react';
import { AdminContext } from '../../../../context/AdminContext';
import { useFindReport } from '@/app/hooks/useFindReport';
import { reportType, reportType2 } from '@/utils/shared-types';
import { Span } from 'next/dist/trace';
import { useAuth } from '@/app/hooks/useAuth';

type ReportSummaryProps = {
  className?: string;
  mutate?: boolean;
  visible?: boolean;
  incidentDescription?: string;
  markedAsIrrelevant?: boolean;
  markedAsDangerous?: boolean;
  report?: reportType2;
  update?: boolean;
  role?: boolean;
  color?: boolean;
  status?:string
};

const ReportSummary: React.FC<ReportSummaryProps> = ({
  className,
  mutate,
  visible,
  incidentDescription,
  markedAsDangerous,
  markedAsIrrelevant,
  report,
  update,
  role,
  color,
  status
}) => {
  // const { user } = useAuth();

  const { state } = useContext(AdminContext);
  const { user } = useAuth();
  const defaultClassName = `border rounded-xl p-4 border-gray-300 w-full max-h-[70vh] overflow-y-auto overscroll-none no-scrollbar`;
  const combinedClassName = className ? `${className}` : defaultClassName;
  const { uncategorizedData } = useFindReport();
  
  // console.log('update', update);

  return (
    <div className={combinedClassName}>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl opacity-80 my-4">Summary</h1>
        {/* {visible && ( */}
        <div>
          {report?.status2 &&
          report.status2 == 'cleaned' &&
          user?.role == 3 &&
          role ? (
            <div className="rounded-full bg-opacity-20 px-4 py-2 w-fit opacity-[0.7] bg-[#199A46] font-bold text-[#199A46]">
              Cleaned
            </div>
          ) : report?.status2 &&
            report.status2 == 'cleaned' &&
            user?.role == 1 &&
            report.category2 &&
            report.category2?.length == 0 ? (
            <div className="rounded-full bg-[#E00034] bg-opacity-20 px-4 py-2 w-fit opacity-[0.7] text-[#E00034] font-bold">
              Uncategorized
            </div>
          ) : report?.status2 &&
            report.status2 == 'cleaned' &&
            user?.role == 1 &&
            report.category2 &&
            report.category2?.length > 0 ? (
            <div className="rounded-full bg-opacity-20 px-4 py-2 w-fit opacity-[0.7] bg-[#199A46] font-bold text-[#199A46]">
              Categorized
            </div>
          ) : user?.role == 4 && status == 'Managed' ? (
            <div className="rounded-full bg-opacity-20 px-4 py-2 w-fit opacity-[0.7] bg-[#199A46] font-bold text-[#199A46]">
              Managed
            </div>
          ) : user?.role == 4 && status == 'Pending' ? (
            <div className="rounded-full bg-opacity-20 px-4 py-2 w-fit opacity-[0.7] bg-[#F36D38] font-bold text-[#F36D38]">
              Relevant
            </div>
          ) : report?.status2 && report.status2 == 'Irrelevant' ? (
            <div className="rounded-full bg-opacity-20 px-4 py-2 w-fit opacity-[0.7] bg-[#F36D38] font-bold text-[#F36D38]">
              Irrelevant
            </div>
          ) : user?.role == 3 &&
            ((report?.status2 && report.status2 == 'pending') ||
              (report?.status2 && report?.status == 'cleaned' && !role) ||
              !report?.status2) ? (
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

        {report?.organizationType && report.organizationType.length > 0 && (
          <div>
            <h1 className="font-bold text-[16px] text-black opacity-80">
              Type of Organization
            </h1>
            <div className="text-gray-500 text-[13px] grid grid-cols-5">
              {/* {uncategorizedData?.summary?.genderIdentity} */}
              {report?.organizationType &&
                report.organizationType.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
            </div>
          </div>
        )}

        {report?.organizationTypeFreeField &&
          report.organizationTypeFreeField.length > 0 && (
            <div>
              <h1 className="font-bold text-[16px] text-black opacity-80">
                Specify
              </h1>
              <span className="text-gray-500 text-[13px] grid grid-cols-5">
                {/* {uncategorizedData?.summary?.genderIdentity} */}
                {report?.organizationTypeFreeField}
              </span>
            </div>
          )}
        {report?.gender && report.gender.length > 0 && (
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
        )}
        {report?.genderFreeField && report.genderFreeField.length > 0 && (
          <div>
            <h1 className="font-bold text-[16px] text-black opacity-80">
              Specify
            </h1>
            <span className="text-gray-500 text-[13px] grid grid-cols-5">
              {/* {uncategorizedData?.summary?.genderIdentity} */}
              {report?.genderFreeField}
            </span>
          </div>
        )}
        {report?.age && report.age.length > 0 && (
          <div>
            <h1 className="font-bold text-[16px] text-black opacity-80">Age</h1>
            <span className="text-gray-500 text-[13px]">
              {/* {uncategorizedData?.summary?.age} */}
              {report?.age}
            </span>
          </div>
        )}

        {report?.numberOfEmployees && report.numberOfEmployees.length > 0 && (
          <div>
            <h1 className="font-bold text-[16px] text-black opacity-80">
              Number of employes
            </h1>
            <span className="text-gray-500 text-[13px]">
              {/* {uncategorizedData?.summary?.age} */}
              {report?.numberOfEmployees}
            </span>
          </div>
        )}
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">Date</h1>
          <span className="text-gray-500 text-[13px]">
            {/* {uncategorizedData?.summary?.date} */}
            {report?.dateRangeState ? report.dateRangeState : report?.valueDate}
          </span>
        </div>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">
            Place of Incident
          </h1>
          <span className="text-gray-500 text-[13px]">
            {report?.location
              ? report.location + '   ' + report.stadtteil
              : report?.locationOnline}
          </span>
        </div>

        {user && user.role == 3 && (
          <div>
            <h1 className="font-bold text-[16px] text-black opacity-80">
              What Happened
            </h1>
            <span
              className={`text-[15px] 
             ${
               report?.status2 &&
               report.status2.toLocaleLowerCase() == 'cleaned' &&
               update &&
               'text-[#199A46]'
             }
          ${color && 'text-[#E00034]'}`}
            >
              {/* {!update ? report?.description : report?.description} */}
              {report?.description2 && update
                ? report.description2
                : report?.description}
              {/* {state.cleanerDesc} */}
            </span>
          </div>
        )}

        {user && user.role !== 3 && (
          <div>
            <h1 className="font-bold text-[16px] text-black opacity-80">
              What Happened
            </h1>
            <span
              className={`text-[15px] 
            `}
            >
              {/* {!update ? report?.description : report?.description} */}
              {report?.description2 ? report.description2 : report?.description}
              {/* {state.cleanerDesc} */}
            </span>
          </div>
        )}
        {report?.sexualOrientation && report.sexualOrientation.length > 0 && (
          <div>
            <h1 className="font-bold text-[16px] text-black opacity-80">
              Sexual Orientation
            </h1>
            <div className="text-gray-500 text-[13px] grid grid-cols-5">
              {/* {uncategorizedData?.summary?.genderIdentity} */}
              {report?.sexualOrientation &&
                report.sexualOrientation.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
            </div>
          </div>
        )}

        {report?.sexualOrientationFreeField &&
          report.sexualOrientationFreeField.length > 0 && (
            <div>
              <h1 className="font-bold text-[16px] text-black opacity-80">
                Specify :
              </h1>
              <span className="text-gray-500 text-[13px] grid grid-cols-5">
                {/* {uncategorizedData?.summary?.genderIdentity} */}
                {report?.sexualOrientationFreeField}
              </span>
            </div>
          )}

        {report?.typeOfDiscrimination &&
          report.typeOfDiscrimination.length > 0 && (
            <div>
              <h1 className="font-bold text-[16px] text-black opacity-80">
                What did you believe the discrimination was based on ?
              </h1>
              <div className="text-gray-500 text-[13px] grid grid-cols-5">
                {/* {uncategorizedData?.summary?.genderIdentity} */}
                {report?.typeOfDiscrimination &&
                  report.typeOfDiscrimination.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
              </div>
            </div>
          )}

        {report?.typeOfDiscriminationFreeField &&
          report.typeOfDiscriminationFreeField.length > 0 && (
            <div>
              <h1 className="font-bold text-[16px] text-black opacity-80">
                Specify :
              </h1>
              <span className="text-gray-500 text-[13px] grid grid-cols-5">
                {/* {uncategorizedData?.summary?.genderIdentity} */}
                {report?.typeOfDiscriminationFreeField}
              </span>
            </div>
          )}

        {report?.formOfQueerphobia && report.formOfQueerphobia.length > 0 && (
          <div>
            <h1 className="font-bold text-[16px] text-black opacity-80">
              What form of queerphobia
            </h1>
            <div className="text-gray-500 text-[13px] grid grid-cols-5">
              {/* {uncategorizedData?.summary?.genderIdentity} */}
              {report?.formOfQueerphobia &&
                report.formOfQueerphobia.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
            </div>
          </div>
        )}
        {report?.otherformOfQueerphobiaFreeField &&
          report.otherformOfQueerphobiaFreeField.length > 0 && (
            <div>
              <h1 className="font-bold text-[16px] text-black opacity-80">
                Specify :
              </h1>
              <span className="text-gray-500 text-[13px] grid grid-cols-5">
                {/* {uncategorizedData?.summary?.genderIdentity} */}
                {report?.otherformOfQueerphobiaFreeField}
              </span>
            </div>
          )}

        {report?.formOfDiscYes && report.formOfDiscYes.length > 0 && (
          <div>
            <h1 className="font-bold text-[16px] text-black opacity-80">
              Other form of discrimination
            </h1>
            <div className="text-gray-500 text-[13px] grid grid-cols-5">
              {/* {uncategorizedData?.summary?.genderIdentity} */}
              {report?.formOfDiscYes &&
                report.formOfDiscYes.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
            </div>
          </div>
        )}
        {report?.formOfDiscYesFreeField &&
          report.formOfDiscYesFreeField.length > 0 && (
            <div>
              <h1 className="font-bold text-[16px] text-black opacity-80">
                Specify :
              </h1>
              <span className="text-gray-500 text-[13px] grid grid-cols-5">
                {/* {uncategorizedData?.summary?.genderIdentity} */}
                {report?.formOfDiscYesFreeField}
              </span>
            </div>
          )}
        {report?.haveYouReportedYes && report.haveYouReportedYes.length > 0 && (
          <div>
            <h1 className="font-bold text-[16px] text-black opacity-80">
              Have you already report
            </h1>
            <div className="text-gray-500 text-[13px] grid grid-cols-5">
              {/* {uncategorizedData?.summary?.genderIdentity} */}
              {report?.haveYouReportedYes &&
                report.haveYouReportedYes.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
            </div>
          </div>
        )}
        {report?.haveYouReportedYesFreeField1 ||
          (report?.haveYouReportedYesFreeField2 && (
            <div>
              <h1 className="font-bold text-[16px] text-black opacity-80">
                Specify :
              </h1>
              <span className="text-gray-500 text-[13px] grid grid-cols-1">
                <span>{report?.haveYouReportedYesFreeField1}</span>

                <span>{report?.haveYouReportedYesFreeField2}</span>
              </span>
            </div>
          ))}
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
