import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const response = await fetch(`http://localhost:3030/${optionType}`, {
          signal: abortController.signal,
        });
        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError(true);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

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
