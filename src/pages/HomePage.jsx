import { HomeHero } from '@/sections/home/HomeHero'
import { HomeTrust } from '@/sections/home/HomeTrust'
import { HomeServices } from '@/sections/home/HomeServices'
import styles from './HomePage.module.css'

/**
 * Homepage composition.
 * Hero V1 parked. Active gate: Services (await approval).
 */
export function HomePage() {
  return (
    <div className={styles.page}>
      <HomeHero />
      <HomeTrust />
      <HomeServices />
    </div>
  )
}
