'use client'

import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import TechList from '@/components/tables/TechList'
import { useTechnology } from '@/context/TechnologyContext'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export default function Technology() {
  const { slug } = useParams() as { slug: string }
  const { fetchTechData } = useTechnology()

  const {
    data: tech,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tech', slug],
    queryFn: () => fetchTechData(slug),
    staleTime: 1000 * 60 * 5,
    enabled: !!slug,
  })

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )

  if (error)
    return <div className="text-red-500">Erro ao carregar os dados</div>

  return (
    <div>
      <PageBreadcrumb pageTitle="Technology" />
      <div className="space-y-6">
        <ComponentCard title={tech?.name} currentVersion={tech?.version}>
          <TechList latestReleases={tech?.latestReleases} />
        </ComponentCard>
      </div>
    </div>
  )
}
