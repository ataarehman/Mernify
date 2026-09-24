import { mobileAppProcess, mobileAppServices } from '@/content/mobileApps'
import styles from './mobileApps.module.css'

export function MobileAppServices() {
  return (
    <div className={styles.serviceGrid}>
      {mobileAppServices.map((service) => (
        <article key={service.title} className={styles.service}>
          <h3>{service.title}</h3>
          <p>{service.body}</p>
        </article>
      ))}
    </div>
  )
}

export function MobileAppProcess() {
  return (
    <ol className={styles.process}>
      {mobileAppProcess.map((step) => (
        <li key={step.num} className={styles.step}>
          <span className={styles.stepNum}>{step.num}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </li>
      ))}
    </ol>
  )
}
