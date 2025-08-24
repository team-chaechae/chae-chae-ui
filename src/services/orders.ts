import type { GetOrderListResponseType } from '@/types/order';
import { fetchClient } from './fetchClient';

export function getOrders(): Promise<GetOrderListResponseType> {
  return fetchClient('GET', '/orders');
}
