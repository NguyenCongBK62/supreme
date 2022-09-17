////////////////////////////////////////////////////////////////
///
/// System: SUPREME Client
/// Function: Sブロックモデル
/// Description: Sブロックのモデル
///
////////////////////////////////////////////////////////////////

import { EqresType, KblockConst } from '../constants/GlobalConst'
import ModelBase from './ModelBase'

/// <summary>
/// Sブロック Model
/// </summary>
export default class SBlockModel extends ModelBase {
  /// <summary>
  /// Kブロック番号
  /// </summary>
  KBlockNo!: number

  /// <summary>
  /// Lブロック番号
  /// </summary>
  LBlockNo!: number

  /**Sブロック番号 */
  SBlockNo!: number

  /**耐震ブロック種別 */
  EqresType!: EqresType

  /**
   * 需要家件数
   * (サーバ側で「需要家件数」項目に 調停件数(実体は、開栓済みメータ数) を格納)
   */
  CustomerCnt!: number

  /**調停件数 */
  MediatedCnt!: number

  /**代表位置(マッピング座標x) */
  MappingX!: number

  /// <summary>
  /// 代表位置(マッピング座標y)
  /// </summary>
  MappingY!: number

  /**表示範囲(マッピング座標北西x) */
  MappingStartX!: number

  /**表示範囲(マッピング座標北西y) */
  MappingStartY!: number

  /**表示範囲(マッピング座標南東x) */
  MappingEndX!: number

  /**表示範囲(マッピング座標南東y) */
  MappingEndY!: number

  /// <summary>
  /// 管体容量
  /// </summary>
  TubeCapacity: number | null = null

  /**インメータ個数 */
  InmeterCnt: number | null = null

  /// <summary>
  /// Sブロック更新時刻
  /// </summary>
  SblockUpdatedAt: Date | null = null

  /// <summary>
  /// 低圧導管延長集計(ねじ)
  /// </summary>
  LpLen1: number | null = null

  /**低圧導管延長集計(水道) */
  LpLen2: number | null = null

  /**低圧導管延長集計(ガス型) */
  LpLen3: number | null = null

  /**低圧導管延長集計(TM) */
  LpLen4: number | null = null

  /**低圧導管延長集計(メカ) */
  LpLen5: number | null = null

  /**低圧導管延長集計(その他PE等) */
  LpLen6: number | null = null

  /// <summary>
  /// エリア情報(ex.10:南部導管_10:南部導管)
  /// </summary>
  AreaInfo!: string

  /**NC情報(ex.12:中央NC_11:南部NC) */
  NcInfo!: string

  // #region CSVにない項目

  // /// <summary>
  // /// 遮断対象としてチェックされているかどうか
  // /// </summary>
  // public bool IsChecked { get; set; }

  // /// <summary>
  // /// 遮断対象としてチェックされた時間
  // /// </summary>
  // public DateTime? CheckedAt { get; set; }

  // /// <summary>
  // /// 遠隔D復旧対象としてチェックされているかどうか
  // /// </summary>
  // public bool IsResumeChecked { get; set; }

  // /// <summary>
  // /// 遠隔D復旧対象としてチェックされているかどうか(遠隔D復旧依頼画面からの指定)
  // /// </summary>
  // public bool IsResumeCheckedForPrint { get; set; }

  // /// <summary>
  // /// 遠隔D復旧対象としてチェックされているかどうか(遠隔D復旧実施連絡書印刷用)
  // /// </summary>
  // public bool IsResumeCheckedForPrintTarget { get; set; }

  // /// <summary>
  // /// 前回遠隔開状況更新日時
  // /// </summary>
  // public DateTime? BeforePilotOpenReqUpdatedAt { get; set; }

  // /// <summary>
  // /// D復旧実施連絡書印刷依頼時刻(依頼したクライアント時刻)
  // /// </summary>
  // public DateTime? PrintRequestTime { get; set; }

  // /// <summary>
  // /// D復旧実施連絡書印刷依頼印刷区分(依頼した印刷区分)
  // /// </summary>
  // public int PrintRequestPrintingDivision { get; set; }

