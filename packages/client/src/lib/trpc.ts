import { createTRPCProxyClient, createWSClient, wsLink } from '@trpc/client'
import type { AppRouter } from '../../../server/src/index'

const wsClient = createWSClient({ url: `ws://localhost:3001` })

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [wsLink({ client: wsClient })],
})
