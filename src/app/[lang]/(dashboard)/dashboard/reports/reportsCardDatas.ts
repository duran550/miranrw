import { Category } from '../../common/components/report-card/reportCard.d';
import { AllReportsType, DataCategorizationOptionsType } from './reportSummaryType';

export const reportsCardTableUncategorized: AllReportsType = [
  {
    id: 'PT1245O',
    text: 'Tuesday 7 September 2023, 20H45',
    btn: Category.Uncategorized, 
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
    btn: Category.Uncategorized, 
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
    btn: Category.Uncategorized, 
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
    btn: Category.Uncategorized, 
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
    btn: Category.Uncategorized, 
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
    btn: Category.Uncategorized, 
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
    btn: Category.Uncategorized, 
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
];

export const reportsCardTableCategorized: {
  id: string;
  text: string;
  btn: string;
}[] = [
  {
    id: 'PT1245O',
    text: 'Tuesday 7 September 2023, 20H45',
    btn: Category.Categorized,
  },
  {
    id: 'PT1245O',
    text: 'Tuesday 7 September 2023, 20H45',
    btn: Category.Categorized,
  },
  {
    id: 'PT1245O',
    text: 'Tuesday 7 September 2023, 20H45',
    btn: Category.Categorized,
  },
  {
    id: 'PT1245O',
    text: 'Tuesday 7 September 2023, 20H45',
    btn: Category.Categorized,
  },
  {
    id: 'PT1245O',
    text: 'Tuesday 7 September 2023, 20H45',
    btn: Category.Categorized,
  },
  {
    id: 'PT1245O',
    text: 'Tuesday 7 September 2023, 20H45',
    btn: Category.Categorized,
  },
];

export const dataCategorizationOptions: DataCategorizationOptionsType = [
  {
    id: 1, 
    name: "Category 1", 
    options: [
      {
        id: 1, 
        name: "Option 1", 
        formName: "category_1", 
        value: "cat_1_option_1", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 2, 
        name: "Option 2", 
        formName: "category_1", 
        value: "cat_1_option_2", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 3, 
        name: "Option 3", 
        formName: "category_1", 
        value: "cat_1_option_3", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 4, 
        name: "Option 4", 
        formName: "category_1", 
        value: "cat_1_option_4", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 5, 
        name: "Option 5", 
        formName: "category_1", 
        value: "cat_1_option_5", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 6, 
        name: "Option 6", 
        formName: "category_1", 
        value: "cat_1_option_6", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 7, 
        name: "Option 7", 
        formName: "category_1", 
        value: "cat_1_option_7", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 8, 
        name: "Option 8", 
        formName: "category_1", 
        value: "cat_1_option_8", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 9, 
        name: "Option 9", 
        formName: "category_1", 
        value: "cat_1_option_9", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      
    ]
  }, 
  {
    id: 2, 
    name: "Category 2", 
    options: [
      {
        id: 1, 
        name: "Option 1", 
        formName: "category_2", 
        value: "cat_2_option_1", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 2, 
        name: "Option 2", 
        formName: "category_2", 
        value: "cat_2_option_2", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 3, 
        name: "Option 3", 
        formName: "category_2", 
        value: "cat_2_option_3", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      
    ]
  }, 
  {
    id: 3, 
    name: "Category 3", 
    options: [
      {
        id: 1, 
        name: "Option 1", 
        formName: "category_3", 
        value: "cat_3_option_1", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 2, 
        name: "Option 2", 
        formName: "category_3", 
        value: "cat_3_option_2", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 3, 
        name: "Option 3", 
        formName: "category_3", 
        value: "cat_3_option_3", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 4, 
        name: "Option 4", 
        formName: "category_3", 
        value: "cat_3_option_4", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 5, 
        name: "Option 5", 
        formName: "category_3", 
        value: "cat_3_option_5", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 6, 
        name: "Option 6", 
        formName: "category_3", 
        value: "cat_3_option_6", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 7, 
        name: "Option 7", 
        formName: "category_3", 
        value: "cat_3_option_7", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 8, 
        name: "Option 8", 
        formName: "category_3", 
        value: "cat_3_option_8", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 9, 
        name: "Option 9", 
        formName: "category_3", 
        value: "cat_3_option_9", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      
    ]
  }, 
  {
    id: 4, 
    name: "Category 4", 
    options: [
      {
        id: 1, 
        name: "Option 1", 
        formName: "category_4", 
        value: "cat_4_option_1", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 2, 
        name: "Option 2", 
        formName: "category_4", 
        value: "cat_4_option_2", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 3, 
        name: "Option 3", 
        formName: "category_4", 
        value: "cat_4_option_3", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 4, 
        name: "Option 4", 
        formName: "category_4", 
        value: "cat_4_option_4", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 5, 
        name: "Option 5", 
        formName: "category_4", 
        value: "cat_4_option_5", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 6, 
        name: "Option 6", 
        formName: "category_4", 
        value: "cat_4_option_6", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 7, 
        name: "Option 7", 
        formName: "category_4", 
        value: "cat_4_option_7", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 8, 
        name: "Option 8", 
        formName: "category_4", 
        value: "cat_4_option_8", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 9, 
        name: "Option 9", 
        formName: "category_4", 
        value: "cat_4_option_9", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      
    ]
  }, 
  {
    id: 5, 
    name: "Category 5", 
    options: [
      {
        id: 1, 
        name: "Option 1", 
        formName: "category_5", 
        value: "cat_5_option_1", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 2, 
        name: "Option 2", 
        formName: "category_5", 
        value: "cat_5_option_2", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 3, 
        name: "Option 3", 
        formName: "category_5", 
        value: "cat_5_option_3", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      
    ]
  }, 
  {
    id: 6, 
    name: "Category 6", 
    options: [
      {
        id: 1, 
        name: "Option 1", 
        formName: "category_6", 
        value: "cat_6_option_1", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 2, 
        name: "Option 2", 
        formName: "category_6", 
        value: "cat_6_option_2", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 3, 
        name: "Option 3", 
        formName: "category_6", 
        value: "cat_6_option_3", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      
    ]
  }, 
  {
    id: 7, 
    name: "Category 7", 
    options: [
      {
        id: 1, 
        name: "Option 1", 
        formName: "category_7", 
        value: "cat_7_option_1", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 2, 
        name: "Option 2", 
        formName: "category_7", 
        value: "cat_7_option_2", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 3, 
        name: "Option 3", 
        formName: "category_7", 
        value: "cat_7_option_3", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 4, 
        name: "Option 4", 
        formName: "category_7", 
        value: "cat_7_option_4", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 5, 
        name: "Option 5", 
        formName: "category_7", 
        value: "cat_7_option_5", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 6, 
        name: "Option 6", 
        formName: "category_7", 
        value: "cat_7_option_6", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 7, 
        name: "Option 7", 
        formName: "category_7", 
        value: "cat_7_option_7", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 8, 
        name: "Option 8", 
        formName: "category_7", 
        value: "cat_7_option_8", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      {
        id: 9, 
        name: "Option 9", 
        formName: "category_7", 
        value: "cat_7_option_9", 
        description: {
          title: "Description", 
          description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
      }, 
      
    ]
  },
]


// export const dataCategorizationOptions: DataCategorizationOptionsType = [
//   {
//     id: 1, 
//     name: "Category 1", 
//     options: [
//       {
//         id: 1, 
//         name: "Option 1", 
//         formName: "option_cat_1", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 2, 
//         name: "Option 2", 
//         formName: "option_cat_2", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 3, 
//         name: "Option 3", 
//         formName: "option_cat_3", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 4, 
//         name: "Option 4", 
//         formName: "option_cat_4", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 5, 
//         name: "Option 5", 
//         formName: "option_cat_5", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 6, 
//         name: "Option 6", 
//         formName: "option_cat_6", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 7, 
//         name: "Option 7", 
//         formName: "option_cat_7", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 8, 
//         name: "Option 8", 
//         formName: "option_cat_8", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 9, 
//         name: "Option 9", 
//         formName: "option_cat_9", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
      
//     ]
//   }, 
//   {
//     id: 2, 
//     name: "Category 2", 
//     options: [
//       {
//         id: 1, 
//         name: "Option 1", 
//         formName: "option_cat_1", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 2, 
//         name: "Option 2", 
//         formName: "option_cat_2", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 3, 
//         name: "Option 3", 
//         formName: "option_cat_3", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
      
//     ]
//   }, 
//   {
//     id: 3, 
//     name: "Category 3", 
//     options: [
//       {
//         id: 1, 
//         name: "Option 1", 
//         formName: "option_cat_1", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 2, 
//         name: "Option 2", 
//         formName: "option_cat_2", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 3, 
//         name: "Option 3", 
//         formName: "option_cat_3", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 4, 
//         name: "Option 4", 
//         formName: "option_cat_4", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 5, 
//         name: "Option 5", 
//         formName: "option_cat_5", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 6, 
//         name: "Option 6", 
//         formName: "option_cat_6", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 7, 
//         name: "Option 7", 
//         formName: "option_cat_7", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 8, 
//         name: "Option 8", 
//         formName: "option_cat_8", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 9, 
//         name: "Option 9", 
//         formName: "option_cat_9", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
      
//     ]
//   }, 
//   {
//     id: 4, 
//     name: "Category 4", 
//     options: [
//       {
//         id: 1, 
//         name: "Option 1", 
//         formName: "option_cat_1", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 2, 
//         name: "Option 2", 
//         formName: "option_cat_2", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 3, 
//         name: "Option 3", 
//         formName: "option_cat_3", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 4, 
//         name: "Option 4", 
//         formName: "option_cat_4", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 5, 
//         name: "Option 5", 
//         formName: "option_cat_5", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 6, 
//         name: "Option 6", 
//         formName: "option_cat_6", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 7, 
//         name: "Option 7", 
//         formName: "option_cat_7", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 8, 
//         name: "Option 8", 
//         formName: "option_cat_8", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 9, 
//         name: "Option 9", 
//         formName: "option_cat_9", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
      
//     ]
//   }, 
//   {
//     id: 5, 
//     name: "Category 5", 
//     options: [
//       {
//         id: 1, 
//         name: "Option 1", 
//         formName: "option_cat_1", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 2, 
//         name: "Option 2", 
//         formName: "option_cat_2", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 3, 
//         name: "Option 3", 
//         formName: "option_cat_3", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
      
//     ]
//   }, 
//   {
//     id: 6, 
//     name: "Category 6", 
//     options: [
//       {
//         id: 1, 
//         name: "Option 1", 
//         formName: "option_cat_1", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 2, 
//         name: "Option 2", 
//         formName: "option_cat_2", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 3, 
//         name: "Option 3", 
//         formName: "option_cat_3", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
      
//     ]
//   }, 
//   {
//     id: 7, 
//     name: "Category 7", 
//     options: [
//       {
//         id: 1, 
//         name: "Option 1", 
//         formName: "option_cat_1", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 2, 
//         name: "Option 2", 
//         formName: "option_cat_2", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 3, 
//         name: "Option 3", 
//         formName: "option_cat_3", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 4, 
//         name: "Option 4", 
//         formName: "option_cat_4", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 5, 
//         name: "Option 5", 
//         formName: "option_cat_5", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 6, 
//         name: "Option 6", 
//         formName: "option_cat_6", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 7, 
//         name: "Option 7", 
//         formName: "option_cat_7", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 8, 
//         name: "Option 8", 
//         formName: "option_cat_8", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
//       {
//         id: 9, 
//         name: "Option 9", 
//         formName: "option_cat_9", 
//         description: {
//           title: "Description", 
//           description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
//         }
//       }, 
      
//     ]
//   },
// ]
