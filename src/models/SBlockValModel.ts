import CommonUtil from '../utilities/CommonUtil'
import { LpDmgCntConst, OpenState, ShutoffState } from '../constants/GlobalConst'
import LBlockValModel from './LBlockValModel'
import ModelBase from './ModelBase'
import SBlockModel from './SBlockModel'

export default class SBlockValModel extends ModelBase {
  /// <summary>
  /// SブロックID
  /// </summary>
  SBlockId!: number

  /// <summary>
  /// LブロックID
  /// </summary>
  LBlockId!: number

  /// <summary>
  /// ガバナ数
  /// </summary>
  GovCnt!: number

  /// <summary>
  /// 供給停止数
  /// </summary>
  StopCnt!: number

  /// <summary>
  /// 供給停止数(1度でも停止したガバナ数)
  /// </summary>
  PastShuttoffGovCnt!: number

  /// <summary>
  /// 継続数
  /// </summary>
  ContinuanceCnt!: number

  /// <summary>
  /// 未確認数
  /// </summary>
  UnconfirmedCnt!: number

  /// <summary>
  /// 遮断率
  /// </summary>
  ShutoffRate!: number

  /// <summary>
  /// MPA最小
  /// </summary>
  MpaMin: number | null = null

  /// <summary>
  /// MPB最小
  /// </summary>
  MpbMin: number | null = null

  /// <summary>
  /// LP最小
  /// </summary>
  LpMin: number | null = null

  /// <summary>
  /// LP最小(単独除く)
  /// </summary>
  LpMinConnected: number | null = null

  /// <summary>
  /// LP平均
  /// </summary>
  LpAve: number | null = null

  /// <summary>
  /// LP平均(単独除く)
  /// </summary>
  LpAveConnected: number | null = null

  /// <summary>
  /// 遠隔遮断状況
  /// </summary>
  ShutoffStatus!: ShutoffState

  /// <summary>
  /// 遮断対象数
  /// </summary>
  ShutoffTargetCnt!: number

  /// <summary>
  /// 遮断状況：成功数
  /// </summary>
  ShutoffSuccessCnt!: number

  /// <summary>
  /// 遮断状況：失敗数
  /// </summary>
  ShutoffFailedCnt!: number

  /// <summary>
  /// 遮断依頼時刻
  /// </summary>
  ShutoffRequestedAt: Date | null = null

  /// <summary>
  /// 遮断終了時刻
  /// </summary>
  ShutoffEndedAt: Date | null = null

  /// <summary>
  /// 遠隔遮断不可能数
  /// </summary>
  ShutoffUnableCnt!: number

  /// <summary>
  /// 遮断状況：遮断済数(依頼前から)
  /// </summary>
  ShutoffDoneCnt!: number

  /// <summary>
  /// 遠隔遮断状況(ﾊﾟｲﾛｯﾄ)
  /// </summary>
  PilotShutoffStatus!: ShutoffState

  /// <summary>
  /// 遮断対象数(ﾊﾟｲﾛｯﾄ)
  /// </summary>
  PilotShutoffTargetCnt!: number

  /// <summary>
  /// 遮断状況：成功数(ﾊﾟｲﾛｯﾄ)
  /// </summary>
  PilotShutoffSuccessCnt!: number

  /// <summary>
  /// 遮断状況：失敗数(ﾊﾟｲﾛｯﾄ)
  /// </summary>
  PilotShutoffFailedCnt!: number

  /// <summary>
  /// 遮断依頼時刻(ﾊﾟｲﾛｯﾄ)
  /// </summary>
  PilotShutoffRequestedAt: Date | null = null

  /// <summary>
  /// 遮断終了時刻(ﾊﾟｲﾛｯﾄ)
  /// </summary>
  PilotShutoffEndedAt: Date | null = null

  /// <summary>
  /// 遠隔遮断不可能数(ﾊﾟｲﾛｯﾄ)
  /// </summary>
  PilotShutoffUnableCnt!: number

