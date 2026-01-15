import { Title } from "../title/title";
import * as S from "./header.style";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  if (!title) return null;

  return (
    <S.HeaderContainer>
      <Title>{title}</Title>
    </S.HeaderContainer>
  );
};
