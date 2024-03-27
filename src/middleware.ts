import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from './i18n.config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { middleware_1 } from './middleware/middleware';

function getLocale(request: NextRequest): string | undefined {
 
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export function middleware(request: NextRequest, response: any, next: any) {
  
  
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }

 const locale = getLocale(request);
  const privateAdminPaths = [
    `/${locale}/dashboard`,
    `/${locale}/dashboard/reports`,
    `/${locale}/dashboard/quantitative`,
    `/${locale}/dashboard/qualitative`,
    `/${locale}/dashboard/settings`,
  ];
    const privateCleanerPaths = [
      `/${locale}/dashboard`,
      `/${locale}/dashboard/clean-data`,
     
  ];
   const privateViewerPaths = [
     `/${locale}/dashboard`,
     `/${locale}/dashboard/cleaned-reports`,
     `/${locale}/dashboard/quantitative`,
     `/${locale}/dashboard/qualitative`,
     `/${locale}/dashboard/compare-data`,
  ];

     const privateRiskPaths = [
       `/${locale}/dashboard`,
       `/${locale}/dashboard/dangerous-reports`,
     ];
  

  //  const privateUserPaths = [
  //    '/fr/settings/notification',
  //    '/en/settings/notification',
  //    '/fr/user/history',
  //    '/en/user/history',
  //    '/fr/user/send-transfer',
  //    '/en/user/send-transfer',
  //    '/fr/settings',
  //    '/en/settings',
  //    '/en/settings/clients',
  //    '/fr/settings/clients',
  //    '/fr/user/manage-clients',
  //    '/en/user/manage-clients',
  //  ];

   const publicPath = [`/${locale}/login`];

  

   // console.log(request.cookies.get('user_data'), 'this is my request');
   if (!request.cookies.get('user_data') && pathname.includes('/dashboard')) {
     return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
   } else if (
     request.cookies.get('user_data') &&
     publicPath.includes(pathname)
   ) {
       return NextResponse.redirect(
         new URL(`/${locale}/dashboard`, request.url)
       );

    //  if (user && user?.role === 1) {
    //    return NextResponse.redirect(
    //      new URL(`/${locale}/admin/dashboard`, request.url)
    //    );
    //  } else {
    //    return NextResponse.redirect(
    //      new URL(`/${locale}/user/send-transfer`, request.url)
    //    );
    //  }
   } else if (
     request.cookies.get('user_data') &&
     !publicPath.includes(pathname)
   ) {
     let user = JSON.parse(request.cookies.get('user_data')?.value!);
     if (
       user &&
       user?.role &&
       user?.role == 1 &&
       !privateAdminPaths.includes(pathname)
     ) {
       return NextResponse.redirect(
         new URL(`/${locale}/dashboard`, request.url)
       );
     } else if (
       user &&
       user?.role &&
       user?.role == 2 &&
       !privateViewerPaths.includes(pathname)
     ) {
       return NextResponse.redirect(
         new URL(`/${locale}/dashboard`, request.url)
       );
     } else if (
       user &&
       user?.role &&
       user?.role == 3 &&
       !privateCleanerPaths.includes(pathname)
     ) {
       return NextResponse.redirect(
         new URL(`/${locale}/dashboard`, request.url)
       );
     } else if (
       user &&
       user?.role &&
       user?.role == 4 &&
       !privateRiskPaths.includes(pathname)
     ) {
       return NextResponse.redirect(
         new URL(`/${locale}/dashboard`, request.url)
       );
     }
   } else {
     return NextResponse.next();
   }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  // matcher: "/api/:path*",
};
