import { Container, Heading, Section, Stack, Text, Button } from '@/components/ui'
import { Link } from 'react-router-dom'

export function PlaceholderPage({ title, description }) {
  return (
    <Section tone="light" headerTheme="light">
      <Container>
        <Stack gap={4}>
          <Heading level={1}>{title}</Heading>
          <Text muted>{description}</Text>
          <div>
            <Button as={Link} to="/contact">
              Discuss Your Project
            </Button>
          </div>
        </Stack>
      </Container>
    </Section>
  )
}
