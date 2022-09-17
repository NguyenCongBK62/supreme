/// <summary>
/// Modelクラスの基底クラス
/// </summary>
export default abstract class ModelBase {
  ///// <summary>
  ///// Modelを一意に特定できるユニークキー（ディクショナリのキー値として使用する）
  ///// </summary>
  //public int Key { get; set; }
  /// <summary>
  /// Modelを一意に特定できるユニークキー（ディクショナリのキー値として使用する）
  /// </summary>
  public get Key() {
    return this.Keys[0]
  }
  public set Key(value: number) {
    const keys = []
    keys.push(value)
    this.Keys = keys
  }

  /// <summary>
  /// Modelを一意に特定できるユニークキー（ディクショナリのキー値として使用する）
  /// </summary>
  Keys: number[] = []

  /// <summary>
  /// 将来の拡張用: 最終更新日時
  /// </summary>
  LastUpdatedAt: Date | string = ''

  /// <summary>
  /// コンストラクタ
  /// </summary>
  constructor() {
    // 仮実装
    this.LastUpdatedAt = new Date()
  }
}
