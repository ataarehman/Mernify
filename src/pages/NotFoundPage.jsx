import { Link } from 'react-router-dom'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button, Container, Heading, Section, Stack, Text } from '@/components/ui'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Page not found"
        description="The page you are looking for does not exist or has moved."
        noIndex
      />
      <Section tone="light" headerTheme="light" className={styles.section}>
        <Container>
          <Stack gap={4}>
            <p className={styles.code} aria-hidden="true">
              404
            </p>
            <Heading level={1}>Page not found</Heading>
            <Text muted>
              The page you are looking for does not exist or has moved. Try the homepage, services
              catalogue, or contact form.
            </Text>
            <div className={styles.actions}>
              <Button as={Link} to="/">
                Back to home
              </Button>
              <Button as={Link} to="/services" variant="ghost">
                View services
              </Button>
              <Button as={Link} to="/contact" variant="ghost">
                Contact us
              </Button>
            </div>
          </Stack>
        </Container>
      </Section>
    </>
  )
}
