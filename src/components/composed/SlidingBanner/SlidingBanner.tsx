import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import { mobileWidthBreackpointPx, oneSec } from '../../../utils/magicNumbers'

export type ActionButtonProp = {
  title: string
  onClick: () => void
}

export type SlidingBannerPosition = 'left' | 'right' | 'top' | 'bottom'

export type SlidingBannerProps = {
  message: string
  actionButton?: ActionButtonProp
  delay?: number
  position?: SlidingBannerPosition
  className?: string
}

const isWindowAvailable = typeof window !== 'undefined'

function useIsMobile(breakpointPx = mobileWidthBreackpointPx) {
  const [isMobile, setIsMobile] = useState(() => {
    if (!isWindowAvailable || typeof window.matchMedia !== 'function') return false
    return window.matchMedia(`(max-width: ${breakpointPx}px)`).matches
  })

  useEffect(() => {
    if (!isWindowAvailable || typeof window.matchMedia !== 'function') return

    const mq = window.matchMedia(`(max-width: ${breakpointPx}px)`)

    const handler = (eventHandler: MediaQueryListEvent) => {
      setIsMobile(eventHandler.matches)
    }

    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpointPx])

  return isMobile
}
const defaultDelayInSec = 3
export function SlidingBanner({
  message,
  actionButton,
  delay = defaultDelayInSec,
  position = 'left',
  className,
}: SlidingBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useIsMobile()
  const actionButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const delayMs = Math.max(0, delay * oneSec)
    const timer = window.setTimeout(() => {
      setIsVisible(true)
    }, delayMs)

    return () => window.clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (isVisible && actionButton && !isMobile && actionButtonRef.current) {
      actionButtonRef.current.focus()
    }
  }, [isVisible, actionButton, isMobile])

  const isVerticalPosition = position === 'top' || position === 'bottom'

  const slideInitialTransform: Record<SlidingBannerPosition, string> = {
    left: '-translate-x-full',
    right: 'translate-x-full',
    top: '-translate-y-full',
    bottom: 'translate-y-full',
  }

  const visibleTransform: Record<SlidingBannerPosition, string> = {
    left: 'translate-x-0',
    right: 'translate-x-0',
    top: 'translate-y-0',
    bottom: 'translate-y-0',
  }

  const positionClasses: Record<SlidingBannerPosition, string> = {
    left: 'left-0 top-1/2 -translate-y-1/2',
    right: 'right-0 top-1/2 -translate-y-1/2',
    top: 'top-0 left-1/2 -translate-x-1/2',
    bottom: 'bottom-0 left-1/2 -translate-x-1/2',
  }

  const clickableBanner = isMobile && !!actionButton

  const handleBannerClick = () => {
    if (clickableBanner && actionButton) {
      actionButton.onClick()
    }
  }

  return (
    <section
      data-testid="sliding-banner"
      className={clsx(
        'absolute z-20',
        'sm:h-30',
        'rounded-md shadow-lg',
        'bg-slate-900/80 text-slate-50',
        'px-4 py-3',
        'max-w-xs sm:max-w-sm md:max-w-md',
        isVerticalPosition
          ? 'flex flex-col gap-2 items-center justify-center'
          : 'flex items-center gap-3',
        'transition-transform duration-500 ease-out',
        positionClasses[position],
        isVisible ? visibleTransform[position] : slideInitialTransform[position],
        clickableBanner && 'cursor-pointer',
        className,
      )}
      role={clickableBanner ? 'button' : isVisible ? 'status' : undefined}
      aria-live={clickableBanner ? undefined : 'polite'}
      aria-label={clickableBanner && actionButton ? actionButton.title : undefined}
      aria-hidden={!isVisible && !clickableBanner}
      tabIndex={clickableBanner ? 0 : -1}
      onClick={handleBannerClick}
    >
      <p className="text-sm sm:text-base line-clamp-3" data-testid="sliding-banner-message">
        {message}
      </p>

      {actionButton && !isMobile && (
        <button
          data-testid="action-button"
          ref={actionButtonRef}
          type="button"
          className="shrink-0 rounded-md bg-sky-500 px-3 py-1 text-xs sm:text-sm font-semibold text-slate-900 hover:bg-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          onClick={actionButton.onClick}
        >
          {actionButton.title}
        </button>
      )}
    </section>
  )
}
