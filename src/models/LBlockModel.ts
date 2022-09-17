import commonUtil from '../utilities/CommonUtil'
import { EqresType, GlobalConst, KblockConst } from '../constants/GlobalConst'
import KDashBlockLBlockModel from './KDashBlockLBlockModel'
import KDashBlockModel from './KDashBlockModel'
import ModelBase from './ModelBase'

////////////////////////////////////////////////////////////////
///
/// System: SUPREME Client
/// Function: Lブロックモデル
/// Description: Lブロックのモデル
///
////////////////////////////////////////////////////////////////

/// <summary>
/// Lブロック Model
/// </summary>
export default class LBlockModel extends ModelBase {
  /// <summary>
  /// Kブロック番号
  /// </summary>
  public KBlockNo = 0
  /// <summary>
  /// Lブロック番号
  /// </summary>
  public LBlockNo = 0
  /// <summary>
  /// 遮断基準SI値
  /// </summary>
  public ShutoffBorderSi = 0
  /// <summary>
  /// 需要家件数
  /// (サーバ側で「需要家件数」項目に 調停件数(実体は、開栓済みメータ数) を格納)
  /// </summary>
  public CustomerCnt = 0
  /// <summary>
  /// 調停件数
  /// </summary>
  public MediatedCnt = 0
  /// <summary>
  /// 代表位置(マッピング座標x)
  /// </summary>
  public MappingX = 0
  /// <summary>
  /// 代表位置(マッピング座標y)
  /// </summary>
  public MappingY = 0
  /// <summary>
  /// 表示範囲(マッピング座標北西x)
  /// </summary>
  public MappingStartX = 0
  /// <summary>
  /// 表示範囲(マッピング座標北西y)
  /// </summary>
  public MappingStartY = 0
  /// <summary>
  /// 表示範囲(マッピング座標南東x)
  /// </summary>
  public MappingEndX = 0
  /// <summary>
  /// 表示範囲(マッピング座標南東y)
  /// </summary>
  public MappingEndY = 0
  /// <summary>
  /// 耐震ブロック種別
  /// </summary>
  public EqresType: EqresType | null = null
  /// <summary>
  /// エリア情報(ex.30:西部導管_40:北部導管_10:南部導管)
  /// </summary>
  public AreaInfo = ''
  /// <summary>
  /// 液状化フラグ
  /// </summary>
  public IsLq: boolean | null = null
  /// <summary>
  /// 管理ブロックフラグ
  /// </summary>
  public IsManage: boolean | null = null
  /// <summary>
  /// 指定ブロックフラグ
  /// </summary>
  public IsDesignate: boolean | null = null
  /// <summary>
  /// コメント
  /// </summary>
  public Comment = ''
  /// <summary>
  /// 津波ブロックフラグ
  /// </summary>
  public IsTsunami: boolean | null = null
  // #region CSVにない項目
  /// <summary>
  /// 遮断対象としてチェックされているかどうか
  /// </summary>
  public IsChecked = false
  // /// <summary>
  // /// 遮断対象としてチェックされているかどうか(停止実施連絡書印刷用)
  // /// </summary>
  // public bool IsCheckedForPrint { get; set; }
  // /// <summary>
  // /// 遠隔開巡回対象としてチェックされているかどうか(遠隔開巡回依頼画面からの指定)
  // /// </summary>
  // public bool IsOpenPatrolCheckedForPrint { get; set; }
  // /// <summary>
  // /// 遠隔開巡回対象としてチェックされているかどうか(遠隔開巡回実施連絡書印刷用)
  // /// </summary>
  // public bool IsOpenPatrolCheckedForPrintTarget { get; set; }
  // /// <summary>
  // /// 前回遠隔開状況更新日時
  // /// </summary>
  // public DateTime? BeforePilotOpenReqUpdatedAt { get; set; }
  // /// <summary>
  // /// 遠隔開巡回実施連絡書印刷依頼時刻(依頼したクライアント時刻)
  // /// </summary>
  // public DateTime? PrintRequestTime { get; set; }
  // /// <summary>
  // /// 遠隔開巡回実施連絡書印刷依頼印刷区分(依頼した印刷区分)
  // /// </summary>
  // public int PrintRequestPrintingDivision { get; set; }
  // /// <summary>
  // /// 遠隔開巡回対象としてチェックされているかどうか
  // /// </summary>
  // public bool IsOpenPatrolChecked { get; set; }
  // /// <summary>
  // /// 外管被害数(累計)
  // /// </summary>
  // public int AccumulatedLpDmg { get; set; }
  /// <summary>
  /// ブロック名
  /// </summary>
  public get Name(): string {
    return this.KBlockNo >= KblockConst.INVALID_KBLOCK_NO
      ? '-'
      : 'K' + this.KBlockNo + 'L' + this.LBlockNo
  }

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
  //         List<CsaModel> csaModels = ModelManager.GetList<CsaModel>(o => o.KBlockNo == this.KBlockNo && o.LBlockNo == this.LBlockNo);
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
  // /// 表示範囲中心座標X
  // /// </summary>
  // public int MappingCenterX
  // {
  //     get { return (MappingStartX + MappingEndX) / 2; }
  // }
  // /// <summary>
  // /// 表示範囲中心座標Y
  // /// </summary>
  // public int MappingCenterY
  // {
  //     get { return (MappingStartY + MappingEndY) / 2; }
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
  // /// <summary>
  // /// 各エリアの拠点番号と名称のペア
  // /// </summary>
  // public Dictionary<int, string> Areas
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
  // /// エリア番号(停止権限上位優先)
  // /// </summary>
  // public int? AreaNo
  // {
  //     get
  //     {
  //         int? areaNo = null;
  //         foreach (var v in Areas)
  //         {
  //             areaNo = v.Key;
  //             break;
  //         }
  //         return areaNo;
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
  /// <summary>
  /// Kブロック名(複数)リスト
  /// </summary>
  public getAllKBlockNameList(
    kDashBlockLBlockList: KDashBlockLBlockModel[],
    kDashBlockList: KDashBlockModel[]
  ): string[] {
    const result: string[] = []
    const klList: KDashBlockLBlockModel[] = kDashBlockLBlockList.filter(
      (o) => o.LBlockId === this.Key
    )
    for (const kl of klList) {
      const k: KDashBlockModel = kDashBlockList.find((o) => o.Key === kl.KDashBlockId)!
      result.push(k.LabelKDashNo)
    }
    result.sort()
    return result
  }
  /// <summary>
  /// Kブロック名(複数)
  /// </summary>
  public getAllKBlockName(
    kDashBlockLBlockList: KDashBlockLBlockModel[],
    kDashBlockList: KDashBlockModel[]
  ): string {
    let result = ''
    for (const s of this.getAllKBlockNameList(kDashBlockLBlockList, kDashBlockList)) {
      if (result !== '') result += ', '
      result += s
    }
    return result
  }
  /// <summary>
  /// Kブロック名(複数)リスト（ソート用）
  /// </summary>
  public getAllKBlockNameListForSort(
    kDashBlockLBlockList: KDashBlockLBlockModel[],
    kDashBlockList: KDashBlockModel[]
  ): string[] {
    const result: string[] = []
    const klList: KDashBlockLBlockModel[] = kDashBlockLBlockList.filter(
      (o) => o.LBlockId === this.Key
    )
    for (const kl of klList) {
      const k = kDashBlockList.find((o) => o.Key === kl.KDashBlockId)
      result.push(k!.LabelKDashNoForSort)
    }
    result.sort()
    return result
  }
  // /// <summary>
  // /// Kブロック名(複数)（ソート用）
  // /// </summary>
  // public string AllKBlockNameForSort
  // {
  //     get
  //     {
  //         string result = "";
  //         foreach (string s in AllKBlockNameListForSort)
  //         {
  //             if (result != "") result += ", ";
  //             result += s;
  //         }
  //         return result;
  //     }
  // }
  // /// <summary>
  // /// K'ブロックID(複数)
  // /// </summary>
  // public List<int> AllKDashBlockId
  // {
  //     get
  //     {
  //         List<int> result = new List<int>();
  //         List<KDashBlockLBlockModel> klList = ModelManager.GetList<KDashBlockLBlockModel>(o => o.LBlockId == Key);
  //         foreach (var kl in klList)
  //         {
  //             result.Add(kl.KDashBlockId);
  //         }
  //         return result;
  //     }
  // }
  // /// <summary>
  // /// 行政区名(神奈川県 横浜市西区,横浜市中区)
  // /// </summary>
  // public string GyouseikuName {
  //     get
  //     {
  //         string gyouseikuName = "";
  //         for (int i = 8; i <= 14; i++)
  //         {
  //             string gyouseikuToken = "";
  //             foreach (var rel in ModelManager.GetList<SblockGyouseikuCustomersModel>(rel => rel.LBlockId == this.Key && rel.GyouseikuCode.ToString().IndexOf(i.ToString()) == 0 && rel.GyouseikuCode != GlobalConst.OTHER_GYOUSEIKU).GroupBy(rel => (rel.GyouseikuCode)))
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
  /// <summary>
  /// ブロック区分のリスト
  /// </summary>
  public get BlockCategoryList() {
    const list = []
    if (this.IsDesignate === true)
      list.push(
        GlobalConst.BLOCK_CATEGORY_DICT.get(
          GlobalConst.BlockCategory[GlobalConst.BlockCategory.Designate]
        )
      )
    if (this.IsLq === true)
      list.push(
        GlobalConst.BLOCK_CATEGORY_DICT.get(GlobalConst.BlockCategory[GlobalConst.BlockCategory.Lq])
      )
    if (this.IsTsunami === true)
      list.push(
        GlobalConst.BLOCK_CATEGORY_DICT.get(
          GlobalConst.BlockCategory[GlobalConst.BlockCategory.Tsunami]
        )
      )
    // 首都中枢の場合
    if (commonUtil.IsCapitalOfCentralBlock(this.Name))
      list.push(commonUtil.LabelCapitalOfCentralBlock())
    return list
  }
  /// <summary>
  /// 表示用ラベル: ブロック区分
  /// </summary>
  public get LabelBlockCategory(): string {
    let str = ''
    for (const blockCategory of this.BlockCategoryList) {
      if (str !== '') {
        str += ','
      }
      str += blockCategory
    }
    return str
  }
  // /// <summary>
  // /// Lブロック遮断依頼時刻（遮断完了判定に使用）
  // /// </summary>
  // public DateTime? ShutoffRequestTime { get; set; }
  // /// <summary>
  // /// 遠隔遮断実施済チェック対象であるか
  // /// </summary>
  // public bool isShutoffFinishedCheck { get; set; }
  // /// <summary>
  // /// Lブロック遠隔開巡回依頼時刻（遠隔開巡回完了判定に使用）
  // /// </summary>
  // public DateTime? RemoteOpenPatrolRequestTime { get; set; }
  // /// <summary>
  // /// 遠隔開巡回実施済チェック対象であるか
  // /// </summary>
  // public bool isRemoteOpenPatrolFinishedCheck { get; set; }
  // #endregion
}
