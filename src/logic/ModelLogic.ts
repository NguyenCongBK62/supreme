import AppConfig from '../config/AppConfig'
import ModelBase from '../models/ModelBase'
import { modelManager } from '../models/ModelManager'
import DispatcherTimer from '../utilities/DispatcherTimer'
import { dowloadCSV as downloadCSV } from '../worker/downloadCSV.worker'
import { NullStringConst } from '../constants/GlobalConst'
import { DataModifiedEventArgs, DataModifiedEventHandler, ModelControllerExport } from '../Page'

/// <summary>
/// 取得種別
/// Default      : 地震モード変更時
/// OnDemand     : 明示的にRequestData()を呼ぶまで取得しない
/// Once         :起動時に1回だけ取得する
/// Timer        :一定間隔ごとに取得する
/// ModelZipFile : モデルZipファイルから取得する
/// </summary>
export enum RequestType {
  Default = 0,
  OnDemand,
  Once,
  Timer,
  ModelZipFile,
}
/// <summary>
/// Modelデータ取得ロジックの基底クラス
/// </summary>
export default abstract class ModelLogic {
  //ADD MORE:
  logicName = '' //name of model logic

  setUri(uri: string) {
    this.resourceUri = uri
  }

  /// <summary>
  /// 取得種別
  /// </summary>
  requestType: RequestType

  /// <summary>
  /// データ更新完了イベント
  /// </summary>
  DataModifiedEvent: DataModifiedEventHandler[] | null = null

  //lhquan1
  executeHandlers(handers: DataModifiedEventHandler[], models: DataModifiedEventArgs) {
    for (const callback of handers) {
      callback(this, models)
    }
  }

  /// <summary>
  /// 自動更新用タイマー
  /// </summary>
  Timer: DispatcherTimer | null = null

  /// <summary>
  /// 自動更新用タイマー(再取得用)
  /// </summary>
  RetryTimer: DispatcherTimer | null = null

  /// <summary>
  /// データ自動更新間隔(秒)
  /// </summary>
  protected requestIntervalSecond = 30

  /// <summary>
  /// タイムアウト監視用タイマー
  /// </summary>
  protected timeoutChecker: DispatcherTimer | null = null

  /// <summary>
  /// タイムアウト値(秒)
  /// </summary>
  protected timeout = 29

  /// <summary>
  /// タイムアウト監視間隔(秒)
  /// </summary>
  protected timeoutInterval = 30

  /// <summary>
  /// タイムアウト カウント値(秒)
  /// </summary>
  protected timeoutCounter = 0

  /// <summary>
  /// 自動更新処理初回実行フラグ
  /// true: 起動後初回の実行である false: 2回目以降の実行
  /// </summary>
  protected isFirstRequest = true

  /// <summary>
  /// データ取得元(CSVファイル)のURI
  /// </summary>
  protected resourceUri: string | undefined

  /// <summary>
  /// このModelの取得が完了したかどうか
  /// </summary>
  protected IsLastRequestCompleted = false

  /// <summary>
  /// 依存しているModelの取得状況管理用Dictionary
  /// キー: ModelLogic型 値: 取得完了していればtrue
  /// </summary>
  dependentStatus = new Map<string, boolean>()

  /// <summary>
  /// 依存しているModelLogicのリスト
  /// </summary>
  get DependentModelLogic() {
    return Array.from(this.dependentStatus.keys())
  }
  /// <summary>
  /// リクエスト時のパラメータ
  /// </summary>
  protected requestParams = new Map<string, string>()

  /// <summary>
  /// リクエスト時のパラメータ
  /// </summary>
  protected requestArrayParams = new Map<string, string[]>()

  /// <summary>
  /// ModelManegerによるキャッシュを行うかどうか
  /// </summary>
  protected useModelManager = true

  /// <summary>
  /// 常に訓練サーバを参照するかどうか
  /// </summary>
  protected alwaysTraining = false

