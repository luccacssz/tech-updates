'use client'

import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import BasicTableOne from '@/components/tables/BasicTableOne'
import { Metadata } from 'next'
import React, { useEffect } from 'react'
import { useTechnology } from '@/context/TechnologyContext'

const metadata: Metadata = {
  title: 'Tech Updates',
  description: 'Tech updates',
  // other metadata
}

export default function Technology({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const paramsSlug = React.use(params).slug
  const { technologies, fetchTechnology } = useTechnology()

  useEffect(() => {
    fetchTechnology(paramsSlug)
  }, [paramsSlug, fetchTechnology])

  const tech = technologies[paramsSlug]

  if (!tech)
    return (
      <div className="flex justify-center items-center">
        <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )

  return (
    <div>
      <PageBreadcrumb pageTitle="Technology" />
      <div className="space-y-6">
        <ComponentCard title={`${paramsSlug.toUpperCase()}`}>
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  )
}
