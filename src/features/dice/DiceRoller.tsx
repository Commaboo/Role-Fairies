import { useState } from 'react'
import NumberField from '../../components/NumberField/NumberField'
import Die from './Die'
import {
  DICE_SIDES,
  MAX_DICE,
  formatNotation,
  rollDice,
  type DieSides,
  type RollResult,
} from './dice'

function DiceRoller() {
  const [count, setCount] = useState(1)
  const [modifier, setModifier] = useState(0)
  const [lastRoll, setLastRoll] = useState<RollResult | null>(null)

  function handleRoll(sides: DieSides) {
    setLastRoll(rollDice({ sides, count, modifier }))
  }

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Lanceur de dés</h1>

      <div className="flex gap-6">
        <NumberField
          label="Nombre de dés"
          value={count}
          onChange={setCount}
          min={1}
          max={MAX_DICE}
        />
        <NumberField
          label="Modificateur"
          value={modifier}
          onChange={setModifier}
          min={-20}
          max={20}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        {DICE_SIDES.map((sides) => (
          <Die key={sides} sides={sides} onRoll={handleRoll} />
        ))}
      </div>

      {lastRoll ? (
        <div className="flex flex-col gap-1">
          <p className="text-lg text-deep-space-blue-800">
            {formatNotation(lastRoll)}
          </p>
          <p className="text-5xl font-bold text-stormy-teal-700">
            {lastRoll.total}
          </p>
          <p className="text-deep-space-blue-800">
            Dés : {lastRoll.rolls.join(', ')}
          </p>
        </div>
      ) : (
        <p className="text-xl">Clique sur un dé pour le lancer.</p>
      )}
    </section>
  )
}

export default DiceRoller
