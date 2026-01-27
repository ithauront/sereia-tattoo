import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button/Button'
import { AnimatedSection } from '../../components/composed/AnimatedSection/AnimatedSection'
import { Footer } from '../../components/composed/Footer/Footer'
import { Header } from '../../components/composed/Header/Header'
import {
  SlidingBanner,
  type ActionButtonProp,
} from '../../components/composed/SlidingBanner/SlidingBanner'
import { HEADER_SCROLL_THRESHOLD_PX } from '../../utils/magicNumbers'

export function Home() {
  const navigate = useNavigate()
  const actionButton: ActionButtonProp = {
    title: 'Agendar',
    onClick: () => navigate('/schedule'),
  }

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > HEADER_SCROLL_THRESHOLD_PX)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex flex-col ">
      <Header />
      <div className="relative">
        <img
          src="/placeholder.png"
          alt="placeholder"
          className={`w-full object-cover header-image ${scrolled ? 'scrolled' : ''}`}
        />
        <SlidingBanner message="Promoção de fim de ano!" actionButton={actionButton} />
      </div>
      <div className="flex flex-col relative overflow-hidden">
        <img
          src="/SereiaMirror.svg"
          alt=""
          aria-hidden="true"
          className="
          hidden lg:block
          absolute inset-0
          w-full h-full
          object-contain object-left
          scale-90
          opacity-40
          lg:-translate-x-10
          "
        />

        <img
          src="/Sereia.svg"
          alt=""
          aria-hidden="true"
          className="
          absolute inset-0
          w-full h-full
          object-contain object-right
          scale-90
          opacity-40
          lg:translate-x-10
          "
        />
        <div className="flex flex-col gap-10">
          <AnimatedSection
            slideFrom="left"
            image="/foto_1.jpg"
            imageAlt="foto_tattoo"
            text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, eum sapiente.
              Quibusdam, nihil quam provident cum sint accusamus labore dolor qui reiciendis numquam
              vitae alias, eum praesentium odit dolores nemo? Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Commodi, eum sapiente. Quibusdam, nihil quam provident
              cum sint accusamus labore dolor qui reiciendis numquam vitae alias, eum praesentium
              odit dolores nemo? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi,
              eum sapiente. Quibusdam, nihil quam provident cum sint accusamus labore dolor qui
              reiciendis numquam vitae alias, eum praesentium odit dolores nemo?"
          />
          <AnimatedSection
            slideFrom="right"
            image="/foto_2.png"
            imageAlt="foto_homem"
            text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, eum sapiente.
              Quibusdam, nihil quam provident cum sint accusamus labore dolor qui reiciendis numquam
              vitae alias, eum praesentium odit dolores nemo? Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Commodi, eum sapiente. Quibusdam, nihil quam provident
              cum sint accusamus labore dolor qui reiciendis numquam vitae alias, eum praesentium
              odit dolores nemo? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi,
              eum sapiente. Quibusdam, nihil quam provident cum sint accusamus labore dolor qui
              reiciendis numquam vitae alias, eum praesentium odit dolores nemo?"
          />
        </div>
        <div className="flex flex-col items-center px-4 py-10">
          <div
            className="
            relative w-full max-w-md
            rounded-2xl p-8
            bg-white
            shadow-2xl shadow-black/30
            flex flex-col items-center gap-6
            "
          >
            <p className="text-lg font-semibold text-slate-900">Fale Conosco Sobre:</p>

            <div className="flex gap-4">
              <Button
                size="md"
                className="bg-slate-900 text-white hover:bg-blue-700"
                onClick={() => window.open('https://wa.me/5571987274015', '_blank')}
              >
                Tattoo
              </Button>

              <Button
                size="md"
                className="bg-slate-900 text-white hover:bg-blue-700"
                onClick={() => window.open('https://wa.me/5571987274015', '_blank')}
              >
                Piercing
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
