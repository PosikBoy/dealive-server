export interface IAddressRequest {
  address: string;
  floor?: string;
  apartment?: string;
  phone: string;
  phoneName?: string;
  info?: string;
}
export interface IOrderInfoRequest {
  userId?: number;
  phone?: string;
  phoneName?: string;
  parcelType: string;
  weight: string;
  price: number;
}

export interface IOrderRequest {
  info: IOrderInfoRequest;
  addresses: IAddressRequest[];
}

export interface IOrderInfoResponse extends IOrderInfoRequest {
  id: number;
  status: string;
  date: Date;
}

export interface IOrderResponse extends IOrderRequest {
  info: IOrderInfoResponse;
  addresses: IAddressRequest[];
}

export interface IOrderInfoDB {
  id: number;
  user_id?: number;
  date: Date;
  phone?: string;
  phone_name?: string;
  parcel_type: string;
  weight: string;
  status_id: number;
  price: number;
}

export interface IAddressDB {
  id: number;
  order_id: number;
  address: string;
  floor?: string;
  apartment?: string;
  phone: string;
  phone_name?: string;
  info?: string;
}
