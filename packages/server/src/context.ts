import { getSession, Session } from './sessions'

export type RequestContext = Session

export function createContext(): RequestContext {
  // TODO: Get sessionId from request
  const session = getSession('asdf')

  return session
}
