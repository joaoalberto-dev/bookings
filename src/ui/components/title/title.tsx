import type { ReactNode } from "react";

import { TitleStyled } from "./title.style";

interface TitleProps {
  children: ReactNode;
}

export const Title = ({ children }: TitleProps) => {
  if (!children) return null;

  return <TitleStyled>{children}</TitleStyled>;
};
