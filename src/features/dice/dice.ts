export const DICE_SIDES = [4, 6, 8, 10, 12, 20, 100] as const

export type DieSides = (typeof DICE_SIDES)[number]

export function rollDie(sides: DieSides): number {
  return Math.floor(Math.random() * sides) + 1
}
