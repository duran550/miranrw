"use client"

import React, { useEffect } from 'react';
import CustomModal from '../../modal/Modal';
import { Button } from '@/app/components/button/Button';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n.config';
import Checkbox from '../checkbox/Checkbox';
import { useForm } from 'react-hook-form';
import { useFormContext } from '@/app/hooks/useFormContext';
import AnimateClick from '../../animate-click/AnimateClick';


interface onBehalfModalProps {
    onClose: () => void;
    isOpen: boolean;
    Modaldes: string;
    modalBtn?: string;
    formErrors?: any;
    children?: any;
}

interface SubmitModal {
    submitans: string;
}

function SubmitModal({
    onClose,
    isOpen,
    Modaldes,
    modalBtn,
    formErrors,
    children
  }: onBehalfModalProps) {
    return (
      <div>
        <CustomModal
          onClose={onClose}
          isOpen={isOpen}
          positon="center"
          hideCloseButton={true}
          isDismissable={false}
          size='sm'
        >
          {children}
        </CustomModal>
      </div>
    );
  }
  

export default SubmitModal;
