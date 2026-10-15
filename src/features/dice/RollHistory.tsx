import { formatNotation } from './dice'
import type { HistoryEntry } from './history'

type RollHistoryProps = {
  entries: HistoryEntry[]
  onClear: () => void
}

function RollHistory({ entries, onClear }: RollHistoryProps) {
  if (entries.length === 0) return null

  return (
    <section className="flex max-w-md flex-col gap-3 rounded-xl border border-charcoal-blue-500 bg-deep-space-blue-300/60 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Historique</h2>
        <button
          type="button"
          onClick={onClear}
          className="cursor-pointer text-sm text-deep-space-blue-800 hover:text-stormy-teal-700"
        >
          Effacer
        </button>
      </div>

      <ul className="flex flex-col gap-1">
        {entries.map((entry) => (
          <li key={entry.id} className="flex justify-between gap-4">
            <span className="text-deep-space-blue-800">
              {formatNotation(entry)} ({entry.rolls.join(', ')})
            </span>
            <span className="font-bold text-stormy-teal-700">{entry.total}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RollHistory
