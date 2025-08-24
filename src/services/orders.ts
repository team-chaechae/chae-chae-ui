import type {
  GetOrderListResponseType,
  UpdateOrderQuantityRequestType,
} from '@/types/order';
import { fetchClient } from './fetchClient';

export function getOrders(): Promise<GetOrderListResponseType> {
  return fetchClient('GET', '/orders');
}
export function updateOrderQuantity({
  id,
  quantity,
}: UpdateOrderQuantityRequestType) {
  return fetchClient('PATCH', `/orders/${id}`, {
    quantity,
  });
}
