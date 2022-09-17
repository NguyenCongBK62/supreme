import ModelBase from './ModelBase'

export default class ExtGaskojiInfoModel extends ModelBase {
  /// <summary>
  /// 工事着手時間
  /// </summary>
  GasWorkStartedAt: Date | null = null

  /// <summary>
  /// 工事完了時間
  /// </summary>
  GasWorkEndedAt: Date | null = null

  /// <summary>
  /// ガスIN開始時間
  /// </summary>
  GasInStartedAt: Date | null = null

  /// <summary>
  /// ガスIN完了時間
  /// </summary>
  GasInEndedAt: Date | null = null

  /// <summary>
  /// 地震モードID
  /// </summary>
  eqmodeId: number | null = null

  /// <summary>
  /// SブロックID
  /// </summary>
  sblockId: number | null = null
}