  /// <summary>
  /// 訓練サーバを参照するかどうかを保持する
  /// </summary>
  private isTraining = false

  /// <summary>
  /// 差分更新を行うかどうか
  /// </summary>
  protected diffUpdate = false

  /// <summary>
  /// 差分取得のための条件値
  /// キー: パラメータ名
  /// 値: カラム名＞値、として抽出条件に用いる値
  ///  追加のみで更新が発生しないテーブルでは、取得済みのデータのうち最大のid
  ///  更新が発生する場合は、取得済みのデータのうち最も新しい最終更新日時
  /// </summary>
  protected diffConditionValues = new Map<string, any>()

  /// <summary>
  /// 扱うModel型
  /// </summary>
  // private modelType = ''
  modelType = '' //name of table in index db

  /// <summary>
  /// 応答待ち状態であるかどうか
  /// </summary>
  isWaiting = false

  protected requestedEqModeId = 0

  /// <summary>
  /// CSVデータからModelオブジェクトを生成する
  /// </summary>
  /// <param name="modelBase">データを格納するModelオブジェクト</param>
  /// <param name="data">CSV1行分にあたるデータ配列</param>
  /// <param name="line">CSV1行分のデータ</param>
  /// <returns>Modelオブジェクト</returns>
  protected abstract CreateModel(modelBase: ModelBase, data: string[], line: string): ModelBase

  /// <summary>
  /// 新しいModelオブジェクトを生成する
  /// </summary>
  /// <returns>Modelオブジェクト</returns>
  protected abstract CreateNewModel(): ModelBase

  /// <summary>
  /// CSVデータの1行目が一度の要求でデータが全て取得できたかどうかの情報であるか
  /// </summary>
  protected UseIsDataCompleted = false

  /// <summary>
  /// CSVデータの1カラム目がキー値であるかどうか
  /// </summary>
  protected HasPrimaryKey = true

  /// <summary>
  /// エスケープシーケンス：カンマ
  /// CSVに半角カンマを含めるための特殊文字列
  /// </summary>
  private ESCAPE_SEQUENCE_COMMA = '$#COMMA#'

  /// <summary>
  /// エスケープシーケンス：改行
  /// CSVに改行を含めるための特殊文字列
  /// </summary>
  private ESCAPE_SEQUENCE_NEWLINE = '$#NEWLINE#'

  /// <summary>
  /// 特殊文字(改行、カンマ)を使用するかどうか
  /// </summary>
  protected UseSpecialCharacter = false

  /// <summary>
  /// 一度の要求でデータが全て取得できたか
  /// </summary>
  protected IsDataCompleted = true

  //  /// <summary>
  // /// モデルコントローラ
  // /// </summary>
  // private ModelController controller;
  private controller: ModelControllerExport | null = null

  //ADD MORE:
  public set Controller(controller: ModelControllerExport) {
    this.Controller = controller
  }

  /// <summary>
  /// 現在のユーザの端末番号がトレースログ出力対象であるか
  /// </summary>
  public get isTraceLogTargetTermNo(): boolean {
    if (this.controller === null) return false
    return this.controller.isTraceLogTargetTermNoCheck()
  }

  /// <summary>
  /// コンストラクタ
  /// </summary>
  protected constructor() {
    this.requestType = RequestType.Default
    this.Init(null)
  }

  /// <summary>
  /// データ取得完了イベントハンドラを登録する
  /// </summary>
  /// <param name="handler">データ取得完了時に実行するイベントハンドラ(ビューの再描画など)</param>
  //TODO:
  RegistDataModifiedHandler(handler: DataModifiedEventHandler) {
    if (this.DataModifiedEvent === null) {
      this.DataModifiedEvent = []
      this.DataModifiedEvent.push(handler)
      this.executeHandlers(this.DataModifiedEvent, new DataModifiedEventArgs(new Map()))
      return
    }
    if (!this.DataModifiedEvent.find((data) => data === handler) !== undefined)
      this.DataModifiedEvent.push(handler)
  }

