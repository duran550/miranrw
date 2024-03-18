import { Button } from '../../button/Button';

type ReportType = {
  id: string;
  text: string;
  textBtn: string;
};

const ReportsCard: React.FC<ReportType> = (props) => {
  return (
    <div className="w-full flex items-center justify-between px-4 py-4 border-2 rounded-xl">
      <div>
        <h2 className="text-lg font-bold">{props.id}</h2>
        <p className="text-sm text-[#828B8C] mt-2">{props.text}</p>
      </div>
      <Button
        className={` ${
          props.textBtn == 'Uncategorized'
            ? 'text-[#E00034]  bg-btnReportsColorUncategorized'
            : 'text-[#199A46] bg-btnReportsColorCategorized'
        } rounded-2xl px-2 text-sm py-2 w-auto`}
      >
        {props.textBtn}
      </Button>
    </div>
  );
};
export default ReportsCard;