  /// <summary>
  /// 遮断状況：遮断済数(依頼前から)(ﾊﾟｲﾛｯﾄ)
  /// </summary>
  PilotShutoffDoneCnt!: number

  /// <summary>
  /// 遠隔遮断状況(ﾊﾟｲﾛｯﾄ開)
  /// </summary>
  PilotOpenStatus!: OpenState

  /// <summary>
  /// 遮断対象数(ﾊﾟｲﾛｯﾄ開)
  /// </summary>
  PilotOpenTargetCnt!: number

  /// <summary>
  /// 遮断状況：成功数(ﾊﾟｲﾛｯﾄ開)
  /// </summary>
  PilotOpenSuccessCnt!: number

  /// <summary>
  /// 遮断状況：失敗数(ﾊﾟｲﾛｯﾄ開)
  /// </summary>
  PilotOpenFailedCnt: number | null = null

  /// <summary>
  /// 遮断依頼時刻(ﾊﾟｲﾛｯﾄ開)
  /// </summary>
  PilotOpenRequestedAt: Date | null = null

  /// <summary>
  /// 遮断終了時刻(ﾊﾟｲﾛｯﾄ開)
  /// </summary>
  PilotOpenEndedAt: Date | null = null

  /// <summary>
  /// 遠隔遮断不可能数(ﾊﾟｲﾛｯﾄ開)
  /// </summary>
  PilotOpenUnableCnt: number | null = null

  /// <summary>
  /// 遮断状況：遮断済数(依頼前から)(ﾊﾟｲﾛｯﾄ開)
  /// </summary>
  PilotOpenDoneCnt: number | null = null

  /// <summary>
  /// 液状化警報率
  /// </summary>
  LqAlarmRate: number | null = null

  /// <summary>
  /// 停電率
  /// </summary>
  PowerFailureRate!: number

  /// <summary>
  /// 圧力状況1 件数
  /// LP >= 1.0のガバナ数
  /// </summary>
  LpStatus1Cnt: number | null = null

  /// <summary>
  /// 圧力状況2 件数
  /// 0.8 <= LP < 1.0のガバナ数
  /// </summary>
  LpStatus2Cnt: number | null = null

  /// <summary>
  /// 圧力状況3 件数
  /// 0.3 <= LP < 0.8のガバナ数
  /// </summary>
  LpStatus3Cnt: number | null = null

  /// <summary>
  /// 圧力状況4 件数
  /// 0.0 <= LP < 0.3のガバナ数
  /// </summary>
  LpStatus4Cnt: number | null = null

  /// <summary>
  /// 圧力状況5 件数
  /// LP未確認のガバナ数
  /// </summary>
  LpStatus5Cnt: number | null = null

  /// <summary>
  /// 圧力状況1N 件数
  /// LP >= 遠隔再稼働可能な2次圧閾値のガバナ数
  /// </summary>
  LpStatus1nCnt: number | null = null

  /// <summary>
  /// 圧力状況2N 件数
  /// 0.0 <= LP < 遠隔再稼働可能な2次圧閾値のガバナ数
  /// </summary>
  LpStatus2nCnt: number | null = null

  /// <summary>
  /// 供給継続判断結果
  /// </summary>
  ContinueJudgeResult: number | null = null

  /// <summary>
  /// 最大SI
  /// </summary>
  MaxSi: number | null = null

  /// <summary>
  /// 平均SI
  /// </summary>
  AveSi: number | null = null

  /// <summary>
  /// 低圧導管被害数
  /// 低圧導管被害レベルの算出基準値
  /// </summary>
  LpDmgCnt: number | null = null

  /// <summary>
  /// 低圧導管被害率
  /// </summary>
  LpDmgRate: number | null = null

  /// <summary>
  /// 建物全半壊数
  /// </summary>
  ComppartDstrCnt!: number

  /// <summary>
  /// 建物全半壊率
  /// 建物被害レベルの算出基準値、凡例は％で設定するため100倍する必要あり
  /// </summary>
  ComppartDstrRate!: number

