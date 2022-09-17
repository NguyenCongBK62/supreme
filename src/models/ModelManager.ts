import ModelLogic from '../logic/ModelLogic'
import { db } from '../models/db'
import ModelBase from '../models/ModelBase'

class ModelManager {
  /// <summary>
  /// 指定されたModelのオブジェクトを取得する
  /// </summary>
  /// <typeparam name="T">Modelクラス</typeparam>
  /// <param name="keys">Modelを特定するユニークキー値</param>
  /// <returns>指定されたidを持つModelオブジェクト</returns>
  // public Get<T>(type: string, key: number): T {
  //   return this.Get<T>(type, [key])
  // }

  /// <summary>
  /// 指定されたModelのオブジェクトを取得する
  /// </summary>
  /// <typeparam name="T">Modelクラス</typeparam>
  /// <param name="keys">Modelを特定するユニークキー値</param>
  /// <returns>指定されたidを持つModelオブジェクト</returns>
  // public Get<T>(modelType: string, keys: number) {
  //   if (!modelManager.IsLoaded(modelType)) return null

  //   const tables = db.tables
  //   let data: T | null = null
  //   for (const table of tables) {
  //     if (table.name === modelType) {
  //       data = table.where({ Keys: [keys] }).first()
  //       break
  //     }
  //   }
  //   return data
  // }
  GetDictionary(modelType: string) {
    throw new Error('Method not implemented.')
  }
  public Logics = new Map<string, ModelLogic>()
  public get LogicList(): ModelLogic[] {
    const list: ModelLogic[] = []
    this.Logics.forEach((logic) => {
      list.push(logic)
    })
    return list
  }
  LoadedModels: string[] = []
  async GetList<T>(modelType: string): Promise<T[]> {
    if (modelManager.IsLoaded(modelType)) return []
    const tables = db.tables
    let data: T[] = []
    for (const table of tables) {
      if (table.name === modelType) {
        data = await table.toArray()
      }
    }
    return data
  }
  public IsLoaded(type: string): boolean {
    return this.LoadedModels.find((modelType) => modelType === type) !== undefined
  }
  public Update(type: string, models: ModelBase[]): void {
    if (type == null) return

    // キャッシュされているデータを廃棄する
    // this.ClearCache(type)
    // キャッシュに追加する

    const tables = db.tables
    for (const table of tables) {
      if (table.name === type) {
        table.clear()
        table.bulkPut(models)
        break
      }
    }
  }
  public ClearCache(type: string) {
    const tables = db.tables
    for (const table of tables) {
      if (table.name === type) {
        table.clear()
        break
      }
    }
  }
}
const modelManager = new ModelManager()
export { modelManager }
