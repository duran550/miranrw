import { FORM_ERRORS } from '@/app/context/actions';
import { useFormContext } from '@/app/hooks/useFormContext';
import { getFormCookies } from '@/cookies/cookies';
import { FOURTH_FORM } from '@/cookies/cookies.d';
import { cities } from '@/utils/data';
import React, { useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

type Item = {
  id: number;
  name: string;
  postalCode: number;
};

type AutoCompleteProps = {
  handleOnSelect: any;
  handleOnSearch: any;
  locationFromParent: string;
  handleOnHover?: () => void;
  handleOnFocus?: () => void;
};

const AutoComplete: React.FC<AutoCompleteProps> = ({
  handleOnFocus,
  locationFromParent,
  handleOnHover,
  handleOnSearch,
  handleOnSelect,
}) => {
  const [location, setLocation] = useState<string>(locationFromParent);
  const { dispatch, formErrors } = useFormContext();

  console.log(formErrors);

  useEffect(() => {
    dispatch({ type: FORM_ERRORS, payload: true });

    const formValues = getFormCookies(FOURTH_FORM);

    formValues && !location && setLocation(formValues?.location);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Formatting the text
  const formatResult = (item: any) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>
          {item?.name}
        </span>
      </>
    );
  };

  return (
    <ReactSearchAutocomplete<Item>
      items={cities}
      onSearch={handleOnSearch}
      onHover={handleOnHover}
      showItemsOnFocus={false}
      onSelect={handleOnSelect}
      onFocus={handleOnFocus}
      inputSearchString={location}
      // autoFocus
      formatResult={formatResult}
      styling={{
        height: '44px',
        border: '1px solid #dfe1e5',
        borderRadius: '0.4rem',
        zIndex: 20,
        boxShadow: 'rgba(32, 33, 36, 0) 0px 1px 6px 0px',
        hoverBackgroundColor: '#eee',
        color: '#212121',
        fontSize: '16px',
        fontFamily: '',
        iconColor: 'white',
        lineColor: 'rgb(232, 234, 237)',
        placeholderColor: 'grey',
        clearIconMargin: '3px 14px 0 0',
        searchIconMargin: '0 0 0 .4rem',
      }}
    />
  );
};

export default AutoComplete;
