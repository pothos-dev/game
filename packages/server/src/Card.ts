import { faker } from "@faker-js/faker"
import { CardState } from "@shared/types/cards"
import { createId } from "@shared/lib/utils"

export class Card {
  id: string
  name: string
  color: string

  static random(): Card {
    return new Card({
      id: createId("card"),
      name: faker.science.chemicalElement().name,
      color: faker.color.rgb(),
    })
  }

  serialize(): CardState {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
    }
  }

  constructor({ id, name, color }: CardState) {
    this.id = id
    this.name = name
    this.color = color
  }
}
