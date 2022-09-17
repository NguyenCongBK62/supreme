
import { OpenState, ShutoffState } from '../constants/GlobalConst'
import LBlockValModel from '../models/LBlockValModel'
import ModelBase from '../models/ModelBase'
import LBlockModelLogic from './LBlockModelLogic'
import ModelLogic, { RequestType } from './ModelLogic'

////////////////////////////////////////////////////////////////
///
/// System: SUPREME Client
/// Function: L毎観測値 モデル取得
/// Description: L毎観測値モデル取得ロジック
///
////////////////////////////////////////////////////////////////

/// <summary>
/// L毎観測値Model取得ロジック
/// </summary>
export default class LBlockValModelLogic extends ModelLogic {
  /// <summary>
  /// コンストラクタ
  /// </summary>
  public constructor() {
    //TODO:
    // AddDependency<LBlockModelLogic>()
    // AddDependency<ExtFireInfoModelLogic>()

    //Temp solution replace
    new LBlockModelLogic().RequestData(true)
    // new ExtFireInfoModelLogic().RequestData(true)

    super()
    this.resourceUri = 'lblock_vals.csv'
    this.requestType = RequestType.ModelZipFile
    this.diffUpdate = true
    this.modelType = 'LBlockValModel'
    this.logicName = 'LBlockValModelLogic'
  }