  /// <summary>
  /// 30Kine超過率
  /// </summary>
  Over30KineRate: number | null = null

  /// <summary>
  /// 50Kine超過率
  /// </summary>
  Over50KineRate: number | null = null

  /// <summary>
  /// 60Kine超過率
  /// </summary>
  Over60KineRate: number | null = null

  /// <summary>
  /// 70Kine超過率
  /// </summary>
  Over70KineRate: number | null = null

  /// <summary>
  /// 80Kine超過率
  /// </summary>
  Over80KineRate: number | null = null

  /// <summary>
  /// 90Kine超過率
  /// </summary>
  Over90KineRate: number | null = null

  /// <summary>
  /// 遠隔D復旧依頼画面に表示可能なSブロックであるか(基本条件)(旧版の表示可否情報を基本条件として引き続き用いる)
  /// </summary>
  IsShowGovResumeListBase!: boolean

  /// <summary>
  /// SSV一斉遮断依頼画面に表示可能なSブロックであるか
  /// </summary>
  IsShowSsvAllShutoffList!: boolean

  /// <summary>
  /// ガバナ遮断状況(SSV開 & BSV閉のガバナ数)
  /// </summary>
  GovShutoffStatusCnt!: number

  /// <summary>
  /// D復旧済Sブロックであるか
  /// </summary>
  IsDRestorationDone!: boolean

  /// <summary>
  /// 直近の判定結果がD判定であるか
  /// </summary>
  IsRestrationJudgementD!: boolean
  /// <summary>
  /// 供給停止しているかどうか
  /// </summary>
  IsStopped!: boolean

  // #region CSVにない項目

  // /// <summary>
  // /// Sブロック情報への参照
  // /// </summary>
  // public SBlockModel SBlock { get { return ModelManager.Get<SBlockModel>(this.SBlockId); } }
  //Add:
  public getSBlock(sBlockModelList: SBlockModel[]): SBlockModel | null {
    const SBlock = sBlockModelList.find((o) => o.Key === this.SBlockId)
    if (SBlock === undefined) return null
    return SBlock
  }

  // /// <summary>
  // /// L毎観測値情報への参照
  // /// </summary>
  // public LBlockValModel LBlockVal { get { return ModelManager.Get<LBlockValModel>(this.LBlockId); } }
  //Add:
  public getLBlockVal(lblockValList: LBlockValModel[]): LBlockValModel | null {
    const LBlockValModel = lblockValList.find((o) => o.Key === this.LBlockId)
    if (LBlockValModel === undefined) return null
    return LBlockValModel
  }
  /// <summary>
  /// Kブロック番号
  /// </summary>
  public getKBlockNo(sBlockModelList: SBlockModel[]) {
    const SBlock = this.getSBlock(sBlockModelList)
    return SBlock != null ? SBlock.KBlockNo : 0
  }

  // /// <summary>
  // /// Lブロック番号
  // /// </summary>
  //  LBlockNo { get { return SBlock != null ? SBlock.:number | null = null

  // /// <summary>
  // /// Sブロック番号
  // /// </summary>
  //  SBlockNo { get { return SBlock != null ? SBlock.:number | null = null

  /// <summary>
  /// 火災件数
  /// </summary>
  public FireCnt: number | null = null

  /// <summary>
  /// 漏えい受付件数
  /// </summary>
  public LeakCnt: number | null = null

  // /// <summary>
  // /// 復旧状況
  // /// </summary>
  //  restorationWorkStatus :number | null = null

  /// <summary>
  /// 道路上の被害推定(本支管)
  /// </summary>
  MainTubeDmgCnt!: number

  /// <summary>
  /// 道路上の被害推定(供給管)
  /// </summary>
  SupplyTubeDmgCnt!: number

  /// <summary>
  /// 道路上の被害推定(合計)
  /// </summary>
  RoadTubeTotalDmgCnt!: number

  /// <summary>
  /// 敷地内の被害推定(灯外内管)
  /// </summary>
  InsideTubeOfOutsideLightDmgCnt!: number

