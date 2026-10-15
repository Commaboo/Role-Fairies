import { useState } from 'react'
import Die from './Die'
import { DICE_SIDES, rollDie, type DieSides } from './dice'

type Roll = {
  sides: DieSides
  value: number
}

function DiceRoller() {
  const [lastRoll, setLastRoll] = useState<Roll | null>(null)

  function handleRoll(sides: DieSides) {
    setLastRoll({ sides, value: rollDie(sides) })
  }

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Lanceur de dés</h1>

      <div className="flex flex-wrap gap-4">
        {DICE_SIDES.map((sides) => (
          <Die key={sides} sides={sides} onRoll={handleRoll} />
        ))}
      </div>

      <p className="text-xl">
        {lastRoll
          ? `d${lastRoll.sides} → ${lastRoll.value}`
          : 'Clique sur un dé pour le lancer.'}
      </p>
    </section>
  )
}

export default DiceRoller
