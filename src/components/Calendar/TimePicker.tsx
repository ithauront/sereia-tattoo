import { Dayjs } from 'dayjs'

type Props = {
  selectedDate: Dayjs
  selectedHour: number | null
  onSelectHour: (hour: number) => void
}

const HOURS = Array.from({
  length: 10,
}).map((_, i) => i + 9)

const MOCK_DISABLED = new Set([12, 15])

export function TimePicker({ selectedDate, selectedHour, onSelectHour }: Props) {
  const weekDay = selectedDate.format('dddd')
  const described = selectedDate.format('DD [de] MMMM')

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-md">
      <div className="mb-4">
        <div className="text-sm font-medium capitalize text-slate-900">{weekDay}</div>
        <div className="text-lg font-semibold text-slate-900">{described}</div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {HOURS.map((h) => {
          const disabled = MOCK_DISABLED.has(h)
          const isSelected = selectedHour === h

          return (
            <button
              key={h}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (disabled) return
                onSelectHour(h)
              }}
              className={[
                'h-10 rounded-xl border text-sm transition focus:outline-none focus:ring-2 focus:ring-blue/30',
                disabled
                  ? 'cursor-not-allowed border-transparent bg-white/5 text-slate-900 opacity-50'
                  : 'border-white/10 bg-white/5 text-slate-900 hover:bg-blue/10',
                isSelected ? 'border-blue/20 bg-blue/20' : '',
              ].join(' ')}
              aria-label={`Selecionar horário ${String(h).padStart(2, '0')}:00`}
            >
              {String(h).padStart(2, '0')}:00
            </button>
          )
        })}
      </div>
      <div className="mt-4 text-xs text-slate-900">
        * Horários desabilitados acima são apenas mock visual (sem lógica de disponibilidade).
      </div>
    </div>
  )
}
