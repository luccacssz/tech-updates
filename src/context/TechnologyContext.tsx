'use client'

import { Technology } from '@/app/types/Technology'
import { PackageInfo } from '@/components/dashboard/types/TechMetrics'
import { useQueries } from '@tanstack/react-query'
import { createContext, useContext } from 'react'

interface TechnologyContextType {
  technologies: string[]
  fetchTechData: (tech: string) => Promise<Technology>
  fetchLatestUpdateData: () => Promise<PackageInfo>
}

const TechnologyContext = createContext<TechnologyContextType | undefined>(
  undefined,
)

const TechnologyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const technologies = [
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
    'vuejs',
  ]

  const fetchTechData = async (tech: string): Promise<Technology> => {
    const res = await fetch(`/api/tech/${tech}`)
    if (!res.ok) {
      throw new Error(`Erro ao buscar ${tech}`)
    }
    return res.json()
  }

  const fetchLatestUpdateData = async (): Promise<PackageInfo> => {
    const res = await fetch('/api/tech/latest-update')

    if (!res.ok) {
      throw new Error('Erro ao buscar a última atualização')
    }
    return res.json()
  }

  return (
    <TechnologyContext.Provider
      value={{
        technologies,
        fetchTechData,
        fetchLatestUpdateData,
      }}
    >
      {children}
    </TechnologyContext.Provider>
  )
}

// ✅ Criando hooks personalizados para evitar o erro do ESLint
const useTechnology = () => {
  const context = useContext(TechnologyContext)
  if (!context) {
    throw new Error(
      'useTechnology deve ser usado dentro de um TechnologyProvider',
    )
  }
  return context
}

const useFetchTechnology = () => {
  const { technologies, fetchTechData } = useTechnology()
  return useQueries({
    queries: technologies.map((tech) => ({
      queryKey: ['tech', tech],
      queryFn: () => fetchTechData(tech),
      staleTime: 1000 * 60 * 5,
    })),
  }) as { data: Technology; isLoading: boolean }[]
}

const useFetchLatestUpdate = () => {
  const { fetchLatestUpdateData } = useTechnology()
  return useQueries({
    queries: [
      {
        queryKey: ['latest-update'],
        queryFn: () => fetchLatestUpdateData(),
        staleTime: 1000 * 60 * 5,
      },
    ],
  }) as { data: PackageInfo; isLoading: boolean }[]
}

export {
  TechnologyProvider,
  useTechnology,
  useFetchTechnology,
  useFetchLatestUpdate,
}
