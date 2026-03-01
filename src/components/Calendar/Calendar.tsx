import { useMemo, useState } from 'react'

import dayjs, { Dayjs } from 'dayjs'

import { AppointmentConfirmation } from './AppointmentConfirmation'
import { CalendarGrid } from './CalendarGrid'
import { TimePicker } from './TimePicker'

type Props = {
  initialMonth?: Dayjs
  initialSelectedDate?: Dayjs | null
  initialSelectedHour?: number | null
}

export function Calendar({
  initialMonth,
  initialSelectedDate = null,
  initialSelectedHour = null,
}: Props) {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(() =>
    (initialMonth ?? dayjs()).startOf('month'),
  )

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(initialSelectedDate)
  const [selectedHour, setSelectedHour] = useState<number | null>(initialSelectedHour)

  const isTimePickerOpen = !!selectedDate
  const isConfirmationOpen = !!selectedDate && selectedHour !== null

  const layoutClass = useMemo(() => 'flex flex-col gap-4 md:flex-row md:items-start', [])

  function handleChangeMonth(next: Dayjs) {
    setCurrentMonth(next.startOf('month'))

    setSelectedDate(null)
    setSelectedHour(null)
  }

  function handleSelectDate(date: Dayjs) {
    setSelectedDate(date)
    setSelectedHour(null)
  }

  return (
    <div className={layoutClass}>
      <div className="w-full md:flex-[1]">
        <CalendarGrid
          currentMonth={currentMonth}
          onChangeMonth={handleChangeMonth}
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
        />
      </div>

      <div className="w-full md:flex-[1] space-y-4">
        {!isTimePickerOpen ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-900 shadow-xl backdrop-blur-md">
            Selecione uma data disponível para ver os horários.
          </div>
        ) : (
          <>
            <TimePicker
              selectedDate={selectedDate!}
              selectedHour={selectedHour}
              onSelectHour={setSelectedHour}
            />

            {isConfirmationOpen && (
              <AppointmentConfirmation
                selectedDate={selectedDate!}
                selectedHour={selectedHour!}
                onCancel={() => setSelectedHour(null)}
                onConfirm={(iso) => {
                  console.log('[SCHEDULING]', {
                    date: selectedDate!.format('YYYY-MM-DD'),
                    hour: selectedHour!,
                    iso,
                  })
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
