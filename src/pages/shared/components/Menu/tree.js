import MenuLeaf from "./MenuLeaf";
import MenuNode from "./MenuNode";

export const tree = [
  {
    id: 1,
    name: "Exchanges",
    path: "/exchanges",
    customComponent: MenuNode,
    children: []
  },
  {
    id: 2,
    name: "Coins",
    path: "/coins",
    customComponent: MenuNode,
    children: []
  },
  {
    id: 3,
    name: "Arbitrage",
    path: "/arbitrage",
    customComponent: MenuNode,
    children: []
  },
  {
    id: 4,
    name: "Bots",
    path: "/bots",
    customComponent: MenuNode,
    children: []
  },
  {
    id: 5,
    name: "Feed",
    path: "/feed",
    customComponent: MenuNode,
    children: []
  }
];
