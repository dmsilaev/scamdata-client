import FormState from "Shared/form/FormState";
import fields from "./fields";

class FilterState extends FormState {
  clearAll() {
    const nested_keys = ['manager', 'hotel']
    nested_keys.forEach(key => this.clearNestedItems(key));

    this.clear();
  }

  clearNestedItems(key) {
    const items = this.$(key);

    Object.keys(items.get()).forEach((item) => {
      items.del(item);
    })
  }
};

const form = new FilterState(fields);

export default form;
