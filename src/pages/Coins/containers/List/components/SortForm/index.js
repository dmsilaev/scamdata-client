import { observable, computed } from "mobx";

import FormState from "Shared/form/FormState";
import fields from "./fields";

class SortState extends FormState {
  sortValues = [
    { id: 1, field: 'created_at', desc: 'Дата создания', text: 'По дате создания', type: 'time' },
    { id: 2, field: 'check_in', desc: 'Дата заезда', text: 'По дате заезда', type: 'time' },
    { id: 3, field: 'check_out', desc: 'Дата выезда', text: 'По дате выезда', type: 'time' },
    { id: 4, field: 'price', desc: 'Стоимость', text: 'По стоимости', type: 'price' },
  ]

  sortTypes = {
    time: [
      { id: 1, type: 'time', value: 1, desc: 'Сначала ранние'},
      { id: 2, type: 'time', value: -1, desc: 'Сначала поздние'}
    ],

    price: [
      { id: 1, type: 'price', value: 1, desc: 'Сначала дешевле'},
      { id: 2, type: 'price', value: -1, desc: 'Сначала дороже'}
    ]
  }

  getDirections(sortField) {
    const value = this.sortValues
      .find(value => value.field == sortField);

    return this.sortTypes[value.type];
  }

  getSortByText(sortField) {
    const value = this.sortValues
      .find(value => value.field == sortField);

    return value ? value.text : 'Сортировать по';
  }
};

const form = new SortState(fields);

export default form;
