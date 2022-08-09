
import {
  type FieldEntity,
  type ObjectEntity,
} from './model'

const orderOfBattle: ObjectEntity = {
  children: [],
  name: 'order-of-battle',
  definition: 'object',
  tags: [],
  value: {
    faction: 'string',
    name: 'string',
  }
}

const armyRoster: ObjectEntity = {
  children: [],
  definition: 'object',
  name: 'army-roster',
  tags: [],
  value: {

  },
}

const unitDefinition: ObjectEntity = {
  children: [

  ],
  definition: 'object',
  name: 'unit-definition',
  tags: [],
  value: {

  },
}

const guardianDefenders: ObjectEntity = {
  children: [
    {
      children: [],
      definition: 'cost',
      name: 'unit-cost',
      tags: [],
      value: {
        amount: 3,
        kind: 'power-rating',
      },
    },
    {
      children: [],
      definition: 'cost',
      name: 'unit-cost',
      tags: [],
      value: {
        amount: 3,
        kind: 'points',
      },
    }
  ],
  name: 'aeldari-craftworlds-guardian-defenders',
  definition: 'object',
  tags: [],
  value: {

  },
}
