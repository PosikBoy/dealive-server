export interface IOrderData {
  phone: string;
  phoneName: string;
  parcelType: string;
  weight: string;
  status: string;
  info: string;
  price: number;
  addresses: IAddress[];
}

export interface IAddress {
  address?: string;
  floor?: string;
  apartment?: string;
  phone?: string;
  phoneName?: string;
  info?: string;
}

export interface IOrderDataDB {
  id: number;
  client_id: number;
  date: Date;
  phone: string;
  phone_name: string;
  parcel_type: string;
  weight: string;
  status: string;
  info: string;
  price: number;
}
export interface IAddressDB {
  id: number;
  order_id: number;
  address?: string;
  floor?: string;
  house_number?: string;
  apartment?: string;
  phone?: string;
  phone_name?: string;
  info?: string;
}

export interface IOrderDataClient {
  clientId?: number;
  phone?: string;
  phoneName?: string;
  parcelType: string;
  weight: string;
  info?: string;
  price: number;
}
