import type { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

export const Title = ({ children }: TitleProps) => {
  if (!children) return null;

  return <h1>{children}</h1>;
};
