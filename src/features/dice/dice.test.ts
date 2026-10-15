import { afterEach, describe, expect, it, vi } from 'vitest'
import { DICE_SIDES, formatNotation, rollDice, rollDie } from './dice'

describe('rollDie', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('donne 1 quand le hasard est au minimum', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(rollDie(20)).toBe(1)
  })

  it('donne le max quand le hasard est au maximum', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9999)
    expect(rollDie(20)).toBe(20)
  })

  it.each(DICE_SIDES)('reste entre 1 et %i', (sides) => {
    for (let i = 0; i < 1000; i++) {
      const result = rollDie(sides)
      expect(Number.isInteger(result)).toBe(true)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(sides)
    }
  })
})

describe('rollDice', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('lance le bon nombre de dés', () => {
    const result = rollDice({ sides: 6, count: 4, modifier: 0 })
    expect(result.rolls).toHaveLength(4)
  })

  it('additionne les dés et le modificateur', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const result = rollDice({ sides: 6, count: 3, modifier: 2 })
    expect(result.rolls).toEqual([1, 1, 1])
    expect(result.total).toBe(5)
  })

  it('accepte un modificateur négatif', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const result = rollDice({ sides: 20, count: 1, modifier: -3 })
    expect(result.total).toBe(-2)
  })
})

describe('formatNotation', () => {
  it('écrit la notation sans modificateur', () => {
    expect(formatNotation({ sides: 20, count: 1, modifier: 0 })).toBe('1d20')
  })

  it('écrit un modificateur positif avec +', () => {
    expect(formatNotation({ sides: 6, count: 2, modifier: 3 })).toBe('2d6+3')
  })

  it('écrit un modificateur négatif avec -', () => {
    expect(formatNotation({ sides: 8, count: 1, modifier: -1 })).toBe('1d8-1')
  })
})
