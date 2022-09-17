import ModelBase from './ModelBase'

export default class ExtKaisenInfoModel extends ModelBase {
  /// <summary>
  /// 地震モードID
  /// </summary>
  eqmodeId: number | null = null

  /// <summary>
  /// SブロックID
  /// </summary>
  sblockId: number | null = null

  /// <summary>
  /// 開栓数
  /// </summary>
  openMeterCnt: number | null = null

  /// <summary>
  /// 全メータ数
  /// </summary>
  meterCnt: number | null = null
}
