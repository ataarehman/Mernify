import { Link } from 'react-router-dom'
import styles from './TextLink.module.css'

export function TextLink({ to, href, children, className = '', ...props }) {
  const classes = [styles.link, className].filter(Boolean).join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  )
}
