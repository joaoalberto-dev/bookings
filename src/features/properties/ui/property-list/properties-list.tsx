import { centsToDollar } from "@/utils/to-currency";

import { useProperties } from "../../data/properties.store";
import type { Property } from "../../data/properties.types";
import * as S from "./properties-list.style";

interface PropertiesListProps {
  onPropertySelect: (property: Property) => void;
}

export const PropertiesList = ({ onPropertySelect }: PropertiesListProps) => {
  const properties = useProperties();

  return (
    <S.PropertyListContainer>
      {properties.map((property) => (
        <S.PropertyContainer
          key={property.id}
          id=""
          onPointerUp={() => {
            onPropertySelect(property);
          }}
        >
          <S.PropertyCover src={property.cover} alt={property.name} />
          <S.PropertyContent>
            <S.PropertyTitle>{property.name}</S.PropertyTitle>
          </S.PropertyContent>
          <S.PropertyContent>
            <S.PropertyPrice>{centsToDollar(property.day_price)} for 1 night</S.PropertyPrice>
            <S.PropertyLocation>{property.location.city}</S.PropertyLocation>
          </S.PropertyContent>
        </S.PropertyContainer>
      ))}
    </S.PropertyListContainer>
  );
};
