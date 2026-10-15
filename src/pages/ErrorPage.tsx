import { isRouteErrorResponse, useRouteError } from 'react-router'

function getErrorMessage(error: unknown): string {
  if (isRouteErrorResponse(error)) return `${error.status} ${error.statusText}`
  if (error instanceof Error) return error.message
  return 'Erreur inconnue'
}

function ErrorPage() {
  const error = useRouteError()

  return (
    <main className="min-h-screen bg-deep-space-blue-300 p-8 text-deep-space-blue-900">
      <h1 className="text-3xl font-bold">Oups, un sort a mal tourné</h1>
      <p className="mt-4 text-deep-space-blue-800">{getErrorMessage(error)}</p>
      <a href="/" className="mt-6 inline-block text-stormy-teal-700 hover:underline">
        Retour à l'accueil
      </a>
    </main>
  )
}

export default ErrorPage
