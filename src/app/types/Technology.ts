export interface Technology {
  name?: string
  version?: string
  downloads?: number
  latestReleases?: { tag: string; name: string; url: string, changelog: string }[]
}
