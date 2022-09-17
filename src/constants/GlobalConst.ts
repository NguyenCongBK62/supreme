/* eslint-disable no-useless-concat */
// export enum TopMenu
//     {
//         Top = 0, Mp = 1, Lp = 2,  Other = 3, Admin = 4, Debug = 5
//     };

//     /// <summary>
//     /// サブメニュー(中圧)
//     /// 0:緊急措置判定、2:被害推定、1:トレンドグラフ
//     /// </summary>
// export enum MpMenu
//     {
//         Judge = 0, Graph = 1, Damage = 2
//     };

//     /// <summary>
//     /// サブメニュー(低圧)
//     /// 0:ブロック遮断検討・操作/結果確認、1:遠隔D復旧・操作/結果確認、2:遠隔開巡回・操作/結果確認、 3:ガバナ一覧、4:巡回リスト、5:行政区別停止件数、6:復旧判定一覧
//     /// </summary>
//     export enum LpMenu
//     {
//         ShutoffBlock = 0, GovernorResume = 1, RemoteOpenPatrol = 2, Governor = 3, Patrol = 4, GyouseikuStop = 5, RestorationJudge = 6,
//     };

//     /// <summary>
//     /// サブメニュー(訓練他)
//     /// 0:訓練機能、1:過去地震表示、2:ダウンロード機能
//     /// </summary>
//     export enum OtherMenu
//     {
//         Training = 0, PastEq = 1, Download = 2
//     };

//     /// <summary>
//     /// リニューアル新メニュー
//     /// 1:TOPページ、2:低圧第1次緊急停止判断操作、3:中圧Kブロック化・中圧供給停止対応、4:遠隔再稼働、5:低圧第2次緊急停止判断操作、6:津波ブロック操作、7:現場対応項目、8:各種情報、9:訓練他
//     /// 10:ブロック一覧、11:ガバナ一覧
//     /// </summary>
//     export enum NewMenu
//     {
//         Top = 1, LpFirstShutoff = 2, Mp = 3, RemoteOpen = 4, LpSecondShutoff = 5, Tsunami = 6, Field = 7, Other = 8, Training = 9, ShutoffBlockList = 10, GovernorList = 11
//     };

//     /// <summary>
//     /// リニューアル新サブメニュー
//     /// 1:ブロック一覧、2:ガバナ一覧
//     /// ※ブロック一覧とガバナ一覧は、他のメニューボタンとは異なり、Menu.xaml内で定義
//     /// </summary>
//     export enum NewSubMenu
//     {
//         ShutoffBlockList = 1, GovernorList = 2
//     };

//     /// 低圧情報タブアイテム
//     /// </summary>
//     export enum LpInfoTabControlItem
//     {
//         NowStopCnt = 0, CustomerCntAndBlockCnt = 1, OtherContents = 2, MmCall = 3, Branch = 4, GakanPatrol = 5, LqPatrol = 6, RestrationJudge = 7
//     }

//     /// <summary>
//     /// 地震モード状態
//     /// 0:通常モード、1:地震モード中
//     /// </summary>
//     export enum EqModeState
//     {
//         NormalMode = 0, EqMode = 1
//     };

//     /// <summary>
//     /// 地図ラインデータ種別
//     /// 1:日本白地図、2:Kブロック、3:K'ブロック、4:Lブロック、5:Mブロック、6:Sブロック、7:MPA/MPB、8:中圧漏えい音検知可能ライン、9:遠隔D復旧Sブロック
//     /// </summary>
//     export enum MapLineType
//     {
//         SimpleMap = 1, KBlock = 2, KDashBlock = 3, LBlock = 4, MBlock = 5, SBlock = 6, Mp = 7, MpLeakSound = 8, SblockGovResume = 9
//     }

//     /// <summary>
//     /// CSA機能番号
//     /// 1:Kブロック地震計、2:Kブロックバルブ、3:液状化センサ局、4:幹線GS・その他地震計、
//     /// 5:広域Kブロック地震計(日立)、6:広域Kブロック地震計(群馬)、7:広域Kブロック地震計(熊谷)、8:広域Kブロック地震計(宇都宮)、
//     /// 10:地区ガバナ(DCX200/350)、11:地区連絡専用ガバナ、80:京葉ガス、81:佐倉支社(千葉ガス)、82:サテライト、83:広域支社
//     /// </summary>
//     export enum CsaFunc
//     {
//         KSensor = 1, KValve = 2, LqSensor = 3, TrunkGS = 4,
//         BranchKSensorHitachi = 5, BranchKSensorGunma = 6, BranchKSensorKumagaya = 7, BranchKSensorUtsunomiya = 8,
//         Gov = 10, Comm = 11, Keiyo = 80, Chiba = 81, Satellite = 82, Branch = 83
//     };

//     /// <summary>
//     /// 観測点表示フラグ マスク値
//     /// 0x0001:MPA 0x0002:MPB
//     /// </summary>
//     export enum ObsFlags
//     {
//         None = 0, Mpa = 0x0001, Mpb = 0x0002, Lp = 0x0004, Si = 0x0008, Gal = 0x0010,
//         LqAlarm = 0x0020, GovStop = 0x0040, LqSensor = 0x0080, PowerFailure = 0x0100, OpenClose = 0x0200
//     }

//     /// <summary>
//     /// ガバナタイプ番号
//     /// </summary>
//     export enum GovType
//     {
//         NONE = 0, A = 1, B = 2, AB = 3, AL = 4, BL = 5, ABL = 6
//     }

//     /// <summary>
//     /// ブロック内流量種別
//     /// </summary>
//     export enum BlockflowType
//     {
//         Flow1 = 1, Flow2 = 2
//     }

//     /// <summary>
//     /// 液状化警報
//     /// 0:警報なし、1:発生中、7:不通、8:未確認、9:なし
//     /// </summary>
//     export enum LqAlarm
//     {
//         Normal = 0, Happend = 1, Disconnect = 7, Unknown = 8, None = 9
//     };

//     /// <summary>
//     /// SI遮断
//     /// 0:開、1:遮断、8:未確認、9:なし
//     /// </summary>
//     export enum SiShut
//     {
//         Open = 0, Shut = 1, Unknown = 8, None = 9
//     }

//     /// <summary>
//     /// TC状態
//     /// 0:TC不可、1:TC可、6:故障、7:不通、8:未確認、9:なし
//     /// </summary>
//     export enum Tc
//     {
//         Unavailable = 0, Available = 1, Failure = 6, Disconnect = 7, Unknown = 8, None = 9
//     }

//     /// <summary>
//     /// 停電
//     /// 0:正常、1:停電、7:不通、8:未確認、9:なし
//     /// </summary>
//     export enum PowerFailure
//     {
//         Normal = 0, Failure = 1, Disconnect = 7, Unknown = 8, None = 9
//     };

//     /// <summary>
//     /// 供給状況
//     /// 0:継続、1:停止
//     /// </summary>
//     export enum SupplyStopState
//     {
//         Supplied = 0, Stopped = 1
//     };

//     /// <summary>
//     /// 中圧漏えい音検知状況
//     /// 0:電源OFFまたはそれに類する異常、1:故障、2:正常、3:漏えいあり(漏えい距離:遠)、4:漏えいあり(漏えい距離:近)、7:通信不能、8:未確認、9:異常
//     /// </summary>
//     export enum MpLeakSoundState
//     {
//         Abnormal = 0, Failure = 1, Normal = 2, LeakFar = 3, LeakNear = 4, Disconnect = 7, Unknown = 8, Other = 9
//     };

//     /// <summary>
//     /// 遠隔操作種別
//     /// 0:なし、1:遠隔遮断、2:遠隔遮断(SSV)、3:遠隔閉(BSV)、4:遠隔開(BSV)、5:SSV一斉遮断、6:遠隔D復旧、7:遠隔開巡回
//     /// </summary>
//     export enum RemoteOperateType
//     {
//         None = 0, Shutoff = 1, SsvShutoff = 2, PilotShutoff = 3, PilotOpen = 4, SsvAllShutoff = 5, DRestoration = 6, RemoteOpenPatrol = 7
//     }

//     /// <summary>
//     /// 遠隔操作対象
//     /// 0:ガバナ、1:Lブロック、2:Sブロック、3:SSV一斉遮断
//     /// </summary>
//     export enum RemoteOperateTarget
//     {
//         Governor = 0, Lblock = 1, Sblock = 2, SsvAllShutoff = 3
//     }

/// <summary>
/// 遠隔遮断状況
/// 0:遮断なし、1:未実施、2:実施中、3:完了、4:残有り、5:失敗、6:遮断済み、7:通信不能、9:中止、10:異常、
/// 11: TC異常
/// </summary>
export enum ShutoffState {
  None = 0,
  NotOperate = 1,
  Operating = 2,
  Complete = 3,
  Remain = 4,
  Failure = 5,
  CompletedShutoff = 6,
  ComUnable = 7,
  Cancel = 9,
  Other = 10,
  AbnormalTc = 11,
}

/// <summary>
/// 遠隔開状況
/// 0:開なし、1:未実施、2:実施中、3:完了、4:残有り、5:失敗、6:開済み、7:通信不能、9:中止、10:異常、
/// 11: TC異常
/// </summary>
export enum OpenState {
  None = 0,
  NotOperate = 1,
  Operating = 2,
  Complete = 3,
  Remain = 4,
  Failure = 5,
  CompletedOpen = 6,
  ComUnable = 7,
  Cancel = 9,
  Other = 10,
  AbnormalTc = 11,
}

