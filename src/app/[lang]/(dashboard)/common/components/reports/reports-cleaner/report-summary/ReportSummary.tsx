import { ReportSummaryType } from '@/app/[lang]/(dashboard)/dashboard/reports/reportSummaryType';
import React from 'react';



const ReportSummary: React.FC<ReportSummaryType> = ({
  personAffected,  
  genderIdentity,  
  age,  
  date,  
  placeOfIncident,  
  incidentDescription,  
  characteristic,  
  otherMesures,  
}) => {

  console.log (">>>>>>", personAffected)
  return (
    <div className="border rounded-xl p-4 border-gray-300 w-full">
      <h1 className="font-bold text-xl opacity-80 my-4">Summary</h1>
      <div className='py-4 flex flex-col gap-3'>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">Person Affected</h1>
          <span className='text-gray-500 text-[13px]'>{ personAffected }</span>
        </div>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">Gender Identity</h1>
          <span className='text-gray-500 text-[13px]'>{ genderIdentity }</span>
        </div>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">Age</h1>
          <span className='text-gray-500 text-[13px]'>{ age }</span>
        </div>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">Date</h1>
          <span className='text-gray-500 text-[13px]'>{ date }</span>
        </div>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">Place of Incident</h1>
          <span className='text-gray-500 text-[13px]'>{ placeOfIncident }</span>
        </div>

        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">What Happened</h1>
          <span className='text-gray-500 text-[13px]'>{ incidentDescription }</span>
        </div>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">Characteristics</h1>
          <span className='text-gray-500 text-[13px]'>{ characteristic }</span>
        </div>
        <div>
          <h1 className="font-bold text-[16px] text-black opacity-80">Other Measures</h1>
          <span className='text-gray-500 text-[13px]'>{ otherMesures }</span>
        </div>
      </div>
    </div>
  );
};

export default ReportSummary;
