import { type ButtonHTMLAttributes } from "react";

import type { StyledButtonProps } from "./button.style";
import * as S from "./button.style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: StyledButtonProps["variant"];
}

export const Button = ({ variant, children, ...props }: ButtonProps) => {
  return (
    <S.StyledButton variant={variant} {...props}>
      {children}
    </S.StyledButton>
  );
};
