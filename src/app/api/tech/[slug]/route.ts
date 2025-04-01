import { NpmData } from '@/app/types/NpmData'
import { Release } from '@/app/types/Release'
import { NextRequest, NextResponse } from 'next/server'

const endpointTechs: Record<string, string[]> = {
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

const fetchNpmData = async (packageName: string): Promise<NpmData | null> => {
  try {
    const [versionRes, downloadsRes] = await Promise.all([
      fetch(`https://registry.npmjs.org/${packageName}/latest`),
      fetch(`https://api.npmjs.org/downloads/point/last-month/${packageName}`),
    ])

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

const fetchGitHubReleases = async (repo: string): Promise<Release[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/releases?per_page=5`,
      {
        headers: {
          Authorization: `${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      },
    )
    const releases = await response.json()

    return releases.map(
      (release: {
        tag_name: string
        name: string
        body: string
        html_url: string
      }) => ({
        tag: release.tag_name,
        name: release.name,
        changelog: release.body,
        url: release.html_url,
      }),
    )
  } catch (error) {
    console.error(`Erro ao buscar releases do GitHub para ${repo}:`, error)
    return []
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const { slug } = await params

  const techData = endpointTechs[slug]
  if (!techData) {
    return NextResponse.json(
      { error: 'Tecnologia não encontrada' },
      { status: 404 },
    )
  }

  const [npmPackage, githubRepo, techName] = techData

  const npmData = await fetchNpmData(npmPackage)
  const releases = await fetchGitHubReleases(githubRepo)

  return NextResponse.json({
    name: techName,
    ...npmData,
    latestReleases: releases,
  })
}