//     /// <summary>
//     /// 遠隔D復旧中止状況
//     ///  0:正常依頼、1:漏えい情報があるにもかかわらず“なし”を選択、 2:漏えい情報があったため操作を中止、
//     ///  3:漏えい情報確認でキャンセルを選択、 4:火災情報があったため操作を中止、
//     ///  5:火災情報があるにもかかわらず“なし”を選択、 6:火災情報確認でキャンセルを選択、
//     ///  7:2次圧が2.0kPa未満のガバナがあるにもかかわらず“なし”を選択、 8:2次圧が2.0kPa未満のガバナがあったため操作を中止、
//     ///  9:2次圧確認でキャンセルを選択、 10:D復旧最終確認でキャンセルを選択(現在キャンセルはないので未使用)、
//     ///  11:システムエラー、 12:対象ガバナなし、 13:WIBU-KEY認証NG、 14:WIBU-KEY認証でタイムアウト、 15:パスワード入力エラー、 16:パスワード取得エラー、
//     ///  17:パスワード確認でキャンセルを選択、18:D復旧最終確認でいいえを選択、19:D復旧確認でキャンセルを選択、20:D復旧確認でいいえを選択、
//     ///  21:D復旧対象なし
//     ///  update 2019/10/30 7, 8の条件は未使用です
//     /// </summary>
//     export enum StopRemoteOpenStatus
//     {
//         Normal = 0, NotZeroLeakInfo = 1, NoLeakInfo = 2, CancelLeakInfo = 3, NotZeroFireInfo = 4, NoFireInfo = 5, CancelFireInfo = 6, ExistsLowLp = 7, NoLp = 8, CancelLp = 9, CancelRemoteOpenLast = 10,
//         ErrorRails = 11, NoTargetGovernor = 12, WibuKeyNg = 13, WibuKeyTimeout = 14, ErrorInputPassword = 15, ErrorGetPassword = 16, CancelPassword = 17, NoRemoteOpenLast = 18, CancelRemoteOpen = 19, NoRemoteOpen = 20,
//         NoTargetDRestoration = 21
//     };

/// <summary>
/// パターン(ブロック遮断検討・操作/結果確認)
/// </summary>
export enum ShutoffBlockPattern {
  None = 0,
  FirstL = 1,
  SecondL = 2,
  TsunamiL = 4,
  MpStopL = 5,
  ShutoffReqSt = 6,
  FeelEqShutoffSt = 7,
}

//     /// <summary>
//     /// 水位警報状態
//     /// 0:正常、1:発生1、2:発生2、8:不通、9:センサーなし
//     /// </summary>
//     export enum WaterLevelAlarmState
//     {
//         Normal = 0, Outbreak1 = 1, Outbreak2 = 2, Disconnect = 8, None = 9, Other = 10
//     };

//     /// <summary>
//     /// 凡例 データ種別
//     /// 0:SI、1:GAL、2:LP、3:MPA、4:MPB、5:液状化警報、6:液状化センサー、7:遮断状況、8:ブロック化ライン色、9:供給停止ブロックライン色、10:TC可、
//     /// 11:停電、12:閉巡回、13:開巡回、14:Kバルブ、15:水位警報、16:要注意ガバナ、
//     /// 20:中圧低下度ΔP(15分)MPA、21:中圧低下度ΔP(15分)MPB、22:中圧低下度ΔP(最新)MPA、23:中圧低下度ΔP(最新)MPB、24:警報発生順、
//     /// 30:導管被害件数(L)、31:建物被害率、32:液状化分布図、33:SI補間、34:導管被害件数(M)、35:圧力分布、36:導管被害件数(50mメッシュ) 、
//     /// 37:見学モード用SI値、38:見学モード用SI補間、39:PL値補間、
//     /// 40:供給停止試行ブロック、41:導管被害件数(S)、
//     /// 90:SI増幅度(開発用)、91:微地形(開発用)、-1:なし
//     ///
//     /// ※液状化センサー、供給停止試行ブロックなど現在は未使用となっている種別も存在するが、
//     /// 本種別値は、clt_legendsテーブルのlegend_type登録値と紐づいている為、不用意に変更してはならない
//     /// </summary>
//     export enum LegendType
//     {
//         Si = 0, Gal = 1, Lp = 2, Mpa = 3, Mpb = 4, LqAlarm = 5, LqSensor = 6, Shutoff = 7, Block = 8, Stopped = 9, Tc = 10,
//         PowerFailure = 11, PatrolClose = 12, PatrolOpen = 13, KValve = 14, WaterLevelAlarm = 15, CautionGov = 16,
//         MpaDeltaP = 20, MpbDeltaP = 21, MpaDeltaPNow = 22, MpbDeltaPNow = 23, MpLow = 24,
//         LpDmg = 30, BldgDmg = 31, MeshLqth = 32, MeshSi = 33, LpDmgM = 34, BlockLp = 35, LpDmgMesh = 36,
//         ObservationSi = 37, ObservationMeshSi = 38, MeshPl = 39,
//         StopTrial = 40, LpDmgS = 41,
//         MeshSiArv = 90, MeshGt = 91, None = -1
//     };

//     /// <summary>
//     /// 地図表示 データ系列
//     /// </summary>
//     export enum MapDataSeries
//     {
//         None = 0, Si = 1, Gal = 2, Mpa = 3, Mpb = 4, Lp = 5, GovStop = 6, PatrolClose = 7, PatrolOpen = 8, Tc = 9, LqAlarm = 10,
//         PowerFailure = 11, WaterLevelAlarm = 12, MpaDeltaP = 13, MpbDeltaP = 14, MpaDeltaPNow = 15, MpbDeltaPNow = 16
//     }

//     /// <summary>
//     /// 地図表示 塗りつぶしデータ系列
//     /// </summary>
//     export enum MapFillSeries
//     {
//         None = 0, LpDmgL = 21, BldgDmgL = 22, BlockLp = 23, MeshLpDmg = 24, MeshBldgDmg = 25,
//         MeshLqth = 26, MeshSi = 27, MeshPl = 28, LpDmgS = 29, BldgDmgS = 30,
//         MeshPlblock = 31, MeshSiArv = 90, MeshGt = 91
//     }

//     /// <summary>
//     /// 耐震種別
//     /// 0:非耐震、1:高耐震、2:超耐震
//     /// </summary>
export enum EqresType {
  NotEqres = 0,
  HigherEqres = 1,
  SuperEqres = 2,
}

//     /// <summary>
//     /// 依頼状態
//     /// </summary>
//     export enum ReqStatus
//     {
//         OpenErrorSiHigher   = -7,   // SI値が高いため遠隔開失敗
//         OpenErrorLpLower    = -6,   // LP圧が低いため遠隔開失敗
//         ImpossibleToFuri    = -5,   // 読み出し不可(無効 機能種別/回線種別)
//         CompleteSiShutoff   = -4,   // 制御実施済
//         ImpossibleToRead    = -3,   // 読み出し不可(無効TEL/IP)
//         ImpossibleToShutoff = -2,   // 制御不可
//         Normal              = -1,   // 正常終了
//         Empty               =  0,   // 空き
//         OnRequest           =  1,   // 要求あり
//         OnConnect           =  2,   // 要求中
//         Error               =  3,   // 異常終了
//         ComResult           =  4,   // 連続中
//         TimeOver            =  6,   // 許容時間オーバ
//         RetryOver           =  7,   // リトライオーバ
//         CancelEqMode        =  8,   // キャンセル（地震）
//         CancelTerm          =  9,   // キャンセル（端末）
//         CancelMasterUpdate  = 10,   // キャンセル（マスタ更新）
//         CancelShutoff       = 11,   // キャンセル（復旧判定・制御操作）
//         CancelActiveSrvSub  = 12,   // キャンセル（稼動サーバSUB）
//         CancelAutoReport    = 13    // キャンセル（自動通報）
//     }

//     /// <summary>
//     /// 巡回区分
//     /// 0:なし、1:閉巡回、2:開巡回、3:架管巡回
//     /// </summary>
//     export enum PatrolType
//     {
//         None = 0, Close = 1, Open = 2, Gakan = 3
//     };

//     /// <summary>
//     /// 地図種別のグループ
//     /// 0:通常（観測データ図、低圧被害図、中圧被害図）、1:2次判断支援チェックシート、2:訓練条件設定
//     /// </summary>
//     export enum MapGroup
//     {
//         Normal = 0, CheckSheet = 1, TrainingSetting = 2
//     }

//     /// <summary>
//     /// 地図種別
//     /// 0:観測データ図、1:観測データ図（Kブロック地震計）、2:観測データ図（広域支社＋幹線GS・その他地震計）、3:観測データ図（外部情報）、4:低圧被害図、5:中圧被害図、6:架管巡回、
//     /// 10:ブロック圧力分布図、11:ブロック被害分布図、
//     /// 30:訓練条件設定
//     /// </summary>
//     export enum MapType
//     {
//         Obs = 0, KSensor = 1, Branch = 2, Ext = 3, LpDmg = 4, MpDmg = 5, GakanPatrol = 6,
//         BlockLp = 10, BlockDmg = 11,
//         TrainingSetting = 30
//     }

//     /// <summary>
//     /// 低圧被害図の塗りつぶし単位
//     /// </summary>
//     export enum MapFillTypeLpDmg
//     {
//         LBlock = 0, SBlock = 1, Mesh = 2
//     }

