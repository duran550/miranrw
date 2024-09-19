import { CategorizeContext } from '@/app/context/CategorizeContext';
import React, { useContext, useEffect, useState } from 'react';

interface TextSelectorProps {
  onTextSelect: (selectedText: string) => void;
}

const TextSelector: React.FC<TextSelectorProps> = ({ onTextSelect }) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const { IshowHandler } = useContext(CategorizeContext);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Shift') {
        setIsSelecting(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Shift') {
        setIsSelecting(false);

        const selection = window.getSelection();

        // This const selectedElement is to target the specific div
        const selectedElement = selection?.anchorNode?.parentElement;

        if (
          selection &&
          selection.toString() &&
          selectedElement?.closest('[data-selectable]')
        ) {
          onTextSelect(selection.toString());
          IshowHandler(true);
        }
      } else {
        // IshowHandler(false);
      }
    };

    const handleMouseUp = () => {
      if (!isSelecting) {
        const selection = window.getSelection();

        // This const selectedElement is to target the specific div
        const selectedElement = selection?.anchorNode?.parentElement;

        if (
          selection &&
          selection.toString() &&
          selectedElement?.closest('[data-selectable]')
        ) {
          onTextSelect(selection.toString());
          IshowHandler(true);
        }
      } else {
      }
    };

    const handleMouseClick = () => {
      onTextSelect('');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSelecting, onTextSelect]);

  return null;
};

export default TextSelector;
