import React, { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import { Row } from "react-bootstrap";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3030/${optionType}`);
      const data = await response.json();
      setItems(data);
    })();

    return () => {
      //   unsub
    };
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : null;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
