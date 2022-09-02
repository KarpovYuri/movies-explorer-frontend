import React from 'react';

const useEscClose = (isOpen, onClose) => {

  // Закрытие попапов по Escape
  React.useEffect(() => {
    function handleEscClose(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) document.addEventListener('keydown', handleEscClose);
    return () => document.removeEventListener('keydown', handleEscClose);
  }, [onClose, isOpen]);

}

export default useEscClose;
