import { Header } from '../../components/composed/Header/Header'
import { Loading } from '../../components/Loading/Loading'

export function Home() {
  return (
    <div className="flex flex-col gap-30">
      <Header />
      <h1 className="text-2xl font-bold">HOME</h1>
      <Loading size="md" />
    </div>
  )
}