//     /// <summary>
//     /// 50Mメッシュ図の塗りつぶし単位
//     /// </summary>
//     export enum MapFillTypeMesh
//     {
//         MeshLpDmg = 0, MeshBldgDmg = 1, MeshSi = 2, MeshLqth = 3, MeshPl = 4, MeshPlblock = 5
//     }

//     /// <summary>
//     /// メッセージ種別
//     /// 0:その他、1:地震検知、2:地震モード終了、3:低圧被害推定(1次)、4:中圧被害推定(Kブロック化、供給停止)、5:被害推定計算完了(毎回)
//     /// </summary>
//     export enum MessageType
//     {
//         None = 0, EqModeStart = 1, EqModeEnd = 2, LpJudgement = 3, MpJudgement = 4, DmgEstimation = 5
//     }

//     /// <summary>
//     /// 遮断操作履歴画面タイプ
//     /// </summary>
//     export enum HistoryType
//     {
//         Lblock = 0, Sblock = 1
//     }

//     /// <summary>
//     /// Lブロック供給状態
//     /// 0:不明、1:継続、2:停止
//     /// </summary>
//     export enum LblockSupplyStatusType
//     {
//         Unknown = 0, SupplyContinue = 1, SupplyStop = 2
//     }

//     /// <summary>
//     /// みなしエリアのタイプ
//     /// 0:継続、1:一部供給停止、2:全供給停止
//     /// </summary>
//     export enum ConsiderArea
//     {
//         SupplyContinue = 0, SupplyStopPart = 1, SupplyStopAll = 2
//     }

//     /// <summary>
//     /// CWA番号
//     /// </summary>
//     export enum CwaNo
//     {
//         Lp = 5080, Flow1 = 5081, Flow2 = 5082, Mpa = 9, Mpb = 15
//     }

//     /// <summary>
//     /// 端末のサーバー情報(本社/幕張/その他)
//     /// </summary>
//     export enum TerminalIP
//     {
//         Other = 0, Honsha = 1, Makuhari =2
//     }

//     /// <summary>
//     /// 計測震度
//     /// </summary>
//     export class IntensityConst
//     {
//         /// <summary>
//         /// 震度に対するSIの各基準値
//         /// </summary>
//         public static SiBase = [ 1, 4, 11, 21, 41, 71, 121 ];

//         /// <summary>
//         /// 計測震度種別
//         /// 0:無効値、1:震度3未満、2:震度3、3:震度4、4:震度5弱、5:震度5強、6:震度6弱、7:震度6強、8:震度7
//         /// -1:なし
//         /// </summary>
//         public readonly type = {
//                 Invalid = 0, LessThanIntensity3 = 1, Intensity3 = 2, Intensity4 = 3, Intensity5Lower = 4, Intensity5Upper = 5, Intensity6Lower = 6, Intensity6Upper = 7, Intensity7 = 8,
//                 None = -1
//             }

//     }

//     /// <summary>
//     /// 架管基礎
//     /// </summary>
//     export class GakanDmgBaseConst
//     {
//         /// <summary>
//         /// 適用示方書区分
//         /// </summary>
//         public readonly SpecificationType = {
//             None = 0, Before1971 = 1, Between1972And1980 = 2, After1981 = 3
//         }

//         /// <summary>
//         /// 架管形式
//         /// </summary>
//         public readonly GakanType = {
//             Shared = 1, Dedicated = 2, Singluarity = 3, Brace = 4
//         }

//         /// <summary>
//         /// 圧力コード
//         /// </summary>
//         public readonly PressCode = {
//             None = 0, MPA = 2, MPB = 3
//         }
//     }

//     /// <summary>
//     ///  架管被害推定結果
//     /// </summary>
//     export class GakanDmgEstimationConst
//     {
//         /// <summary>
//         /// 被災度ランク
//         /// </summary>
//         public readonly SufferRank = {
//             A = 1, B = 2, C = 3, D = 4, E = 5,
//             NotCalculated = 99
//         }
//     }

//     /// <summary>
//     /// 火災情報
//     /// </summary>
//     export class ExtFireInfoConst
//     {
//         /// <summary>
//         /// 連絡先種別
//         /// 1:東京、2:横浜、3:埼玉
//         /// </summary>
//         public readonly CooperationType =
//         {
//             Tokyo = 1, Yokohama = 2, Saitama = 3
//         }

//         /// <summary>
//         /// ファイル種別
//         /// 1:事案ファイル、2:受信ファイル
//         /// </summary>
//         public readonly FileType =
//         {
//             CaseFile = 1, ReceptionFile = 2
//         }

//         /// <summary>
//         /// 対応状況
//         /// 1:火災発生中、2:鎮圧
//         /// </summary>
//         public readonly FireState =
//         {
//             OutBreak = 1, Suppress = 2
//         }

//         /// <summary>
//         /// 事案ファイル用指令種別
//         /// 1:建物火災、2:中層建物火災、6:高層建物火災、7:強化対象物火災
//         /// 31:石油コンビ火災、32:地下鉄火災、33:地下街火災、38:産廃指定対象物火災、
//         /// 43:その他火災
//         /// </summary>
//         public readonly CaseOrderType =
//         {
//             BuildingFire = 1, MediumRiseBuildingFire = 2, HighRiseBuildingFire = 6, ReinforcedObjectFire = 7,
//             OilComplexFire = 31, SubwayFire = 32, UndergroundCityFire = 33, IndustrialWasteSpecificationObjectFire = 38,
//             OtherFire = 43

//         }

//         /// <summary>
//         /// 受信ファイル用指令種別
//         /// 2:火災
//         /// </summary>
//         public readonly ReceptionOrderType =
//         {
//             Fire = 2
//         }

// 		/// <summary>
// 		/// 火災種別
// 		/// 1:箇所特定火災、2:広域火災(線)、3:広域火災(面)
// 		/// </summary>
// 		public readonly FireType =
// 		{
// 			Simple =1, Line = 2, Plane = 3
// 		}
//     }

//     /// <summary>
//     /// 漏えい情報
//     /// </summary>
//     export class LeakConst
//     {
//         /// <summary>
//         /// 過去の集計結果の時間間隔
//         /// </summary>
//         public readonly AGGREGATE_TIME_SPAN = 30;

//         /// <summary>
//         /// 漏えい表示上限数
//         /// </summary>
//         public readonly LEAK_COUNT_LIMIT = 10000;

//         /// <summary>
//         /// 落成区分
//         /// 0: 未処置、1:処置完了、応急処置済み
//         /// </summary>
//         public readonly CompletionType = {
//             NotDone = 0, Done = 1
//         }

//         /// <summary>
//         /// 漏えい種別
//         /// 1:着火(未処置)、2:噴出(未処置)、3:臭気(未処置)、4:着火(処置済)、5:噴出(処置済)、6:臭気(処置済)
//         /// </summary>
//         public readonly LeakType = {
//             NotDoneIgnition = 1, NotDoneBelch = 2, NotDoneSmell = 3, DoneIgnition = 4, DoneBelch = 5, DoneSmell = 6
//         }

//         /// <summary>
//         /// ビットマップイメージファイル名
//         /// </summary>
//         public class LeakImageName
//         {
//             /// <summary>
//             /// 着火・噴出(未処置)
//             /// </summary>
//             public readonly NOT_DONE_IGNITION_BELCH = "leak1.png";

//             /// <summary>
//             /// 臭気あり(未処置)
//             /// </summary>
//             public readonly NOT_DONE_SMELL = "leak5.png";

//             /// <summary>
//             /// 着火(処置完了・応急処置済み)
//             /// </summary>
//             public readonly DONE_IGNITION = "leak2.png";

//             /// <summary>
//             /// 噴出(処置完了・応急処置済み)
//             /// </summary>
//             public readonly DONE_BELCH = "leak4.png";

//             /// <summary>
//             /// 臭気あり(処置完了・応急処置済み)
//             /// </summary>
//             public readonly DONE_SMELL = "leak6.png";
//         }
//     }

/// <summary>
/// 復旧工事情報
/// </summary>

export namespace ExtGasKojiInfoConst {
  /// <summary>
  /// 復旧状況
  /// 0:無効、1:復旧中、2:工事完了、3:復旧完了
  /// </summary>
  export enum restorationWorkStatus {
    Ignore = 0,
    RestorationDone = 1,
    GasWorkCompleted = 2,
    RestorationCompleted = 3,
  }
}

//     /// <summary>
//     /// 座標ファイル情報
//     /// </summary>
//     export class LeakCoordConst
//     {
//         /// <summary>
//         /// ファイル名のリストが出力されているファイル名
//         /// </summary>
//         public readonly FILE_NAME_LIST = "leak_coord_{0}.csv";
//     }

//     /// <summary>
//     /// 復旧判定結果
//     /// </summary>
//     enum JudgeResult
//         {
//             Unknown = 0, AJudge = 1, BJudge = 2, CJudge = 3, DJudge = 4, None = 9
//         }
//         enum JudgeResultBitField
//         {
//             None = 0, AJudge = 0x0001, BJudge = 0x0002, CJudge = 0x0004, DJudge = 0x0008, Unknown = 0x0010, OnGoing = 0x0020, Ignore = 0x8000
//         }
//     export class SblockLpRestorationJudgementConst
//     {
//         /// <summary>
//         /// 判定結果
//         /// 0:不明、1:A判定、2:B判定、3:C判定、4:D判定、9:なし
//         /// </summary>
//         JudgeResult : JudgeResult
//         /// <summary>
//         /// 判定結果 マスク値
//         /// 0x0001:A判定 0x0002:B判定 0x0004:C判定 0x0008:D判定 0x0010:不明 0x0020:判定中 0x8000:無効値
//         /// </summary>
//         // [FlagsAttribute]
//         JudgeResultBitField: JudgeResultBitField

