import { Input } from '@/components/ui/Input';
import { ORDER_STATUS } from '@/constants/status';
import { getOrders } from '@/services/orders';
import type { GetOrderListResponseType } from '@/types/order';
import { formatYMDWithDots } from '@/utils/dateUtils';
import { useQuery } from '@tanstack/react-query';

export const OrderList = () => {
  const { isLoading, data, error } = useQuery<
    GetOrderListResponseType,
    Error,
    GetOrderListResponseType['ordersPage']
  >({
    queryKey: ['orders', 'list'],
    queryFn: getOrders,
    select: (res) => res.ordersPage,
  });

  if (isLoading) return <p>Loading..</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className='flex items-center justify-center pt-10'>
      <table>
        <thead className='bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300'>
          <tr className='text-left'>
            <th
              scope='col'
              className='px-4 py-3 font-medium'
            ></th>
            <th
              scope='col'
              className='px-4 py-3 font-medium'
            >
              순번
            </th>
            <th
              scope='col'
              className='px-4 py-3 font-medium'
            >
              상태
            </th>
            <th
              scope='col'
              className='px-4 py-3 font-medium'
            >
              카테고리
            </th>
            <th
              scope='col'
              className='px-4 py-3 font-medium'
            >
              상품 이름
            </th>
            <th
              scope='col'
              className='px-4 py-3 font-medium text-right'
            >
              가격(원)
            </th>
            <th
              scope='col'
              className='px-4 py-3 font-medium text-right'
            >
              개수
            </th>
            <th
              scope='col'
              className='px-4 py-3 font-medium text-right'
            >
              합계
            </th>
            <th
              scope='col'
              className='px-4 py-3 font-medium'
            >
              갱신일자
            </th>
            <th
              scope='col'
              className='px-4 py-3 font-medium'
            >
              발주자
            </th>
          </tr>
        </thead>
        <tbody className='text-gray-900 dark:text-gray-100'>
          {data?.content.map((order, index) => (
            <tr
              key={order.orderId}
              className='odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-950 border-t border-gray-100 dark:border-gray-800 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-colors'
            >
              <td className='px-4 py-3'>
                <Input
                  type='checkbox'
                  className='w-4 h-4'
                />
              </td>
              <td className='px-4 py-3'>{index + 1}</td>
              <td className='px-4 py-3'>
                {ORDER_STATUS[order.status]}
              </td>
              <td className='px-4 py-3'>
                {order.productCategory}
              </td>
              <td className='px-4 py-3'>
                {order.productName}
              </td>
              <td className='px-4 py-3 text-right tabular-nums'>
                {order.productPrice.toLocaleString()}
              </td>
              <td className='px-4 py-3 text-right tabular-nums'>
                {order.quantity}
              </td>
              <td className='px-4 py-3 text-right tabular-nums font-medium'>
                {order.totalCost.toLocaleString()}
              </td>
              <td className='px-4 py-3'>
                {formatYMDWithDots(order.updatedAt)}
              </td>
              <td className='px-4 py-3'>
                {order.createdBy}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
