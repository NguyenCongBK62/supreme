import CommonUtil from '../utilities/CommonUtil'
import { LBlockLpStopJudgementConst, OpenState, ShutoffState } from '../constants/GlobalConst'
import LBlockModel from './LBlockModel'
import ModelBase from './ModelBase'
import SBlockModel from './SBlockModel'
import SBlockValModel from './SBlockValModel'

export default class LBlockValModel extends ModelBase {
  /// <summary>
  /// LブロックID
  /// </summary>
  LBlockId = 0

  /// <summary>
  /// ガバナ数
  /// </summary>
  GovCnt = 0

  /// <summary>
  /// 供給停止数
  /// </summary>
  StopCnt = 0

  /// <summary>
  /// 供給停止数(1度でも停止したガバナ数)
  /// </summary>
  PastShuttoffGovCnt = 0

  /// <summary>
  /// 継続数
  /// </summary>
  ContinuanceCnt = 0

  /// <summary>
  /// 未確認数
  /// </summary>
  UnconfirmedCnt = 0

  /// <summary>
  /// 遮断率
  /// </summary>
  ShutoffRate = 0.0

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
  ShutoffStatus: ShutoffState | null = null

  /// <summary>
  /// 遮断対象数
  /// </summary>
  ShutoffTargetCnt = 0

  /// <summary>
  /// 遮断状況：成功数
  /// </summary>
  ShutoffSuccessCnt = 0

  /// <summary>
  /// 遮断状況：失敗数
  /// </summary>
  ShutoffFailedCnt = 0

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
  ShutoffUnableCnt = 0

  /// <summary>
  /// 遮断状況：遮断済数(依頼前から)
  /// </summary>
  ShutoffDoneCnt = 0

  /// <summary>
  /// 液状化警報率
  /// </summary>
  LqAlarmRate = 0.0

  /// <summary>
  /// 停電率
  /// </summary>
  PowerFailureRate = 0.0

  /// <summary>
  /// 単独ガバナ数
  /// </summary>
  IndepGovCnt = 0

  /// <summary>
  /// 単独ガバナ停止数
  /// </summary>
  IndepGovStopCnt = 0

  /// <summary>
  /// ブロック内流量
  /// </summary>
  BlockFlow = 0.0

  /// <summary>
  /// 新SI基数
  /// </summary>
  NewSiSensorCnt = 0

  /// <summary>
  /// 圧力状況1 件数
  /// LP >= 1.0のガバナ数
  /// </summary>
  LpStatus1Cnt = 0

  /// <summary>
  /// 圧力状況2 件数
  /// 0.8 <= LP < 1.0のガバナ数
  /// </summary>
  LpStatus2Cnt = 0

  /// <summary>
  /// 圧力状況3 件数
  /// 0.3 <= LP < 0.8のガバナ数
  /// </summary>
  LpStatus3Cnt = 0

  /// <summary>
  /// 圧力状況4 件数
  /// 0.0 <= LP < 0.3のガバナ数
  /// </summary>
  LpStatus4Cnt = 0

  /// <summary>
  /// 圧力状況5 件数
  /// LP未確認のガバナ数
  /// </summary>
  LpStatus5Cnt = 0

  /// <summary>
  /// 供給停止判断結果
  /// </summary>
  JudgeResult = 0

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
  /// 道路上の被害推定(本支管)
  /// </summary>
  MainTubeDmgCnt = 0

  /// <summary>
  /// 道路上の被害推定(供給管)
  /// </summary>
  SupplyTubeDmgCnt = 0

  /// <summary>
  /// 敷地内の被害推定(灯外内管)
  /// </summary>
  InsideTubeOfOutsideLightDmgCnt = 0

  /// <summary>
  /// 敷地内の被害推定(屋内)
  /// </summary>
  InsideTubeDmgCnt = 0

  /// <summary>
  /// 低圧導管被害率
  /// </summary>
  LpDmgRate: number | null = null

  /// <summary>
  /// 建物全半壊数
  /// </summary>
  ComppartDstrCnt: number | null = null

