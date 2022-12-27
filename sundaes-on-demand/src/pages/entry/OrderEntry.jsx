import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
const OrderEntry = () => {
  const { totals } = useOrderDetails();
  return (
    <div>
      <h1>Design your sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
    </div>
  );
};

export default OrderEntry;
