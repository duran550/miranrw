// Admin links
import CleanDataIcon from './icons/CleanDataIcon';
import CompareIcon from './icons/CompareIcon';
import HomeIcon from './icons/HomeICon';
import QualitativeIcon from './icons/QualitativeIcon';
import QuantitativeIcon from './icons/QuantitativeIcon';
import ReportsIcon from './icons/ReportsIcon';
import ReportsWarningIcon from './icons/ReportsWarningIcon';
import SettingsIcon from './icons/SettingsIcon';
export const adminLinks: Array<{ name: string; href: string; icon: any }> = [
  {
    name: 'Dashboard',
    href: '/en/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Reports',
    href: '/en/dashboard/reports',
    icon: ReportsIcon,
  },

  {
    name: 'Quantitative',
    href: '/en/dashboard/quantitative',
    icon: QuantitativeIcon,
  },
  {
    name: 'Qualitative',
    href: '/en/dashboard/qualitative',
    icon: QualitativeIcon,
  },
  {
    name: 'settings',
    href: '/en/dashboard/settings',
    icon: SettingsIcon,
  },
];

// Cleaner links
export const cleanerLinks: Array<{ name: string; href: string; icon: any }> = [
  {
    name: 'Home',
    href: '/en/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Clean data',
    href: '/en/dashboard/clean-data',
    icon: CleanDataIcon,
  },
];

// Viewer links
export const viewerLinks: any = [
  {
    name: 'Dashboard',
    href: '/en/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Reports',
    href: '/en/dashboard/cleaned-reports',
    icon: ReportsIcon,
  },

  {
    name: 'Quantitative',
    href: '/en/dashboard/quantitative',
    icon: QuantitativeIcon,
  },
  {
    name: 'qualitative',
    href: '/en/dashboard/qualitative',
    icon: QualitativeIcon,
  },
  ,
  {
    name: 'Compare data',
    href: '/en/dashboard/compare-data',
    icon: CompareIcon,
  },
];

// Risk manager

export const riskManagerLinks: any = [
  {
    name: 'Dashboard',
    href: '/en/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Reports',
    href: '/en/dashboard/dangerous-reports',
    icon: ReportsWarningIcon,
  },
];