  /// <summary>
  /// ブロック名
  /// </summary>
  public get Name(): string {
    return this.KBlockNo >= KblockConst.INVALID_KBLOCK_NO
      ? '-'
      : 'K' + this.KBlockNo + 'L' + this.LBlockNo + '-' + this.SBlockNo
  }

  // /// <summary>
  // /// 各エリアの拠点番号と名称のペア
  // /// </summary>
  // private Dictionary<int, string> Areas
  // {
  //     get
  //     {
  //         Dictionary<int, string> areas = new Dictionary<int, string>();
  //         if (AreaInfo != "NULL")
  //         {
  //             foreach (string area in AreaInfo.Split('_'))
  //             {
  //                 String[] info = area.Split(':');
  //                 if (!areas.ContainsKey(int.Parse(info[0])))
  //                     areas.Add(int.Parse(info[0]), info[1]);
  //             }
  //         }

  //         return areas;
  //     }
  // }

  // /// <summary>
  // /// エリア番号(複数)(ソート用)
  // /// </summary>
  // public int AllAreaNo
  // {
  //     get
  //     {
  //         string areaNoStr = "";
  //         foreach (var v in Areas)
  //         {
  //             areaNoStr += v.Key.ToString();
  //         }

  //         return int.Parse(areaNoStr.PadRight(6, '0'));
  //     }
  // }

  // /// <summary>
  // /// エリア名(複数)リスト
  // /// </summary>
  // public List<string> AllAreaNameList
  // {
  //     get
  //     {
  //         List<string> result = new List<string>();
  //         if (CommonUtil.IsBranch(this.KBlockNo))
  //         {
  //             var kDashBlock = ModelManager.GetList<KDashBlockModel>(m => m.KBlockNo == this.KBlockNo);
  //             if (kDashBlock.Count > 0)
  //                 result.Add(kDashBlock[0].Name);
  //         }
  //         else
  //         {
  //             string areaName = CommonUtil.ConvertAreaName(this.KBlockNo, "");
  //             if (areaName != "")
  //                 result.Add(areaName);
  //             else
  //             {
  //                 foreach (var v in Areas)
  //                     result.Add(v.Value.Replace("導管", ""));
  //             }
  //         }

  //         return result;
  //     }
  // }

  // /// <summary>
  // /// エリア名(複数)
  // /// </summary>
  // public string AllAreaName
  // {
  //     get
  //     {
  //         string result = "";
  //         foreach (string s in AllAreaNameList)
  //         {
  //             if (result != "") result += "、";
  //             result += s;
  //         }

  //         return result;
  //     }
  // }

  // /// <summary>
  // /// 各NCの拠点番号と名称のペア
  // /// </summary>
  // private Dictionary<int, string> Ncs
  // {
  //     get
  //     {
  //         Dictionary<int, string> ncs = new Dictionary<int, string>();
  //         if (NcInfo != "NULL")
  //         {
  //             foreach (string nc in NcInfo.Split('_'))
  //             {
  //                 String[] info = nc.Split(':');
  //                 ncs.Add(int.Parse(info[0]), info[1]);
  //             }
  //         }

  //         return ncs;
  //     }
  // }

  // /// <summary>
  // /// NC番号(ソート用)
  // /// </summary>
  // public int AllNcNo
  // {
  //     get
  //     {
  //         string ncNoStr = "";
  //         foreach (var v in Ncs)
  //         {
  //             ncNoStr += v.Key.ToString();
  //         }

  //         return int.Parse(ncNoStr.PadRight(6, '0'));
  //     }
  // }

  // /// <summary>
  // /// NC名称(複数)リスト
  // /// </summary>
  // public List<string> AllNcNameList
  // {
  //     get
  //     {
  //         List<string> result = new List<string>();
  //         if (CommonUtil.IsBranch(this.KBlockNo))
  //         {
  //             var kDashBlock = ModelManager.GetList<KDashBlockModel>(m => m.KBlockNo == this.KBlockNo);
  //             if (kDashBlock.Count > 0)
  //                 result.Add(kDashBlock[0].Name);
  //         }
  //         else
  //         {
  //             foreach (var v in Ncs)
  //                 result.Add(v.Value);
  //         }
  //         return result;
  //     }
  // }

