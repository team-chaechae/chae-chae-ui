import { FormInput } from '@/components/FormField/FormInput';
import {
  FormProvider,
  useForm,
  type SubmitHandler,
} from 'react-hook-form';
import {
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from 'lucide-react';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/schemas/signupSchema';
import { FormSelect } from '@/components/FormField/FormSelect';
import { jobTitleOptions } from '@/constants/selectOptions';

type FormValues = z.infer<typeof signupSchema>;
export const SignUpForm = () => {
  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      employeeId: '',
      name: '',
      jobTitle: '',
    },
    resolver: zodResolver(signupSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = (
    data: FormValues,
  ) => {
    console.log('data', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-5 w-[320px]'>
          <FormInput
            name='email'
            type='email'
            placeholder='이메일'
            classNameInput='pl-10'
            showErrorMessage
            icon={
              <Mail className='absolute left-2 top-2' />
            }
          />
          <FormInput
            name='password'
            type='password'
            placeholder='비밀번호'
            classNameInput='pl-10 pr-10'
            showErrorMessage
            icon={
              <>
                <LockKeyhole className='absolute left-2 top-1/2 -translate-y-1/2' />
                <EyeOff className='absolute right-3 top-1/2 -translate-y-1/2' />
              </>
            }
          />
          <FormInput
            name='employeeId'
            type='text'
            placeholder='사원번호'
            classNameInput='pl-10'
            showErrorMessage
            icon={
              <User className='absolute left-2 top-2' />
            }
          />
          <FormInput
            name='name'
            type='text'
            placeholder='이름'
            classNameInput='pl-10'
            showErrorMessage
            icon={
              <User className='absolute left-2 top-2' />
            }
          />
          <FormSelect
            name='jobTitle'
            placeholder='직급'
            icon={
              <User className='absolute left-2 top-2' />
            }
            items={jobTitleOptions}
            showErrorMessage
          />
          <Button className='w-full mt-5' type='submit'>
            회원가입
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