  /// <summary>
  /// タイマーを開始する
  /// </summary>
  public StartTimer() {
    if (this.Timer !== null) this.Timer.Start()
  }

  /// <summary>
  /// タイマーを終了する
  /// </summary>
  public StopTimer(retryStopFlg: boolean) {
    if (this.Timer !== null) this.Timer.Stop()

    if (this.RetryTimer !== null && retryStopFlg) {
      this.RetryTimer.Stop()
      this.RetryTimer = null
    }
  }

  /// <summary>
  /// タイマーにより実行される処理
  /// </summary>
  /// <param name="sender"></param>
  /// <param name="e"></param>
  Timer_Tick() {
    if (this.controller === null) return
    if (this.isFirstRequest) {
      if (this.requestType !== RequestType.OnDemand) this.RequestData(this.isTraining)

      if (this.Timer !== null) {
        // 初回実行時のみ即時取得となっていた取得間隔をデフォルト値に設定する
        this.Timer.Interval = this.requestIntervalSecond
        // 繰り返し取得でない場合、タイマーを止める
        if (this.requestType !== RequestType.Timer) this.StopTimer(false)
      }
    } else if (!this.controller.IsPastEq) {
      // 過去地震でない場合、自動更新対象のデータを取得する
      if (this.requestType === RequestType.Timer) this.RequestData(this.controller.IsTraining)
    } else {
      if (
        this.modelType === 'EqModeModelLogic' ||
        this.modelType === 'ClientModelZipFileModelLogic'
      ) {
        // 地震モードModel、またはModelZipファイルmodelは、リクエストを続ける
        this.RequestData(this.controller.IsTraining)
      } else {
        // 過去地震の場合、タイマーを止める
        this.StopTimer(false)
      }
    }
  }

  /// <summary>
  /// 依存Model取得完了時のイベントハンドラ実装
  /// </summary>
  /// <param name="sender"></param>
  /// <param name="e"></param>
  public DependentDataLoaded(sender: ModelLogic) {
    // 取得状況を更新する
    this.dependentStatus.set(sender.modelType, sender.IsCompletedAllModel())
    //TODO:
    // // 依存Modelも含めた取得状況を再チェックする
    // CheckAndRaiseEvent(useModelManager ? ModelManager.GetDictionary(modelType) : null);
  }

  /// <summary>
  /// Modelの依存関係を登録する
  /// </summary>
  /// <typeparam name="T">依存するModelLogic</typeparam>
  // protected void AddDependency<T>()
  //     where T : ModelLogic
  // {
  //     this.dependentStatus.Add(typeof(T), false);
  // }

  /// <summary>
  /// 依存Modelが全て取得されたかを調べる
  /// </summary>
  /// <returns>true:全て取得完了 false:未完了あり</returns>
  IsCompletedDependedModel() {
    this.dependentStatus.forEach((value: boolean) => {
      if (value !== true) return false
    })

    return true
  }

  /// <summary>
  /// このModelと依存Modelが全て取得されたかを調べる
  /// </summary>
  /// <returns>true:全て取得完了 false:未完了あり</returns>
  IsCompletedAllModel() {
    const result = this.IsLastRequestCompleted && this.IsCompletedDependedModel()

    if (result && this.modelType !== null && this.useModelManager) {
      if (!modelManager.LoadedModels.find((modelType) => modelType === this.modelType))
        modelManager.LoadedModels.push(this.modelType)
    }
    return result
  }

  /// <summary>
  /// このModelと依存Modelの取得状況をチェックして、取得完了イベントを発生させる
  /// </summary>
  //Change name from CheckAndRaiseEvent to CheckAndRaiseEventModel
  //TODO:
  protected CheckAndRaiseEventModel(models: Map<number[], ModelBase>): void {
    if (this.IsCompletedAllModel()) {
      // 取得完了イベントを発生させる
      // if (this.DataModifiedEvent !== null)
      //     DataModifiedEvent(this, new ModelController.DataModifiedEventArgs(models));
    }
  }

