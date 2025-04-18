import { NextResponse } from 'next/server'

export async function GET() {
  const packages = [
    'angular',
    'cypress',
    'jest',
    'next',
    'node',
    'playwright',
    'react',
    'sentry',
    'tailwindcss',
    'typescript',
    'vue',
  ]
  let latestPackage = null
  let latestDate = new Date(0)

  for (const pkg of packages) {
    try {
      const res = await fetch(`https://registry.npmjs.org/${pkg}`)
      const data = await res.json()

      if (data.time && data['dist-tags']?.latest) {
        const latestStableVersion = data['dist-tags'].latest
        const latestUpdate = new Date(data.time[latestStableVersion])

        if (latestUpdate > latestDate) {
          latestDate = latestUpdate
          latestPackage = {
            name: pkg,
            version: latestStableVersion,
            date: latestUpdate.toISOString(),
          }
        }
      }
    } catch (error) {
      console.error(`Erro ao buscar ${pkg}:`, error)
    }
  }

  return NextResponse.json(
    latestPackage || { message: 'Nenhuma atualização encontrada' },
  )
}
