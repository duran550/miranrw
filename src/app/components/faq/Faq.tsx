import React from 'react';
import FaqItem from './FaqItem';

type FaqProps = {
  content?: {
    first: 'Frage';
    second: 'Frage';
    third: 'Frage';
    fourth: 'Frage';
    fifth: 'Frage';
  };
};
const Faq: React.FC<FaqProps> = ({ content }) => {
  return (
    <div>
      <FaqItem title="Frage" content="Lorem ipsum" />
      <FaqItem title="Frage" content="Lorem ipsum" />
      <FaqItem title="Frage" content="Lorem ipsum" />
      <FaqItem title="Frage" content="Lorem ipsum" />
      <FaqItem title="Frage" content="Lorem ipsum" />
      <FaqItem title="Frage" content="Lorem ipsum" />
      <FaqItem title="Frage" content="Lorem ipsum" />
      <FaqItem title="Frage" content="Lorem ipsum" />
    </div>
  );
};

export default Faq;
