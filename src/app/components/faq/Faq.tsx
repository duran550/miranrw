import React from 'react';
import FaqItem from './FaqItem';

type dataType = { id: number; question: string; answer: string };

type FaqProps = {
  faqs?: dataType[];
  title: string;
};
const Faq: React.FC<FaqProps> = ({ title, faqs }) => {
  return (
    <div className="my-12">
      <h1 className="font-bold text-xl mb-2">{title}</h1>
      {faqs?.map((faq: dataType) => (
        <FaqItem key={faq?.id} title={faq?.question} content={faq?.answer} />
      ))}
    </div>
  );
};

export default Faq;
