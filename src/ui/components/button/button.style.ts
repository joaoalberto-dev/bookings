import { css, styled } from "styled-components";

export interface StyledButtonProps {
  variant?: "primary" | "outline";
}

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: var(--brand);
  border-radius: var(--xl);
  border: 1px solid var(--brand);
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: var(--sm) var(--xl);

  ${({ variant = "primary" }) => {
    switch (variant) {
      case "primary":
        return css`
          padding: var(--lg) calc(var(--xl) * 2);
        `;
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
