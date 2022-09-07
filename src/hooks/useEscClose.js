import { useEffect } from "react";

function useEscClose(isOpen, onClose) {

  // Закрытие попапов по Escape
  useEffect(() => {

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