  /// <summary>
  /// 建物全半壊率
  /// 建物被害レベルの算出基準値、凡例は％で設定するため100倍する必要あり
  /// </summary>
  ComppartDstrRate: number | null = null

  /// <summary>
  /// 代表局最大SI値
  /// </summary>
  RepresentMaxSi: number | null = null

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
  /// 最大30Kine超過率
  /// </summary>
  MaxComAbleOver30KineRate: number | null = null

  /// <summary>
  /// 最大50Kine超過率
  /// </summary>
  MaxComAbleOver50KineRate: number | null = null

  /// <summary>
  /// 最大60Kine超過率
  /// </summary>
  MaxComAbleOver60KineRate: number | null = null

  /// <summary>
  /// 最大70Kine超過率
  /// </summary>
  MaxComAbleOver70KineRate: number | null = null

  /// <summary>
  /// 最大80Kine超過率
  /// </summary>
  MaxComAbleOver80KineRate: number | null = null

  /// <summary>
  /// 最大90Kine超過率
  /// </summary>
  MaxComAbleOver90KineRate: number | null = null

  /// <summary>
  /// 継続地区の導管被害数
  /// </summary>
  SupplyLpDmgCnt = 0

  /// <summary>
  /// 平均PL値
  /// </summary>
  AvePl: number | null = null

  /// <summary>
  /// 最大PL値
  /// </summary>
  MaxPl: number | null = null

  /// <summary>
  /// 遠隔開状況
  /// </summary>
  PilotOpenStatus: OpenState | null = null

  /// <summary>
  /// 遠隔開対象数
  /// </summary>
  PilotOpenTargetCnt = 0

  /// <summary>
  /// 遠隔開状況：成功数
  /// </summary>
  PilotOpenSuccessCnt = 0

  /// <summary>
  /// 遠隔開状況：失敗数
  /// </summary>
  PilotOpenFailedCnt = 0

  /// <summary>
  /// 遠隔開依頼時刻
  /// </summary>
  PilotOpenRequestedAt: Date | null = null

  /// <summary>
  /// 遠隔開終了時刻
  /// </summary>
  PilotOpenEndedAt: Date | null = null

  /// <summary>
  /// 遠隔開不可能数
  /// </summary>
  PilotOpenUnableCnt = 0

  /// <summary>
  /// 遠隔開状況：遠隔開済数(依頼前から)
  /// </summary>
  PilotOpenDoneCnt: number | null = null

  // #region CSVにない項目

  /// <summary>
  /// Lブロック情報への参照
  /// </summary>
  // public get LBlock() {
  //   return db.LBlockModel.where({ Keys: [this.LBlockId] }).first()
  // }

  //Add:
  public getLBlock(lBlockModelList: LBlockModel[]): LBlockModel | null {
    const LBlockModel = lBlockModelList.find((o) => {
      return o.Key === this.LBlockId
    })
    return LBlockModel !== undefined ? LBlockModel : null
  }

  // /// <summary>
  // /// 遠隔操作履歴情報への参照
  // /// </summary>
  // public List<ClientHistoryModel> ClientHistoryList { get { return ModelManager.GetList<ClientHistoryModel>(o => o.LBlockId == LBlockId); } }

  //  /// <summary>
  //         /// Kブロック番号
  //         /// </summary>
  //         public get KBlockNo() {  return this.LBlock != null ? this.LBlock.KBlockNo : 0; } }
  //Add:
  public getKBlockNo(LBlock: LBlockModel | null): number {
    return LBlock !== null ? LBlock.KBlockNo : 0
  }

  // /// <summary>
  // /// Lブロック番号
  // /// </summary>
  //  LBlockNo { get { return LBlock != null ? LBlock.LBlockN: number | null = null

  /// <summary>
  /// 火災件数
  /// </summary>
  FireCnt: number | null = null

  /// <summary>
  /// 漏えい受付件数
  /// </summary>
  LeakCnt: number | null = null

