import { types } from "mobx-state-tree";

import { MenuStore } from "./MenuStore";

const AppStore = types.model("AppStore", {
  menuStore: types.optional(MenuStore, {}),
});

export default AppStore;