  /// <summary>
  /// 敷地内の被害推定(屋内)
  /// </summary>
  InsideTubeDmgCnt!: number

  /// <summary>
  /// 敷地内の被害推定(合計)
  /// </summary>
  SiteTubeTotalDmgCnt!: number

  /// <summary>
  /// 道路上の被害推定(継続地区合計)
  /// </summary>
  public get LabelLpSupplyDmgCnt(): number {
    return this.IsStopped ? 0 : this.MainTubeDmgCnt
  }

  /// <summary>
  /// 道路上の被害推定(継続地区合計)(緊急)
  /// </summary>
  public get LabelLpSupplyDmgCntEmergency() {
    return this.IsStopped
      ? 0
      : CommonUtil.ToRoundUp(this.MainTubeDmgCnt * LpDmgCntConst.EMERGENCY_RATE)
  }

  // /// <summary>
  // /// 道路上の被害推定(継続地区合計)(一般)
  // /// </summary>
  //  LabelLpSupplyDmgCntCommon { get { return IsStopped ? 0 : MainTubeDmgCnt - (int)CommonUtil.ToRoundUp(MainTubeDmgCnt * :number | null = null

  // /// <summary>
  // /// 道路上の被害推定(継続地区累計)
  // /// </summary>
  //  SumLpSupplyDmgCnt :number | null = null

  // /// <summary>
  // /// 道路上の被害推定(継続地区累計) 閾値(1)超え
  // /// </summary>
  //  IsOverLpDmgCnt1 { get { return SumLpSupplyDmgCnt >= GlobalConst.THRESHOLD_SUM_DMG_CNT_1; } }

  // /// <summary>
  // /// 道路上の被害推定(継続地区累計) 閾値(2)超え
  // /// </summary>
  //  IsOverLpDmgCnt2 { get { return SumLpSupplyDmgCnt >= GlobalConst.THRESHOLD_SUM_DMG_CNT_2; } }

  // /// <summary>
  // /// 遮断率閾値超え
  // /// </summary>
  //  IsShutoffRateOver { get { return (ShutoffRate >= GlobalConst.THRESHOLD_SHUTOFF_RATE); } }

  // /// <summary>
  // /// ガバナ停止率閾値超え
  // /// </summary>
  //  IsGovStopRateOver { get { return (GovernorStopRate >= GlobalConst.THRESHOLD_GOV_STOP_RATE); } }

  // /// <summary>
  // /// LP最小閾値超え
  // /// </summary>
  //  IsLpMinConnectedOver { get { return (LpMinConnected < GlobalConst.THRESHOLD_LP_MIN); } }

  // /// <summary>
  // /// 停電率閾値超え
  // /// </summary>
  //  IsPowerFailureRateOver { get { return (PowerFailureRate >= GlobalConst.THRESHOLD_POWER_FAILURE_RATE); } }

  // /// <summary>
  // /// 漏えい受付件数(表示ラベル)
  // /// </summary>
  // public string LabelLeakCnt { get { return LeakCnt == null ? CommonUtil.GetNoData() : (LeakCnt < 0 ? "未連携" : ((int)LeakCnt).ToString("#,##0")); } }

  /// <summary>
  /// 漏えい受付件数(表示ラベル2)
  /// </summary>
  public get LabelLeakCnt2(): string {
    return this.LeakCnt == null || this.LeakCnt < 0
      ? CommonUtil.GetNoData()
      : this.LeakCnt.toFixed(3)
  }

  // /// <summary>
  // /// 火災件数(表示ラベル)
  // /// </summary>
  // public string LabelFireCnt { get { return FireCnt == null ? CommonUtil.GetNoData() : (FireCnt < 0 ? "未連携" : ((int)FireCnt).ToString("#,##0")); } }

  /// <summary>
  /// 火災受付件数(表示ラベル2)
  /// </summary>
  public get LabelFireCnt2(): string {
    return this.FireCnt === null || this.FireCnt < 0
      ? CommonUtil.GetNoData()
      : this.FireCnt.toFixed(3)
  }