//         /// <summary>
//         /// 復旧判定塗りつぶしの透明度
//         /// </summary>
//         public readonly JUDGE_PROT_OPACITY = 0.5;

//         /// <summary>
//         /// 判定ログ(ログ解析用)
//         /// </summary>
//         export class JudgeLog
//         {
//             // 前回停止
//             public readonly PREVIOUS_STOP = "PREVIOUS STOP";
//         }
//     }

//     /// <summary>
//     /// 低圧トレンドデータ
//     /// </summary>
//     export class LpTrendValConst
//     {
//         /// <summary>
//         /// データ種別
//         /// 0: 瞬時値、1:ICカード・警報RAM
//         /// </summary>
//         export enum DataType
//         {
//             InstantVal = 0, IccardAlarmRam = 1
//         }

//         /// <summary>
//         /// グラフ線種別
//         /// 0: 瞬時値、1:ICカード、2:警報RAM、99:近似線
//         /// </summary>
//         export enum GraphLineType
//         {
//             InstantVal = 0, Iccard = 1, AlarmRam = 2, ApproximationLine = 99
//         }

//         /// <summary>
//         /// 表示条件
//         /// </summary>
//         export enum LpTrendConditions
//         {
//             JudgeOrDetectRadio = 1, EqmodeAllRadio = 2, Near6HourRadio = 3
//         }

//         /// <summary>
//         /// グラフ印刷時の、出力対象ガバナ数の上限
//         /// </summary>
//         public readonly GRAPH_PRINT_LIMIT_GOV_CNT = 60;

//         /// <summary>
//         /// グラフ印刷時の、出力対象ガバナ数の上限を超えた際のメッセージ
//         /// </summary>
//         public readonly LIMIT_OVER_GOV_CNT_MESSAGE = `印刷できるのは、トレンドグラフ出力を選択したガバナ数が${LpTrendValConst.GRAPH_PRINT_LIMIT_GOV_CNT}基までのSブロックです。`

//         /// <summary>
//         /// Sブロック内流量凡例のコメント
//         /// </summary>
//         public readonly SBLOCK_FLOW_LEGEND_COMMENT = "Sブロック内流量(瞬時値・ICカード)"

//         /// <summary>
//         /// ガバナ流量凡例のコメント
//         /// </summary>
//         public readonly GOVERNOR_FLOW_LEGEND_COMMENT = "ガバナ流量(瞬時値・ICカード)"

//         /// <summary>
//         /// 判定前後の圧力トレンド選択時のX軸の最大値
//         /// </summary>
//         public readonly JUDGE_OR_DETECT_MAX_X = 20;

//         /// <summary>
//         /// 判定前後の圧力トレンド選択時のX軸の最小値
//         /// </summary>
//         public readonly JUDGE_OR_DETECT_MIN_X = -10;

//         /// <summary>
//         /// 地震モード全体の圧力トレンド選択時のX軸の最大値
//         /// </summary>
//         public readonly EQMODE_ALL_MAX_X = 360;

//         /// <summary>
//         /// 地震モード全体の圧力トレンド選択時のX軸の最小値
//         /// </summary>
//         public readonly EQMODE_ALL_MIN_X = -120;

//         /// <summary>
//         /// 直近6時間の圧力トレンド選択時のX軸の最大値
//         /// </summary>
//         public readonly NEAR_6_HOUR_MAX_X = 60;

//         /// <summary>
//         /// 直近6時間の圧力トレンド選択時のX軸の最大値
//         /// </summary>
//         public readonly NEAR_6_HOUR_MIN_X = -360;
//     }

//     /// <summary>
//     /// 中圧トレンドデータ
//     /// </summary>
//     export class MpTrendValConst
//     {
//         /// <summary>
//         /// データ種別
//         /// 0: 瞬時値、1:ICカード
//         /// </summary>
//         export enum DataType
//         {
//             InstantVal = 0, Iccard = 1
//         }
//     }

/// <summary>
/// Lブロック低圧供給停止判断結果
/// </summary>
export namespace LBlockLpStopJudgementConst {
  /// <summary>
  /// 判断結果
  /// 2:第2次緊急停止、3:第1次緊急停止判断
  /// </summary>
  export enum JudgeResult {
    First = 3,
    Second = 2,
  }
}

//     /// <summary>
//     /// Sブロック低圧供給停止判断結果
//     /// </summary>
//     export class SBlockLpStopJudgementConst
//     {
//         /// <summary>
//         /// 供給継続判断結果
//         /// 1:継続、2:停止
//         /// </summary>
//         export enum ContinueJudgeResult
//         {
//             ContinueJudge = 1, StopJudge = 2
//         }
//     }

/// <summary>
/// 外管被害数
/// </summary>
export class LpDmgCntConst {
  /// <summary>
  /// 供給管を求める係数
  /// </summary>
  //public readonly SUPPLY_TUBE_RATE = 2.28;
  public static readonly SUPPLY_TUBE_RATE = 0

  /// <summary>
  /// 灯外内管を求める係数
  /// </summary>
  public static readonly INSIDE_TUBE_OF_OUTSIDE_LIGHT_RATE = 19.6

  /// <summary>
  /// 屋内を求める係数
  /// </summary>
  public static readonly INSIDE_TUBE_RATE = 36.7

  /// <summary>
  /// 緊急を求める係数
  /// </summary>
  public static readonly EMERGENCY_RATE = 0.55
}

//     /// <summary>
//     /// 行政区情報
//     /// </summary>
//     export class GyouseikuCustomersConst
//     {
//         /// <summary>
//         /// 担当エリア
//         /// 0: 対象エリアなし 1: 東京都消防庁エリア 2:横浜市消防庁エリア 3:埼玉件消防庁エリア 91:東京都と横浜市エリアに跨る場合 92:埼玉県と東京都エリアに跨る場合
//         /// </summary>
//         export enum TargetArea
//         {
//             None = 0, Tokyo = 1, Yokohama = 2, Saitama = 3, ToKyoAndYokohama = 91, TokyoAndSaitama = 92
//         }
//     }

/// <summary>
/// ブロック一覧画面情報
/// </summary>
export namespace ShutoffBlockListConst {
  /// <summary>
  /// ブロック一覧画面 パターン
  /// </summary>
  export enum ShutoffBlockListPattern {
    ShutoffBlockSimpleList = 1,
    ShutoffBlockDetailList = 2,
  }

  /// <summary>
  /// パターンのボーダーの名前のキー文字列
  /// (この文字列にパターン番号を入れ込んで使う)
  /// </summary>
  export const PATTERN_BORDER_KEY_STRING = 'ShutoffBlockListPatternBorder_{0}'
}

/// <summary>
/// ガバナ一覧画面情報
/// </summary>
export namespace GovernorListConst {
  /// <summary>
  /// ガバナ一覧画面 パターン
  /// </summary>
  export enum GovernorListPattern {
    GovernorSimpleList = 1,
    GovernorDetailList = 2,
  }

  /// <summary>
  /// パターンのボーダーの名前のキー文字列
  /// (この文字列にパターン番号を入れ込んで使う)
  /// </summary>
  export const PATTERN_BORDER_KEY_STRING = 'GovernorListPatternBorder_{0}'
}

//     /// <summary>
//     /// 遠隔D復旧画面情報
//     /// </summary>
//     export class GovernorResumeListConst
//     {
//         /// <summary>
//         /// 遠隔D復旧・操作/結果確認画面 パターン
//         /// </summary>
//         export enum GovernorResumeListPattern
//         {
//             GovernorResumeRequest = 1, GovernorResumeResult = 2, SsvAllShutoffRequest = 3, SsvAllShutoffResult = 4
//         }

//         /// <summary>
//         /// パターンのボーダーの名前のキー文字列
//         /// (この文字列にパターン番号を入れ込んで使う)
//         /// </summary>
//         public readonly PATTERN_BORDER_KEY_STRING = "GovernorResumeListPatternBorder_{0}";
//     }

//     /// <summary>
//     /// 遠隔開巡回画面情報
//     /// </summary>
//     export class RemoteOpenPatrolListConst
//     {
//         /// <summary>
//         /// 遠隔開巡回・操作/結果確認画面 パターン
//         /// </summary>
//         export enum RemoteOpenPatrolListPattern
//         {
//             RemoteOpenPatrolRequest = 1, RemoteOpenPatrolResult = 2
//         }

//         /// <summary>
//         /// パターンのボーダーの名前のキー文字列
//         /// (この文字列にパターン番号を入れ込んで使う)
//         /// </summary>
//         public readonly PATTERN_BORDER_KEY_STRING = "RemoteOpenPatrolListPatternBorder_{0}";
//     }

//     /// <summary>
//     /// モデルZipファイル情報
//     /// </summary>
//     export class ClientModelZipFileConst
//     {
//         /// <summary>
//         /// ファイル名のリストが出力されているファイル名
//         /// </summary>
//         public readonly FILE_NAME_LIST = "file_name_list.csv";

//         /// <summary>
//         /// 一度に取り込みできる差分Zipファイルの個数の上限
//         /// この値を超したら、全体用Zipファイルを使用する。
//         /// </summary>
//         public readonly DIFF_ZIP_FILE_LIMIT_COUNT = 5;

