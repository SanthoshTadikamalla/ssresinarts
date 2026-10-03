const PINCODE_DELIVERY_COSTS = new Map([
  ['534275', 20],
  ['534276', 30],
  ['534277', 40],
  ['534278', 25],
]);

export const getDeliveryCost = (pincode) => PINCODE_DELIVERY_COSTS.get(pincode);
