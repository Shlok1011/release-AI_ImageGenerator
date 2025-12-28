// components/AuthModal.jsx
import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

const ModalContent = styled.div`
  background: rgba(255,255,255,0.9);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: #555;
`;

const AuthModal = ({ children, show, onClose }) => {
  if (!show) return null;
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseBtn onClick={onClose} title="Close">&times;</CloseBtn>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default AuthModal;
