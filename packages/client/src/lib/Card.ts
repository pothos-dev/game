export class Card {
  id: string
  name: string
  color: string

  constructor({ id, name, color }: { id: string; name: string; color: string }) {
    this.id = id
    this.name = name
    this.color = color
  }
}