  /// <summary>
  /// 漏えい遭遇率
  /// </summary>
  public getLeakEncounterRate(sblockList: SBlockModel[]) {
    return this.getContinueCustomerCnt(sblockList) === 0
      ? null
      : (this.LabelLpSupplyDmgCntEmergency / this.getContinueCustomerCnt(sblockList)) * 10000
  }

  /// <summary>
  /// 漏えい遭遇率（表示ラベル）
  /// </summary>
  public getLabelLeakEncounterRate(sblockList: SBlockModel[]): string {
    return this.getContinueCustomerCnt(sblockList) === 0
      ? CommonUtil.GetNoData()
      : CommonUtil.ToRoundUp(this.getLeakEncounterRate(sblockList)!, 3).toFixed(2)
  }

  // /// <summary>
  // /// 漏えい遭遇率（表示ラベル：ソート用）
  // /// </summary>
  // public string LabelLeakEncounterRate2 { get { return ContinueCustomerCnt == 0 ? CommonUtil.GetNoData() : String.Format("{000:0.00}", CommonUtil.ToRoundUp((double)LeakEncounterRate, 3)); } }

  // /// <summary>
  // /// 感震遮断しているかどうか
  // /// </summary>
  //  IsFeelEqShutoff
  // {
  //     get
  //     {
  //         bool result = false;
  //         if (LBlockVal == null) return result;

  //         if (IsStopped)
  //         {
  //             // この時点で、供給停止しているSブロックである
  //             if (LBlockVal.ShutoffStatus == ShutoffState.None)
  //             {
  //                 // 親L遮断依頼がなければ感震遮断
  //                 result = true;
  //             }
  //         }
  //         return result;
  //     }
  // }

  // /// <summary>
  // /// 供給停止とみなすエリアかどうか
  // /// </summary>
  //  IsConsiderSupplyStopArea
  // {
  //     get
  //     {
  //         bool result = false;
  //         if (LBlockVal == null) return result;

  //         if ((LBlockVal.ShutoffStatus != ShutoffState.None
  //             || LBlockVal.JudgeResult == (int)LBlockLpStopJudgementConst.JudgeResult.First) && IsDRestorationDone == false)
  //         {
  //             // 親Lが遮断依頼がある、または一次判定であれば、供給停止とみなすエリア(D復旧済Sは継続扱い)
  //             result = true;
  //         }
  //         return result;
  //     }
  // }

  // /// <summary>
  // /// Lブロック供給状態
  // /// </summary>
  // public LblockSupplyStatusType LblockSupplyStatus
  // {
  //     get
  //     {
  //         LblockSupplyStatusType result = LblockSupplyStatusType.Unknown;
  //         if (IsStopped)
  //         {
  //             result = IsFeelEqShutoff ? LblockSupplyStatusType.SupplyContinue : LblockSupplyStatusType.SupplyStop;
  //         }

  //         return result;
  //     }
  // }

  /// <summary>
  /// ガバナ停止率
  /// </summary>
  get GovernorStopRate() {
    return this.GovCnt !== 0 ? this.PastShuttoffGovCnt / this.GovCnt : 0
  }

  // /// <summary>
  // /// 表示用ラベル: Lブロック供給状態
  // /// </summary>
  // public string LabelLblockSupplyStatus
  // {
  //     get
  //     {
  //         string label;
  //         switch (LblockSupplyStatus)
  //         {
  //             case LblockSupplyStatusType.SupplyStop:
  //                 label = "停止Lブロック内";
  //                 break;
  //             case LblockSupplyStatusType.SupplyContinue:
  //                 label = "継続Lブロック内";
  //                 break;
  //             default:
  //                 label = "継続Lブロック内";
  //                 break;
  //         }

  //         return label;
  //     }
  // }

