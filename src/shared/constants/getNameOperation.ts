export const getNameOperation = (
  value: string,
  refund: boolean | undefined,
) => {
  let str = '';
  switch (value) {
    case 'purchase':
      str = refund === true ? 'Возврат' : 'Покупка';
      break;
    case 'transaction':
      str = 'Пополнение счёта';
      break;
    case 'transfers':
      str = 'Перевод средств';
      break;
  }
  return str;
};
