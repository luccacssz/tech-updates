'use client'
import Badge from '../ui/badge/Badge'
import { TechMetricsProps } from './types/TechMetrics'

export const TechMetrics = ({
  name,
  version,
  downloads,
  isLoading,
  packageInfo,
  isLoadingLastUpdate,
}: TechMetricsProps) => {
  const nameLastUpdate =
    packageInfo?.name?.replace(/^./, (c) => c.toUpperCase()) ?? ''

  const dateLastUpdate = packageInfo?.date
    ? new Date(packageInfo.date).toLocaleDateString('pt-BR')
    : ''

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-hard-drive-download text-gray-800 size-6 dark:text-white/90"
          >
            <path d="M12 2v8" />
            <path d="m16 6-4 4-4-4" />
            <rect width="20" height="8" x="2" y="14" rx="2" />
            <path d="M6 18h.01" />
            <path d="M10 18h.01" />
          </svg>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {name}
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {version}
              </h4>
            </div>

            <Badge color="success">
              <span className="text-['#12b76a']">{downloads}</span>
            </Badge>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-file-stack text-gray-800 dark:text-white/90"
          >
            <path d="M21 7h-3a2 2 0 0 1-2-2V2" />
            <path d="M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17Z" />
            <path d="M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15" />
            <path d="M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11" />
          </svg>
        </div>

        {isLoadingLastUpdate ? (
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {nameLastUpdate}
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {packageInfo?.version}
              </h4>
            </div>

            <Badge color="success">
              <span className="text-theme-sm text-['#12b76a']">
                {dateLastUpdate}
              </span>
            </Badge>
          </div>
        )}
      </div>
    </div>
  )
}
