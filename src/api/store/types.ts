export interface IGetTypesRes {
  id: number;
  name: string;
  description: string;
  number: number;
  hidden: boolean;
}

interface ProductContentItemData {
  image: string;
  amount: number | null;
  customFlag: boolean;
}

interface ProductContentData {
  time: number | null;
  alert: string | null;
  label: string;
  itemData: ProductContentItemData[];
}

interface ProductContent {
  data: ProductContentData[];
  rade: number;
  delay: number;
  setHome: number;
  imageModal: string;
  descriptionModal: string;
}

interface Product {
  id: number;
  name_ru: string;
  name_en: string;
  nameID: string;
  description_ru: string | null;
  description_en: string | null;
  image: string;
  type: string;
  productContent: ProductContent;
  serverTypeId: number;
  amount: number;
  isChangeAmount: boolean;
  price: number;
  discount: number;
  saleDiscount: number;
  saleDeadline: string | null;
  maxCountOfSale: string | null;
  hidden: boolean;
  number: number;
  autoactivation: boolean;
  isBackgroundColor: boolean;
  blockSize: number;
  isBackgroundImage: boolean;
  buttonColor: string;
  textButton: string | null;
  textButton_en: string | null;
  iconButton: string | null;
  height: number | null;
  description: string | null;
  name: string;
  basePrice: number;
}
