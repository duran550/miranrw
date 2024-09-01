'use client';
import React from 'react';
import Settings from '@/app/components/settings/Settings';
import { useAuth } from '@/app/hooks/useAuth';
import SettingViewer from '@/app/components/settingViewer/SetingViewer';

const SettingModule = () => {
  const { user } = useAuth();
  return (
    <div className="pt-8 h-full w-full ">
      <h1 className="mb-8 text-2xl font-bold">
        {user?.role == 1 ? 'Settings' : 'ASR Specific Config'}
      </h1>
      {user?.role == 1 ? <Settings /> : <SettingViewer />}
    </div>
  );
};

export default SettingModule;
