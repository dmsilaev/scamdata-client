import { types } from "mobx-state-tree";

import { MenuStore } from "./MenuStore";
import CoinsStore from "./CoinsStore";

const AppStore = types.model("AppStore", {
  menuStore: types.optional(MenuStore, {}),
  coinsStore: types.optional(CoinsStore,{})
});

export default AppStore;
