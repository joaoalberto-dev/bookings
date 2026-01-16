import { styled } from "styled-components";

export const BookingModalSummaryDivider = styled.div`
  padding: var(--md);
`;

export const BookingModalSummaryTitle = styled.h1`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

export const BookingModalSummaryDetails = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;

  & li {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: var(--md);
  }

  & li + li {
    border-top: 1px solid var(--border);
  }
`;

export const BookingModalSummaryText = styled.p`
  font-size: 0.8rem;
  color: var(--elevated-foreground);
  margin: 0;
`;
