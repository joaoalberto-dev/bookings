import { styled } from "styled-components";

export const BookingModalFooterContainer = styled.div`
  align-items: center;
  background: var(--background);
  border-top: 1px solid var(--border);
  bottom: 0;
  display: flex;
  justify-content: space-between;
  left: 0;
  padding: var(--xl);
  right: 0;
  width: 100%;
  z-index: var(--z-modal);
`;

export const BookingModalPrice = styled.p`
  font-size: 1.1rem;
  margin: 0;
  font-weight: 600;
`;

export const BookingModalSmall = styled.p`
  font-size: 0.8rem;
  color: var(--elevated-foreground);
  margin: 0;
`;
