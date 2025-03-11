import { NextResponse } from 'next/server'

const fetchNpmData = async (packageName: any) => {
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

const fetchGitHubReleases = async (repo: any) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/releases?per_page=5`,
    )
    const releases = await response.json()
    return releases.map((release: any) => ({
      tag: release.tag_name,
      name: release.name,
      url: release.html_url,
    }))
  } catch (error) {
    console.error(`Erro ao buscar releases do GitHub para ${repo}:`, error)
    return []
  }
}

export async function GET() {
  const npmData = await fetchNpmData('jest')
  const releases = await fetchGitHubReleases('jestjs/jest')
  return NextResponse.json({
    name: 'Jest',
    ...npmData,
    latestReleases: releases,
  })
}
