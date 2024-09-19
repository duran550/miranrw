export type NavBarProps = {
  navigation: {
    home: string;
    reportIncident: string;
    aboutQueer: {
      title: string;
      firstSubmenu: string;
      secondSubmenu: string;
      thirdSubmenu: string;
    };
    aboutUs: {
      title: string;
    
      news: string;
     
      team: string;
      partners: string;
    };
    faqs: string;
    button: string;
  };
  lang: string;
};
