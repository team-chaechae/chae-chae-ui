import { z } from 'zod';

export const signupSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('유효한 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      '비밀번호는 8 ~ 16자이며, 대소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.',
    ),
  name: z.string().min(1, '이름을 입력해주세요.'),
  employeeId: z
    .string()
    .min(1, '사원번호를 입력해주세요.')
    .regex(
      /^P-\d{8}$/,
      '사원번호는 P-20250001 형식의 10자리 문자열이어야 합니다.',
    ),
  jobTitle: z
    .string()
    .nonempty('직급을 선택해주세요.')
    .refine(
      (val) =>
        [
          'POSITION_STAFF',
          'POSITION_ASSISTANT_MANAGER',
          'POSITION_SENIOR_ASSISTANT_MANAGER',
          'POSITION_MANAGER',
          'POSITION_DEPUTY_GENERAL_MANAGER',
          'POSITION_GENERAL_MANAGER',
        ].includes(val),
      { message: '직급을 선택해주세요.' },
    ),
});
