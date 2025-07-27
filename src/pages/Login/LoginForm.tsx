import { FormInput } from '@/components/FormField/FormInput';
import { Button } from '@/components/ui/Button';
import { fetchClient } from '@/services/fetchClient';
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from 'lucide-react';
import { useState } from 'react';
import {
  FormProvider,
  useForm,
  type SubmitHandler,
} from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};
export const LoginForm = () => {
  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [isShowPassword, setIsShowPassword] =
    useState(false);
  const errorMessage =
    methods.formState.errors.root?.message ?? '';
  const EyeIcon = isShowPassword ? Eye : EyeOff;
  const onSubmit: SubmitHandler<FormValues> = async (
    data: FormValues,
  ) => {
    const request = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    try {
      await fetchClient({
        method: 'POST',
        endpoint: '/users/login',
        data: request,
      });
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
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className='border px-10 py-8 rounded-md'
      >
        <div className='flex flex-col gap-5 w-[320px]'>
          <FormInput
            name='email'
            type='email'
            placeholder='이메일'
            classNameInput='pl-10'
            showErrorMessage
            rules={{ required: '이메일을 입력해주세요.' }}
            icon={
              <Mail className='absolute left-2 top-2' />
            }
          />
          <FormInput
            name='password'
            type={isShowPassword ? 'text' : 'password'}
            placeholder='비밀번호'
            classNameInput='pl-10 pr-10'
            showErrorMessage
            rules={{ required: '비밀번호를 입력해주세요.' }}
            icon={
              <>
                <LockKeyhole className='absolute left-2 top-1/2 -translate-y-1/2' />
                <EyeIcon
                  className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'
                  onClick={() =>
                    setIsShowPassword(!isShowPassword)
                  }
                />
              </>
            }
          />
          {errorMessage && (
            <p className='text-xs text-red-400'>
              {errorMessage}
            </p>
          )}
          <Button className='w-full mt-5' type='submit'>
            로그인
          </Button>
        </div>
        <div className='flex justify-center gap-2 text-xs pt-4'>
          <p>아이디 찾기</p>
          <p> | </p>
          <p>비밀번호 찾기</p>
        </div>
      </form>
    </FormProvider>
  );
};
