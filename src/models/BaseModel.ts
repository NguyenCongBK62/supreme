import { BaseConst } from '../constants/GlobalConst'
import ModelBase from './ModelBase'

////////////////////////////////////////////////////////////////
///
/// System: SUPREME Client
/// Function: 拠点情報モデル
/// Description: 拠点情報のモデル
///
////////////////////////////////////////////////////////////////

/// <summary>
/// 拠点情報 Model
/// </summary>
export default class BaseModel extends ModelBase {
  /// <summary>
  /// 拠点番号
  /// </summary>
  public BaseNo = 0
  /// <summary>
  /// GICSコード
  /// </summary>
  public GicsCode: number | null = null
  /// <summary>
  /// 拠点名称
  /// </summary>
  public Name = ''
  /// <summary>
  /// 拠点略称
  /// </summary>
  public Abbrev = ''
  /// <summary>
  /// 拠点位置(マッピング座標x)
  /// </summary>
  public MappingX: number | null = null
  /// <summary>
  /// 拠点位置(マッピング座標y)
  /// </summary>
  public MappingY: number | null = null
  /// <summary>
  /// 表示範囲(マッピング座標左上x)
  /// </summary>
  public MappingStartX: number | null = null
  /// <summary>
  /// 表示範囲(マッピング座標左上y)
  /// </summary>
  public MappingStartY: number | null = null
  /// <summary>
  /// 表示範囲(マッピング座標右下x)
  /// </summary>
  public MappingEndX: number | null = null
  /// <summary>
  /// 表示範囲(マッピング座標右下y)
  /// </summary>
  public MappingEndY: number | null = null
  /// <summary>
  /// 拠点種別
  /// </summary>
  public BaseType: BaseConst.BaseType | null = null
  /// <summary>
  /// 所属拠点番号
  /// </summary>
  public ParentBaseNo: number | null = null
  // #region CSVにない項目
  // /// <summary>
  // /// 表示範囲幅
  // /// </summary>
  // public int MappingWidth
  // {
  //     get { return (MappingStartX != null && MappingEndX != null) ? (int)MappingEndX - (int)MappingStartX : 0; }
  // }
  // /// <summary>
  // /// 表示範囲高さ
  // /// </summary>
  // public int MappingHeight
  // {
  //     get { return (MappingStartY != null && MappingEndY != null) ? Math.Abs((int)MappingEndY - (int)MappingStartY) : 0; }
  // }
  // /// <summary>
  // /// 特定画面用の拠点並び替え番号
  // /// </summary>
  // public int SpecialBaseNo
  // {
  //     get
  //     {
  //         // 現在時点と過去地震時点での拠点番号が異なり、並び替え番号が取得できなかった場合
  //         if (!BaseConst.SpecialBaseNo.ContainsKey(BaseNo)) return BaseConst.SpecialBaseNo.Values.Max() + 1;
  //         return BaseConst.SpecialBaseNo[BaseNo];
  //     }
  // }
  // #endregion
}
