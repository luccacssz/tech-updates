import { NextRequest, NextResponse } from 'next/server'

const endpointTechs: Record<string, [string, string, string]> = {
  angular: ['@angular/core', 'angular/angular', 'Angular'],
  cypress: ['cypress', 'cypress-io/cypress', 'Cypress'],
  jest: ['jest', 'jestjs/jest', 'Jest'],
  next: ['next', 'vercel/next.js', 'Next'],
  node: ['node', 'nodejs/node', 'Node'],
  playwright: ['playwright', 'microsoft/playwright', 'PlayWright'],
  react: ['react', 'facebook/react', 'React'],
  sentry: ['@sentry/node', 'getsentry/sentry-javascript', 'Sentry'],
  tailwindcss: ['tailwindcss', 'tailwindlabs/tailwindcss', 'Tailwind CSS'],
  typescript: ['typescript', 'microsoft/TypeScript', 'TypeScript'],
  vuejs: ['vue', 'vuejs/core', 'Vue Js'],
}

type NpmData = {
  version: string
  downloads: number
}

const fetchNpmData = async (packageName: string): Promise<NpmData | null> => {
  try {
    const [versionRes, downloadsRes] = await Promise.all([
      fetch(`https://registry.npmjs.org/${packageName}/latest`),
      fetch(`https://api.npmjs.org/downloads/point/last-month/${packageName}`),
    ])

    if (!versionRes.ok || !downloadsRes.ok) {
      throw new Error('Erro ao buscar dados do NPM')
    }

    const versionData = await versionRes.json()
    const downloadsData = await downloadsRes.json()

    return {
      version: versionData.version,
      downloads: downloadsData.downloads || 0,
    }
  } catch (error) {
    console.error(`Erro ao buscar dados do NPM para ${packageName}:`, error)
    return null
  }
}

type Release = {
  tag: string
  name: string
  url: string
}

const fetchGitHubReleases = async (repo: string): Promise<Release[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/releases?per_page=5`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Erro ao buscar releases do GitHub para ${repo}`)
    }

    const releases = await response.json()
    return releases.map((release: any) => ({
      tag: release.tag_name,
      name: release.name,
      url: release.html_url,
    }))
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const { slug } = params

  if (!endpointTechs[slug]) {
    return NextResponse.json(
      { error: 'Tecnologia não encontrada' },
      { status: 404 },
    )
  }

  const [npmPackage, githubRepo, techName] = endpointTechs[slug]
  const npmData = await fetchNpmData(npmPackage)
  const releases = await fetchGitHubReleases(githubRepo)

  return NextResponse.json({
    name: techName,
    ...npmData,
    latestReleases: releases,
  })
}
