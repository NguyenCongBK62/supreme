import ModelBase from './ModelBase'

/**津波供給停止判断結果Model */
export class TsunamiStopJudgementModel extends ModelBase {
  id?: number | string
  isWaterLevelAlarm?: boolean
  isGiantTsunamiAlarm?: boolean
  isStop?: boolean
  isPopup = true
}