//         /// <summary>
//         /// ファイル種別
//         /// 1:全体用Zipファイル、2:差分用Zipファイル、3:漏えい集計ファイル
//         /// </summary>
//         export enum FileType
//         {
//             All = 1, Diff = 2, Leak = 3
//         }
//     }

//     /// <summary>
//     /// 汎用設定
//     /// </summary>
//     export class ClientSettingConst
//     {
//         /// <summary>
//         /// 設定種別
//         /// 1:広域支社未取り込み、2:時間関連、3:過去世代のDB、4:連絡先
//         /// </summary>
//         export enum SettingType
//         {
//             IsNotBranchImport = 1, SettingAboutTime = 2, PastDb = 3, ContactInfomation = 4
//         }

//         /// <summary>
//         /// 設定キー値
//         /// </summary>
//         export class SettingKey
//         {
//             // 時間関連
//             export class SettingAboutTime
//             {
//                 // 地震モード終了
//                 public readonly EQMODE_END = "eqmode_end";

//                 // 地震モード終了(訓練モード用)
//                 public readonly TRAINING_EQMODE_END = "training_eqmode_end";

//                 // 遠隔操作後の地震モード終了(訓練モードはチェックしないため訓練モード用のキーはない)
//                 public readonly REMOTE_OPERATE_EQMODE_END = "remote_operate_eqmode_end";

//                 // 遠隔D復旧機能開始日
//                 public readonly RemoteOpenStartDate = "remote_open_start";
//             }

//             // 過去世代のDB
//             export class PastDb
//             {
//                 // 区切り文字
//                 export public readonly char DELIMITER = '-';
//             }
//         }

//         /// <summary>
//         /// 設定値
//         /// </summary>
//         export class SettingValue
//         {
//             // 連絡先
//             export class ContactInfomation
//             {
//                 // 区切り文字
//                 public readonly DELIMITER = '#';
//             }
//         }

//         /// <summary>
//         /// 設定値(初期値)
//         /// </summary>
//         export class SettingValueDefault
//         {
//             // 広域支社未取り込み
//             public readonly IS_NOT_BRANCH_IMPORT = false;

//             // 時間関連
//             export class SettingAboutTime
//             {
//                 // 地震モード終了(起動後終了できない時間と遠隔操作後終了できない時間の共用)
//                 public readonly EQMODE_END = 30;
//             }
//         }
//     }

//     /// <summary>
//     /// Kブロック情報
//     /// </summary>
export namespace KblockConst {
  /// <summary>
  /// 広域支社のKブロック番号の下限
  /// </summary>
  export const BRANCH_LOW_KBLOCK_NO = 20

  /// <summary>
  /// 広域支社のKブロック番号の上限
  /// </summary>
  export const BRANCH_HIGHT_KBLOCK_NO = 29

  /// <summary>
  /// 無効なKブロック番号(ダミーブロックも無効とする)(90以上)
  /// </summary>
  export const INVALID_KBLOCK_NO_CONTAIN_DUMMY_BLOCK = 90

  /// <summary>
  /// 無効なKブロック番号(ダミーブロック含まない)(95以上)
  /// </summary>
  export const INVALID_KBLOCK_NO = 95

  /// <summary>
  /// 例外的に有効なKブロック番号(99)
  /// </summary>
  export const EX_KBLOCK_NO = 99

  /// <summary>
  /// 神奈川・湘南のKブロック番号(6)
  /// </summary>
  export const KANAGAWA = 6

  /// <summary>
  /// 埼玉のKブロック番号(7)
  /// </summary>
  export const SAITAMA = 7

  /// <summary>
  /// 千葉のKブロック番号(8)
  /// </summary>
  export const CHIBA = 8

  /// <summary>
  /// 常総のKブロック番号(9)
  /// </summary>
  export const JOSO = 9

  /// <summary>
  /// 佐倉のKブロック番号(26)
  /// </summary>
  export const SAKURA = 26

  /// <summary>
  /// 固定Kブロック番号(広域支社)
  /// 日立：20、群馬:22、宇都宮:24
  /// </summary>
  export enum BranchKblockNo {
    Hitachi = 20,
    Gunma = 22,
    Utsunomiya = 24,
  }

  /// <summary>
  /// 固定Kブロック番号(本店扱い広域支社)
  /// 熊谷:23、つくば:25、佐倉:26
  /// </summary>
  export enum HontenBranchKblockNo {
    Kumagaya = 23,
    Tsukuba = 25,
    Sakura = SAKURA,
  }

  /// <summary>
  /// TGCS確立済固定Kブロック番号
  /// </summary>
  export const TGCS_ESTD_FIX_KBLOCK_NO: string[] = [
    'K' + SAITAMA.toString(), // 埼玉
    'K' + CHIBA.toString() + '-' + '1', // 木更津
    'K' + CHIBA.toString() + '-' + '3', // 千葉ＮＴ
    'K' + BranchKblockNo.Hitachi.toString(), // 日立
    'K' + BranchKblockNo.Gunma.toString(), // 群馬
    'K' + HontenBranchKblockNo.Kumagaya.toString(), // 熊谷
    'K' + BranchKblockNo.Utsunomiya.toString(), // 宇都宮
  ]
}

//     /// <summary>
//     /// K'ブロック情報
//     /// </summary>
//     export class KDashBlockConst
//     {
//         /// <summary>
//         /// 広域支社 ダミーK'ブロック番号
//         /// K90L3の場合、指定
//         /// </summary>
//         public readonly BRANCH_DUMMY_KDASHBLOCK_NO = 0;
//     }

//     /// <summary>
//     /// Lブロック情報
//     /// </summary>
//     export class LblockConst
//     {
//         /// <summary>
//         /// 広域支社 ダミーLブロック番号
//         /// </summary>
//         public readonly BRANCH_DUMMY_LBLOCK_NO = 3;
//     }

//     /// <summary>
//     /// 拠点情報
//     /// </summary>
export namespace BaseConst {
  /// <summary>
  /// 広域支社全ての表示名
  /// </summary>
  // public readonly BRANCH_ALL_NAME = JurisdictionAreaFixedPhrase.BRANCH;

  /// <summary>
  /// 拠点種別
  /// 1：3事業部、2：5事業部、3：導管NC、4：広域支社
  /// </summary>
  export enum BaseType {
    Area3 = 1,
    Area5 = 2,
    Nc = 3,
    Branch = 4,
  }

  /// <summary>
  /// 固定拠点番号
  /// 南部導管：10、南部NC：11、中央NC：12、
  /// 東部導管：20、東部NC：21、千葉NC：22、常総支社：23、佐倉支社：25、つくば支社：26、
  /// 西部導管：30、西部NC：31、多摩NC：32、
  /// 北部導管：40、北部NC：41、埼玉NC：42、
  /// 神奈川：50、神NC南部：51、神NC北部：52、湘南NC = 53、
  /// 本社：60、根岸:61、幕張:70、
  /// 日立：89、群馬:88、熊谷:87、宇都宮:43
  /// </summary>
  export enum BaseNo {
    Nanbu = 10,
    NanbuNc = 11,
    ChuoNc = 12,
    Toubu = 20,
    ToubuNc = 21,
    ChibaNc = 22,
    JoSo = 23,
    Sakura = 25,
    Tsukuba = 26,
    Seibu = 30,
    SeibuNc = 31,
    TamaNc = 32,
    Hokubu = 40,
    HokubuNc = 41,
    SaiTamaNc = 42,
    Kanagawa = 50,
    KanagawaNanbu = 51,
    KanagawaHokubu = 52,
    ShonanNc = 53,
    Honsha = 60,
    Negishi = 61,
    Makuhari = 70,
    Hitachi = 89,
    Gunma = 88,
    Kumagaya = 87,
    Utsunomiya = 43,
  }

  /// <summary>
  /// 過去地震時の固定拠点番号
  /// 熊谷:47
  /// </summary>
  export enum BaseNotForPastEq {
    Kumagaya = 47,
  }

  /// <summary>
  /// 固定拠点番号(広域支社)
  /// 日立、群馬、宇都宮
  /// </summary>
  export enum BranchBaseNo {
    Hitachi = BaseNo.Hitachi,
    Gunma = BaseNo.Gunma,
    Utsunomiya = BaseNo.Utsunomiya,
  }

