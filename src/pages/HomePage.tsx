import { Link } from 'react-router'

function HomePage() {
  return (
    <section className="flex max-w-2xl flex-col gap-6">
      <h1 className="text-4xl font-bold">Bienvenue sur Role&Fairies</h1>
      <p className="text-lg text-deep-space-blue-800">
        Les outils de ta table de D&D, réunis au même endroit.
      </p>
      <Link
        to="/des"
        className="w-fit rounded-xl border-2 border-stormy-teal-600 bg-deep-space-blue-400 px-6 py-3 font-bold text-stormy-teal-800 hover:bg-deep-space-blue-500"
      >
        Lancer des dés
      </Link>
    </section>
  )
}

export default HomePage
