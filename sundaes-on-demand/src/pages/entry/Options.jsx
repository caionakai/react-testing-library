import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      const response = await fetch(`http://localhost:3030/${optionType}`, {
        signal: abortController.signal,
      });
      const data = await response.json();
      setItems(data);
    })();

    return () => {
      abortController.abort();
    };
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

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
