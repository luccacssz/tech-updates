'use client'

import { createContext, useContext, useState } from 'react'

interface Technology {
  name: string
  version: string
  downloads: number
  latestReleases: { tag: string; name: string; url: string }[]
}

interface TechnologyContextType {
  technologies: Record<string, Technology>
  fetchTechnology: (tech: string) => void
}

const TechnologyContext = createContext<TechnologyContextType | undefined>(
  undefined,
)

const TechnologyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [technologies, setTechnologies] = useState<Record<string, Technology>>(
    {},
  )

  const fetchTechnology = async (tech: string) => {
    if (technologies[tech]) return

    try {
      const res = await fetch(`/api/tech/${tech}`)
      const data = await res.json()
      setTechnologies((prev) => ({ ...prev, [tech]: data }))
    } catch (error) {
      console.error(`Erro ao buscar ${tech}`, error)
    }
  }

  return (
    <TechnologyContext.Provider value={{ technologies, fetchTechnology }}>
      {children}
    </TechnologyContext.Provider>
  )
}

const useTechnology = () => {
  const context = useContext(TechnologyContext)
  if (!context)
    throw new Error(
      'useTechnology deve ser usado dentro de um TechnologyProvider',
    )
  return context
}

export { TechnologyProvider, useTechnology }