  /// <summary>
  /// 復旧状況
  /// </summary>
  restorationWorkStatus = 0

  /// <summary>
  /// ガバナ停止率
  /// </summary>
  public get GovernorStopRate(): number {
    return this.GovCnt !== 0 ? parseFloat(this.PastShuttoffGovCnt.toString()) / this.GovCnt : 0
  }

  /// <summary>
  /// 道路上の被害推定(合計)
  /// </summary>
  RoadTubeTotalDmgCnt = 0

  /// <summary>
  /// 敷地内の被害推定(合計)
  /// </summary>
  SiteTubeTotalDmgCnt = 0

  // /// <summary>
  // /// 道路上の被害推定(継続地区合計)
  // /// </summary>
  //  LabelLpSupplyDmgCnt : number | null = null

  // /// <summary>
  // /// 道路上の被害推定(継続地区合計)(緊急)
  // /// </summary>
  //  LabelLpSupplyDmgCntEmergency : number | null = null

  // /// <summary>
  // /// 道路上の被害推定(継続地区合計)(一般)
  // /// </summary>
  //  LabelLpSupplyDmgCntCommon : number | null = null

  // /// <summary>
  // /// 道路上の被害推定(継続地区累計)
  // /// </summary>
  //  SumLpSupplyDmgCnt : number | null = null

  // /// <summary>
  // /// 道路上の被害推定(継続地区累計)(緊急)
  // /// </summary>
  //  SumLpSupplyDmgCntEmergency : number | null = null

  // /// <summary>
  // /// 道路上の被害推定(継続地区累計)(一般)
  // /// </summary>
  //  SumLpSupplyDmgCntCommon : number | null = null

  // /// <summary>
  // /// 道路上の被害推定(継続地区合計)(遮断時の減算を反映しない)
  // /// </summary>
  //  LabelLpSupplyDmgCnt2 : number | null = null

  // /// <summary>
  // /// 道路上の被害推定(継続地区合計)(緊急)(遮断時の減算を反映しない)
  // /// </summary>
  //  LabelLpSupplyDmgCntEmergency2 : number | null = null

  // /// <summary>
  // /// 道路上の被害推定(継続地区合計)(一般)(遮断時の減算を反映しない)
  // /// </summary>
  //  LabelLpSupplyDmgCntCommon2 : number | null = null

  // /// <summary>
  // /// 道路上の被害推定(継続地区累計)(緊急)(遮断時の減算を反映しない)
  // /// </summary>
  //  SumLpSupplyDmgCntEmergency2 : number | null = null

  // /// <summary>
  // /// 道路上の被害推定(継続地区累計)(一般)(遮断時の減算を反映しない)
  // /// </summary>
  //  SumLpSupplyDmgCntCommon2 : number | null = null

  // /// <summary>
  // /// 道路上の被害推定(継続地区累計)(緊急) 閾値(1)超え
  // /// </summary>
  // public bool IsOverLpDmgCntEmergency1 { get { return SumLpSupplyDmgCntEmergency >= GlobalConst.THRESHOLD_SUM_DMG_CNT_1; } }

  // /// <summary>
  // /// 道路上の被害推定(継続地区累計)(緊急) 閾値(2)超え
  // /// </summary>
  // public bool IsOverLpDmgCntEmergency2 { get { return SumLpSupplyDmgCntEmergency >= GlobalConst.THRESHOLD_SUM_DMG_CNT_2; } }

  // /// <summary>
  // /// 道路上の被害推定(継続地区累計)(一般) 閾値(1)超え
  // /// </summary>
  // public bool IsOverLpDmgCntCommon1 { get { return SumLpSupplyDmgCntCommon >= GlobalConst.THRESHOLD_SUM_DMG_CNT_1; } }

  // /// <summary>
  // /// 道路上の被害推定(継続地区累計)(一般) 閾値(2)超え
  // /// </summary>
  // public bool IsOverLpDmgCntCommon2 { get { return SumLpSupplyDmgCntCommon >= GlobalConst.THRESHOLD_SUM_DMG_CNT_2; } }