  /// <summary>
  /// 過去地震時変換用の固定拠点番号リスト
  /// 連想配列の型に、下記に該当する値を定義
  /// 連想配列<過去地震時拠点番号, 現行の拠点番号>
  /// </summary>
  export const ConvertBaseNoListForPastEq = new Map<number, number>([
    [BaseConst.BaseNotForPastEq.Kumagaya, BaseConst.BaseNo.Kumagaya],
  ])
  /// <summary>
  /// 特定画面用の拠点並び替え番号
  /// 連想配列の型に、下記に該当する値を定義
  /// 連想配列<拠点No, 並び替え番号>
  /// </summary>
  // export static Dictionary<int, int> SpecialBaseNo = new Dictionary<int, int> {
  //     {BaseConst.BaseNo.Nanbu,           1},
  //     {BaseConst.BaseNo.NanbuNc,         2},
  //     {BaseConst.BaseNo.ChuoNc,          3},
  //     {BaseConst.BaseNo.Toubu,           4},
  //     {BaseConst.BaseNo.ToubuNc,         5},
  //     {BaseConst.BaseNo.ChibaNc,         6},
  //     {BaseConst.BaseNo.JoSo,            7},
  //     {BaseConst.BaseNo.Sakura,          8},
  //     {BaseConst.BaseNo.Tsukuba,         9},
  //     {BaseConst.BaseNo.Seibu,          10},
  //     {BaseConst.BaseNo.SeibuNc,        11},
  //     {BaseConst.BaseNo.TamaNc,         12},
  //     {BaseConst.BaseNo.Hokubu,         13},
  //     {BaseConst.BaseNo.HokubuNc,       14},
  //     {BaseConst.BaseNo.SaiTamaNc,      15},
  //     {BaseConst.BaseNo.Kumagaya,       16},
  //     {BaseConst.BaseNo.Utsunomiya,     17},
  //     {BaseConst.BaseNo.Kanagawa,       18},
  //     {BaseConst.BaseNo.KanagawaNanbu,  19},
  //     {BaseConst.BaseNo.KanagawaHokubu, 20},
  //     {BaseConst.BaseNo.ShonanNc,       21},
  //     {BaseConst.BaseNo.Honsha,         22},
  //     {BaseConst.BaseNo.Negishi,        23},
  //     {BaseConst.BaseNo.Makuhari,       24},
  //     {BaseConst.BaseNo.Gunma,          25},
  //     {BaseConst.BaseNo.Hitachi,        26}
  // };

  // /// <summary>
  // /// 割付情報
  // /// 全社：0、導管事業部：1、NC：2
  // /// </summary>
  // export enum AllocatedInfo
  // {
  //     All = 0, PipelineService = 1, Nc = 2
  // }
}

//     /// <summary>
//     /// 遠隔開判断結果
//     /// </summary>
//     export class OpenableJudgementConst
//     {
//         /// <summary>
//         /// 遠隔開判断結果
//         /// -2:既に開いてる、-1:開可能
//         /// 0:判定中、1:SSV遮断、2:通信不能、3:瞬時値が古い、4:1次圧、制御圧がない、5:圧力差あり
//         /// </summary>
//         export enum OpenableJudgeResult
//         {
//             Opend = -2, Openable = -1,
//             Judging = 0, SsvShut = 1, ComUnable = 2, OldValue = 3, NoValue = 4, PressDiff = 5
//         };
//     }

//     /// <summary>
//     /// 外部情報種別
//     /// </summary>
//     export class ExtCooperationInfosConst
//     {
//         /// <summary>
//         /// 外部情報種別
//         /// 1: 東京消防庁、2:横浜消防局、3:埼玉消防局、99:漏えい(Eagle-Sub)
//         /// </summary>
//         export enum InfoType
//         {
//             Tokyo = 1, Yokohama = 2, Saitama = 3, leak = 99
//         };
//     }

//     /// <summary>
//     /// 訓練
//     /// </summary>
//     export class TrainingConst
//     {
//         /// <summary>
//         /// 地震種別
//         /// 1:震央(epicenter)、2:断層(fault)
//         /// </summary>
//         export enum EqType
//         {
//             Epicenter = 1, Fault = 2
//         }
//     }

/// <summary>
/// フィルタ用定数定義
/// </summary>
export namespace FilterConst {
  /// <summary>
  /// フィルタ種別
  /// -1: なし、
  /// 0:Kブロック番号、
  /// 1: 文字列、2:文字列リスト、3:数字、4:チェック、5:真偽リスト、
  /// 6:日付(yyyy/MM/dd HH:mm:ss)、7:日付(yyyy/MM/dd)、8:日付(yyyy/MM/dd HH:mm)
  /// </summary>
  export enum FilterType {
    None = -1,
    KBlockNo = 0,
    String = 1,
    StringList = 2,
    Numeric = 3,
    Check = 4,
    BoolList = 5,
    DateTime = 6,
    DateTime_yyyyMMdd = 7,
    DateTime_yyyyMMddHHmm = 8,
  }

  /// <summary>
  /// 値種別
  /// 0: 等しい、1:以上、2:以下、3:含む、4:TRUE、5:FALSE
  /// </summary>
  export enum ValueType {
    Equal = 0,
    AndOver = 1,
    AndFewer = 2,
    Like = 3,
    True = 4,
    False = 5,
  }
}

//     /// <summary>
//     /// 印刷用定数定義
//     /// </summary>
//     export class PrintConst
//     {
//         public readonly ESCAPE_STR = "*";

//         /// <summary>
//         /// 停止実施連絡書 追加参考情報行見出し
//         /// </summary>
//         public readonly STOPPED_INFO_STR                   = "①　今回供給停止するＬブロック需要家件数（②＋③）";
//         public readonly STOPPED_INFO_INCLUDE_S_STR         = "②　　├追加で供給停止される需要家件数";
//         public readonly STOPPED_DONE_INFO_STR              = "③　　└既に供給停止している需要家件数";
//         public readonly FEEL_EQ_INFO_STR                   = "④　③以外で既に供給停止している需要家件数";
//         public readonly TOTAL_STOPPED_COUNT_STR            = "　　供給停止需要家件数（①＋④）";
//         public readonly REMOTE_OPEN_INFO_STR               = "今回遠隔Ｄ復旧が完了したＳブロック";
//         public readonly REMOTE_OPEN_DONE_INFO_STR          = "前回までに遠隔Ｄ復旧が完了したＳブロック";
//         public readonly TOTAL_REMOTE_OPEN_COUNT_STR        = "遠隔Ｄ復旧需要家件数";
//         public readonly TOTAL_REMOTE_OPEN_PATROL_COUNT_STR = "SUPREMEの開巡回リストを確認し、担当エリアの開巡回を行ってください";

//         /// <summary>
//         /// 値種別
//         /// 0: 通常、1:遠隔D復旧、2:遠隔開巡回、3:通常(1次判断専用)
//         /// </summary>
//         export enum RemoteOperateType
//         {
//             Normal = 0, DRestoration = 1, RemoteOpenPatrol = 2, NormalLpStopFirstOnly = 3
//         }

//         /// <summary>
//         /// セル結合パターン
//         /// 0: 通常明細行、1: タイトル行、2: ガバナ明細行、3: 開巡回明細行、4:開巡回タイトル行、5:ブロック遮断用明細行、6:ブロック遮断用タイトル行
//         /// </summary>
//         export enum MergeCellPattern
//         {
//             CommonDetail = 0, Title = 1, GovernorDetail = 2, PatrolDetail = 3, PatrolTitle = 4, CommonDetailAtFirstJudge = 5, ShutoffTitle = 6
//         }

//         /// <summary>
//         /// 印刷区分
//         /// 0: 印刷と保存の両方とも実施しない[Non]、1:印刷のみを実施[PrintOnly]、2:保存のみを実施[SaveOnly]、3: 印刷と保存を両方とも実施[PrintAndSave]
//         /// </summary>
//         export enum PrintingDivision
//         {
//             Non = 0, PrintOnly = 1, SaveOnly = 2, PrintAndSave = 3
//         }
//     }

//     /// <summary>
//     /// ポップアップメッセージ用定数定義
//     /// </summary>
//     export class PopupConst
//     {
//         public readonly STOP_JUDGE1 = "低圧供給停止判断が確定しました\n２－１．第1次緊急停止判断Lブロック操作を実行してください";
//         public readonly STOP_JUDGE2 = "中圧供給停止判断が確定しました\n３．中圧Kブロック化・中圧供給停止対応を確認してください";
//         public readonly STOP_JUDGE3 = "中圧ブロック化判断が確定しました\n３．中圧Kブロック化・中圧供給停止対応を確認してください";

//         public readonly ADDITIONAL_STOP_JUDGE_1ST = "停止判断確定後の追加供給停止判断が出ました\n２－１．第1次緊急停止判断Lブロック操作を実行してください\n(1次供給停止判断:{0})";
//         public readonly ADDITIONAL_STOP_JUDGE_MP = "供給停止判断確定後の追加判断が出ました\n３．中圧Kブロック化・中圧供給停止対応を確認してください\n(中圧供給停止判断:{0})";
//         public readonly ADDITIONAL_STOP_JUDGE_KB = "供給停止判断確定後の追加判断が出ました\n３．中圧Kブロック化・中圧供給停止対応を確認してください\n(Kブロック化判断:{0})";

//         public readonly TSUNAMI_STOP_JUDGEMENT_STR = "津波ブロック内での水位警報および、相模湾沿いでの大津波警報が発報されました。\n"
//             + "下記を実行してください。\n・TGCSによる中圧津波ブロック停止\n・SUPREMEによる低圧津波ブロック停止(６．津波ブロック操作)";

//         public readonly MP_STOP_INFO_STR = "TGCSより中圧供給停止実施情報が連携されました\n"
//             + "関連する低圧Lブロックの供給停止を実施してください\n(３－４．中圧停止に伴う低圧ブロック停止操作)";

//         public readonly SHUTOFF_LBLOCK_COMPLETED_1ST = "ブロック遮断操作結果が確定しました。\n２－２．閉巡回リストを印刷して、現場の閉巡回を実施してください。";
//         public readonly SHUTOFF_LBLOCK_COMPLETED_2ND = "ブロック遮断操作結果が確定しました。\n５－２．閉巡回リストを印刷して、現場の閉巡回を実施してください。";
//         public readonly SHUTOFF_LBLOCK_COMPLETED_MP = "ブロック遮断操作結果が確定しました。\n３－５．閉巡回リストを印刷して、現場の閉巡回を実施してください。";
//         public readonly SHUTOFF_LBLOCK_COMPLETED_TSUNAMI = "ブロック遮断操作結果が確定しました。\n６－２．閉巡回リストを印刷して、現場の閉巡回を実施してください。";
//         public readonly SHUTOFF_LBLOCK_NOT_COMPLETED = "ブロック遮断操作が完了しませんでした。";

