import { User } from 'lucide-react';

export const ChatPreview = () => {
  return (
    <div className='relative px-3 pt-2 pb-5 rounded-md bg-stone-100'>
      <h3 className='text-gray-900 text-lg'>챗봇</h3>

      <div className='flex gap-3 bg-neutral-300 p-5 rounded-t-md'>
        <User />
        <div className='bg-gray-200 rounded-md px-5 py-3 dark:text-gray-900'>
          안녕하세요 채채봇이에요
          <p>무엇을 도와드릴까요?</p>
        </div>
      </div>
      <div className='relative'>
        <div className='w-full rounded-b-md bg-[#E8A6A6] p-5 text-center text-xl dark:text-gray-900'>
          안녕하세요? 배추 포장법 좀 알려주세요 ㅋㅋ
        </div>
        <div
          className='absolute top-10/12 -translate-y-1/2 right-0 translate-x-1/2
                  w-12 h-12 flex items-center justify-center
                  rounded-full bg-neutral-300'
        >
          <User />
        </div>
      </div>
    </div>
  );
};
