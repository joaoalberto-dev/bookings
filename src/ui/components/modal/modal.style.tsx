import { styled } from "styled-components";

export const ModalOverlay = styled.div`
  align-items: flex-end;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  inset: 0;
  justify-content: center;
  position: fixed;
  z-index: var(--z-modal);

  @media screen and (min-width: 768px) {
    align-items: center;
  }
`;

export const ModalContent = styled.div`
  background: var(--background);
  border-radius: var(--xl) var(--xl) 0 0;
  box-shadow: var(--shadow-elevation);
  margin: 0 auto;
  max-height: 100dvh;
  max-width: 100%;
  min-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  position: relative;
  scrollbar-width: thin;
  width: 100%;

  @media screen and (min-width: 768px) {
    align-items: center;
    border-radius: var(--xl);
    max-width: 500px;
  }
`;

export const ModalClose = styled.button`
  align-items: center;
  appearance: none;
  background: var(--elevated-background);
  border-radius: 100%;
  border: none;
  cursor: pointer;
  display: flex;
  font-size: 1.4rem;
  height: 26px;
  justify-content: center;
  position: absolute;
  right: var(--md);
  top: var(--md);
  width: 26px;
  z-index: var(--z-modal);
`;
