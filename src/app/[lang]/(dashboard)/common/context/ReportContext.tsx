// import { useReducer } from 'react';
// // import CartContext from './cart-context';
// import { reportType } from '@/utils/shared-types';
// import ReportCard from '../components/report-card/ReportCard';
// import ReportContext from './ReportProvider';
// const reports:reportType[] = []
// const cardFn = (state: reportType[], action: any) => {
//   if (action.type === 'ajouter') {
//     // const prix = state.total + action.value.price * action.value.qtite;
//     // const exist = state.items.findIndex((item) => action.value.id === item.id);
//     // const existCard = state.items[exist];
//     // console.log(existCard);
//     // let tab;
//     // if (existCard) {
//     //   const updateItem = {
//     //     ...existCard,
//     //     qtite: existCard.qtite + action.value.qtite,
//     //   };
//     //   tab = [...state.items];
//     //   tab[exist] = updateItem;
//     // } else {
//     //   tab = state.items.concat(action.value);
//     // }
//     // // tab = state.items.concat(action.value);
//     // console.log(tab, prix);
//     return state;
//   }

//   //   if ((action.type = 'remove')) {
//   //     const exist2 = state.items.findIndex((item) => action.id === item.id);
//   //     const existCard2 = state.items[exist2];
//   //     const total2 = state.total - existCard2.price;
//   //     let remove;
//   //     if (existCard2.qtite > 1) {
//   //       const rem = { ...existCard2, qtite: +state.items.qtite - 1 };
//   //       remove = [...state.items];
//   //       remove[exist2] = rem;
//   //     } else {
//   //       remove = state.items.filter((item) => item.id !== action.id);
//   //     }
//   //     return { items: remove, total: total2 };
//   //   }
//   return reports;
// };
// const ReportProvider = (props:any) => {
//   const [reportReducer, dispatchCard] = useReducer(cardFn, reports);
//   const fill = (report:reportType[]) => {
//     dispatchCard({ type: 'ajouter', value: report });
//   };
// //   const removeHandler = (key) => {
// //     dispatchCard({ type: 'remove', id: key });
// //   };
//   const cartContext = {
//     // report: cardReducer.items,
//     // amount: cardReducer.total,
//     reports: reportReducer,
//     //   amount: 0,
//     fillReport: fill,
//   };
//   return (
//     <ReportContext.Provider value={cartContext}>
//       {props.children}
//     </ReportContext.Provider>
//   );
// };
// export default ReportProvider;
