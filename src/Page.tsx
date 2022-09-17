import ModelBase from './models/ModelBase'

export type ModelControllerExport = {
  isTraceLogTargetTermNoCheck: () => boolean
  IsPastEq: boolean
  IsTraining: boolean
}
export interface DataModifiedEventHandler {
  (sender: any, e: DataModifiedEventArgs): void
}
export class DataModifiedEventArgs {
  // 取得したデータ
  private readonly result: Map<number[], ModelBase>
  get Result(): Map<number[], ModelBase> {
    return this.result
  }

  // 将来の拡張用
  private cancelled = false
  get Cancel() {
    return this.cancelled
  }
  set Cancel(value: boolean) {
    this.cancelled = value
  }
  /// <summary>
  /// コンストラクタ
  /// </summary>
  /// <param name="models">取得したデータ</param>
  constructor(models: Map<number[], ModelBase>) {
    this.result = models
  }
}

const Page = () => {
  /*===================================================================================================================================================== */
  /*Start Logic MainController */
  // const alarmDataTimer = new DispatcherTimer()
  // const MainController = () => {
  //   //Init modelController
  //   ModelController()
  //   alarmDataTimer.Interval = 5000
  //   alarmDataTimer.Tick = TsunamiStopJudgementSetTimerEvent
  //   //init page
  //   RegistDataModifiedHandler('TsunamiStopJudgementModelLogic', TsunamiStopJudgementSetTimerEvent)
  // }

  // const TsunamiStopJudgementSetTimerEvent = () => {
  //   alarmDataTimer.Interval = 5000
  //   alarmDataTimer.Stop()

  //   if (
  //     !modelManager.IsLoaded('TsunamiStopJudgementModel') ||
  //     !modelManager.IsLoaded('LBlockValModel')
  //   )
  //     alarmDataTimer.Start()
  //   else CheckTsunamiStopJudgement()
  // }
  // const CheckTsunamiStopJudgement = async () => {
  //   const tsunamiStopJudgementModelList: TsunamiStopJudgementModel[] =
  //     await modelManager.GetList<TsunamiStopJudgementModel>('TsunamiStopJudgementModel')

  //   if (tsunamiStopJudgementModelList != null && tsunamiStopJudgementModelList.length > 0) {
  //     const tsunamiStopJudgementModel = tsunamiStopJudgementModelList[0]

  //     SetAlarmInfo(tsunamiStopJudgementModel)
  //   }
  // }

  /*End Logic MainController */
  /*===================================================================================================================================================== */

  /*===================================================================================================================================================== */
  /*Start Logic ModelController */

  // /// <summary>
  // /// トレースログ出力対象端末であるかどうか
  // /// </summary>
  // /// <returns></returns>
  // const isTraceLogTargetTermNoCheck = () => {
  //   const result = false
  //   if (AppConfig.TraceLogtargetTermNo != '') {
  //     //TODO
  //     // foreach (var term in AppConfig.TraceLogtargetTermNo.Split(';'))
  //     // {
  //     //     if (term == this.TermNo.ToString())
  //     //     {
  //     //         result = true;
  //     //         break;
  //     //     }
  //     // }
  //   }

  //   return result
  // }
  // const modelController: ModelControllerExport = {
  //   isTraceLogTargetTermNoCheck: isTraceLogTargetTermNoCheck,
  //   //TODO
  //   IsPastEq: false,
  //   IsTraining: false,
  // }
  // const ModelController = () => {
  //   // AddModelLogic(new EqModeModelLogic());
  //   AddModelLogic(new TsunamiStopJudgementModelLogic())
  // }
  // const AddModelLogic = (logic: ModelLogic) => {
  //   if (modelManager.Logics.hasOwnProperty(logic.logicName)) return
  //   modelManager.Logics.set(logic.logicName, logic)

  //   //Todo

  //   // // 依存Modelの取得完了イベントハンドラを登録する
  //   // foreach (Type t in logic.DependentModelLogic)
  //   // {
  //   //     RegistDependency(t, logic.DependentDataLoaded);
  //   // }
  // }
  // const RegistDataModifiedHandler = (
  //   modelLogicType: string,
  //   handler: DataModifiedEventHandler,
  //   forceFlg = true
  // ) => {
  //   forceFlg = false
  //   const modelLogic = modelManager.Logics.get(modelLogicType)

  //   if (modelLogic) {
  //     modelLogic.RegistDataModifiedHandler(handler)
  //     if (forceFlg) {
  //       // すでに取得が完了していた場合、イベントを発生させる
  //       modelLogic.CheckAndRaiseEvent(handler)
  //     }
  //   }
  //   //TODO
  //   // if (type === 'EqModeModelLogic')
  //   // {
  //   //     // 取得ロジックが登録されていた場合、イベントハンドラを追加する
  //   //     eqModeCheckerLogic.RegistDataModifiedHandler(handler);
  //   //     if (forceFlg)
  //   //     {
  //   //         // すでに取得が完了していた場合、イベントを発生させる
  //   //         eqModeCheckerLogic.CheckAndRaiseEvent(handler);
  //   //     }
  //   // }
  // }
  /*End Logic ModelController */
  /*===================================================================================================================================================== */

  /*Logic Page */



  return (
    <div></div>
  )
}

export default Page
