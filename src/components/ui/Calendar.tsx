import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Calendar as ReactCalendar } from 'react-calendar';

export const Calendar = () => {
  return (
    <ReactCalendar
      calendarType='hebrew'
      formatDay={(_, date) =>
        date.toLocaleString('en', { day: 'numeric' })
      }
      prevLabel={<ChevronLeft className='w-5 h-5' />}
      nextLabel={<ChevronRight className='w-5 h-5' />}
      prev2Label={null}
      next2Label={null}
      showNeighboringMonth={false}
    />
  );
};