  // /// <summary>
  // /// 表示用ラベル: Lブロック供給状態(略称)
  // /// </summary>
  // public string LabelLblockSupplyStatusAbbrev
  // {
  //     get
  //     {
  //         string label;
  //         switch (LblockSupplyStatus)
  //         {
  //             case LblockSupplyStatusType.SupplyStop:
  //                 label = "停止";
  //                 break;
  //             case LblockSupplyStatusType.SupplyContinue:
  //                 label = "継続";
  //                 break;
  //             default:
  //                 label = "継続";
  //                 break;
  //         }

  //         return label;
  //     }
  // }

  // /// <summary>
  // /// 表示用ラベル: 供給継続判断結果
  // /// </summary>
  // public string LabelJudgeResult
  // {
  //     get
  //     {
  //         if (ContinueJudgeResult == (int)SBlockLpStopJudgementConst.ContinueJudgeResult.ContinueJudge)
  //             return "継続";
  //         else if (ContinueJudgeResult == (int)SBlockLpStopJudgementConst.ContinueJudgeResult.StopJudge)
  //             return "停止";
  //         else
  //             return "";
  //     }
  // }

  // /// <summary>
  // /// 表示用ラベル: 遮断率
  // /// </summary>
  // public string LabelShutoffRate { get { return Math.Floor(ShutoffRate * 100).ToString(); } }

  /// <summary>
  /// 表示用ラベル: 停電率
  /// </summary>
  public get LabelPowerFailureRate() {
    return CommonUtil.ToRoundUp(this.PowerFailureRate! * 100).toString()
  }

  // /// <summary>
  // /// 表示用ラベル: 液状化警報率
  // /// </summary>
  // public string LabelLqAlarmRate { get { return CommonUtil.ToRoundUp(LqAlarmRate * 100).ToString(); } }

  // /// <summary>
  // /// 表示用ラベル: 建物全半壊率
  // /// </summary>
  // public string LabelComppartDstrRate { get { return String.Format("{0:F1}", ComppartDstrRate * 100); } }

  // /// <summary>
  // /// 表示用ラベル: 遠隔遮断状況
  // /// </summary>
  // public string LabelShutoffStatus { get { return CommonUtil.GetShutoffStateName(ShutoffStatus); } }

  // /// <summary>
  // /// 表示用ラベル: 遠隔遮断状況(ﾊﾟｲﾛｯﾄ)
  // /// </summary>
  // public string LabelPilotShutoffStatus { get { return CommonUtil.GetShutoffStateName(PilotShutoffStatus); } }

  // /// <summary>
  // /// 表示用ラベル: 遠隔開状況(ﾊﾟｲﾛｯﾄ)
  // /// </summary>
  // public string LabelPilotOpenStatus { get { return CommonUtil.GetOpenStateName(PilotOpenStatus); } }

  // /// <summary>
  // /// 表示文字列(遮断依頼時刻)
  // /// </summary>
  // public string LabelShutoffRequestedAt { get { return CommonUtil.ToShortTimeString(ShutoffRequestedAt); } }

  // /// <summary>
  // /// 表示文字列(遮断終了時刻)
  // /// </summary>
  // public string LabelShutoffEndedAt { get { return CommonUtil.ToShortTimeString(ShutoffEndedAt); } }

  // /// <summary>
  // /// 表示文字列(遮断依頼時刻)(ﾊﾟｲﾛｯﾄ)
  // /// </summary>
  // public string LabelPilotShutoffRequestedAt { get { return CommonUtil.ToShortTimeString(PilotShutoffRequestedAt); } }

  // /// <summary>
  // /// 表示文字列(遮断終了時刻)(ﾊﾟｲﾛｯﾄ)
  // /// </summary>
  // public string LabelPilotShutoffEndedAt { get { return CommonUtil.ToShortTimeString(PilotShutoffEndedAt); } }

  // /// <summary>
  // /// 表示文字列(遠隔開依頼時刻)(ﾊﾟｲﾛｯﾄ)
  // /// </summary>
  // public string LabelPilotOpenRequestedAt { get { return CommonUtil.ToShortTimeString(PilotOpenRequestedAt); } }

