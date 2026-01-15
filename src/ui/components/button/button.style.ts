import { css, styled } from "styled-components";

export interface StyledButtonProps {
  variant?: "outline";
}

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: var(--brand);
  border-radius: var(--xl);
  border: 1px solid var(--brand);
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: var(--sm) var(--xl);

  ${({ variant }) => {
    switch (variant) {
      case "outline":
        return css`
          background: transparent;
          border-color: var(--outline);
          color: var(--outline);
        `;
      default:
        return null;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
