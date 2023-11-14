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
      referalCounseling: string;
      news: string;
      publications: string;
      team: string;
      partners: string;
    };
    faqs: string;
  };
  lang: string;
};