  // /// <summary>
  // /// 表示文字列(遠隔開終了時刻)(ﾊﾟｲﾛｯﾄ)
  // /// </summary>
  // public string LabelPilotOpenEndedAt { get { return CommonUtil.ToShortTimeString(PilotOpenEndedAt); } }

  /// <summary>
  /// 表示文字列(最大SI)
  /// </summary>
  public get LabelMaxSi(): string {
    return this.MaxSi !== null ? CommonUtil.AnalogConvert(this.MaxSi) : CommonUtil.GetNoData()
  }

  // /// <summary>
  // /// 表示文字列(平均SI)
  // /// </summary>
  // public string LabelAveSi { get { return MaxSi != null ? CommonUtil.AnalogConvert(AveSi) : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示文字列(MPA最小)
  // /// </summary>
  // public string LabelMpaMin { get { return MpaMin != null ? MpaMin.Value.ToString("0.000") : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示文字列(MPB最小)
  // /// </summary>
  // public string LabelMpbMin { get { return MpbMin != null ? MpbMin.Value.ToString("0.000") : CommonUtil.GetNoData(); } }

  /// <summary>
  /// 表示文字列(LP最小)
  /// </summary>
  public get LabelLpMin() {
    return this.LpMin !== null ? this.LpMin.toFixed(3) : CommonUtil.GetNoData()
  }

  /// <summary>
  /// 表示文字列(LP最小(単独除く))
  /// </summary>
  public get LabelLpMinConnected(): string {
    return this.LpMinConnected !== null ? this.LpMinConnected.toFixed(3) : CommonUtil.GetNoData()
  }

  // /// <summary>
  // /// 表示文字列(LP平均)
  // /// </summary>
  // public string LabelLpAve { get { return LpAve != null ? LpAve.Value.ToString("0.000") : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示文字列(LP平均(単独除く))
  // /// </summary>
  // public string LabelLpAveConnected { get { return LpAveConnected != null ? LpAveConnected.Value.ToString("0.000") : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示文字列(本支管被害数))
  // /// </summary>
  // public string LabelMainTubeDmgCnt { get { return LpDmgCnt != null ? MainTubeDmgCnt.ToString("#,##0") : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示文字列(低圧導管被害率))
  // /// </summary>
  // public string LabelLpDmgRate { get { return LpDmgRate != null ? LpDmgRate.Value.ToString("0.00") : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示文字列(建物全半壊数))
  // /// </summary>
  // public string LabelComppartDstrCnt { get { return Math.Ceiling(ComppartDstrCnt).ToString("0"); } }

  /// <summary>
  /// 表示文字列(D復旧済であるか)
  /// </summary>
  public get LabelRemoteOpenCompleted() {
    return this.IsDRestorationDone === true ? '完了' : ''
  }

  // /// <summary>
  // /// 表示文字列(復旧状況)
  // /// </summary>
  // public string LabelRestorationWorkStatus
  // {
  //     get
  //     {
  //         string label;
  //         switch (restorationWorkStatus)
  //         {
  //             case (int)ExtGasKojiInfoConst.restorationWorkStatus.RestorationDone:
  //                 label = "復旧中";
  //                 break;
  //             case (int)ExtGasKojiInfoConst.restorationWorkStatus.GasWorkCompleted:
  //                 label = "工事完了";
  //                 break;
  //             case (int)ExtGasKojiInfoConst.restorationWorkStatus.RestorationCompleted:
  //                 label = "復旧完了";
  //                 break;
  //             default:
  //                 label = "";
  //                 break;
  //         }

  //         return label;
  //     }
  // }

  // /// <summary:nu>
  // /// 対象エリア(当該Sブロックの所属する消防庁担当エリア)
  // /// 0: 対象エリアなし 1: 東京都消防庁エリア 2:横浜市消防庁エリア 3:埼玉県消防局エリア 91:東京都と横浜市エリアに跨る場合 92:東京都と埼玉県エリアに跨る場合
  // /// </summary:nu | null = null
  // {
  //     get
  //     {
  //         bool targetArea = true;
  //         bool tokyoArea = false;
  //         bool yokohamaArea = false;
  //         bool saitamaArea = false;

