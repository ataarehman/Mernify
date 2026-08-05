import {
  SiConfluence,
  SiConfluenceHex,
  SiCloudflare,
  SiCloudflareHex,
  SiCypress,
  SiCypressHex,
  SiDocker,
  SiDockerHex,
  SiExpo,
  SiExpoHex,
  SiExpress,
  SiExpressHex,
  SiFastapi,
  SiFastapiHex,
  SiFigma,
  SiFigmaHex,
  SiFlutter,
  SiFlutterHex,
  SiFramer,
  SiFramerHex,
  SiGithub,
  SiGithubHex,
  SiGithubactions,
  SiGithubactionsHex,
  SiGraphql,
  SiGraphqlHex,
  SiHuggingface,
  SiHuggingfaceHex,
  SiJest,
  SiJestHex,
  SiJira,
  SiJiraHex,
  SiKotlin,
  SiKotlinHex,
  SiKubernetes,
  SiKubernetesHex,
  SiLangchain,
  SiLangchainHex,
  SiLinear,
  SiLinearHex,
  SiMiro,
  SiMiroHex,
  SiMongodb,
  SiMongodbHex,
  SiMysql,
  SiMysqlHex,
  SiN8n,
  SiN8nHex,
  SiNestjs,
  SiNestjsHex,
  SiNextdotjs,
  SiNextdotjsHex,
  SiNodedotjs,
  SiNodedotjsHex,
  SiNotion,
  SiNotionHex,
  SiPostgresql,
  SiPostgresqlHex,
  SiPostman,
  SiPostmanHex,
  SiPrisma,
  SiPrismaHex,
  SiPython,
  SiPythonHex,
  SiReact,
  SiReactHex,
  SiRedis,
  SiRedisHex,
  SiRedux,
  SiReduxHex,
  SiSentry,
  SiSentryHex,
  SiStorybook,
  SiStorybookHex,
  SiSupabase,
  SiSupabaseHex,
  SiSwagger,
  SiSwaggerHex,
  SiSwift,
  SiSwiftHex,
  SiTailwindcss,
  SiTailwindcssHex,
  SiTerraform,
  SiTerraformHex,
  SiTestinglibrary,
  SiTestinglibraryHex,
  SiTypescript,
  SiTypescriptHex,
  SiVercel,
  SiVercelHex,
  SiVite,
  SiViteHex,
  SiZapier,
  SiZapierHex,
} from '@icons-pack/react-simple-icons'

/**
 * Several brand colours are near-black (Next.js, Vercel, Express, Notion…) and
 * disappear on the dark section background, so anything below this perceived
 * lightness falls back to white.
 */
const MIN_LUMINANCE = 0.24

function readableBrandColor(hex) {
  const value = hex?.replace('#', '')
  if (!value || value.length !== 6) return '#ffffff'

  const r = parseInt(value.slice(0, 2), 16) / 255
  const g = parseInt(value.slice(2, 4), 16) / 255
  const b = parseInt(value.slice(4, 6), 16) / 255
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b

  return luminance < MIN_LUMINANCE ? '#ffffff' : hex
}

const tool = (name, Icon, hex) => ({ name, Icon, brand: readableBrandColor(hex) })

/**
 * Official brand marks (Simple Icons) grouped by the part of delivery they serve.
 * Copy for each group lives in `content/process.js`; this file only carries visuals.
 */
export const TOOL_CATEGORIES = {
  frontend: [
    tool('React', SiReact, SiReactHex),
    tool('Next.js', SiNextdotjs, SiNextdotjsHex),
    tool('TypeScript', SiTypescript, SiTypescriptHex),
    tool('Tailwind CSS', SiTailwindcss, SiTailwindcssHex),
    tool('Redux', SiRedux, SiReduxHex),
    tool('Vite', SiVite, SiViteHex),
  ],
  backend: [
    tool('Node.js', SiNodedotjs, SiNodedotjsHex),
    tool('NestJS', SiNestjs, SiNestjsHex),
    tool('Express', SiExpress, SiExpressHex),
    tool('GraphQL', SiGraphql, SiGraphqlHex),
    tool('Python', SiPython, SiPythonHex),
    tool('FastAPI', SiFastapi, SiFastapiHex),
  ],
  mobile: [
    tool('React Native', SiReact, SiReactHex),
    tool('Expo', SiExpo, SiExpoHex),
    tool('Flutter', SiFlutter, SiFlutterHex),
    tool('Swift', SiSwift, SiSwiftHex),
    tool('Kotlin', SiKotlin, SiKotlinHex),
  ],
  data: [
    tool('PostgreSQL', SiPostgresql, SiPostgresqlHex),
    tool('MongoDB', SiMongodb, SiMongodbHex),
    tool('Redis', SiRedis, SiRedisHex),
    tool('Prisma', SiPrisma, SiPrismaHex),
    tool('MySQL', SiMysql, SiMysqlHex),
    tool('Supabase', SiSupabase, SiSupabaseHex),
  ],
  cloud: [
    tool('Docker', SiDocker, SiDockerHex),
    tool('Kubernetes', SiKubernetes, SiKubernetesHex),
    tool('Terraform', SiTerraform, SiTerraformHex),
    tool('GitHub Actions', SiGithubactions, SiGithubactionsHex),
    tool('Vercel', SiVercel, SiVercelHex),
    tool('Cloudflare', SiCloudflare, SiCloudflareHex),
  ],
  quality: [
    tool('Jest', SiJest, SiJestHex),
    tool('Cypress', SiCypress, SiCypressHex),
    tool('Testing Library', SiTestinglibrary, SiTestinglibraryHex),
    tool('Postman', SiPostman, SiPostmanHex),
    tool('Swagger', SiSwagger, SiSwaggerHex),
    tool('Sentry', SiSentry, SiSentryHex),
  ],
  design: [
    tool('Figma', SiFigma, SiFigmaHex),
    tool('Storybook', SiStorybook, SiStorybookHex),
    tool('Framer', SiFramer, SiFramerHex),
    tool('Miro', SiMiro, SiMiroHex),
  ],
  delivery: [
    tool('Jira', SiJira, SiJiraHex),
    tool('Confluence', SiConfluence, SiConfluenceHex),
    tool('Linear', SiLinear, SiLinearHex),
    tool('Notion', SiNotion, SiNotionHex),
    tool('GitHub', SiGithub, SiGithubHex),
  ],
  ai: [
    tool('LangChain', SiLangchain, SiLangchainHex),
    tool('Hugging Face', SiHuggingface, SiHuggingfaceHex),
    tool('n8n', SiN8n, SiN8nHex),
    tool('Zapier', SiZapier, SiZapierHex),
  ],
}

export function getCategoryTools(id) {
  return TOOL_CATEGORIES[id] || []
}