  // /// <summary>
  // /// 遮断率閾値超え
  // /// </summary>
  // public bool IsShutoffRateOver { get { return (ShutoffRate >= GlobalConst.THRESHOLD_SHUTOFF_RATE); } }

  // /// <summary>
  // /// ガバナ停止率閾値超え
  // /// </summary>
  // public bool IsGovStopRateOver { get { return (GovernorStopRate >= GlobalConst.THRESHOLD_GOV_STOP_RATE); } }

  // /// <summary>
  // /// LP最小閾値超え
  // /// </summary>
  // public bool IsLpMinConnectedOver { get { return (LpMinConnected < GlobalConst.THRESHOLD_LP_MIN); } }

  // /// <summary>
  // /// 停電率閾値超え
  // /// </summary>
  // public bool IsPowerFailureRateOver { get { return (PowerFailureRate >= GlobalConst.THRESHOLD_POWER_FAILURE_RATE); } }

  /// <summary>
  ///  漏えい受付件数(表示ラベル)
  /// </summary>
  public get LabelLeakCnt(): string {
    return this.LeakCnt === null ? CommonUtil.GetNoData() : this.LeakCnt.toFixed(3)
  }

  /// <summary>
  ///  火災件数(表示ラベル)
  /// </summary>
  public get LabelFireCnt(): string {
    return this.FireCnt === null ? CommonUtil.GetNoData() : this.FireCnt.toFixed(3)
  }

  // /// <summary>
  // /// 漏えい遭遇率
  // /// </summary>
  //  LeakEncounterRate : number | null = null

  // /// <summary>
  // /// みなしエリア
  // /// </summary>
  // public ConsiderArea ConsiderArea
  // {
  //     get
  //     {
  //         ConsiderArea result = ConsiderArea.SupplyContinue;
  //         if (ShutoffStatus != ShutoffState.None)
  //         {
  //             // 遮断依頼があれば供給停止とみなすエリア
  //             result = ConsiderArea.SupplyStopAll;
  //         }
  //         else if (JudgeResult == (int)LBlockLpStopJudgementConst.JudgeResult.First)
  //         {
  //             // 一次判定であれば供給停止とみなすエリア
  //             result = ConsiderArea.SupplyStopAll;
  //         }

  //         return result;
  //     }
  // }

  /// <summary>
  /// 表示用ラベル: 停止判断結果
  /// </summary>
  public get LabelJudgeResult(): string {
    return LBlockValModel.GetLabelJudgeResult(this.JudgeResult)
  }

  // /// <summary>
  // /// 表示用ラベル: 遮断率
  // /// </summary>
  // public string LabelShutoffRate { get { return Math.Floor(ShutoffRate * 100).ToString(); } }

  /// <summary>
  /// 表示用ラベル: ガバナ停止率
  /// </summary>
  public get LabelGovernorStopRate() {
    return Math.floor(this.GovernorStopRate * 100)
  }

  /// <summary>
  /// 表示用ラベル: 停電率
  /// </summary>
  public get LabelPowerFailureRate(): string {
    return CommonUtil.ToRoundUp(this.PowerFailureRate * 100).toString()
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
  public get LabelShutoffStatus(): string {
    return CommonUtil.GetShutoffStateName(this.ShutoffStatus!)
  }

  // /// <summary>
  // /// 表示文字列(遮断依頼時刻)
  // /// </summary>
  // public string LabelShutoffRequestedAt { get { return CommonUtil.ToShortTimeString(ShutoffRequestedAt); } }

  // /// <summary>
  // /// 表示文字列(遮断終了時刻)
  // /// </summary>
  // public string LabelShutoffEndedAt { get { return CommonUtil.ToShortTimeString(ShutoffEndedAt); } }

  /// <summary>
  /// 表示文字列(最大SI)
  /// </summary>
  public get LabelMaxSi(): string {
    return this.MaxSi != null ? CommonUtil.AnalogConvert(this.MaxSi) : CommonUtil.GetNoData()
  }

  // /// <summary>
  // /// 表示文字列(平均SI)
  // /// </summary>
  // public string LabelAveSi { get { return AveSi != null ? CommonUtil.AnalogConvert(AveSi) : CommonUtil.GetNoData(); } }

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
    return this.LpMin != null ? this.LpMin : CommonUtil.GetNoData()
  }

