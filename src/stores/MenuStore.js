import { types } from "mobx-state-tree";

export const MenuStore = types.model("MenuStore", {
  openned: types.optional(types.boolean, false)
}).actions(self => ({
  open() {
    self.openned = true;
    return self.openned;
  },

  close() {
    self.openned = false;
    return self.openned;
  },

  toggle() {
    self.openned = !self.openned;
    return self.openned;
  },
}));
