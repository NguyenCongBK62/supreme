import Dexie, { Table } from 'dexie'
import BaseModel from './BaseModel'
import KDashBlockLBlockModel from './KDashBlockLBlockModel'
import KDashBlockModel from './KDashBlockModel'
import LBlockModel from './LBlockModel'
import LBlockValModel from './LBlockValModel'
import SBlockModel from './SBlockModel'
import SBlockValModel from './SBlockValModel'

export class SupremeDB extends Dexie {
  LBlockValModel!: Table<LBlockValModel, number>
  LBlockModel!: Table<LBlockModel, number>
  BaseModel!: Table<BaseModel, number>

  SBlockValModel!: Table<SBlockValModel, number>
  SBlockModel!: Table<SBlockModel, number>
  KDashBlockModel!: Table<KDashBlockModel, number>
  KDashBlockLBlockModel!: Table<KDashBlockLBlockModel, number>
  constructor() {
    super('SupremeDB')

    this.version(1.2).stores({
      LBlockValModel:
        '&Keys,' + Object.getOwnPropertyNames(new LBlockValModel()).join(',').toString(),
      LBlockModel: '&Keys,' + Object.getOwnPropertyNames(new LBlockModel()).join(',').toString(),
      BaseModel: '&Keys,' + Object.getOwnPropertyNames(new BaseModel()).join(',').toString(),
      SBlockValModel:
        '&Keys,' + Object.getOwnPropertyNames(new SBlockValModel()).join(',').toString(),
      SBlockModel: '&Keys,' + Object.getOwnPropertyNames(new SBlockModel()).join(',').toString(),
      KDashBlockModel:
        '&Keys,' + Object.getOwnPropertyNames(new KDashBlockModel()).join(',').toString(),
      KDashBlockLBlockModel:
        '&Keys,' + Object.getOwnPropertyNames(new KDashBlockLBlockModel()).join(',').toString(),
    })
  }
}

export const db = new SupremeDB()