  /// <summary>
  /// 表示文字列(LP最小(単独除く))
  /// </summary>
  public get LabelLpMinConnected() {
    return this.LpMinConnected != null ? this.LpMinConnected : CommonUtil.GetNoData()
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
  // public string LabelComppartDstrCnt { get { return ComppartDstrCnt != null ? Math.Ceiling(ComppartDstrCnt.Value).ToString("0") : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示文字列(代表局最大SI値)
  // /// </summary>
  // public string LabelRepresentMaxSi { get { return RepresentMaxSi != null ? CommonUtil.AnalogConvert(RepresentMaxSi) : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示用ラベル: 30Kine超過率
  // /// </summary>
  // public string LabelOver30KineRate { get { return Over30KineRate != null ? Math.Floor(Over30KineRate.Value * 100).ToString() : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示用ラベル: 50Kine超過率
  // /// </summary>
  // public string LabelOver50KineRate { get { return Over50KineRate != null ? Math.Floor(Over50KineRate.Value * 100).ToString() : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示用ラベル: 60Kine超過率
  // /// </summary>
  // public string LabelOver60KineRate { get { return Over60KineRate != null ? Math.Floor(Over60KineRate.Value * 100).ToString() : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示用ラベル: 70Kine超過率
  // /// </summary>
  // public string LabelOver70KineRate { get { return Over70KineRate != null ? Math.Floor(Over70KineRate.Value * 100).ToString() : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示用ラベル: 80Kine超過率
  // /// </summary>
  // public string LabelOver80KineRate { get { return Over80KineRate != null ? Math.Floor(Over80KineRate.Value * 100).ToString() : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示用ラベル: 90Kine超過率
  // /// </summary>
  // public string LabelOver90KineRate { get { return Over90KineRate != null ? Math.Floor(Over90KineRate.Value * 100).ToString() : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示用ラベル: 最大30Kine超過率
  // /// </summary>
  // public string LabelMaxComAbleOver30KineRate { get { return MaxComAbleOver30KineRate != null ? Math.Floor(MaxComAbleOver30KineRate.Value * 100).ToString() : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示用ラベル: 最大50Kine超過率
  // /// </summary>
  // public string LabelMaxComAbleOver50KineRate { get { return MaxComAbleOver50KineRate != null ? Math.Floor(MaxComAbleOver50KineRate.Value * 100).ToString() : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示用ラベル: 最大60Kine超過率
  // /// </summary>
  // public string LabelMaxComAbleOver60KineRate { get { return MaxComAbleOver60KineRate != null ? Math.Floor(MaxComAbleOver60KineRate.Value * 100).ToString() : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示用ラベル: 最大70Kine超過率
  // /// </summary>
  // public string LabelMaxComAbleOver70KineRate { get { return MaxComAbleOver70KineRate != null ? Math.Floor(MaxComAbleOver70KineRate.Value * 100).ToString() : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示用ラベル: 最大80Kine超過率
  // /// </summary>
  // public string LabelMaxComAbleOver80KineRate { get { return MaxComAbleOver80KineRate != null ? Math.Floor(MaxComAbleOver80KineRate.Value * 100).ToString() : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示用ラベル: 最大90Kine超過率
  // /// </summary>
  // public string LabelMaxComAbleOver90KineRate { get { return MaxComAbleOver90KineRate != null ? Math.Floor(MaxComAbleOver90KineRate.Value * 100).ToString() : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示文字列(平均PL)
  // /// </summary>
  // public string LabelAvePl { get { return AvePl != null ? CommonUtil.ToRoundDown(AvePl.Value, 1).ToString("0.0") : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 表示文字列(最大PL)
  // /// </summary>
  // public string LabelMaxPl { get { return MaxPl != null ? CommonUtil.ToRoundDown(MaxPl.Value, 1).ToString("0.0") : CommonUtil.GetNoData(); } }

  // /// <summary>
  // /// 漏えい遭遇率（表示ラベル）
  // /// </summary>
  // public string LabelLeakEncounterRate { get { return ContinueCustomerCnt == 0 ? CommonUtil.GetNoData() : String.Format("{0:0.00}", CommonUtil.ToRoundUp(LeakEncounterRate, 3)); } }

  // /// <summary>
  // /// 漏えい遭遇率（表示ラベル：ソート用）
  // /// </summary>
  // public string LabelLeakEncounterRate2 { get { return ContinueCustomerCnt == 0 ? CommonUtil.GetNoData() : String.Format("{0:000.00}", CommonUtil.ToRoundUp(LeakEncounterRate, 3)); } }

  /// <summary>
  /// D復旧済Sブロックがあるか
  /// </summary>
  //MODIFY:
  public ExistRemoteOpenSBlock(sbLockValList: SBlockValModel[]) {
    return sbLockValList.filter((o) => o.LBlockId === this.Key && o.IsDRestorationDone).length > 0
  }

  /// <summary>
  /// 表示文字列(D復旧済Sブロックがあるか)
  /// </summary>
  //MODIFY:
  public LabelExistRemoteOpenSBlock(sbLockValList: SBlockValModel[]): string {
    return this.ExistRemoteOpenSBlock(sbLockValList) ? '有' : ''
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
  //             case (int)ExtGasKojiInfoConst.restorationWorkStatus.GasWorkCompleted:
  //             case (int)ExtGasKojiInfoConst.restorationWorkStatus.RestorationCompleted:
  //                 label = "復旧箇所あり";
  //                 break;
  //             default:
  //                 label = "";
  //                 break;
  //         }

  //         return label;
  //     }
  // }

  // /// <summary>
  // /// 表示用ラベル: 遠隔開状況(ﾊﾟｲﾛｯﾄ)
  // /// </summary>
  // public string LabelPilotOpenStatus { get { return CommonUtil.GetOpenStateName(PilotOpenStatus); } }

  // /// <summary>
  // /// 表示文字列(遠隔開依頼時刻)(ﾊﾟｲﾛｯﾄ)
  // /// </summary>
  // public string LabelPilotOpenRequestedAt { get { return CommonUtil.ToShortTimeString(PilotOpenRequestedAt); } }

  // /// <summary>
  // /// 表示文字列(遠隔開終了時刻)(ﾊﾟｲﾛｯﾄ)
  // /// </summary>
  // public string LabelPilotOpenEndedAt { get { return CommonUtil.ToShortTimeString(PilotOpenEndedAt); } }

  /// <summary>
  /// 開巡回対象のガバナ数
  /// </summary>
  PilotOpenPatrolTargetGovCnt = 0

  /// <summary>
  /// 遠隔開巡回可能ガバナ数
  /// </summary>
  PilotOpenAbleGovCnt = 0

  // /// <summary>
  //       /// 遠隔開巡回不可能ガバナ数
  //       /// </summary>
  //       public int PilotOpenUnableGovCnt
  //       {
  //           get
  //           {
  //               return (PilotOpenPatrolTargetGovCnt - PilotOpenAbleGovCnt);
  //           }
  //       }

  /// <summary>
  /// 供給継続需要家件数
  /// </summary>
  // public get ContinueCustomerCnt(): number {
  //   let targetSblockCsutomerCnt = 0
  //   targetSblockCsutomerCnt = ModelManager.GetList<SBlockValModel>(
  //     (o) => o.LBlockId == this.Key && o.GovernorStopRate == 1.0
  //   ).Sum((o) => o.SBlock.CustomerCnt)

  //   return LBlock.CustomerCnt - targetSblockCsutomerCnt
  // }

  /// <summary>
  /// 供給継続需要家件数
  /// </summary>

  //Modify:
  public ContinueCustomerCnt(
    sBlockValModelList: SBlockValModel[],
    sBlockModelList: SBlockModel[],
    lBlockModelList: LBlockModel[]
  ): number {
    let targetSblockCsutomerCnt = 0
    const filterList = sBlockValModelList.filter(
      (o) => o.LBlockId === this.Key && o.GovernorStopRate === 1.0
    )
    filterList.forEach((o) => {
      targetSblockCsutomerCnt += o.getSBlock(sBlockModelList)!.CustomerCnt
    })

    return this.getLBlock(lBlockModelList)!.CustomerCnt - targetSblockCsutomerCnt
  }

  /// <summary>
  /// 1次緊急停止扱いがtrue。以外はfalse
  /// </summary>
  public get isShutoffFirstTarget(): boolean {
    return this.JudgeResult === LBlockLpStopJudgementConst.JudgeResult.First
  }

  // /// <summary>
  // /// 津波警報発報済フラグ
  // /// </summary>
  // public bool isTsunamiAlarmDone { get; set; }

  /// <summary>
  /// 中圧供給停止Kブロックに属しているか
  /// </summary>
  // public get isMpStopKBlock(): boolean {
  //   let result = false
  //   const tmpExtMpStopKBlockNoList: number[] = []
  //   // const extMpStopInfos: ExtMpStopInfosModel[] = modelManager.GetList<ExtMpStopInfosModel>(
  //   //   'ExtMpStopInfosModel'
  //   //   // o => o.StopStartedAt != null || o.StopEndedAt != null
  //   // )
  //   // 中圧供給停止しているKブロックのIDを取得
  //   // for (const extMpStopInfo of extMpStopInfos) {
  //   //   const kv: KDashBlockModel[] = modelManager.GetList<KDashBlockModel>(
  //   //     'KDashBlockModel'
  //   //     // o => o.KBlockNo == extMpStopInfo.KBlockNo && o.KDashBlockNo == extMpStopInfo.KDashBlockNo
  //   //   )
  //   //   if (kv.length == 1) tmpExtMpStopKBlockNoList.push(kv[0].Key)
  //   // }

  //   // 当該Lの属するKブロックのIDと突合判定し、いずれか1つでも中圧供給停止の場合はブロック一覧の中圧供給停止画面表示対象とする
  //   for (const mpStopKBlockId of tmpExtMpStopKBlockNoList) {
  //     // for (const KDashBlockId of this.LBlock(AllKDashBlockId) {
  //     // if (KDashBlockId == mpStopKBlockId) {
  //     result = true
  //     // break
  //     //   }
  //     // }
  //     if (result === true) break
  //   }

  //   return result
  // }

  /// <summary>
  /// 供給停止判断結果の表示用ラベルを返す
  /// </summary>
  /// <param name="judgeResult">供給停止判断結果</param>
  /// <returns>供給停止判断結果（表示用ラベル）</returns>
  public static GetLabelJudgeResult(judgeResult: number): string {
    if (judgeResult === (LBlockLpStopJudgementConst.JudgeResult.First as number)) return '1次'
    else if (judgeResult === (LBlockLpStopJudgementConst.JudgeResult.Second as number)) return '2次'
    else return '－'
  }

  // /// <summary>
  // /// 対象Kineの超過率が上限を超しているかどうか
  // /// </summary>
  // /// <param name="overTargetKineRate">対象Kineの超過率</param>
  // /// <param name="overTargetKineRateLimit">対象Kineの超過率の上限</param>
  // /// <returns>対象Kineの超過率が上限を超しているか</returns>
  // public bool IsOverKineRa : number | null = null
  // {
  //     bool result = false;
  //     if (overTargetKineRate != null)
  //     {
  //         if (overTargetKineRate.Value >= CommonUtil.ToRoundDown(overTargetKineRateLimit, CommonUtil.OVER_RATE_DIGIT))
  //             result = true;
  //     }
  //     return result;
  // }

  // #endregion
}
