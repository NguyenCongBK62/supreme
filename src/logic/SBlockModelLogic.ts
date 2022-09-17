////////////////////////////////////////////////////////////////
///
/// System: SUPREME Client
/// Function: Sブロックモデル取得
/// Description: Sブロックモデル取得ロジック
///
////////////////////////////////////////////////////////////////

import commonUtil from '../utilities/CommonUtil'
import { EqresType } from '../constants/GlobalConst'
import ModelBase from '../models/ModelBase'
import SBlockModel from '../models/SBlockModel'
import ModelLogic, { RequestType } from './ModelLogic'

/// <summary>
/// SブロックModel取得ロジック
/// </summary>
export default class SBlockModelLogic extends ModelLogic {
  /// <summary>
  /// コンストラクタ
  /// </summary>
  constructor() {
    super()
    this.resourceUri = 'sblocks.csv'
    this.requestType = RequestType.ModelZipFile
    this.modelType = 'SBlockModel'
    this.logicName = 'SBlockModelLogic'
  }

  protected CreateModel(modelBase: ModelBase, data: string[], line: string): ModelBase {
    const model = modelBase as SBlockModel

    model.KBlockNo = ModelLogic.ParseInt(data[1])
    model.LBlockNo = ModelLogic.ParseInt(data[2])
    model.SBlockNo = ModelLogic.ParseInt(data[3])
    model.EqresType = ModelLogic.ParseInt(data[4]) as EqresType
    model.CustomerCnt = ModelLogic.ParseInt(data[5])
    model.MediatedCnt = ModelLogic.ParseInt(data[6])
    model.MappingX = ModelLogic.ParseInt(data[7])
    model.MappingY = ModelLogic.ParseInt(data[8])
    model.MappingStartX = ModelLogic.ParseInt(data[9])
    model.MappingStartY = ModelLogic.ParseInt(data[10])
    model.MappingEndX = ModelLogic.ParseInt(data[11])
    model.MappingEndY = ModelLogic.ParseInt(data[12])
    model.TubeCapacity = ModelLogic.ParseIntNullable(data[13])
    model.InmeterCnt = ModelLogic.ParseIntNullable(data[14])
    model.SblockUpdatedAt = ModelLogic.ParseDateTimeNullable(data[15])
    model.LpLen1 = ModelLogic.ParseDoubleNullable(data[16])
    model.LpLen2 = ModelLogic.ParseDoubleNullable(data[17])
    model.LpLen3 = ModelLogic.ParseDoubleNullable(data[18])
    model.LpLen4 = ModelLogic.ParseDoubleNullable(data[19])
    model.LpLen5 = ModelLogic.ParseDoubleNullable(data[20])
    model.LpLen6 = ModelLogic.ParseDoubleNullable(data[21])
    model.AreaInfo = commonUtil.GetStringWithBranchNotationDeleted(data[22])
    model.NcInfo = commonUtil.GetStringWithBranchNotationDeleted(data[23])
    return model
  }

  protected override CreateNewModel(): ModelBase {
    return new SBlockModel()
  }
}
