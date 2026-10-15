import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Page introuvable</h1>
      <p className="text-deep-space-blue-800">
        Cette page s'est perdue quelque part dans le donjon.
      </p>
      <Link to="/" className="w-fit text-stormy-teal-700 hover:underline">
        Retour à l'accueil
      </Link>
    </section>
  )
}

export default NotFoundPage
