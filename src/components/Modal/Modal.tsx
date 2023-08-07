import { useContext } from 'react';

import { ModalContext } from '../../context';

import './Modal.css'

interface Props {
  children: React.ReactNode
}

export const Modal = ({ children }: Props) => {

  const { isShow } = useContext(ModalContext);

  return (
    <div className={`modal ${isShow && 'show'}`}>
      {children}
    </div>
  );
};
