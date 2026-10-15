import type { DieSides } from './dice'
import './Die.css'

type DieProps = {
  sides: DieSides
  onRoll: (sides: DieSides) => void
}

function Die({ sides, onRoll }: DieProps) {
  return (
    <button type="button" className="die" onClick={() => onRoll(sides)}>
      d{sides}
    </button>
  )
}

export default Die
