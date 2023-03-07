import { getContext, setContext } from "svelte"

export class Player {
  id: string
  name: string
  color: string

  constructor({ id, name, color }: { id: string; name: string; color: string }) {
    this.id = id
    this.name = name
    this.color = color
  }
}

const playerCtx = Symbol()
export function getPlayer(): Player {
  return getContext(playerCtx)
}
export function providePlayer(player: Player) {
  setContext(playerCtx, player)
}
