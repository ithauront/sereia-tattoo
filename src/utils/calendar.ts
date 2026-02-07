import dayjs, { Dayjs } from 'dayjs'

export type CalendarDayCell = {
  date: Dayjs
  inCurrentMonth: boolean
  disabled: boolean
}

export type CalendarWeek = {
  weekIndex: number
  days: CalendarDayCell[]
}

export function getWeekDaysPT(short = true) {
  return short
    ? ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
    : ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
}

export function buildCalendarWeeks(currentMonth: Dayjs): CalendarWeek[] {
  const firstDayOfMonth = currentMonth.startOf('month')
  const lastDayOfMonth = currentMonth.endOf('month')

  const toMondayIndex = (dia: number) => (dia === 0 ? 6 : dia - 1)

  const startWeekDayIndex = toMondayIndex(firstDayOfMonth.day())
  const endWeekDayIndex = toMondayIndex(lastDayOfMonth.day())

  const prevFill = Array.from({
    length: startWeekDayIndex,
  }).map((_, i) => firstDayOfMonth.subtract(startWeekDayIndex - i, 'day'))

  const daysInMonth = Array.from({
    length: currentMonth.daysInMonth(),
  }).map((_, i) => firstDayOfMonth.add(i, 'day'))

  const nextFill = Array.from({
    length: 6 - endWeekDayIndex,
  }).map((_, i) => lastDayOfMonth.add(i + 1, 'day'))

  const today = dayjs().startOf('day')

  const allDays: CalendarDayCell[] = [
    ...prevFill.map((date) => ({
      date,
      inCurrentMonth: false,
      disabled: true,
    })),
    ...daysInMonth.map((date) => ({
      date,
      inCurrentMont: true,
      disabled: date.endOf('day').isBefore(today),
    })),
    ...nextFill.map((date) => ({
      date,
      inCurrentMonth: false,
      disabled: true,
    })),
  ]

  const weeks: CalendarWeek[] = []
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push({
      weekIndex: i / 7,
      days: allDays.slice(i, i + 7),
    })
  }

  return weeks
}

export function isSameDay(a: Dayjs, b: Dayjs) {
  return a.isSame(b, 'day')
}
