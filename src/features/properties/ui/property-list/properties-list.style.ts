import { styled } from "styled-components";

export const PropertyListContainer = styled.ul`
  display: grid;
  gap: var(--xl);
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin: 0 auto calc(var(--xl) * 4);
  max-width: 1280px;
  padding: var(--xl);
`;

export const PropertyContainer = styled.li`
  background: var(--elevated-background);
  border-radius: var(--md);
  box-shadow: var(--shadow-elevation);
  cursor: pointer;
  list-style: none;
  padding: var(--md);
`;

export const PropertyCover = styled.img`
  aspect-ratio: 16/9;
  background: var(--elevated-background);
  border-radius: var(--sm);
  object-fit: cover;
  width: 100%;
`;

export const PropertyContent = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: var(--sm);
  padding-inline: var(--md);
`;

export const PropertyTitle = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
`;

export const PropertyPrice = styled.p`
  color: var(--elevated-foreground);
  font-size: 0.8rem;
  margin: 0;
`;

export const PropertyLocation = styled.p`
  color: var(--elevated-foreground);
  font-size: 0.8rem;
  margin: 0;
  padding-inline: var(--md);
`;
