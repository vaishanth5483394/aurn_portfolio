import type { ElementType, ReactNode } from 'react'
import { useInView } from '../hooks/hooks'

export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
}: {
  as?: ElementType
  delay?: number
  className?: string
  children: ReactNode
}) {
  const [ref, seen] = useInView<HTMLElement>()
  return (
    <Tag ref={ref} className={`reveal ${seen ? 'in' : ''} ${className}`} style={{ ['--d' as string]: `${delay}ms` }}>
      {children}
    </Tag>
  )
}
