import type {
  GetOrderListRequestType,
  GetOrderListResponseType,
  UpdateOrderQuantityRequestType,
  UpdateOrderStatusRequestType,
} from '@/types/order';
import { fetchClient } from './fetchClient';
import type { PaginationType } from '@/types/pagination';
import { formatYMDWithDash } from '@/utils/dateUtils';

export function getOrders(
  request: GetOrderListRequestType & PaginationType,
): Promise<GetOrderListResponseType> {
  const {
    id,
    name,
    category,
    status,
    createdBy,
    startDate,
    endDate,
    sort,
  } = request;
  const params = new URLSearchParams({
    page: String(request.page),
    size: String(request.limit),
  });

  if (id) params.append('orderId', id);
  if (name) params.append('productName', name);
  if (category) params.append('productCategory', category);
  if (status) params.append('status', status);
  if (createdBy) params.append('createdBy', createdBy);
  if (startDate)
    params.append(
      'startDate',
      formatYMDWithDash(startDate),
    );
  if (endDate)
    params.append('endDate', formatYMDWithDash(endDate));
  if (sort) params.append('sort', sort);

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
export function updateOrderStatus({
  id,
  status,
}: UpdateOrderStatusRequestType) {
  return fetchClient('PATCH', `/orders/${id}/status`, {
    status,
  });
}
