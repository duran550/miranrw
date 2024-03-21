import { Button } from '@/app/components/button/Button';
import React from 'react';

import CleanIcon from '../../../../../../../../../public/icons/dashboard/cleanIcon.svg';
import IrrelevantIcon from '../../../../../../../../../public/icons/dashboard/irrelevantIcon.svg';
import DangerousIcon from '../../../../../../../../../public/icons/dashboard/dangerousIcon.svg';

const ReportActions = () => {
  return (
    <div className="p-4 border rounded-xl border-gray-300 w-full">
      <h1 className="font-bold my-3 text-2xl opacity-90">Actions</h1>
      {/* <div className="my-2 p-4 rounded-xl border border-gray-400">
        Recommended as:{' '}
      </div> */}

      <div className="flex  gap-x-4">
        <Button className="text-xs" icon={CleanIcon}>
          Clean Data
        </Button>
        <Button
          className="text-xs"
          variant="outlinePrimary"
          icon={IrrelevantIcon}
        >
          Mark As Irrelevant
        </Button>
        <Button
          className="text-xs"
          variant="outlineWarning"
          icon={DangerousIcon}
        >
          Mark As Dangerous
        </Button>
      </div>
    </div>
  );
};

export default ReportActions;