  /// <summary>
  /// このModelと依存Modelの取得状況をチェックして、取得完了イベントを発生させる
  /// </summary>
  //TODO:
  public CheckAndRaiseEvent(handler: DataModifiedEventHandler): void {
    if (this.IsCompletedAllModel()) {
      // 取得完了イベントを発生させる
      // Dictionary<int[], ModelBase> models = ModelManager.GetDictionary(modelType);
      // handler(this, new ModelController.DataModifiedEventArgs(models));
    }
  }

  /// <summary>
  /// 状態を初期化する
  /// </summary>
  Init(controller: ModelControllerExport | null) {
    this.controller = controller
    this.Timer = null
    this.Timer = new DispatcherTimer()
    this.Timer.Interval = 100
    this.Timer.Tick = this.Timer_Tick
    //TODO:
  }

  /// <summary>
  /// 差分取得のための条件をリクエストパラメータに追加する
  /// </summary>
  AddDiffCondition() {
    for (const kv in this.diffConditionValues) {
      if (this.diffConditionValues.get(kv) === null) continue

      const value = ''
      // if (this.diffConditionValues.get(kv) instanceof Date)
      //   value = commonUtil.ToLongTimeString(this.diffConditionValues.get(kv))
      // else value = this.diffConditionValues[kv].ToString()

      this.requestParams.set(kv, value)
    }
  }

  /// <summary>
  /// 最大の差分取得条件値を保持する
  /// </summary>
  /// <param name="name">パラメータ名</param>
  /// <param name="obj">比較対象となる値</param>
  protected DiffConditionMaxHold(name: string, obj: any) {
    const value = this.diffConditionValues.get(name)
    if (value) {
      if (obj instanceof Date) {
        if (value === null || (obj as Date).getMilliseconds() > (value as Date).getMilliseconds())
          this.diffConditionValues.set(name, obj)
      } else if (typeof obj === 'number' && typeof value === 'number') {
        if (value === null || (obj as number) > (value as number))
          this.diffConditionValues.set(name, obj)
      } else if (typeof obj === 'string') {
        if (value === null || (obj as string).localeCompare(value as string) > 0)
          this.diffConditionValues.set(name, obj)
      }
    } else {
      this.diffConditionValues.set(name, obj)
    }
  }

  /// <summary>
  /// 差分取得のための条件を全てクリアする
  /// </summary>
  public ClearDiffConditionAll(): void {
    this.diffConditionValues.forEach((v, key) => {
      this.requestParams.delete(key)
    })
    this.diffConditionValues.clear()
  }

  /// <summary>
  /// 差分取得のための条件をクリアする
  /// </summary>
  /// <param name="name">パラメータ名</param>
  public ClearDiffCondition(name: string): void {
    this.diffConditionValues.delete(name)
    this.requestParams.delete(name)
  }

  // /// <summary>
  //       /// データ取得先URIを返す
  //       /// </summary>
  //       /// <returns>データ取得先URI</returns>
  //       protected GetRequestUri():string
  //       {
  //           return GetRequestUri(AppConfig.RailsUri);
  //       }

  /// <summary>
  /// データ取得先URIを返す
  /// </summary>
  /// <param name="railsUriForPast">過去モード時のRailsサーバへの要求Uri</param>
  /// <returns>データ取得先URI</returns>
  protected GetRequestUri(railsUriForPast: string = AppConfig.RailsUri): string {
    if (AppConfig.UseRails) {
      let railsUri = ''
      if (this.isTraining || this.alwaysTraining) railsUri = AppConfig.TrainingUri
      else railsUri = this.controller?.IsPastEq ? railsUriForPast : AppConfig.RailsUri

      return railsUri + this.resourceUri
    } else
      return (
        (this.isTraining ? AppConfig.TrainingBaseUri : AppConfig.BaseUri) +
        'testdata/' +
        this.resourceUri?.replace('.html', '.csv')
      )
  }

