import { Footer } from '../../components/composed/Footer/Footer'
import { Header } from '../../components/composed/Header/Header'
import {
  SlidingBanner,
  type ActionButtonProp,
} from '../../components/composed/SlidingBanner/SlidingBanner'
import { Loading } from '../../components/Loading/Loading'

export function Home() {
  const actionButton: ActionButtonProp = {
    title: 'Agendar',
    onClick: () => console.log('clicou'),
  }
  return (
    <div className="flex flex-col ">
      <Header />
      <div className="relative">
        <img src="/placeholder.jpg" alt="placeholder" />
        <SlidingBanner message="Promoção de fim de ano!" actionButton={actionButton} />
      </div>
      <h1 className="text-2xl font-bold">HOME</h1>
      <Loading size="md" />
      <Footer />
    </div>
  )
}
