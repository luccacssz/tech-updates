'use client'

import { useQueryClient } from '@tanstack/react-query'
import { createContext, useContext } from 'react'

export interface Technology {
  name?: string
  version?: string
  downloads?: number
  latestReleases?: { tag: string; name: string; url: string }[]
}

interface TechnologyContextType {
  technologies: Record<string, Technology>
  fetchTechnology: (tech: string) => void
}

const TechnologyContext = createContext<TechnologyContextType | undefined>(
  undefined,
)

export const fetchTechData = async (tech: string): Promise<Technology> => {
  const res = await fetch(`/api/tech/${tech}`)
  if (!res.ok) {
    throw new Error(`Erro ao buscar ${tech}`)
  }
  return res.json()
}

const TechnologyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient()

  const fetchTechnology = (tech: string) => {
    queryClient.prefetchQuery({
      queryKey: ['tech', tech],
      queryFn: () => fetchTechData(tech),
      staleTime: 1000 * 60 * 5,
    })
  }

  const technologies =
    queryClient.getQueryData<Record<string, Technology>>(['tech']) || {}

  return (
    <TechnologyContext.Provider value={{ technologies, fetchTechnology }}>
      {children}
    </TechnologyContext.Provider>
  )
}

const useTechnology = () => {
  const context = useContext(TechnologyContext)
  if (!context) {
    throw new Error(
      'useTechnology deve ser usado dentro de um TechnologyProvider',
    )
  }
  return context
}

export { TechnologyProvider, useTechnology }
