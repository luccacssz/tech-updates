'use client'

import DownloadsChart from '@/components/dashboard/DownloadsChart'
import { TechMetrics } from '@/components/dashboard/TechMetrics'
import TopTechnologies from '@/components/dashboard/TopTechnologies'
import { useTechnology } from '@/context/TechnologyContext'

export default function Dashboard() {
  const { fetchTechnology, fetchLatestUpdate } = useTechnology()

  const dataTech = fetchTechnology()
  const latestUpdate = fetchLatestUpdate()

  const techDataDownloads = dataTech
    .map((q) => {
      return {
        title: q.data?.name,
        downloads: q.data?.downloads,
      }
    })
    .filter(Boolean)
  const techData = dataTech.map((q) => q.data).filter(Boolean)

  const mostDownloaded = techData.reduce(
    (max, tech) =>
      (tech?.downloads || 0) > (max?.downloads || 0) ? tech : max,
    { downloads: 0 },
  )

  const top5Techs = techData
    .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
    .slice(0, 5)
  const isLoading = dataTech.some((q) => q.isLoading)
  const isLoadingLatest = latestUpdate.some((q) => q.isLoading)

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6">
        <TechMetrics
          name={mostDownloaded?.name}
          version={mostDownloaded?.version}
          downloads={mostDownloaded?.downloads}
          isLoading={isLoading}
          packageInfo={latestUpdate[0]?.data}
          isLoadingLastUpdate={isLoadingLatest}
        />
        <DownloadsChart techData={techDataDownloads} isLoading={isLoading} />
      </div>
      <div className="col-span-12">
        <TopTechnologies techData={top5Techs} isLoadingTop5Techs={isLoading} />
      </div>
    </div>
  )
}
