import { Calendar } from '../../components/Calendar/Calendar'
import { Header } from '../../components/composed/Header/Header'

export function Schedule() {
  return (
    <>
      <Header />
      <h1 className="text-center text-slate-900 text-2xl p-4 font-bold">AGENDE CONOSCO</h1>
      <Calendar />
    </>
  )
}
