import type { ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
};

export const Title = ({ children }: TitleProps) => {
  if (!children) return null;

  return <h1>{children}</h1>;
};
