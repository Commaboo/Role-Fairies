import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  addToHistory,
  loadHistory,
  saveHistory,
  type HistoryEntry,
} from './history'

function makeEntry(id: string): HistoryEntry {
  return { id, sides: 20, count: 1, modifier: 0, rolls: [10], total: 10 }
}

function createFakeStorage() {
  const data = new Map<string, string>()
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value)
    },
  }
}

describe('addToHistory', () => {
  it('ajoute le nouveau jet en premier', () => {
    const history = [makeEntry('a')]
    const result = addToHistory(history, makeEntry('b'))
    expect(result.map((entry) => entry.id)).toEqual(['b', 'a'])
  })

  it("ne modifie pas l'historique d'origine", () => {
    const history = [makeEntry('a')]
    addToHistory(history, makeEntry('b'))
    expect(history).toHaveLength(1)
  })

  it('garde seulement les derniers jets', () => {
    const history = [makeEntry('b'), makeEntry('a')]
    const result = addToHistory(history, makeEntry('c'), 2)
    expect(result.map((entry) => entry.id)).toEqual(['c', 'b'])
  })
})

describe('loadHistory / saveHistory', () => {
  let storage: ReturnType<typeof createFakeStorage>

  beforeEach(() => {
    storage = createFakeStorage()
    vi.stubGlobal('localStorage', storage)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renvoie une liste vide quand rien n\'est sauvegardé', () => {
    expect(loadHistory()).toEqual([])
  })

  it('relit ce qui a été sauvegardé', () => {
    const history = [makeEntry('b'), makeEntry('a')]
    saveHistory(history)
    expect(loadHistory()).toEqual(history)
  })

  it('renvoie une liste vide si le JSON est cassé', () => {
    storage.setItem('role-and-fairies:dice-history', '{pas du json')
    expect(loadHistory()).toEqual([])
  })

  it('renvoie une liste vide si ce n\'est pas un tableau', () => {
    storage.setItem('role-and-fairies:dice-history', '{"id":"a"}')
    expect(loadHistory()).toEqual([])
  })

  it('ignore les entrées invalides', () => {
    const invalid = { ...makeEntry('x'), sides: 7 }
    storage.setItem(
      'role-and-fairies:dice-history',
      JSON.stringify([makeEntry('a'), invalid]),
    )
    expect(loadHistory().map((entry) => entry.id)).toEqual(['a'])
  })
})