  /// <summary>
  /// データ取得のリクエストを実行する
  /// (Modelコントローラから一定時間間隔で呼び出される)
  /// </summary>
  /// <param name="isTraining">true:訓練モード false:運用モード</param>
  /// <param name="forceFlg">強制取得するかどうか</param>
  async RequestData(isTraining: boolean, forceFlg = false) {
    this.isTraining = isTraining
    if (AppConfig.UseRails) {
      // レスポンス待ちの場合、リクエストを行わない
      // ただし、強制取得フラグが立っている場合は除く
      if (this.isWaiting && !forceFlg) return
      if (this.diffUpdate) this.AddDiffCondition()
      try {
        const result = await downloadCSV(`/csv/${this.resourceUri}`)
        this.CreateModels(result)
        this.isWaiting = false
        this.isWaiting = true
      } catch (error) {
        //TODO:
      }
    }
  }

  /// <summary>
  /// タイマーにより実行される処理(リトライ)
  /// </summary>
  /// <param name="sender"></param>
  /// <param name="e"></param>
  // private RetryTimer_Tick( sender:any, EventArgs e):void
  // {
  //     if (this.RetryTimer === null) return;
  //     this.RetryTimer.Stop();

  //     if (this.isWaiting === false) return;

  //     //TODO:
  //     // webClient.RequestParams = requestParams;
  //     // webClient.RequestArrayParams = requestArrayParams;
  //     // webClient.DownloadStringAsync(controller.GetConvRequestUri(GetRequestUri().ToString(), false));
  // }

  /// <summary>
  /// 非同期でのテストデータ取得完了時の処理
  /// </summary>
  /// <param name="sender">イベント発生元オブジェクト</param>
  /// <param name="e">イベントのデータ</param>
  // private DownloadStringCompleted(object sender, DownloadStringCompletedEventArgs e):void
  // {
  //     if ((e.Error === null) && (e.Cancelled === false))
  //     {
  //         CreateModels(e.Result);
  //     }
  //     else
  //     {
  //         // エラー
  //         App.Current.Logger.Error(this.GetType().ToString() + "取得エラー", e.Error);
  //     }
  // }

  /// <summary>
  /// CSVデータからModelオブジェクトを生成する
  /// </summary>
  /// <param name="resource"></param>
  //TODO:
  // CreateModels(resource: string) {
  //   const now = new Date()
  //   if (this.UseSpecialCharacter) resource = this.OriginalString(resource)
  //   const csv: string[] = resource.split('\n')
  //   const models = []
  //   let incrementValue = 0
  //   let isFirstLine = true
  //   for (const line of csv) {
  //     if (line === '') break
  //     const data = line.replace('\r\n', '\n').split(',')
  //     if (isFirstLine && this.UseIsDataCompleted) {
  //       this.IsDataCompleted = ModelLogic.ParseBool(data[0])
  //       isFirstLine = false
  //       continue
  //     }
  //     const keys: number[] = GetKeys(data, ++incrementValue);

  //     const model = this.CreateNewModel()
  //     this.CreateModel(model, data, line)
  //     model.LastUpdatedAt = now
  //     models.push(model)
  //   }
  //   modelManager.Update(this.modelType, models)
  // }

