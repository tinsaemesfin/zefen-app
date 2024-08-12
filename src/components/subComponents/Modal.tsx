/** @jsxImportSource @emotion/react */
import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 700px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Overlay>
      <Content>
        <CloseButton onClick={onClose}>X</CloseButton>
        {children}
      </Content>
    </Overlay>,
    document.getElementById('modal-root')!
  );
};

export default Modal;