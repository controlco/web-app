import React from "react";
import PropertyItem from "../../src/components/Properties/PropertyItem";

const Prop1 = () => {
  return (
    <PropertyItem
      title={"Casa gigante"}
      description={"una casa en el lago"}
      address={"Calle 1, Santiago"}
      imageUrl={"https://source.unsplash.com/random"}
    />
  );
};

export default Prop1;
