/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react'

import { createPortal } from 'react-dom'

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(' ')
}

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
export type TooltipTrigger = 'hover' | 'click' | 'focus'

export type TooltipProps = {
  children: ReactNode
  content: string | ReactNode
  placement?: TooltipPlacement
  trigger?: TooltipTrigger
  delay?: number
  isDisabled?: boolean
  className?: string
  id?: string
}
const DEFAULT_DELAY_MS = 500
const OFFSCREEN_COORD = -9999
const VIEWPORT_PADDING_PX = 8
const margin = 8
function computePosition(
  triggerEl: HTMLElement,
  tooltipEl: HTMLElement,
  placement: TooltipPlacement,
) {
  const triggerRect = triggerEl.getBoundingClientRect()
  const ttRect = tooltipEl.getBoundingClientRect()

  let top = 0
  let left = 0
  let finalPlacement: TooltipPlacement = placement

  const fitsTop = triggerRect.top - margin - ttRect.height >= 0
  const fitsBottom = window.innerHeight - (triggerRect.bottom + margin + ttRect.height) >= 0
  const fitsLeft = triggerRect.left - margin - ttRect.width >= 0
  const fitsRight = window.innerWidth - (triggerRect.right + margin + ttRect.width) >= 0

  if (placement === 'top' && !fitsTop && fitsBottom) finalPlacement = 'bottom'
  if (placement === 'bottom' && !fitsBottom && fitsTop) finalPlacement = 'top'
  if (placement === 'left' && !fitsLeft && fitsRight) finalPlacement = 'right'
  if (placement === 'right' && !fitsRight && fitsLeft) finalPlacement = 'left'

  switch (finalPlacement) {
    case 'top':
      top = triggerRect.top + window.scrollY - ttRect.height - margin
      left = triggerRect.left + window.scrollX + triggerRect.width / 2 - ttRect.width / 2
      break
    case 'bottom':
      top = triggerRect.bottom + window.scrollY + margin
      left = triggerRect.left + window.scrollX + triggerRect.width / 2 - ttRect.width / 2
      break
    case 'left':
      top = triggerRect.top + window.scrollY + triggerRect.height / 2 - ttRect.height / 2
      left = triggerRect.left + window.scrollX - ttRect.width - margin
      break
    case 'right':
      top = triggerRect.top + window.scrollY + triggerRect.height / 2 - ttRect.height / 2
      left = triggerRect.right + window.scrollX + margin
      break
  }

  left = Math.max(
    VIEWPORT_PADDING_PX + window.scrollX,
    Math.min(left, window.scrollX + window.innerWidth - ttRect.width - VIEWPORT_PADDING_PX),
  )
  top = Math.max(
    VIEWPORT_PADDING_PX + window.scrollY,
    Math.min(top, window.scrollY + window.innerHeight - ttRect.height - VIEWPORT_PADDING_PX),
  )

  return {
    top,
    left,
    placement: finalPlacement,
  }
}

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(
  (
    {
      children,
      content,
      placement = 'top',
      trigger = 'hover',
      delay = DEFAULT_DELAY_MS,
      isDisabled = false,
      className,
      id,
    },
    ref,
  ) => {
    const internalId = useId()
    const tooltipId = id ?? `tooltip-${internalId}`

    const triggerRef = useRef<HTMLElement | null>(null)
    const tooltipRef = useRef<HTMLDivElement | null>(null)

    const [open, setOpen] = useState(false)
    const [coords, setCoords] = useState<{
      top: number
      left: number
      placement: TooltipPlacement
    } | null>(null)
    const showTimer = useRef<number | null>(null)

    useEffect(() => {
      return () => {
        if (showTimer.current) window.clearTimeout(showTimer.current)
      }
    }, [])

    const scheduleShow = useCallback(() => {
      if (isDisabled) return
      showTimer.current = window.setTimeout(() => setOpen(true), delay)
    }, [delay, isDisabled])

    const hideNow = useCallback(() => {
      if (showTimer.current) {
        window.clearTimeout(showTimer.current)
        showTimer.current = null
      }
      setOpen(false)
    }, [])

    const toggle = useCallback(() => {
      if (isDisabled) return
      setOpen((value) => !value)
    }, [isDisabled])

    useLayoutEffect(() => {
      if (!open || !triggerRef.current || !tooltipRef.current) return
      const position = () => {
        if (!triggerRef.current || !tooltipRef.current) return
        const newPosition = computePosition(triggerRef.current, tooltipRef.current, placement)
        setCoords(newPosition)
      }
      position()

      const hasRO = typeof window !== 'undefined' && 'ResizeObserver' in window
      let ro: ResizeObserver | null = null

      if (hasRO) {
        ro = new ResizeObserver(position)
        ro.observe(document.body)
      }

      const onScroll = position
      const onResize = position
      window.addEventListener('scroll', onScroll, true)
      window.addEventListener('resize', onResize)

      return () => {
        ro?.disconnect()
        window.removeEventListener('scroll', onScroll, true)
        window.removeEventListener('resize', onResize)
      }
    }, [open, placement])

    useEffect(() => {
      if (!open) return
      const onDocClick = (evento: MouseEvent) => {
        if (!triggerRef.current || !tooltipRef.current) return
        const target = evento.target as Node
        if (!triggerRef.current.contains(target) && !tooltipRef.current.contains(target)) {
          if (trigger === 'click') setOpen(false)
        }
      }
      const onKey = (evento: KeyboardEvent) => {
        if (evento.key === 'Escape') setOpen(false)
      }
      document.addEventListener('mousedown', onDocClick)
      document.addEventListener('keydown', onKey)
      return () => {
        document.removeEventListener('mousedown', onDocClick)
        document.removeEventListener('keydown', onKey)
      }
    }, [open, trigger])

    const triggerHandlers: React.HTMLAttributes<HTMLElement> = {}
    if (trigger === 'hover') {
      triggerHandlers.onMouseEnter = scheduleShow
      triggerHandlers.onMouseLeave = hideNow
      triggerHandlers.onFocus = scheduleShow
      triggerHandlers.onBlur = hideNow
    } else if (trigger === 'focus') {
      triggerHandlers.onFocus = scheduleShow
      triggerHandlers.onBlur = hideNow
      triggerHandlers.onKeyDown = (evento) => {
        if (evento.key === 'Escape') setOpen(false)
      }
    } else if (trigger === 'click') {
      triggerHandlers.onClick = toggle
      triggerHandlers.onKeyDown = (evento) => {
        if (evento.key === 'Escape') setOpen(false)
        if (evento.key === 'Enter' || evento.key === ' ') {
          evento.preventDefault()
          toggle()
        }
      }
    }

    let triggerElement: ReactElement
    const triggerProps = {
      'aria-describedby': open ? tooltipId : undefined,
      'aria-expanded': trigger === 'click' ? open : undefined,
      tabIndex: 0,
      ...triggerHandlers,
      ref: (node: HTMLElement) => {
        ;(triggerRef as any).current = node
        if (typeof (ref as any) === 'function') (ref as any)(node)
        else if (ref && typeof (ref as any) === 'object') (ref as any).current = node
      },
    } as any

    if (isValidElement(children)) {
      if ((children as any).props?.tabIndex !== undefined) {
        delete triggerProps.tabIndex
      }
      triggerElement = cloneElement(children as ReactElement, {
        ...triggerProps,
        ...((children as any).props || {}),
      })
    } else {
      triggerElement = (
        <span {...triggerProps} className="inline-flex items-center">
          {children}
        </span>
      )
    }

    if (isDisabled) return triggerElement

    return (
      <>
        {triggerElement}
        {open &&
          content &&
          createPortal(
            <div
              ref={tooltipRef}
              id={tooltipId}
              role="tooltip"
              data-placement={coords?.placement ?? placement}
              className={cn(
                'pointer-events-none fixed z-[9999] max-w-xs rounded-lg border border-black/10 bg-gray-900 px-3 py-2 text-sm text-white shadow-lg',
                'opacity-100 transition-opacity duration-150',
                className,
              )}
              style={{
                top: coords?.top ?? OFFSCREEN_COORD,
                left: coords?.left ?? OFFSCREEN_COORD,
              }}
            >
              <div className="relative">
                {content}
                {/* Arrow */}
                <span
                  aria-hidden
                  className={cn(
                    'absolute block h-2 w-2 rotate-45 border border-black/10 bg-gray-900',
                    coords?.placement === 'top' && 'left-3 -translate-x-3 -bottom-3',
                    coords?.placement === 'bottom' && 'left-3 -translate-x-3 -top-3',
                    coords?.placement === 'left' && 'top-3/4 -right-4 -translate-y-3/4',
                    coords?.placement === 'right' && 'top-3/4 -left-4 -translate-y-3/4',
                    className,
                  )}
                />
              </div>
            </div>,
            document.body,
          )}
      </>
    )
  },
)

Tooltip.displayName = 'Tooltip'
