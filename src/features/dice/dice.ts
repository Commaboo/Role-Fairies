export const DICE_SIDES = [4, 6, 8, 10, 12, 20, 100] as const

export type DieSides = (typeof DICE_SIDES)[number]

export const MAX_DICE = 20

export type RollRequest = {
  sides: DieSides
  count: number
  modifier: number
}

export type RollResult = RollRequest & {
  rolls: number[]
  total: number
}

export function rollDie(sides: DieSides): number {
  return Math.floor(Math.random() * sides) + 1
}

export function rollDice({ sides, count, modifier }: RollRequest): RollResult {
  const rolls = Array.from({ length: count }, () => rollDie(sides))
  const total = rolls.reduce((sum, value) => sum + value, 0) + modifier

  return { sides, count, modifier, rolls, total }
}

export function formatNotation({ sides, count, modifier }: RollRequest): string {
  const base = `${count}d${sides}`

  if (modifier === 0) return base
  return modifier > 0 ? `${base}+${modifier}` : `${base}${modifier}`
}

export function isDieSides(value: unknown): value is DieSides {
  return typeof value === 'number' && (DICE_SIDES as readonly number[]).includes(value)
}
