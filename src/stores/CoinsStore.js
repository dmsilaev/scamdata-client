import { types, applySnapshot } from "mobx-state-tree";
import instance from "Connection/instance";
import _defaultsDeep from "lodash/defaultsDeep";

const CoinsStore = types.model("CoinsStore", {
  coins: types.optional(types.array(types.frozen), []),
  state: types.maybe(types.enumeration(["pending", "done", "error"]))
}).views(self => ({
  get isFetched() {
    return self.state == "done";
  }
})).actions(self => ({
  fetch(params = {}) {
    self.setState("pending");

    return instance.get("/api/coins", { params: params })
      .then((response) => self.updateStore(response))
      .then(() => self.setState("done"))
      .catch(error => console.log(error));
  },

  clear() {
    const data = { coins: [] };
    applySnapshot(self, data);
  },

  setState(state) {
    self.state = state;
  },

  updateStore(response) {
    const { status, data } = response;

    if (status == 200) {
      // applyPatch
      applySnapshot(self, data);
      return self;
    }
  },

  updateOne(order) {
    const values = order.toJSON();

    const coins = self.coins
      .map(item => {
        return item.id == order.id
          ? _defaultsDeep({}, values, item)
          : item
      })

    self.coins = coins;
  },

  removeOne(order) {
    const coins = self.coins
      .filter(item => item.id !== order.id)

    self.coins = coins;
  }
}));

export default CoinsStore;