  // /// <summary>
  // /// NC名称(複数)
  // /// </summary>
  // public string AllNcName
  // {
  //     get
  //     {
  //         string result = "";
  //         foreach (string s in AllNcNameList)
  //         {
  //             if (result != "") result += "、";
  //             result += s;
  //         }

  //         return result;
  //     }
  // }

  // /// <summary>
  // /// 行政区名(神奈川県 横浜市西区,横浜市中区)
  // /// </summary>
  // public string GyouseikuName
  // {
  //     get
  //     {
  //         string gyouseikuName = "";
  //         for (int i = 8; i <= 14; i++)
  //         {
  //             string gyouseikuToken = "";
  //             foreach (var rel in ModelManager.GetList<SblockGyouseikuCustomersModel>(rel => rel.SBlockId == this.Key && rel.GyouseikuCode.ToString().IndexOf(i.ToString()) == 0 && rel.GyouseikuCode != GlobalConst.OTHER_GYOUSEIKU).GroupBy(rel => (rel.GyouseikuCode)))
  //             {
  //                 if (gyouseikuToken != "") gyouseikuToken += ",";
  //                 gyouseikuToken += ModelManager.Get<GyouseikuModel>(rel.Key).Name;
  //             }
  //             if (gyouseikuToken != "")
  //             {
  //                 if (gyouseikuName != "") gyouseikuName += "$";
  //                 gyouseikuName += GlobalConst.TOKEN_NAME[i] + " " + gyouseikuToken;
  //             }
  //         }
  //         return gyouseikuName;
  //     }
  // }

  // /// <summary>
  // /// 高耐震ブロックかどうか
  // /// </summary>
  // public bool IsEqres
  // {
  //     get
  //     {
  //         return (this.EqresType != (int)EqresType.NotEqres);
  //     }
  // }

  // /// <summary>
  // /// 遮断設定値のリスト
  // /// </summary>
  // public List<string> ShutoffBorderSiList
  // {
  //     get
  //     {
  //         List<string> list = new List<string>();
  //         List<int> tmpShutoffBorderSiList = ModelManager.GetList<LBlockModel>().OrderBy(o => o.ShutoffBorderSi).Select(s => s.ShutoffBorderSi).Distinct().ToList();
  //         foreach (var shutoffBorderSi in tmpShutoffBorderSiList)
  //         {
  //             list.Add(shutoffBorderSi.ToString());
  //         }
  //         return list;
  //     }
  // }

  // /// <summary>
  // /// 感震遮断設定値のリスト
  // /// </summary>
  // public List<string> ShutoffSiList
  // {
  //     get
  //     {
  //         List<string> list = new List<string>();
  //         List<CsaModel> csaModels = ModelManager.GetList<CsaModel>(o => o.KBlockNo == this.KBlockNo && o.LBlockNo == this.LBlockNo && o.SBlockNo == this.SBlockNo);
  //         foreach (var shutoffSi in csaModels.GroupBy(o => o.ShutoffSi).OrderBy(o => o.Key))
  //         {
  //             if (shutoffSi.Key == null) continue;
  //             list.Add(shutoffSi.Key.ToString());
  //         }
  //         return list;
  //     }
  // }

  // /// <summary>
  // /// 表示用ラベル: 感震遮断設定値
  // /// </summary>
  // public string LabelShutoffSi
  // {
  //     get
  //     {
  //         string str = "";
  //         foreach (var shutoff_si in ShutoffSiList)
  //         {
  //             if (str != "") { str += ","; }
  //             str += shutoff_si;
  //         }
  //         return str;
  //     }
  // }

  // /// <summary>
  // /// 表示範囲幅
  // /// </summary>
  // public int MappingWidth
  // {
  //     get { return (MappingEndX - MappingStartX); }
  // }

  // /// <summary>
  // /// 表示範囲高さ
  // /// </summary>
  // public int MappingHeight
  // {
  //     get { return Math.Abs(MappingEndY - MappingStartY); }
  // }

  // #endregion
}