  //         List<SblockGyouseikuCustomersModel> sgcList = ModelManager.GetList<SblockGyouseikuCustomersModel>(rel => rel.SBlockId == this.Key).ToList();

  //         if (sgcList == null || sgcList.Count() == 0)
  //             targetArea = false;
  //         else
  //         {
  //             foreach (var rel in sgcList)
  //             {
  //                 // 東京エリア外であるか(稲城市は東京消防庁の管轄外なので除く)
  //                 if (rel.GyouseikuCode < 13000 || rel.GyouseikuCode >= 14000 || rel.GyouseikuCode == 13225)
  //                     // 横浜エリア外であるか
  //                     if (rel.Name.Contains("横浜") == false)
  //                     {
  //                         // 埼玉エリア外であるか
  //                         if (rel.GyouseikuCode < 11000 || rel.GyouseikuCode >= 12000)
  //                         {
  //                             targetArea = false; // 一箇所でもエリア外なら、当該Sはエリア外
  //                             break;
  //                         }
  //                         else
  //                             saitamaArea = true;
  //                     }
  //                     else
  //                         yokohamaArea = true; // 横浜エリア
  //                 else
  //                     tokyoArea = true; // 東京エリア
  //             }
  //         }

  //         return (targetArea) ?
  //             ((tokyoArea && yokohamaArea) ? (int)GyouseikuCustomersConst.TargetArea.ToKyoAndYokohama :
  //             (tokyoArea && saitamaArea) ? (int)GyouseikuCustomersConst.TargetArea.TokyoAndSaitama :
  //             (tokyoArea) ? (int)GyouseikuCustomersConst.TargetArea.Tokyo :
  //             yokohamaArea ? (int)GyouseikuCustomersConst.TargetArea.Yokohama : (int)GyouseikuCustomersConst.TargetArea.Saitama)
  //             : (int)GyouseikuCustomersConst.TargetArea.None;
  //     }
  // }

  // /// <summary>
  // /// 遠隔D復旧依頼画面に表示可能なSブロックであるか(外部連携未取込分含む)
  // /// </summary>
  //  IsShowGovResumeList
  // {
  //     get
  //     {
  //         // 当該S配下のガバナすべての圧力が遠隔再稼働可能な2次圧閾値以上かつ、漏えい情報がnull以外は、表示対象
  //         return (IsShowGovResumeListBase && GovCnt == LpStatus1nCnt && (LeakCnt == 0 || LeakCnt < 0));
  //     }
  // }

  // /// <summary>
  // /// 遠隔D復旧依頼可能なSブロックであるか(現在の評価)
  // /// </summary>
  //  IsCurrentShowGovResumeList
  // {
  //     get
  //     {
  //         // 当該S配下のガバナすべての圧力が遠隔再稼働可能な2次圧閾値以上かつ、漏えい情報が共に0件は、表示対象
  //         return (IsShowGovResumeListBase && GovCnt == LpStatus1nCnt && LeakCnt == 0);
  //     }
  // }

  // /// <summary>
  // /// 遠隔D復旧依頼可能なSブロックであるか(前回の評価)
  // /// </summary>
  //  isLastShowGovResumeList { get; set; }

  /// <summary>
  /// 表示用ラベル: ガバナ停止率
  /// </summary>
  public get LabelGovernorStopRate(): string {
    return Math.floor(this.GovernorStopRate * 100).toString()
  }

  /// <summary:nu>
  /// 供給継続需要家件数
  /// </summary:nu | null = null
  //Add:
  public getContinueCustomerCnt(sblockList: SBlockModel[]): number {
    return this.GovernorStopRate === 1.0 ? 0 : this.getSBlock(sblockList)!.CustomerCnt
  }

  // #endregion
}
