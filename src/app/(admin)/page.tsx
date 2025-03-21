'use client'

import DownloadsChart from '@/components/dashboard/DownloadsChart'
import RecentOrders from '@/components/dashboard/RecentOrders'
import { TechMetrics } from '@/components/dashboard/TechMetrics'
import { useTechnology } from '@/context/TechnologyContext'

export default function Dashboard() {
  const { fetchTechnology, fetchLatestUpdate } = useTechnology()

  const dataTech = fetchTechnology()

  const latestUpdate = fetchLatestUpdate()

  //@ts-ignore
  console.log(latestUpdate[0].data, 'latestUpdate')

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

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6">
        <TechMetrics
          name={mostDownloaded?.name}
          version={mostDownloaded?.version}
          downloads={mostDownloaded?.downloads}
          isLoading={isLoading}
        />
        <DownloadsChart techData={techDataDownloads} isLoading={isLoading} />
      </div>
      <div className="col-span-12">
        <RecentOrders techData={top5Techs} />
      </div>
    </div>
  )
}
