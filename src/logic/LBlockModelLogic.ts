import { EqresType } from '../constants/GlobalConst'
import { RequestType } from './ModelLogic'
import ModelBase from '../models/ModelBase'
import ModelLogic from './ModelLogic'
import LBlockModel from '../models/LBlockModel'
import commonUtil from '../utilities/CommonUtil'
import BaseModelLogic from './BaseModelLogic'
////////////////////////////////////////////////////////////////
///
/// System: SUPREME Client
/// Function: Lブロックモデル取得
/// Description: Lブロックモデル取得ロジック
///
////////////////////////////////////////////////////////////////

/// <summary>
/// LブロックModel取得ロジック
/// </summary>
export default class LBlockModelLogic extends ModelLogic {
  /// <summary>
  /// コンストラクタ
  /// </summary>
  constructor() {
    super()
    //TODO:
    // AddDependency<BaseModelLogic>();

    new BaseModelLogic().RequestData(true)
    this.resourceUri = 'lblocks.csv'
    this.requestType = RequestType.ModelZipFile
    this.modelType = 'LBlockModel'
    this.logicName = 'LBlockModelLogic'
  }

  protected CreateModel(modelBase: ModelBase, data: string[], line: string): ModelBase {
    const model = modelBase as LBlockModel

    model.KBlockNo = ModelLogic.ParseInt(data[1])
    model.LBlockNo = ModelLogic.ParseInt(data[2])
    model.ShutoffBorderSi = ModelLogic.ParseInt(data[3])
    model.CustomerCnt = ModelLogic.ParseInt(data[4])
    model.MediatedCnt = ModelLogic.ParseInt(data[5])
    model.MappingX = ModelLogic.ParseInt(data[6])
    model.MappingY = ModelLogic.ParseInt(data[7])
    model.MappingStartX = ModelLogic.ParseInt(data[8])
    model.MappingStartY = ModelLogic.ParseInt(data[9])
    model.MappingEndX = ModelLogic.ParseInt(data[10])
    model.MappingEndY = ModelLogic.ParseInt(data[11])
    model.EqresType = ModelLogic.ParseInt(data[12]) as EqresType
    model.AreaInfo = commonUtil.GetStringWithBranchNotationDeleted(data[13])
    model.IsLq = ModelLogic.ParseBoolNullable(data[14])
    model.Comment = data[15]
    model.IsManage = ModelLogic.ParseBoolNullable(data[16])
    model.IsDesignate = ModelLogic.ParseBoolNullable(data[17])
    model.IsTsunami = ModelLogic.ParseBoolNullable(data[18])
    return model
  }

  protected CreateNewModel(): ModelBase {
    return new LBlockModel()
  }
}
