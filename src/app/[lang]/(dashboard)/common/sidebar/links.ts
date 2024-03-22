// Admin links
import CleanDataIcon from './icons/CleanDataIcon';
import CompareIcon from './icons/CompareIcon';
import HomeIcon from './icons/HomeICon';
import QualitativeIcon from './icons/QualitativeIcon';
import QuantitativeIcon from './icons/QuantitativeIcon';
import ReportsIcon from './icons/ReportsIcon';
import ReportsWarningIcon from './icons/ReportsWarningIcon';
import SettingsIcon from './icons/SettingsIcon';
export const adminLinks: Array<{
  name: string;
  href: string;
  icon: any;
  targetSegment: null | string;
}> = [
  {
    name: 'Dashboard',
    href: '/en/dashboard',
    icon: HomeIcon,
    targetSegment: null,
  },
  {
    name: 'Reports',
    href: '/en/dashboard/reports',
    icon: ReportsIcon,
    targetSegment: 'reports',
  },

  {
    name: 'Quantitative',
    href: '/en/dashboard/quantitative',
    icon: QuantitativeIcon,
    targetSegment: 'quantitative',
  },
  {
    name: 'Qualitative',
    href: '/en/dashboard/qualitative',
    icon: QualitativeIcon,
    targetSegment: 'qualitative',
  },
  {
    name: 'settings',
    href: '/en/dashboard/settings',
    icon: SettingsIcon,
    targetSegment: 'settings',
  },
];

// Cleaner links
export const cleanerLinks: Array<{
  name: string;
  href: string;
  icon: any;
  targetSegment: string | null;
}> = [
  {
    name: 'Home',
    href: '/en/dashboard',
    icon: HomeIcon,
    targetSegment: null,
  },
  {
    name: 'Clean data',
    href: '/en/dashboard/clean-data',
    icon: CleanDataIcon,
    targetSegment: 'clean-data',
  },
];

// Viewer links
export const viewerLinks: any = [
  {
    name: 'Dashboard',
    href: '/en/dashboard',
    icon: HomeIcon,
    targetSegment: null,
  },
  {
    name: 'Reports',
    href: '/en/dashboard/cleaned-reports',
    icon: ReportsIcon,
    targetSegment: 'cleaned-reports',
  },

  {
    name: 'Quantitative',
    href: '/en/dashboard/quantitative',
    icon: QuantitativeIcon,
    targetSegment: 'quantitative',
  },
  {
    name: 'qualitative',
    href: '/en/dashboard/qualitative',
    icon: QualitativeIcon,
    targetSegment: 'qualitative',
  },
  ,
  {
    name: 'Compare data',
    href: '/en/dashboard/compare-data',
    icon: CompareIcon,
    targetSegment: 'compare-data',
  },
];

// Risk manager

export const riskManagerLinks: any = [
  {
    name: 'Dashboard',
    href: '/en/dashboard',
    icon: HomeIcon,
    targetSegment: null,
  },
  {
    name: 'Reports',
    href: '/en/dashboard/dangerous-reports',
    icon: ReportsWarningIcon,
    targetSegment: 'dangerous-reports',
  },
];
