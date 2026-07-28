import { Link } from 'react-router-dom'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button, Container } from '@/components/ui'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Page not found"
        description="The page you are looking for does not exist or has moved."
        noIndex
      />
      <section className={styles.section} data-header-theme="light">
        <Container className={styles.inner}>
          <img
            className={styles.watermark}
            src="/assets/images/shapes/error-404.png"
            alt=""
            aria-hidden="true"
          />
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.support}>
            The page you are looking for does not exist or has moved.
          </p>
          <Button as={Link} to="/" size="lg">
            Back To Home
          </Button>
        </Container>
      </section>
    </>
  )
}