  /// <summary>
  /// CSVデータからModelオブジェクトを生成する
  /// </summary>
  /// <param name="resource"></param>
  public CreateModels(resource: string) {
    const now = new Date()
    if (this.UseSpecialCharacter) resource = this.OriginalString(resource)
    // Modelオブジェクトの生成処理
    // Dictionary<int[], ModelBase> models = new Dictionary<int[], ModelBase>(new SupIEqualityComparer());
    const models = []
    // if (modelType == null)
    // {
    //     ModelBase tmpModel = CreateNewModel();
    //     modelType = tmpModel.GetType();
    // }
    // var modelDic = modelType != null ? ModelManager.GetDictionary(modelType) : new Dictionary<int[], ModelBase>(new SupIEqualityComparer());
    // System.Diagnostics.Debug.WriteLine(String.Format("CreateModel Info (Before). [{0}]", modelType.ToString()));
    const csv: string[] = resource.replace('\r\n', '\n').split('\n')
    let incrementValue = 0
    let isFirstLine = true
    let model: ModelBase | null = null
    for (const line of csv) {
      if (line === '') break
      const data = line.split(',')
      if (isFirstLine && this.UseIsDataCompleted) {
        this.IsDataCompleted = ModelLogic.ParseBool(data[0])
        isFirstLine = false
        continue
      }
      const keys: number[] = this.GetKeys(data, ++incrementValue)

      // if (this.useModelManager) {
      //   // 地震モードモデル作成時の要素数相違での異常終了対応
      //   // 根本原因は判明していないが、要素数チェックを入れて再発を防止する
      //   // if (this.modelType === "Supreme.EqModeModel" && data.length() < EqModeModelLogic.EqmodeModelItemCnt)
      //   // {
      //   //     continue;
      //   // }
      //   // if (!modelDic.TryGetValue(keys, out model))
      //   // {
      //   //     model = CreateNewModel();
      //   //     model.Keys = keys;
      //   //     CreateModel(model, data, line);
      //   //     modelDic[model.Keys] = model;
      //   // }
      //   // else
      //   // {
      //   //     CreateModel(model, data, line);
      //   // }
      // } else {
      //   // model = CreateNewModel();
      //   // model.Keys = keys;
      //   // CreateModel(model, data, line);
      // }
      model = this.CreateNewModel()
      this.CreateModel(model, data, line)
      model.Keys = keys
      model.LastUpdatedAt = now
      models.push(model)
      isFirstLine = false
    }
    modelManager.Update(this.modelType, models)
  }
  //   // 更新されていないデータを削除する(差分更新以外)
  //   if (diffUpdate == false)
  //       foreach (var m in modelDic.Where(m => m.Value.LastUpdatedAt < now).ToList())
  //           modelDic.Remove(m.Value.Keys);
  //   if ((requestedEqModeId != 0) && (controller.CurrentEqModeModel != null))
  //       // 地震モード変更前にリクエストしたデータが変更後に取得された場合
  //       if (requestedEqModeId != controller.CurrentEqModeModel.Key)
  //       {
  //           // 無効なキャッシュを強制削除してデータを再取得する
  //           ModelManager.ClearCache(modelType);
  //           RequestData(isTraining);
  //           return;
  //       }
  //   if (isFirstRequest && modelType != null && useModelManager)
  //       ModelManager.Update(modelType, models);
  //   // このModelの取得完了フラグを立てる
  //   IsLastRequestCompleted = true;
  //   isFirstRequest = false;
  //   // 依存Modelも含めた取得状況をチェックする
  //   CheckAndRaiseEvent(models);
  //   // トレースログを出力する
  //   App.Current.Logger.sendTraceLog(isTraceLogTargetTermNo, String.Format("CreateModelType'{0}'(csv_count_'{1}')", modelType.ToString(), csv.Count().ToString()));
  //   System.Diagnostics.Debug.WriteLine(String.Format("CreateModel Info (After). [{0}]({1})", modelType.ToString(), csv.Count().ToString()));
  // }

  /// <summary>
  /// CSVデータからModelオブジェクトを生成する
  /// </summary>
  /// <param name="resource"></param>

  /// <summary>
  /// 配列にキーを入れて返す
  /// </summary>
  /// <param name="data">データ</param>
  /// <param name="incrementValue">自動採番された番号</param>
  /// <returns>キーが入った配列</returns>
  protected GetKeys(data: string[], incrementValue: number): number[] {
    // return new int[] { HasPrimaryKey ? ParseInt(data[0]) : incrementValue };
    return this.HasPrimaryKey ? [ModelLogic.ParseInt(data[0])] : [incrementValue]
  }

