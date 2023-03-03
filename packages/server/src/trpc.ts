import { initTRPC } from '@trpc/server'
import { createContext } from './context'

const t = initTRPC.context<typeof createContext>().create()

export const procedure = t.procedure
export const router = t.router
export const middleware = t.middleware