//         public readonly ADD_D_RESTORATION_SBLOCK1 = "遠隔D復旧対象のSブロックが追加されました";
//         public readonly ADD_D_RESTORATION_SBLOCK2 = "遠隔D復旧対象のSブロックが追加されました。\n４－１．遠隔D復旧操作画面より、遠隔D復旧を実行して下さい。";
//         public readonly D_RESTORATION_FAILED = "遠隔D復旧の実施に失敗しました\n（念のため、遠隔D復旧・操作/結果確認画面で\n 実施結果を確認して下さい）";
//         public readonly D_RESTORATION_PRINTOUT = "遠隔D復旧実施連絡書を印刷しました";

//         public readonly REMOTE_OPEN_PATROL_COMPLETED = "遠隔開巡回操作結果が確定しました。\n７－６．巡回リストから開巡回リストを印刷して、\n現場の開巡回を実施してください。";
//         public readonly REMOTE_OPEN_PATROL_NOT_COMPLETED = "遠隔開巡回操作が完了しませんでした。";
//         public readonly REMOTE_OPEN_PATROL_FAILED = "遠隔開巡回の実施に失敗しました\n（念のため、遠隔開巡回・操作/結果確認画面で\n 実施結果を確認して下さい）";
//         public readonly REMOTE_OPEN_PATROL_PRINTOUT = "遠隔開巡回実施連絡書を印刷しました";

//         public readonly EQ_INFO_ERROR = "震源情報が正しく取得できていません。\n\n気象庁発表の震源情報を入力してください。\n\n" +
//                     "・地震発生時間\n・地震名\n・震源\n・マグニチュード\n・深さ(km)";

//         public readonly FIXED_MM_CALL = "マイコン対応予測が確定しました\n１．TOPページのマイコン対応予測画面を確認してください";

//         public readonly NOTIFY_MAIN_EQMODE = "本番側で地震が発生しています。本番側に切り替えますか？";
//     }

//     /// <summary>
//     /// NULL文字列定数定義
//     /// </summary>
export class NullStringConst {
  public static readonly NULL_STR = 'NULL'
}

//     /// <summary>
//     /// サウンド種別
//     /// </summary>
//     export enum SoundType
//     {
//         None = 0, EqInfo = 1, EqStart = 2, ZoomIn = 3, Tsunami = 4
//     }

/// <summary>
/// 定数定義
/// </summary>
export namespace GlobalConst {
  /// <summary>
  /// 50mメッシュのサイズ [m]
  /// </summary>
  export const MESH_SIZE = 50

  /// <summary>
  /// 大メッシュのサイズ 東西方向 [m]
  /// </summary>
  export const BIG_MESH_WIDTH = 2500

  /// <summary>
  /// 大メッシュのサイズ 南北方向 [m]
  /// /// </summary>
  export const BIG_MESH_HEIGHT = 3500

  /// <summary>
  /// マッピング座標の原点の大メッシュ番号(0101)のX
  /// </summary>
  export const MAP_ORG_BIG_MESH_X = 1

  /// <summary>
  /// マッピング座標の原点の大メッシュ番号(0101)のY
  /// </summary>
  export const MAP_ORG_BIG_MESH_Y = 1

  /// <summary>
  /// マッピング座標のメートルに対する倍率
  /// </summary>
  export const MAPPING_SCALE_FACTOR = 10

  /// <summary>
  /// 被害数計算用 稼働率
  /// </summary>
  export const OPERATE_RATE_SI_60_OVER_LATER_1 = 31 // 1日後、最大SI値60以上
  export const OPERATE_RATE_SI_60_OVER_LATER_2 = 36 // 2日後、最大SI値60以上
  export const OPERATE_RATE_SI_60_OVER_LATER_3 = 100 // 3日後以降、最大SI値60以上
  export const OPERATE_RATE_SI_60_UNDER_LATER_1 = 69 // 1日後、最大SI値60未満
  export const OPERATE_RATE_SI_60_UNDER_LATER_2 = 82 // 2日後、最大SI値60未満
  export const OPERATE_RATE_SI_60_UNDER_LATER_3 = 100 // 3日後以降、最大SI値60未満

  /// <summary>
  /// 延べ必要班数計算用 稼働率
  /// (被害数計算用稼働率と重複している可能性あり)
  /// </summary>
  export const WORK_RATE = 2.0

  /// <summary>
  /// 重要項目閾値: 感震遮断率
  /// </summary>
  export const THRESHOLD_SHUTOFF_RATE = 0.5

  /// <summary>
  /// 重要項目閾値: ガバナ停止率
  /// </summary>
  export const THRESHOLD_GOV_STOP_RATE = 0.5

  /// <summary>
  /// 重要項目閾値: LP最低
  /// </summary>
  export const THRESHOLD_LP_MIN = 1.5

  /// <summary>
  /// 重要項目閾値: 停電率
  /// </summary>
  export const THRESHOLD_POWER_FAILURE_RATE = 0.5

  /// <summary>
  /// 外管被害数累計閾値(1)
  /// ブロック遮断画面で参照する
  /// 閾値(2)より小さい値を設定する必要がある
  /// </summary>
  export const THRESHOLD_SUM_DMG_CNT_1 = 600

  /// <summary>
  /// 外管被害数累計閾値(2)
  /// ブロック遮断画面で参照する
  /// </summary>
  export const THRESHOLD_SUM_DMG_CNT_2 = 900

  /// <summary>
  /// 被害程度(中圧被害)
  /// </summary>
  export const DAMAGE_LEVEL_ATTENTION = 2
  export const DAMAGE_LEVEL_DANGER = 3

  /// <summary>
  /// 圧力種別(中圧被害)
  /// </summary>
  export const MP_TYPE_MPA = 1
  export const MP_TYPE_MPB = 2

  /// <summary>
  /// ライン重要度(中圧被害)
  /// </summary>
  export const IMPORTANCE_BASE = 1
  export const IMPORTANCE_IMPORTANT = 2
  export const IMPORTANCE_GENERAL = 3

  /// <summary>
  /// ブロックラインにおける特別なコード
  /// </summary>
  export const BLOCK_LINE_CODE_JUMP = -4
  export const BLOCK_LINE_CODE_DOUGHNUT = -101

  /// <summary>
  /// 行政区のその他(99999)
  /// </summary>
  export const OTHER_GYOUSEIKU = 99999

  /// <summary>
  /// 属性リストの位置
  /// </summary>
  export const PROPERTYLIST_WIDTH = 0
  export const PROPERTYLIST_TYPE = 1
  export const PROPERTYLIST_ITEM = 2
  export const PROPERTYLIST_ALIGN = 3
  export const PROPERTYLIST_BORDER = 4
  export const HEADER_PROPERTYLIST_TOP = 0
  export const HEADER_PROPERTYLIST_WIDTH = 1
  export const HEADER_PROPERTYLIST_ITEM = 2
  export const HEADER_PROPERTYLIST_ITEM_TYPE = 0
  export const HEADER_PROPERTYLIST_ITEM_SORT_TAG = 4
  export const HEADER_PROPERTYLIST_ITEM_SORTMARK_LEFT = 5
  export const HEADER_PROPERTYLIST_ITEM_SORTMARK_TOP = 6
  export const HEADER_PROPERTYLIST_ITEM_TEXT = 1
  export const HEADER_PROPERTYLIST_ITEM_LEFT = 2
  export const HEADER_PROPERTYLIST_ITEM_TOP = 3

