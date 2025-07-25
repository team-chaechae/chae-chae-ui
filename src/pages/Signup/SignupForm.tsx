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
import { fetchClient } from '@/services/fetchClient';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const errorMessage =
    methods.formState.errors.root?.message ?? '';

  const onSubmit: SubmitHandler<FormValues> = async (
    data: FormValues,
  ) => {
    const request = {
      internalUser: {
        email: data.email,
        password: data.password,
        realName: data.name,
        employeeCode: data.employeeId,
        position: data.jobTitle,
      },
    };
    try {
      await fetchClient({
        method: 'POST',
        endpoint: '/users/signup',
        data: request,
      });
      navigate('/login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        methods.setError('root', {
          message: error.message,
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-3 w-[320px]'>
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
          {errorMessage && (
            <p className='text-xs text-red-400'>
              {errorMessage}
            </p>
          )}
          <Button className='w-full mt-5' type='submit'>
            회원가입
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
