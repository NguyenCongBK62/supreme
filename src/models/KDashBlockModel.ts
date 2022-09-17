////////////////////////////////////////////////////////////////
///
/// System: SUPREME Client
/// Function: K細分化ブロックモデル
/// Description: K細分化ブロックのモデル
///
////////////////////////////////////////////////////////////////

import ModelBase from './ModelBase'

/// <summary>
/// K細分化ブロック Model
/// </summary>
export default class KDashBlockModel extends ModelBase {
  /// <summary>
  /// Kブロック番号
  /// </summary>
  KBlockNo!: number
  /**K細分化ブロック番号 */
  KDashBlockNo!: number
  /**K'ブロック名称 */
  Name!: string
  /**中圧需要家件数 */
  MpCustomerCnt!: number
  /**供給源K'ブロックID */
  SourceKDashBlockId: number | null = null
  /**単独供給源依存フラグ */
  IsSingularlyDependent!: boolean
  /**代表位置(マッピング座標x) */
  MappingX!: number
  /**代表位置(マッピング座標y) */
  MappingY!: number
  /**表示範囲(マッピング座標北西x) */
  MappingStartX!: number
  /**表示範囲(マッピング座標北西y) */
  MappingStartY!: number
  /**表示範囲(マッピング座標南東x) */
  MappingEndX!: number
  /**表示範囲(マッピング座標南東y) */
  MappingEndY!: number
  //     #region CSVにない項目
  //     /// <summary>
  //     /// 供給源(依存している)のK'ブロックのリスト
  //     /// </summary>
  //     public List<KDashBlockModel> ParentKDashBlocks
  //     {
  //         get
  //         {
  //             return ModelManager.GetList<KDashBlockModel>(o => o.Key == this.SourceKDashBlockId);
  //         }
  //     }
  //     /// <summary>
  //     /// 依存されている(供給源にされている)K'ブロックのリスト
  //     /// </summary>
  //     public List<KDashBlockModel> ChildKDashBlocks
  //     {
  //         get
  //         {
  //             return ModelManager.GetList<KDashBlockModel>(o => o.SourceKDashBlockId == this.Key);
  //         }
  //     }
  //     /// <summary>
  //     /// Lブロックのリスト
  //     /// </summary>
  //     public List<LBlockModel> LBlocks
  //     {
  //         get
  //         {
  //             var list = new List<LBlockModel>();
  //             foreach (KDashBlockLBlockModel kdashl in ModelManager.GetList<KDashBlockLBlockModel>(m => m.KDashBlockId == this.Key))
  //                 list.Add(ModelManager.Get<LBlockModel>(kdashl.LBlockId));
  //             return list;
  //         }
  //     }
  /// <summary>
  /// K'番号 表示文字列
  /// </summary>
  public get LabelKDashNo(): string {
    return 'K' + this.KBlockNo + (this.KDashBlockNo !== 0 ? '-' + this.KDashBlockNo : '')
  }
  /// <summary>
  /// K'番号 表示文字列(ソート用)
  /// </summary>
  public get LabelKDashNoForSort(): string {
    return (
      'K' +
      this.KBlockNo.toString() +
      (this.KDashBlockNo !== 0 ? '-' + this.KDashBlockNo.toString() : '')
    )
  }
  //     /// <summary>
  //     /// 表示範囲中心座標X
  //     /// </summary>
  //     public int MappingCenterX
  //     {
  //         get { return (MappingStartX + MappingEndX) / 2; }
  //     }
  //     /// <summary>
  //     /// 表示範囲中心座標Y
  //     /// </summary>
  //     public int MappingCenterY
  //     {
  //         get { return (MappingStartY + MappingEndY) / 2; }
  //     }
  //     /// <summary>
  //     /// 表示範囲幅
  //     /// </summary>
  //     public int MappingWidth
  //     {
  //         get { return (MappingEndX - MappingStartX); }
  //     }
  //     /// <summary>
  //     /// 表示範囲高さ
  //     /// </summary>
  //     public int MappingHeight
  //     {
  //         get { return Math.Abs(MappingEndY - MappingStartY); }
  //     }
  //     /// <summary>
  //     /// 行政区名(神奈川県 横浜市西区,横浜市中区)
  //     /// </summary>
  //     public string GyouseikuName {
  //         get
  //         {
  //             var gyouseikuCodes = new List<int>();
  //             foreach (var lblock in this.LBlocks)
  //                 foreach (var rel in ModelManager.GetList<SblockGyouseikuCustomersModel>(rel => rel.LBlockId == lblock.Key).GroupBy(rel => (rel.GyouseikuCode)))
  //                     if (!gyouseikuCodes.Contains(rel.Key))
  //                         gyouseikuCodes.Add(rel.Key);
  //             string gyouseikuName = "";
  //             for (int i = 8; i <= 14; i++)
  //             {
  //                 string gyouseikuToken = "";
  //                 foreach (var id in gyouseikuCodes.Where(m => m.ToString().IndexOf(i.ToString()) == 0 && m != GlobalConst.OTHER_GYOUSEIKU).OrderBy(m => m.ToString()).ToList())
  //                 {
  //                     if (gyouseikuToken != "") gyouseikuToken += ",";
  //                     gyouseikuToken += ModelManager.Get<GyouseikuModel>(id).Name;
  //                 }
  //                 if (gyouseikuToken != "")
  //                 {
  //                     if (gyouseikuName != "") gyouseikuName += "$";
  //                     gyouseikuName += GlobalConst.TOKEN_NAME[i] + " " + gyouseikuToken;
  //                 }
  //             }
  //             return gyouseikuName;
  //         }
  //     }
  //     #endregion
  // }
}
