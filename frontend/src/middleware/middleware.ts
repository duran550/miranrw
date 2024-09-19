import { NextRequest } from "next/server";

export const middleware_1 = async (request: NextRequest) => {
    console.log('====================Running middleware 1======================')
    console.log(request.cookies);
    
  };
  