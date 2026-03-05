import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ideas/')({
  head: () => ({
    meta: [
      {
        title: 'IdeiaHub - Browser Ideias'
      }
    ]
  }),
  component: IdeasPage,
})

function IdeasPage() {
  return <div>Hello "/ideias/"!</div>
}
