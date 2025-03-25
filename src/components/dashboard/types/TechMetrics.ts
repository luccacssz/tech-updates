import { Technology } from "@/app/types/Technology"

export interface TechMetricsProps {
  name?: string
  version?: string
  downloads?: number
  isLoading?: boolean
  isLoadingLastUpdate?: boolean
  packageInfo?:PackageInfo
}



export interface PackageInfo {
  name: string
  version: string
  date: string 
}


export interface RecentStacks {
  techData: Technology[]
  isLoadingTop5Techs: boolean
}