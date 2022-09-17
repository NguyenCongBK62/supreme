import commonUtil from '../utilities/CommonUtil'
import { LpDmgCntConst, OpenState, ShutoffState } from '../constants/GlobalConst'
import ModelBase from '../models/ModelBase'
import SBlockValModel from '../models/SBlockValModel'
import { ModelControllerExport } from './../Page'
import ModelLogic, { RequestType } from './ModelLogic'
import SBlockModelLogic from './SBlockModelLogic'

////////////////////////////////////////////////////////////////
///
/// System: SUPREME Client
/// Function: S毎観測値モデル取得
/// Description: S毎観測値モデル取得ロジック
///
////////////////////////////////////////////////////////////////

/// <summary>
/// S毎観測値Model取得ロジック
/// </summary>
export default class SBlockValModelLogic extends ModelLogic {
  /// <summary>
  /// コンストラクタ
  /// </summary>
  constructor() {
    super()
    //TODO:
    // AddDependency<SBlockModelLogic>();
    // AddDependency<LBlockValModelLogic>();

    // Temp Modify:
    new SBlockModelLogic().RequestData(true)

    this.resourceUri = 'sblock_vals.csv'
    this.requestType = RequestType.ModelZipFile
    this.diffUpdate = true
    this.modelType = 'SBlockValModel'
    this.logicName = 'SBlockValModelLogic'
  }

  /// <summary>
  /// 状態を初期化する
  /// </summary>
  public override Init(controller: ModelControllerExport | null) {
    super.Init(controller)
  }

