import { Dayjs } from 'dayjs'
import { CalendarBlank, Clock } from 'phosphor-react'

type Props = {
  selectedDate: Dayjs
  selectedHour: number
  onCancel: () => void
  onConfirm: (isoDateTime: string) => void
}

export function AppointmentConfirmation({
  selectedDate,
  selectedHour,
  onCancel,
  onConfirm,
}: Props) {
  const dateTime = selectedDate.hour(selectedHour).minute(0).second(0).millisecond(0)
  const describedDate = dateTime.format('DD [de] MMMM [de] YYYY')
  const describedTime = dateTime.format('HH:mm')

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/30 backdrop-blur-md">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-slate-900">
          <CalendarBlank size={18} />
          <span className="text-sm">{describedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-900">
          <Clock size={18} />
          <span className="text-sm">{describedTime}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="h-10 rounded-xl border border-blue/10 bg-slate-900 px-4 text-sm text-white hover:bg-blue-700"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={() => onConfirm(dateTime.toISOString())}
          className="h-10 rounded-xl border border-blue/20 bg-slate-900 px-4 text-sm font-medium text-white hover:bg-blue-700"
        >
          Confirmar
        </button>
      </div>

      <div className="mt-3 text-xs text-slate-900">
        * Confirmação apenas visual: o botão só faz log da seleção.
      </div>
    </div>
  )
}
