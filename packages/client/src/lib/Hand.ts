import { writable } from "svelte/store"
import type { Card } from "~/lib/Card"

export class Hand {
  cards = writable<Card[]>([])

  draw(card: Card) {
    this.cards.update((cards) => [...cards, card])
  }

  discard(cardId: string) {
    this.cards.update((cards) => cards.filter((card) => card.id !== cardId))
  }
}
