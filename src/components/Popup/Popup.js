import React from 'react';
import useEscClose from "../../hooks/useEscClose";
import './Popup.css';

function Popup({ isOpen, onClose, isPopupMessage }) {

  // Закрытие попапов по Escape
  useEscClose(isOpen, onClose);

  return (
    <article className={`popup ${isOpen && 'popup_opened'}`}>
      <div onClick={onClose} className="popup__overlay"></div>
      <div className='popup__wrapper'>
        <h2 className='popup__text'>{isPopupMessage}</h2>
        <button
          className='popup__close-btn hover-btn'
          aria-label='сlose'
          type='button'
          onClick={onClose}
        ></button>
      </div>
    </article>
  );
};

export default Popup;
