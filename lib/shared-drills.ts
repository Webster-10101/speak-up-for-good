import data from './shared-drills.json'

export interface SharedDrill {
  slug: string
  name: string
  blurb: string
  kind: string
  cue?: string
  prompts?: string[]
  steps?: { id: string; title: string; durationSec: number; type: 'warmup' | 'challenge' | 'reflection'; instructions: string[]; why: string }[]
}
export const sharedDrills: Record<string, SharedDrill> = data as Record<string, SharedDrill>
export function drillSeconds(drill: SharedDrill): number {
  return drill.steps ? drill.steps.reduce((sum, step) => sum + step.durationSec, 0) : 90
}
export function drillDuration(drill: SharedDrill): string {
  const seconds = drillSeconds(drill)
  return `${Math.floor(seconds / 60)} min${seconds % 60 ? ` ${seconds % 60} sec` : ''}`
}
