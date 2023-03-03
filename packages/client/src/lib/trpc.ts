import { createTRPCProxyClient, createWSClient, wsLink } from '@trpc/client'
import type { AppRouter } from '../../../server/src/router'

// Websocket client connecting to the server
const client = createWSClient({ url: `ws://localhost:3001` })

// TRPC client communicating via websockets
export const trpc = createTRPCProxyClient<AppRouter>({
  links: [wsLink({ client: client })],
})