  // /// <summary>
  // /// リクエストパラメータをセットする
  // /// </summary>
  // /// <param name="paramName"></param>
  // /// <param name="paramValue"></param>
  // public virtual void SetParameter(string paramName, string paramValue)
  // {
  //     requestParams[paramName] = paramValue;
  // }

  // /// <summary>
  // /// リクエストパラメータをセットする
  // /// </summary>
  // /// <param name="paramName"></param>
  // /// <param name="paramValue"></param>
  // public virtual void SetParameter(string paramName, List<string> paramValue)
  // {
  //     requestArrayParams[paramName] = paramValue;
  // }

  // /// <summary>
  // /// データ取得元のURIを取得する
  // /// </summary>
  // public virtual string GetResourceUri()
  // {
  //     return this.resourceUri;
  // }

  // /// <summary>
  // /// 文字列中の特殊文字を置換する
  // /// </summary>
  // /// <param name="original">特殊文字を含む文字列</param>
  // /// <returns>特殊文字が置換された文字列</returns>
  // protected static string EscapeString(string original)
  // {
  //     return original.Replace(",", ESCAPE_SEQUENCE_COMMA).Replace("\r\n", ESCAPE_SEQUENCE_NEWLINE).Replace("\r", ESCAPE_SEQUENCE_NEWLINE);
  // }

  // /// <summary>
  // /// 置換文字列中の特殊文字を復元する
  // /// </summary>
  // /// <param name="escaped">特殊文字が置換された文字列</param>
  // /// <returns>特殊文字を含む文字列</returns>
  protected OriginalString(escaped: string): string {
    return escaped === 'NULL'
      ? ''
      : escaped
          .replace(this.ESCAPE_SEQUENCE_COMMA, ',')
          .replace(this.ESCAPE_SEQUENCE_NEWLINE, '\r\n')
  }

  /// <summary>
  /// 文字列をintに変換する
  /// (空文字列は0に変換される)
  /// </summary>
  /// <param name="s">文字列</param>
  /// <returns>文字列の表すint値</returns>
  protected static ParseInt(s: string): number {
    return s === NullStringConst.NULL_STR || s === '' ? 0 : parseInt(s)
  }

  /// <summary>
  /// 文字列をintに変換する
  /// (空文字列はnullに変換される)
  /// </summary>
  /// <param name="s">文字列</param>
  /// <returns>文字列の表すint値</returns>
  protected static ParseIntNullable(s: string): number | null {
    if (s === NullStringConst.NULL_STR || s === '') return null
    return parseInt(s)
  }

  /// <summary>
  /// 文字列をdoubleに変換する
  /// (空文字列は0に変換される)
  /// </summary>
  /// <param name="s">文字列</param>
  /// <returns>文字列の表すdouble値</returns>
  protected static ParseDouble(s: string): number {
    return s === NullStringConst.NULL_STR || s === '' ? 0 : parseFloat(s)
  }

  /// <summary>
  /// 文字列をdoubleに変換する
  /// (空文字列はnullに変換される)
  /// </summary>
  /// <param name="s">文字列</param>
  /// <returns>文字列の表すdouble値</returns>
  protected static ParseDoubleNullable(s: string): number | null {
    if (s === NullStringConst.NULL_STR || s === '') return null
    return parseFloat(s)
  }

  // /// <summary>
  // /// 文字列をlongに変換する
  // /// (空文字列は0に変換される)
  // /// </summary>
  // /// <param name="s">文字列</param>
  // /// <returns>文字列の表すlong値</returns>
  // protected static long ParseLong(string s)
  // {
  //     return s === NullStringConst.NULL_STR || s === "" ? 0 : long.Parse(s);
  // }

