const fields = [
  'statuses',
  'statuses.created',
  'statuses.booked',
  'statuses.confirmed',
  'statuses.cancelled',
  'check_in',
  'check_out',
  'hotels[]',
  'hotels[].id',
  'hotels[].name',
  'managers[]',
  'managers[].id',
  'managers[].name',
  'status',
  'hotel',
  'manager'
]

const labels = {
  'status': 'Статус',
  'statuses': 'Статус',
  'statuses.created': 'Новый',
  'statuses.booked': 'Забронирован',
  'statuses.confirmed': 'Подтвержден',
  'statuses.cancelled': 'Отменен',
  'check_in': 'Дата заезда/выезда',
  'check_out': 'Дата заезда/выезда',
  'hotel': 'Санаторий',
  'manager': 'Менеджер',
  'hotels': 'Санаторий',
  'managers': 'Менеджер'
}

const placeholders = {
  'status': 'Статус',
  'check_in': 'Дата заезда',
  'check_out': 'Дата выезда',
  'manager': 'Менеджер',
  'hotel': 'Санаторий',
  'managers': 'Начните вводить фамилию или имя',
  'hotels': 'Начниете вводить название санатория',
}

const types = {
  'statuses.created': 'checkbox',
  'statuses.booked': 'checkbox',
  'statuses.confirmed': 'checkbox',
  'statuses.cancelled': 'checkbox',
}

const extra = {
  'status': [
    { value: 'created', label: 'Новый'},
    { value: 'booked', label: 'Забронирован'},
    { value: 'confirmed', label: 'Подтвержден'},
    { value: 'cancelled', label: 'Отменен'}
  ]
}

export default { fields, labels, placeholders, types, extra };

