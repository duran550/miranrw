import React from 'react';
import SelectField from '../../select-field/SelectField';
import RadioGroup from '../../radio/RadioGroup';
import { ageRange, gender, identity } from './firstFormData';
import FormHeader from '../header/header';

const FirstStep = () => {
  return (
    <FormHeader
      title="Informationen zur Meldung"
      subTitle=" Vielen Dank, dass Du dir Zeit und Energie nimmst einen queerfeindlichen
    Vorfall zu melden. In diesem Formular gibt es insgesamt 12 Fragen: Im
    ersten Abschnitt geht es um den Vorfall selbst. Hier wird danach
    gefragt, was passiert ist und inwiefern sich der Vorfall einordnen
    lässt. Im zweiten Abschnitt möchten wir mehr über die betroffene Person
    erfahren. Mit diesen Angaben hilfst Du uns, queerfeindliche Angriffe in
    unserer Statistik genauer aufzuführen. Wenn Du fertig bist, schickst Du
    das Formular ab und wir zeigen dir auf, was für Beratungs- und
    Informationsangebote es gibt."
    />
  );
};

export default FirstStep;