  // /// <summary>
  // /// 文字列をlongに変換する
  // /// (空文字列はnullに変換される)
  // /// </summary>
  // /// <param name="s">文字列</param>
  // /// <returns>文字列の表すlong値</returns>
  // protected static long? ParseLongNullable(string s)
  // {
  //     if (s === NullStringConst.NULL_STR || s === "") return null;
  //     return long.Parse(s);
  // }

  // /// <summary>
  // /// 文字列をDateTimeに変換する
  // /// (空文字列はデフォルト値に変換される)
  // /// </summary>
  // /// <param name="s">文字列</param>
  // /// <returns>文字列の表すDateTimeオブジェクト</returns>
  // protected static DateTime ParseDateTime(string s)
  // {
  //     if (s === NullStringConst.NULL_STR || s === "" || s.StartsWith("0000/00/00")) return new DateTime();

  //     // ModelZipFileモデル取得でDateTime型のParseがFormatExceptionとなることがあり、KB957851を疑ってカルチャ指定を追加してみる
  //     return DateTime.Parse(s, new System.Globalization.CultureInfo(System.Threading.Thread.CurrentThread.CurrentCulture.Name));
  // }

  /// <summary>
  /// 文字列をDateTimeに変換する
  /// (空文字列はnull値に変換される)
  /// </summary>
  /// <param name="s">文字列</param>
  /// <returns>文字列の表すDateTimeオブジェクト</returns>
  protected static ParseDateTimeNullable(s: string): Date | null {
    if (s === NullStringConst.NULL_STR || s === '' || s.startsWith('0000/00/00')) return null

    return new Date(s)
  }

  /// <summary>
  /// 文字列をboolに変換する
  /// (空文字列はfalseに変換される)
  /// </summary>
  /// <param name="s">文字列</param>
  /// <returns>文字列の表すDateTimeオブジェクト</returns>
  protected static ParseBool(s: string): boolean {
    if (s === NullStringConst.NULL_STR || s === '' || s === '0' || s === 'False') return false
    else return true
  }

  /// <summary>
  /// 文字列をboolに変換する
  /// (空文字列はnullに変換される)
  /// </summary>
  /// <param name="s">文字列</param>
  /// <returns>文字列の表すDateTimeオブジェクト</returns>
  protected static ParseBoolNullable(s: string): boolean | null {
    if (s === NullStringConst.NULL_STR || s === '') return null
    if (s === '0' || s === 'False') return false
    else return true
  }

  // /// <summary>
  // /// 文字列をstringで返却する
  // /// (空文字列はnullに変換される)
  // /// </summary>
  // /// <param name="s">文字列</param>
  // /// <returns>文字列</returns>
  // protected static string ParseStringNullable(string s)
  // {
  //     return s === NullStringConst.NULL_STR || s === "" ? null : s;
  // }

  // /// <summary>
  // /// 一度の要求でデータが全て取得できたかどうかを返す
  // /// </summary>
  // /// <returns>一度の要求でデータが全て取得できたかどうか</returns>
  // public bool GetIsDataCompleted()
  // {
  //     return IsDataCompleted;
  // }

  // /// <summary>
  // /// トレースログとしてHTTPリクエストを発行する
  // /// </summary>
  // /// <param name="messages"></param>
  // public void sendTraceLog(string messages)
  // {
  //     // CGIディレクトリのURI指定がない OR トレースログ出力対象端末以外は処理を行わない
  //     if (AppConfig.CgiUri === "" || !controller.isTraceLogTargetTermNoCheck()) return;

  //     Dictionary<string, string> requestParams = new Dictionary<string, string>();
  //     requestParams["comment"] = messages;

  //     SupWebClient wc = new SupWebClient();
  //     wc.RequestParams = requestParams;
  //     wc.DownloadStringAsync(App.Current.Logger.GetConvRequestUri(AppConfig.CgiUri, false));
  // }
}
