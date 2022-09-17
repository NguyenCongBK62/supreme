////////////////////////////////////////////////////////////////
///
/// System: SUPREME Client
/// Function: K細分化ブロックモデル取得
/// Description: K細分化ブロックモデル取得ロジック
///
////////////////////////////////////////////////////////////////

import CommonUtil from '../utilities/CommonUtil'
import KDashBlockModel from '../models/KDashBlockModel'
import ModelBase from '../models/ModelBase'
import KDashBlockLBlockModelLogic from './KDashBlockLBlockModelLogic'
import ModelLogic, { RequestType } from './ModelLogic'

/// <summary>
/// K細分化ブロックModel取得ロジック
/// </summary>
export default class KDashBlockModelLogic extends ModelLogic {
  /// <summary>
  /// コンストラクタ
  /// </summary>
  constructor() {
    super()
    // AddDependency<KDashBlockLBlockModelLogic>();
    // AddDependency<LBlockModelLogic>();

    new KDashBlockLBlockModelLogic().RequestData(true)

    this.resourceUri = 'kblocks.csv'
    this.requestType = RequestType.ModelZipFile
    this.modelType = 'KDashBlockModel'
    this.logicName = 'KDashBlockModelLogic'
  }

  protected CreateModel(modelBase: ModelBase, data: string[], line: string): ModelBase {
    const model = modelBase as KDashBlockModel

    model.KBlockNo = ModelLogic.ParseInt(data[1])
    model.KDashBlockNo = ModelLogic.ParseInt(data[2])
    model.Name = CommonUtil.GetStringWithBranchNotationDeleted(data[3])
    model.MpCustomerCnt = ModelLogic.ParseInt(data[4])
    model.SourceKDashBlockId = ModelLogic.ParseIntNullable(data[5])
    model.IsSingularlyDependent = ModelLogic.ParseBool(data[6])
    model.MappingX = ModelLogic.ParseInt(data[7])
    model.MappingY = ModelLogic.ParseInt(data[8])
    model.MappingStartX = ModelLogic.ParseInt(data[9])
    model.MappingStartY = ModelLogic.ParseInt(data[10])
    model.MappingEndX = ModelLogic.ParseInt(data[11])
    model.MappingEndY = ModelLogic.ParseInt(data[12])

    return model
  }

  protected CreateNewModel(): ModelBase {
    return new KDashBlockModel()
  }
}