  /// <summary>
  /// 都道府県名称(都県コードから)
  /// </summary>
  export const TOKEN_NAME: string[] = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '茨城県',
    '栃木県',
    '群馬県',
    '埼玉県',
    '千葉県',
    '東京都',
    '神奈川県',
  ]

  /// <summary>
  /// ブロック区分
  /// </summary>
  export enum BlockCategory {
    Designate = 0,
    Lq = 1,
    CapitalOfCentral = 2,
    Tsunami = 3,
  }

  /// <summary>
  /// ブロック区分名称("指定","液状化","首都中枢","津波"の各ブロックの表記)
  /// </summary>
  export const BLOCK_CATEGORY_DICT: Map<string, string> = new Map<string, string>([
    [GlobalConst.BlockCategory[GlobalConst.BlockCategory.Designate].toString(), '指定'],
    [GlobalConst.BlockCategory[GlobalConst.BlockCategory.Lq].toString(), '液状化'],
    [GlobalConst.BlockCategory[GlobalConst.BlockCategory.CapitalOfCentral].toString(), '首都中枢'],
    [GlobalConst.BlockCategory[GlobalConst.BlockCategory.Tsunami].toString(), '津波'],
  ])

  /// <summary>
  /// 首都中枢ブロック
  /// </summary>
  export const CAPITAL_OF_CENTRAL_BLOCKS_DICT: Map<string, string> = new Map<string, string>([
    ['K1L24', '霞ヶ関'],
    ['K1L25', '永田町'],
    ['K1L26', '都庁'],
    ['K1L27', '東京駅'],
  ])

  /// <summary>
  /// ヘッダー行の標準の高さ
  /// </summary>
  export const LINE_HEIGHT = 20

  /// <summary>
  /// ブロック一覧のヘッダー行の高さ
  /// </summary>
  export const SHUTOFF_BLOCKLIST_HEADER_HEIGHT = 115

  /// <summary>
  /// ソートボーダーのキャンバスの名前のキー文字列
  /// (この文字列にソートーキーを入れ込んで使う)
  /// </summary>
  export const SORT_BORDER_CANVAS_KEY_STRING = 'Sort{0}'

  /// <summary>
  /// ソートボーダーのグラデーションの名前のキー文字列
  /// (この文字列にソートーキーを入れ込んで使う)
  /// </summary>
  export const SORT_BORDER_GRADIENT_KEY_STRING = 'SortBorderColor{0}'

  /// <summary>
  /// ソート矢印(上)の名前のキー文字列
  /// (この文字列にソートーキーを入れ込んで使う)
  /// </summary>
  export const SORT_UP_MARK_KEY_STRING = 'Sort{0}Up'

  /// <summary>
  /// ソート矢印(下)の名前のキー文字列
  /// (この文字列にソートーキーを入れ込んで使う)
  /// </summary>
  export const SORT_DOWN_MARK_KEY_STRING = 'Sort{0}Down'

  /// <summary>
  /// メッセージ領域の表示時刻フォーマット
  /// </summary>
  export const MESSAGEAREA_DATETIME_FORMAT = 'yyyy/MM/dd HH:mm:ss'

  /// <summary>
  /// 遠隔操作用区切り文字
  /// </summary>
  export const REMOTE_OPERATE_DELIMITER = '$'

  /// <summary>
  /// 総件数の名前のキー文字列
  /// (この文字列に件数値を入れ込んで使う)
  /// </summary>
  export const TOTAL_COUNT_KEY_STRING = 'TotalCount{0}'

  /// <summary>
  /// ヘッダーボーダーの名前のキー文字列
  /// (この文字列に文字列を入れ込んで使う)
  /// </summary>
  export const HEADER_BORDER_KEY_STRING = 'HeaderBorder{0}'

  /// <summary>
  /// ヘッダーテキストの名前のキー文字列
  /// (この文字列に文字列を入れ込んで使う)
  /// </summary>
  export const HEADER_COMMENT_KEY_STRING = 'HeaderComment{0}'

  /// <summary>
  /// スプラッシュ画面のキャンバス
  /// </summary>
  export const SMALL_SPLASH_CANVAS = `<Canvas xmlns=""http://schemas.microsoft.com/client/2007"" xmlns:x=""http://schemas.microsoft.com/winfx/2006/xaml"" Width=""450"" Height=""320"" Opacity=""0.9"">
  <StackPanel Orientation=""Vertical"">
    <Border BorderThickness=""1,1,1,0"" BorderBrush=""#FF000000"" Padding=""0"">
      <Image Source=""image/supreme_splash.jpg"" Width=""450"" Height=""300"" />
    </Border>
    <Border BorderThickness=""1"" BorderBrush=""#FF000000"" Padding=""0"">
      <Rectangle Width=""450"" Height=""20"" Canvas.Left=""0"" Canvas.Top=""0"" x:Name=""splashRect"">
        <Rectangle.Fill>
          <LinearGradientBrush>
            <GradientStop Color=""#FF1505A9"" Offset=""0.0""/>
            <GradientStop Color=""#FF6656FA"" Offset=""0.5"" x:Name=""splashStop""/>
            <GradientStop Color=""#FFFFFFFF"" Offset=""1.0"" />
          </LinearGradientBrush>
        </Rectangle.Fill>
        <Rectangle.Triggers>
          <EventTrigger RoutedEvent=""Rectangle.Loaded"">
            <BeginStoryboard>
              <Storyboard>
                <DoubleAnimation
                  Storyboard.TargetName=""splashStop""
                  Storyboard.TargetProperty=""Offset""
                  From=""0"" To=""1"" Duration=""0:0:3""
                  AutoReverse=""True"" RepeatBehavior=""Forever"" />
              </Storyboard>
            </BeginStoryboard>
          </EventTrigger>
        </Rectangle.Triggers>
      </Rectangle>
    </Border>
  </StackPanel>
</Canvas>`
}

/// <summary>
/// よく使う色を定義する
/// </summary>
class _SupColors {
  /// <summary>
  /// ヘッダキャンパスの色
  /// </summary>
  public get HeaderCanvasColor() {
    return 'rgba(221, 221, 221, 1)'
  }

  /// <summary>
  /// ヘッダキャンパスの色(ソート時)
  /// </summary>
  public get SortHeaderCanvasColor() {
    return 'rgba(170, 170, 170, 1)'
  }

  /// <summary>
  /// 一覧のボーダーの色
  /// </summary>
  public get ListBorderColor() {
    return 'rgba(170, 170, 170, 1)'
  }

  /// <summary>
  /// リンク選択時の背景色
  /// </summary>
  public get LinkBackgroundColor() {
    return 'rgba(47, 54, 153,1)'
  }

  /// <summary>
  /// LightCoral色を返す
  /// </summary>
  public get LightCoral() {
    return 'rgba(240, 128, 128, 1)'
  }

  /// <summary>
  /// Pink色を返す
  /// </summary>
  public get Pink() {
    return 'rgba(255, 192, 203, 1)'
  }

  /// <summary>
  /// LightPink色を返す
  /// </summary>
  public get LightPink() {
    return 'rgba(255, 223, 228, 1)'
  }

  /// <summary>
  /// LightYellow色を返す
  /// </summary>
  public get LightYellow() {
    return 'rgba(253, 255, 217, 1)'
  }

  /// <summary>
  /// Yellow色を返す
  /// </summary>
  public get Yellow() {
    return 'rgba(255, 255, 0, 1)'
  }

  /// <summary>
  /// LightGreen色を返す
  /// </summary>
  public get LightGreen() {
    return 'rgba(0, 255, 0, 1)'
  }
  /// <summary>
  /// PaleTurquoise色を返す
  /// </summary>
  public get PaleTurquoise() {
    return 'rgba(175, 238, 238, 1)'
  }

  /// <summary>
  /// Khaki色を返す
  /// </summary>
  public get Khaki() {
    return 'rgba(240, 230, 140, 1)'
  }

  /// <summary>
  /// YellowGreen色を返す
  /// </summary>
  public get YellowGreen() {
    return 'rgba(154, 205, 50, 1)'
  }

  /// <summary>
  /// Coral色を返す
  /// </summary>
  public get Coral() {
    return 'rgba(255, 127, 80, 1)'
  }

  /// <summary>
  /// Orangered色を返す
  /// </summary>
  public get Orangered() {
    return 'rgba(255, 69, 0, 1)'
  }

  /// <summary>
  /// 第1次緊急停止判断Ｌブロックの塗りつぶしの色を返す
  /// </summary>
  public get LpStopJudgement1() {
    return 'rgba(255, 100, 100, 1)'
  }

  /// <summary>
  /// 30kine超過率50%以上のＬブロックの塗りつぶしの色を返す
  /// </summary>
  public get KineOverLLine() {
    return 'rgba(255, 255, 30, 1)'
  }

  /// <summary>
  /// コメントの文字の色を返す
  /// </summary>
  public get Comment() {
    return 'rgba(51, 0, 102, 1)'
  }

  /// <summary>
  /// モーダルの色を返す
  /// </summary>
  public get Modal() {
    return 'rgba(20, 20, 20, 0.2745)'
  }
  /// <summary>
  /// Hyperlink色を返す
  /// </summary>
  public get Hyperlink() {
    return 'rgba(96, 144, 239, 1)'
  }

  /// <summary>
  /// 遠隔操作チェック時の色
  /// </summary>
  public get REMOTE_OPERATE_CHECK_BORDER_COLOR() {
    return 'rgba(224, 255, 255, 1)'
  }

  /// <summary>
  /// Lバルブ閉の色を返す
  /// </summary>
  public get CloseLValse() {
    return 'rgba(0, 0, 245, 1)'
  }
  /// <summary>
  /// Lバルブ開の色を返す
  /// </summary>
  public get OpenLValse() {
    //return 'rgba(255, 255, 153, 204)'; }()
    return 'rgba(199, 21, 133, 1)'
  }

  /// <summary>
  /// Lバルブ不明の色を返す
  /// </summary>
  public get UnKnownLValse() {
    return 'gray'
  }

  /// <summary>
  /// 存在しない項目の背景色を返す
  /// </summary>
  public get NoColumnBackGround() {
    return 'rgba(238, 238, 238, 1)'
  }
}
export const SupColors = new _SupColors()

/// <summary>
/// 正規表現マッチパターン
/// </summary>
export class RegularExpressionsPattern {
  /// <summary>
  /// 数値5桁、整数部1桁、少数部1-2桁マッチパターン
  /// </summary>
  public readonly RegPattrnt1_2 = '^[0-9]{1}(.[0-9]{1,2})?$'

  /// <summary>
  /// 数値5桁、整数部1-3桁、少数部1-2桁マッチパターン
  /// </summary>
  public readonly RegPattrnt3_2 = '^[0-9]{1,3}(.[0-9]{1,2})?$'
}

/// <summary>
/// 管轄エリア定型文
/// </summary>
export class JurisdictionAreaFixedPhrase {
  public readonly AREA = 'エリア'
  public readonly HONTEN = '日立、群馬、宇都宮地区以外'
  public readonly HONTEN_FOR_TRN_SETTING = '日立、群馬、宇都宮地区除く'
  public readonly BRANCH = '日立、群馬、宇都宮地区'
}

export enum Visibility {
  Visible = 0,
  Collapsed = 1,
}
