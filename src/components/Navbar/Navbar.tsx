import { useEffect, useId, useState } from 'react'

import clsx from 'clsx'
import { List } from 'phosphor-react'

export interface NavItem {
  label: string
  onClick: () => void
}

export type NavbarProps = {
  navItems: NavItem[]
  activeLabel: string
}

export function Navbar({ navItems, activeLabel }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (elementKey: KeyboardEvent) => {
      if (elementKey.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const handleItemClick = (item: NavItem) => {
    item.onClick()
    setIsOpen(false)
  }

  return (
    <nav aria-label="Main" className="bg-transparent top-0 start-0 z-20 w-full">
      <div className="relative mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div className="flex items-center md:order-2">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 md:hidden"
            aria-controls={menuId}
            aria-expanded={isOpen}
            aria-label="Abrir menu principal"
            onClick={() => setIsOpen((isOpenElement) => !isOpenElement)}
          >
            <List size={32} />
          </button>
        </div>

        <div data-testid="desktop-menu" className="hidden w-auto md:order-1 md:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => {
              const active = item.label === activeLabel
              return (
                <li key={`desktop-${item.label}`}>
                  <button
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className={clsx(
                      'text-sm font-medium transition-colors  duration-300 ease-in-out',
                      'hover:text-blue-700',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
                      'rounded-md p-1',
                      active ? 'text-blue-700 font-bold' : 'text-gray-900',
                      'cursor-pointer',
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div
          data-testid="mobile-menu"
          id={menuId}
          className={clsx(
            'absolute right-0 top-full mt-2 w-56 md:hidden',
            'rounded-lg border border-gray-100 bg-white shadow-lg',
            isOpen ? 'block' : 'hidden',
          )}
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-2">
            {navItems.map((item) => {
              const active = item.label === activeLabel
              return (
                <li key={`mobile-${item.label}`}>
                  <button
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className={clsx(
                      'block w-full rounded-sm px-3 py-2 text-left text-sm font-medium outline-none transition-colors',
                      'hover:text-blue-700 dark:hover:text-blue-400',
                      'focus-visible:ring-2 focus-visible:ring-blue-400',
                      active
                        ? 'text-blue-700 dark:text-blue-700'
                        : 'text-gray-900 dark:text-gray-100',
                      'cursor-pointer',
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
