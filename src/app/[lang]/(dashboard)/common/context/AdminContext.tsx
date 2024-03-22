'use client';

import React, { Dispatch, createContext, useReducer } from 'react';
import { ADD_CATEGORY, SHOW_DRAWER } from './constants';
// import { Category } from '../components/report-card/reportCard';
import { AllReportsType } from '../../dashboard/reports/reportSummaryType';
// import { Category } from '../components/report-card/reportCard';


type AdminType = {
  showDrawer: boolean; 
  reportsCardTableUncategorized: AllReportsType;
};

type ActionType = {
  payload: any;
  type: string;
};

const initialState: AdminType = {
  showDrawer: false, 
  reportsCardTableUncategorized: [
    {
      id: 'PT1245O',
      text: 'Tuesday 7 September 2023, 20H45',
      // btn: Category.Uncategorized, 
      summary: {
        personAffected: "Claude Max", 
        genderIdentity: "Male", 
        age: 45, 
        date: "14 October 2023", 
        placeOfIncident: "Paris", 
        incidentDescription: "They stopped me on the road and asked me why i am not a normal human being like them, and later started attacking me physically till i was down", 
        characteristic: "brutal, annoying", 
        otherMesures: "putting police everywhere"
      }, 
      categories: []
    },
    {
      id: 'PT12451',
      text: 'Tuesday 7 September 2023, 20H45',
      // btn: Category.Uncategorized, 
      summary: {
        personAffected: "Pascal Obispo", 
        genderIdentity: "Male", 
        age: 45, 
        date: "14 October 2023", 
        placeOfIncident: "Paris", 
        incidentDescription: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum", 
        characteristic: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33", 
        otherMesures: "putting police everywhere"
      }, 
      categories: []
    },
    {
      id: 'PT12452',
      text: 'Tuesday 7 September 2023, 20H45',
      // btn: Category.Uncategorized, 
      summary: {
        personAffected: "Neuer", 
        genderIdentity: "Male", 
        age: 45, 
        date: "14 October 2023", 
        placeOfIncident: "Paris", 
        incidentDescription: "They stopped me on the road and asked me why i am not a normal human being like them, and later started attacking me physically till i was down", 
        characteristic: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33", 
        otherMesures: "putting police everywhere"
      }
    },
    {
      id: 'PT12453',
      text: 'Tuesday 7 September 2023, 20H45',
      // btn: Category.Uncategorized, 
      summary: {
        personAffected: "Mbala", 
        genderIdentity: "Male", 
        age: 45, 
        date: "14 October 2023", 
        placeOfIncident: "Paris", 
        incidentDescription: "They stopped me on the road and asked me why i am not a normal human being like them, and later started attacking me physically till i was down", 
        characteristic: "brutal, annoying", 
        otherMesures: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. "
      }, 
      categories: []
    },
    {
      id: 'PT12454',
      text: 'Tuesday 7 September 2023, 20H45',
      // btn: Category.Uncategorized, 
      summary: {
        personAffected: "Wandji", 
        genderIdentity: "Male", 
        age: 45, 
        date: "14 October 2023", 
        placeOfIncident: "Paris", 
        incidentDescription: "They stopped me on the road and asked me why i am not a normal human being like them, and later started attacking me physically till i was down", 
        characteristic: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.", 
        otherMesures: "putting police everywhere"
      }, 
      categories: []
    },
    {
      id: 'PT12455',
      text: 'Tuesday 7 September 2023, 20H45',
      // btn: Category.Uncategorized, 
      summary: {
        personAffected: "Sepcy", 
        genderIdentity: "Male", 
        age: 45, 
        date: "14 October 2023", 
        placeOfIncident: "Paris", 
        incidentDescription: "They stopped me on the road and asked me why i am not a normal human being like them, and later started attacking me physically till i was down", 
        characteristic: "brutal, annoying", 
        otherMesures: "putting police everywhere"
      }, 
      categories: []
    },
    {
      id: 'PT12456',
      text: 'Tuesday 7 September 2023, 20H45',
      // btn: Category.Uncategorized, 
      summary: {
        personAffected: "Top G*", 
        genderIdentity: "Male", 
        age: 45, 
        date: "14 October 2023", 
        placeOfIncident: "Paris", 
        incidentDescription: "They stopped me on the road and asked me why i am not a normal human being like them, and later started attacking me physically till i was down", 
        characteristic: "brutal, annoying", 
        otherMesures: "putting police everywhere"
      }, 
      categories: []
    },
  ]
};

const reducer = (initialState: AdminType, action: ActionType) => {
  switch (action.type) {
    case SHOW_DRAWER:
      return {
        ...initialState,
        showDrawer: !initialState.showDrawer,
      };
    case ADD_CATEGORY: 
      const resultedReportsCardTableUncategorized = initialState?.reportsCardTableUncategorized.map((report) => {
        return "nice"
      })
      return {
        ...initialState, 
        reportsCardTableUncategorized: action.payload
      };

    default:
      return initialState;
  }
};

export const AdminContext = createContext<{
  state: AdminType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};