  protected CreateModel(modelBase: ModelBase, data: string[], line: string): ModelBase {
    const model = modelBase as LBlockValModel
    model.LBlockId = ModelLogic.ParseInt(data[0])
    model.GovCnt = ModelLogic.ParseInt(data[1])
    model.StopCnt = ModelLogic.ParseInt(data[2])
    model.ContinuanceCnt = ModelLogic.ParseInt(data[3])
    model.UnconfirmedCnt = ModelLogic.ParseInt(data[4])
    model.ShutoffRate = ModelLogic.ParseDouble(data[5])
    model.MpaMin = ModelLogic.ParseDoubleNullable(data[6])
    model.MpbMin = ModelLogic.ParseDoubleNullable(data[7])
    model.LpMin = ModelLogic.ParseDoubleNullable(data[8])
    model.LpMinConnected = ModelLogic.ParseDoubleNullable(data[9])
    model.LpAve = ModelLogic.ParseDoubleNullable(data[10])
    model.LpAveConnected = ModelLogic.ParseDoubleNullable(data[11])
    model.ShutoffStatus = ModelLogic.ParseInt(data[12]) as ShutoffState
    model.ShutoffTargetCnt = ModelLogic.ParseInt(data[13])
    model.ShutoffSuccessCnt = ModelLogic.ParseInt(data[14])
    model.ShutoffFailedCnt = ModelLogic.ParseInt(data[15])
    model.ShutoffRequestedAt = ModelLogic.ParseDateTimeNullable(data[16])
    model.ShutoffEndedAt = ModelLogic.ParseDateTimeNullable(data[17])
    model.ShutoffUnableCnt = ModelLogic.ParseInt(data[18])
    model.ShutoffDoneCnt = ModelLogic.ParseInt(data[19])
    model.LqAlarmRate = ModelLogic.ParseDouble(data[20])
    model.PowerFailureRate = ModelLogic.ParseDouble(data[21])
    model.IndepGovCnt = ModelLogic.ParseInt(data[22])
    model.IndepGovStopCnt = ModelLogic.ParseInt(data[23])
    model.BlockFlow = ModelLogic.ParseDouble(data[24])
    model.NewSiSensorCnt = ModelLogic.ParseInt(data[25])
    model.LpStatus1Cnt = ModelLogic.ParseInt(data[26])
    model.LpStatus2Cnt = ModelLogic.ParseInt(data[27])
    model.LpStatus3Cnt = ModelLogic.ParseInt(data[28])
    model.LpStatus4Cnt = ModelLogic.ParseInt(data[29])
    model.LpStatus5Cnt = ModelLogic.ParseInt(data[30])
    model.JudgeResult = ModelLogic.ParseInt(data[31])
    model.MaxSi = ModelLogic.ParseDoubleNullable(data[32])
    model.LpDmgCnt = ModelLogic.ParseDoubleNullable(data[33])
    model.MainTubeDmgCnt = ModelLogic.ParseInt(data[34])
    model.SupplyTubeDmgCnt = ModelLogic.ParseInt(data[35])
    model.InsideTubeOfOutsideLightDmgCnt = ModelLogic.ParseInt(data[36])
    model.InsideTubeDmgCnt = ModelLogic.ParseInt(data[37])
    model.LpDmgRate = ModelLogic.ParseDoubleNullable(data[38])
    model.ComppartDstrCnt = ModelLogic.ParseDoubleNullable(data[39])
    model.ComppartDstrRate = ModelLogic.ParseDoubleNullable(data[40])
    model.RepresentMaxSi = ModelLogic.ParseDoubleNullable(data[41])
    model.Over30KineRate = ModelLogic.ParseDoubleNullable(data[42])
    model.Over60KineRate = ModelLogic.ParseDoubleNullable(data[43])
    model.Over80KineRate = ModelLogic.ParseDoubleNullable(data[44])
    model.SupplyLpDmgCnt = ModelLogic.ParseInt(data[45])
    model.AvePl = ModelLogic.ParseDoubleNullable(data[46])
    model.MaxPl = ModelLogic.ParseDoubleNullable(data[47])
    model.PilotOpenStatus = ModelLogic.ParseInt(data[48]) as OpenState
    model.PilotOpenTargetCnt = ModelLogic.ParseInt(data[49])
    model.PilotOpenSuccessCnt = ModelLogic.ParseInt(data[50])
    model.PilotOpenFailedCnt = ModelLogic.ParseInt(data[51])
    model.PilotOpenRequestedAt = ModelLogic.ParseDateTimeNullable(data[52])
    model.PilotOpenEndedAt = ModelLogic.ParseDateTimeNullable(data[53])
    model.PilotOpenUnableCnt = ModelLogic.ParseInt(data[54])
    model.PilotOpenDoneCnt = ModelLogic.ParseInt(data[55])
    model.PilotOpenPatrolTargetGovCnt = ModelLogic.ParseInt(data[56])
    model.PilotOpenAbleGovCnt = ModelLogic.ParseInt(data[57])
    model.Over50KineRate = ModelLogic.ParseDoubleNullable(data[58])
    model.PastShuttoffGovCnt = ModelLogic.ParseInt(data[59])
    model.MaxComAbleOver30KineRate = ModelLogic.ParseDoubleNullable(data[60])
    model.MaxComAbleOver50KineRate = ModelLogic.ParseDoubleNullable(data[61])
    model.MaxComAbleOver60KineRate = ModelLogic.ParseDoubleNullable(data[62])
    model.MaxComAbleOver80KineRate = ModelLogic.ParseDoubleNullable(data[63])
    model.AveSi = ModelLogic.ParseDoubleNullable(data[64])
    model.Over70KineRate = ModelLogic.ParseDoubleNullable(data[65])
    model.Over90KineRate = ModelLogic.ParseDoubleNullable(data[66])
    model.MaxComAbleOver70KineRate = ModelLogic.ParseDoubleNullable(data[67])
    model.MaxComAbleOver90KineRate = ModelLogic.ParseDoubleNullable(data[68])
    model.FireCnt = 0
    model.LeakCnt = 0
    model.RoadTubeTotalDmgCnt = model.MainTubeDmgCnt + model.SupplyTubeDmgCnt
    model.SiteTubeTotalDmgCnt = model.InsideTubeOfOutsideLightDmgCnt + model.InsideTubeDmgCnt
    return model
  }

  protected CreateNewModel(): ModelBase {
    return new LBlockValModel()
  }
}
