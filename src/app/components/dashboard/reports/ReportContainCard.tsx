import ReportsCard from "./ReportsCard";



const ReportContainCard: React.FC<{
  data: { id: string; text: string; btn: string }[];
}> = (props) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {props.data.map((item, index) => {
        return (
          <ReportsCard
            key={index}
            id={item.id}
            text={item.text}
            textBtn={item.btn}
          />
        );
      })}
    </div>
  );
};

export default ReportContainCard;
