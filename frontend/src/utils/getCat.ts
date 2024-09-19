"use server"

import axios from "axios";

export const getCatServer = async (token:string, id:string) => {
//   const arrayCat= await  fetch(
//       'https://api.medar.nrw/categorization?token=' +
//         token +
//         '&id=' +
//         id
//   );
    // console.log("arrayCat======================", arrayCat);
    //  const data = new FormData();
    //  data.append('file', image);
    
     const response = await axios.get(
       'https://api.medar.nrw/categorization?token=' + token + '&id=' + id
     );
     // // ;
console.log("response===================",response);
        
     return response.data;
    
    
}