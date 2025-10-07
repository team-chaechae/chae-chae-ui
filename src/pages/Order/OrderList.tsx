import { Input } from '@/components/ui/Input';
import { ORDER_STATUS } from '@/constants/status';
import { getOrders } from '@/services/orders';
import type {
  GetOrderListResponseType,
  OrderDto,
} from '@/types/order';
import { formatYMDWithDots } from '@/utils/dateUtils';
import {
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query';
import { OrderSearchForm } from './OrderSearchForm';
import { useState } from 'react';
import { Pagination } from '@/components/ui/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Button } from '@/components/ui/Button';
import { OrderSortDropdown } from './OrderSortDropdown';

type OrderListProps = {
  selected: OrderDto | null;
  onChangeSelected: (selected: OrderDto) => void;
  onEdit: () => void;
  onDelete: () => void;
};
export const OrderList = ({
  selected,
  onChangeSelected,
  onEdit,
  onDelete,
}: OrderListProps) => {
  const [searchForm, setSearchForm] = useState({
    id: '',
    name: '',
    category: '',
    status: '',
    createdBy: '',
    startDate: '',
    endDate: '',
  });
  const [sort, setSort] = useState('CREATED_AT_DESC');
  const { pagination, setPagination } = usePagination();
  const { isLoading, data, error } = useQuery<
    GetOrderListResponseType,
    Error,
    GetOrderListResponseType['ordersPage']
  >({
    queryKey: [
      'orders',
      'list',
      { searchForm, ...pagination, sort },
    ],
    queryFn: () =>
      getOrders({ ...searchForm, ...pagination, sort }),
    select: (res) => res.ordersPage,
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading..</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <section>
      <OrderSearchForm setSearchForm={setSearchForm} />
      <div className='flex items-end justify-between pb-3'>
        <OrderSortDropdown sort={sort} setSort={setSort} />
        <div className='flex flex-col items-end gap-2 pt-10 pb-3'>
          <div className='flex items-center gap-3'>
            <Button
              className='bg-[#181F4A]'
              onClick={onEdit}
            >
              수정
            </Button>
            <Button
              className='border border-blue-100'
              onClick={onDelete}
            >
              삭제
            </Button>
          </div>
          <p className='text-xs text-neutral-400'>
            * 승인 상태인 경우만 수정할 수 있습니다.
          </p>
        </div>
      </div>
      <div className='flex items-center'>
        <table className='w-full'>
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
                className='border-t border-gray-100 dark:border-gray-800 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-colors'
              >
                <td className='px-4 py-3'>
                  <Input
                    type='checkbox'
                    className='w-4 h-4'
                    checked={
                      selected?.orderId === order.orderId
                    }
                    onChange={() => onChangeSelected(order)}
                  />
                </td>
                <td className='px-4 py-3'>
                  {pagination.page * pagination.limit +
                    index +
                    1}
                </td>
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
      <Pagination
        totalPages={data?.page.totalPages ?? 1}
        page={pagination.page}
        onChange={setPagination}
      />
    </section>
  );
};
