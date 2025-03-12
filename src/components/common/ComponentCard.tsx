import React from 'react'
import Badge from '../ui/badge/Badge'

interface ComponentCardProps {
  title?: string
  children: React.ReactNode
  className?: string // Additional custom classes for styling
  currentVersion?: string // Description text
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = '',
  currentVersion = '',
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="px-6 py-5">
        <div className="text-base font-medium text-gray-800 dark:text-white/90 flex gap-2 items-center">
          <span>{title}</span>
        </div>
        {currentVersion && (
          <div className="flex gap-2 items-center mt-2">
            <span className="text-xs text-gray-800 dark:text-white/90">
              Current Version:
            </span>
            <Badge size="sm" color="success">
              {currentVersion}
            </Badge>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  )
}

export default ComponentCard
