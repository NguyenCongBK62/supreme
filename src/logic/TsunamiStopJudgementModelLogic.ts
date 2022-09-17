import ModelBase from '../models/ModelBase'
import { TsunamiStopJudgementModel } from './../models/TsunamiStopJudgementModel'
import ModelLogic, { RequestType } from './ModelLogic'

export default class TsunamiStopJudgementModelLogic extends ModelLogic {
  constructor() {
    super()
    this.resourceUri = 'jgt_tsunami_stops.csv'
    this.requestType = RequestType.ModelZipFile
    this.modelType = 'TsunamiStopJudgementModel'
    this.logicName = 'TsunamiStopJudgementModelLogic'
  }
  protected CreateModel(modelBase: ModelBase, data: string[], line: string): ModelBase {
    const model: TsunamiStopJudgementModel = modelBase as TsunamiStopJudgementModel
    model.isWaterLevelAlarm = Boolean(Number(data[1]))
    model.isGiantTsunamiAlarm = Boolean(Number(data[2]))
    model.isStop = Boolean(Number(data[3]))
    return model
  }
  protected CreateNewModel(): ModelBase {
    return {} as TsunamiStopJudgementModel
  }
}
