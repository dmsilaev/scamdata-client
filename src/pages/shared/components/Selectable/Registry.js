import { observable, computed } from "mobx";
import _first from "lodash/first";
import _last from "lodash/last";

export default class Registry {
  @observable items = new Map();
  @observable selected = new Map();
  @observable isSelecting = false;

  register(key, domNode) {
    this.items.set(key, {key, domNode})
  }

  unregister(key) {
    this.items.delete(key)
  }

  selectItems(values) {
    this.selected.replace(values)
  }

  clear() {
    this.items.clear();
    this.selected.clear();
  }

  isSelected(key) {
    return this.selected.has(key)
  }

  startSelecting() {
    this.isSelecting = true;
  }

  stopSelecting() {
    this.isSelecting = false;
  }

  @computed get firstSelected() {
    if (this.hasSelected) {
      const key = _first(this.selected.keys());
      return this.items.get(key)
    }
  }

  @computed get lastSelected() {
    if (this.hasSelected) {
      const key = _last(this.selected.keys());
      return this.items.get(key)
    }
  }

  @computed get hasSelected() {
    return !this.isSelecting && this.selected.size > 0
  }
}
