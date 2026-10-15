import { isDieSides, type RollResult } from './dice'

export const MAX_HISTORY = 10

const STORAGE_KEY = 'role-and-fairies:dice-history'

export type HistoryEntry = RollResult & {
  id: string
}

export function addToHistory(
  history: HistoryEntry[],
  entry: HistoryEntry,
  max = MAX_HISTORY,
): HistoryEntry[] {
  return [entry, ...history].slice(0, max)
}

function isHistoryEntry(value: unknown): value is HistoryEntry {
  if (typeof value !== 'object' || value === null) return false

  const entry = value as Record<string, unknown>

  return (
    typeof entry.id === 'string' &&
    isDieSides(entry.sides) &&
    typeof entry.count === 'number' &&
    typeof entry.modifier === 'number' &&
    Array.isArray(entry.rolls) &&
    entry.rolls.every((roll) => typeof roll === 'number') &&
    typeof entry.total === 'number'
  )
}

export function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return []

    const data: unknown = JSON.parse(raw)
    if (!Array.isArray(data)) return []

    return data.filter(isHistoryEntry).slice(0, MAX_HISTORY)
  } catch {
    return []
  }
}

export function saveHistory(history: HistoryEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  } catch {
    // Stockage plein ou bloqué (navigation privée) : on continue sans sauvegarder.
  }
}
