export interface Gift {
  id: number;
  lvl: number;
  iconUrl: string;
  name: string;
  nameID: string;
  type: string;
  available?: boolean;
}

export interface User {
  id: number;
  role: string; // Можешь добавить другие роли, если они есть
  steamId: string;
  avatar: string;
  balance: number;
  name: string;
  lvl: number;
}

export interface UserGift {
  id: number;
  name: string;
  iconUrl: string;
  giftId: number;
  lvl: number;
  available?: boolean;
}

export interface IGetInventoryResponse {
  pages: number;
  result: getInventoryDataItem[];
}

export interface getInventoryDataItem {
  id: number;
  amount: number;
  status: string;
  dateOfReceive: null;
  historyOfPurchaseId: number;
  userId: number;
  serverTypeId: number;
  serverId: number;
  serverName: string;
  productId: number;
  createdAt: string;
  isCanBeRefund: boolean;
  isPartOfPack: null | any;
  packId: null | any;
  product: Product;
  serverType: ServerType;
  description: null;
  name: string;
}

const productMock = {
  id: 123,
  name_ru: '123',
  name_en: '123',
  nameID: '123',
  description_ru: '123',
  description_en: '123',
  image: 'https://content.magicrust.ru/images/rust/items/128/wood.png',
  type: '123',
  productContent: {
    data: [
      {
        time: 123123,
        alert: 'qwe',
        label: 'qwe',
        itemData: [],
      },
    ],
    rade: 12,
    delay: 12,
    setHome: 12,
    imageModal: '123',
    descriptionModal: '12',
  },
  serverTypeId: 12,
  amount: 12,
  isChangeAmount: false,
  price: 12,
  discount: 12,
  saleDiscount: 12,
  saleDeadline: 'qwe',
  maxCountOfSale: 'qwe',
  hidden: false,
  number: 123,
  autoactivation: true,
  isBackgroundColor: false,
  blockSize: 12,
  isBackgroundImage: true,
  buttonColor: 'qwe',
  textButton: '',
  textButton_en: '',
  iconButton: '',
  height: 123,
  description: '123',
  name: 'qwe',
  basePrice: 123,
};
export const getInventoryDataItemMock: getInventoryDataItem = {
  id: 10,
  amount: 10,
  status: 'Статус',
  dateOfReceive: null,
  historyOfPurchaseId: 23123123,
  userId: 12344,
  serverTypeId: 123,
  serverId: 1,
  serverName: 'MR 4 [ MAX 3 | BARREN ]',
  productId: 100,
  createdAt: new Date().toTimeString(),
  isCanBeRefund: false,
  isPartOfPack: null,
  packId: null,
  product: productMock,
  serverType: {
    description: 'qwe',
    hidden: false,
    id: 123,
    name: 'qwe',
    number: 1233,
  },
  description: null,
  name: 'qweqwe',
};

interface ServerType {
  description: string;
  hidden: false;
  id: number;
  name: string;
  number: number;
}

export interface IGetDetailsData {
  result: getDetailsDataItem[];
  pages: number;
}

export interface getDetailsDataItem {
  id: number;
  userId: number;
  method?: string;
  amount: number;
  createdAt: string;
  status?: boolean;
  name: string;
  lostMainBalance?: number;
  lostBonusBalance?: number;
  refund?: boolean;
  productId?: number;
  dateOfPurchase?: string;
  product?: Product;
  type: string;
}

const detailItemMock = {
  id: 123,
  userId: 123,
  amount: 100,
  createdAt: new Date().toTimeString(),
  status: true,
  name: 'qwe',
  type: 'qwe',
};

export const getDetailsMock = {
  pages: 1000,
  result: [detailItemMock, detailItemMock, detailItemMock, detailItemMock],
};
