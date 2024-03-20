import ReportCard from '@/app/[lang]/(dashboard)/common/components/report-card/ReportCard';
import { Category } from '@/app/[lang]/(dashboard)/common/components/report-card/reportCard';

const ReportContainCard: React.FC<{
  data: { id: string; text: string; btn: any }[];
}> = (props) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {props.data.map((item, index) => {
        return (
          <ReportCard
            key={index}
            title={item.id}
            date={item.text}
            reportType={item.btn}
          />
        );
      })}
    </div>
  );
};

export default ReportContainCard;