  protected CreateModel(modelBase: ModelBase, data: string[], line: string): ModelBase {
    const model = modelBase as SBlockValModel

    model.SBlockId = ModelLogic.ParseInt(data[0])
    model.LBlockId = ModelLogic.ParseInt(data[1])
    model.GovCnt = ModelLogic.ParseInt(data[2])
    model.StopCnt = ModelLogic.ParseInt(data[3])
    model.ContinuanceCnt = ModelLogic.ParseInt(data[4])
    model.UnconfirmedCnt = ModelLogic.ParseInt(data[5])
    model.ShutoffRate = ModelLogic.ParseDouble(data[6])
    model.MpaMin = ModelLogic.ParseDoubleNullable(data[7])
    model.MpbMin = ModelLogic.ParseDoubleNullable(data[8])
    model.LpMin = ModelLogic.ParseDoubleNullable(data[9])
    model.LpMinConnected = ModelLogic.ParseDoubleNullable(data[10])
    model.LpAve = ModelLogic.ParseDoubleNullable(data[11])
    model.LpAveConnected = ModelLogic.ParseDoubleNullable(data[12])
    model.ShutoffStatus = ModelLogic.ParseInt(data[13]) as ShutoffState
    model.ShutoffTargetCnt = ModelLogic.ParseInt(data[14])
    model.ShutoffSuccessCnt = ModelLogic.ParseInt(data[15])
    model.ShutoffFailedCnt = ModelLogic.ParseInt(data[16])
    model.ShutoffRequestedAt = ModelLogic.ParseDateTimeNullable(data[17])
    model.ShutoffEndedAt = ModelLogic.ParseDateTimeNullable(data[18])
    model.ShutoffUnableCnt = ModelLogic.ParseInt(data[19])
    model.ShutoffDoneCnt = ModelLogic.ParseInt(data[20])
    model.LqAlarmRate = ModelLogic.ParseDouble(data[21])
    model.PowerFailureRate = ModelLogic.ParseDouble(data[22])
    model.LpStatus1Cnt = ModelLogic.ParseInt(data[23])
    model.LpStatus2Cnt = ModelLogic.ParseInt(data[24])
    model.LpStatus3Cnt = ModelLogic.ParseInt(data[25])
    model.LpStatus4Cnt = ModelLogic.ParseInt(data[26])
    model.LpStatus5Cnt = ModelLogic.ParseInt(data[27])
    model.ContinueJudgeResult = ModelLogic.ParseInt(data[28])
    model.MaxSi = ModelLogic.ParseDoubleNullable(data[29])
    model.LpDmgCnt = ModelLogic.ParseDoubleNullable(data[30])
    model.LpDmgRate = ModelLogic.ParseDoubleNullable(data[31])
    model.ComppartDstrCnt = ModelLogic.ParseDouble(data[32])
    model.ComppartDstrRate = ModelLogic.ParseDouble(data[33])
    model.Over30KineRate = ModelLogic.ParseDoubleNullable(data[34])
    model.Over60KineRate = ModelLogic.ParseDoubleNullable(data[35])
    model.Over80KineRate = ModelLogic.ParseDoubleNullable(data[36])
    model.PilotShutoffStatus = ModelLogic.ParseInt(data[37]) as ShutoffState
    model.PilotShutoffTargetCnt = ModelLogic.ParseInt(data[38])
    model.PilotShutoffSuccessCnt = ModelLogic.ParseInt(data[39])
    model.PilotShutoffFailedCnt = ModelLogic.ParseInt(data[40])
    model.PilotShutoffRequestedAt = ModelLogic.ParseDateTimeNullable(data[41])
    model.PilotShutoffEndedAt = ModelLogic.ParseDateTimeNullable(data[42])
    model.PilotShutoffUnableCnt = ModelLogic.ParseInt(data[43])
    model.PilotShutoffDoneCnt = ModelLogic.ParseInt(data[44])
    model.PilotOpenStatus = ModelLogic.ParseInt(data[45]) as OpenState
    model.PilotOpenTargetCnt = ModelLogic.ParseInt(data[46])
    model.PilotOpenSuccessCnt = ModelLogic.ParseInt(data[47])
    model.PilotOpenFailedCnt = ModelLogic.ParseInt(data[48])
    model.PilotOpenRequestedAt = ModelLogic.ParseDateTimeNullable(data[49])
    model.PilotOpenEndedAt = ModelLogic.ParseDateTimeNullable(data[50])
    model.PilotOpenUnableCnt = ModelLogic.ParseInt(data[51])
    model.PilotOpenDoneCnt = ModelLogic.ParseInt(data[52])
    model.IsShowGovResumeListBase = ModelLogic.ParseBool(data[53])
    model.IsShowSsvAllShutoffList = ModelLogic.ParseBool(data[54])
    model.GovShutoffStatusCnt = ModelLogic.ParseInt(data[55])
    model.IsDRestorationDone = ModelLogic.ParseBool(data[56])
    model.IsRestrationJudgementD = ModelLogic.ParseBool(data[57])
    model.LpStatus1nCnt = ModelLogic.ParseInt(data[58])
    model.LpStatus2nCnt = ModelLogic.ParseInt(data[59])
    model.IsStopped = ModelLogic.ParseBool(data[60])
    model.Over50KineRate = ModelLogic.ParseDoubleNullable(data[61])
    model.PastShuttoffGovCnt = ModelLogic.ParseInt(data[62])
    model.AveSi = ModelLogic.ParseDoubleNullable(data[63])
    model.Over70KineRate = ModelLogic.ParseDoubleNullable(data[64])
    model.Over90KineRate = ModelLogic.ParseDoubleNullable(data[65])

    // 各外管被害数を設定する
    model.MainTubeDmgCnt = parseInt(
      commonUtil.ToRoundUp(model.LpDmgCnt !== null ? model.LpDmgCnt : 0).toString()
    )
    model.SupplyTubeDmgCnt = parseInt(
      commonUtil
        .ToRoundUp(model.LpDmgCnt !== null ? model.LpDmgCnt : 0 * LpDmgCntConst.SUPPLY_TUBE_RATE)
        .toString()
    )
    model.RoadTubeTotalDmgCnt = model.MainTubeDmgCnt + model.SupplyTubeDmgCnt
    model.InsideTubeOfOutsideLightDmgCnt = parseInt(
      commonUtil
        .ToRoundUp(
          model.LpDmgCnt !== null
            ? model.LpDmgCnt
            : 0 * LpDmgCntConst.INSIDE_TUBE_OF_OUTSIDE_LIGHT_RATE
        )
        .toString()
    )
    model.InsideTubeDmgCnt = parseInt(
      commonUtil
        .ToRoundUp(model.LpDmgCnt !== null ? model.LpDmgCnt : 0 * LpDmgCntConst.INSIDE_TUBE_RATE)
        .toString()
    )
    model.SiteTubeTotalDmgCnt = model.InsideTubeOfOutsideLightDmgCnt + model.InsideTubeDmgCnt

    return model
  }

  protected override CreateNewModel(): ModelBase {
    return new SBlockValModel()
  }
}
