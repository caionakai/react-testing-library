import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("Order phases for happy path", async () => {
  const user = userEvent.setup();
  render(<App />);

  // add ice cream scoops and toppings
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.click(cherriesCheckbox);
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  // find and click order button
  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  await user.click(orderSummaryButton);

  // check summary subtotals
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $2.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const termsAndConditionsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  await user.click(termsAndConditionsCheckbox);
  await user.click(confirmButton);

  // check confirmation page text
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  // confirm order number on confirmation page
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // click new order button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /new order/i,
  });
  await user.click(newOrderButton);

  // check that scoops and toppings have been reset
  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = await screen.findByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();
});
