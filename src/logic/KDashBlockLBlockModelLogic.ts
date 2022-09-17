////////////////////////////////////////////////////////////////
///
/// System: SUPREME Client
/// Function: Kブロック-Lブロックモデル取得
/// Description: Kブロック-Lブロックモデル取得ロジック
///
////////////////////////////////////////////////////////////////

import KDashBlockLBlockModel from '../models/KDashBlockLBlockModel'
import ModelBase from '../models/ModelBase'
import ModelLogic, { RequestType } from './ModelLogic'

/// <summary>
/// Kブロック-LブロックModel取得ロジック
/// </summary>
export default class KDashBlockLBlockModelLogic extends ModelLogic {
  /// <summary>
  /// コンストラクタ
  /// </summary>
  constructor() {
    super()
    this.resourceUri = 'kl_blocks.csv'
    this.requestType = RequestType.ModelZipFile
    this.HasPrimaryKey = false
    this.modelType = 'KDashBlockLBlockModel'
    this.logicName = 'KDashBlockLBlockModelLogic'
  }

  protected CreateModel(modelBase: ModelBase, data: string[], line: string): ModelBase {
    const model = modelBase as KDashBlockLBlockModel

    model.KDashBlockId = ModelLogic.ParseInt(data[0])
    model.LBlockId = ModelLogic.ParseInt(data[1])

    return model
  }

  protected CreateNewModel(): ModelBase {
    return new KDashBlockLBlockModel()
  }
}
