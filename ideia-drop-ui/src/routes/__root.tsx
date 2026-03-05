import {HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'Share, explore and build on the best startup ideias and site hustles'
      },
      {
        title: 'IdeiaDrop - Your Ideia Hub',
      },
    ]
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
    <HeadContent />
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}
