import commonUtil from '../utilities/CommonUtil'
import { BaseConst } from '../constants/GlobalConst'
import BaseModel from '../models/BaseModel'
import ModelBase from '../models/ModelBase'
import ModelLogic, { RequestType } from './ModelLogic'
////////////////////////////////////////////////////////////////
///
/// System: SUPREME Client
/// Function: 拠点情報モデル取得
/// Description: 拠点情報モデル取得ロジック
///
////////////////////////////////////////////////////////////////

/// <summary>
/// 拠点情報Model取得ロジック
/// </summary>
export default class BaseModelLogic extends ModelLogic {
  /// <summary>
  /// コンストラクタ
  /// </summary>
  constructor() {
    super()
    this.resourceUri = 'bases.csv'
    this.requestType = RequestType.ModelZipFile

    this.modelType = 'BaseModel'
    this.logicName = 'BaseModelLogic'
  }

  /// <summary>
  /// CSVデータからModelオブジェクトを生成する
  /// </summary>
  /// <param name="modelBase">データを格納するModelオブジェクト</param>
  /// <param name="data">データ配列</param>
  /// <returns>Modelオブジェクト</returns>
  protected CreateModel(modelBase: ModelBase, data: string[], line: string): ModelBase {
    const model = modelBase as BaseModel
    model.BaseNo = commonUtil.ConvertBaseNoForPastEq(ModelLogic.ParseInt(data[0]))!
    model.GicsCode = ModelLogic.ParseIntNullable(data[1])
    model.Name = commonUtil.GetStringWithBranchNotationDeleted(data[2])
    model.Abbrev = commonUtil.GetStringWithBranchNotationDeleted(data[3])
    model.MappingX = ModelLogic.ParseIntNullable(data[4])
    model.MappingY = ModelLogic.ParseIntNullable(data[5])
    model.MappingStartX = ModelLogic.ParseIntNullable(data[6])
    model.MappingStartY = ModelLogic.ParseIntNullable(data[7])
    model.MappingEndX = ModelLogic.ParseIntNullable(data[8])
    model.MappingEndY = ModelLogic.ParseIntNullable(data[9])
    model.BaseType = ModelLogic.ParseIntNullable(data[10]) as BaseConst.BaseType | null
    model.ParentBaseNo = ModelLogic.ParseIntNullable(data[11])

    return model
  }

  protected CreateNewModel(): ModelBase {
    return new BaseModel()
  }
}
