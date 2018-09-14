import _some from "lodash/some";

export const coinsFilter = (order, chars) => {
  if (!chars) return true;

  chars = chars.replace(/ /g, '')
  chars = chars.toLocaleLowerCase()

  const re = new RegExp(chars, 'gi')
  const ord = re.test(order.symbol);



  return ord
}
