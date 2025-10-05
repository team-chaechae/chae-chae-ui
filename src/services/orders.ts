import type {
  GetOrderListRequestType,
  GetOrderListResponseType,
  UpdateOrderQuantityRequestType,
} from '@/types/order';
import { fetchClient } from './fetchClient';

export function getOrders(
  request: GetOrderListRequestType,
): Promise<GetOrderListResponseType> {
  const {
    id,
    name,
    category,
    status,
    createdBy,
    startDate,
    endDate,
  } = request;
  const params = new URLSearchParams({
    page: String(0),
    size: String(100),
  });

  if (id) params.append('orderId', id);
  if (name) params.append('productName', name);
  if (category) params.append('productCategory', category);
  if (status) params.append('status', status);
  if (createdBy) params.append('createdBy', createdBy);
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);

  return fetchClient('GET', `/orders?${params.toString()}`);
}
export function updateOrderQuantity({
  id,
  quantity,
}: UpdateOrderQuantityRequestType) {
  return fetchClient('PATCH', `/orders/${id}`, {
    quantity,
  });
}
