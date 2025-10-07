export type GetOrderListResponseType = {
  ordersPage: {
    content: OrderDto[];
    page: Page;
  };
};
export type GetOrderListRequestType = {
  id: string;
  name: string;
  category: string;
  status: string;
  createdBy: string;
  startDate: string;
  endDate: string;
  sort: string;
};
export type OrderDto = {
  orderId: number;
  status: 'APPROVED' | 'COMPLETED' | 'CANCELLED';
  productId: number;
  productName: string;
  productCategory: string;
  productPrice: number;
  quantity: number;
  totalCost: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};
type Page = {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
};
export type UpdateOrderQuantityRequestType = {
  id: number;
  quantity: number;
};

export type UpdateOrderStatusRequestType = {
  id: number;
  status: string;
};
