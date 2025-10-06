import { FormDatePicker } from '@/components/FormField/FormDatePicker';
import { FormInput } from '@/components/FormField/FormInput';
import { FormSelect } from '@/components/FormField/FormSelect';
import { Button } from '@/components/ui/Button';
import type { GetOrderListRequestType } from '@/types/order';
import {
  FormProvider,
  useForm,
  type SubmitHandler,
} from 'react-hook-form';

type FormValues = GetOrderListRequestType;
type OrderSearchFormProps = {
  setSearchForm: (searchForm: FormValues) => void;
};
export const OrderSearchForm = ({
  setSearchForm,
}: OrderSearchFormProps) => {
  const methods = useForm<GetOrderListRequestType>({
    mode: 'onChange',
    defaultValues: {
      id: '',
      name: '',
      category: '',
      status: '',
      createdBy: '',
      startDate: '',
      endDate: '',
    },
  });
  const onSubmit: SubmitHandler<FormValues> = (
    data: FormValues,
  ) => {
    setSearchForm(data);
  };
  return (
    <FormProvider {...methods}>
      <form
        className='grid grid-cols-1 gap-2 border rounded-md px-4 py-5'
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-5 gap-3'>
          <FormInput
            type='text'
            name='orderId'
            placeholder='발주 Id'
          />
          <FormInput
            type='text'
            name='name'
            placeholder='상품명'
          />
          <FormInput
            type='text'
            name='category'
            placeholder='카테고리'
          />
          <FormSelect
            name='status'
            placeholder='상태'
            items={[
              { label: '전체', value: 'ALL' },
              { label: '승인', value: 'APPROVED' },
              { label: '완료', value: 'COMPLETED' },
              {
                label: '취소',
                value: 'CANCELLED',
              },
            ]}
          />
          <FormInput
            type='text'
            name='createdBy'
            placeholder='발주자'
          />
        </div>
        <div className='grid grid-cols-3 gap-3'>
          <FormDatePicker
            name='startDate'
            placeholder='시작일'
          />
          <FormDatePicker
            name='endDate'
            placeholder='종료일'
          />
          <div className='flex items-center justify-end gap-2'>
            <Button
              variant='outline'
              onClick={() => methods.reset()}
            >
              초기화
            </Button>
            <Button type='submit'>검색</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
