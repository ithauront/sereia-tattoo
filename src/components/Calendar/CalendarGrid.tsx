import { Dayjs } from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'

import { buildCalendarWeeks, getWeekDaysPT, isSameDay } from '../../utils/calendar'

type Props = {
  currentMonth: Dayjs
  onChangeMonth: (next: Dayjs) => void

  selectedDate: Dayjs | null
  onSelectDate: (date: Dayjs) => void
}

export function CalendarGrid({ currentMonth, onChangeMonth, selectedDate, onSelectDate }: Props) {
  const monthLabel = currentMonth.format('MMMM')
  const yearLabel = currentMonth.format('YYYY')

  const weekDays = getWeekDaysPT(true)
  const weeks = buildCalendarWeeks(currentMonth)

  function handlePrev() {
    onChangeMonth(currentMonth.subtract(1, 'month'))
  }

  function handleNext() {
    onChangeMonth(currentMonth.add(1, 'month'))
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur-md">
      <div className="mb-4 flex items-center justify-beetween">
        <div className="text-lg font-semibold capitalize text-slate-900">
          {monthLabel} <span className="text-slate-900">{yearLabel}</span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePrev}
            title="Mês anterior"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-900 hover:bg-blue-700"
          >
            <CaretLeft size={18} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            title="Proximo mês"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-900 hover:bg-blue-700"
          >
            <CaretRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((dias) => (
          <div key={dias} className="text-center text-xs font-medium text-slate-900">
            {dias}
          </div>
        ))}

        {weeks.map((semanas) =>
          semanas.days.map((cell) => {
            const isSelected =
              selectedDate && isSameDay(cell.date, selectedDate) && cell.inCurrentMonth

            const base =
              'h-10 w-full rounded-xl text-sm transition focus:outline-none focus:ring-2 focus:ring-white/30'

            const disabled =
              'cursor-not-allowed opacity-40 text-slate-900 border border-transparent'

            const normal = 'border border-white/10 bg-white/5 text-slate-900 hover:bg-blue-700'

            const selected = 'border border-white/20 bg-white/20 text-slate-900'

            return (
              <button
                key={cell.date.toString()}
                type="button"
                disabled={cell.disabled}
                onClick={() => {
                  if (cell.disabled) return
                  onSelectDate(cell.date)
                }}
                className={[
                  base,
                  cell.disabled ? disabled : normal,
                  isSelected ? selected : '',
                  !cell.inCurrentMonth ? 'text-slate-900' : '',
                ].join(' ')}
                aria-label={`Selecionar dia ${cell.date.format('YYYY-MM-DD')}`}
              >
                {cell.date.date()}
              </button>
            )
          }),
        )}
      </div>

      <div className="mt-4 text-xs text-slate-900">
        * Datas passadas e dias fora do mês atual ficam desabilitados.
      </div>
    </div>
  )
}
