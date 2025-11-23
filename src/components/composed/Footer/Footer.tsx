import { FacebookLogoIcon, InstagramLogoIcon, WhatsappLogoIcon } from '@phosphor-icons/react'
import clsx from 'clsx'

export function Footer() {
  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const logoSrc = '/Logo_Sereia.png'
  const brandName = 'Sereia Tattoo'
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-auto bg-slate-900 text-slate-100"
      aria-label="Footer"
      data-testid="footer"
    >
      <div className="mx-auto flex max-w-screen-xl px-4 pt-8 pb-4 md:flex-row md:items-center md:justify-between">
        <div className="flex justify-center md:justify-start w-35">
          <button
            type="button"
            onClick={handleLogoClick}
            aria-label="Ir para o topo da página"
            data-testid="footer-logo"
            className="flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 hover:cursor-pointer"
          >
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="Logo da Sereia Tattoo"
                className="h-8 w-auto object-contain sm:h-9 md:h-10"
                loading="eager"
                decoding="async"
              />
            ) : null}
          </button>
        </div>

        <div
          className="hidden flex-col items-center text-center gap-1 sm:flex"
          data-testid="center-div"
        >
          <span className="text-sm font-bold md:text-base">{brandName}</span>
          <a
            className="md:text-xs hover:text-sky-400"
            href="https://www.google.com/maps?q=Sereia+Tattoo+Studio+Ondina+Salvador"
            target="_blank"
            rel="noopener noreferrer"
          >
            Av. Milton Santos, 58 - Ondina, Salvador - BA, 41950-810, Brasil
          </a>
          <span className="text-[0.7rem] text-slate-400 md:text-xs">
            © {year}. Todos os direitos reservados.
          </span>
        </div>

        <div className="flex flex-col items-center gap-3 md:items-end w-35">
          <nav aria-label="Redes sociais" className="flex items-center justify-center gap-4">
            <a
              href="https://www.instagram.com/sereia_tattoostudio/"
              target="_blank"
              rel="noreferrer"
              className={clsx(
                'inline-flex items-center justify-center rounded-full',
                'text-slate-200 hover:text-sky-400',
                'transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
              )}
            >
              <InstagramLogoIcon size={32} weight="fill" aria-hidden="true" />
              <span className="sr-only">Instagram</span>
            </a>

            <a
              href="https://www.facebook.com/sereiatattoostudio/?locale=pt_BR"
              target="_blank"
              rel="noreferrer"
              className={clsx(
                'inline-flex items-center justify-center rounded-full',
                'text-slate-200 hover:text-sky-400',
                'transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
              )}
            >
              <FacebookLogoIcon size={32} weight="fill" aria-hidden="true" />
              <span className="sr-only">Facebook</span>
            </a>

            <a
              href="https://wa.me/5571987274015"
              target="_blank"
              rel="noreferrer"
              className={clsx(
                'inline-flex items-center justify-center rounded-full',
                'text-slate-200 hover:text-sky-400',
                'transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
              )}
            >
              <WhatsappLogoIcon size={32} weight="fill" aria-hidden="true" />
              <span className="sr-only">WhatsApp</span>
            </a>
          </nav>
        </div>
      </div>
      <span className=" block w-full text-[0.7rem] text-slate-400 md:text-xs sm:hidden text-center">
        © {year}. Todos os direitos reservados.
      </span>
    </footer>
  )
}
