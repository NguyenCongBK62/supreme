import { useLiveQuery } from 'dexie-react-hooks'
import React, { useEffect, useState } from 'react'
import { LpDmgCntConst } from '../../../constants/GlobalConst'
import { db } from '../../../models/db'
import KDashBlockLBlockModel from '../../../models/KDashBlockLBlockModel'
import KDashBlockModel from '../../../models/KDashBlockModel'
import LBlockModel from '../../../models/LBlockModel'
import LBlockValModel from '../../../models/LBlockValModel'
import SBlockModel from '../../../models/SBlockModel'
import SBlockValModel from '../../../models/SBlockValModel'
import { useAppDispatch } from '../../../store/hooks'
import { createWindow } from '../../../store/modules/PointData'
import commonUtil from '../../../utilities/CommonUtil'
import FilterConditionPart from '../../components/FilterConditionPart/FilterConditionPart'
import { DisplayTypeConst, ModalTypeConst } from '../../components/PopupWindow/PopupWindow'
import TableGrid from '../../components/Table'
import Layout from '../../layouts/Layout'
import './shutoffBlock.scss'

export type TableCellType = {
  lblockId: number
  AllKBlockName: string | object
  遮断: boolean | string
  ブロック番号: number | string
  停止判断: number | string
  依頼状況: number | string
  総需要家件数: number | string
  供給継続需要家件数: number | string
  ブロック区分: string
  遮断設定: number | string
  需要家漏えい遭遇率: string
  緊急: number | string
  最大SI: number | string
  ガバナ停止率: number | string
  '最低LP(単独除く)': number | string
  '最低LP(単独含む)': number | string
  グラフ表示: number | string
  ガバナ一覧: number | string
  D復旧済Sブロック: string
  停電率: number | string
  火災件数: number | string
  漏えい受付: number | string
}
const ShutoffBlock = () => {
  /*Start ShutoffBlock.cs */

  // #region 定数定義

  // /// <summary>
  // /// S表示時の、1行あたりの表示時間
  // /// </summary>
  // private const int LAYER_SBLOCK_SHOW_SEC = 100;

  // /// <summary>
  // /// S表示時の、表示時間の上限
  // /// </summary>
  // private const int LAYER_SBLOCK_SHOW_SEC_LIMIT = 500;

  // /// <summary>
  // /// 子Sブロック行のインデント幅
  // /// </summary>
  // private const int INDENT_WIDTH = 10;

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック)のキャンバスの名前のキー文字列
  // /// (この文字列にLブロックIDを入れ込んで使う)
  // /// </summary>
  // private const string SHUTOFF_LBLOCK_CANVAS_KEY_STRING = "ShutoffLblockKey_{0}";

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック)の階層マークの名前のキー文字列
  // /// (この文字列にLブロックIDを入れ込んで使う)
  // /// </summary>
  // private const string SHUTOFF_LBLOCK_LAYER_MARK_KEY_STRING = "ShutoffLblockLayerMarkKey_{0}";

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック)の階層Sブロックのスタックパネルの名前のキー文字列
  // /// (この文字列にLブロックIDを入れ込んで使う)
  // /// </summary>
  // private const string SHUTOFF_LBLOCK_LAYER_STACK_PANEL_KEY_STRING = "ShutoffLblockLayerStackPanelKey_{0}";

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック)の子Sブロックキャンバスの名前のキー文字列
  // /// (この文字列にSブロックIDを入れ込んで使う)
  // /// </summary>
  // private const string SHUTOFF_LBLOCK_LAYER_SBLOCK_KEY_STRING = "ShutoffLblockLayerSblockKey_{0}";

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面のキャンバスの名前のキー文字列
  // /// (この文字列にLブロックIDを入れ込んで使う)
  // /// </summary>
  // private const string SHUTOFF_REQ_STATUS_CANVAS_KEY_STRING = "ShutoffReqStatusKey_{0}";

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面の階層マークの名前のキー文字列
  // /// (この文字列にLブロックIDを入れ込んで使う)
  // /// </summary>
  // private const string SHUTOFF_REQ_STATUS_LAYER_MARK_KEY_STRING = "ShutoffReqStatusLayerMarkKey_{0}";

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面の階層Sブロックのスタックパネルの名前のキー文字列
  // /// (この文字列にLブロックIDを入れ込んで使う)
  // /// </summary>
  // private const string SHUTOFF_REQ_STATUS_LAYER_STACK_PANEL_KEY_STRING = "ShutoffReqStatusLayerStackPanelKey_{0}";

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面の子Sブロックキャンバスの名前のキー文字列
  // /// (この文字列にSブロックIDを入れ込んで使う)
  // /// </summary>
  // private const string SHUTOFF_REQ_STATUS_LAYER_SBLOCK_KEY_STRING = "ShutoffReqStatusLayerSblockKey_{0}";

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面のキャンバスの名前のキー文字列
  // /// (この文字列にSブロックIDを入れ込んで使う)
  // /// </summary>
  // private const string FEEL_EQ_SHUTOFF_STATUS_CANVAS_KEY_STRING = "FeelEqShutoffStatusKey_{0}";

  // /// <summary>
  // /// パターンのボーダーの名前のキー文字列
  // /// (この文字列にパターン番号を入れ込んで使う)
  // /// </summary>
  // public const string PATTERN_BORDER_KEY_STRING = "PatternBorder_{0}";

  // /// <summary>
  // /// チェックシート起動時のエラーメッセージ
  // /// </summary>
  // private const string CHECKSHEET_OPEN_ERROR_MSG = "2次の停止ブロックを選択(遮断にチェック)してください";

  // /// <summary>
  // /// パターンが存在する場合の表示文字列
  // /// </summary>
  // private const string PATTERN_EXIST_TEXT = "あり";

  // /// <summary>
  // /// パターンが存在しない場合の表示文字列
  // /// </summary>
  // private const string PATTERN_NOT_EXIST_TEXT = "－";

  // /// <summary>
  // /// 存在しない項目の背景色
  // /// </summary>
  // private readonly SolidColorBrush NO_COLUMN_BACKGROUND = new SolidColorBrush(Color.FromArgb(255, 238, 238, 238));

  // /// <summary>
  // /// 停止判断の背景色
  // /// </summary>
  // private readonly SolidColorBrush[] JUDGERESULT_BACKGROUND = new SolidColorBrush[] { null, null, new SolidColorBrush(), new SolidColorBrush(SupColors.LightPink) };

  // /// <summary>
  // /// 重要項目の背景色
  // /// </summary>
  // private readonly SolidColorBrush[] FLG_BACKGROUND = new SolidColorBrush[] { null, new SolidColorBrush(Colors.Red) };

  // /// <summary>
  // /// 道路上の被害推定(継続地区累計) 閾値(1)超え時の背景色
  // /// </summary>
  // private readonly SolidColorBrush OVER_LP_DMG_CNT1_BORDER_COLOR = new SolidColorBrush(Color.FromArgb(180, 200, 200, 0));

  // /// <summary>
  // /// 道路上の被害推定(継続地区累計) 閾値(2)超え時の背景色
  // /// </summary>
  // private readonly SolidColorBrush OVER_LP_DMG_CNT2_BORDER_COLOR = new SolidColorBrush(Color.FromArgb(180, 206, 0, 206));

  // /// <summary>
  // /// 完全に遠隔D復旧が成功した時の背景色
  // /// </summary>
  // private readonly SolidColorBrush REMOTE_OPEN_COMPLETED_BORDER_COLOR = new SolidColorBrush(Color.FromArgb(255, 128, 255, 255));

  // /// <summary>
  // /// 遮断チェック時の枠線の太さ
  // /// </summary>
  // private readonly Thickness SHUTOFF_CHECK_BORDER_THICKNESS = new Thickness(4, 4, 4, 4);

  // /// <summary>
  // /// パターンのデフォルトのボーダーの背景色
  // /// </summary>
  // private readonly SolidColorBrush PATTERN_DEFAULT_BORDER_COLOR = new SolidColorBrush(Color.FromArgb(255, 255, 255, 255));

  // /// <summary>
  // /// パターンのデフォルトのテキストの色
  // /// </summary>
  // private readonly SolidColorBrush PATTERN_DEFAULT_TEXT_COLOR = new SolidColorBrush(Colors.Black);

  // /// <summary>
  // /// パターンのデフォルトのテキストリンクの色
  // /// </summary>
  // private readonly SolidColorBrush PATTERN_DEFAULT_TEXT_LINK_COLOR = new SolidColorBrush(Colors.Blue);

  // /// <summary>
  // /// パターンの選択状態のボーダーの背景色
  // /// </summary>
  // private readonly SolidColorBrush PATTERN_SELECTED_BORDER_COLOR = new SolidColorBrush(SupColors.LinkBackgroundColor);

  // /// <summary>
  // /// パターンの選択状態のテキストの色
  // /// </summary>
  // private readonly SolidColorBrush PATTERN_SELECTED_TEXT_COLOR = new SolidColorBrush(Color.FromArgb(255, 255, 255, 255));

  // /// <summary>
  // /// パターン(ブロック遮断検討・操作/結果確認)のページネートする件数
  // /// </summary>
  // public enum PatternPagenateNum
  // {
  //     FirstL = 999, SecondL = 999, OtherL = 999, TsunamiL = 999, MpStopL = 999, ShutoffReqSt = 999, FeelEqShutoffSt = 9999
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック)キャンバス項目
  // /// </summary>
  // private enum ShutoffLblockCanvasItem
  // {
  //     LayerMark = 0,
  //     ShutoffChecked = 1, BlockName = 2, JudgeResult = 3, RequestStatus = 4, CustomerCnt = 5,
  //     ContinueCustomerCnt = 6, AreaName = 7, BlockCategory = 8, ShutoffBorderSi = 9, KBlockName = 10,
  //     LeakEncounterRate = 11, LpSupplyDmgCntEmergency = 12, LpSupplyDmgCnt = 13, RepresentMaxSi = 14, MaxSi = 15,
  //     AveSi = 16, ShutoffSi = 17, Over30KineRate = 18, MaxComAbleOver30KineRate = 19, Over60KineRate = 20,
  //     MaxComAbleOver60KineRate = 21, Over70KineRate = 22, MaxComAbleOver70KineRate = 23, Over80KineRate = 24, MaxComAbleOver80KineRate = 25,
  //     Over90KineRate = 26, MaxComAbleOver90KineRate = 27, GovernorStopRate = 28, LpMin = 29, LpAve = 30,
  //     MpMin = 31, LqAlarmRate = 32, PlAve = 33, GraphShow = 34, GovernorListShow = 35,
  //     restorationWorkStatus = 36, RemoteOpenSBlock = 37, PowerFailureRate = 38, FireCnt = 39, LeakCnt = 40,
  //     ComppartDstrRate = 41
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック)階層Sブロックキャンバス項目
  // /// </summary>
  // private enum ShutoffLblockLayerSblockCanvasItem
  // {
  //     LayerMark = 0,
  //     Indent = 1, ShutoffChecked = 2, BlockName = 3, JudgeResult = 4, RequestStatus = 5,
  //     CustomerCnt = 6, ContinueCustomerCnt = 7, AreaName = 8, BlockCategory = 9, ShutoffBorderSi = 10,
  //     KBlockName = 11, LeakEncounterRate = 12, LpSupplyDmgCntEmergency = 13, LpSupplyDmgCnt = 14, RepresentMaxSi = 15,
  //     MaxSi = 16, AveSi = 17, ShutoffSi = 18, GovernorStopRate = 19, Over30KineRate = 20,
  //     MaxComAbleOver30KineRate = 21, Over60KineRate = 22, MaxComAbleOver60KineRate = 23, Over70KineRate = 24, MaxComAbleOver70KineRate = 25,
  //     Over80KineRate = 26, MaxComAbleOver80KineRate = 27, Over90KineRate = 28, MaxComAbleOver90KineRate = 29, LpMin = 30,
  //     LpAve = 31, MpMin = 32, LqAlarmRate = 33, PlAve = 34, GraphShow = 35,
  //     GovernorListShow = 36, restorationWorkStatus = 37, RemoteOpenSBlock = 38, SortThresholdOver = 39, FireCnt = 40,
  //     LeakCnt = 41, ComppartDstrRate = 42
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面キャンバス項目
  // /// </summary>
  // private enum ShutoffReqStatusCanvasItem
  // {
  //     LayerMark = 0,
  //     AreaName = 1, BlockName = 2, CustomerCnt = 3, ContinueCustomerCnt = 4, BlockCategory = 5,
  //     ShutoffBorderSi = 6, MaxSi = 7, GovernorStopRate = 8, GovCnt = 9, StopCnt = 10,
  //     ContinuanceCnt = 11, UnconfirmedCnt = 12, ShutoffStatus = 13, ShutoffTargetCnt = 14, ShutoffSuccessCnt = 15,
  //     ShutoffFailedCnt = 16, ShutoffRequestedAt = 17, ShutoffEndedAt = 18, ShutoffUnableCnt = 19, ShutoffDoneCnt = 20
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面階層Sブロックキャンバス項目
  // /// </summary>
  // private enum ShutoffReqStatusLayerSblockCanvasItem
  // {
  //     LayerMark = 0,
  //     Indent = 1, AreaName = 2, BlockName = 3, CustomerCnt = 4, ContinueCustomerCnt = 5,
  //     BlockCategory = 6, ShutoffBorderSi = 7, MaxSi = 8, GovernorStopRate = 9, GovCnt = 10,
  //     StopCnt = 11, ContinuanceCnt = 12, UnconfirmedCnt = 13, ShutoffStatus = 14, ShutoffTargetCnt = 15,
  //     ShutoffSuccessCnt = 16, ShutoffFailedCnt = 17, ShutoffRequestedAt = 18, ShutoffEndedAt = 19, ShutoffUnableCnt = 20,
  //     ShutoffDoneCnt = 21
  // }

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面キャンバス項目
  // /// </summary>
  // private enum FeelEqShutoffStatusCanvasItem
  // {
  //     AreaName = 0,
  //     SBlockName = 1, CustomerCnt = 2, ContinueCustomerCnt = 3, ShutoffBorderSi = 4, ShutoffSi = 5,
  //     MaxSi = 6, GovernorStopRate = 7, GovCnt = 8, StopCnt = 9, ContinuanceCnt = 10,
  //     UnconfirmedCnt = 11
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック)タグ
  // /// </summary>
  // private enum ShutoffLblockTag
  // {
  //     LayerMark = 0,
  //     ShutoffCheked = 1, BlockName = 2, JudgeResult = 3, RequestStatus = 4, CustomerCnt = 5,
  //     ContinueCustomerCnt = 6, AreaName = 7, BlockCategory = 8, ShutoffBorderSi = 9, KBlockName = 10,
  //     LpSupplyDmgCntEmergency = 11, LpSupplyDmgCnt = 12, RepresentMaxSi = 13, MaxSi = 14, AveSi = 15,
  //     ShutoffSi = 16, Over30KineRate = 17, MaxComAbleOver30KineRate = 18, Over60KineRate = 19, MaxComAbleOver60KineRate = 20,
  //     Over70KineRate = 21, MaxComAbleOver70KineRate = 22, Over80KineRate = 23, MaxComAbleOver80KineRate = 24, Over90KineRate = 25,
  //     MaxComAbleOver90KineRate = 26, GovernorStopRate = 27, LpMinConnected = 28, LpMin = 29, LpAve = 30,
  //     LpAveConnected = 31, MpaMin = 32, MpbMin = 33, LqAlarmRate = 34, PlAve = 35,
  //     GraphShow = 36, GovernorListShow = 37, RestorationWorkStatus = 38, RemoteOpenSBlock = 39, PowerFailureRate = 40,
  //     FireCnt = 41, LeakCnt = 42, ComppartDstrRate = 43, LeakEncounterRate = 44
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面タグ
  // /// </summary>
  // private enum ShutoffReqStatusTag
  // {
  //     LayerMark = 0,
  //     AreaName = 1, BlockName = 2, CustomerCnt = 3, ContinueCustomerCnt = 4, BlockCategory = 5,
  //     ShutoffBorderSi = 6, MaxSi = 7, GovernorStopRate = 8, GovCnt = 9, StopCnt = 10,
  //     ContinuanceCnt = 11, UnconfirmedCnt = 12, ShutoffStatus = 13, ShutoffTargetCnt = 14, ShutoffSuccessCnt = 15,
  //     ShutoffFailedCnt = 16, ShutoffRequestedAt = 17, ShutoffEndedAt = 18, ShutoffUnableCnt = 19, ShutoffDoneCnt = 20
  // }

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面タグ
  // /// </summary>
  // private enum FeelEqShutoffStatusTag
  // {
  //     AreaName = 0,
  //     SBlockName = 1, CustomerCnt = 2, ContinueCustomerCnt = 3, ShutoffBorderSi = 4, ShutoffSi = 5,
  //     MaxSi = 6, GovernorStopRate = 7, GovCnt = 8, StopCnt = 9, ContinuanceCnt = 10,
  //     UnconfirmedCnt = 11
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック)の一覧を使用するパターン
  // /// </summary>
  // private readonly int[] USE_SHUTOFF_LBLOCK_LIST_PATTERN = new int[]{
  //     (int)ShutoffBlockPattern.FirstL,
  //     (int)ShutoffBlockPattern.SecondL,
  //     (int)ShutoffBlockPattern.TsunamiL,
  //     (int)ShutoffBlockPattern.MpStopL
  // };

  // /// <summary>
  // /// 編集用復旧情報 Model
  // /// </summary>
  // public class TmpExtGaskojiKaisenInfosModel
  // {
  //     /// <summary>
  //     /// 工事着手時間
  //     /// </summary>
  //     public DateTime? GasWorkStartedAt { get; set; }

  //     /// <summary>
  //     /// 工事完了時間
  //     /// </summary>
  //     public DateTime? GasWorkEndedAt { get; set; }

  //     /// <summary>
  //     /// ガスIN開始時間
  //     /// </summary>
  //     public DateTime? GasInStartedAt { get; set; }

  //     /// <summary>
  //     /// ガスIN完了時間
  //     /// </summary>
  //     public DateTime? GasInEndedAt { get; set; }

  //     /// <summary>
  //     /// 開栓数
  //     /// </summary>
  //     public int? openMeterCnt { get; set; }

  //     /// <summary>
  //     /// 全メータ数
  //     /// </summary>
  //     public int? meterCnt { get; set; }
  // }

  // #endregion

  // #region メンバ変数

  // /// <summary>
  // /// コントローラ
  // /// </summary>
  // private MainController controller;

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) ストーリーボード
  // /// </summary>
  // private Storyboard shutoffLblockStoryboard = new Storyboard();

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) 階層表示対象のLブロックID
  // /// </summary>
  // string shutoffLblockLayerOnLblockId = "";

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 ストーリーボード
  // /// </summary>
  // private Storyboard shutoffReqStatusStoryboard = new Storyboard();

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 階層表示対象のLブロックID
  // /// </summary>
  // string shutoffReqStatusLayerOnLblockId = "";

  /// <summary>
  /// ブロックリスト(L毎観測値)
  /// </summary>
  // let lblockValList: LBlockValModel[] = []

  // /// <summary>
  // /// ブロックリスト(S毎観測値)
  // /// </summary>
  // private List<SBlockValModel> sblockValList = new List<SBlockValModel>();

  // /// <summary>
  // /// 権限リスト
  // /// </summary>
  // private List<LBlockStopAuthorityModel> lBlockStopAuthorityList = null;

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) ブロックリストキャンバス
  // /// </summary>
  // private Canvas shutoffLblockListCanvas = null;

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) ブロックリストスタックパネル
  // /// </summary>
  // private StackPanel shutoffLblockListStackPanel = new StackPanel();

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 ブロックリストキャンバス
  // /// </summary>
  // private Canvas shutoffReqStatusListCanvas = null;

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 ブロックリストスタックパネル
  // /// </summary>
  // private StackPanel shutoffReqStatusListStackPanel = new StackPanel();

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面 ブロックリストキャンバス
  // /// </summary>
  // private Canvas feelEqShutoffStatusListCanvas = null;

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) ブロックリストヘッダーキャンバス
  // /// </summary>
  // private Canvas shutoffLblockListHeaderCanvas = null;

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 ブロックリストヘッダーキャンバス
  // /// </summary>
  // private Canvas shutoffReqStatusListHeaderCanvas = null;

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面 ブロックリストヘッダーキャンバス
  // /// </summary>
  // private Canvas feelEqShutoffStatusListHeaderCanvas = null;

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) ブロックリストキャンバスの縦スクロール
  // /// </summary>
  // private ScrollViewer shutoffLblockListScroll = null;

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 ブロックリストキャンバスの縦スクロール
  // /// </summary>
  // private ScrollViewer shutoffReqStatusListScroll = null;

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面 ブロックリストキャンバスの縦スクロール
  // /// </summary>
  // private ScrollViewer feelEqShutoffStatusListScroll = null;

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) 全選択チェックボックス
  // /// </summary>
  // private CheckBox allShutoffLblockCheck = null;

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) ブロック行作成時の属性リスト(NoCheckは遮断権限がない場合)
  // /// </summary>
  // private List<string> shutoffLblockPropertyList = new List<string>();
  // private List<string> shutoffLblockPropertyListNoCheck = new List<string>();

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) 階層Sブロック行作成時の属性リスト
  // /// </summary>
  // private List<string> shutoffLblockLayerSblockPropertyList = new List<string>();

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 ブロック行作成時の属性リスト
  // /// </summary>
  // private List<string> shutoffReqStatusPropertyList = new List<string>();

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 階層Sブロック行作成時の属性リスト
  // /// </summary>
  // private List<string> shutoffReqStatusLayerSblockPropertyList = new List<string>();

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面 ブロック行作成時の属性リスト
  // /// </summary>
  // private List<string> feelEqShutoffStatusPropertyList = new List<string>();

  /// <summary>
  /// 現在のパターン
  /// </summary>
  // let nowPattern = -1

  // /// <summary>
  // /// 現在のパターン(簡易/詳細)
  // /// </summary>
  // private int nowViewPattern = -1;

  // /// <summary>
  // /// 前回画面描画時のパターン(簡易/詳細)
  // /// </summary>
  // private int preViewPattern = -1;

  // /// <summary>
  // /// パターン毎のページを格納するコレクション
  // /// </summary>
  // private Dictionary<int, int> patternPageDic = new Dictionary<int, int>();

  // /// <summary>
  // /// パターン毎のソート条件を格納するコレクション
  // /// </summary>
  // private Dictionary<int, List<FilterManager.SortCondition>> patternSortCondDic = new Dictionary<int, List<FilterManager.SortCondition>>();

  /// <summary>
  /// パターン毎の絞り込み条件を格納するコレクション
  /// </summary>
  // const patternFilterCondDic = new Map<number, FilterManager.FilterCondition[]>()

  // /// <summary>
  // /// 印刷対象の行数
  // /// </summary>
  // private int printDataCnt = 0;

  // /// <summary>
  // /// 超過率塗りつぶし種別(印刷用)
  // /// </summary>
  // public enum FillOverKineRateType
  // {
  //     None = 0, over60KineRate = 1, over70KineRate = 2, over80KineRate = 3, over90KineRate = 4
  // }

  // /// <summary>
  // /// Sブロック表示の為の、位置調整ができるか
  // /// </summary>
  // private bool IsEnabledView = false;

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) Sブロック表示更新用タイマー
  // /// </summary>
  // private DispatcherTimer shutoffLblockTimer = new DispatcherTimer();

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) 表示Sブロック数
  // /// </summary>
  // private int shutoffLblockSBlockCnt = 0;

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) Sブロックを表示する親Lブロック行位置
  // /// </summary>
  // private double shutoffLblockLineHeight = 0.0;

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) (S表示前の)旧スクロール高さ
  // /// </summary>
  // private double shutoffLblockOldScrollHeight = 0.0;

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 Sブロック表示更新用タイマー
  // /// </summary>
  // private DispatcherTimer shutoffReqStatusTimer = new DispatcherTimer();

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 表示Sブロック数
  // /// </summary>
  // private int shutoffReqStatusSBlockCnt = 0;

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 Sブロックを表示する親Lブロック行位置
  // /// </summary>
  // private double shutoffReqStatusLineHeight = 0.0;

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 (S表示前の)旧スクロール高さ
  // /// </summary>
  // private double shutoffReqStatusOldScrollHeight = 0.0;

  // /// <summary>
  // /// 表示件数メッセージを表示
  // /// </summary>
  // private const string TOTAL_PAGE_CNT_VIEW_TEXT = "{0}件を表示";

  // /// <summary>
  // /// 供給停止ブロック選択時の外管被害数閾値
  // /// </summary>
  // private const int THRESHOLD_DMG_CNT = 5;

  // #endregion

  /// <summary>
  /// 画面初期処理
  /// </summary>
  /// <param name="mainController">コントローラ</param>
  // const Init = () => {
  // 初期処理(ハンドラ登録など)
  // ListRedraw(nowPattern)
  // 表の初期化
  // InitShutoffLblockList();
  // InitShutoffReqStatusList();
  // InitFeelEqShutoffStatusList();
  // SetPattern((int)GovernorListConst.GovernorListPattern.GovernorSimpleList);
  // SetPattern((int)GovernorListConst.GovernorListPattern.GovernorDetailList);
  // // 絞り込み条件の初期化
  // ShutoffBlockFilterConditionParts.Init();
  // ShutoffBlockFilterConditionParts.AllShowEvent += FilterConditionAllShowEvent;
  // ShutoffBlockFilterConditionParts.SortTextStackPanel.Visibility = Visibility.Visible;
  // // ページネートの初期化
  // Pagenate.Init(0);
  // Pagenate.PagenateEvent += delegate
  // {
  //     ListRedraw(nowPattern);
  // };
  // // 地震モード変更イベントを登録する
  // EqModeChanged(null, null);
  // controller.EqModeChanged += EqModeChanged;
  // // タイマーの設定
  // shutoffLblockTimer.Interval = TimeSpan.FromMilliseconds(1);
  // shutoffLblockTimer.Tick += new EventHandler(shutoffLblockTimer_Tick);
  // shutoffReqStatusTimer.Interval = TimeSpan.FromMilliseconds(1);
  // shutoffReqStatusTimer.Tick += new EventHandler(shutoffReqStatusTimer_Tick);
  // // 供給停止ブロック選択ボタン
  // var thresholdSumDmgCnt1 = SelectOverOutageButtonForThresholdSumDmgCnt1.Content.ToString();
  // SelectOverOutageButtonForThresholdSumDmgCnt1.Content = String.Format(thresholdSumDmgCnt1, GlobalConst.THRESHOLD_SUM_DMG_CNT_1);
  // SelectOverOutageButtonForThresholdSumDmgCnt1.Background = OVER_LP_DMG_CNT1_BORDER_COLOR;
  // var thresholdSumDmgCnt2 = SelectOverOutageButtonForThresholdSumDmgCnt2.Content.ToString();
  // SelectOverOutageButtonForThresholdSumDmgCnt2.Content = String.Format(thresholdSumDmgCnt2, GlobalConst.THRESHOLD_SUM_DMG_CNT_2);
  // SelectOverOutageButtonForThresholdSumDmgCnt2.Background = OVER_LP_DMG_CNT2_BORDER_COLOR;
  // }

  // /// <summary>
  // /// 全件表示処理イベント
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // public void FilterConditionAllShowEvent(object sender, RoutedEventArgs e)
  // {
  //     if (nowPattern != -1)
  //     {
  //         // 絞り込み条件削除
  //         List<FilterManager.FilterCondition> fcList = patternFilterCondDic[nowPattern];
  //         fcList.Clear();
  //         // ソート条件削除
  //         ClearSortGrid();
  //     }

  //     ListRedraw(nowPattern);
  // }

  // /// <summary>
  // /// 初期ソートタイプを返す
  // /// </summary>
  // /// <param name="pattern">パターン</param>
  // /// <param name="sortItem">ソート項目</param>
  // /// <returns>昇順かどうか</returns>
  // private bool GetInitialSortType(int pattern, int sortItem)
  // {
  //     bool isUpper = false;
  //     if (USE_SHUTOFF_LBLOCK_LIST_PATTERN.Contains(pattern))
  //     {
  //         // 遠隔遮断実施画面(Lブロック)
  //         if (sortItem == (int)ShutoffLblockTag.AreaName ||       // エリア
  //             sortItem == (int)ShutoffLblockTag.BlockName ||      // ブロック名称
  //             sortItem == (int)ShutoffLblockTag.KBlockName ||     // Kブロック名称
  //             sortItem == (int)ShutoffLblockTag.LpMinConnected || // 最低LP(単独除く)
  //             sortItem == (int)ShutoffLblockTag.LpMin ||          // 最低LP(単独含む)
  //             sortItem == (int)ShutoffLblockTag.LpAveConnected || // 平均LP(単独除く)
  //             sortItem == (int)ShutoffLblockTag.LpAve ||          // 平均LP(単独含む)
  //             sortItem == (int)ShutoffLblockTag.MpaMin ||         // 最低MPA
  //             sortItem == (int)ShutoffLblockTag.MpbMin ||         // 最低MPB
  //             sortItem == (int)ShutoffLblockTag.PlAve)            // 平均PL
  //             isUpper = true;
  //     }
  //     else if (pattern == (int)ShutoffBlockPattern.ShutoffReqSt)
  //     {
  //         // 遠隔遮断依頼状況確認画面
  //         if (sortItem == (int)ShutoffReqStatusTag.AreaName ||    // エリア
  //             sortItem == (int)ShutoffReqStatusTag.BlockName)     // ブロック名称
  //             isUpper = true;
  //     }
  //     else if (pattern == (int)ShutoffBlockPattern.FeelEqShutoffSt)
  //     {
  //         // 感震遮断Sブロック状況確認画面
  //         if (sortItem == (int)FeelEqShutoffStatusTag.AreaName || // エリア
  //             sortItem == (int)FeelEqShutoffStatusTag.SBlockName) // Sブロック名称
  //             isUpper = true;
  //     }

  //     return isUpper;
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック)用のフィルタ種別を返す
  // /// </summary>
  // /// <param name="tag">タグ</param>
  // /// <returns>フィルタ種別</returns>
  // private FilterConst.FilterType? ShutoffLblock_GetFilterType(int tag)
  // {
  //     FilterConst.FilterType? filterType = null;

  //     switch (tag)
  //     {
  //         case (int)ShutoffLblockTag.ShutoffCheked:
  //             filterType = FilterConst.FilterType.Check;
  //             break;
  //         case (int)ShutoffLblockTag.BlockName:
  //             filterType = FilterConst.FilterType.KBlockNo;
  //             break;
  //         case (int)ShutoffLblockTag.RequestStatus:
  //         case (int)ShutoffLblockTag.JudgeResult:
  //         case (int)ShutoffLblockTag.RestorationWorkStatus:
  //         case (int)ShutoffLblockTag.AreaName:
  //         case (int)ShutoffLblockTag.KBlockName:
  //         case (int)ShutoffLblockTag.BlockCategory:
  //         case (int)ShutoffLblockTag.ShutoffSi:
  //             filterType = FilterConst.FilterType.StringList;
  //             break;
  //         case (int)ShutoffLblockTag.RemoteOpenSBlock:
  //             filterType = FilterConst.FilterType.BoolList;
  //             break;
  //         case (int)ShutoffLblockTag.ShutoffBorderSi:
  //         case (int)ShutoffLblockTag.PlAve:
  //         case (int)ShutoffLblockTag.RepresentMaxSi:
  //         case (int)ShutoffLblockTag.MaxSi:
  //         case (int)ShutoffLblockTag.AveSi:
  //         case (int)ShutoffLblockTag.Over30KineRate:
  //         case (int)ShutoffLblockTag.Over60KineRate:
  //         case (int)ShutoffLblockTag.Over70KineRate:
  //         case (int)ShutoffLblockTag.Over80KineRate:
  //         case (int)ShutoffLblockTag.Over90KineRate:
  //         case (int)ShutoffLblockTag.MaxComAbleOver30KineRate:
  //         case (int)ShutoffLblockTag.MaxComAbleOver60KineRate:
  //         case (int)ShutoffLblockTag.MaxComAbleOver70KineRate:
  //         case (int)ShutoffLblockTag.MaxComAbleOver80KineRate:
  //         case (int)ShutoffLblockTag.MaxComAbleOver90KineRate:
  //         case (int)ShutoffLblockTag.CustomerCnt:
  //         case (int)ShutoffLblockTag.ContinueCustomerCnt:
  //         case (int)ShutoffLblockTag.GovernorStopRate:
  //         case (int)ShutoffLblockTag.LpMinConnected:
  //         case (int)ShutoffLblockTag.LpMin:
  //         case (int)ShutoffLblockTag.PowerFailureRate:
  //         case (int)ShutoffLblockTag.MpaMin:
  //         case (int)ShutoffLblockTag.MpbMin:
  //         case (int)ShutoffLblockTag.LeakEncounterRate:
  //         case (int)ShutoffLblockTag.LpSupplyDmgCntEmergency:
  //         case (int)ShutoffLblockTag.LpSupplyDmgCnt:
  //         case (int)ShutoffLblockTag.LpAveConnected:
  //         case (int)ShutoffLblockTag.LpAve:
  //         case (int)ShutoffLblockTag.LqAlarmRate:
  //         case (int)ShutoffLblockTag.ComppartDstrRate:
  //         case (int)ShutoffLblockTag.FireCnt:
  //         case (int)ShutoffLblockTag.LeakCnt:
  //             filterType = FilterConst.FilterType.Numeric;
  //             break;
  //     }

  //     return filterType;
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面用のフィルタ種別を返す
  // /// </summary>
  // /// <param name="tag">タグ</param>
  // /// <returns>フィルタ種別</returns>
  // private FilterConst.FilterType? ShutoffReqStatus_GetFilterType(int tag)
  // {
  //     FilterConst.FilterType? filterType = null;

  //     switch (tag)
  //     {
  //         case (int)ShutoffReqStatusTag.AreaName:
  //         case (int)ShutoffReqStatusTag.ShutoffStatus:
  //         case (int)ShutoffReqStatusTag.BlockCategory:
  //             filterType = FilterConst.FilterType.StringList;
  //             break;
  //         case (int)ShutoffReqStatusTag.BlockName:
  //             filterType = FilterConst.FilterType.KBlockNo;
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffBorderSi:
  //         case (int)ShutoffReqStatusTag.MaxSi:
  //         case (int)ShutoffReqStatusTag.CustomerCnt:
  //         case (int)ShutoffReqStatusTag.ContinueCustomerCnt:
  //         case (int)ShutoffReqStatusTag.GovernorStopRate:
  //         case (int)ShutoffReqStatusTag.GovCnt:
  //         case (int)ShutoffReqStatusTag.StopCnt:
  //         case (int)ShutoffReqStatusTag.ContinuanceCnt:
  //         case (int)ShutoffReqStatusTag.UnconfirmedCnt:
  //         case (int)ShutoffReqStatusTag.ShutoffTargetCnt:
  //         case (int)ShutoffReqStatusTag.ShutoffSuccessCnt:
  //         case (int)ShutoffReqStatusTag.ShutoffFailedCnt:
  //         case (int)ShutoffReqStatusTag.ShutoffUnableCnt:
  //         case (int)ShutoffReqStatusTag.ShutoffDoneCnt:
  //             filterType = FilterConst.FilterType.Numeric;
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffRequestedAt:
  //         case (int)ShutoffReqStatusTag.ShutoffEndedAt:
  //             filterType = FilterConst.FilterType.DateTime_yyyyMMddHHmm;
  //             break;
  //     }

  //     return filterType;
  // }

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面用のフィルタ種別を返す
  // /// </summary>
  // /// <param name="tag">タグ</param>
  // /// <returns>フィルタ種別</returns>
  // private FilterConst.FilterType? FeelEqShutoffStatus_GetFilterType(int tag)
  // {
  //     FilterConst.FilterType? filterType = null;

  //     switch (tag)
  //     {
  //         case (int)FeelEqShutoffStatusTag.AreaName:
  //         case (int)FeelEqShutoffStatusTag.ShutoffSi:
  //             filterType = FilterConst.FilterType.StringList;
  //             break;
  //         case (int)FeelEqShutoffStatusTag.SBlockName:
  //             filterType = FilterConst.FilterType.KBlockNo;
  //             break;
  //         case (int)FeelEqShutoffStatusTag.ShutoffBorderSi:
  //         case (int)FeelEqShutoffStatusTag.MaxSi:
  //         case (int)FeelEqShutoffStatusTag.CustomerCnt:
  //         case (int)FeelEqShutoffStatusTag.ContinueCustomerCnt:
  //         case (int)FeelEqShutoffStatusTag.GovernorStopRate:
  //         case (int)FeelEqShutoffStatusTag.GovCnt:
  //         case (int)FeelEqShutoffStatusTag.StopCnt:
  //         case (int)FeelEqShutoffStatusTag.ContinuanceCnt:
  //         case (int)FeelEqShutoffStatusTag.UnconfirmedCnt:
  //             filterType = FilterConst.FilterType.Numeric;
  //             break;
  //     }

  //     return filterType;
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) ヘッダ部作成
  // /// </summary>
  // private void InitShutoffLblockList()
  // {
  //     if (nowViewPattern != -1 && preViewPattern == nowViewPattern) return;
  //     preViewPattern = (nowViewPattern == -1) ? (int)ShutoffBlockListConst.ShutoffBlockListPattern.ShutoffBlockSimpleList : nowViewPattern;
  //     ShutoffLblockGrid.Children.Clear();
  //     if (nowViewPattern != -1) shutoffLblockListCanvas.Resources.Clear();

  //     string[] viewHeaderProperty;
  //     // 簡易画面の列幅定義：非表示列も列幅ゼロで定義
  //     int[] simpleViewColumnWidth = new int[] {
  //         37, 40, 70, 110, 50, 73, 73, 0, 86, 59, 0, 88, 115, 0, 0, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 114, 0, 0, 0, 0, 39, 39, 0, 65, 44, 60, 60, 0
  //     };
  //     // 詳細画面の列幅定義
  //     int[] detailViewColumnWidth = new int[] {
  //         37, 40, 70, 110, 50, 73, 73, 110, 86, 59, 120, 88, 115, 115, 65, 45, 45, 73, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 45, 114, 112, 101, 57, 54, 39, 39, 77, 65, 44, 60, 60, 57
  //     };

  //     // 簡易画面
  //     if (nowViewPattern == -1 || nowViewPattern == (int)ShutoffBlockListConst.ShutoffBlockListPattern.ShutoffBlockSimpleList)
  //     {
  //         viewHeaderProperty = new string[] {
  //             string.Format("21,{0},noHeader#S表示#0#10#{1}", simpleViewColumnWidth[0], (int)ShutoffLblockTag.LayerMark),
  //             string.Format("21,{0},sortText#遮断#7#3#{1}#26#24,checkBox##10#22", simpleViewColumnWidth[1],(int)ShutoffLblockTag.ShutoffCheked),
  //             string.Format("21,{0},sortText#ブロック#16#3#{1}#46#24,sortText#番号#20#21#{1}", simpleViewColumnWidth[2], (int)ShutoffLblockTag.BlockName),
  //             string.Format("21,{0},sortText#停止判断#33#10#{1}#83#12", simpleViewColumnWidth[3],(int)ShutoffLblockTag.JudgeResult),
  //             string.Format("21,{0},sortText#依頼#12#3#{1}#36#24,sortText#状況#12#21#{1}", simpleViewColumnWidth[4], (int)ShutoffLblockTag.RequestStatus),
  //             string.Format("21,{0},sortText#総需要家#14#3#{1}#51#24,sortText#件数#26#21#{1}", simpleViewColumnWidth[5],(int)ShutoffLblockTag.CustomerCnt),
  //             string.Format("21,{0},sortText#供給継続#11#3#{1}#60#5,sortText#需要家件数#5#21#{1}", simpleViewColumnWidth[6], (int)ShutoffLblockTag.ContinueCustomerCnt),
  //             string.Format("21,{0},sortText#エリア#38#10#{1}#95#24", simpleViewColumnWidth[7], (int)ShutoffLblockTag.AreaName),          // 簡易画面では非表示
  //             string.Format("21,{0},sortText#ブロック区分#10#10#{1}#71#12", simpleViewColumnWidth[8], (int)ShutoffLblockTag.BlockCategory),
  //             string.Format("21,{0},sortText#遮断#16#3#{1}#45#24,sortText#設定#16#21#{1}", simpleViewColumnWidth[9], (int)ShutoffLblockTag.ShutoffBorderSi),
  //             string.Format("21,{0},sortText#Kブロック番号#23#10#{1}#95#24", simpleViewColumnWidth[10], (int)ShutoffLblockTag.KBlockName), // 簡易画面では非表示
  //             string.Format("21,{0},sortTextRedBorder#需要家#22#3#{1}#73#24,sortTextRedBorder#漏えい遭遇率#8#21#{1}", simpleViewColumnWidth[11], (int)ShutoffLblockTag.LeakEncounterRate),
  //             string.Format("42,{0}#headerCommentStraightTextMargin_21,sortText#緊急#45#0#{1}#75#3", simpleViewColumnWidth[12], (int)ShutoffLblockTag.LpSupplyDmgCntEmergency),
  //             string.Format("42,{0}#headerCommentText,sortText#総数(緊急+一般)#11#0#{1}#102#3", simpleViewColumnWidth[13], (int)ShutoffLblockTag.LpSupplyDmgCnt), // 簡易画面では非表示
  //             string.Format("21,{0},sortText#代表局#14#3#{1}#51#24,sortText#最大SI#14#21#{1}", simpleViewColumnWidth[14], (int)ShutoffLblockTag.RepresentMaxSi),  // 簡易画面では非表示
  //             string.Format("21,{0},sortText#最大SI#2#10#{1}#31#27", simpleViewColumnWidth[15], (int)ShutoffLblockTag.MaxSi),
  //             string.Format("21,{0},sortText#平均SI#2#10#{1}#31#27", simpleViewColumnWidth[16], (int)ShutoffLblockTag.AveSi),  // 簡易画面では非表示
  //             string.Format("21,{0},sortText#感震遮断#14#3#{1}#51#24,sortText#設定#26#21#{1}", simpleViewColumnWidth[17], (int)ShutoffLblockTag.ShutoffSi),            // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentStraightText,sortText#全母数#22#0#{1}#62#3", simpleViewColumnWidth[18], (int)ShutoffLblockTag.Over30KineRate),        // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentText,sortText#通信不能除く#1#0#{1}#68#3", simpleViewColumnWidth[19], (int)ShutoffLblockTag.MaxComAbleOver30KineRate), // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentStraightText,sortText#全母数#22#0#{1}#62#3", simpleViewColumnWidth[20], (int)ShutoffLblockTag.Over60KineRate),        // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentText,sortText#通信不能除く#1#0#{1}#68#3", simpleViewColumnWidth[21], (int)ShutoffLblockTag.MaxComAbleOver60KineRate), // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentStraightText,sortText#全母数#22#0#{1}#62#3", simpleViewColumnWidth[22], (int)ShutoffLblockTag.Over70KineRate),        // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentText,sortText#通信不能除く#1#0#{1}#68#3", simpleViewColumnWidth[23], (int)ShutoffLblockTag.MaxComAbleOver70KineRate), // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentStraightText,sortText#全母数#22#0#{1}#62#3", simpleViewColumnWidth[24], (int)ShutoffLblockTag.Over80KineRate),        // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentText,sortText#通信不能除く#1#0#{1}#68#3", simpleViewColumnWidth[25], (int)ShutoffLblockTag.MaxComAbleOver80KineRate), // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentStraightText,sortText#全母数#22#0#{1}#62#3", simpleViewColumnWidth[26], (int)ShutoffLblockTag.Over90KineRate),        // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentText,sortText#通信不能除く#1#0#{1}#68#3", simpleViewColumnWidth[27], (int)ShutoffLblockTag.MaxComAbleOver90KineRate), // 簡易画面では非表示
  //             string.Format("21,{0},sortText#ガバナ#4#3#{1}#32#5,sortText#停止率#4#21#{1}", simpleViewColumnWidth[28], (int)ShutoffLblockTag.GovernorStopRate),
  //             string.Format("21,{0},text#最低LP#35#3,sortText#単独除く#6#21#{1}#52#24,sortText#(含む)#66#21#{2}#100#24", simpleViewColumnWidth[29], (int)ShutoffLblockTag.LpMinConnected, (int)ShutoffLblockTag.LpMin),
  //             string.Format("21,{0},text#平均LP#35#3,sortText#単独除く#6#21#{1}#52#24,sortText#(含む)#65#21#{2}#99#24", simpleViewColumnWidth[30], (int)ShutoffLblockTag.LpAveConnected, (int)ShutoffLblockTag.LpAve), // 簡易画面では非表示
  //             string.Format("21,{0},text#最低MP#28#3,sortText#MPA#9#21#{1}#34#24,text#/#47#21,sortText#MPB#62#21#{2}#87#24", simpleViewColumnWidth[31], (int)ShutoffLblockTag.MpaMin, (int)ShutoffLblockTag.MpbMin),   // 簡易画面では非表示
  //             string.Format("21,{0},sortText#液状化#8#3#{1}#43#24,sortText#警報率#8#21#{1}", simpleViewColumnWidth[32], (int)ShutoffLblockTag.LqAlarmRate),            // 簡易画面では非表示
  //             string.Format("21,{0},sortText#平均PL#7#10#{1}#31#27", simpleViewColumnWidth[33], (int)ShutoffLblockTag.PlAve),                                          // 簡易画面では非表示
  //             string.Format("21,{0},asSortText#グラフ#4#3#{1},asSortText#表示#7#21#{1}", simpleViewColumnWidth[34], (int)ShutoffLblockTag.GraphShow),
  //             string.Format("21,{0},asSortText#ガバナ#4#3#{1},asSortText#一覧#7#21#{1}", simpleViewColumnWidth[35], (int)ShutoffLblockTag.GovernorListShow),
  //             string.Format("21,{0},sortText#復旧状況#13#10#{1}#63#12", simpleViewColumnWidth[36], (int)ShutoffLblockTag.RestorationWorkStatus),                       // 簡易画面では非表示
  //             string.Format("21,{0},sortText#D復旧済#5#3#{1}#46#24,sortText#Sブロック#5#21#{0}", simpleViewColumnWidth[37], (int)ShutoffLblockTag.RemoteOpenSBlock),
  //             string.Format("21,{0},sortText#停電率#4#10#{1}#30#27", simpleViewColumnWidth[38], (int)ShutoffLblockTag.PowerFailureRate),
  //             string.Format("21,{0},sortText#火災#17#3#{1}#46#24,sortText#件数#17#21#{1}", simpleViewColumnWidth[39], (int)ShutoffLblockTag.FireCnt),
  //             string.Format("21,{0}#rightThickness,sortText#漏えい#12#3#{1}#46#24,sortText#受付#17#21#{1}", simpleViewColumnWidth[40], (int)ShutoffLblockTag.LeakCnt), // 簡易画面では漏えい受付が最終列となるので#rightThicknessで右側罫線を引く
  //             string.Format("21,{0},sortText#建物#15#3#{1}#43#5,sortText#全半壊率#2#21#{1}", simpleViewColumnWidth[41], (int)ShutoffLblockTag.ComppartDstrRate)        // 簡易画面では非表示
  //         };
  //     }
  //     // 詳細画面
  //     else
  //     {
  //         viewHeaderProperty = new string[] {
  //             string.Format("21,{0},noHeader#S表示#0#10#{1}", detailViewColumnWidth[0], (int)ShutoffLblockTag.LayerMark),
  //             string.Format("21,{0},sortText#遮断#7#3#{1}#26#24,checkBox##10#22", detailViewColumnWidth[1],(int)ShutoffLblockTag.ShutoffCheked),
  //             string.Format("21,{0},sortText#ブロック#16#3#{1}#46#24,sortText#番号#20#21#{1}", detailViewColumnWidth[2], (int)ShutoffLblockTag.BlockName),
  //             string.Format("21,{0},sortText#停止判断#33#10#{1}#83#12", detailViewColumnWidth[3],(int)ShutoffLblockTag.JudgeResult),
  //             string.Format("21,{0},sortText#依頼#12#3#{1}#36#24,sortText#状況#12#21#{1}", detailViewColumnWidth[4], (int)ShutoffLblockTag.RequestStatus),
  //             string.Format("21,{0},sortText#総需要家#14#3#{1}#51#24,sortText#件数#26#21#{1}", detailViewColumnWidth[5],(int)ShutoffLblockTag.CustomerCnt),
  //             string.Format("21,{0},sortText#供給継続#11#3#{1}#60#5,sortText#需要家件数#5#21#{1}", detailViewColumnWidth[6], (int)ShutoffLblockTag.ContinueCustomerCnt),
  //             string.Format("21,{0},sortText#エリア#38#10#{1}#95#24", detailViewColumnWidth[7], (int)ShutoffLblockTag.AreaName),          // 簡易画面では非表示
  //             string.Format("21,{0},sortText#ブロック区分#10#10#{1}#71#12", detailViewColumnWidth[8], (int)ShutoffLblockTag.BlockCategory),
  //             string.Format("21,{0},sortText#遮断#16#3#{1}#45#24,sortText#設定#16#21#{1}", detailViewColumnWidth[9], (int)ShutoffLblockTag.ShutoffBorderSi),
  //             string.Format("21,{0},sortText#Kブロック番号#23#10#{1}#95#24", detailViewColumnWidth[10], (int)ShutoffLblockTag.KBlockName), // 簡易画面では非表示
  //             string.Format("21,{0},sortTextRedBorder#需要家#22#3#{1}#73#24,sortTextRedBorder#漏えい遭遇率#8#21#{1}", detailViewColumnWidth[11], (int)ShutoffLblockTag.LeakEncounterRate),
  //             string.Format("42,{0}#headerCommentStraightTextMargin_21,sortText#緊急#45#0#{1}#75#3", detailViewColumnWidth[12], (int)ShutoffLblockTag.LpSupplyDmgCntEmergency),
  //             string.Format("42,{0}#headerCommentText,sortText#総数(緊急+一般)#11#0#{1}#102#3", detailViewColumnWidth[13], (int)ShutoffLblockTag.LpSupplyDmgCnt), // 簡易画面では非表示
  //             string.Format("21,{0},sortText#代表局#14#3#{1}#51#24,sortText#最大SI#14#21#{1}", detailViewColumnWidth[14], (int)ShutoffLblockTag.RepresentMaxSi),  // 簡易画面では非表示
  //             string.Format("21,{0},sortText#最大SI#2#10#{1}#31#27", detailViewColumnWidth[15], (int)ShutoffLblockTag.MaxSi),
  //             string.Format("21,{0},sortText#平均SI#2#10#{1}#31#27", detailViewColumnWidth[16], (int)ShutoffLblockTag.AveSi),  // 簡易画面では非表示
  //             string.Format("21,{0},sortText#感震遮断#14#3#{1}#51#24,sortText#設定#26#21#{1}", detailViewColumnWidth[17], (int)ShutoffLblockTag.ShutoffSi),            // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentStraightText,sortText#全母数#22#0#{1}#62#3", detailViewColumnWidth[18], (int)ShutoffLblockTag.Over30KineRate),        // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentText,sortText#通信不能除く#1#0#{1}#68#3", detailViewColumnWidth[19], (int)ShutoffLblockTag.MaxComAbleOver30KineRate), // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentStraightText,sortText#全母数#22#0#{1}#62#3", detailViewColumnWidth[20], (int)ShutoffLblockTag.Over60KineRate),        // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentText,sortText#通信不能除く#1#0#{1}#68#3", detailViewColumnWidth[21], (int)ShutoffLblockTag.MaxComAbleOver60KineRate), // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentStraightText,sortText#全母数#22#0#{1}#62#3", detailViewColumnWidth[22], (int)ShutoffLblockTag.Over70KineRate),        // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentText,sortText#通信不能除く#1#0#{1}#68#3", detailViewColumnWidth[23], (int)ShutoffLblockTag.MaxComAbleOver70KineRate), // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentStraightText,sortText#全母数#22#0#{1}#62#3", detailViewColumnWidth[24], (int)ShutoffLblockTag.Over80KineRate),        // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentText,sortText#通信不能除く#1#0#{1}#68#3", detailViewColumnWidth[25], (int)ShutoffLblockTag.MaxComAbleOver80KineRate), // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentStraightText,sortText#全母数#22#0#{1}#62#3", detailViewColumnWidth[26], (int)ShutoffLblockTag.Over90KineRate),        // 簡易画面では非表示
  //             string.Format("42,{0}#headerCommentText,sortText#通信不能除く#1#0#{1}#68#3", detailViewColumnWidth[27], (int)ShutoffLblockTag.MaxComAbleOver90KineRate), // 簡易画面では非表示
  //             string.Format("21,{0},sortText#ガバナ#4#3#{1}#32#5,sortText#停止率#4#21#{1}", detailViewColumnWidth[28], (int)ShutoffLblockTag.GovernorStopRate),
  //             string.Format("21,{0},text#最低LP#35#3,sortText#単独除く#6#21#{1}#52#24,sortText#(含む)#66#21#{2}#100#24", detailViewColumnWidth[29], (int)ShutoffLblockTag.LpMinConnected, (int)ShutoffLblockTag.LpMin),
  //             string.Format("21,{0},text#平均LP#35#3,sortText#単独除く#6#21#{1}#52#24,sortText#(含む)#65#21#{2}#99#24", detailViewColumnWidth[30], (int)ShutoffLblockTag.LpAveConnected, (int)ShutoffLblockTag.LpAve), // 簡易画面では非表示
  //             string.Format("21,{0},text#最低MP#28#3,sortText#MPA#9#21#{1}#34#24,text#/#47#21,sortText#MPB#62#21#{2}#87#24", detailViewColumnWidth[31], (int)ShutoffLblockTag.MpaMin, (int)ShutoffLblockTag.MpbMin),   // 簡易画面では非表示
  //             string.Format("21,{0},sortText#液状化#8#3#{1}#43#24,sortText#警報率#8#21#{1}", detailViewColumnWidth[32], (int)ShutoffLblockTag.LqAlarmRate),            // 簡易画面では非表示
  //             string.Format("21,{0},sortText#平均PL#7#10#{1}#31#27", detailViewColumnWidth[33], (int)ShutoffLblockTag.PlAve),                                          // 簡易画面では非表示
  //             string.Format("21,{0},asSortText#グラフ#4#3#{1},asSortText#表示#7#21#{1}", detailViewColumnWidth[34], (int)ShutoffLblockTag.GraphShow),
  //             string.Format("21,{0},asSortText#ガバナ#4#3#{1},asSortText#一覧#7#21#{1}", detailViewColumnWidth[35], (int)ShutoffLblockTag.GovernorListShow),
  //             string.Format("21,{0},sortText#復旧状況#13#10#{1}#63#12", detailViewColumnWidth[36], (int)ShutoffLblockTag.RestorationWorkStatus),                       // 簡易画面では非表示
  //             string.Format("21,{0},sortText#D復旧済#5#3#{1}#46#24,sortText#Sブロック#5#21#{0}", detailViewColumnWidth[37], (int)ShutoffLblockTag.RemoteOpenSBlock),
  //             string.Format("21,{0},sortText#停電率#4#10#{1}#30#27", detailViewColumnWidth[38], (int)ShutoffLblockTag.PowerFailureRate),
  //             string.Format("21,{0},sortText#火災#17#3#{1}#46#24,sortText#件数#17#21#{1}", detailViewColumnWidth[39], (int)ShutoffLblockTag.FireCnt),
  //             string.Format("21,{0},sortText#漏えい#12#3#{1}#46#24,sortText#受付#17#21#{1}", detailViewColumnWidth[40], (int)ShutoffLblockTag.LeakCnt),
  //             string.Format("21,{0},sortText#建物#15#3#{1}#43#5,sortText#全半壊率#2#21#{1}", detailViewColumnWidth[41], (int)ShutoffLblockTag.ComppartDstrRate)        // 簡易画面では非表示
  //         };
  //     }

  //     List<FrameworkElement> ret = CommonUtil.GetGridHeader(viewHeaderProperty, 63, new MouseButtonEventHandler(ShutoffLblock_HeaderTitle_MouseLeftButtonDown));
  //     ShutoffLblockGrid.Children.Add(ret[0]);
  //     shutoffLblockListCanvas = ret[1] as Canvas;
  //     shutoffLblockListHeaderCanvas = ret[2] as Canvas;
  //     shutoffLblockListScroll = ret[3] as ScrollViewer;
  //     allShutoffLblockCheck = ret[4] as CheckBox;

  //     int[] viewColumnWidth1 = new int[4];
  //     int[] viewColumnWidth2 = new int[6];
  //     int[] viewColumnWidth3 = new int[3];
  //     int[] viewColumnWidth4 = new int[22];
  //     int[] viewColumnWidth5 = new int[2];
  //     int[] viewColumnWidth6 = new int[4];

  //     Border topBorder1;
  //     Border topBorder2;
  //     Border topBorder3;
  //     Border topBorder4;
  //     Border topBorder5;
  //     Border topBorder6;

  //     // ヘッダー列の罫線幅を計算して設定
  //     if (nowViewPattern == -1 || nowViewPattern == (int)ShutoffBlockListConst.ShutoffBlockListPattern.ShutoffBlockSimpleList)
  //     {
  //         viewColumnWidth1 = new int[4];
  //         Array.Copy(simpleViewColumnWidth, 1, viewColumnWidth1, 0, 4);
  //         Array.Copy(simpleViewColumnWidth, 5, viewColumnWidth2, 0, 6);
  //         Array.Copy(simpleViewColumnWidth, 11, viewColumnWidth3, 0, 3);
  //         Array.Copy(simpleViewColumnWidth, 14, viewColumnWidth4, 0, 22);
  //         Array.Copy(simpleViewColumnWidth, 36, viewColumnWidth5, 0, 2);
  //         Array.Copy(simpleViewColumnWidth, 38, viewColumnWidth6, 0, 4);
  //         topBorder1 = CommonUtil.GetBorderHeaderOnHeader(0.0, simpleViewColumnWidth[0], viewColumnWidth1.Sum(), 21.0, "操作状況", false);
  //         topBorder2 = CommonUtil.GetBorderHeaderOnHeader(0.0, simpleViewColumnWidth[0] + viewColumnWidth1.Sum(), viewColumnWidth2.Sum(), 21.0, "基本情報", false);
  //         topBorder3 = CommonUtil.GetBorderHeaderOnHeader(0.0, simpleViewColumnWidth[0] + viewColumnWidth1.Sum() + viewColumnWidth2.Sum(), viewColumnWidth3.Sum(), 21.0, "被害推定", false);
  //         topBorder4 = CommonUtil.GetBorderHeaderOnHeader(0.0, simpleViewColumnWidth[0] + viewColumnWidth1.Sum() + viewColumnWidth2.Sum() + viewColumnWidth3.Sum(), viewColumnWidth4.Sum(), 21.0, "ガバナ情報", false);
  //         topBorder5 = CommonUtil.GetBorderHeaderOnHeader(0.0, simpleViewColumnWidth[0] + viewColumnWidth1.Sum() + viewColumnWidth2.Sum() + viewColumnWidth3.Sum() + viewColumnWidth4.Sum(), viewColumnWidth5.Sum(), 21.0, "復旧情報", false);
  //         topBorder6 = CommonUtil.GetBorderHeaderOnHeader(0.0, simpleViewColumnWidth[0] + viewColumnWidth1.Sum() + viewColumnWidth2.Sum() + viewColumnWidth3.Sum() + viewColumnWidth4.Sum() + viewColumnWidth5.Sum(), viewColumnWidth6.Sum(), 21.0, "外部情報", true);
  //     }
  //     else
  //     {
  //         Array.Copy(detailViewColumnWidth, 1, viewColumnWidth1, 0, 4);
  //         Array.Copy(detailViewColumnWidth, 5, viewColumnWidth2, 0, 6);
  //         Array.Copy(detailViewColumnWidth, 11, viewColumnWidth3, 0, 3);
  //         Array.Copy(detailViewColumnWidth, 14, viewColumnWidth4, 0, 22);
  //         Array.Copy(detailViewColumnWidth, 36, viewColumnWidth5, 0, 2);
  //         Array.Copy(detailViewColumnWidth, 38, viewColumnWidth6, 0, 4);
  //         topBorder1 = CommonUtil.GetBorderHeaderOnHeader(0.0, detailViewColumnWidth[0], viewColumnWidth1.Sum(), 21.0, "操作状況", false);
  //         topBorder2 = CommonUtil.GetBorderHeaderOnHeader(0.0, detailViewColumnWidth[0] + viewColumnWidth1.Sum(), viewColumnWidth2.Sum(), 21.0, "基本情報", false);
  //         topBorder3 = CommonUtil.GetBorderHeaderOnHeader(0.0, detailViewColumnWidth[0] + viewColumnWidth1.Sum() + viewColumnWidth2.Sum(), viewColumnWidth3.Sum(), 21.0, "被害推定", false);
  //         topBorder4 = CommonUtil.GetBorderHeaderOnHeader(0.0, detailViewColumnWidth[0] + viewColumnWidth1.Sum() + viewColumnWidth2.Sum() + viewColumnWidth3.Sum(), viewColumnWidth4.Sum(), 21.0, "ガバナ情報", false);
  //         topBorder5 = CommonUtil.GetBorderHeaderOnHeader(0.0, detailViewColumnWidth[0] + viewColumnWidth1.Sum() + viewColumnWidth2.Sum() + viewColumnWidth3.Sum() + viewColumnWidth4.Sum(), viewColumnWidth5.Sum(), 21.0, "復旧情報", false);
  //         topBorder6 = CommonUtil.GetBorderHeaderOnHeader(0.0, detailViewColumnWidth[0] + viewColumnWidth1.Sum() + viewColumnWidth2.Sum() + viewColumnWidth3.Sum() + viewColumnWidth4.Sum() + viewColumnWidth5.Sum(), viewColumnWidth6.Sum(), 21.0, "外部情報", true);
  //     }

  //     (ret[2] as Canvas).Children.Add(topBorder1);
  //     (ret[2] as Canvas).Children.Add(topBorder2);
  //     (ret[2] as Canvas).Children.Add(topBorder3);
  //     (ret[2] as Canvas).Children.Add(topBorder4);
  //     (ret[2] as Canvas).Children.Add(topBorder5);
  //     (ret[2] as Canvas).Children.Add(topBorder6);

  //     TextBlock Over30KineRateHeaderTextBlock = shutoffLblockListCanvas.FindName(string.Format(GlobalConst.HEADER_COMMENT_KEY_STRING, (int)ShutoffLblockTag.Over30KineRate)) as TextBlock;
  //     Over30KineRateHeaderTextBlock.Text = "30Kine超過率";
  //     TextBlock Over60KineRateHeaderTextBlock = shutoffLblockListCanvas.FindName(string.Format(GlobalConst.HEADER_COMMENT_KEY_STRING, (int)ShutoffLblockTag.Over60KineRate)) as TextBlock;
  //     Over60KineRateHeaderTextBlock.Text = "60Kine超過率";
  //     TextBlock Over70KineRateHeaderTextBlock = shutoffLblockListCanvas.FindName(string.Format(GlobalConst.HEADER_COMMENT_KEY_STRING, (int)ShutoffLblockTag.Over70KineRate)) as TextBlock;
  //     Over70KineRateHeaderTextBlock.Text = "70Kine超過率";
  //     TextBlock Over80KineRateHeaderTextBlock = shutoffLblockListCanvas.FindName(string.Format(GlobalConst.HEADER_COMMENT_KEY_STRING, (int)ShutoffLblockTag.Over80KineRate)) as TextBlock;
  //     Over80KineRateHeaderTextBlock.Text = "80Kine超過率";
  //     TextBlock Over90KineRateHeaderTextBlock = shutoffLblockListCanvas.FindName(string.Format(GlobalConst.HEADER_COMMENT_KEY_STRING, (int)ShutoffLblockTag.Over90KineRate)) as TextBlock;
  //     Over90KineRateHeaderTextBlock.Text = "90Kine超過率";
  //     TextBlock LpSupplyDmgCntHeaderTextBlock = shutoffLblockListCanvas.FindName(string.Format(GlobalConst.HEADER_COMMENT_KEY_STRING, (int)ShutoffLblockTag.LpSupplyDmgCntEmergency)) as TextBlock;
  //     LpSupplyDmgCntHeaderTextBlock.Text = "本支管被害数(累計)";

  //     allShutoffLblockCheck.Checked += new RoutedEventHandler(AllShutoffLblockCheck_CheckUnchecked);
  //     allShutoffLblockCheck.Unchecked += new RoutedEventHandler(AllShutoffLblockCheck_CheckUnchecked);

  //     string[] viewProperty = new string[] {
  //         ",-1,,noBorder",         // S表示
  //         "check,0",               // 遮断
  //         "linkText,1",            // ブロック番号
  //         ",2",                    // 停止判断
  //         ",3",                    // 依頼状況
  //         ",4",                    // 総需要家件数
  //         ",5",                    // 供給継続需要家件数
  //         ",6",                    // エリア
  //         ",7",                    // ブロック区分
  //         ",8",                    // 遮断設定
  //         ",9",                    // Kブロック番号
  //         "rightText,-1",          // 漏えい遭遇率
  //         "rightText,-1",          // 本支管被害数(累計)(緊急)
  //         "rightText,-1",          // 本支管被害数(累計)(総数)
  //         ",10",                   // 代表局最大SI
  //         ",11",                   // 最大SI
  //         ",12",                   // 平均SI
  //         "centerText,13",         // 感震遮断設定
  //         ",14",                   // 30Kine超過率
  //         ",15",                   // 最大30Kine超過率
  //         ",16",                   // 60Kine超過率
  //         ",17",                   // 最大60Kine超過率
  //         ",18",                   // 70Kine超過率
  //         ",19",                   // 最大70Kine超過率
  //         ",20",                   // 80Kine超過率
  //         ",21",                   // 最大80Kine超過率
  //         ",22",                   // 90Kine超過率
  //         ",23",                   // 最大90Kine超過率
  //         "colorText,24",          // ガバナ停止率
  //         "stackText,25",          // 最低LP
  //         "stackText,26",          // 平均LP
  //         "centerText,27",         // 最低MP
  //         ",28",                   // 液状化警報率
  //         ",29",                   // 平均PL
  //         "linkText,30,centerText", // グラフ表示
  //         "linkText,31",           // ガバナ一覧
  //         ",32",                   // 復旧状況
  //         "centerText,33",         // 遠隔D復旧Sブロック
  //         "colorText,34",          // 停電率
  //         ",35",                   // 火災件数
  //         ",36",                   // 漏えい受付
  //         ",37"                    // 建物全半壊率
  //     };
  //     string[] sblockViewProperty = new string[] {
  //         ",-1,,noBorder",         // S表示
  //         ",0",                    // 遮断
  //         "linkText,1",            // ブロック番号
  //         ",2",                    // 停止判断
  //         ",3",                    // 依頼状況
  //         ",4",                    // 供給継続需要家件数
  //         ",5",                    // 総需要家件数
  //         ",6",                    // エリア
  //         ",7",                    // ブロック区分
  //         ",8",                    // 遮断設定
  //         ",9",                    // Kブロック番号
  //         "rightText,10",          // 漏えい遭遇率
  //         "rightText,11",          // 本支管被害数(累計)(緊急)
  //         "rightText,12",          // 本支管被害数(累計)(総数)
  //         ",13",                   // 代表局最大SI
  //         ",14",                   // 最大SI
  //         ",15",                   // 平均SI
  //         "centerText,16",         // 感震遮断設定
  //         ",17",                   // 30Kine超過率
  //         ",18",                   // 最大30Kine超過率
  //         ",19",                   // 60Kine超過率
  //         ",20",                   // 最大60Kine超過率
  //         ",21",                   // 70Kine超過率
  //         ",22",                   // 最大70Kine超過率
  //         ",23",                   // 80Kine超過率
  //         ",24",                   // 最大80Kine超過率
  //         ",25",                   // 90Kine超過率
  //         ",26",                   // 最大90Kine超過率
  //         "colorText,27",          // ガバナ停止率
  //         "stackText,28",          // 最低LP
  //         "stackText,29",          // 平均LP
  //         "centerText,30",         // 最低MP
  //         ",31",                   // 液状化警報率
  //         ",32",                   // 平均PL
  //         "linkText,33,centerText",// グラフ表示
  //         "linkText,34",           // ガバナ一覧
  //         "linkText,35",           // 復旧状況
  //         "centerText,36",         // 遠隔D復旧Sブロック
  //         "colorText,37",          // 停電率
  //         ",38",                   // 火災件数
  //         ",39",                   // 漏えい受付
  //         ",40"                    // 建物全半壊率
  //     };

  //     shutoffLblockPropertyList.Clear();
  //     shutoffLblockPropertyListNoCheck.Clear();
  //     shutoffLblockLayerSblockPropertyList.Clear();

  //     for (int i = 0; i < viewProperty.Count(); i++)
  //     {
  //         shutoffLblockPropertyList.Add(viewHeaderProperty[i].Split(',')[GlobalConst.HEADER_PROPERTYLIST_WIDTH] + "," + viewProperty[i]);
  //         shutoffLblockPropertyListNoCheck.Add(viewHeaderProperty[i].Split(',')[GlobalConst.HEADER_PROPERTYLIST_WIDTH] + "," + viewProperty[i].Replace("check,0", ",-1"));
  //     }
  //     for (int i = 0; i < sblockViewProperty.Count(); i++)
  //     {
  //         shutoffLblockLayerSblockPropertyList.Add(viewHeaderProperty[i].Split(',')[GlobalConst.HEADER_PROPERTYLIST_WIDTH] + "," + sblockViewProperty[i]);
  //     }

  //     // 階層Sブロック用のプロパティ作成
  //     // インデントを下げる
  //     int indentWidth = INDENT_WIDTH;
  //     shutoffLblockLayerSblockPropertyList.Insert((int)ShutoffLblockLayerSblockCanvasItem.Indent, indentWidth.ToString() + "," + ",-1,,noBorder");
  //     string[] nextIndentProperties = shutoffLblockLayerSblockPropertyList[(int)ShutoffLblockLayerSblockCanvasItem.Indent + 1].Split(',');
  //     int nextIndentColWidth = int.Parse(nextIndentProperties[0]) - indentWidth;
  //     nextIndentProperties[0] = nextIndentColWidth.ToString();
  //     shutoffLblockLayerSblockPropertyList[(int)ShutoffLblockLayerSblockCanvasItem.Indent + 1] = String.Join(",", nextIndentProperties);

  //     // 初回だけの設定
  //     if (nowViewPattern == -1)
  //     {
  //         // デフォルトのソート順の設定
  //         foreach (int pattern in USE_SHUTOFF_LBLOCK_LIST_PATTERN)
  //         {
  //             List<FilterManager.SortCondition> sc = GetSortCondition(pattern);
  //             sc.Clear();
  //             FilterManager.SortCondition s = new FilterManager.SortCondition();
  //             s.SortTag = (int)ShutoffLblockTag.BlockName;
  //             s.IsUp = GetInitialSortType(pattern, s.SortTag);
  //             sc.Add(s);
  //         }
  //     }
  //     else
  //     {
  //         // 簡易⇔詳細操作でヘッダー再作成時は、ソート項目の強調表示が外れてしまうので、ソート再実行で強調表示を復活させる
  //         List<FilterManager.SortCondition> nowSc = GetSortCondition(nowPattern);
  //         ShutoffLblock_GridSort(nowSc, nowPattern);
  //     }

  //     // ストーリーボードの設定
  //     shutoffLblockListCanvas.Resources.Add("shutoffLblockStoryboard", shutoffLblockStoryboard);
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 ヘッダ部作成
  // /// </summary>
  // private void InitShutoffReqStatusList()
  // {
  //     string[] viewHeaderProperty = new string[] {
  //         string.Format("0,37,noHeader#S表示#0#10#{0}", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.LayerMark)),
  //         string.Format("0,120,sortText#エリア#43#10#{0}#105#24", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.AreaName)),
  //         string.Format("0,70,sortText#ブロック#16#3#{0}#46#24,sortText#番号#20#21#{0}", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.BlockName)),
  //         string.Format("0,73,sortText#総需要家#14#3#{0}#51#24,sortText#件数#26#21#{0}", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.CustomerCnt)),
  //         string.Format("0,73,sortText#供給継続#11#3#{0}#60#5,sortText#需要家件数#5#21#{0}", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.ContinueCustomerCnt)),
  //         string.Format("0,86,sortText#ブロック区分#13#10#{0}#71#12", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.BlockCategory)),
  //         string.Format("0,59,sortText#遮断#16#3#{0}#45#24,sortText#設定#16#21#{0}", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.ShutoffBorderSi)),
  //         string.Format("0,45,sortText#最大SI#2#10#{0}#31#27", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.MaxSi)),
  //         string.Format("0,65#rightThickness,sortText#ガバナ#16#3#{0}#51#24,sortText#停止率#14#21#{0}", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.GovernorStopRate)),
  //         string.Format("0,61#244#rightMargin_5,sortText#ガバナ数#3#3#{0}#52#5", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.GovCnt)),
  //         string.Format("20,61,sortText#停止#19#3#{0}#47#6", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.StopCnt)),
  //         string.Format("20,61,sortText#継続#19#3#{0}#47#6", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.ContinuanceCnt)),
  //         string.Format("20,61,sortText#未確認#10#3#{0}#47#6", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.UnconfirmedCnt)),
  //         string.Format("0,48#578#rightThicknessOnryHeader,sortText#遠隔遮断状況#3#3#{0}#77#5", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.ShutoffStatus)),
  //         string.Format("20,52,sortText#対象#14#3#{0}#38#6", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.ShutoffTargetCnt)),
  //         string.Format("20,52,sortText#成功#14#3#{0}#38#6", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.ShutoffSuccessCnt)),
  //         string.Format("20,52,sortText#失敗#14#3#{0}#38#6", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.ShutoffFailedCnt)),
  //         string.Format("20,126,sortText#依頼時刻#43#3#{0}#112#6", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.ShutoffRequestedAt)),
  //         string.Format("20,126,sortText#終了時刻#43#3#{0}#112#6", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.ShutoffEndedAt)),
  //         string.Format("20,61,sortText#TC不可#10#3#{0}#47#6", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.ShutoffUnableCnt)),
  //         string.Format("20,61,sortText#遮断済#10#3#{0}#47#6", ConvertTagToKeyShutoffReqStatus((int)ShutoffReqStatusTag.ShutoffDoneCnt))
  //     };

  //     List<FrameworkElement> ret = CommonUtil.GetGridHeader(viewHeaderProperty, 42, new MouseButtonEventHandler(ShutoffReqStatus_HeaderTitle_MouseLeftButtonDown));
  //     ShutoffReqStatusGrid.Children.Add(ret[0]);
  //     shutoffReqStatusListCanvas = ret[1] as Canvas;
  //     shutoffReqStatusListHeaderCanvas = ret[2] as Canvas;
  //     shutoffReqStatusListScroll = ret[3] as ScrollViewer;

  //     // ブロックリスト属性を作成する
  //     string[] viewProperty = new string[] {
  //         ",-1,,noBorder", // S表示
  //         ",0",            // エリア
  //         "linkText,1",    // ブロック番号
  //         ",2",            // 総需要家件数
  //         ",3",            // 供給継続需要家件数
  //         ",4",            // ブロック区分
  //         ",5",            // 遮断設定
  //         ",6",            // 最大SI
  //         "colorText,7",   // ガバナ停止率
  //         ",8",            // ガバナ数
  //         ",9",            // 停止数
  //         ",10",           // 継続数
  //         ",11",           // 未確認数
  //         ",12",           // 遠隔遮断状況
  //         ",13",           // 対象数
  //         ",14",           // 成功数
  //         ",15",           // 失敗数
  //         ",16",           // 依頼時刻
  //         ",17",           // 終了時刻
  //         ",18",           // TC不可
  //         ",19"            // 遮断済数
  //     };
  //     for (int i = 0; i < viewProperty.Count(); i++)
  //         shutoffReqStatusPropertyList.Add(viewHeaderProperty[i].Split(',')[GlobalConst.HEADER_PROPERTYLIST_WIDTH] + "," + viewProperty[i]);

  //     // 階層Sブロック用のプロパティ作成
  //     // インデントを下げる
  //     int indentWidth = INDENT_WIDTH;

  //     // ブロックリスト属性を作成する(階層Sブロック用)
  //     string[] viewSblockProperty = new string[] {
  //         ",-1,,noBorder", // S表示
  //         ",0",            // エリア
  //         "linkText,1",    // ブロック番号
  //         ",2",            // 総需要家件数
  //         ",3",            // 供給継続需要家件数
  //         ",4",            // ブロック区分
  //         ",5",            // 遮断設定
  //         ",6",            // 最大SI
  //         "colorText,7",   // ガバナ停止率
  //         ",8",            // ガバナ数
  //         ",9",            // 停止数
  //         ",10",           // 継続数
  //         ",11",           // 未確認数
  //         ",12",           // 遠隔遮断状況
  //         ",13",           // 対象数
  //         ",14",           // 成功数
  //         ",15",           // 失敗数
  //         ",16",           // 依頼時刻
  //         ",17",           // 終了時刻
  //         ",18",           // TC不可
  //         ",19"            // 遮断済数
  //     };
  //     for (int i = 0; i < viewSblockProperty.Count(); i++)
  //         shutoffReqStatusLayerSblockPropertyList.Add(viewHeaderProperty[i].Split(',')[GlobalConst.HEADER_PROPERTYLIST_WIDTH] + "," + viewSblockProperty[i]);
  //     shutoffReqStatusLayerSblockPropertyList.Insert((int)ShutoffReqStatusLayerSblockCanvasItem.Indent, indentWidth.ToString() + "," + ",-1,,noBorder");

  //     string[] nextIndentProperties = shutoffReqStatusLayerSblockPropertyList[(int)ShutoffReqStatusLayerSblockCanvasItem.Indent + 1].Split(',');
  //     int nextIndentColWidth = int.Parse(nextIndentProperties[0]) - indentWidth;
  //     nextIndentProperties[0] = nextIndentColWidth.ToString();
  //     shutoffReqStatusLayerSblockPropertyList[(int)ShutoffReqStatusLayerSblockCanvasItem.Indent + 1] = String.Join(",", nextIndentProperties);

  //     // デフォルトのソート順の設定
  //     List<FilterManager.SortCondition> sc = GetSortCondition((int)ShutoffBlockPattern.ShutoffReqSt);
  //     FilterManager.SortCondition s = new FilterManager.SortCondition();
  //     s.SortTag = (int)ShutoffReqStatusTag.BlockName;
  //     s.IsUp = GetInitialSortType((int)ShutoffBlockPattern.ShutoffReqSt, s.SortTag);
  //     sc.Add(s);

  //     // ストーリーボードの設定
  //     shutoffReqStatusListCanvas.Resources.Add("shutoffReqStatusStoryboard", shutoffReqStatusStoryboard);
  // }

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面 ヘッダ部作成
  // /// </summary>
  // private void InitFeelEqShutoffStatusList()
  // {
  //     string[] viewHeaderProperty = new string[] {
  //         string.Format("0,110,sortText#エリア#38#10#{0}#95#24", ConvertTagToKeyFeelEqShutoffStatus((int)FeelEqShutoffStatusTag.AreaName)),
  //         string.Format("0,70,sortText#Sブロック#12#3#{0}#56#24,sortText#番号#22#21#{0}", ConvertTagToKeyFeelEqShutoffStatus((int)FeelEqShutoffStatusTag.SBlockName)),
  //         string.Format("0,73,sortText#総需要家#14#3#{0}#51#24,sortText#件数#26#21#{0}", ConvertTagToKeyFeelEqShutoffStatus((int)FeelEqShutoffStatusTag.CustomerCnt)),
  //         string.Format("0,73,sortText#供給継続#11#3#{0}#60#5,sortText#需要家件数#5#21#{0}", ConvertTagToKeyFeelEqShutoffStatus((int)FeelEqShutoffStatusTag.ContinueCustomerCnt)),
  //         string.Format("0,59,sortText#遮断#16#3#{0}#45#24,sortText#設定#16#21#{0}", ConvertTagToKeyFeelEqShutoffStatus((int)FeelEqShutoffStatusTag.ShutoffBorderSi)),
  //         string.Format("0,73,sortText#感震遮断#14#3#{0}#51#24,sortText#設定#26#21#{0}", ConvertTagToKeyFeelEqShutoffStatus((int)FeelEqShutoffStatusTag.ShutoffSi)),
  //         string.Format("0,45,sortText#最大SI#2#10#{0}#31#27", ConvertTagToKeyFeelEqShutoffStatus((int)FeelEqShutoffStatusTag.MaxSi)),
  //         string.Format("0,65#rightThickness,sortText#ガバナ#16#3#{0}#51#24,sortText#停止率#14#21#{0}", ConvertTagToKeyFeelEqShutoffStatus((int)FeelEqShutoffStatusTag.GovernorStopRate)),
  //         string.Format("0,61#244#rightThicknessOnryHeader#rightMargin_5,sortText#ガバナ数#3#3#{0}#52#5", ConvertTagToKeyFeelEqShutoffStatus((int)FeelEqShutoffStatusTag.GovCnt)),
  //         string.Format("20,61,sortText#停止#19#3#{0}#47#6", ConvertTagToKeyFeelEqShutoffStatus((int)FeelEqShutoffStatusTag.StopCnt)),
  //         string.Format("20,61,sortText#継続#19#3#{0}#47#6", ConvertTagToKeyFeelEqShutoffStatus((int)FeelEqShutoffStatusTag.ContinuanceCnt)),
  //         string.Format("20,61,sortText#未確認#10#3#{0}#47#6", ConvertTagToKeyFeelEqShutoffStatus((int)FeelEqShutoffStatusTag.UnconfirmedCnt))
  //     };

  //     List<FrameworkElement> ret = CommonUtil.GetGridHeader(viewHeaderProperty, 42, new MouseButtonEventHandler(FeelEqShutoffStatus_HeaderTitle_MouseLeftButtonDown));
  //     FeelEqShutoffStatusGrid.Children.Add(ret[0]);
  //     feelEqShutoffStatusListCanvas = ret[1] as Canvas;
  //     feelEqShutoffStatusListHeaderCanvas = ret[2] as Canvas;
  //     feelEqShutoffStatusListScroll = ret[3] as ScrollViewer;

  //     // ブロックリスト属性を作成する
  //     string[] viewProperty = new string[] {
  //         ",0",            // エリア
  //         "linkText,1",    // Sブロック番号
  //         ",2",            // 総需要家件数
  //         ",3",            // 供給継続需要家件数
  //         ",4",            // 遮断設定
  //         "centerText,5",  // 感震遮断設定
  //         ",6",            // 最大SI
  //         "colorText,7",   // ガバナ停止率
  //         ",8",            // ガバナ数
  //         ",9",            // 停止数
  //         ",10",           // 継続数
  //         ",11"            // 未確認数
  //     };
  //     for (int i = 0; i < viewProperty.Count(); i++)
  //         feelEqShutoffStatusPropertyList.Add(viewHeaderProperty[i].Split(',')[GlobalConst.HEADER_PROPERTYLIST_WIDTH] + "," + viewProperty[i]);

  //     // デフォルトのソート順の設定
  //     List<FilterManager.SortCondition> sc = GetSortCondition((int)ShutoffBlockPattern.FeelEqShutoffSt);
  //     FilterManager.SortCondition s = new FilterManager.SortCondition();
  //     s.SortTag = (int)FeelEqShutoffStatusTag.SBlockName;
  //     s.IsUp = GetInitialSortType((int)ShutoffBlockPattern.FeelEqShutoffSt, s.SortTag);
  //     sc.Add(s);
  // }

  // /// <summary>
  // /// 地震モードの変更イベント
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void EqModeChanged(object sender, EventArgs e)
  // {
  //     // 保持しているリストをクリアする
  //     if (lblockValList != null)
  //     {
  //         lblockValList.Clear();
  //         lblockValList = null;
  //     }
  //     if (sblockValList != null)
  //     {
  //         sblockValList.Clear();
  //         sblockValList = null;
  //     }
  //     if (lBlockStopAuthorityList != null)
  //     {
  //         lBlockStopAuthorityList.Clear();
  //         lBlockStopAuthorityList = null;
  //     }
  //     // Sブロックの点滅を全てクリアする
  //     controller.ClearAllBlinkSBlock();

  //     // 通常モードまたは過去地震の場合遠隔遮断ボタンを非活性に
  //     if (!controller.IsEqMode || controller.IsPastEq)
  //     {
  //         this.ShutoffExecuteButton.IsEnabled = false;
  //         this.SblockShutoffExecuteButton.IsEnabled = false;
  //     }
  //     else
  //     {
  //         this.ShutoffExecuteButton.IsEnabled = true;
  //         this.SblockShutoffExecuteButton.IsEnabled = true;
  //     }

  //     // 画面を更新する
  //     if (IsEnabled) ListRedraw(nowPattern);
  // }

  /// <summary>
  /// 一覧部の再描画
  /// </summary>
  /// <param name="patternNum">パターン</param>
  // const ListRedraw = (patternNum: number) => {
  //   // if (!ModelManager.IsLoaded<LBlockValModel>()) return;
  //   // if (!ModelManager.IsLoaded<SBlockValModel>()) return;

  //   // パターン設定
  //   // JudgeExistPattern();

  //   switch (patternNum) {
  //     case ShutoffBlockPattern.ShutoffReqSt as number:
  //       // CustomerCountGrid.Visibility = Visibility.Collapsed;
  //       // OperateStackPanel.Visibility = Visibility.Collapsed;
  //       // SblockOperateStackPanel.Visibility = Visibility.Collapsed;

  //       // SBlockValModel_UpdateRedraw(null, null);
  //       // LBlockValModel_UpdateRedraw(null, null);
  //       break
  //     case ShutoffBlockPattern.FeelEqShutoffSt as number:
  //       // CustomerCountGrid.Visibility = Visibility.Collapsed
  //       // OperateStackPanel.Visibility = Visibility.Collapsed
  //       // SblockOperateStackPanel.Visibility = Visibility.Collapsed

  //       // SBlockValModel_UpdateRedraw(null, null)
  //       break
  //     default:
  //       // CustomerCountGrid.Visibility = Visibility.Visible
  //       // OperateStackPanel.Visibility = Visibility.Visible
  //       // OperateStackPanel.Visibility = Visibility.Visible
  //       // SblockOperateStackPanel.Visibility = Visibility.Collapsed

  //       // SBlockValModel_UpdateRedraw(null, null)
  //       LBlockValModel_UpdateRedraw(null, null)
  //       break
  //   }
  //   // 表示件数を設定
  //   // TotalShutoffCntText.Text = String.Format(TOTAL_PAGE_CNT_VIEW_TEXT, Pagenate.GetLastCount())
  // }

  // /// <summary>
  // /// 一覧部の再描画(一括印刷用)
  // /// </summary>
  // /// <param name="patternNum">パターン</param>
  // public void ListRedraw()
  // {
  //     // パターン設定
  //     JudgeExistPattern();
  //     CustomerCountGrid.Visibility = Visibility.Visible;
  //     OperateStackPanel.Visibility = Visibility.Visible;
  //     OperateStackPanel.Visibility = Visibility.Visible;
  //     SblockOperateStackPanel.Visibility = Visibility.Collapsed;

  //     SBlockValModel_UpdateRedraw(null, null, false);
  //     LBlockValModel_UpdateRedraw(null, null, false);
  // }

  // /// <summary>
  // /// 一覧部の再描画(外部情報更新時)
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // public void ListRedrawForExtInfos(object sender, EventArgs e)
  // {
  //     if (IsEnabled) ListRedraw(nowPattern);
  // }

  /// <summary>
  /// データ(L毎観測値)が更新された場合の再描画処理
  /// </summary>
  /// <param name="sender"></param>
  /// <param name="e"></param>
  // const LBlockValModel_UpdateRedraw = (sender: any, e: any) => {
  //   // // 非表示時は処理しない
  //   // if (!IsEnabled) return;
  //   // if (!ModelManager.IsLoaded<LBlockValModel>()) return;
  //   // if (nowPattern == -1) return;

  //   // if (this.lBlockStopAuthorityList == null && this.controller.IsSpecialPrivilege() == false)
  //   // {
  //   //     if (!ModelManager.IsLoaded<LBlockStopAuthorityModel>()) return;
  //   //     this.lBlockStopAuthorityList = ModelManager.GetList<LBlockStopAuthorityModel>(o => o.BaseNo == this.controller.BaseNo);
  //   // }

  //   // // Lブロックリストの設定
  //   SetLblockValList()

  //   // // 他モデルの情報をL毎観測値モデルに設定する
  //   // if (lblockValList.Count() > 0) { SetLblockValModelColumnByOtherModel(); }

  //   // List<FilterManager.SortCondition> sc = GetSortCondition(nowPattern);
  //   if (nowPattern === (ShutoffBlockPattern.ShutoffReqSt as number)) {
  //     // // ソート
  //     // if (lblockValList != null && lblockValList.Count() > 0) SortShutoffReqStatusLblockValList(sc)
  //     // if (sblockValList != null && sblockValList.Count() > 0) SortShutoffReqStatusSblockValList(sc)
  //     // // リスト更新
  //     // CreateShutoffReqStatusList(false)
  //   } else {
  //     // // ソート
  //     // if (lblockValList != null && lblockValList.Count() > 0) SortShutoffLblockLblockValList(sc)
  //     // if (sblockValList != null && sblockValList.Count() > 0) SortShutoffLblockSblockValList(sc)
  //     // // リスト更新
  //     CreateShutoffLblockList(false)
  //   }
  // }

  // /// <summary>
  // /// データ(L毎観測値)が更新された場合の再描画処理(一括印刷用)
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void LBlockValModel_UpdateRedraw(object sender, EventArgs e, bool allPrintFlg)
  // {
  //     if (nowPattern == -1) return;

  //     if (this.lBlockStopAuthorityList == null && this.controller.IsSpecialPrivilege() == false)
  //     {
  //         if (!ModelManager.IsLoaded<LBlockStopAuthorityModel>()) return;
  //         this.lBlockStopAuthorityList = ModelManager.GetList<LBlockStopAuthorityModel>(o => o.BaseNo == this.controller.BaseNo);
  //     }

  //     // Lブロックリストの設定
  //     SetLblockValList();

  //     // 他モデルの情報をL毎観測値モデルに設定する
  //     if (lblockValList.Count() > 0) { SetLblockValModelColumnByOtherModel(); }

  //     List<FilterManager.SortCondition> sc = GetSortCondition(nowPattern);
  //     // ソート
  //     if (lblockValList != null && lblockValList.Count() > 0)
  //         SortShutoffLblockLblockValList(sc);
  //     if (sblockValList != null && sblockValList.Count() > 0)
  //         SortShutoffLblockSblockValList(sc);
  //     // リスト更新
  //     CreateShutoffLblockList(false);
  // }

  // /// <summary>
  // /// 他モデルの情報をL毎観測値モデルに設定する
  // /// </summary>
  // private void SetLblockValModelColumnByOtherModel()
  // {
  //     // 外部連携情報を取得
  //     controller.getLblockExtInfo();

  //     List<ExtGaskojiInfoModel> gaskojiList = ModelManager.GetList<ExtGaskojiInfoModel>();
  //     List<ExtKaisenInfoModel> kaisenList = ModelManager.GetList<ExtKaisenInfoModel>();

  //     foreach (LBlockValModel lv in ModelManager.GetList<LBlockValModel>(o => o.KBlockNo < controller.GetInvalidKBlockNo()))
  //     {
  //         // 復旧状況設定
  //         lv.restorationWorkStatus = 0;
  //         foreach (SBlockValModel sv in ModelManager.GetList<SBlockValModel>(o => o.LBlockId == lv.LBlockId && o.KBlockNo < controller.GetInvalidKBlockNo()))
  //         {
  //             List<ExtGaskojiInfoModel> gsList = gaskojiList.Where(o => o.sblockId == sv.SBlockId).ToList();
  //             List<ExtKaisenInfoModel> kList = kaisenList.Where(o => o.sblockId == sv.SBlockId).ToList();
  //             TmpExtGaskojiKaisenInfosModel tmpInfo = new TmpExtGaskojiKaisenInfosModel();
  //             if (gsList != null && gsList.Count() > 0)
  //             {
  //                 tmpInfo.GasWorkStartedAt = gsList[0].GasWorkStartedAt;
  //                 tmpInfo.GasWorkEndedAt = gsList[0].GasWorkEndedAt;
  //                 tmpInfo.GasInStartedAt = gsList[0].GasInStartedAt;
  //                 tmpInfo.GasInEndedAt = gsList[0].GasInEndedAt;
  //             }
  //             if (kList != null && kList.Count() > 0)
  //             {
  //                 tmpInfo.openMeterCnt = kList[0].openMeterCnt;
  //                 tmpInfo.meterCnt = kList[0].meterCnt;
  //             }

  //             int restorationWorkStatus = CommonUtil.restorationWorkStatus(tmpInfo, (gsList != null && gsList.Count() > 0), (kList != null && kList.Count() > 0));
  //             // 復旧工事情報のあるSが存在することのみをチェックする
  //             //if (restorationWorkStatus > 0 && (lv.restorationWorkStatus == 0 || lv.restorationWorkStatus > restorationWorkStatus))
  //             if (restorationWorkStatus > 0)
  //             {
  //                 lv.restorationWorkStatus = restorationWorkStatus;
  //                 break;
  //             }
  //         }
  //     }
  // }

  // /// <summary>
  // /// データ(S毎観測値)が更新された場合の再描画処理
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void SBlockValModel_UpdateRedraw(object sender, EventArgs e)
  // {
  //     // 非表示時は処理しない
  //     if (!IsEnabled) return;
  //     if (!ModelManager.IsLoaded<SBlockValModel>()) return;
  //     if (nowPattern == -1) return;

  //     // Sブロックリストの設定
  //     SetSblockValList();

  //     // 他モデルの情報をS毎観測値モデルに設定する
  //     if (sblockValList.Count() > 0) { SetSblockValModelColumnByOtherModel(); }

  //     if (nowPattern == (int)ShutoffBlockPattern.FeelEqShutoffSt)
  //     {
  //         if (sblockValList.Count() > 0) { SortFeelEqShutoffStatusList(GetSortCondition(nowPattern)); }
  //         CreateFeelEqShutoffStatusList(false);
  //     }
  // }

  // /// <summary>
  // /// データ(S毎観測値)が更新された場合の再描画処理(一括印刷用)
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void SBlockValModel_UpdateRedraw(object sender, EventArgs e, bool allPrintFlg)
  // {
  //     if (nowPattern == -1) return;

  //     // Sブロックリストの設定
  //     SetSblockValList();

  //     // 他モデルの情報をS毎観測値モデルに設定する
  //     if (sblockValList.Count() > 0) { SetSblockValModelColumnByOtherModel(); }
  // }

  // /// <summary>
  // /// 他モデルの情報をS毎観測値モデルに設定する
  // /// </summary>
  // private void SetSblockValModelColumnByOtherModel()
  // {
  //     List<ExtGaskojiInfoModel> gaskojiList = ModelManager.GetList<ExtGaskojiInfoModel>();
  //     List<ExtKaisenInfoModel> kaisenList = ModelManager.GetList<ExtKaisenInfoModel>();

  //     foreach (SBlockValModel sv in ModelManager.GetList<SBlockValModel>(o => o.KBlockNo < controller.GetInvalidKBlockNo()))
  //     {
  //         // 復旧状況設定
  //         List<ExtGaskojiInfoModel> gsList = gaskojiList.Where(o => o.sblockId == sv.SBlockId).ToList();
  //         List<ExtKaisenInfoModel> kList = kaisenList.Where(o => o.sblockId == sv.SBlockId).ToList();
  //         TmpExtGaskojiKaisenInfosModel tmpInfo = new TmpExtGaskojiKaisenInfosModel();
  //         if (gsList != null && gsList.Count() > 0)
  //         {
  //             tmpInfo.GasWorkStartedAt = gsList[0].GasWorkStartedAt;
  //             tmpInfo.GasWorkEndedAt = gsList[0].GasWorkEndedAt;
  //             tmpInfo.GasInStartedAt = gsList[0].GasInStartedAt;
  //             tmpInfo.GasInEndedAt = gsList[0].GasInEndedAt;
  //         }
  //         if (kList != null && kList.Count() > 0)
  //         {
  //             tmpInfo.openMeterCnt = kList[0].openMeterCnt;
  //             tmpInfo.meterCnt = kList[0].meterCnt;
  //         }
  //         sv.restorationWorkStatus = CommonUtil.restorationWorkStatus(tmpInfo, (gsList != null && gsList.Count() > 0), (kList != null && kList.Count() > 0));
  //     }
  // }

  /// <summary>
  /// 遠隔遮断実施画面(Lブロック) リスト更新
  /// </summary>
  /// <param name="forceFlg">強制再作成フラグ</param>
  // const CreateShutoffLblockList = (forceFlg: boolean) => {
  // convertData(lblockValList)
  // if (shutoffLblockListCanvas == null || lblockValList == null) return;
  // // 簡易・詳細画面切替の為、ヘッダー部を再作成
  // InitShutoffLblockList();
  // // 強制再作成フラグが立っている場合は一覧をクリアする
  // if (forceFlg) shutoffLblockListCanvas.Children.Clear();
  // // FindNameが効いているか判定する
  // bool isFindName = IsFindNameEffective(shutoffLblockListCanvas);
  // // 需要家件数セット
  // SetCustomerCount();
  // StackPanel tmpSp = new StackPanel();
  // double lblockHeight = 0;
  // double sblockHeight = 0;
  // // 被害推定が完了しているかどうか
  // bool isFirstDmgEstimationJudgeCompleted = controller.IsFirstDmgEstimationJudgeCompleted();
  // int firstCount = Pagenate.GetFirstCount();
  // int lastCount = Pagenate.GetLastCount();
  // if (firstCount != 0)
  // {
  //     // 表示する行を作成する
  //     for (int i = 0; i < lastCount - firstCount + 1; i++)
  //     {
  //         int dataNum = i + (firstCount - 1);
  //         LBlockValModel lv = lblockValList[dataNum];
  //         // 差分チェック用表示データ取得
  //         string diffCheckData = GetShutoffLblockListDiffCheckData(lv, isFirstDmgEstimationJudgeCompleted);
  //         Canvas c = SearchCanvas(shutoffLblockListCanvas, string.Format(SHUTOFF_LBLOCK_CANVAS_KEY_STRING, lv.Key), isFindName);
  //         if (c == null || c.Tag as string != diffCheckData)
  //         {
  //             // 遮断権限チェック
  //             bool authorityFlg = false;
  //             if (this.controller.IsSpecialPrivilege() || (lBlockStopAuthorityList != null && 0 < this.lBlockStopAuthorityList.Count(o => o.KBlockNo == lv.KBlockNo && o.LBlockNo == lv.LBlockNo))) authorityFlg = true;
  //             // 対向試験期間中、ダミーブロックに遮断権限を与えない
  //             if (lv.KBlockNo == KblockConst.INVALID_KBLOCK_NO_CONTAIN_DUMMY_BLOCK && lv.LBlockNo == LblockConst.BRANCH_DUMMY_LBLOCK_NO) authorityFlg = false;
  //             // 代表局最大SI塗りつぶし用（広域のみ）
  //             SolidColorBrush representMaxSiBrush = new SolidColorBrush();
  //             // 超過率塗りつぶし用（本店のみ）
  //             var info = new OverKineRateInfo(lv);
  //             if (CommonUtil.IsBranch(lv.KBlockNo))
  //             {
  //                 representMaxSiBrush = new SolidColorBrush(GetRepresentMaxSiColor(lv.RepresentMaxSi, lv.LBlock.ShutoffBorderSi));
  //             }
  //             // 行作成
  //             c = CommonUtil.MakeCanvas(
  //                 diffCheckData,
  //                 new List<SolidColorBrush>()
  //                 {
  //                     null,                                                                   // 遮断
  //                     null,                                                                   // ブロック番号
  //                     JUDGERESULT_BACKGROUND[lv.JudgeResult],                                 // 停止判断
  //                     new SolidColorBrush(CommonUtil.GetShutoffStateColor(lv.ShutoffStatus)), // 依頼状況
  //                     null,                                                                   // 総需要家件数
  //                     null,                                                                   // 供給継続需要家件数
  //                     null,                                                                   // エリア
  //                     null,                                                                   // ブロック区分
  //                     null,                                                                   // 遮断設定
  //                     null,                                                                   // Kブロック番号
  //                     representMaxSiBrush,                                                    // 代表局最大SI
  //                     null,                                                                   // 最大SI
  //                     null,                                                                   // 平均SI
  //                     null,                                                                   // 感震遮断設定
  //                     info.over30KineBrush,                                                   // 30Kine超過率
  //                     info.maxComAbleOver30KineBrush,                                         // 最大30Kine超過率
  //                     info.over60KineBrush,                                                   // 60Kine超過率
  //                     info.maxComAbleOver60KineBrush,                                         // 最大60Kine超過率
  //                     info.over70KineBrush,                                                   // 70Kine超過率
  //                     info.maxComAbleOver70KineBrush,                                         // 最大70Kine超過率
  //                     info.over80KineBrush,                                                   // 80Kine超過率
  //                     info.maxComAbleOver80KineBrush,                                         // 最大80Kine超過率
  //                     info.over90KineBrush,                                                   // 90Kine超過率
  //                     info.maxComAbleOver90KineBrush,                                         // 最大90Kine超過率
  //                     FLG_BACKGROUND[CommonUtil.BoolToInteger(lv.IsGovStopRateOver)],         // ガバナ停止率
  //                     FLG_BACKGROUND[CommonUtil.BoolToInteger(lv.IsLpMinConnectedOver)],      // 最低LP
  //                     null,                                                                   // 平均LP
  //                     null,                                                                   // 最低MP
  //                     null,                                                                   // 液状化警報率
  //                     null,                                                                   // 平均PL
  //                     NO_COLUMN_BACKGROUND,                                                   // グラフ表示
  //                     null,                                                                   // ガバナ一覧
  //                     null,                                                                   // 復旧状況
  //                     null,                                                                   // 遠隔D復旧Sブロック
  //                     FLG_BACKGROUND[CommonUtil.BoolToInteger(lv.IsPowerFailureRateOver)],    // 停電率
  //                     null,                                                                   // 火災件数
  //                     null,                                                                   // 漏えい受付
  //                     null                                                                    // 建物全半壊率
  //                 },
  //                 authorityFlg ? shutoffLblockPropertyList : shutoffLblockPropertyListNoCheck, i, 25);
  //             c.Name = string.Format(SHUTOFF_LBLOCK_CANVAS_KEY_STRING, lv.Key);
  //             c.Tag = diffCheckData;
  //             // チェックボックスのイベントを登録する
  //             if ((c.Children[(int)ShutoffLblockCanvasItem.ShutoffChecked] as Border).Child as FrameworkElement is CheckBox)
  //             {
  //                 ((c.Children[(int)ShutoffLblockCanvasItem.ShutoffChecked] as Border).Child as CheckBox).Checked += new RoutedEventHandler(ShutoffCheck_CheckUnchecked);
  //                 ((c.Children[(int)ShutoffLblockCanvasItem.ShutoffChecked] as Border).Child as CheckBox).Unchecked += new RoutedEventHandler(ShutoffCheck_CheckUnchecked);
  //             }
  //             // テキストボックスのイベントを登録する
  //             ((c.Children[(int)ShutoffLblockCanvasItem.BlockName] as Border).Child as TextBlock).MouseLeftButtonDown += new MouseButtonEventHandler(LblockNameText_MouseLeftButtonDown);
  //             ((c.Children[(int)ShutoffLblockCanvasItem.GovernorListShow] as Border).Child as TextBlock).MouseLeftButtonDown += new MouseButtonEventHandler(LblockGovernorListShowText_MouseLeftButtonDown);
  //             //((c.Children[(int)ShutoffLblockCanvasItem.restorationWorkStatus] as Border).Child as TextBlock).MouseLeftButtonDown += new MouseButtonEventHandler(LblockRestorationStatusText_MouseLeftButtonDown);
  //             TextBlock tbLeak = ((c.Children[(int)ShutoffLblockCanvasItem.LeakCnt] as Border).Child as TextBlock);
  //             if (tbLeak.Text == CommonUtil.GetNoData()) tbLeak.TextAlignment = TextAlignment.Center;
  //             TextBlock tbFire = ((c.Children[(int)ShutoffLblockCanvasItem.FireCnt] as Border).Child as TextBlock);
  //             if (tbFire.Text == CommonUtil.GetNoData()) tbFire.TextAlignment = TextAlignment.Center;
  //         }
  //         // 階層Sブロック用スタックパネルの設定
  //         StackPanel layerSblockSp = shutoffLblockListStackPanel.FindName(string.Format(SHUTOFF_LBLOCK_LAYER_STACK_PANEL_KEY_STRING, lv.Key)) as StackPanel;
  //         if (layerSblockSp == null)
  //         {
  //             layerSblockSp = new StackPanel();
  //             layerSblockSp.Orientation = Orientation.Vertical;
  //             layerSblockSp.Name = string.Format(SHUTOFF_LBLOCK_LAYER_STACK_PANEL_KEY_STRING, lv.Key);
  //             if (shutoffLblockLayerOnLblockId == lv.Key.ToString())
  //             {
  //                 // 階層Sブロック用スタックパネルが新規に作られる場合は、階層表示対象LブロックIDを初期化する
  //                 shutoffLblockLayerOnLblockId = "";
  //             }
  //         }
  //         // 階層表示対象でなければクリアする
  //         if (shutoffLblockLayerOnLblockId == "")
  //         {
  //             layerSblockSp.Children.Clear();
  //             layerSblockSp.Height = 0;
  //         }
  //         // 階層表示マークの設定
  //         List<SBlockValModel> svs = sblockValList.Where(o => o.LBlockId == lv.Key).ToList();
  //         Border b = c.Children[(int)ShutoffLblockCanvasItem.LayerMark] as Border;
  //         if (svs.Count > 0)
  //         {
  //             b.VerticalAlignment = VerticalAlignment.Center;
  //             b.HorizontalAlignment = HorizontalAlignment.Center;
  //             Border layerMarkBorder = new Border();
  //             layerMarkBorder.Child = getLayerMarkCanvas(shutoffLblockLayerOnLblockId != lv.Key.ToString());
  //             layerMarkBorder.Cursor = Cursors.Hand;
  //             layerMarkBorder.MouseLeftButtonDown += new MouseButtonEventHandler(ShutoffLblockLayerMark_MouseLeftButtonDown);
  //             layerMarkBorder.Name = string.Format(SHUTOFF_LBLOCK_LAYER_MARK_KEY_STRING, lv.Key);
  //             b.Child = layerMarkBorder;
  //         }
  //         else if (svs.Count == 0)
  //         {
  //             b.Child = null;
  //         }
  //         // 遮断確認時にキャンセルした場合など、
  //         // チェックボックスがtrueでチェックしたかどうかの内部情報がfalseの場合に、
  //         // チェックボックスを内部の情報に合わせる。
  //         CheckBox cb = (c.Children[(int)ShutoffLblockCanvasItem.ShutoffChecked] as Border).Child as CheckBox;
  //         if (cb != null && lv.LBlock.IsChecked == false && (bool)cb.IsChecked == true)
  //         {
  //             cb.Checked -= ShutoffCheck_CheckUnchecked;
  //             cb.Unchecked -= ShutoffCheck_CheckUnchecked;
  //             cb.IsChecked = false;
  //             cb.Checked += ShutoffCheck_CheckUnchecked;
  //             cb.Unchecked += ShutoffCheck_CheckUnchecked;
  //         }
  //         if (shutoffLblockLayerOnLblockId == lv.Key.ToString())
  //         {
  //             // 子Sブロックの更新
  //             CreateShutoffLblockLayerSblockList(lv.Key.ToString(), svs);
  //             // 表示しているSブロック行数(Canvasの高さの調整に使用)
  //             sblockHeight = svs.Count() * 25;
  //         }
  //         // 元のスタックパネルから子を一度削除し、tmpスタックパネルに追加
  //         shutoffLblockListStackPanel.Children.Remove(c);
  //         shutoffLblockListStackPanel.Children.Remove(layerSblockSp);
  //         tmpSp.Children.Add(c);
  //         tmpSp.Children.Add(layerSblockSp);
  //         lblockHeight += c.Height;
  //     }
  // }
  // // スタックパネルを再設定
  // shutoffLblockListStackPanel = tmpSp;
  // // Canvasの中身を設定しなおす
  // shutoffLblockListCanvas.Children.Clear();
  // shutoffLblockListCanvas.Children.Add(shutoffLblockListStackPanel);
  // // 高さの調整
  // shutoffLblockListCanvas.Height = lblockHeight + sblockHeight;
  // shutoffLblockListCanvas.Tag = lblockHeight;
  // // 階層Sブロックにインデントをつけたためにその下のLブロック行の上枠線がないように見えるので線を引く
  // if (shutoffLblockLayerOnLblockId != "")
  // {
  //     StackPanel layerSblockSp = shutoffLblockListStackPanel.FindName(string.Format(SHUTOFF_LBLOCK_LAYER_STACK_PANEL_KEY_STRING, shutoffLblockLayerOnLblockId)) as StackPanel;
  //     DrawIndentUnderLine(shutoffLblockListStackPanel, layerSblockSp, (int)ShutoffLblockLayerSblockCanvasItem.Indent);
  // }
  // // 道路上の被害推定(継続地区累計、合計)の埋め込み
  // SetLblockLpSupplyDmgCnt();
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) 子Sブロックのリスト更新
  // /// </summary>
  // /// <param name="lblockId">子Sブロックを表示させるLブロックID</param>
  // /// <param name="svs">子Sブロックのリスト</param>
  // private void CreateShutoffLblockLayerSblockList(string lblockId, List<SBlockValModel> svs)
  // {
  //     CreateShutoffLblockLayerSblockList(lblockId, svs, false);
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) 子Sブロックのリスト更新
  // /// </summary>
  // /// <param name="lblockId">子Sブロックを表示させるLブロックID</param>
  // /// <param name="svs">子Sブロックのリスト</param>
  // /// <param name="isMouseLeftButtonDown">階層表示マーク押下時かどうか</param>
  // private void CreateShutoffLblockLayerSblockList(string lblockId, List<SBlockValModel> svs, bool isMouseLeftButtonDown)
  // {
  //     StackPanel layerSblockSp = shutoffLblockListStackPanel.FindName(string.Format(SHUTOFF_LBLOCK_LAYER_STACK_PANEL_KEY_STRING, lblockId)) as StackPanel;
  //     layerSblockSp.Children.Clear();

  //     int orderCnt = 0;
  //     // Sブロック表示をさせようとしている親Lブロック行が上から何番目なのか求める
  //     for (orderCnt = 0; orderCnt < lblockValList.Count(); orderCnt++)
  //         if (lblockValList[orderCnt].LBlockId == int.Parse(lblockId)) break;

  //     shutoffLblockSBlockCnt = svs.Count();
  //     shutoffLblockLineHeight = orderCnt * 25;
  //     shutoffLblockOldScrollHeight = shutoffLblockListScroll.ExtentHeight;

  //     // 被害推定が完了しているかどうか
  //     bool isFirstDmgEstimationJudgeCompleted = controller.IsFirstDmgEstimationJudgeCompleted();

  //     for (int i = 0; i < svs.Count; i++)
  //     {
  //         SBlockValModel sv = svs[i];

  //         string sblockDiffCheckData = GetShutoffLblockSblockListDiffCheckData(sv, isFirstDmgEstimationJudgeCompleted);

  //         Canvas c = CommonUtil.MakeCanvas(
  //             sblockDiffCheckData,
  //             new List<SolidColorBrush>()
  //                 {
  //                     NO_COLUMN_BACKGROUND,                                                      // 遮断
  //                     null,                                                                      // ブロック番号
  //                     NO_COLUMN_BACKGROUND,                                                      // 停止判断
  //                     NO_COLUMN_BACKGROUND,                                                      // 依頼状況
  //                     null,                                                                      // 総需要家件数
  //                     null,                                                                      // 供給継続需要家件数
  //                     null,                                                                      // エリア
  //                     NO_COLUMN_BACKGROUND,                                                      // ブロック区分
  //                     NO_COLUMN_BACKGROUND,                                                      // 遮断設定
  //                     NO_COLUMN_BACKGROUND,                                                      // Kブロック番号
  //                     null,                                                                      // 漏えい遭遇率
  //                     null,                                                                      // 本支管被害数(緊急)
  //                     null,                                                                      // 本支管被害数(総数)
  //                     NO_COLUMN_BACKGROUND,                                                      // 代表局最大SI
  //                     null,                                                                      // 最大SI
  //                     null,                                                                      // 平均SI
  //                     null,                                                                      // 感震遮断設定
  //                     NO_COLUMN_BACKGROUND,                                                      // 30Kine超過率
  //                     NO_COLUMN_BACKGROUND,                                                      // 最大30Kine超過率
  //                     NO_COLUMN_BACKGROUND,                                                      // 60Kine超過率
  //                     NO_COLUMN_BACKGROUND,                                                      // 最大60Kine超過率
  //                     NO_COLUMN_BACKGROUND,                                                      // 70Kine超過率
  //                     NO_COLUMN_BACKGROUND,                                                      // 最大70Kine超過率
  //                     NO_COLUMN_BACKGROUND,                                                      // 80Kine超過率
  //                     NO_COLUMN_BACKGROUND,                                                      // 最大80Kine超過率
  //                     NO_COLUMN_BACKGROUND,                                                      // 90Kine超過率
  //                     NO_COLUMN_BACKGROUND,                                                      // 最大90Kine超過率
  //                     FLG_BACKGROUND[CommonUtil.BoolToInteger(sv.IsGovStopRateOver)],            // ガバナ停止率
  //                     FLG_BACKGROUND[CommonUtil.BoolToInteger(sv.IsLpMinConnectedOver)],         // 最低LP
  //                     null,                                                                      // 平均LP
  //                     null,                                                                      // 最低MP
  //                     null,                                                                      // 液状化警報率
  //                     NO_COLUMN_BACKGROUND,                                                      // 平均PL
  //                     null,                                                                      // グラフ表示
  //                     null,                                                                      // ガバナ一覧
  //                     new SolidColorBrush(CommonUtil.GetRestorationWorkStatusColor(sv.restorationWorkStatus)),  // 復旧状況
  //                     (sv.IsDRestorationDone) ? REMOTE_OPEN_COMPLETED_BORDER_COLOR : null,       // 遠隔D復旧Sブロック
  //                     FLG_BACKGROUND[CommonUtil.BoolToInteger(sv.IsPowerFailureRateOver)],       // 停電率
  //                     null,                                                                      // 火災件数
  //                     null,                                                                      // 漏えい受付
  //                     null                                                                       // 建物全半壊率
  //                 },
  //             shutoffLblockLayerSblockPropertyList, i, 25);
  //         c.Name = string.Format(SHUTOFF_LBLOCK_LAYER_SBLOCK_KEY_STRING, sv.Key);
  //         c.Tag = sblockDiffCheckData;

  //         // テキストボックスのイベントを登録する
  //         ((c.Children[(int)ShutoffLblockLayerSblockCanvasItem.GraphShow] as Border).Child as TextBlock).MouseLeftButtonDown += new MouseButtonEventHandler(GraphShowText_MouseLeftButtonDown);
  //         ((c.Children[(int)ShutoffLblockLayerSblockCanvasItem.BlockName] as Border).Child as TextBlock).MouseLeftButtonDown += new MouseButtonEventHandler(SblockNameText_MouseLeftButtonDown);
  //         ((c.Children[(int)ShutoffLblockLayerSblockCanvasItem.GovernorListShow] as Border).Child as TextBlock).MouseLeftButtonDown += new MouseButtonEventHandler(SblockGovernorListShowText_MouseLeftButtonDown);
  //         ((c.Children[(int)ShutoffLblockLayerSblockCanvasItem.restorationWorkStatus] as Border).Child as TextBlock).MouseLeftButtonDown += new MouseButtonEventHandler(SblockRestorationStatusText_MouseLeftButtonDown);

  //         TextBlock tbLeak = ((c.Children[(int)ShutoffLblockLayerSblockCanvasItem.LeakCnt] as Border).Child as TextBlock);
  //         if (tbLeak.Text == CommonUtil.GetNoData()) tbLeak.TextAlignment = TextAlignment.Center;
  //         TextBlock tbFire = ((c.Children[(int)ShutoffLblockLayerSblockCanvasItem.FireCnt] as Border).Child as TextBlock);
  //         if (tbFire.Text == CommonUtil.GetNoData()) tbFire.TextAlignment = TextAlignment.Center;

  //         layerSblockSp.Children.Add(c);
  //     }

  //     // Sブロックを可能な限り表示する為に位置補正
  //     if (isMouseLeftButtonDown) shutoffLblockStart_Timer();

  //     // 階層Sブロックにインデントをつけたためにその下のLブロック行の上枠線がないように見えるので線を引く
  //     DrawIndentUnderLine(shutoffLblockListStackPanel, layerSblockSp, (int)ShutoffLblockLayerSblockCanvasItem.Indent);
  // }

  // /// <summary>
  // /// タイマー処理
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void shutoffLblockTimer_Tick(object sender, EventArgs e)
  // {
  //     shutoffLblockTimer.Stop();

  //     // 表示しようとしているSブロック行数が、親のLブロック以降のLブロック行数よりも大きい場合、
  //     // Sブロック表示拡張分がスクロールバーの長さに反映されるまでにタイムラグが存在する為、
  //     // Lブロック行数までしか位置移動できない時がある
  //     // Timerを仕掛けて、S全てが表示できるようになるまで待つ
  //     if (shutoffLblockOldScrollHeight != shutoffLblockListScroll.ExtentHeight)
  //     {
  //         IsEnabledView = true;

  //         if (shutoffLblockLineHeight + (shutoffLblockSBlockCnt + 1) * 25 >= shutoffLblockListScroll.VerticalOffset + shutoffLblockListScroll.ActualHeight)
  //         {
  //             if ((shutoffLblockSBlockCnt + 1) * 25 >= shutoffLblockListScroll.ActualHeight)
  //                 shutoffLblockListScroll.ScrollToVerticalOffset(shutoffLblockLineHeight);
  //             else
  //                 shutoffLblockListScroll.ScrollToVerticalOffset(shutoffLblockListScroll.VerticalOffset + (shutoffLblockLineHeight + (shutoffLblockSBlockCnt + 1) * 25 - (shutoffLblockListScroll.VerticalOffset + shutoffLblockListScroll.ActualHeight)));
  //         }

  //         if (shutoffLblockLineHeight < shutoffLblockListScroll.VerticalOffset)
  //             // 隠れている直近のLブロックを表示最上位行に設定する
  //             shutoffLblockListScroll.ScrollToVerticalOffset(shutoffLblockLineHeight);
  //     }

  //     if (!IsEnabledView)
  //     {
  //         shutoffLblockTimer.Interval = TimeSpan.FromMilliseconds(1);
  //         shutoffLblockTimer.Start();
  //     }
  // }

  // /// <summary>
  // /// タイマー開始
  // /// </summary>
  // private void shutoffLblockStart_Timer()
  // {
  //     // タイマー停止
  //     shutoffLblockTimer.Stop();
  //     IsEnabledView = false;
  //     shutoffLblockTimer_Tick(null, null);
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 リスト更新
  // /// </summary>
  // /// <param name="forceFlg">強制再作成フラグ</param>
  // private void CreateShutoffReqStatusList(bool forceFlg)
  // {
  //     if (shutoffReqStatusListCanvas == null || lblockValList == null) return;

  //     // 強制再作成フラグが立っている場合は一覧をクリアする
  //     if (forceFlg) shutoffReqStatusListCanvas.Children.Clear();

  //     // FindNameが効いているか判定する
  //     bool isFindName = IsFindNameEffective(shutoffReqStatusListCanvas);

  //     StackPanel tmpSp = new StackPanel();
  //     double lblockHeight = 0;
  //     double sblockHeight = 0;

  //     int firstCount = Pagenate.GetFirstCount();
  //     int lastCount = Pagenate.GetLastCount();
  //     if (firstCount != 0)
  //     {
  //         // 表示する行を作成する
  //         for (int i = 0; i < lastCount - firstCount + 1; i++)
  //         {
  //             int dataNum = i + (firstCount - 1);
  //             LBlockValModel lBlockVal = lblockValList[dataNum];

  //             // 差分チェック用表示データ取得
  //             string diffCheckData = GetShutoffReqStatusListDiffCheckData(lBlockVal);

  //             Canvas c = SearchCanvas(shutoffReqStatusListCanvas, string.Format(SHUTOFF_REQ_STATUS_CANVAS_KEY_STRING, lBlockVal.Key), isFindName);
  //             if (c == null || c.Tag as string != diffCheckData)
  //             {
  //                 // 行作成
  //                 c = CommonUtil.MakeCanvas(
  //                     diffCheckData,
  //                     new List<SolidColorBrush>()
  //                     {
  //                         null,                                                                          // エリア
  //                         null,                                                                          // ブロック番号
  //                         null,                                                                          // 総需要家件数
  //                         null,                                                                          // 供給継続需要家件数
  //                         null,                                                                          // ブロック区分
  //                         null,                                                                          // 遮断設定
  //                         null,                                                                          // 最大SI
  //                         FLG_BACKGROUND[CommonUtil.BoolToInteger(lBlockVal.IsGovStopRateOver)],         // ガバナ停止率
  //                         null,                                                                          // ガバナ数
  //                         null,                                                                          // 停止数
  //                         null,                                                                          // 継続数
  //                         null,                                                                          // 未確認数
  //                         new SolidColorBrush(CommonUtil.GetShutoffStateColor(lBlockVal.ShutoffStatus)), // 遠隔遮断実施状況
  //                         null,                                                                          // 対象数
  //                         null,                                                                          // 成功数
  //                         null,                                                                          // 失敗数
  //                         null,                                                                          // 依頼時刻
  //                         null,                                                                          // 終了時刻
  //                         null,                                                                          // TC不可
  //                         null                                                                           // 遮断済数
  //                     },
  //                     shutoffReqStatusPropertyList, i, 25);
  //                 c.Name = string.Format(SHUTOFF_REQ_STATUS_CANVAS_KEY_STRING, lBlockVal.Key);
  //                 c.Tag = diffCheckData;

  //                 // テキストボックスのイベントを登録する
  //                 ((c.Children[(int)ShutoffReqStatusCanvasItem.BlockName] as Border).Child as TextBlock).MouseLeftButtonDown += new MouseButtonEventHandler(LblockNameText_MouseLeftButtonDown);
  //             }

  //             // 子Sブロックのデータを入れるスタックパネルの設定
  //             StackPanel layerSblockSp = shutoffReqStatusListStackPanel.FindName(string.Format(SHUTOFF_REQ_STATUS_LAYER_STACK_PANEL_KEY_STRING, lBlockVal.Key)) as StackPanel;
  //             if (layerSblockSp == null)
  //             {
  //                 layerSblockSp = new StackPanel();
  //                 layerSblockSp.Orientation = Orientation.Vertical;
  //                 layerSblockSp.Name = string.Format(SHUTOFF_REQ_STATUS_LAYER_STACK_PANEL_KEY_STRING, lBlockVal.Key);

  //                 // 階層Sブロック用スタックパネルが新規に作られる場合は、階層表示対象LブロックIDを初期化する
  //                 if (shutoffReqStatusLayerOnLblockId == lBlockVal.Key.ToString())
  //                 {
  //                     shutoffReqStatusLayerOnLblockId = "";
  //                 }
  //             }
  //             // 階層表示対象でなければクリアする
  //             if (shutoffReqStatusLayerOnLblockId != lBlockVal.Key.ToString())
  //             {
  //                 layerSblockSp.Children.Clear();
  //                 layerSblockSp.Height = 0;
  //             }

  //             // 階層表示マークの設定
  //             List<SBlockValModel> svs = sblockValList.Where(o => o.LBlockId == lBlockVal.Key).ToList();
  //             Border b = c.Children[(int)ShutoffReqStatusCanvasItem.LayerMark] as Border;
  //             if (svs.Count > 0)
  //             {
  //                 b.VerticalAlignment = VerticalAlignment.Center;
  //                 b.HorizontalAlignment = HorizontalAlignment.Center;
  //                 Border layerMarkBorder = new Border();
  //                 layerMarkBorder.Child = getLayerMarkCanvas(shutoffReqStatusLayerOnLblockId != lBlockVal.Key.ToString());
  //                 layerMarkBorder.Cursor = Cursors.Hand;
  //                 layerMarkBorder.MouseLeftButtonDown += new MouseButtonEventHandler(ShutoffReqStatusLayerMark_MouseLeftButtonDown);
  //                 layerMarkBorder.Name = string.Format(SHUTOFF_REQ_STATUS_LAYER_MARK_KEY_STRING, lBlockVal.Key);
  //                 b.Child = layerMarkBorder;

  //                 b.VerticalAlignment = VerticalAlignment.Center;
  //                 b.HorizontalAlignment = HorizontalAlignment.Center;
  //             }
  //             else if (svs.Count == 0)
  //             {
  //                 b.Child = null;
  //             }

  //             if (shutoffReqStatusLayerOnLblockId == lBlockVal.Key.ToString())
  //             {
  //                 // 子Sブロックの更新
  //                 CreateShutoffReqStatusLayerSblockList(lBlockVal.Key.ToString(), svs);
  //                 // 表示しているSブロック行数(Canvasの高さの調整に使用)
  //                 sblockHeight = svs.Count() * 25;
  //             }

  //             // 元のスタックパネルから子を一度削除し、tmpスタックパネルに追加
  //             shutoffReqStatusListStackPanel.Children.Remove(c);
  //             shutoffReqStatusListStackPanel.Children.Remove(layerSblockSp);
  //             tmpSp.Children.Add(c);
  //             tmpSp.Children.Add(layerSblockSp);

  //             lblockHeight += c.Height;
  //         }
  //     }

  //     // スタックパネルを再設定
  //     shutoffReqStatusListStackPanel = tmpSp;

  //     // Canvasの中身を設定しなおす
  //     shutoffReqStatusListCanvas.Children.Clear();
  //     shutoffReqStatusListCanvas.Children.Add(shutoffReqStatusListStackPanel);

  //     // 高さの調整
  //     shutoffReqStatusListCanvas.Height = lblockHeight + sblockHeight;
  //     shutoffReqStatusListCanvas.Tag = lblockHeight;

  //     // 階層Sブロックにインデントをつけたためにその下のLブロック行の上枠線がないように見えるので線を引く
  //     if (shutoffReqStatusLayerOnLblockId != "")
  //     {
  //         StackPanel layerSblockSp = shutoffReqStatusListStackPanel.FindName(string.Format(SHUTOFF_REQ_STATUS_LAYER_STACK_PANEL_KEY_STRING, shutoffReqStatusLayerOnLblockId)) as StackPanel;
  //         DrawIndentUnderLine(shutoffReqStatusListStackPanel, layerSblockSp, (int)ShutoffReqStatusLayerSblockCanvasItem.Indent);
  //     }
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 子Sブロックのリスト更新
  // /// </summary>
  // /// <param name="lblockId">子Sブロックを表示させるLブロックID</param>
  // /// <param name="svs">子Sブロックのリスト</param>
  // private void CreateShutoffReqStatusLayerSblockList(string lblockId, List<SBlockValModel> svs)
  // {
  //     CreateShutoffReqStatusLayerSblockList(lblockId, svs, false);
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 子Sブロックのリスト更新
  // /// </summary>
  // /// <param name="lblockId">子Sブロックを表示させるLブロックID</param>
  // /// <param name="svs">子Sブロックのリスト</param>
  // /// <param name="isMouseLeftButtonDown">階層表示マーク押下時かどうか</param>
  // private void CreateShutoffReqStatusLayerSblockList(string lblockId, List<SBlockValModel> svs, bool isMouseLeftButtonDown)
  // {
  //     StackPanel layerSblockSp = shutoffReqStatusListStackPanel.FindName(string.Format(SHUTOFF_REQ_STATUS_LAYER_STACK_PANEL_KEY_STRING, lblockId)) as StackPanel;
  //     layerSblockSp.Children.Clear();

  //     int orderCnt = 0;
  //     // Sブロック表示をさせようとしている親Lブロック行が上から何番目なのか求める
  //     for (orderCnt = 0; orderCnt < lblockValList.Count(); orderCnt++)
  //         if (lblockValList[orderCnt].LBlockId == int.Parse(lblockId)) break;

  //     shutoffReqStatusSBlockCnt = svs.Count();
  //     shutoffReqStatusLineHeight = orderCnt * 25;
  //     shutoffReqStatusOldScrollHeight = shutoffReqStatusListScroll.ExtentHeight;

  //     for (int i = 0; i < svs.Count; i++)
  //     {
  //         SBlockValModel sv = svs[i];

  //         string sblockDiffCheckData = GetShutoffReqStatusSblockListDiffCheckData(sv);

  //         // 行作成
  //         Canvas c = CommonUtil.MakeCanvas(
  //             sblockDiffCheckData,
  //             new List<SolidColorBrush>()
  //                     {
  //                         null,                                                           // エリア
  //                         null,                                                           // ブロック番号
  //                         null,                                                           // 総需要家件数
  //                         null,                                                           // 供給継続需要家件数
  //                         NO_COLUMN_BACKGROUND,                                           // ブロック区分
  //                         NO_COLUMN_BACKGROUND,                                           // 遮断設定
  //                         null,                                                           // 最大SI
  //                         FLG_BACKGROUND[CommonUtil.BoolToInteger(sv.IsGovStopRateOver)], // ガバナ停止率
  //                         null,                                                           // ガバナ数
  //                         null,                                                           // 停止数
  //                         null,                                                           // 継続数
  //                         null,                                                           // 未確認数
  //                         NO_COLUMN_BACKGROUND,                                           // 遠隔遮断実施状況
  //                         NO_COLUMN_BACKGROUND,                                           // 対象数
  //                         NO_COLUMN_BACKGROUND,                                           // 成功数
  //                         NO_COLUMN_BACKGROUND,                                           // 失敗数
  //                         NO_COLUMN_BACKGROUND,                                           // 依頼時刻
  //                         NO_COLUMN_BACKGROUND,                                           // 終了時刻
  //                         NO_COLUMN_BACKGROUND,                                           // TC不可
  //                         NO_COLUMN_BACKGROUND                                            // 遮断済数
  //                     },
  //             shutoffReqStatusLayerSblockPropertyList, i, 25);
  //         c.Name = string.Format(SHUTOFF_REQ_STATUS_LAYER_SBLOCK_KEY_STRING, sv.Key);
  //         c.Tag = sblockDiffCheckData;

  //         // テキストボックスのイベントを登録する
  //         ((c.Children[(int)ShutoffReqStatusLayerSblockCanvasItem.BlockName] as Border).Child as TextBlock).MouseLeftButtonDown += new MouseButtonEventHandler(SblockNameText_MouseLeftButtonDown);

  //         layerSblockSp.Children.Add(c);
  //     }

  //     // Sブロックを可能な限り表示する為に位置補正
  //     if (isMouseLeftButtonDown) shutoffReqStatusStart_Timer();

  //     // 階層Sブロックにインデントをつけたためにその下のLブロック行の上枠線がないように見えるので線を引く
  //     DrawIndentUnderLine(shutoffReqStatusListStackPanel, layerSblockSp, (int)ShutoffReqStatusLayerSblockCanvasItem.Indent);
  // }

  // /// <summary>
  // /// タイマー処理
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void shutoffReqStatusTimer_Tick(object sender, EventArgs e)
  // {
  //     shutoffReqStatusTimer.Stop();

  //     // 表示しようとしているSブロック行数が、親のLブロック以降のLブロック行数よりも大きい場合、
  //     // Sブロック表示拡張分がスクロールバーの長さに反映されるまでにタイムラグが存在する為、
  //     // Lブロック行数までしか位置移動できない時がある
  //     // Timerを仕掛けて、S全てが表示できるようになるまで待つ
  //     if (shutoffReqStatusOldScrollHeight != shutoffReqStatusListScroll.ExtentHeight)
  //     {
  //         IsEnabledView = true;

  //         if (shutoffReqStatusLineHeight + (shutoffReqStatusSBlockCnt + 1) * 25 >= shutoffReqStatusListScroll.VerticalOffset + shutoffReqStatusListScroll.ActualHeight)
  //         {
  //             if ((shutoffReqStatusSBlockCnt + 1) * 25 >= shutoffReqStatusListScroll.ActualHeight)
  //                 shutoffReqStatusListScroll.ScrollToVerticalOffset(shutoffReqStatusLineHeight);
  //             else
  //                 shutoffReqStatusListScroll.ScrollToVerticalOffset(shutoffReqStatusListScroll.VerticalOffset + (shutoffReqStatusLineHeight + (shutoffReqStatusSBlockCnt + 1) * 25 - (shutoffReqStatusListScroll.VerticalOffset + shutoffReqStatusListScroll.ActualHeight)));
  //         }

  //         if (shutoffReqStatusLineHeight < shutoffReqStatusListScroll.VerticalOffset)
  //             // 隠れている直近のLブロックを表示最上位行に設定する
  //             shutoffReqStatusListScroll.ScrollToVerticalOffset(shutoffReqStatusLineHeight);
  //     }

  //     if (!IsEnabledView)
  //     {
  //         shutoffReqStatusTimer.Interval = TimeSpan.FromMilliseconds(1);
  //         shutoffReqStatusTimer.Start();
  //     }
  // }

  // /// <summary>
  // /// タイマー開始
  // /// </summary>
  // private void shutoffReqStatusStart_Timer()
  // {
  //     // タイマー停止
  //     shutoffReqStatusTimer.Stop();
  //     IsEnabledView = false;
  //     shutoffReqStatusTimer_Tick(null, null);
  // }

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面 リスト更新
  // /// </summary>
  // /// <param name="forceFlg">強制再作成フラグ</param>
  // private void CreateFeelEqShutoffStatusList(bool forceFlg)
  // {
  //     if (feelEqShutoffStatusListCanvas == null || sblockValList == null) return;

  //     // 強制再作成フラグが立っている場合は一覧をクリアする
  //     if (forceFlg) feelEqShutoffStatusListCanvas.Children.Clear();

  //     // FindNameが効いているか判定する
  //     bool isFindName = IsFindNameEffective(feelEqShutoffStatusListCanvas);

  //     // 全ての行を一旦非表示にする
  //     foreach (var c in feelEqShutoffStatusListCanvas.Children)
  //         c.Visibility = Visibility.Collapsed;

  //     int firstCount = Pagenate.GetFirstCount();
  //     int lastCount = Pagenate.GetLastCount();
  //     double feelEqShutoffStatusListCanvasHeight = 0;
  //     if (firstCount != 0)
  //     {
  //         // 表示する行を作成する
  //         for (int i = 0; i < lastCount - firstCount + 1; i++)
  //         {
  //             int dataNum = i + (firstCount - 1);
  //             SBlockValModel sBlockVal = sblockValList[dataNum];

  //             // 差分チェック用表示データ取得
  //             string diffCheckData = GetFeelEqShutoffStatusListDiffCheckData(sBlockVal);

  //             Canvas c = SearchCanvas(feelEqShutoffStatusListCanvas, string.Format(FEEL_EQ_SHUTOFF_STATUS_CANVAS_KEY_STRING, sBlockVal.Key), isFindName);
  //             if (c == null || c.Tag as string != diffCheckData)
  //             {
  //                 if (c != null) feelEqShutoffStatusListCanvas.Children.Remove(c);

  //                 // 行作成
  //                 c = CommonUtil.MakeCanvas(
  //                     diffCheckData,
  //                     new List<SolidColorBrush>()
  //                     {
  //                         null,                                                                  // エリア
  //                         null,                                                                  // Sブロック番号
  //                         null,                                                                  // 総需要家件数
  //                         null,                                                                  // 供給継続需要家件数
  //                         null,                                                                  // 遮断設定
  //                         null,                                                                  // 感震遮断設定
  //                         null,                                                                  // 最大SI
  //                         FLG_BACKGROUND[CommonUtil.BoolToInteger(sBlockVal.IsGovStopRateOver)], // ガバナ停止率
  //                         null,                                                                  // ガバナ数
  //                         null,                                                                  // 停止
  //                         null,                                                                  // 継続
  //                         null                                                                   // 未確認
  //                     },
  //                     feelEqShutoffStatusPropertyList, i, 25);
  //                 c.Name = string.Format(FEEL_EQ_SHUTOFF_STATUS_CANVAS_KEY_STRING, sBlockVal.Key);
  //                 c.Tag = diffCheckData;

  //                 // テキストボックスのイベントを登録する
  //                 ((c.Children[(int)FeelEqShutoffStatusCanvasItem.SBlockName] as Border).Child as TextBlock).MouseLeftButtonDown += new MouseButtonEventHandler(SblockNameText_MouseLeftButtonDown);

  //                 feelEqShutoffStatusListCanvas.Children.Add(c);
  //             }

  //             c.SetValue(Canvas.TopProperty, i * c.Height);
  //             c.Visibility = Visibility.Visible;
  //             feelEqShutoffStatusListCanvasHeight = (i + 1) * c.Height;
  //         }
  //     }
  //     feelEqShutoffStatusListCanvas.Height = feelEqShutoffStatusListCanvasHeight;

  //     // 表示対象外の行を削除する
  //     for (int i = 0; i < feelEqShutoffStatusListCanvas.Children.Count; i++)
  //     {
  //         if (feelEqShutoffStatusListCanvas.Children[i].Visibility == Visibility.Collapsed)
  //         {
  //             feelEqShutoffStatusListCanvas.Children.RemoveAt(i);
  //             i--;
  //         }
  //         if (feelEqShutoffStatusListCanvas.Children.Count == 0)
  //             feelEqShutoffStatusListCanvas.Height = 0;
  //     }
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック)の差分チェック用表示データを取得する
  // /// </summary>
  // /// <param name="lv">表示対象のLブロック毎観測値Model</param>
  // /// <param name="isFirstDmgEstimationJudgeCompleted">1回目の被害推定計算が完了しているかどうか</param>
  // /// <returns>表示データ</returns>
  // private string GetShutoffLblockListDiffCheckData(LBlockValModel lv, bool isFirstDmgEstimationJudgeCompleted)
  // {
  //     string diffCheckData =
  //         // 遮断
  //         CommonUtil.BoolToInteger(lv.LBlock.IsChecked) + "#" +
  //         // ブロック番号
  //         lv.LBlock.Name + "#" +
  //         // 停止判断
  //         lv.LabelJudgeResult + "#" +
  //         // 依頼状況
  //         lv.LabelShutoffStatus + "#" +
  //         // 総需要家件数
  //         lv.LBlock.CustomerCnt.ToString("#,##0") + "#" +
  //         // 供給継続需要家件数
  //         lv.ContinueCustomerCnt.ToString("#,##0") + "#" +
  //         // エリア
  //         lv.LBlock.AllAreaName + "#" +
  //         // ブロック区分
  //         lv.LBlock.LabelBlockCategory + "#" +
  //         // 遮断設定
  //         lv.LBlock.ShutoffBorderSi + "#" +
  //         // Kブロック番号
  //         lv.LBlock.AllKBlockName + "#" +
  //         // 代表局最大SI
  //         lv.LabelRepresentMaxSi + "#" +
  //         // 最大SI
  //         lv.LabelMaxSi + "#" +
  //         // 平均SI
  //         lv.LabelAveSi + "#" +
  //         // 感震遮断設定
  //         lv.LBlock.LabelShutoffSi + "#" +
  //         // 30Kine超過率
  //         lv.LabelOver30KineRate + "#" +
  //         // 最大30Kine超過率
  //         lv.LabelMaxComAbleOver30KineRate + "#" +
  //         // 60Kine超過率
  //         lv.LabelOver60KineRate + "#" +
  //         // 最大60Kine超過率
  //         lv.LabelMaxComAbleOver60KineRate + "#" +
  //         // 70Kine超過率
  //         lv.LabelOver70KineRate + "#" +
  //         // 最大70Kine超過率
  //         lv.LabelMaxComAbleOver70KineRate + "#" +
  //         // 80Kine超過率
  //         lv.LabelOver80KineRate + "#" +
  //         // 最大80Kine超過率
  //         lv.LabelMaxComAbleOver80KineRate + "#" +
  //         // 90Kine超過率
  //         lv.LabelOver90KineRate + "#" +
  //         // 最大90Kine超過率
  //         lv.LabelMaxComAbleOver90KineRate + "#" +
  //         // ガバナ停止率
  //         lv.LabelGovernorStopRate + "#" +
  //         // 最低LP
  //         lv.LabelLpMinConnected + "$" + "(" + lv.LabelLpMin + ")" + "#" +
  //         // 平均LP
  //         lv.LabelLpAveConnected + "$" + "(" + lv.LabelLpAve + ")" + "#" +
  //         // 最低MP
  //         lv.LabelMpaMin + "/" + lv.LabelMpbMin + "#" +
  //         // 液状化警報率
  //         lv.LabelLqAlarmRate + "#" +
  //         // 平均PL
  //         (isFirstDmgEstimationJudgeCompleted ? lv.LabelAvePl : CommonUtil.GetNoData()) + "#" +
  //         // グラフ表示 ※ 存在しない
  //         "" + "#" +
  //         // ガバナ一覧
  //         "表示" + "#" +
  //         // 復旧状況
  //         lv.LabelRestorationWorkStatus + "#" +
  //         // 遠隔D復旧Sブロック
  //         lv.LabelExistRemoteOpenSBlock + "#" +
  //         // 停電率
  //         lv.LabelPowerFailureRate + "#" +
  //         // 火災件数
  //         lv.LabelFireCnt + "#" +
  //         // 漏えい受付
  //         lv.LabelLeakCnt + "#" +
  //         // 建物全半壊率
  //         (isFirstDmgEstimationJudgeCompleted ? lv.LabelComppartDstrRate : CommonUtil.GetNoData());

  //     return diffCheckData;
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック)の差分チェック用表示データを取得する(子Sブロック用)
  // /// </summary>
  // /// <param name="sv">表示対象のSブロック毎観測値Model</param>
  // /// <param name="isFirstDmgEstimationJudgeCompleted">1回目の被害推定計算が完了しているかどうか</param>
  // /// <returns>表示データ</returns>
  // public string GetShutoffLblockSblockListDiffCheckData(SBlockValModel sv, bool isFirstDmgEstimationJudgeCompleted)
  // {
  //     string diffCheckData =
  //         // 遮断 ※ 存在しない
  //         "" + "#" +
  //         // ブロック番号
  //         sv.SBlock.Name + "#" +
  //         // 停止判断  ※ 存在しない
  //         "" + "#" +
  //         // 依頼状況
  //         "" + "#" +
  //         // 総需要家件数
  //         sv.SBlock.CustomerCnt.ToString("#,##0") + "#" +
  //         // 供給継続需要家件数
  //         sv.ContinueCustomerCnt.ToString("#,##0") + "#" +
  //         // エリア
  //         sv.SBlock.AllAreaName + "#" +
  //         // ブロック区分 ※ 存在しない
  //         "" + "#" +
  //         // 遮断設定
  //         "" + "#" +
  //         // Kブロック番号
  //         "" + "#" +
  //         // 漏えい遭遇率
  //         sv.LabelLeakEncounterRate + "#" +
  //         // 本支管被害数(緊急)
  //         (isFirstDmgEstimationJudgeCompleted ? ((int)CommonUtil.ToRoundUp(sv.LabelLpSupplyDmgCnt * LpDmgCntConst.EMERGENCY_RATE)).ToString("#,##0") : CommonUtil.GetNoData()) + "#" +
  //         // 本支管被害数(総数)
  //         (isFirstDmgEstimationJudgeCompleted ? sv.LabelLpSupplyDmgCnt.ToString("#,##0") : CommonUtil.GetNoData()) + "#" +
  //         // 代表局最大SI※ 存在しない
  //         "" + "#" +
  //         // 最大SI
  //         sv.LabelMaxSi + "#" +
  //         // 平均SI
  //         sv.LabelAveSi + "#" +
  //         // 感震遮断設定
  //         sv.SBlock.LabelShutoffSi + "#" +
  //         // 30Kine超過率
  //         "" + "#" +
  //         // 最大30Kine超過率
  //         "" + "#" +
  //         // 60Kine超過率
  //         "" + "#" +
  //         // 最大60Kine超過率
  //         "" + "#" +
  //         // 70Kine超過率
  //         "" + "#" +
  //         // 最大70Kine超過率
  //         "" + "#" +
  //         // 80Kine超過率
  //         "" + "#" +
  //         // 最大80Kine超過率
  //         "" + "#" +
  //         // 90Kine超過率
  //         "" + "#" +
  //         // 最大90Kine超過率
  //         "" + "#" +
  //         // ガバナ停止率
  //         sv.LabelGovernorStopRate + "#" +
  //         // 最低LP
  //         sv.LabelLpMinConnected + "$" + "(" + sv.LabelLpMin + ")" + "#" +
  //         // 平均LP
  //         sv.LabelLpAveConnected + "$" + "(" + sv.LabelLpAve + ")" + "#" +
  //         // 最低MP
  //         sv.LabelMpaMin + "/" + sv.LabelMpbMin + "#" +
  //         // 液状化警報率
  //         sv.LabelLqAlarmRate + "#" +
  //         // 平均PL値 ※ 存在しない
  //         "" + "#" +
  //         // グラフ表示
  //         "表示" + "#" +
  //         // ガバナ一覧
  //         "表示" + "#" +
  //         // 復旧状況
  //         sv.LabelRestorationWorkStatus + "#" +
  //         // 遠隔D復旧Sブロック
  //         sv.LabelRemoteOpenCompleted + "#" +
  //         // 停電率
  //         sv.LabelPowerFailureRate + "#" +
  //         // 火災件数
  //         sv.LabelFireCnt2 + "#" +
  //         // 漏えい受付
  //         sv.LabelLeakCnt2 + "#" +
  //         // 建物全半壊率
  //         (isFirstDmgEstimationJudgeCompleted ? sv.LabelComppartDstrRate : CommonUtil.GetNoData());

  //     return diffCheckData;
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面の差分チェック用表示データを取得する
  // /// </summary>
  // /// <param name="lv">表示対象のLブロック毎観測値Model</param>
  // /// <returns>表示データ</returns>
  // public string GetShutoffReqStatusListDiffCheckData(LBlockValModel lv)
  // {
  //     string diffCheckData =
  //         // エリア
  //         lv.LBlock.AllAreaName + "#" +
  //         // ブロック番号
  //         lv.LBlock.Name + "#" +
  //         // 総需要家件数
  //         lv.LBlock.CustomerCnt.ToString("#,##0") + "#" +
  //         // 供給継続需要家件数
  //         lv.ContinueCustomerCnt.ToString("#,##0") + "#" +
  //         // ブロック区分
  //         lv.LBlock.LabelBlockCategory + "#" +
  //         // 遮断設定
  //         lv.LBlock.ShutoffBorderSi + "#" +
  //         // 最大SI
  //         lv.LabelMaxSi + "#" +
  //         // ガバナ停止率
  //         lv.LabelGovernorStopRate + "#" +
  //         // ガバナ数
  //         lv.GovCnt.ToString("#,##0") + "#" +
  //         // 停止
  //         lv.StopCnt.ToString("#,##0") + "#" +
  //         // 継続
  //         lv.ContinuanceCnt.ToString("#,##0") + "#" +
  //         // 未確認
  //         lv.UnconfirmedCnt.ToString("#,##0") + "#" +
  //         // 遠隔遮断実施状況
  //         lv.LabelShutoffStatus + "#" +
  //         // 対象数
  //         lv.ShutoffTargetCnt.ToString("#,##0") + "#" +
  //         // 成功数
  //         lv.ShutoffSuccessCnt.ToString("#,##0") + "#" +
  //         // 失敗数
  //         lv.ShutoffFailedCnt.ToString("#,##0") + "#" +
  //         // 依頼時刻
  //         lv.LabelShutoffRequestedAt + "#" +
  //         // 終了時刻
  //         lv.LabelShutoffEndedAt + "#" +
  //         // TC不可
  //         lv.ShutoffUnableCnt.ToString("#,##0") + "#" +
  //         // 遮断済数
  //         lv.ShutoffDoneCnt.ToString("#,##0");

  //     return diffCheckData;
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面の差分チェック用表示データを取得する(子Sブロック用)
  // /// </summary>
  // /// <param name="sv">表示対象のSブロック毎観測値Model</param>
  // /// <returns>表示データ</returns>
  // public string GetShutoffReqStatusSblockListDiffCheckData(SBlockValModel sv)
  // {
  //     string diffCheckData =
  //         // エリア
  //         sv.SBlock.AllAreaName + "#" +
  //         // ブロック番号
  //         sv.SBlock.Name + "#" +
  //         // 総需要家件数
  //         sv.SBlock.CustomerCnt.ToString("#,##0") + "#" +
  //         // 供給継続需要家件数
  //         sv.ContinueCustomerCnt.ToString("#,##0") + "#" +
  //         // ブロック区分 ※ 存在しない
  //         "" + "#" +
  //         // 遮断設定
  //         "" + "#" +
  //         // 感震遮断設定
  //         sv.SBlock.LabelShutoffSi + "#" +
  //         // 最大SI
  //         sv.LabelMaxSi + "#" +
  //         // ガバナ停止率
  //         sv.LabelGovernorStopRate + "#" +
  //         // ガバナ数
  //         sv.GovCnt.ToString("#,##0") + "#" +
  //         // 停止
  //         sv.StopCnt.ToString("#,##0") + "#" +
  //         // 継続
  //         sv.ContinuanceCnt.ToString("#,##0") + "#" +
  //         // 未確認
  //         sv.UnconfirmedCnt.ToString("#,##0") + "#" +
  //         // 遠隔遮断実施状況  ※ 存在しない
  //         "" + "#" +
  //         // 対象数  ※ 存在しない
  //         "" + "#" +
  //         // 成功数  ※ 存在しない
  //         "" + "#" +
  //         // 失敗数  ※ 存在しない
  //         "" + "#" +
  //         // 依頼時刻  ※ 存在しない
  //         "" + "#" +
  //         // 終了時刻  ※ 存在しない
  //         "" + "#" +
  //         // TC不可  ※ 存在しない
  //         "" + "#" +
  //         // 遮断済数  ※ 存在しない
  //         "";

  //     return diffCheckData;
  // }

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面の差分チェック用表示データを取得する
  // /// </summary>
  // /// <param name="sv">表示対象のSブロック毎観測値Model</param>
  // /// <returns>表示データ</returns>
  // public string GetFeelEqShutoffStatusListDiffCheckData(SBlockValModel sv)
  // {
  //     string diffCheckData =
  //         // エリア
  //         sv.SBlock.AllAreaName + "#" +
  //         // Sブロック番号
  //         sv.SBlock.Name + "#" +
  //         // 総需要家件数
  //         sv.SBlock.CustomerCnt.ToString("#,##0") + "#" +
  //         // 供給継続需要家件数
  //         sv.ContinueCustomerCnt.ToString("#,##0") + "#" +
  //         // 遮断設定
  //         sv.LBlockVal.LBlock.ShutoffBorderSi + "#" +
  //         // 感震遮断設定
  //         sv.SBlock.LabelShutoffSi + "#" +
  //         // 最大SI
  //         sv.LabelMaxSi + "#" +
  //         // ガバナ停止率
  //         sv.LabelGovernorStopRate + "#" +
  //         // ガバナ数
  //         sv.GovCnt.ToString("#,##0") + "#" +
  //         // 停止数
  //         sv.StopCnt.ToString("#,##0") + "#" +
  //         // 継続数
  //         sv.ContinuanceCnt.ToString("#,##0") + "#" +
  //         // 未確認数
  //         sv.UnconfirmedCnt.ToString("#,##0");

  //     return diffCheckData;
  // }

  // /// <summary>
  // /// 階層Sブロックにインデントをつけたためにその下のLブロック行の上枠線がないように見えるので線を引く
  // /// </summary>
  // /// <param name="layerSblockSp">階層Sブロックのスタックパネル</param>
  // private void DrawIndentUnderLine(StackPanel parentLblockSp, StackPanel layerSblockSp, int indentItem)
  // {
  //     if (parentLblockSp.Children.Count() == 0 || layerSblockSp == null || layerSblockSp.Children.Count() == 0) return;

  //     Canvas c = layerSblockSp.Children[layerSblockSp.Children.Count() - 1] as Canvas;
  //     Border b = c.Children[indentItem] as Border;
  //     if (b.BorderBrush == null)
  //         b.BorderBrush = new SolidColorBrush(SupColors.ListBorderColor);

  //     if (parentLblockSp.Children[parentLblockSp.Children.Count() - 1] != layerSblockSp)
  //         b.BorderThickness = new Thickness(0, 0, 0, 1);
  //     else
  //         b.BorderThickness = new Thickness(0, 0, 0, 0);
  // }

  // /// <summary>
  // /// 階層表示アニメーションを返す
  // /// </summary>
  // /// <param name="targetName">表示対象名</param>
  // /// <param name="layerCnt">階層行数</param>
  // /// <returns>階層表示アニメーション</returns>
  // private DoubleAnimation GetLayerAnimation(string targetName, int layerCnt)
  // {
  //     // アニメーションの再生時間の設定
  //     int msec = layerCnt * LAYER_SBLOCK_SHOW_SEC > LAYER_SBLOCK_SHOW_SEC_LIMIT ? LAYER_SBLOCK_SHOW_SEC_LIMIT : layerCnt * LAYER_SBLOCK_SHOW_SEC;
  //     TimeSpan timeSpan = new TimeSpan(0, 0, 0, 0, msec);

  //     DoubleAnimation da = new DoubleAnimation();
  //     da.From = 0;
  //     da.To = layerCnt * 25;
  //     da.Duration = new Duration(timeSpan);
  //     da.SetValue(Storyboard.TargetNameProperty, targetName);
  //     da.SetValue(Storyboard.TargetPropertyProperty, new PropertyPath("Height"));
  //     da.AutoReverse = false;

  //     return da;
  // }

  // /// <summary>
  // /// 全選択チェックボックスのチェックを外す
  // /// </summary>
  // public void UncheckAllShutoff()
  // {
  //     // Lブロック
  //     allShutoffLblockCheck.Checked -= new RoutedEventHandler(AllShutoffLblockCheck_CheckUnchecked);
  //     allShutoffLblockCheck.Unchecked -= new RoutedEventHandler(AllShutoffLblockCheck_CheckUnchecked);
  //     allShutoffLblockCheck.IsChecked = false;
  //     allShutoffLblockCheck.Checked += new RoutedEventHandler(AllShutoffLblockCheck_CheckUnchecked);
  //     allShutoffLblockCheck.Unchecked += new RoutedEventHandler(AllShutoffLblockCheck_CheckUnchecked);
  // }

  // /// <summary>
  // /// 受け取ったLブロックIDの行の遮断チェックを外す
  // /// </summary>
  // /// <param name="lblockId">LブロックID</param>
  // public void UncheckShutoff(int lblockId)
  // {
  //     //List<LBlockValModel> blinkLv = new List<LBlockValModel>();
  //     LBlockValModel lv = ModelManager.Get<LBlockValModel>(lblockId);
  //     if (lv != null && lv.LBlock != null)
  //     {
  //         lv.LBlock.IsChecked = false;
  //         if (UncheckShutoffLblockId(lblockId))
  //         {
  //             //controller.BlinkLBlockChildren(lv.LBlock.Name, false);
  //             controller.FillRemoteOperateLBlockChildren(lv.LBlock.Name, false);
  //             shutoffRowHighlight(lv);
  //         }
  //     }
  // }

  // /// <summary>
  // /// 受け取ったLブロックIDの行のチェックボックスのチェックを外す。また、外したかどうかを返す。
  // /// </summary>
  // /// <param name="lblockId">LブロックID</param>
  // /// <returns>チェックを外したかどうか</returns>
  // private bool UncheckShutoffLblockId(int lblockId)
  // {
  //     Canvas c = shutoffLblockListCanvas.FindName(string.Format(SHUTOFF_LBLOCK_CANVAS_KEY_STRING, lblockId)) as Canvas;
  //     if (c == null) return false;

  //     LBlockValModel lv = ModelManager.Get<LBlockValModel>(lblockId);

  //     // まとめて処理するためにイベントをOFFにするが、どちらにしても画面が表示されていないとイベントが発生しないので、イベントまかせにしないこと
  //     ((c.Children[(int)ShutoffLblockCanvasItem.ShutoffChecked] as Border).Child as CheckBox).Checked -= ShutoffCheck_CheckUnchecked;
  //     ((c.Children[(int)ShutoffLblockCanvasItem.ShutoffChecked] as Border).Child as CheckBox).Unchecked -= ShutoffCheck_CheckUnchecked;
  //     ((c.Children[(int)ShutoffLblockCanvasItem.ShutoffChecked] as Border).Child as CheckBox).IsChecked = false;
  //     ((c.Children[(int)ShutoffLblockCanvasItem.ShutoffChecked] as Border).Child as CheckBox).Checked += ShutoffCheck_CheckUnchecked;
  //     ((c.Children[(int)ShutoffLblockCanvasItem.ShutoffChecked] as Border).Child as CheckBox).Unchecked += ShutoffCheck_CheckUnchecked;

  //     lv.LBlock.IsChecked = false;
  //     controller.FillRemoteOperateLBlockChildren(lv.LBlock.Name, false);
  //     shutoffRowHighlight(lv);

  //     return true;
  // }

  // /// <summary>
  // /// 需要家件数セット(停止/選択/合計)
  // /// </summary>
  // private void SetCustomerCount()
  // {
  //     // 供給停止件数/選択ブロック需要家件数(Sブロック観測値がロードされていれば毎回設定する)
  //     // ※件数の集計は画面への行表示に関わらず行う必要があるため、表示対象を絞り込む前に行う
  //     if (ModelManager.IsLoaded<LBlockValModel>() && ModelManager.IsLoaded<SBlockValModel>())
  //     {
  //         List<SBlockValModel> svList = ModelManager.GetList<SBlockValModel>(o => o.SBlock != null && o.LBlockVal != null && o.LBlockVal.LBlock != null);
  //         List<SBlockValModel> stopSvList = svList.Where(o => o.IsStopped).ToList();
  //         List<SBlockValModel> continueSvList = svList.Where(o => !o.IsStopped).ToList();

  //         int selectCount = 0;
  //         foreach (LBlockValModel checkLv in ModelManager.GetList<LBlockValModel>(o => o.LBlock != null && o.LBlock.IsChecked))
  //         {
  //             List<SBlockValModel> checkLvChildren;
  //             checkLvChildren = continueSvList.Where(o => o.LBlockId == checkLv.LBlockId).ToList();

  //             foreach (SBlockValModel checkLvChild in checkLvChildren)
  //                 selectCount += checkLvChild.SBlock.CustomerCnt;
  //         }
  //         StopCountText.Text = stopSvList.Sum(o => o.SBlock.CustomerCnt).ToString("###,###,###,##0") + " 件";
  //         SelectCountText.Text = selectCount.ToString("###,###,###,##0") + " 件";
  //         TotalCountText.Text = (int.Parse(StopCountText.Text.Split(' ')[0].Replace(",", "")) + int.Parse(SelectCountText.Text.Split(' ')[0].Replace(",", ""))).ToString("###,###,###,##0") + " 件";
  //     }
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック)の道路上の被害推定(継続地区累計、合計)の埋め込み
  // /// </summary>
  // private void SetLblockLpSupplyDmgCnt()
  // {
  //     if (!ModelManager.IsLoaded<LBlockValModel>() || !ModelManager.IsLoaded<SBlockValModel>()) return;

  //     // 被害推定が完了しているかどうか
  //     bool isFirstDmgEstimationJudgeCompleted = controller.IsFirstDmgEstimationJudgeCompleted();

  //     // 道路上の被害推定の累計(供給停止していない、かつ自身がチェックしていないSブロックの被害数)
  //     int SumLpSupplyDmgCnt = 0;
  //     int SumLpSupplyDmgCntEmergency = 0;
  //     int SumLpSupplyDmgCnt2 = 0;
  //     int SumLpSupplyDmgCntEmergency2 = 0;
  //     if (isFirstDmgEstimationJudgeCompleted)
  //     {
  //         SumLpSupplyDmgCntEmergency = GetSumLpSupplyDmgCnt(true);
  //         SumLpSupplyDmgCnt = GetSumLpSupplyDmgCnt(false);
  //     }
  //     // FindNameが効いているか判定する
  //     bool isFindName = IsFindNameEffective(shutoffLblockListCanvas);

  //     // 道路上の被害推定(継続地区累計、合計)の埋め込み
  //     foreach (LBlockValModel lv in lblockValList)
  //     {
  //         int LpSupplyDmgCnt = 0;
  //         int LpSupplyDmgCntEmergency = 0;
  //         int LpSupplyDmgCnt2 = 0;
  //         int LpSupplyDmgCntEmergency2 = 0;
  //         if (!isFirstDmgEstimationJudgeCompleted)
  //         {
  //             // 被害推定結果がない場合
  //             lv.LabelLpSupplyDmgCnt = lv.SumLpSupplyDmgCnt = LpSupplyDmgCnt = LpSupplyDmgCntEmergency = -1;
  //         }
  //         else
  //         {
  //             foreach (SBlockValModel sv in ModelManager.GetList<SBlockValModel>(o => o.LBlockId == lv.LBlockId && !o.IsStopped && !o.SBlock.IsChecked))
  //             {
  //                 LpSupplyDmgCnt2 += sv.RoadTubeTotalDmgCnt;
  //                 LpSupplyDmgCntEmergency2 += (int)CommonUtil.ToRoundUp(sv.RoadTubeTotalDmgCnt * LpDmgCntConst.EMERGENCY_RATE);
  //                 // Lがチェックされている場合、そのLブロックのL遮断依頼で停止するSブロックは被害推定の累計には含めない
  //                 // -> 本支管被害数でソートしている状態で遮断チェックを入れると、当該ブロックの並びが変更されて操作に支障が出る為、
  //                 //    継続地区合計、累計値は通常通り表示する
  //                 if (lv.LBlock.IsChecked)
  //                 {
  //                     continue;
  //                 }
  //                 LpSupplyDmgCnt += sv.RoadTubeTotalDmgCnt;
  //                 LpSupplyDmgCntEmergency += (int)CommonUtil.ToRoundUp(sv.RoadTubeTotalDmgCnt * LpDmgCntConst.EMERGENCY_RATE);
  //             }
  //             lv.LabelLpSupplyDmgCnt = LpSupplyDmgCnt;
  //             lv.LabelLpSupplyDmgCntEmergency = LpSupplyDmgCntEmergency;
  //             lv.SumLpSupplyDmgCnt = SumLpSupplyDmgCnt;
  //             SumLpSupplyDmgCnt -= LpSupplyDmgCnt;
  //             lv.SumLpSupplyDmgCntEmergency = SumLpSupplyDmgCntEmergency;
  //             SumLpSupplyDmgCntEmergency -= LpSupplyDmgCntEmergency;
  //             lv.SumLpSupplyDmgCntCommon = lv.SumLpSupplyDmgCnt - lv.SumLpSupplyDmgCntEmergency;
  //             lv.LabelLpSupplyDmgCntCommon = lv.LabelLpSupplyDmgCnt - lv.LabelLpSupplyDmgCntEmergency;

  //             // 遮断チェック時は本支管被害数は0とはせず保持するが、累計値は左記値を減算したものを表示
  //             lv.LabelLpSupplyDmgCnt2 = LpSupplyDmgCnt2;
  //             lv.LabelLpSupplyDmgCntEmergency2 = LpSupplyDmgCntEmergency2;

  //             SumLpSupplyDmgCnt2 -= LpSupplyDmgCnt2;
  //             lv.SumLpSupplyDmgCntEmergency2 = SumLpSupplyDmgCntEmergency2;
  //             SumLpSupplyDmgCntEmergency2 -= LpSupplyDmgCntEmergency2;
  //             lv.SumLpSupplyDmgCntCommon2 = lv.SumLpSupplyDmgCnt - lv.SumLpSupplyDmgCntEmergency2;
  //             lv.LabelLpSupplyDmgCntCommon2 = lv.LabelLpSupplyDmgCnt2 - lv.LabelLpSupplyDmgCntEmergency2;
  //         }

  //         Canvas c = SearchCanvas(shutoffLblockListCanvas, string.Format(SHUTOFF_LBLOCK_CANVAS_KEY_STRING, lv.Key), isFindName);
  //         if (c == null) continue;
  //         Border b1 = c.Children[(int)ShutoffLblockCanvasItem.LpSupplyDmgCnt] as Border;
  //         if (b1 == null) continue;
  //         TextBlock tb1 = b1.Child as TextBlock;
  //         if (tb1 == null) continue;

  //         Border b2 = c.Children[(int)ShutoffLblockCanvasItem.LpSupplyDmgCntEmergency] as Border;
  //         if (b2 == null) continue;
  //         TextBlock tb2 = b2.Child as TextBlock;
  //         if (tb2 == null) continue;

  //         if (lv.LBlock.IsChecked)
  //         {
  //             if (LpSupplyDmgCnt2 == -1)
  //                 tb1.Text = tb2.Text = CommonUtil.GetNoData() + " (" + CommonUtil.GetNoData() + ")";
  //             else
  //             {
  //                 tb1.Text = lv.LabelLpSupplyDmgCnt2.ToString("#,##0") + " (" + CommonUtil.GetNoData() + ")";
  //                 tb2.Text = lv.LabelLpSupplyDmgCntEmergency2.ToString("#,##0") + " (" + CommonUtil.GetNoData() + ")";
  //             }
  //             lv.LabelLpSupplyDmgCnt = lv.LabelLpSupplyDmgCnt2;
  //             lv.LabelLpSupplyDmgCntEmergency = lv.LabelLpSupplyDmgCntEmergency2;
  //             b1.Background = b2.Background = new SolidColorBrush(SupColors.REMOTE_OPERATE_CHECK_BORDER_COLOR);
  //         }
  //         else
  //         {
  //             if (LpSupplyDmgCnt == -1)
  //                 tb1.Text = tb2.Text = CommonUtil.GetNoData() + " (" + CommonUtil.GetNoData() + ")";
  //             else
  //             {
  //                 tb1.Text = lv.LabelLpSupplyDmgCnt.ToString("#,##0") + " (" + lv.SumLpSupplyDmgCnt.ToString("#,##0") + ")";
  //                 tb2.Text = lv.LabelLpSupplyDmgCntEmergency.ToString("#,##0") + " (" + lv.SumLpSupplyDmgCntEmergency.ToString("#,##0") + ")";
  //             }

  //             b1.Background = null;

  //             if (lv.IsOverLpDmgCntEmergency2)
  //                 b2.Background = OVER_LP_DMG_CNT2_BORDER_COLOR;
  //             else if (lv.IsOverLpDmgCntEmergency1)
  //                 b2.Background = OVER_LP_DMG_CNT1_BORDER_COLOR;
  //             else
  //                 b2.Background = null;
  //         }

  //         // 漏えい遭遇率を計算する
  //         if (lv.ContinueCustomerCnt > 0)
  //             lv.LeakEncounterRate = (double)lv.LabelLpSupplyDmgCntEmergency / (double)lv.ContinueCustomerCnt * 10000;
  //         else
  //             lv.LeakEncounterRate = 0;

  //         Border b3 = c.Children[(int)ShutoffLblockCanvasItem.LeakEncounterRate] as Border;
  //         if (b3 == null) continue;
  //         b3.Background = new SolidColorBrush(SupColors.LightPink);
  //         TextBlock tb3 = b3.Child as TextBlock;
  //         if (tb3 == null) continue;
  //         tb3.Text = (LpSupplyDmgCnt == -1) ? CommonUtil.GetNoData() : lv.LabelLeakEncounterRate;

  //         //// チェックしているものは線の色を変える
  //         //if (lv.LBlock.IsChecked)
  //         //{
  //         //    b.BorderThickness = SHUTOFF_CHECK_BORDER_THICKNESS;
  //         //    b.BorderBrush = SHUTOFF_CHECK_BORDER_COLOR;
  //         //}
  //         //else
  //         //{
  //         //    b.BorderThickness = new Thickness(1, 0, 0, 1);
  //         //    b.BorderBrush = new SolidColorBrush(SupColors.ListBorderColor);
  //         //}

  //         // ハイライト中に、D復旧可能となったことを知らせるポップアップが表示された場合、
  //         // 画面再描画によりハイライトが解除されてしまうので、ここで再設定
  //         shutoffRowHighlight(lv);
  //     }
  // }

  // /// <summary>
  // /// 道路上の被害推定の累計(供給停止していない、かつ自身がチェックしていないSブロックの被害数)を返す
  // /// </summary>
  // /// <returns>道路上の被害推定の累計(供給停止していない、かつ自身がチェックしていないSブロックの被害数)</returns>
  // /// <param name="isEmergency">緊急であるか</param>
  // /// <returns></returns>
  // public int GetSumLpSupplyDmgCnt(bool isEmergency)
  // {
  //     double Rate = (isEmergency) ? LpDmgCntConst.EMERGENCY_RATE : 1.00;

  //     // 道路上の被害推定の累計(供給停止していない、かつ自身がチェックしていないSブロックの被害数)
  //     int SumLpSupplyDmgCnt = 0;
  //     List<SBlockValModel> svs = ModelManager.GetList<SBlockValModel>(o => o.SBlock != null && o.LBlockVal != null && o.LBlockVal.LBlock != null
  //         && !o.IsStopped && !o.SBlock.IsChecked);
  //     foreach (SBlockValModel sv in svs)
  //     {
  //         // 親のLがチェックされている場合、L遮断依頼で停止するSブロックは被害推定の累計には含めない
  //         if (sv.LBlockVal.LBlock.IsChecked)
  //         {
  //             continue;
  //         }
  //         SumLpSupplyDmgCnt += (int)CommonUtil.ToRoundUp(sv.RoadTubeTotalDmgCnt * Rate);
  //     }

  //     return SumLpSupplyDmgCnt;
  // }

  /// <summary>
  /// Lブロックリストの設定
  /// </summary>
  // const SetLblockValList = () => {
  // const fcList = patternFilterCondDic.get(nowPattern)
  // let lblockValList = GetLblockValList(fcList!)
  // setLblockValList(lblockValList)
  // // ページネート再描画処理
  // Pagenate.RedrawPagenate(lblockValList.Count)
  // // 絞り込み条件テキストの設定
  // SetFilterConditionPartsText()
  // // ソート条件テキストの設定
  // SetSortConditionPartsText()
  // }

  /// <summary>
  /// 絞り込んだLブロックリストを返す
  /// </summary>
  /// <param name="fcList">絞り込み条件のリスト</param>
  /// <returns>絞り込んだLブロックリスト</returns>
  // const GetLblockValList = (fcList: FilterManager.FilterCondition[]) => {
  // let newLblockValList = [...lblockValList]
  // newLblockValList = newLblockValList.filter((o) => {
  //   const LBlock = o.getLBlock(lBlockList)
  //   return LBlock != null && o.getKBlockNo(LBlock) < 90
  // })
  // // if (USE_SHUTOFF_LBLOCK_LIST_PATTERN.Contains(nowPattern))
  // newLblockValList = ShutoffLblock_FilteringLblockValList(newLblockValList, fcList)
  // // else if (nowPattern == (int)ShutoffBlockPattern.ShutoffReqSt)
  // // newLblockValList = ShutoffReqStatus_FilteringLblockValList(lblockValList, fcList)
  // return newLblockValList
  // }
  //
  /// <summary>
  /// 遠隔遮断実施画面(Lブロック)の項目でLブロックリストを絞込んで返す
  /// </summary>
  /// <param name="lblockValList">Lブロックリスト</param>
  /// <param name="fcList">絞り込み条件のリスト</param>
  /// <returns>絞り込み後のLブロックリスト</returns>
  // const ShutoffLblock_FilteringLblockValList = (
  //   lblockValList: LBlockValModel[],
  //   fcList: FilterManager.FilterCondition[]
  // ) => {
  //   nowPattern = 2
  //   if (nowPattern === (ShutoffBlockPattern.FirstL as number))
  //     lblockValList = lblockValList.filter((o) => o.isShutoffFirstTarget)
  //   else if (nowPattern === (ShutoffBlockPattern.SecondL as number))
  //     lblockValList = lblockValList.filter((o) => !o.isShutoffFirstTarget)
  // else if (nowPattern == (int)ShutoffBlockPattern.TsunamiL)
  //     lblockValList = lblockValList.Where(o => o.LBlock.IsTsunami == true).ToList();
  // else if (nowPattern == (int)ShutoffBlockPattern.MpStopL)
  //     lblockValList = lblockValList.Where(o => o.isMpStopKBlock == true).ToList();

  // // 被害推定が完了しているかどうか
  // bool isFirstDmgEstimationJudgeCompleted = controller.IsFirstDmgEstimationJudgeCompleted();

  // foreach (FilterManager.FilterCondition fc in fcList)
  // {
  //     switch (fc.FilterTag)
  //     {
  //         case (int)ShutoffLblockTag.ShutoffCheked: // 遮断
  //             lblockValList = lblockValList.Where(o => o.LBlock.IsChecked == bool.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.RequestStatus: // 依頼状況
  //             lblockValList = lblockValList.Where(o => o.LabelShutoffStatus == fc.Value).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.JudgeResult: // 停止判断
  //             lblockValList = lblockValList.Where(o => o.LabelJudgeResult == fc.Value).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.RestorationWorkStatus: // 復旧状況
  //             lblockValList = lblockValList.Where(o => o.LabelRestorationWorkStatus == fc.Value).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.AreaName: // エリア
  //             lblockValList = lblockValList.Where(o => o.LBlock.AllAreaNameList.Contains(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.BlockName: // ブロック番号
  //             List<KDashBlockModel> kdList = ModelManager.GetList<KDashBlockModel>(o => o.LabelKDashNo == fc.Value);
  //             if (kdList.Count() > 0)
  //             {
  //                 KDashBlockModel kd = kdList.First();
  //                 int k = kd.KBlockNo;
  //                 List<int> lList = kd.LBlocks.Select(o => o.LBlockNo).ToList();
  //                 lblockValList = lblockValList.Where(o => o.KBlockNo == k && lList.Contains(o.LBlockNo)).ToList();
  //             }
  //             break;
  //         case (int)ShutoffLblockTag.KBlockName: // Kブロック番号
  //             lblockValList = lblockValList.Where(o => o.LBlock.AllKBlockNameList.Contains(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.BlockCategory: // ブロック区分
  //             lblockValList = lblockValList.Where(o => o.LBlock.BlockCategoryList.Contains(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.ShutoffBorderSi: // 遮断設定
  //             lblockValList = lblockValList.Where(o => o.LBlock.ShutoffBorderSiList.Contains(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.RemoteOpenSBlock: // 遠隔D復旧Sブロック
  //             lblockValList = lblockValList.Where(o => o.ExistRemoteOpenSBlock == (fc.Value == "有")).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.PlAve: // 平均PL
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => isFirstDmgEstimationJudgeCompleted && CommonUtil.IsNumeric(o.LabelAvePl)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelAvePl) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelAvePl) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelAvePl) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.ShutoffSi: // 感震遮断設定
  //             lblockValList = lblockValList.Where(o => o.LBlock.ShutoffSiList.Contains(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.RepresentMaxSi: // 代表局最大SI
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelRepresentMaxSi)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelRepresentMaxSi) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelRepresentMaxSi) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelRepresentMaxSi) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.MaxSi: // 最大SI
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelMaxSi)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxSi) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxSi) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxSi) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.AveSi: // 平均SI
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelAveSi)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelAveSi) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelAveSi) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelAveSi) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.Over30KineRate: // 30Kine超過率
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelOver30KineRate)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelOver30KineRate) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelOver30KineRate) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelOver30KineRate) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.Over60KineRate: // 60Kine超過率
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelOver60KineRate)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelOver60KineRate) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelOver60KineRate) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelOver60KineRate) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.Over70KineRate: // 70Kine超過率
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelOver70KineRate)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelOver70KineRate) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelOver70KineRate) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelOver70KineRate) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.Over80KineRate: // 80Kine超過率
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelOver80KineRate)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelOver80KineRate) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelOver80KineRate) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelOver80KineRate) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.Over90KineRate: // 90Kine超過率
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelOver90KineRate)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelOver90KineRate) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelOver90KineRate) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelOver90KineRate) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.MaxComAbleOver30KineRate: // 最大30Kine超過率
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelMaxComAbleOver30KineRate)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxComAbleOver30KineRate) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxComAbleOver30KineRate) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxComAbleOver30KineRate) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.MaxComAbleOver60KineRate: // 最大60Kine超過率
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelMaxComAbleOver60KineRate)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxComAbleOver60KineRate) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxComAbleOver60KineRate) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxComAbleOver60KineRate) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.MaxComAbleOver70KineRate: // 最大70Kine超過率
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelMaxComAbleOver70KineRate)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxComAbleOver70KineRate) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxComAbleOver70KineRate) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxComAbleOver70KineRate) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.MaxComAbleOver80KineRate: // 最大80Kine超過率
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelMaxComAbleOver80KineRate)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxComAbleOver80KineRate) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxComAbleOver80KineRate) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxComAbleOver80KineRate) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.MaxComAbleOver90KineRate: // 最大90Kine超過率
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelMaxComAbleOver90KineRate)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxComAbleOver90KineRate) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxComAbleOver90KineRate) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxComAbleOver90KineRate) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.CustomerCnt:  // 総需要家件数
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => o.LBlock.CustomerCnt == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => o.LBlock.CustomerCnt >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => o.LBlock.CustomerCnt <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.ContinueCustomerCnt:  // 供給継続総需要家件数
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => o.ContinueCustomerCnt == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => o.ContinueCustomerCnt >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => o.ContinueCustomerCnt <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.GovernorStopRate: // ガバナ停止率
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelGovernorStopRate) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelGovernorStopRate) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelGovernorStopRate) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.LpMinConnected: // 最低LP(単独除く)
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelLpMinConnected)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelLpMinConnected) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelLpMinConnected) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelLpMinConnected) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.LpMin: // 最低LP(単独含む)
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelLpMin)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelLpMin) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelLpMin) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelLpMin) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.MpaMin: // 最低MPA
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelMpaMin)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMpaMin) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMpaMin) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMpaMin) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.MpbMin: // 最低MPB
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelMpbMin)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMpbMin) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMpbMin) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMpbMin) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.LeakEncounterRate: // 漏えい遭遇率
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => isFirstDmgEstimationJudgeCompleted).ToList();
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelLeakEncounterRate)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => o.LeakEncounterRate == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => o.LeakEncounterRate >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => o.LeakEncounterRate <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.LpSupplyDmgCntEmergency: // 本支管被害数(緊急)
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => isFirstDmgEstimationJudgeCompleted).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => o.LabelLpSupplyDmgCntEmergency == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => o.LabelLpSupplyDmgCntEmergency >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => o.LabelLpSupplyDmgCntEmergency <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.LpSupplyDmgCnt: // 本支管被害数(総数)
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => isFirstDmgEstimationJudgeCompleted).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => o.LabelLpSupplyDmgCnt == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => o.LabelLpSupplyDmgCnt >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => o.LabelLpSupplyDmgCnt <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.LpAveConnected: // 平均LP(単独除く)
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelLpAveConnected)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelLpAveConnected) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelLpAveConnected) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelLpAveConnected) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.LpAve: // 平均LP(単独含む)
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelLpAve)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelLpAve) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelLpAve) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelLpAve) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.LqAlarmRate: // 液状化警報率
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelLqAlarmRate) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelLqAlarmRate) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelLqAlarmRate) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.ComppartDstrRate: // 建物全半壊率
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => isFirstDmgEstimationJudgeCompleted && CommonUtil.IsNumeric(o.LabelComppartDstrRate)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelComppartDstrRate) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelComppartDstrRate) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelComppartDstrRate) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.FireCnt: // 火災件数
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => o.FireCnt == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => o.FireCnt >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => o.FireCnt <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffLblockTag.LeakCnt: // 漏えい受付
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => o.LeakCnt == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => o.LeakCnt >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => o.LeakCnt <= double.Parse(fc.Value)).ToList();
  //             break;
  //     }
  // }
  //
  //   return lblockValList
  // }

  /// <summary>
  /// 遠隔遮断依頼状況確認画面の項目でLブロックリストを絞込んで返す
  /// </summary>
  /// <param name="lblockValList">Lブロックリスト</param>
  /// <param name="fcList">絞り込み条件のリスト</param>
  /// <returns>絞り込み後のLブロックリスト</returns>
  // const ShutoffReqStatus_FilteringLblockValList = (
  //   lblockValList: LBlockValModel[],
  //   fcList: FilterManager.FilterCondition[]
  // ) => {
  //   lblockValList = lblockValList.filter((o) => o.ShutoffStatus !== ShutoffState.None)

  // foreach (FilterManager.FilterCondition fc in fcList)
  // {
  //     switch (fc.FilterTag)
  //     {
  //         case (int)ShutoffReqStatusTag.AreaName: // エリア
  //             lblockValList = lblockValList.Where(o => o.LBlock.AllAreaNameList.Contains(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffReqStatusTag.BlockName: // ブロック番号
  //             List<KDashBlockModel> kdList = ModelManager.GetList<KDashBlockModel>(o => o.LabelKDashNo == fc.Value);
  //             if (kdList.Count() > 0)
  //             {
  //                 KDashBlockModel kd = kdList.First();
  //                 int k = kd.KBlockNo;
  //                 List<int> lList = kd.LBlocks.Select(o => o.LBlockNo).ToList();
  //                 lblockValList = lblockValList.Where(o => o.KBlockNo == k && lList.Contains(o.LBlockNo)).ToList();
  //             }
  //             break;
  //         case (int)ShutoffReqStatusTag.BlockCategory: // ブロック区分
  //             lblockValList = lblockValList.Where(o => o.LBlock.BlockCategoryList.Contains(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffBorderSi: // 遮断設定
  //             lblockValList = lblockValList.Where(o => o.LBlock.ShutoffBorderSiList.Contains(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffReqStatusTag.MaxSi: // 最大SI
  //             // 表示が数値以外のものは除外する
  //             lblockValList = lblockValList.Where(o => CommonUtil.IsNumeric(o.LabelMaxSi)).ToList();
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxSi) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxSi) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelMaxSi) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffReqStatusTag.CustomerCnt: // 総需要家件数
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => o.LBlock.CustomerCnt == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => o.LBlock.CustomerCnt >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => o.LBlock.CustomerCnt <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffReqStatusTag.ContinueCustomerCnt: // 供給継続需要家件数
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => o.ContinueCustomerCnt == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => o.ContinueCustomerCnt >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => o.ContinueCustomerCnt <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffReqStatusTag.GovernorStopRate: // ガバナ停止率
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelGovernorStopRate) == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelGovernorStopRate) >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => double.Parse(o.LabelGovernorStopRate) <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffReqStatusTag.GovCnt: // ガバナ数
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => o.GovCnt == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => o.GovCnt >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => o.GovCnt <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffReqStatusTag.StopCnt: // 停止数
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => o.StopCnt == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => o.StopCnt >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => o.StopCnt <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffReqStatusTag.ContinuanceCnt: // 継続数
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => o.ContinuanceCnt == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => o.ContinuanceCnt >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => o.ContinuanceCnt <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffReqStatusTag.UnconfirmedCnt: // 未確認数
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => o.UnconfirmedCnt == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => o.UnconfirmedCnt >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => o.UnconfirmedCnt <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffStatus: // 遠隔遮断実施状況
  //             lblockValList = lblockValList.Where(o => o.LabelShutoffStatus == fc.Value).ToList();
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffTargetCnt: // 対象数
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => o.ShutoffTargetCnt == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => o.ShutoffTargetCnt >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => o.ShutoffTargetCnt <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffSuccessCnt: // 成功数
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => o.ShutoffSuccessCnt == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => o.ShutoffSuccessCnt >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => o.ShutoffSuccessCnt <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffFailedCnt: // 失敗数
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => o.ShutoffFailedCnt == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => o.ShutoffFailedCnt >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => o.ShutoffFailedCnt <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffRequestedAt: // 依頼時刻
  //             List<DateTime> shutoffRequestedAtFilterDateTime = FilterManager.GetFilterDateTimeList(fc);
  //             if (shutoffRequestedAtFilterDateTime.Count != 0)
  //             {
  //                 if (fc.ValueType == FilterConst.ValueType.Equal)
  //                     lblockValList = lblockValList.Where(o => o.ShutoffRequestedAt >= shutoffRequestedAtFilterDateTime[0] && o.ShutoffRequestedAt < shutoffRequestedAtFilterDateTime[1]).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                     lblockValList = lblockValList.Where(o => o.ShutoffRequestedAt >= shutoffRequestedAtFilterDateTime[0]).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                     lblockValList = lblockValList.Where(o => o.ShutoffRequestedAt < shutoffRequestedAtFilterDateTime[1]).ToList();
  //             }
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffEndedAt: // 終了時刻
  //             List<DateTime> shutoffEndedAtFilterDateTime = FilterManager.GetFilterDateTimeList(fc);
  //             if (shutoffEndedAtFilterDateTime.Count != 0)
  //             {
  //                 if (fc.ValueType == FilterConst.ValueType.Equal)
  //                     lblockValList = lblockValList.Where(o => o.ShutoffEndedAt >= shutoffEndedAtFilterDateTime[0] && o.ShutoffEndedAt < shutoffEndedAtFilterDateTime[1]).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                     lblockValList = lblockValList.Where(o => o.ShutoffEndedAt >= shutoffEndedAtFilterDateTime[0]).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                     lblockValList = lblockValList.Where(o => o.ShutoffEndedAt < shutoffEndedAtFilterDateTime[1]).ToList();
  //             }
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffUnableCnt: // TC不可
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => o.ShutoffUnableCnt == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => o.ShutoffUnableCnt >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => o.ShutoffUnableCnt <= double.Parse(fc.Value)).ToList();
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffDoneCnt: // 遮断済数
  //             if (fc.ValueType == FilterConst.ValueType.Equal)
  //                 lblockValList = lblockValList.Where(o => o.ShutoffDoneCnt == double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                 lblockValList = lblockValList.Where(o => o.ShutoffDoneCnt >= double.Parse(fc.Value)).ToList();
  //             else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                 lblockValList = lblockValList.Where(o => o.ShutoffDoneCnt <= double.Parse(fc.Value)).ToList();
  //             break;
  //     }
  // }
  //
  //   return lblockValList
  // }

  // /// <summary>
  // /// Sブロックリストの設定
  // /// </summary>
  // private void SetSblockValList()
  // {
  //     List<FilterManager.FilterCondition> fcList = patternFilterCondDic[nowPattern];
  //     sblockValList = GetSblockValList(fcList);

  //     if (nowPattern == (int)ShutoffBlockPattern.FeelEqShutoffSt)
  //     {
  //         // ページネート再描画処理
  //         Pagenate.RedrawPagenate(sblockValList.Count);

  //         // 絞り込み条件テキストの設定
  //         SetFilterConditionPartsText();

  //         // ソート条件テキストの設定
  //         SetSortConditionPartsText();
  //     }
  // }

  // /// <summary>
  // /// 絞り込んだSブロックリストを返す
  // /// </summary>
  // /// <param name="fcList">絞り込み条件のリスト</param>
  // /// <returns>絞り込んだSブロックリスト</returns>
  // private List<SBlockValModel> GetSblockValList(List<FilterManager.FilterCondition> fcList)
  // {
  //     List<SBlockValModel> sblockValList = ModelManager.GetList<SBlockValModel>(o => o.SBlock != null && o.LBlockVal != null && o.LBlockVal.LBlock != null
  //         && o.KBlockNo < controller.GetInvalidKBlockNo());

  //     if (nowPattern == (int)ShutoffBlockPattern.FeelEqShutoffSt)
  //         sblockValList = FeelEqShutoffStatus_FilteringSblockValList(sblockValList, fcList);

  //     return sblockValList;
  // }

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面の項目でSブロックリストを絞込んで返す
  // /// </summary>
  // /// <param name="sblockValList">Sブロックリスト</param>
  // /// <param name="fcList">絞り込み条件のリスト</param>
  // /// <returns>絞り込み後のSブロックリスト</returns>
  // private List<SBlockValModel> FeelEqShutoffStatus_FilteringSblockValList(List<SBlockValModel> sblockValList, List<FilterManager.FilterCondition> fcList)
  // {
  //     sblockValList = sblockValList.Where(o => o.IsFeelEqShutoff).ToList();

  //     foreach (FilterManager.FilterCondition fc in fcList)
  //     {
  //         switch (fc.FilterTag)
  //         {
  //             case (int)FeelEqShutoffStatusTag.AreaName: // エリア
  //                 sblockValList = sblockValList.Where(o => o.SBlock.AllAreaNameList.Contains(fc.Value)).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.SBlockName: // Sブロック番号
  //                 List<KDashBlockModel> kdList = ModelManager.GetList<KDashBlockModel>(o => o.LabelKDashNo == fc.Value);
  //                 if (kdList.Count() > 0)
  //                 {
  //                     KDashBlockModel kd = kdList.First();
  //                     int k = kd.KBlockNo;
  //                     List<int> lList = kd.LBlocks.Select(o => o.LBlockNo).ToList();
  //                     sblockValList = sblockValList.Where(o => o.KBlockNo == k && lList.Contains(o.LBlockNo)).ToList();
  //                 }
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.ShutoffBorderSi: // 遮断設定
  //                 sblockValList = sblockValList.Where(o => o.SBlock.ShutoffBorderSiList.Contains(fc.Value)).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.ShutoffSi: // 感震遮断設定
  //                 sblockValList = sblockValList.Where(o => o.SBlock.ShutoffSiList.Contains(fc.Value)).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.MaxSi: // 最大SI
  //                 // 表示が数値以外のものは除外する
  //                 sblockValList = sblockValList.Where(o => CommonUtil.IsNumeric(o.LabelMaxSi)).ToList();
  //                 if (fc.ValueType == FilterConst.ValueType.Equal)
  //                     sblockValList = sblockValList.Where(o => double.Parse(o.LabelMaxSi) == double.Parse(fc.Value)).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                     sblockValList = sblockValList.Where(o => double.Parse(o.LabelMaxSi) >= double.Parse(fc.Value)).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                     sblockValList = sblockValList.Where(o => double.Parse(o.LabelMaxSi) <= double.Parse(fc.Value)).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.CustomerCnt: // 総需要家件数
  //                 if (fc.ValueType == FilterConst.ValueType.Equal)
  //                     sblockValList = sblockValList.Where(o => o.SBlock.CustomerCnt == double.Parse(fc.Value)).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                     sblockValList = sblockValList.Where(o => o.SBlock.CustomerCnt >= double.Parse(fc.Value)).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                     sblockValList = sblockValList.Where(o => o.SBlock.CustomerCnt <= double.Parse(fc.Value)).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.ContinueCustomerCnt: // 供給継続需要家件数
  //                 if (fc.ValueType == FilterConst.ValueType.Equal)
  //                     sblockValList = sblockValList.Where(o => o.ContinueCustomerCnt == double.Parse(fc.Value)).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                     sblockValList = sblockValList.Where(o => o.ContinueCustomerCnt >= double.Parse(fc.Value)).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                     sblockValList = sblockValList.Where(o => o.ContinueCustomerCnt <= double.Parse(fc.Value)).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.GovernorStopRate: // ガバナ停止率
  //                 if (fc.ValueType == FilterConst.ValueType.Equal)
  //                     sblockValList = sblockValList.Where(o => double.Parse(o.LabelGovernorStopRate) == double.Parse(fc.Value)).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                     sblockValList = sblockValList.Where(o => double.Parse(o.LabelGovernorStopRate) >= double.Parse(fc.Value)).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                     sblockValList = sblockValList.Where(o => double.Parse(o.LabelGovernorStopRate) <= double.Parse(fc.Value)).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.GovCnt: // ガバナ数
  //                 if (fc.ValueType == FilterConst.ValueType.Equal)
  //                     sblockValList = sblockValList.Where(o => o.GovCnt == double.Parse(fc.Value)).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                     sblockValList = sblockValList.Where(o => o.GovCnt >= double.Parse(fc.Value)).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                     sblockValList = sblockValList.Where(o => o.GovCnt <= double.Parse(fc.Value)).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.StopCnt: // 停止数
  //                 if (fc.ValueType == FilterConst.ValueType.Equal)
  //                     sblockValList = sblockValList.Where(o => o.StopCnt == double.Parse(fc.Value)).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                     sblockValList = sblockValList.Where(o => o.StopCnt >= double.Parse(fc.Value)).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                     sblockValList = sblockValList.Where(o => o.StopCnt <= double.Parse(fc.Value)).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.ContinuanceCnt: // 継続数
  //                 if (fc.ValueType == FilterConst.ValueType.Equal)
  //                     sblockValList = sblockValList.Where(o => o.ContinuanceCnt == double.Parse(fc.Value)).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                     sblockValList = sblockValList.Where(o => o.ContinuanceCnt >= double.Parse(fc.Value)).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                     sblockValList = sblockValList.Where(o => o.ContinuanceCnt <= double.Parse(fc.Value)).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.UnconfirmedCnt: // 未確認数
  //                 if (fc.ValueType == FilterConst.ValueType.Equal)
  //                     sblockValList = sblockValList.Where(o => o.UnconfirmedCnt == double.Parse(fc.Value)).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndOver)
  //                     sblockValList = sblockValList.Where(o => o.UnconfirmedCnt >= double.Parse(fc.Value)).ToList();
  //                 else if (fc.ValueType == FilterConst.ValueType.AndFewer)
  //                     sblockValList = sblockValList.Where(o => o.UnconfirmedCnt <= double.Parse(fc.Value)).ToList();
  //                 break;
  //         }
  //     }

  //     return sblockValList;
  // }

  // /// <summary>
  // /// 絞り込み条件テキストの設定
  // /// </summary>
  // private void SetFilterConditionPartsText()
  // {
  //     List<FilterManager.FilterCondition> fcList = patternFilterCondDic[nowPattern];

  //     string filterCondStr = "";
  //     foreach (FilterManager.FilterCondition fc in fcList)
  //     {
  //         if (filterCondStr != "") filterCondStr += "、";
  //         filterCondStr += FilterManager.GetFilterConditionStr(fc);
  //     }
  //     ShutoffBlockFilterConditionParts.SetFilterConditionPartsText(filterCondStr);
  // }

  // /// <summary>
  // /// ソート条件テキストの設定
  // /// </summary>
  // private void SetSortConditionPartsText()
  // {
  //     List<FilterManager.SortCondition> scList = patternSortCondDic[nowPattern];

  //     string sortCondStr = "";
  //     foreach (FilterManager.SortCondition s in scList)
  //     {
  //         string sort = "";
  //         switch (nowPattern)
  //         {
  //             case (int)ShutoffBlockPattern.ShutoffReqSt:
  //                 sort = GetShutoffReqStatusColumnName(s.SortTag);
  //                 break;
  //             case (int)ShutoffBlockPattern.FeelEqShutoffSt:
  //                 sort = GetFeelEqShutoffStatusColumnName(s.SortTag);
  //                 break;
  //             default:
  //                 sort = GetShutoffLblockColumnName(s.SortTag);
  //                 break;
  //         }
  //         sort += " " + (s.IsUp ? "昇順" : "降順");
  //         sortCondStr += sort += (s.SortTag != scList.Last().SortTag) ? "、" : "";
  //     }
  //     ShutoffBlockFilterConditionParts.SetSortConditionPartsText(sortCondStr);
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) ソート処理
  // /// </summary>
  // /// <param name="sortCondition">ソート条件</param>
  // /// <param name="pattern">パターン</param>
  // private void ShutoffLblock_GridSort(List<FilterManager.SortCondition> sortCondition, int pattern)
  // {
  //     ShutoffLblock_GridSort(sortCondition.Last().SortTag, sortCondition.Last().IsUp, pattern);
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) ソート処理
  // /// </summary>
  // /// <param name="newSortTag">新しいソートタグ</param>
  // /// <param name="isUp">昇順かどうか</param>
  // /// <param name="pattern">パターン</param>
  // private void ShutoffLblock_GridSort(int newSortTag, bool isUp, int pattern)
  // {
  //     List<FilterManager.SortCondition> nowSc = GetSortCondition(pattern);
  //     int newfilterKey = newSortTag;
  //     int nowfilterKey = nowSc.Last().SortTag;

  //     // ソート用グリッドの再設定
  //     ResetSortGrid(ShutoffLblockGrid, newfilterKey, nowfilterKey, isUp);
  //     // ソート条件の再設定
  //     ResetSortCondition(nowSc, newSortTag, isUp);
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 ソート処理
  // /// </summary>
  // /// <param name="sortCondition">ソート条件</param>
  // private void ShutoffReqStatus_GridSort(List<FilterManager.SortCondition> sortCondition)
  // {
  //     ShutoffReqStatus_GridSort(sortCondition.Last().SortTag, sortCondition.Last().IsUp);
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 ソート処理
  // /// </summary>
  // /// <param name="newSortTag">新しいソートタグ</param>
  // /// <param name="isUp">昇順かどうか</param>
  // private void ShutoffReqStatus_GridSort(int newSortTag, bool isUp)
  // {
  //     List<FilterManager.SortCondition> nowSc = GetSortCondition((int)ShutoffBlockPattern.ShutoffReqSt);
  //     int newfilterKey = ConvertTagToKeyShutoffReqStatus(newSortTag);
  //     int nowfilterKey = ConvertTagToKeyShutoffReqStatus(nowSc.Last().SortTag);

  //     // ソート用グリッドの再設定
  //     ResetSortGrid(ShutoffReqStatusGrid, newfilterKey, nowfilterKey, isUp);
  //     // ソート条件の再設定
  //     ResetSortCondition(nowSc, newSortTag, isUp);
  // }

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面 ソート処理
  // /// </summary>
  // /// <param name="sortCondition">ソート条件</param>
  // private void FeelEqShutoffStatus_GridSort(List<FilterManager.SortCondition> sortCondition)
  // {
  //     FeelEqShutoffStatus_GridSort(sortCondition.Last().SortTag, sortCondition.Last().IsUp);
  // }

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面 ソート処理
  // /// </summary>
  // /// <param name="newSortTag">新しいソートタグ</param>
  // /// <param name="isUp">昇順かどうか</param>
  // private void FeelEqShutoffStatus_GridSort(int newSortTag, bool isUp)
  // {
  //     List<FilterManager.SortCondition> nowSc = GetSortCondition((int)ShutoffBlockPattern.FeelEqShutoffSt);
  //     int newfilterKey = ConvertTagToKeyFeelEqShutoffStatus(newSortTag);
  //     int nowfilterKey = ConvertTagToKeyFeelEqShutoffStatus(nowSc.Last().SortTag);

  //     // ソート用グリッドの再設定
  //     ResetSortGrid(FeelEqShutoffStatusGrid, newfilterKey, nowfilterKey, isUp);
  //     // ソート条件の再設定
  //     ResetSortCondition(nowSc, newSortTag, isUp);
  // }

  // /// <summary>
  // /// ソート用グリッドの再設定
  // /// </summary>
  // /// <param name="grid">対象Grid</param>
  // /// <param name="newfilterKey">新しいフィルタキー</param>
  // /// <param name="nowfilterKey">現在のフィルタキー</param>
  // /// <param name="isUp">昇順かどうか</param>
  // private void ResetSortGrid(Grid grid, int newfilterKey, int nowfilterKey, bool isUp)
  // {
  //     if (nowfilterKey != newfilterKey)
  //     {
  //         // 前の項目の強調表示を元に戻す
  //         (grid.FindName(string.Format(GlobalConst.SORT_BORDER_CANVAS_KEY_STRING, nowfilterKey)) as Canvas).Visibility = Visibility.Collapsed;
  //         GradientStop nowGs = grid.FindName(string.Format(GlobalConst.SORT_BORDER_GRADIENT_KEY_STRING, nowfilterKey)) as GradientStop;
  //         if (nowGs != null) { nowGs.Color = SupColors.HeaderCanvasColor; }
  //     }

  //     // 指定された項目を強調表示にする
  //     (grid.FindName(string.Format(GlobalConst.SORT_BORDER_CANVAS_KEY_STRING, newfilterKey)) as Canvas).Visibility = Visibility.Visible;
  //     GradientStop newGs = grid.FindName(string.Format(GlobalConst.SORT_BORDER_GRADIENT_KEY_STRING, newfilterKey)) as GradientStop;
  //     if (newGs != null) { newGs.Color = SupColors.SortHeaderCanvasColor; }

  //     // 矢印を表示する
  //     (grid.FindName(string.Format(GlobalConst.SORT_DOWN_MARK_KEY_STRING, newfilterKey)) as Path).Visibility = (isUp ? Visibility.Collapsed : Visibility.Visible);
  //     (grid.FindName(string.Format(GlobalConst.SORT_UP_MARK_KEY_STRING, newfilterKey)) as Path).Visibility = (isUp ? Visibility.Visible : Visibility.Collapsed);
  // }

  // /// <summary>
  // /// ソート用グリッドのクリア
  // /// </summary>
  // private void ClearSortGrid()
  // {
  //     if (nowPattern < (int)ShutoffBlockPattern.FirstL) return;

  //     List<FilterManager.SortCondition> nowSc = GetSortCondition(nowPattern);
  //     int nowfilterKey;
  //     int newfilterKey;

  //     // 強調表示を元に戻す
  //     Grid grid;
  //     FilterManager.SortCondition s = new FilterManager.SortCondition();
  //     switch (nowPattern)
  //     {
  //         case (int)ShutoffBlockPattern.ShutoffReqSt:
  //             s.SortTag = (int)ShutoffReqStatusTag.BlockName;
  //             grid = ShutoffReqStatusGrid;
  //             nowfilterKey = ConvertTagToKeyShutoffReqStatus(nowSc.Last().SortTag);
  //             newfilterKey = ConvertTagToKeyShutoffReqStatus(s.SortTag);
  //             break;
  //         case (int)ShutoffBlockPattern.FeelEqShutoffSt:
  //             s.SortTag = (int)FeelEqShutoffStatusTag.SBlockName;
  //             grid = FeelEqShutoffStatusGrid;
  //             nowfilterKey = ConvertTagToKeyFeelEqShutoffStatus(nowSc.Last().SortTag);
  //             newfilterKey = ConvertTagToKeyFeelEqShutoffStatus(s.SortTag);
  //             break;
  //         default:
  //             s.SortTag = (int)ShutoffLblockTag.BlockName;
  //             grid = ShutoffLblockGrid;
  //             nowfilterKey = nowSc.Last().SortTag;
  //             newfilterKey = s.SortTag;
  //             break;
  //     }
  //     // 前の項目の強調表示を元に戻す
  //     (grid.FindName(string.Format(GlobalConst.SORT_BORDER_CANVAS_KEY_STRING, nowfilterKey)) as Canvas).Visibility = Visibility.Collapsed;
  //     GradientStop nowGs = grid.FindName(string.Format(GlobalConst.SORT_BORDER_GRADIENT_KEY_STRING, nowfilterKey)) as GradientStop;
  //     if (nowGs != null) { nowGs.Color = SupColors.HeaderCanvasColor; }

  //     // ソートキーをクリアして、各画面の初期キーを設定する
  //     List<FilterManager.SortCondition> sc = GetSortCondition(nowPattern);
  //     sc.Clear();

  //     s.IsUp = GetInitialSortType(nowPattern, s.SortTag);
  //     sc.Add(s);

  //     // 指定された項目を強調表示にする
  //     (grid.FindName(string.Format(GlobalConst.SORT_BORDER_CANVAS_KEY_STRING, newfilterKey)) as Canvas).Visibility = Visibility.Visible;
  //     GradientStop newGs = grid.FindName(string.Format(GlobalConst.SORT_BORDER_GRADIENT_KEY_STRING, newfilterKey)) as GradientStop;
  //     if (newGs != null) { newGs.Color = SupColors.SortHeaderCanvasColor; }

  //     // 矢印を表示する
  //     (grid.FindName(string.Format(GlobalConst.SORT_DOWN_MARK_KEY_STRING, newfilterKey)) as Path).Visibility = (s.IsUp ? Visibility.Collapsed : Visibility.Visible);
  //     (grid.FindName(string.Format(GlobalConst.SORT_UP_MARK_KEY_STRING, newfilterKey)) as Path).Visibility = (s.IsUp ? Visibility.Visible : Visibility.Collapsed);
  // }

  // /// <summary>
  // /// ソート条件の再設定
  // /// </summary>
  // /// <param name="sc">ソート条件</param>
  // /// <param name="newSortTag">新しいソートタグ</param>
  // /// <param name="isUp">昇順かどうか</param>
  // private void ResetSortCondition(List<FilterManager.SortCondition> sc, int newSortTag, bool isUp)
  // {
  //     int i = 0;
  //     bool isDuplicate = false;

  //     if (sc.Count() == 1) // 初期状態からソートキーを指定した場合、初期キーは抹消され、指定項目を第一キーとする
  //     {
  //         bool isTagNum = false;
  //         switch (nowPattern)
  //         {
  //             case (int)ShutoffBlockPattern.ShutoffReqSt:
  //                 isTagNum = (sc[0].SortTag == (int)ShutoffReqStatusTag.BlockName);
  //                 break;
  //             case (int)ShutoffBlockPattern.FeelEqShutoffSt:
  //                 isTagNum = (sc[0].SortTag == (int)FeelEqShutoffStatusTag.SBlockName);
  //                 break;
  //             default:
  //                 isTagNum = (sc[0].SortTag == (int)ShutoffLblockTag.BlockName);
  //                 break;
  //         }
  //         if (isTagNum) sc.Clear();
  //     }

  //     // 指定ソートキーが既に指定済の場合、新しく指定したものを有効とする
  //     for (i = 0; i < sc.Count(); i++)
  //     {
  //         if (sc[i].SortTag == newSortTag)
  //         {
  //             isDuplicate = true;
  //             break;
  //         }
  //     }
  //     if (isDuplicate) sc.RemoveAt(i);

  //     FilterManager.SortCondition s = new FilterManager.SortCondition();
  //     s.SortTag = newSortTag;
  //     s.IsUp = isUp;
  //     sc.Add(s);
  // }

  // /// <summary>
  // /// L毎観測値を遠隔遮断実施画面(Lブロック)の項目でソートする
  // /// </summary>
  // /// <param name="sortCondition">ソート条件</param>
  // private void SortShutoffLblockLblockValList(List<FilterManager.SortCondition> sortCondition)
  // {
  //     if (lblockValList == null) return;

  //     foreach (FilterManager.SortCondition sc in Enumerable.Reverse(sortCondition))
  //     {
  //         int tag = sc.SortTag;
  //         bool isUp = sc.IsUp;
  //         switch (tag)
  //         {
  //             case (int)ShutoffLblockTag.ShutoffCheked: // 遮断
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LBlock.IsChecked).ToList() : lblockValList.OrderByDescending(o => o.LBlock.IsChecked).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.RequestStatus: // 依頼状況
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.ShutoffStatus).ToList() : lblockValList.OrderByDescending(o => o.ShutoffStatus).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.JudgeResult: // 停止判断
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.JudgeResult).ToList() : lblockValList.OrderByDescending(o => o.JudgeResult).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.RestorationWorkStatus: // 復旧状況
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.restorationWorkStatus).ToList() : lblockValList.OrderByDescending(o => o.restorationWorkStatus).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.AreaName: // エリア
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LBlock.AllAreaName).ToList() : lblockValList.OrderByDescending(o => o.LBlock.AllAreaName).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.BlockName: // ブロック番号
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LBlockNo).ToList() : lblockValList.OrderByDescending(o => o.LBlockNo).ToList();
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.KBlockNo).ToList() : lblockValList.OrderByDescending(o => o.KBlockNo).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.KBlockName: // Kブロック番号
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LBlock.AllKBlockNameForSort).ToList() : lblockValList.OrderByDescending(o => o.LBlock.AllKBlockNameForSort).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.BlockCategory: // ブロック区分
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LBlock.LabelBlockCategory).ToList() : lblockValList.OrderByDescending(o => o.LBlock.LabelBlockCategory).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.ShutoffBorderSi: // 遮断設定
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LBlock.ShutoffBorderSi).ToList() : lblockValList.OrderByDescending(o => o.LBlock.ShutoffBorderSi).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.RemoteOpenSBlock: // 遠隔D復旧Sブロック
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.ExistRemoteOpenSBlock).ToList() : lblockValList.OrderByDescending(o => o.ExistRemoteOpenSBlock).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.PlAve: // 平均PL
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.AvePl).ToList() : lblockValList.OrderByDescending(o => o.AvePl).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.ShutoffSi: // 感震遮断設定
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LBlock.LabelShutoffSi).ToList() : lblockValList.OrderByDescending(o => o.LBlock.LabelShutoffSi).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.RepresentMaxSi: // 代表局最大SI
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.RepresentMaxSi).ToList() : lblockValList.OrderByDescending(o => o.RepresentMaxSi).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.MaxSi: // 最大SI
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.MaxSi).ToList() : lblockValList.OrderByDescending(o => o.MaxSi).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.AveSi: // 平均SI
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.AveSi).ToList() : lblockValList.OrderByDescending(o => o.AveSi).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.Over30KineRate: // 30Kine超過率
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.Over30KineRate).ToList() : lblockValList.OrderByDescending(o => o.Over30KineRate).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.Over60KineRate: // 60Kine超過率
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.Over60KineRate).ToList() : lblockValList.OrderByDescending(o => o.Over60KineRate).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.Over70KineRate: // 70Kine超過率
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.Over70KineRate).ToList() : lblockValList.OrderByDescending(o => o.Over70KineRate).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.Over80KineRate: // 80Kine超過率
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.Over80KineRate).ToList() : lblockValList.OrderByDescending(o => o.Over80KineRate).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.Over90KineRate: // 90Kine超過率
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.Over90KineRate).ToList() : lblockValList.OrderByDescending(o => o.Over90KineRate).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.MaxComAbleOver30KineRate: // 最大30Kine超過率
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.MaxComAbleOver30KineRate).ToList() : lblockValList.OrderByDescending(o => o.MaxComAbleOver30KineRate).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.MaxComAbleOver60KineRate: // 最大60Kine超過率
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.MaxComAbleOver60KineRate).ToList() : lblockValList.OrderByDescending(o => o.MaxComAbleOver60KineRate).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.MaxComAbleOver70KineRate: // 最大70Kine超過率
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.MaxComAbleOver70KineRate).ToList() : lblockValList.OrderByDescending(o => o.MaxComAbleOver70KineRate).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.MaxComAbleOver80KineRate: // 最大80Kine超過率
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.MaxComAbleOver80KineRate).ToList() : lblockValList.OrderByDescending(o => o.MaxComAbleOver80KineRate).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.MaxComAbleOver90KineRate: // 最大90Kine超過率
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.MaxComAbleOver90KineRate).ToList() : lblockValList.OrderByDescending(o => o.MaxComAbleOver90KineRate).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.CustomerCnt: // 総需要家件数
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LBlock.CustomerCnt).ToList() : lblockValList.OrderByDescending(o => o.LBlock.CustomerCnt).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.ContinueCustomerCnt: // 供給継続需要家件数
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.ContinueCustomerCnt).ToList() : lblockValList.OrderByDescending(o => o.ContinueCustomerCnt).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.GovernorStopRate: // ガバナ停止率
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.GovernorStopRate).ToList() : lblockValList.OrderByDescending(o => o.GovernorStopRate).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.LpMinConnected: // 最低LP(単独除く)
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LpMinConnected).ToList() : lblockValList.OrderByDescending(o => o.LpMinConnected).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.LpMin: // 最低LP(単独含む)
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LpMin).ToList() : lblockValList.OrderByDescending(o => o.LpMin).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.PowerFailureRate: // 停電率
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.PowerFailureRate).ToList() : lblockValList.OrderByDescending(o => o.PowerFailureRate).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.MpaMin: // 最低MPA
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.MpaMin).ToList() : lblockValList.OrderByDescending(o => o.MpaMin).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.MpbMin: // 最低MPB
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.MpbMin).ToList() : lblockValList.OrderByDescending(o => o.MpbMin).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.LeakEncounterRate: // 漏えい遭遇率
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LabelLeakEncounterRate2).ToList() : lblockValList.OrderByDescending(o => o.LabelLeakEncounterRate2).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.LpSupplyDmgCntEmergency: // 本支管被害数(緊急)
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LabelLpSupplyDmgCntEmergency).ToList() : lblockValList.OrderByDescending(o => o.LabelLpSupplyDmgCntEmergency).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.LpSupplyDmgCnt: // 本支管被害数(総数)
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LabelLpSupplyDmgCnt).ToList() : lblockValList.OrderByDescending(o => o.LabelLpSupplyDmgCnt).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.LpAveConnected: // 平均LP(単独除く)
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LpAveConnected).ToList() : lblockValList.OrderByDescending(o => o.LpAveConnected).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.LpAve: // 平均LP(単独含む)
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LpAve).ToList() : lblockValList.OrderByDescending(o => o.LpAve).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.LqAlarmRate: // 液状化警報率
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LqAlarmRate).ToList() : lblockValList.OrderByDescending(o => o.LqAlarmRate).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.ComppartDstrRate: // 建物全半壊率
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.ComppartDstrRate).ToList() : lblockValList.OrderByDescending(o => o.ComppartDstrRate).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.FireCnt: // 火災件数
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.FireCnt).ToList() : lblockValList.OrderByDescending(o => o.FireCnt).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.LeakCnt: // 漏えい受付
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LeakCnt).ToList() : lblockValList.OrderByDescending(o => o.LeakCnt).ToList();
  //                 break;
  //         }
  //     }
  // }

  // /// <summary>
  // /// S毎観測値を遠隔遮断実施画面(Lブロック)の項目でソートする
  // /// </summary>
  // /// <param name="sortCondition">ソート条件</param>
  // private void SortShutoffLblockSblockValList(List<FilterManager.SortCondition> sortCondition)
  // {
  //     if (sblockValList == null) return;

  //     foreach (FilterManager.SortCondition sc in Enumerable.Reverse(sortCondition))
  //     {
  //         int tag = sc.SortTag;
  //         bool isUp = sc.IsUp;
  //         switch (tag)
  //         {
  //             case (int)ShutoffLblockTag.ShutoffCheked: // 遮断
  //                                                       // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffLblockTag.RequestStatus: // 依頼状況
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.ShutoffStatus).ToList() : sblockValList.OrderByDescending(o => o.ShutoffStatus).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.JudgeResult: // 停止判断
  //                                                     // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffLblockTag.RestorationWorkStatus: // 復旧状況
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.restorationWorkStatus).ToList() : sblockValList.OrderByDescending(o => o.restorationWorkStatus).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.AreaName: // エリア
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.SBlock.AllAreaName).ToList() : sblockValList.OrderByDescending(o => o.SBlock.AllAreaName).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.BlockName: // ブロック番号
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.SBlockNo).ToList() : sblockValList.OrderByDescending(o => o.SBlockNo).ToList();
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.LBlockNo).ToList() : sblockValList.OrderByDescending(o => o.LBlockNo).ToList();
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.KBlockNo).ToList() : sblockValList.OrderByDescending(o => o.KBlockNo).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.KBlockName: // Kブロック番号
  //                                                    // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffLblockTag.BlockCategory: // ブロック区分
  //                                                       // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffLblockTag.ShutoffBorderSi: // 遮断設定
  //                                                         // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffLblockTag.RemoteOpenSBlock: // 遠隔D復旧Sブロック
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.IsDRestorationDone).ToList() : sblockValList.OrderByDescending(o => o.IsDRestorationDone).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.PlAve: // 平均PL
  //                                               // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffLblockTag.ShutoffSi: // 感震遮断設定
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.SBlock.LabelShutoffSi).ToList() : sblockValList.OrderByDescending(o => o.SBlock.LabelShutoffSi).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.RepresentMaxSi: // 代表局最大SI
  //                                                        // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffLblockTag.MaxSi: // 最大SI
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.MaxSi).ToList() : sblockValList.OrderByDescending(o => o.MaxSi).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.AveSi: // 平均SI
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.AveSi).ToList() : sblockValList.OrderByDescending(o => o.AveSi).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.Over30KineRate: // 30Kine超過率
  //                                                        // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffLblockTag.Over60KineRate: // 60Kine超過率
  //                                                        // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffLblockTag.Over70KineRate: // 70Kine超過率
  //                                                        // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffLblockTag.Over80KineRate: // 80Kine超過率
  //                                                        // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffLblockTag.Over90KineRate: // 90Kine超過率
  //                                                        // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffLblockTag.MaxComAbleOver30KineRate: // 最大30Kine超過率
  //                                                                  // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffLblockTag.MaxComAbleOver60KineRate: // 最大60Kine超過率
  //                                                                  // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffLblockTag.MaxComAbleOver70KineRate: // 最大70Kine超過率
  //                                                                  // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffLblockTag.MaxComAbleOver80KineRate: // 最大80Kine超過率
  //                                                                  // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffLblockTag.MaxComAbleOver90KineRate: // 最大90Kine超過率
  //                                                                  // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffLblockTag.CustomerCnt: // 総需要家件数
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.SBlock.CustomerCnt).ToList() : sblockValList.OrderByDescending(o => o.SBlock.CustomerCnt).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.ContinueCustomerCnt: // 供給継続需要家件数
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.ContinueCustomerCnt).ToList() : sblockValList.OrderByDescending(o => o.ContinueCustomerCnt).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.GovernorStopRate: // ガバナ停止率
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.GovernorStopRate).ToList() : sblockValList.OrderByDescending(o => o.GovernorStopRate).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.LpMinConnected: // 最低LP(単独除く)
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.LpMinConnected).ToList() : sblockValList.OrderByDescending(o => o.LpMinConnected).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.LpMin: // 最低LP(単独含む)
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.LpMin).ToList() : sblockValList.OrderByDescending(o => o.LpMin).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.PowerFailureRate: // 停電率
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.PowerFailureRate).ToList() : sblockValList.OrderByDescending(o => o.PowerFailureRate).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.MpaMin: // 最低MPA
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.MpaMin).ToList() : sblockValList.OrderByDescending(o => o.MpaMin).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.MpbMin: // 最低MPB
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.MpbMin).ToList() : sblockValList.OrderByDescending(o => o.MpbMin).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.LeakEncounterRate: // 漏えい遭遇率
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.LabelLeakEncounterRate2).ToList() : sblockValList.OrderByDescending(o => o.LabelLeakEncounterRate2).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.LpSupplyDmgCnt: // 本支管被害数(総数)
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.LabelLpSupplyDmgCnt).ToList() : sblockValList.OrderByDescending(o => o.LabelLpSupplyDmgCnt).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.LpSupplyDmgCntEmergency: // 本支管被害数(緊急)
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.LabelLpSupplyDmgCntEmergency).ToList() : sblockValList.OrderByDescending(o => o.LabelLpSupplyDmgCntEmergency).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.LpAveConnected: // 平均LP(単独除く)
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.LpAveConnected).ToList() : sblockValList.OrderByDescending(o => o.LpAveConnected).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.LpAve: // 平均LP(単独含む)
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.LpAve).ToList() : sblockValList.OrderByDescending(o => o.LpAve).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.LqAlarmRate: // 液状化警報率
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.LqAlarmRate).ToList() : sblockValList.OrderByDescending(o => o.LqAlarmRate).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.ComppartDstrRate: // 建物全半壊率
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.ComppartDstrRate).ToList() : sblockValList.OrderByDescending(o => o.ComppartDstrRate).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.FireCnt: // 火災件数
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.FireCnt).ToList() : sblockValList.OrderByDescending(o => o.FireCnt).ToList();
  //                 break;
  //             case (int)ShutoffLblockTag.LeakCnt: // 漏えい受付
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.LeakCnt).ToList() : sblockValList.OrderByDescending(o => o.LeakCnt).ToList();
  //                 break;
  //         }
  //     }
  // }

  // /// <summary>
  // /// L毎観測値を遠隔遮断依頼状況確認画面の項目でソートする
  // /// </summary>
  // /// <param name="sortCondition">ソート条件</param>
  // private void SortShutoffReqStatusLblockValList(List<FilterManager.SortCondition> sortCondition)
  // {
  //     if (lblockValList == null) return;

  //     foreach (FilterManager.SortCondition sc in Enumerable.Reverse(sortCondition))
  //     {
  //         int tag = sc.SortTag;
  //         bool isUp = sc.IsUp;
  //         switch (tag)
  //         {
  //             case (int)ShutoffReqStatusTag.AreaName: // エリア
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LBlock.AllAreaName).ToList() : lblockValList.OrderByDescending(o => o.LBlock.AllAreaName).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.BlockName: // ブロック番号
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LBlockNo).ToList() : lblockValList.OrderByDescending(o => o.LBlockNo).ToList();
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.KBlockNo).ToList() : lblockValList.OrderByDescending(o => o.KBlockNo).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.BlockCategory: // ブロック区分
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LBlock.LabelBlockCategory).ToList() : lblockValList.OrderByDescending(o => o.LBlock.LabelBlockCategory).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffBorderSi: // 遮断設定
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LBlock.ShutoffBorderSi).ToList() : lblockValList.OrderByDescending(o => o.LBlock.ShutoffBorderSi).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.MaxSi: // 最大SI
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.MaxSi).ToList() : lblockValList.OrderByDescending(o => o.MaxSi).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.CustomerCnt: // 総需要家件数
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.LBlock.CustomerCnt).ToList() : lblockValList.OrderByDescending(o => o.LBlock.CustomerCnt).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.ContinueCustomerCnt: // 供給継続需要家件数
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.ContinueCustomerCnt).ToList() : lblockValList.OrderByDescending(o => o.ContinueCustomerCnt).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.GovernorStopRate: // ガバナ停止率
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.GovernorStopRate).ToList() : lblockValList.OrderByDescending(o => o.GovernorStopRate).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.GovCnt: // ガバナ数
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.GovCnt).ToList() : lblockValList.OrderByDescending(o => o.GovCnt).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.StopCnt: // 停止数
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.StopCnt).ToList() : lblockValList.OrderByDescending(o => o.StopCnt).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.ContinuanceCnt: // 継続数
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.ContinuanceCnt).ToList() : lblockValList.OrderByDescending(o => o.ContinuanceCnt).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.UnconfirmedCnt: // 未確認数
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.UnconfirmedCnt).ToList() : lblockValList.OrderByDescending(o => o.UnconfirmedCnt).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffStatus: // 遠隔遮断実施状況
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.ShutoffStatus).ToList() : lblockValList.OrderByDescending(o => o.ShutoffStatus).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffTargetCnt: // 対象数
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.ShutoffTargetCnt).ToList() : lblockValList.OrderByDescending(o => o.ShutoffTargetCnt).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffSuccessCnt: // 成功数
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.ShutoffSuccessCnt).ToList() : lblockValList.OrderByDescending(o => o.ShutoffSuccessCnt).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffFailedCnt: // 失敗数
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.ShutoffFailedCnt).ToList() : lblockValList.OrderByDescending(o => o.ShutoffFailedCnt).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffRequestedAt: // 依頼時刻
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.ShutoffRequestedAt).ToList() : lblockValList.OrderByDescending(o => o.ShutoffRequestedAt).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffEndedAt: // 終了時刻
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.ShutoffEndedAt).ToList() : lblockValList.OrderByDescending(o => o.ShutoffEndedAt).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffUnableCnt: // TC不可
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.ShutoffUnableCnt).ToList() : lblockValList.OrderByDescending(o => o.ShutoffUnableCnt).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffDoneCnt: // 遮断済数
  //                 lblockValList = isUp ? lblockValList.OrderBy(o => o.ShutoffDoneCnt).ToList() : lblockValList.OrderByDescending(o => o.ShutoffDoneCnt).ToList();
  //                 break;
  //         }
  //     }
  // }

  // /// <summary>
  // /// S毎観測値を遠隔遮断依頼状況確認画面の項目でソートする
  // /// </summary>
  // /// <param name="sortCondition">ソート条件</param>
  // private void SortShutoffReqStatusSblockValList(List<FilterManager.SortCondition> sortCondition)
  // {
  //     if (sblockValList == null) return;

  //     foreach (FilterManager.SortCondition sc in Enumerable.Reverse(sortCondition))
  //     {
  //         int tag = sc.SortTag;
  //         bool isUp = sc.IsUp;
  //         switch (tag)
  //         {
  //             case (int)ShutoffReqStatusTag.AreaName: // エリア
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.SBlock.AllAreaName).ToList() : sblockValList.OrderByDescending(o => o.SBlock.AllAreaName).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.BlockName: // ブロック番号
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.SBlockNo).ToList() : sblockValList.OrderByDescending(o => o.SBlockNo).ToList();
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.LBlockNo).ToList() : sblockValList.OrderByDescending(o => o.LBlockNo).ToList();
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.KBlockNo).ToList() : sblockValList.OrderByDescending(o => o.KBlockNo).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.BlockCategory: // ブロック区分
  //                                                          // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffBorderSi: // 遮断設定
  //                                                            // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffReqStatusTag.MaxSi: // 最大SI
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.MaxSi).ToList() : sblockValList.OrderByDescending(o => o.MaxSi).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.CustomerCnt: // 総需要家件数
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.SBlock.CustomerCnt).ToList() : sblockValList.OrderByDescending(o => o.SBlock.CustomerCnt).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.ContinueCustomerCnt: // 供給継続需要家件数
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.ContinueCustomerCnt).ToList() : sblockValList.OrderByDescending(o => o.ContinueCustomerCnt).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.GovernorStopRate: // ガバナ停止率
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.GovernorStopRate).ToList() : sblockValList.OrderByDescending(o => o.GovernorStopRate).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.GovCnt: // ガバナ数
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.GovCnt).ToList() : sblockValList.OrderByDescending(o => o.GovCnt).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.StopCnt: // 停止数
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.StopCnt).ToList() : sblockValList.OrderByDescending(o => o.StopCnt).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.ContinuanceCnt: // 継続数
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.ContinuanceCnt).ToList() : sblockValList.OrderByDescending(o => o.ContinuanceCnt).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.UnconfirmedCnt: // 未確認数
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.UnconfirmedCnt).ToList() : sblockValList.OrderByDescending(o => o.UnconfirmedCnt).ToList();
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffStatus: // 遠隔遮断実施状況
  //                                                          // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffTargetCnt: // 対象数
  //                                                             // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffSuccessCnt: // 成功数
  //                                                              // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffFailedCnt: // 失敗数
  //                                                             // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffRequestedAt: // 依頼時刻
  //                                                               // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffEndedAt: // 終了時刻
  //                                                           // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffUnableCnt: // TC不可
  //                                                             // Sブロックには項目が存在しない
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffDoneCnt: // 遮断済数
  //                                                           // Sブロックには項目が存在しない
  //                 break;
  //         }
  //     }
  // }

  // /// <summary>
  // /// S毎観測値を感震遮断Sブロック状況確認画面の項目でソートする
  // /// </summary>
  // /// <param name="sortCondition">ソート条件</param>
  // private void SortFeelEqShutoffStatusList(List<FilterManager.SortCondition> sortCondition)
  // {
  //     if (sblockValList == null) return;

  //     foreach (FilterManager.SortCondition sc in Enumerable.Reverse(sortCondition))
  //     {
  //         int tag = sc.SortTag;
  //         bool isUp = sc.IsUp;
  //         switch (tag)
  //         {
  //             case (int)FeelEqShutoffStatusTag.AreaName: // エリア
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.SBlock.AllAreaName).ToList() : sblockValList.OrderByDescending(o => o.SBlock.AllAreaName).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.SBlockName: // Sブロック番号
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.SBlockNo).ToList() : sblockValList.OrderByDescending(o => o.SBlockNo).ToList();
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.LBlockNo).ToList() : sblockValList.OrderByDescending(o => o.LBlockNo).ToList();
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.KBlockNo).ToList() : sblockValList.OrderByDescending(o => o.KBlockNo).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.ShutoffBorderSi: // 遮断設定
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.LBlockVal.LBlock.ShutoffBorderSi).ToList() : sblockValList.OrderByDescending(o => o.LBlockVal.LBlock.ShutoffBorderSi).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.ShutoffSi: // 感震遮断設定
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.SBlock.LabelShutoffSi).ToList() : sblockValList.OrderByDescending(o => o.SBlock.LabelShutoffSi).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.MaxSi: // 最大SI
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.MaxSi).ToList() : sblockValList.OrderByDescending(o => o.MaxSi).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.CustomerCnt: // 総需要家件数
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.SBlock.CustomerCnt).ToList() : sblockValList.OrderByDescending(o => o.SBlock.CustomerCnt).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.ContinueCustomerCnt: // 供給継続需要家件数
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.ContinueCustomerCnt).ToList() : sblockValList.OrderByDescending(o => o.ContinueCustomerCnt).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.GovernorStopRate: // ガバナ停止率
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.GovernorStopRate).ToList() : sblockValList.OrderByDescending(o => o.GovernorStopRate).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.GovCnt: // ガバナ数
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.GovCnt).ToList() : sblockValList.OrderByDescending(o => o.GovCnt).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.StopCnt: // 停止数
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.StopCnt).ToList() : sblockValList.OrderByDescending(o => o.StopCnt).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.ContinuanceCnt: // 継続数
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.ContinuanceCnt).ToList() : sblockValList.OrderByDescending(o => o.ContinuanceCnt).ToList();
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.UnconfirmedCnt: // 未確認数
  //                 sblockValList = isUp ? sblockValList.OrderBy(o => o.UnconfirmedCnt).ToList() : sblockValList.OrderByDescending(o => o.UnconfirmedCnt).ToList();
  //                 break;
  //         }
  //     }
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック)の項目名を返す
  // /// </summary>
  // /// <param name="tag">タグ</param>
  // /// <returns>項目名</returns>
  // private string GetShutoffLblockColumnName(int tag)
  // {
  //     string columnName = "";

  //     switch (tag)
  //     {
  //         case (int)ShutoffLblockTag.ShutoffCheked: // 遮断
  //             columnName = "遮断";
  //             break;
  //         case (int)ShutoffLblockTag.RequestStatus: // 依頼状況
  //             columnName = "依頼状況";
  //             break;
  //         case (int)ShutoffLblockTag.JudgeResult: // 停止判断
  //             columnName = "停止判断";
  //             break;
  //         case (int)ShutoffLblockTag.RestorationWorkStatus: // 復旧状況
  //             columnName = "復旧状況";
  //             break;
  //         case (int)ShutoffLblockTag.AreaName: // エリア
  //             columnName = "エリア";
  //             break;
  //         case (int)ShutoffLblockTag.BlockName: // ブロック番号
  //             columnName = "ブロック番号";
  //             break;
  //         case (int)ShutoffLblockTag.KBlockName: // Kブロック番号
  //             columnName = "Kブロック番号";
  //             break;
  //         case (int)ShutoffLblockTag.BlockCategory: // ブロック区分
  //             columnName = "ブロック区分";
  //             break;
  //         case (int)ShutoffLblockTag.ShutoffBorderSi: // 遮断設定
  //             columnName = "遮断設定";
  //             break;
  //         case (int)ShutoffLblockTag.RemoteOpenSBlock: // 遠隔D復旧Sブロック
  //             columnName = "D復旧済Sブロック";
  //             break;
  //         case (int)ShutoffLblockTag.PlAve: // 平均PL
  //             columnName = "平均PL";
  //             break;
  //         case (int)ShutoffLblockTag.ShutoffSi: // 感震遮断設定
  //             columnName = "感震遮断設定";
  //             break;
  //         case (int)ShutoffLblockTag.RepresentMaxSi: // 代表局最大SI
  //             columnName = "代表局最大SI";
  //             break;
  //         case (int)ShutoffLblockTag.MaxSi: // 最大SI
  //             columnName = "最大SI";
  //             break;
  //         case (int)ShutoffLblockTag.AveSi: // 平均SI
  //             columnName = "平均SI";
  //             break;
  //         case (int)ShutoffLblockTag.Over30KineRate: // 30Kine超過率
  //             columnName = "30Kine超過率";
  //             break;
  //         case (int)ShutoffLblockTag.Over60KineRate: // 60Kine超過率
  //             columnName = "60Kine超過率";
  //             break;
  //         case (int)ShutoffLblockTag.Over70KineRate: // 70Kine超過率
  //             columnName = "70Kine超過率";
  //             break;
  //         case (int)ShutoffLblockTag.Over80KineRate: // 80Kine超過率
  //             columnName = "80Kine超過率";
  //             break;
  //         case (int)ShutoffLblockTag.Over90KineRate: // 90Kine超過率
  //             columnName = "90Kine超過率";
  //             break;
  //         case (int)ShutoffLblockTag.MaxComAbleOver30KineRate: // 最大30Kine超過率
  //             columnName = "最大30Kine超過率";
  //             break;
  //         case (int)ShutoffLblockTag.MaxComAbleOver60KineRate: // 最大60Kine超過率
  //             columnName = "最大60Kine超過率";
  //             break;
  //         case (int)ShutoffLblockTag.MaxComAbleOver70KineRate: // 最大70Kine超過率
  //             columnName = "最大70Kine超過率";
  //             break;
  //         case (int)ShutoffLblockTag.MaxComAbleOver80KineRate: // 最大80Kine超過率
  //             columnName = "最大80Kine超過率";
  //             break;
  //         case (int)ShutoffLblockTag.MaxComAbleOver90KineRate: // 最大90Kine超過率
  //             columnName = "最大90Kine超過率";
  //             break;
  //         case (int)ShutoffLblockTag.CustomerCnt: // 総需要家件数
  //             columnName = "総需要家件数";
  //             break;
  //         case (int)ShutoffLblockTag.ContinueCustomerCnt: // 供給継続需要家件数
  //             columnName = "供給継続需要家件数";
  //             break;
  //         case (int)ShutoffLblockTag.GovernorStopRate: // ガバナ停止率
  //             columnName = "ガバナ停止率";
  //             break;
  //         case (int)ShutoffLblockTag.LpMinConnected: // 最低LP(単独除く)
  //             columnName = "最低LP(単独除く)";
  //             break;
  //         case (int)ShutoffLblockTag.LpMin: // 最低LP(単独含む)
  //             columnName = "最低LP(単独含む)";
  //             break;
  //         case (int)ShutoffLblockTag.PowerFailureRate: // 停電率
  //             columnName = "停電率";
  //             break;
  //         case (int)ShutoffLblockTag.MpaMin: // 最低MPA
  //             columnName = "最低MPA";
  //             break;
  //         case (int)ShutoffLblockTag.MpbMin: // 最低MPB
  //             columnName = "最低MPB";
  //             break;
  //         case (int)ShutoffLblockTag.LeakEncounterRate: // 漏えい遭遇率
  //             columnName = "需要家漏えい遭遇率";
  //             break;
  //         case (int)ShutoffLblockTag.LpSupplyDmgCnt: // 本支管被害数(総数)
  //             columnName = "本支管被害数(総数)";
  //             break;
  //         case (int)ShutoffLblockTag.LpSupplyDmgCntEmergency: // 本支管被害数(緊急)
  //             columnName = "本支管被害数(緊急)";
  //             break;
  //         case (int)ShutoffLblockTag.LpAveConnected: // 平均LP（単独除く）
  //             columnName = "平均LP（単独除く）";
  //             break;
  //         case (int)ShutoffLblockTag.LpAve: // 平均LP（単独含む）
  //             columnName = "平均LP（単独含む）";
  //             break;
  //         case (int)ShutoffLblockTag.LqAlarmRate: // 液状化警報率
  //             columnName = "液状化警報率";
  //             break;
  //         case (int)ShutoffLblockTag.ComppartDstrRate: // 建物全半壊率
  //             columnName = "建物全半壊率";
  //             break;
  //         case (int)ShutoffLblockTag.FireCnt: // 火災件数
  //             columnName = "火災件数";
  //             break;
  //         case (int)ShutoffLblockTag.LeakCnt: // 漏えい受付
  //             columnName = "漏えい受付";
  //             break;
  //     }

  //     return columnName;
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面の項目名を返す
  // /// </summary>
  // /// <param name="tag">タグ</param>
  // /// <returns>項目名</returns>
  // private string GetShutoffReqStatusColumnName(int tag)
  // {
  //     string columnName = "";

  //     switch (tag)
  //     {
  //         case (int)ShutoffReqStatusTag.AreaName: // エリア
  //             columnName = "エリア";
  //             break;
  //         case (int)ShutoffReqStatusTag.BlockName: // ブロック番号
  //             columnName = "ブロック番号";
  //             break;
  //         case (int)ShutoffReqStatusTag.BlockCategory: // ブロック区分
  //             columnName = "ブロック区分";
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffBorderSi: // 遮断設定
  //             columnName = "遮断設定";
  //             break;
  //         case (int)ShutoffReqStatusTag.MaxSi: // 最大SI
  //             columnName = "最大SI";
  //             break;
  //         case (int)ShutoffReqStatusTag.CustomerCnt: // 総需要家件数
  //             columnName = "総需要家件数";
  //             break;
  //         case (int)ShutoffReqStatusTag.ContinueCustomerCnt: // 供給継続需要家件数
  //             columnName = "供給継続需要家件数";
  //             break;
  //         case (int)ShutoffReqStatusTag.GovernorStopRate: // ガバナ停止率
  //             columnName = "ガバナ停止率";
  //             break;
  //         case (int)ShutoffReqStatusTag.GovCnt: // ガバナ数
  //             columnName = "ガバナ数";
  //             break;
  //         case (int)ShutoffReqStatusTag.StopCnt: // 停止数
  //             columnName = "停止数";
  //             break;
  //         case (int)ShutoffReqStatusTag.ContinuanceCnt: // 継続数
  //             columnName = "継続数";
  //             break;
  //         case (int)ShutoffReqStatusTag.UnconfirmedCnt: // 未確認数
  //             columnName = "未確認数";
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffStatus: // 遠隔遮断実施状況
  //             columnName = "遠隔遮断実施状況";
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffTargetCnt: // 対象数
  //             columnName = "対象数";
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffSuccessCnt: // 成功数
  //             columnName = "成功数";
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffFailedCnt: // 失敗数
  //             columnName = "失敗数";
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffRequestedAt: // 依頼時刻
  //             columnName = "依頼時刻";
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffEndedAt: // 終了時刻
  //             columnName = "終了時刻";
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffUnableCnt: // TC不可
  //             columnName = "TC不可";
  //             break;
  //         case (int)ShutoffReqStatusTag.ShutoffDoneCnt: // 遮断済数
  //             columnName = "遮断済数";
  //             break;
  //     }

  //     return columnName;
  // }

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面の項目名を返す
  // /// </summary>
  // /// <param name="tag">タグ</param>
  // /// <returns>項目名</returns>
  // private string GetFeelEqShutoffStatusColumnName(int tag)
  // {
  //     string columnName = "";

  //     switch (tag)
  //     {
  //         case (int)FeelEqShutoffStatusTag.AreaName: // エリア
  //             columnName = "エリア";
  //             break;
  //         case (int)FeelEqShutoffStatusTag.SBlockName: // Sブロック番号
  //             columnName = "Sブロック番号";
  //             break;
  //         case (int)FeelEqShutoffStatusTag.ShutoffBorderSi: // 遮断設定
  //             columnName = "遮断設定";
  //             break;
  //         case (int)FeelEqShutoffStatusTag.ShutoffSi: // 感震遮断設定
  //             columnName = "感震遮断設定";
  //             break;
  //         case (int)FeelEqShutoffStatusTag.MaxSi: // 最大SI
  //             columnName = "最大SI";
  //             break;
  //         case (int)FeelEqShutoffStatusTag.CustomerCnt: // 総需要家件数
  //             columnName = "総需要家件数";
  //             break;
  //         case (int)FeelEqShutoffStatusTag.ContinueCustomerCnt: // 供給継続需要家件数
  //             columnName = "供給継続需要家件数";
  //             break;
  //         case (int)FeelEqShutoffStatusTag.GovernorStopRate: // ガバナ停止率
  //             columnName = "ガバナ停止率";
  //             break;
  //         case (int)FeelEqShutoffStatusTag.GovCnt: // ガバナ数
  //             columnName = "ガバナ数";
  //             break;
  //         case (int)FeelEqShutoffStatusTag.StopCnt: // 停止数
  //             columnName = "停止数";
  //             break;
  //         case (int)FeelEqShutoffStatusTag.ContinuanceCnt: // 継続数
  //             columnName = "継続数";
  //             break;
  //         case (int)FeelEqShutoffStatusTag.UnconfirmedCnt: // 未確認数
  //             columnName = "未確認数";
  //             break;
  //     }

  //     return columnName;
  // }

  // /// <summary>
  // /// 印刷ボタンクリック
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void PrintButton_Click(object sender, RoutedEventArgs e)
  // {
  //     controller.OpenPrintConfirm(this, "", false);
  // }
  // /// <summary>
  // /// 印刷実行
  // /// </summary>
  // /// <param name="printFlg"></param>
  // /// <param name="printPreview"></param>
  // public void PrintExecute(string printFlg, bool printPreview, int printingDivision)
  // {
  //     // CSVファイル
  //     string csv = "";
  //     // 印刷帳票ID
  //     string printId = "";
  //     // 印刷対象の行数の初期化
  //     printDataCnt = 0;
  //     // 印刷開始行数
  //     int excelDataStartRow = 0;

  //     if (USE_SHUTOFF_LBLOCK_LIST_PATTERN.Contains(nowPattern))
  //     {
  //         csv = GetPrintShutoffLblockCsv();
  //         printId = (nowViewPattern == (int)ShutoffBlockListConst.ShutoffBlockListPattern.ShutoffBlockDetailList) ? "sup003" : "sup024";
  //         excelDataStartRow = 19;
  //         // printId = "sup017"; // Sブロック用の印刷帳票
  //     }
  //     else if (nowPattern == (int)ShutoffBlockPattern.ShutoffReqSt)
  //     {
  //         csv = GetPrintShutoffReqStatusCsv();
  //         printId = "sup004";
  //         excelDataStartRow = 16;
  //     }
  //     else if (nowPattern == (int)ShutoffBlockPattern.FeelEqShutoffSt)
  //     {
  //         csv = GetPrintFeelEqShutoffStatusCsv();
  //         printId = "sup018";
  //         excelDataStartRow = 16;
  //     }
  //     else
  //         return;

  //     // コントロールファイル
  //     string ctl;
  //     ctl = string.Format("copy_layout,layout,{0},{1},1", printDataCnt, excelDataStartRow) + "\r\n";
  //     // 50行単位で制御する
  //     //ctl = string.Format("copy_layout,layout,{0},{1},50", printDataCnt / 50 + ((printDataCnt % 50 > 0) ? 1 : 0), excelDataStartRow) + "\r\n";
  //     if (printPreview) ctl += "print_preview\r\n";

  //     // 印刷区分設定
  //     ctl = CommonUtil.GetPrintingDivision(ctl, printingDivision);

  //     CommonUtil.WriteToPrintQue(printId, csv, ctl);
  // }

  // /// <summary>
  // /// 印刷実行(一括印刷用)
  // /// </summary>
  // /// <param name="printFlg"></param>
  // /// <param name="printPreview"></param>
  // public void PrintExecute(string printFlg, bool printPreview, bool allPrintFlg, int printingDivision)
  // {
  //     // CSVファイル
  //     string csv = "";
  //     // 印刷帳票ID
  //     string printId = "";
  //     // 印刷対象の行数の初期化
  //     printDataCnt = 0;
  //     // 印刷開始行数
  //     int excelDataStartRow = 0;

  //     // コントロールファイル
  //     string ctl = "";

  //     // 以下の2種類を出力する
  //     // "第1次緊急停止判断Lブロック";
  //     // "第2次緊急停止候補Lブロック";
  //     printId = "sup003"; // 詳細画面
  //     excelDataStartRow = 19;
  //     int savePattern = nowPattern;
  //     for (nowPattern = (int)ShutoffBlockPattern.FirstL; nowPattern <= (int)ShutoffBlockPattern.SecondL; nowPattern++)
  //     {
  //         csv = "";
  //         printDataCnt = 0;
  //         // 最新のデータを取得して
  //         // 各パターン毎に抽出&sortして画面を再描画
  //         ListRedraw();
  //         csv = GetPrintShutoffLblockCsv(nowPattern);
  //         ctl = string.Format("copy_layout,layout,{0},{1},1", printDataCnt, excelDataStartRow) + "\r\n";
  //         if (printPreview) ctl += "print_preview\r\n";

  //         // 印刷区分設定
  //         ctl = CommonUtil.GetPrintingDivision(ctl, printingDivision);

  //         CommonUtil.WriteToPrintQue(printId, csv, ctl);
  //     }
  //     nowPattern = savePattern;
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック)用のCSVファイルを作成
  // /// </summary>
  // public string GetPrintShutoffLblockCsv()
  // {
  //     return GetPrintShutoffLblockCsv(nowPattern);
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック)用のCSVファイルを作成
  // /// </summary>
  // /// <param name="pattern">対象パターン</param>
  // public string GetPrintShutoffLblockCsv(int pattern)
  // {
  //     string csv = "";
  //     List<FilterManager.SortCondition> sc = GetSortCondition(pattern);

  //     // 画面名
  //     string ListName = "ブロック遮断検討・操作";
  //     switch (pattern)
  //     {
  //         case (int)ShutoffBlockPattern.FirstL:
  //             ListName += " 第1次緊急停止判断Lブロック";
  //             break;
  //         case (int)ShutoffBlockPattern.SecondL:
  //             ListName += " 第2次緊急停止候補Lブロック";
  //             break;
  //         case (int)ShutoffBlockPattern.TsunamiL:
  //             ListName += " 津波ブロック";
  //             break;
  //         case (int)ShutoffBlockPattern.MpStopL:
  //             ListName += " TGCS中圧供給停止実施ブロック";
  //             break;
  //     }
  //     csv += ListName + "\r\n";

  //     // 表示順
  //     string sort = "";
  //     foreach (FilterManager.SortCondition s in sc.ToList())
  //     {
  //         if (sort != "") sort += ", ";
  //         sort += GetShutoffLblockColumnName(s.SortTag);
  //         sort += " " + (s.IsUp ? "昇順" : "降順");
  //     }
  //     csv += "\"" + sort + "\",";

  //     // 絞り込み条件
  //     string filterCondition = ShutoffBlockFilterConditionParts.FilterConditionPartsText.Text;
  //     csv += CommonUtil.EscapeCommaForPrint(filterCondition) + "\r\n";

  //     // 被害推定が完了しているかどうか
  //     bool isFirstDmgEstimationJudgeCompleted = controller.IsFirstDmgEstimationJudgeCompleted();

  //     foreach (var lv in lblockValList)
  //     {
  //         // 超過率塗りつぶし用
  //         var info = new OverKineRateInfo(lv);

  //         // ブロック種別
  //         csv += "L";
  //         // 停止試行
  //         csv += "," + (lv.LBlock.IsChecked ? "●" : "");
  //         // ブロック番号
  //         csv += "," + lv.LBlock.Name;
  //         // 停止判断
  //         csv += "," + lv.LabelJudgeResult;
  //         // 依頼状況
  //         csv += "," + lv.LabelShutoffStatus;
  //         // 総需要家件数
  //         csv += "," + lv.LBlock.CustomerCnt;
  //         // 供給継続需要家件数
  //         csv += "," + lv.ContinueCustomerCnt;
  //         // エリア
  //         csv += "," + lv.LBlock.AllAreaName;

  //         // ブロック区分
  //         csv += "," + CommonUtil.EscapeCommaForPrint(lv.LBlock.LabelBlockCategory);
  //         // 遮断設定
  //         csv += "," + lv.LBlock.ShutoffBorderSi;
  //         // Kブロック番号
  //         csv += "," + "\"" + lv.LBlock.AllKBlockName + "\"";
  //         // 漏えい遭遇率
  //         csv += "," + (isFirstDmgEstimationJudgeCompleted ? lv.LabelLeakEncounterRate : CommonUtil.GetNoData());
  //         // 本支管被害数(緊急)
  //         csv += "," + (isFirstDmgEstimationJudgeCompleted ? lv.LabelLpSupplyDmgCntEmergency.ToString() : CommonUtil.GetNoData());
  //         // 本支管被害数(累計)(緊急)
  //         csv += "," + (isFirstDmgEstimationJudgeCompleted ? lv.SumLpSupplyDmgCntEmergency.ToString() : CommonUtil.GetNoData());
  //         // 本支管被害数(総数)
  //         csv += "," + (isFirstDmgEstimationJudgeCompleted ? lv.LabelLpSupplyDmgCnt.ToString() : CommonUtil.GetNoData());
  //         // 本支管被害数(累計)(総数)
  //         csv += "," + (isFirstDmgEstimationJudgeCompleted ? lv.SumLpSupplyDmgCnt.ToString() : CommonUtil.GetNoData());
  //         // 代表局最大SI
  //         csv += "," + lv.LabelRepresentMaxSi;

  //         // 最大SI
  //         csv += "," + lv.LabelMaxSi;
  //         // 平均SI
  //         csv += "," + lv.LabelAveSi;

  //         // 感震遮断設定
  //         csv += "," + CommonUtil.EscapeCommaForPrint(lv.LBlock.LabelShutoffSi);
  //         // 30Kine超過率
  //         csv += "," + lv.LabelOver30KineRate;
  //         // 最大30Kine超過率
  //         csv += "," + lv.LabelMaxComAbleOver30KineRate;
  //         // 60Kine超過率
  //         csv += "," + lv.LabelOver60KineRate;
  //         // 最大60Kine超過率
  //         csv += "," + lv.LabelMaxComAbleOver60KineRate;
  //         // 70Kine超過率
  //         csv += "," + lv.LabelOver70KineRate;
  //         // 最大70Kine超過率
  //         csv += "," + lv.LabelMaxComAbleOver70KineRate;
  //         // 80Kine超過率
  //         csv += "," + lv.LabelOver80KineRate;
  //         // 最大80Kine超過率
  //         csv += "," + lv.LabelMaxComAbleOver80KineRate;
  //         // 90Kine超過率
  //         csv += "," + lv.LabelOver90KineRate;
  //         // 最大90Kine超過率
  //         csv += "," + lv.LabelMaxComAbleOver90KineRate;
  //         // ガバナ停止率
  //         csv += "," + lv.LabelGovernorStopRate;
  //         // 最低LP（単独除く）
  //         csv += "," + lv.LabelLpMinConnected;
  //         // 最低LP（単独含む）
  //         csv += "," + lv.LabelLpMin;
  //         // 平均LP（単独除く）
  //         csv += "," + lv.LabelLpAveConnected;
  //         // 平均LP（単独含む）
  //         csv += "," + lv.LabelLpAve;
  //         // 最低MPA
  //         csv += "," + lv.LabelMpaMin;
  //         // 最低MPB
  //         csv += "," + lv.LabelMpbMin;
  //         // 液状化警報率
  //         csv += "," + lv.LabelLqAlarmRate;
  //         // 平均PL
  //         csv += "," + (isFirstDmgEstimationJudgeCompleted ? lv.LabelAvePl : CommonUtil.GetNoData());
  //         // 復旧状況
  //         csv += "," + lv.LabelRestorationWorkStatus;
  //         // 遠隔D復旧Sブロック
  //         csv += "," + lv.LabelExistRemoteOpenSBlock;
  //         // 停電率
  //         csv += "," + lv.LabelPowerFailureRate;
  //         // 火災件数
  //         csv += "," + lv.LabelFireCnt;
  //         // 漏えい受付
  //         csv += "," + lv.LabelLeakCnt;
  //         // 建物全半壊率
  //         csv += "," + (isFirstDmgEstimationJudgeCompleted ? lv.LabelComppartDstrRate : CommonUtil.GetNoData());
  //         // 超過率塗りつぶし種別
  //         csv += "," + (int)info.fillOverKineRateType;
  //         csv += "," + (int)info.fillMaxComAbleOverKineRateType;
  //         csv += "\r\n";

  //         printDataCnt += 1;

  //         // 階層Sブロック
  //         if (shutoffLblockLayerOnLblockId == lv.Key.ToString())
  //         {
  //             foreach (var sv in sblockValList.Where(o => o.LBlockId == lv.Key))
  //             {
  //                 // ブロック種別
  //                 csv += "S";
  //                 // 停止試行  ※ 存在しない
  //                 csv += ",";
  //                 // ブロック番号
  //                 csv += "," + sv.SBlock.Name;
  //                 // 停止判断  ※ 存在しない
  //                 csv += ",";
  //                 // 依頼状況
  //                 csv += "," + sv.LabelShutoffStatus;
  //                 // 総需要家件数
  //                 csv += "," + sv.SBlock.CustomerCnt;
  //                 // 供給継続需要家件数
  //                 csv += "," + sv.ContinueCustomerCnt;
  //                 // エリア
  //                 csv += "," + sv.SBlock.AllAreaName;
  //                 // ブロック区分 ※ 存在しない
  //                 csv += ",";
  //                 // 遮断設定
  //                 csv += ",";
  //                 // Kブロック番号 ※ 存在しない
  //                 csv += ",";
  //                 // 漏えい遭遇率
  //                 csv += "," + (isFirstDmgEstimationJudgeCompleted ? sv.LabelLeakEncounterRate : CommonUtil.GetNoData());
  //                 // 本支管被害数(緊急)
  //                 csv += "," + (isFirstDmgEstimationJudgeCompleted ? sv.LabelLpSupplyDmgCntEmergency.ToString() : CommonUtil.GetNoData());
  //                 // 本支管被害数(累計)(緊急)  ※ 存在しない
  //                 csv += ",";
  //                 // 本支管被害数(総数)
  //                 csv += "," + (isFirstDmgEstimationJudgeCompleted ? sv.LabelLpSupplyDmgCnt.ToString() : CommonUtil.GetNoData());
  //                 // 本支管被害数(累計)(総数)  ※ 存在しない
  //                 csv += ",";
  //                 // 代表局最大SI　※存在しない
  //                 csv += ",";
  //                 // 最大SI
  //                 csv += "," + sv.LabelMaxSi;
  //                 // 平均SI
  //                 csv += "," + sv.LabelAveSi;
  //                 // 感震遮断設定
  //                 csv += "," + CommonUtil.EscapeCommaForPrint(sv.SBlock.LabelShutoffSi);
  //                 // 30Kine超過率
  //                 csv += ",";
  //                 // 最大30Kine超過率
  //                 csv += ",";
  //                 // 60Kine超過率
  //                 csv += ",";
  //                 // 最大60Kine超過率
  //                 csv += ",";
  //                 // 70Kine超過率
  //                 csv += ",";
  //                 // 最大70Kine超過率
  //                 csv += ",";
  //                 // 80Kine超過率
  //                 csv += ",";
  //                 // 最大80Kine超過率
  //                 csv += ",";
  //                 // 90Kine超過率
  //                 csv += ",";
  //                 // 最大90Kine超過率
  //                 csv += ",";
  //                 // ガバナ停止率
  //                 csv += "," + sv.LabelGovernorStopRate;
  //                 // 最低LP（単独除く）
  //                 csv += "," + sv.LabelLpMinConnected;
  //                 // 最低LP（単独含む）
  //                 csv += "," + sv.LabelLpMin;
  //                 // 平均LP（単独除く）
  //                 csv += "," + sv.LabelLpAveConnected;
  //                 // 平均LP（単独含む）
  //                 csv += "," + sv.LabelLpAve;
  //                 // 最低MPA
  //                 csv += "," + sv.LabelMpaMin;
  //                 // 最低MPB
  //                 csv += "," + sv.LabelMpbMin;
  //                 // 液状化警報率
  //                 csv += "," + sv.LabelLqAlarmRate;
  //                 // 平均PL
  //                 csv += ",";
  //                 // 復旧状況
  //                 csv += "," + sv.LabelRestorationWorkStatus;
  //                 // 遠隔D復旧Sブロック
  //                 csv += "," + sv.LabelRemoteOpenCompleted;
  //                 // 停電率
  //                 csv += "," + sv.LabelPowerFailureRate;
  //                 // 火災件数
  //                 csv += "," + sv.LabelFireCnt2;
  //                 // 漏えい受付
  //                 csv += "," + sv.LabelLeakCnt2;
  //                 // 建物全半壊率
  //                 csv += "," + (isFirstDmgEstimationJudgeCompleted ? sv.LabelComppartDstrRate : CommonUtil.GetNoData());
  //                 // 超過率塗りつぶし種別
  //                 csv += "," + (int)FillOverKineRateType.None;
  //                 csv += "," + (int)FillOverKineRateType.None;
  //                 csv += "\r\n";

  //                 printDataCnt += 1;
  //             }
  //         }
  //     }

  //     return csv;
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面用のCSVファイルを作成
  // /// </summary>
  // public string GetPrintShutoffReqStatusCsv()
  // {
  //     string csv = "";
  //     List<FilterManager.SortCondition> sc = GetSortCondition(nowPattern);

  //     // 画面名
  //     string ListName = "遮断結果依頼状況確認";
  //     csv += ListName + "\r\n";

  //     // 表示順
  //     string sort = "";
  //     foreach (FilterManager.SortCondition s in sc.ToList())
  //     {
  //         if (sort != "") sort += ", ";
  //         sort += GetShutoffReqStatusColumnName(s.SortTag);
  //         sort += " " + (s.IsUp ? "昇順" : "降順");
  //     }
  //     csv += "\"" + sort + "\",";

  //     // 絞り込み条件
  //     string filterCondition = ShutoffBlockFilterConditionParts.FilterConditionPartsText.Text;
  //     csv += CommonUtil.EscapeCommaForPrint(filterCondition) + "\r\n";

  //     foreach (var lv in lblockValList)
  //     {
  //         // ブロック種別
  //         csv += "L";
  //         // エリア
  //         csv += "," + lv.LBlock.AllAreaName;
  //         // ブロック番号
  //         csv += "," + lv.LBlock.Name;
  //         // 総需要家件数
  //         csv += "," + lv.LBlock.CustomerCnt;
  //         // 供給継続需要家件数
  //         csv += "," + lv.ContinueCustomerCnt;
  //         // ブロック区分
  //         csv += "," + CommonUtil.EscapeCommaForPrint(lv.LBlock.LabelBlockCategory);
  //         // 遮断設定
  //         csv += "," + lv.LBlock.ShutoffBorderSi;
  //         // 最大SI
  //         csv += "," + lv.LabelMaxSi;
  //         // ガバナ停止率
  //         csv += "," + lv.LabelGovernorStopRate;
  //         // ガバナ数
  //         csv += "," + lv.GovCnt;
  //         // 停止数
  //         csv += "," + lv.StopCnt;
  //         // 継続数
  //         csv += "," + lv.ContinuanceCnt;
  //         // 未確認数
  //         csv += "," + lv.UnconfirmedCnt;
  //         // 遠隔遮断実施状況
  //         csv += "," + lv.LabelShutoffStatus;
  //         // 対象数
  //         csv += "," + lv.ShutoffTargetCnt.ToString();
  //         // 成功数
  //         csv += "," + lv.ShutoffSuccessCnt.ToString();
  //         // 失敗数
  //         csv += "," + lv.ShutoffFailedCnt.ToString();
  //         // 依頼時刻
  //         csv += "," + lv.LabelShutoffRequestedAt;
  //         // 終了時刻
  //         csv += "," + lv.LabelShutoffEndedAt;
  //         // TC不可
  //         csv += "," + lv.ShutoffUnableCnt.ToString();
  //         // 遮断済数
  //         csv += "," + lv.ShutoffDoneCnt.ToString();
  //         csv += "\r\n";

  //         printDataCnt += 1;

  //         // 階層Sブロック
  //         if (shutoffReqStatusLayerOnLblockId == lv.Key.ToString())
  //         {
  //             foreach (var sv in sblockValList.Where(o => o.LBlockId == lv.Key))
  //             {
  //                 // ブロック種別
  //                 csv += "S";
  //                 // エリア
  //                 csv += "," + sv.SBlock.AllAreaName;
  //                 // ブロック番号
  //                 csv += "," + sv.SBlock.Name;
  //                 // 総需要家件数
  //                 csv += "," + sv.SBlock.CustomerCnt;
  //                 // 供給継続需要家件数
  //                 csv += "," + sv.ContinueCustomerCnt;
  //                 // ブロック区分  ※ 存在しない
  //                 csv += ",";
  //                 // 遮断設定
  //                 csv += ",";
  //                 // 最大SI
  //                 csv += "," + sv.LabelMaxSi;
  //                 // ガバナ停止率
  //                 csv += "," + sv.LabelGovernorStopRate;
  //                 // ガバナ数
  //                 csv += "," + sv.GovCnt;
  //                 // 停止数
  //                 csv += "," + sv.StopCnt;
  //                 // 継続数
  //                 csv += "," + sv.ContinuanceCnt;
  //                 // 未確認数
  //                 csv += "," + sv.UnconfirmedCnt;
  //                 // 遠隔遮断実施状況  ※ 存在しない
  //                 csv += ",";
  //                 // 対象数  ※ 存在しない
  //                 csv += ",";
  //                 // 成功数  ※ 存在しない
  //                 csv += ",";
  //                 // 失敗数  ※ 存在しない
  //                 csv += ",";
  //                 // 依頼時刻  ※ 存在しない
  //                 csv += ",";
  //                 // 終了時刻  ※ 存在しない
  //                 csv += ",";
  //                 // TC不可  ※ 存在しない
  //                 csv += ",";
  //                 // 遮断済数  ※ 存在しない
  //                 csv += ",";
  //                 csv += "\r\n";

  //                 printDataCnt += 1;
  //             }
  //         }
  //     }

  //     return csv;
  // }

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面用のCSVファイルを作成
  // /// </summary>
  // public string GetPrintFeelEqShutoffStatusCsv()
  // {
  //     string csv = "";
  //     List<FilterManager.SortCondition> sc = GetSortCondition(nowPattern);

  //     // 画面名
  //     string ListName = "感震遮断Sブロック状況確認";
  //     csv += ListName + "\r\n";

  //     // 表示順
  //     string sort = "";
  //     foreach (FilterManager.SortCondition s in sc.ToList())
  //     {
  //         if (sort != "") sort += ", ";
  //         sort += GetFeelEqShutoffStatusColumnName(s.SortTag);
  //         sort += " " + (s.IsUp ? "昇順" : "降順");
  //     }
  //     csv += "\"" + sort + "\",";

  //     // 絞り込み条件
  //     string filterCondition = ShutoffBlockFilterConditionParts.FilterConditionPartsText.Text;
  //     csv += CommonUtil.EscapeCommaForPrint(filterCondition) + "\r\n";

  //     foreach (var sv in sblockValList)
  //     {
  //         // エリア
  //         csv += sv.SBlock.AllAreaName;
  //         // Sブロック番号
  //         csv += "," + sv.SBlock.Name;
  //         // 総需要家件数
  //         csv += "," + sv.SBlock.CustomerCnt;
  //         // 供給継続需要家件数
  //         csv += "," + sv.ContinueCustomerCnt;
  //         // 遮断設定
  //         csv += "," + sv.LBlockVal.LBlock.ShutoffBorderSi;
  //         // 感震遮断設定
  //         csv += "," + CommonUtil.EscapeCommaForPrint(sv.SBlock.LabelShutoffSi);
  //         // 最大SI
  //         csv += "," + sv.LabelMaxSi;
  //         // ガバナ停止率
  //         csv += "," + sv.LabelGovernorStopRate;
  //         // ガバナ数
  //         csv += "," + sv.GovCnt;
  //         // 停止数
  //         csv += "," + sv.StopCnt;
  //         // 継続数
  //         csv += "," + sv.ContinuanceCnt;
  //         // 未確認数
  //         csv += "," + sv.UnconfirmedCnt;
  //         csv += "\r\n";

  //         printDataCnt += 1;
  //     }

  //     return csv;
  // }

  // /// <summary>
  // /// 印刷実行(Lブロック停止実施連絡書)
  // /// </summary>
  // /// <param name="printFlg"></param>
  // /// <param name="printPreview"></param>
  // public void PrintExecute2(string printFlg, bool printPreview, int printingDivision)
  // {
  //     // 停止実施連絡書の印刷
  //     // ただし、遮断可能なブロックが配下にない場合は除く
  //     string shutoffBlockName1 = "", shutoffBlockName2 = "";
  //     var shutoffLBlockValList = lblockValList.Where(o => o.LBlock.IsCheckedForPrint);
  //     foreach (LBlockValModel lv in shutoffLBlockValList)
  //     {
  //         // 1次判断結果と2次は、1次判断画面からの印刷帳票として1つにまとめる
  //         if (lv.isShutoffFirstTarget)
  //         {
  //             shutoffBlockName1 += (shutoffBlockName1 != "" ? "," : "") + lv.LBlock.Name;
  //         }
  //         else
  //         {
  //             shutoffBlockName2 += (shutoffBlockName2 != "" ? "," : "") + lv.LBlock.Name;
  //         }
  //     }

  //     controller.Print015ForLblockShutoff(shutoffBlockName1, shutoffBlockName2, printPreview, printingDivision);

  //     foreach (var lv in shutoffLBlockValList) lv.LBlock.IsCheckedForPrint = false;
  // }

  // /// <summary>
  // /// 印刷実行(Sブロック停止実施連絡書)
  // /// </summary>
  // /// <param name="printFlg"></param>
  // /// <param name="printPreview"></param>
  // public void SblockPrintExecute2(string printFlg, bool printPreview, int printingDivision)
  // {
  //     // 停止実施連絡書の印刷
  //     string shutoffBlockName = "";
  //     var shutoffSBlockValList = sblockValList.Where(o => o.SBlock.IsChecked);
  //     foreach (SBlockValModel sv in shutoffSBlockValList)
  //     {
  //         // 停止実施連絡書印刷対象のブロック名を設定
  //         shutoffBlockName += (shutoffBlockName != "" ? "," : "") + sv.SBlock.Name;
  //     }

  //     controller.Print015ForSblockShutoff(shutoffBlockName, printPreview, printingDivision);
  // }

  // /// <summary>
  // /// パターン設定
  // /// </summary>
  // private void JudgeExistPattern()
  // {
  //     List<LBlockValModel> lv = ModelManager.GetList<LBlockValModel>(o => o.KBlockNo < controller.GetInvalidKBlockNo());
  //     List<SBlockValModel> sv = ModelManager.GetList<SBlockValModel>(o => o.SBlock != null && o.KBlockNo < controller.GetInvalidKBlockNo());
  //     // 遠隔遮断実施画面(Lブロック)
  //     bool existFirstL = lv.Where(o => o.isShutoffFirstTarget).Count() > 0;
  //     bool existSecondL = lv.Where(o => !o.isShutoffFirstTarget).Count() > 0;
  //     bool existTsunamiL = lv.Where(o => o.LBlock.IsTsunami == true).Count() > 0;
  //     bool existMpStopL = lv.Where(o => o.isMpStopKBlock == true).Count() > 0;

  //     SetPattern((int)ShutoffBlockPattern.FirstL, existFirstL);
  //     SetPattern((int)ShutoffBlockPattern.SecondL, existSecondL);
  //     SetPattern((int)ShutoffBlockPattern.TsunamiL, existTsunamiL);
  //     SetPattern((int)ShutoffBlockPattern.MpStopL, existMpStopL);
  //     // 遠隔遮断依頼状況確認画面
  //     bool existShutoffReqSt = lv.Where(o => o.ShutoffStatus != ShutoffState.None).Count() > 0;
  //     SetPattern((int)ShutoffBlockPattern.ShutoffReqSt, existShutoffReqSt);
  //     // 感震遮断Sブロック状況確認画面
  //     bool existFeelEqShutoffSt = sv.Where(o => o.IsFeelEqShutoff).Count() > 0;
  //     SetPattern((int)ShutoffBlockPattern.FeelEqShutoffSt, existFeelEqShutoffSt);

  //     CheckSheetButton.Visibility = Visibility.Visible;
  //     if (nowPattern == -1)
  //     {
  //         nowPattern = (int)ShutoffBlockPattern.FirstL;
  //         CheckSheetButton.Visibility = Visibility.Collapsed;
  //         OperationHistoryButton.Margin = CheckSheetButton.Margin;

  //         // 一覧の選択状態を設定
  //         if (nowPattern != -1) { PatternChangeEvent(string.Format(PATTERN_BORDER_KEY_STRING, nowPattern)); }
  //     }
  //     switch (nowPattern)
  //     {
  //         case (int)ShutoffBlockPattern.FirstL:
  //             CheckSheetButton.Visibility = Visibility.Collapsed;
  //             OperationHistoryButton.Margin = CheckSheetButton.Margin;
  //             App.Current.Logger.sendTraceLog(controller.isTraceLogTargetTermNo, "ShutoffFirstLList_PatternChanged");
  //             break;
  //         case (int)ShutoffBlockPattern.SecondL:
  //             App.Current.Logger.sendTraceLog(controller.isTraceLogTargetTermNo, "ShutoffSecondLList_PatternChanged");
  //             break;
  //         case (int)ShutoffBlockPattern.TsunamiL:
  //             App.Current.Logger.sendTraceLog(controller.isTraceLogTargetTermNo, "ShutoffTsunamiLList_PatternChanged");
  //             break;
  //         case (int)ShutoffBlockPattern.MpStopL:
  //             App.Current.Logger.sendTraceLog(controller.isTraceLogTargetTermNo, "ShutoffMpStopLList_PatternChanged");
  //             break;
  //         case (int)ShutoffBlockPattern.ShutoffReqSt:
  //             App.Current.Logger.sendTraceLog(controller.isTraceLogTargetTermNo, "ShutoffShutoffReqStList_PatternChanged");
  //             break;
  //         case (int)ShutoffBlockPattern.FeelEqShutoffSt:
  //             App.Current.Logger.sendTraceLog(controller.isTraceLogTargetTermNo, "ShutoffFeelEqShutoffStList_PatternChanged");
  //             break;
  //     }

  //     if (USE_SHUTOFF_LBLOCK_LIST_PATTERN.Contains(nowPattern))
  //     {
  //         CommentStackPanel.Visibility = Visibility.Visible;
  //         ShutoffBlockListGrid.RowDefinitions[2].Height = new GridLength(25);
  //         if (nowPattern == (int)ShutoffBlockPattern.TsunamiL)
  //         {
  //             TsunamiCommentLine.Visibility = Visibility.Visible;
  //             BranchCommentLine.Visibility = Visibility.Collapsed;
  //         }
  //         else
  //         {
  //             TsunamiCommentLine.Visibility = Visibility.Collapsed;
  //             BranchCommentLine.Visibility = Visibility.Visible;
  //         }

  //         SortLeakEncounterRateStackPanel.Visibility = Visibility.Visible;
  //         SelectOverOutageStackPanel.Visibility = Visibility.Visible;
  //         ShutoffBlockListGrid.RowDefinitions[4].Height = new GridLength(25);
  //     }
  //     else
  //     {
  //         CommentStackPanel.Visibility = Visibility.Collapsed;
  //         ShutoffBlockListGrid.RowDefinitions[2].Height = new GridLength(0);

  //         SortLeakEncounterRateStackPanel.Visibility = Visibility.Collapsed;
  //         SelectOverOutageStackPanel.Visibility = Visibility.Collapsed;
  //         ShutoffBlockListGrid.RowDefinitions[4].Height = new GridLength(0);
  //     }

  //     if (nowViewPattern == -1)
  //     {
  //         nowViewPattern = (int)ShutoffBlockListConst.ShutoffBlockListPattern.ShutoffBlockSimpleList;
  //         // 一覧の選択状態を設定
  //         ViewPatternChangeEvent(string.Format(ShutoffBlockListConst.PATTERN_BORDER_KEY_STRING, nowViewPattern));
  //     }
  //     switch (nowViewPattern)
  //     {
  //         case (int)ShutoffBlockListConst.ShutoffBlockListPattern.ShutoffBlockSimpleList:
  //             App.Current.Logger.sendTraceLog(controller.isTraceLogTargetTermNo, "ShutoffBlockList(Simple)_PatternChanged");
  //             break;
  //         case (int)ShutoffBlockListConst.ShutoffBlockListPattern.ShutoffBlockDetailList:
  //             App.Current.Logger.sendTraceLog(controller.isTraceLogTargetTermNo, "ShutoffBlockList(Detail)_PatternChanged");
  //             break;
  //     }
  // }

  // /// <summary>
  // /// パターンボーダークリックイベントハンドラ
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void PatternBorder_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
  // {
  //     Border b = sender as Border;
  //     if (b == null) return;

  //     PatternChangeEvent(b.Name);
  // }

  // /// <summary>
  // /// パターン変更イベント
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // public void PatternChangeEvent(string borderName)
  // {
  //     patternPageDic[nowPattern] = Pagenate.GetPageNum();
  //     int beforePattern = nowPattern;
  //     nowPattern = int.Parse(borderName.Split('_')[1]);
  //     int pagenateNum = 0;

  //     ResetPatternColor();
  //     ChangePatternSelectedColor(borderName);

  //     switch (nowPattern)
  //     {
  //         case (int)ShutoffBlockPattern.FirstL:
  //             pagenateNum = (int)PatternPagenateNum.FirstL;
  //             break;
  //         case (int)ShutoffBlockPattern.SecondL:
  //             pagenateNum = (int)PatternPagenateNum.SecondL;
  //             break;
  //         case (int)ShutoffBlockPattern.TsunamiL:
  //             pagenateNum = (int)PatternPagenateNum.TsunamiL;
  //             break;
  //         case (int)ShutoffBlockPattern.MpStopL:
  //             pagenateNum = (int)PatternPagenateNum.MpStopL;
  //             break;
  //         case (int)ShutoffBlockPattern.ShutoffReqSt:
  //             pagenateNum = (int)PatternPagenateNum.ShutoffReqSt;
  //             break;
  //         case (int)ShutoffBlockPattern.FeelEqShutoffSt:
  //             pagenateNum = (int)PatternPagenateNum.FeelEqShutoffSt;
  //             break;
  //     }

  //     // 一覧の設定
  //     ShutoffLblockGrid.Visibility = ShutoffBlockListPatternGrid.Visibility = (USE_SHUTOFF_LBLOCK_LIST_PATTERN.Contains(nowPattern)) ? Visibility.Visible : Visibility.Collapsed;
  //     FeelEqShutoffStatusGrid.Visibility = (nowPattern == (int)ShutoffBlockPattern.FeelEqShutoffSt) ? Visibility.Visible : Visibility.Collapsed;
  //     ShutoffReqStatusGrid.Visibility = (nowPattern == (int)ShutoffBlockPattern.ShutoffReqSt) ? Visibility.Visible : Visibility.Collapsed;

  //     // 階層表示対象LブロックIDを初期化
  //     shutoffLblockLayerOnLblockId = "";
  //     shutoffReqStatusLayerOnLblockId = "";

  //     // 今回のキーでソート実行
  //     List<FilterManager.SortCondition> nowSc = GetSortCondition(nowPattern);
  //     List<FilterManager.SortCondition> beforeSc = GetSortCondition(beforePattern);
  //     if (USE_SHUTOFF_LBLOCK_LIST_PATTERN.Contains(nowPattern))
  //     {

  //         if (beforeSc != null)
  //         {
  //             // 前の項目の強調表示を元に戻す
  //             Canvas c = (ShutoffLblockGrid.FindName(string.Format(GlobalConst.SORT_BORDER_CANVAS_KEY_STRING, beforeSc.Last().SortTag)) as Canvas);
  //             if (c != null) c.Visibility = Visibility.Collapsed;
  //             GradientStop nowGs = ShutoffLblockGrid.FindName(string.Format(GlobalConst.SORT_BORDER_GRADIENT_KEY_STRING, beforeSc.Last().SortTag)) as GradientStop;
  //             if (nowGs != null) { nowGs.Color = SupColors.HeaderCanvasColor; }
  //         }
  //         ShutoffLblock_GridSort(nowSc, nowPattern);
  //     }
  //     else if (nowPattern == (int)ShutoffBlockPattern.ShutoffReqSt)
  //         ShutoffReqStatus_GridSort(nowSc);
  //     else if (nowPattern == (int)ShutoffBlockPattern.FeelEqShutoffSt)
  //         FeelEqShutoffStatus_GridSort(nowSc);

  //     // ページネートの設定
  //     Pagenate.SetPagenateNum(pagenateNum);
  //     Pagenate.SetPageNum(patternPageDic[nowPattern]);

  //     if (beforePattern == (int)ShutoffBlockPattern.FirstL ||
  //         beforePattern == (int)ShutoffBlockPattern.SecondL ||
  //         beforePattern == (int)ShutoffBlockPattern.TsunamiL ||
  //         beforePattern == (int)ShutoffBlockPattern.MpStopL)
  //     {
  //         // 全選択チェックボックスのチェックを外す
  //         UncheckAllShutoff();
  //         // チェックボックスのチェックを外す
  //         if (lblockValList != null)
  //         {
  //             foreach (var checkBlockList in lblockValList.Where(o => o.LBlock.IsChecked))
  //             {
  //                 UncheckShutoffLblockId(checkBlockList.LBlockId);
  //             }
  //         }
  //     }
  //     ListRedraw(nowPattern);
  // }

  // /// <summary>
  // /// 指定したパターンの背景色を選択状態のものにする
  // /// </summary>
  // /// <param name="b"></param>
  // /// <param name="isSet"></param>
  // private void ChangePatternSelectedColor(string borderName)
  // {
  //     Border b = PatternGrid.FindName(borderName) as Border;
  //     if (b != null)
  //     {
  //         b.Background = PATTERN_SELECTED_BORDER_COLOR;
  //         TextBlock tb = b.Child as TextBlock;
  //         if (tb != null)
  //             tb.Foreground = PATTERN_SELECTED_TEXT_COLOR;
  //     }
  // }

  // /// <summary>
  // /// パターンの背景色を戻す
  // /// </summary>
  // /// <param name="b"></param>
  // /// <param name="isSet"></param>
  // private void ResetPatternColor()
  // {
  //     for (int i = 0; i < CommonUtil.GetEnumLength<ShutoffBlockPattern>(); i++)
  //     {
  //         string borderName = string.Format(PATTERN_BORDER_KEY_STRING, i + 1);
  //         Border b = PatternGrid.FindName(borderName) as Border;
  //         if (b != null)
  //         {
  //             b.Background = PATTERN_DEFAULT_BORDER_COLOR;
  //             TextBlock tb = b.Child as TextBlock;
  //             if (tb != null)
  //                 tb.Foreground = (tb.Text == PATTERN_EXIST_TEXT) ? PATTERN_DEFAULT_TEXT_LINK_COLOR : PATTERN_DEFAULT_TEXT_COLOR;
  //         }
  //     }
  // }

  // /// <summary>
  // /// パターンが存在有無表示を設定する
  // /// </summary>
  // /// <param name="patternNum">パターン番号</param>
  // /// <param name="isSet"></param>
  // private void SetPattern(int patternNum, bool isSet)
  // {
  //     Border b = (PatternGrid.FindName(string.Format(PATTERN_BORDER_KEY_STRING, patternNum)) as Border);
  //     if (b != null)
  //     {
  //         // クリックイベントを削除
  //         b.MouseLeftButtonDown -= PatternBorder_MouseLeftButtonDown;

  //         if (isSet)
  //         {
  //             b.Cursor = Cursors.Hand;
  //             TextBlock tb = b.Child as TextBlock;
  //             if (tb != null)
  //             {
  //                 tb.Text = PATTERN_EXIST_TEXT;
  //                 tb.Foreground = (patternNum == nowPattern) ? PATTERN_SELECTED_TEXT_COLOR : PATTERN_DEFAULT_TEXT_LINK_COLOR;
  //                 tb.TextDecorations = TextDecorations.Underline;
  //             }
  //         }
  //         else
  //         {
  //             b.Cursor = null;
  //             TextBlock tb = b.Child as TextBlock;
  //             if (tb != null)
  //             {
  //                 tb.Text = PATTERN_NOT_EXIST_TEXT;
  //                 tb.Foreground = (patternNum == nowPattern) ? PATTERN_SELECTED_TEXT_COLOR : PATTERN_DEFAULT_TEXT_LINK_COLOR;
  //                 tb.TextDecorations = null;
  //             }
  //         }
  //         // クリックイベント追加
  //         b.MouseLeftButtonDown += PatternBorder_MouseLeftButtonDown;
  //     }
  // }

  // /// <summary>
  // /// 画面の有効/無効切り替え時
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void ShutoffBlock_IsEnabledChanged(object sender, DependencyPropertyChangedEventArgs e)
  // {
  //     if ((bool)e.NewValue)
  //     {
  //         Visibility = Visibility.Visible;
  //         // Sブロックラインを表示する
  //         controller.ChangeMapViewSBlockLineCheck(true);
  //         ListRedraw(nowPattern);
  //         switch (nowPattern)
  //         {
  //             case (int)ShutoffBlockPattern.FirstL:
  //                 App.Current.Logger.sendTraceLog(controller.isTraceLogTargetTermNo, "ShutoffFirstLList_Enabled");
  //                 break;
  //             case (int)ShutoffBlockPattern.SecondL:
  //                 App.Current.Logger.sendTraceLog(controller.isTraceLogTargetTermNo, "ShutoffSecondLList_Enabled");
  //                 break;
  //             case (int)ShutoffBlockPattern.TsunamiL:
  //                 App.Current.Logger.sendTraceLog(controller.isTraceLogTargetTermNo, "ShutoffTsunamiLList_Enabled");
  //                 break;
  //             case (int)ShutoffBlockPattern.MpStopL:
  //                 App.Current.Logger.sendTraceLog(controller.isTraceLogTargetTermNo, "ShutoffMpStopLList_Enabled");
  //                 break;
  //             case (int)ShutoffBlockPattern.ShutoffReqSt:
  //                 App.Current.Logger.sendTraceLog(controller.isTraceLogTargetTermNo, "ShutoffShutoffReqStList_Enabled");
  //                 break;
  //             case (int)ShutoffBlockPattern.FeelEqShutoffSt:
  //                 App.Current.Logger.sendTraceLog(controller.isTraceLogTargetTermNo, "ShutoffFeelEqShutoffStList_Enabled");
  //                 break;
  //         }
  //     }
  //     else
  //     {
  //         Visibility = Visibility.Collapsed;
  //         // 階層表示対象LブロックIDを初期化
  //         shutoffLblockLayerOnLblockId = "";
  //         shutoffReqStatusLayerOnLblockId = "";

  //         if (nowPattern == (int)ShutoffBlockPattern.FirstL ||
  //             nowPattern == (int)ShutoffBlockPattern.SecondL ||
  //             nowPattern == (int)ShutoffBlockPattern.TsunamiL ||
  //             nowPattern == (int)ShutoffBlockPattern.MpStopL)
  //         {
  //             // 全選択チェックボックスのチェックを外す
  //             UncheckAllShutoff();
  //             // チェックボックスのチェックを外す
  //             if (lblockValList != null)
  //             {
  //                 foreach (var checkBlockList in lblockValList.Where(o => o.LBlock.IsChecked))
  //                 {
  //                     UncheckShutoffLblockId(checkBlockList.LBlockId);
  //                 }
  //             }
  //         }
  //         // Lブロック第2次停止チェックシートが開いていたら閉じる
  //         controller.CloseCheckSheet();
  //     }
  // }

  // /// <summary>
  // /// パターンボーダークリックイベントハンドラ
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void ViewPatternBorder_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
  // {
  //     Border b = sender as Border;
  //     if (b == null) return;

  //     ViewPatternChangeEvent(b.Name);
  // }

  // /// <summary>
  // /// パターン変更イベント(簡易・詳細切替)
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // public void ViewPatternChangeEvent(string borderName)
  // {
  //     int beforePattern = nowViewPattern;
  //     nowViewPattern = int.Parse(borderName.Split('_')[1]);

  //     // 今回のキーでソート実行
  //     List<FilterManager.SortCondition> nowSc = GetSortCondition(nowPattern);
  //     ShutoffLblock_GridSort(nowSc, nowPattern);

  //     ViewResetPatternColor();
  //     if (nowViewPattern != -1) ViewChangePatternSelectedColor(borderName);
  //     ListRedraw(nowPattern);
  // }

  // /// <summary>
  // /// 指定したパターンの背景色を選択状態のものにする
  // /// </summary>
  // /// <param name="b"></param>
  // /// <param name="isSet"></param>
  // private void ViewChangePatternSelectedColor(string borderName)
  // {
  //     Border b = ShutoffBlockListPatternGrid.FindName(borderName) as Border;
  //     if (b != null)
  //     {
  //         b.Background = PATTERN_SELECTED_BORDER_COLOR;
  //         TextBlock tb = b.Child as TextBlock;
  //         if (tb != null)
  //             tb.Foreground = PATTERN_SELECTED_TEXT_COLOR;
  //     }
  // }

  // /// <summary>
  // /// パターンの背景色を戻す
  // /// </summary>
  // /// <param name="b"></param>
  // /// <param name="isSet"></param>
  // private void ViewResetPatternColor()
  // {
  //     for (int i = 0; i < CommonUtil.GetEnumLength<ShutoffBlockListConst.ShutoffBlockListPattern>(); i++)
  //     {
  //         string borderName = string.Format(ShutoffBlockListConst.PATTERN_BORDER_KEY_STRING, i + 1);
  //         Border b = ShutoffBlockListPatternGrid.FindName(borderName) as Border;
  //         if (b != null)
  //         {
  //             b.Background = PATTERN_DEFAULT_BORDER_COLOR;
  //             TextBlock tb = b.Child as TextBlock;
  //             if (tb != null)
  //                 tb.Foreground = PATTERN_DEFAULT_TEXT_LINK_COLOR;
  //         }
  //     }
  // }

  // /// <summary>
  // /// パターンが存在有無表示を設定する
  // /// </summary>
  // /// <param name="patternNum">パターン番号</param>
  // private void SetPattern(int patternNum)
  // {
  //     Border b = (ShutoffBlockListPatternGrid.FindName(string.Format(ShutoffBlockListConst.PATTERN_BORDER_KEY_STRING, patternNum)) as Border);
  //     if (b != null)
  //     {
  //         // クリックイベントを削除
  //         b.MouseLeftButtonDown -= ViewPatternBorder_MouseLeftButtonDown;
  //         b.Cursor = Cursors.Hand;

  //         // クリックイベント追加
  //         b.MouseLeftButtonDown += ViewPatternBorder_MouseLeftButtonDown;
  //     }
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) ヘッダーテキストクリック処理
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void ShutoffLblock_HeaderTitle_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
  // {
  //     if (lblockValList == null) return;

  //     // フィルタを表示する
  //     int filterKey = int.Parse((sender as FrameworkElement).Tag as string);
  //     FilterConst.FilterType? filterType = ShutoffLblock_GetFilterType(filterKey);
  //     if (filterType != null)
  //     {
  //         // フィルタ用リストを作成するため、
  //         // 対象のフィルタタグ以外で絞り込みしているブロックリストを取得
  //         List<FilterManager.FilterCondition> fcList = new List<FilterManager.FilterCondition>();
  //         foreach (FilterManager.FilterCondition fc in patternFilterCondDic[nowPattern])
  //         {
  //             if (fc.FilterTag != filterKey)
  //                 fcList.Add(fc);
  //         }
  //         List<LBlockValModel> tmpLblockValList = GetLblockValList(fcList);

  //         List<ComboBoxItem> ciList = new List<ComboBoxItem>();
  //         switch (filterKey)
  //         {
  //             case (int)ShutoffLblockTag.RequestStatus: // 依頼状況
  //                 foreach (var labelShutoffStatus in tmpLblockValList.GroupBy(o => o.LabelShutoffStatus).OrderBy(o => o.Key))
  //                     ciList.Add(FilterManager.MakeComboBoxItem(filterType.Value, labelShutoffStatus.Key, labelShutoffStatus.Key));
  //                 break;
  //             case (int)ShutoffLblockTag.JudgeResult: // 停止判断
  //                 foreach (var labelJudgeResult in tmpLblockValList.Select(o => o.LabelJudgeResult).Distinct())
  //                 {
  //                     ciList.Add(FilterManager.MakeComboBoxItem(filterType.Value, labelJudgeResult, labelJudgeResult));
  //                 }
  //                 break;
  //             case (int)ShutoffLblockTag.RestorationWorkStatus: // 復旧状況
  //                 foreach (var LabelRestorationWorkStatus in tmpLblockValList.GroupBy(o => o.LabelRestorationWorkStatus).OrderBy(o => o.Key))
  //                 {
  //                     ciList.Add(FilterManager.MakeComboBoxItem(filterType.Value, LabelRestorationWorkStatus.Key, LabelRestorationWorkStatus.Key));
  //                 }
  //                 break;
  //             case (int)ShutoffLblockTag.AreaName: // エリア
  //                 List<String> tmpAreaNameList = new List<String>();
  //                 foreach (var allAreaNameList in tmpLblockValList.GroupBy(o => o.LBlock.AllAreaNameList))
  //                 {
  //                     foreach (string areaName in allAreaNameList.Key)
  //                         if (!tmpAreaNameList.Contains(areaName)) tmpAreaNameList.Add(areaName);
  //                 }
  //                 foreach (string tmpAreaName in tmpAreaNameList)
  //                     ciList.Add(FilterManager.MakeComboBoxItem(filterType.Value, tmpAreaName, tmpAreaName));
  //                 break;
  //             case (int)ShutoffLblockTag.BlockCategory: // ブロック区分
  //                 List<String> tmpBlockCategoryList = new List<string>();
  //                 foreach (var blockCategoryList in tmpLblockValList.GroupBy(o => o.LBlock.BlockCategoryList))
  //                 {
  //                     foreach (string blockCategory in blockCategoryList.Key)
  //                         if (!tmpBlockCategoryList.Contains(blockCategory)) tmpBlockCategoryList.Add(blockCategory);
  //                 }
  //                 foreach (string tmpBlockCategory in CommonUtil.BlockCategoryPriority(tmpBlockCategoryList))
  //                     ciList.Add(FilterManager.MakeComboBoxItem(filterType.Value, tmpBlockCategory, tmpBlockCategory));
  //                 break;
  //             case (int)ShutoffLblockTag.ShutoffBorderSi: // 遮断設定
  //                 List<String> tmpShutoffBorderSiList = new List<string>();
  //                 foreach (var shutoffBorderSiList in tmpLblockValList.GroupBy(o => o.LBlock.ShutoffBorderSiList))
  //                 {
  //                     foreach (string shutoffBorderSi in shutoffBorderSiList.Key)
  //                         if (!tmpShutoffBorderSiList.Contains(shutoffBorderSi)) tmpShutoffBorderSiList.Add(shutoffBorderSi);
  //                 }
  //                 tmpShutoffBorderSiList.Sort();
  //                 foreach (string tmpShutoffBorderSi in tmpShutoffBorderSiList)
  //                     ciList.Add(FilterManager.MakeComboBoxItem(filterType.Value, tmpShutoffBorderSi, tmpShutoffBorderSi));
  //                 break;
  //             case (int)ShutoffLblockTag.KBlockName: // Kブロック番号
  //                 List<String> tmpKBlockNameList = new List<String>();
  //                 foreach (var allKBlockNameList in tmpLblockValList.GroupBy(o => o.LBlock.AllKBlockNameList))
  //                 {
  //                     foreach (string kBlockName in allKBlockNameList.Key)
  //                         if (!tmpKBlockNameList.Contains(kBlockName)) tmpKBlockNameList.Add(kBlockName);
  //                 }
  //                 tmpKBlockNameList.Sort();
  //                 foreach (string tmpKBlockName in tmpKBlockNameList)
  //                     ciList.Add(FilterManager.MakeComboBoxItem(filterType.Value, tmpKBlockName, tmpKBlockName));
  //                 break;
  //             case (int)ShutoffLblockTag.RemoteOpenSBlock: // 遠隔D復旧Sブロック
  //                 foreach (var isRemoteOpenSBlock in tmpLblockValList.GroupBy(o => o.ExistRemoteOpenSBlock).OrderBy(o => o.Key))
  //                 {
  //                     bool isRemoteOpenSBlockKey = (isRemoteOpenSBlock.Key == true) ? true : false;
  //                     ciList.Add(FilterManager.MakeComboBoxItem(filterType.Value, (isRemoteOpenSBlockKey ? "有" : ""), isRemoteOpenSBlock.Key.ToString()));
  //                 }
  //                 break;
  //             case (int)ShutoffLblockTag.ShutoffSi: // 感震遮断設定
  //                 List<String> tmpShutoffSiList = new List<string>();
  //                 foreach (var shutoffSiList in tmpLblockValList.GroupBy(o => o.LBlock.ShutoffSiList))
  //                 {
  //                     foreach (string shutoffSi in shutoffSiList.Key)
  //                         if (!tmpShutoffSiList.Contains(shutoffSi)) tmpShutoffSiList.Add(shutoffSi);
  //                 }
  //                 tmpShutoffSiList.Sort();
  //                 foreach (string tmpShutoffSi in tmpShutoffSiList)
  //                     ciList.Add(FilterManager.MakeComboBoxItem(filterType.Value, tmpShutoffSi, tmpShutoffSi));
  //                 break;
  //         }

  //         CreateFilter(shutoffLblockListHeaderCanvas, filterKey, e,
  //             GetShutoffLblockColumnName(filterKey), filterType.Value, ciList,
  //             ShutoffLblock_FilterSortEvent, ShutoffLblock_FilterConditionClearEvent, ShutoffLblock_FilterConditionEvent);
  //     }
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) フィルタ並び替えイベント
  // /// </summary>
  // /// <param name="filterKey">フィルタキー</param>
  // /// <param name="isUp">昇順かどうか</param>
  // private void ShutoffLblock_FilterSortEvent(int filterKey, bool isUp)
  // {
  //     // 遠隔遮断実施画面(Lブロック)は filterKey = sortTag
  //     ShutoffLblock_GridSort(filterKey, isUp, nowPattern);

  //     Pagenate.ClearPage();
  //     ListRedraw(nowPattern);
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) フィルタ絞り込み処理クリアイベント
  // /// </summary>
  // /// <param name="filterKey">フィルタキー</param>
  // private void ShutoffLblock_FilterConditionClearEvent(int filterKey)
  // {
  //     int filterTag = filterKey;
  //     string columnName = GetShutoffLblockColumnName(filterTag);

  //     List<FilterManager.FilterCondition> fcList = patternFilterCondDic[nowPattern];
  //     // 同じタグの絞り込み条件を削除
  //     fcList.RemoveAll(o => o.FilterTag == filterTag);

  //     Pagenate.ClearPage();
  //     ListRedraw(nowPattern);
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) フィルタ絞り込みイベント
  // /// </summary>
  // /// <param name="filterKey">フィルタキー</param>
  // /// <param name="value">値</param>
  // /// <param name="filterType">フィルタ種別</param>
  // /// <param name="valueType">値種別</param>
  // private void ShutoffLblock_FilterConditionEvent(int filterKey, string value, FilterConst.FilterType filterType, FilterConst.ValueType valueType)
  // {
  //     int filterTag = filterKey;

  //     List<FilterManager.FilterCondition> fcList = patternFilterCondDic[nowPattern];
  //     FilterManager.FilterCondition newFc = new FilterManager.FilterCondition();
  //     newFc.FilterTag = filterTag;
  //     newFc.ColumnName = GetShutoffLblockColumnName(filterTag);
  //     newFc.Value = value;
  //     newFc.FilterType = filterType;
  //     newFc.ValueType = valueType;

  //     // 同じタグの絞り込み条件があれば削除
  //     fcList.RemoveAll(o => o.FilterTag == filterTag);
  //     // 今回の絞り込み条件を追加
  //     fcList.Add(newFc);

  //     Pagenate.ClearPage();
  //     ListRedraw(nowPattern);
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 ヘッダーテキストクリック処理
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void ShutoffReqStatus_HeaderTitle_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
  // {
  //     if (lblockValList == null) return;

  //     // フィルタを表示する
  //     int filterKey = int.Parse((sender as FrameworkElement).Tag as string);
  //     int filterTag = ConvertKeyToTagShutoffReqStatus(filterKey);
  //     FilterConst.FilterType? filterType = ShutoffReqStatus_GetFilterType(filterTag);
  //     if (filterType != null)
  //     {
  //         // フィルタ用リストを作成するため、
  //         // 対象のフィルタタグ以外で絞り込みしているブロックリストを取得
  //         List<FilterManager.FilterCondition> fcList = new List<FilterManager.FilterCondition>();
  //         foreach (FilterManager.FilterCondition fc in patternFilterCondDic[nowPattern])
  //         {
  //             if (fc.FilterTag != filterTag)
  //                 fcList.Add(fc);
  //         }
  //         List<LBlockValModel> tmpLblockValList = GetLblockValList(fcList);

  //         List<ComboBoxItem> ciList = new List<ComboBoxItem>();
  //         DateTime? maxDateTime = null;
  //         switch (filterTag)
  //         {
  //             case (int)ShutoffReqStatusTag.AreaName: // エリア
  //                 List<String> tmpAreaNameList = new List<String>();
  //                 foreach (var allAreaNameList in tmpLblockValList.GroupBy(o => o.LBlock.AllAreaNameList))
  //                 {
  //                     foreach (string areaName in allAreaNameList.Key)
  //                         if (!tmpAreaNameList.Contains(areaName)) tmpAreaNameList.Add(areaName);
  //                 }
  //                 foreach (string tmpAreaName in tmpAreaNameList)
  //                     ciList.Add(FilterManager.MakeComboBoxItem(filterType.Value, tmpAreaName, tmpAreaName));
  //                 break;
  //             case (int)ShutoffReqStatusTag.BlockCategory: // ブロック区分
  //                 List<String> tmpBlockCategoryList = new List<string>();
  //                 foreach (var blockCategoryList in tmpLblockValList.GroupBy(o => o.LBlock.BlockCategoryList))
  //                 {
  //                     foreach (string shutoffSi in blockCategoryList.Key)
  //                         if (!tmpBlockCategoryList.Contains(shutoffSi)) tmpBlockCategoryList.Add(shutoffSi);
  //                 }
  //                 foreach (string tmpShutoffSi in CommonUtil.BlockCategoryPriority(tmpBlockCategoryList))
  //                     ciList.Add(FilterManager.MakeComboBoxItem(filterType.Value, tmpShutoffSi, tmpShutoffSi));
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffBorderSi: // 遮断設定
  //                 List<String> tmpShutoffBorderSiList = new List<string>();
  //                 foreach (var shutoffBorderSiList in tmpLblockValList.GroupBy(o => o.LBlock.ShutoffBorderSiList))
  //                 {
  //                     foreach (string shutoffBorderSi in shutoffBorderSiList.Key)
  //                         if (!tmpShutoffBorderSiList.Contains(shutoffBorderSi)) tmpShutoffBorderSiList.Add(shutoffBorderSi);
  //                 }
  //                 tmpShutoffBorderSiList.Sort();
  //                 foreach (string tmpShutoffBorderSi in tmpShutoffBorderSiList)
  //                     ciList.Add(FilterManager.MakeComboBoxItem(filterType.Value, tmpShutoffBorderSi, tmpShutoffBorderSi));
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffStatus: // 遠隔遮断状況
  //                 foreach (var labelShutoffStatus in tmpLblockValList.GroupBy(o => o.LabelShutoffStatus).OrderBy(o => o.Key))
  //                     ciList.Add(FilterManager.MakeComboBoxItem(filterType.Value, labelShutoffStatus.Key, labelShutoffStatus.Key));
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffRequestedAt:  // 依頼時刻
  //                 maxDateTime = tmpLblockValList.Max(o => o.ShutoffRequestedAt);
  //                 break;
  //             case (int)ShutoffReqStatusTag.ShutoffEndedAt:  // 終了時刻
  //                 maxDateTime = tmpLblockValList.Max(o => o.ShutoffEndedAt);
  //                 break;
  //         }

  //         CreateFilter(shutoffReqStatusListHeaderCanvas, filterKey, e,
  //             GetShutoffReqStatusColumnName(filterTag), filterType.Value, ciList, maxDateTime,
  //             ShutoffReqStatus_FilterSortEvent, ShutoffReqStatus_FilterConditionClearEvent, ShutoffReqStatus_FilterConditionEvent);
  //     }
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 フィルタ並び替えイベント
  // /// </summary>
  // /// <param name="filterKey">フィルタキー</param>
  // /// <param name="isUp">昇順かどうか</param>
  // private void ShutoffReqStatus_FilterSortEvent(int filterKey, bool isUp)
  // {
  //     ShutoffReqStatus_GridSort(ConvertKeyToTagShutoffReqStatus(filterKey), isUp);

  //     Pagenate.ClearPage();
  //     ListRedraw(nowPattern);
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 フィルタ絞り込み処理クリアイベント
  // /// </summary>
  // /// <param name="filterKey">フィルタキー</param>
  // private void ShutoffReqStatus_FilterConditionClearEvent(int filterKey)
  // {
  //     int filterTag = ConvertKeyToTagShutoffReqStatus(filterKey);
  //     string columnName = GetShutoffReqStatusColumnName(filterTag);

  //     List<FilterManager.FilterCondition> fcList = patternFilterCondDic[nowPattern];
  //     // 同じタグの絞り込み条件を削除
  //     fcList.RemoveAll(o => o.FilterTag == filterTag);

  //     Pagenate.ClearPage();
  //     ListRedraw(nowPattern);
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 フィルタ絞り込みイベント
  // /// </summary>
  // /// <param name="filterKey">フィルタキー</param>
  // /// <param name="value">値</param>
  // /// <param name="filterType">フィルタ種別</param>
  // /// <param name="valueType">値種別</param>
  // private void ShutoffReqStatus_FilterConditionEvent(int filterKey, string value, FilterConst.FilterType filterType, FilterConst.ValueType valueType)
  // {
  //     int filterTag = ConvertKeyToTagShutoffReqStatus(filterKey);

  //     List<FilterManager.FilterCondition> fcList = patternFilterCondDic[nowPattern];
  //     FilterManager.FilterCondition newFc = new FilterManager.FilterCondition();
  //     newFc.FilterTag = filterTag;
  //     newFc.ColumnName = GetShutoffReqStatusColumnName(filterTag);
  //     newFc.Value = value;
  //     newFc.FilterType = filterType;
  //     newFc.ValueType = valueType;

  //     // 同じタグの絞り込み条件があれば削除
  //     fcList.RemoveAll(o => o.FilterTag == filterTag);
  //     // 今回の絞り込み条件を追加
  //     fcList.Add(newFc);

  //     Pagenate.ClearPage();
  //     ListRedraw(nowPattern);
  // }

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面 ヘッダーテキストクリック処理
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void FeelEqShutoffStatus_HeaderTitle_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
  // {
  //     if (sblockValList == null) return;

  //     // フィルタを表示する
  //     int filterKey = int.Parse((sender as FrameworkElement).Tag as string);
  //     int filterTag = ConvertKeyToTagFeelEqShutoffStatus(filterKey);
  //     FilterConst.FilterType? filterType = FeelEqShutoffStatus_GetFilterType(filterTag);
  //     if (filterType != null)
  //     {
  //         //  フィルタ用リストを作成するため、
  //         // 対象のフィルタタグ以外で絞り込みしているブロックリストを取得
  //         List<FilterManager.FilterCondition> fcList = new List<FilterManager.FilterCondition>();
  //         foreach (FilterManager.FilterCondition fc in patternFilterCondDic[nowPattern])
  //         {
  //             if (fc.FilterTag != filterTag)
  //                 fcList.Add(fc);
  //         }
  //         List<SBlockValModel> tmpSblockValList = GetSblockValList(fcList);

  //         List<ComboBoxItem> ciList = new List<ComboBoxItem>();
  //         switch (filterTag)
  //         {
  //             case (int)FeelEqShutoffStatusTag.AreaName: // エリア
  //                 List<String> tmpAreaNameList = new List<String>();
  //                 foreach (var allAreaNameList in tmpSblockValList.GroupBy(o => o.SBlock.AllAreaNameList))
  //                 {
  //                     foreach (string areaName in allAreaNameList.Key)
  //                         if (!tmpAreaNameList.Contains(areaName)) tmpAreaNameList.Add(areaName);
  //                 }
  //                 foreach (string tmpAreaName in tmpAreaNameList)
  //                     ciList.Add(FilterManager.MakeComboBoxItem(filterType.Value, tmpAreaName, tmpAreaName));
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.ShutoffBorderSi: // 遮断設定
  //                 List<String> tmpShutoffBorderSiList = new List<string>();
  //                 foreach (var shutoffBorderSiList in tmpSblockValList.GroupBy(o => o.SBlock.ShutoffBorderSiList))
  //                 {
  //                     foreach (string shutoffBorderSi in shutoffBorderSiList.Key)
  //                         if (!tmpShutoffBorderSiList.Contains(shutoffBorderSi)) tmpShutoffBorderSiList.Add(shutoffBorderSi);
  //                 }
  //                 tmpShutoffBorderSiList.Sort();
  //                 foreach (string tmpShutoffBorderSi in tmpShutoffBorderSiList)
  //                     ciList.Add(FilterManager.MakeComboBoxItem(filterType.Value, tmpShutoffBorderSi, tmpShutoffBorderSi));
  //                 break;
  //             case (int)FeelEqShutoffStatusTag.ShutoffSi: // 感震遮断設定
  //                 List<String> tmpShutoffSiList = new List<string>();
  //                 foreach (var shutoffSiList in tmpSblockValList.GroupBy(o => o.SBlock.ShutoffSiList))
  //                 {
  //                     foreach (string shutoffSi in shutoffSiList.Key)
  //                         if (!tmpShutoffSiList.Contains(shutoffSi)) tmpShutoffSiList.Add(shutoffSi);
  //                 }
  //                 tmpShutoffSiList.Sort();
  //                 foreach (string tmpShutoffSi in tmpShutoffSiList)
  //                     ciList.Add(FilterManager.MakeComboBoxItem(filterType.Value, tmpShutoffSi, tmpShutoffSi));
  //                 break;
  //         }

  //         CreateFilter(feelEqShutoffStatusListHeaderCanvas, filterKey, e,
  //             GetFeelEqShutoffStatusColumnName(filterTag), filterType.Value, ciList,
  //             FeelEqShutoffStatus_FilterSortEvent, FeelEqShutoffStatus_FilterConditionClearEvent, FeelEqShutoffStatus_FilterConditionEvent);
  //     }
  // }

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面 フィルタ並び替えイベント
  // /// </summary>
  // /// <param name="filterKey">フィルタキー</param>
  // /// <param name="isUp">昇順かどうか</param>
  // private void FeelEqShutoffStatus_FilterSortEvent(int filterKey, bool isUp)
  // {
  //     FeelEqShutoffStatus_GridSort(ConvertKeyToTagFeelEqShutoffStatus(filterKey), isUp);

  //     Pagenate.ClearPage();
  //     ListRedraw(nowPattern);
  // }

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面 フィルタ絞り込み処理クリアイベント
  // /// </summary>
  // /// <param name="filterKey">フィルタキー</param>
  // private void FeelEqShutoffStatus_FilterConditionClearEvent(int filterKey)
  // {
  //     int filterTag = ConvertKeyToTagFeelEqShutoffStatus(filterKey);
  //     string columnName = GetFeelEqShutoffStatusColumnName(filterTag);

  //     List<FilterManager.FilterCondition> fcList = patternFilterCondDic[nowPattern];
  //     // 同じタグの絞り込み条件を削除
  //     fcList.RemoveAll(o => o.FilterTag == filterTag);

  //     Pagenate.ClearPage();
  //     ListRedraw(nowPattern);
  // }

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面 フィルタ絞り込みイベント
  // /// </summary>
  // /// <param name="filterKey">フィルタキー</param>
  // /// <param name="value">値</param>
  // /// <param name="filterType">フィルタ種別</param>
  // /// <param name="valueType">値種別</param>
  // private void FeelEqShutoffStatus_FilterConditionEvent(int filterKey, string value, FilterConst.FilterType filterType, FilterConst.ValueType valueType)
  // {
  //     int filterTag = ConvertKeyToTagFeelEqShutoffStatus(filterKey);

  //     List<FilterManager.FilterCondition> fcList = patternFilterCondDic[nowPattern];
  //     FilterManager.FilterCondition newFc = new FilterManager.FilterCondition();
  //     newFc.FilterTag = filterTag;
  //     newFc.ColumnName = GetFeelEqShutoffStatusColumnName(filterTag);
  //     newFc.Value = value;
  //     newFc.FilterType = filterType;
  //     newFc.ValueType = valueType;

  //     // 同じタグの絞り込み条件があれば削除
  //     fcList.RemoveAll(o => o.FilterTag == filterTag);
  //     // 今回の絞り込み条件を追加
  //     fcList.Add(newFc);

  //     Pagenate.ClearPage();
  //     ListRedraw(nowPattern);
  // }

  // /// <summary>
  // /// フィルタを表示する
  // /// </summary>
  // /// <param name="headerCanvas">対象ヘッダーCanvas</param>
  // /// <param name="filterKey">フィルタキー</param>
  // /// <param name="mouseButtonEventArgs">マウスクリックイベントデータ</param>
  // /// <param name="columnName">項目名</param>
  // /// <param name="filterType">フィルタ種別</param>
  // /// <param name="ciList">ComboBoxItemリスト</param>
  // /// <param name="sortEvent">ソートイベント</param>
  // /// <param name="filterConditionClearEvent">絞り込みクリアイベント</param>
  // /// <param name="filterConditionEvent">絞り込みイベント</param>
  // private void CreateFilter(Canvas headerCanvas, int filterKey, MouseButtonEventArgs mouseButtonEventArgs,
  //     string columnName, FilterConst.FilterType filterType, List<ComboBoxItem> ciList,
  //     Filter.SortManager sortEvent, Filter.FilterConditionClearManager filterConditionClearEvent, Filter.FilterConditionManager filterConditionEvent)
  // {
  //     CreateFilter(headerCanvas, filterKey, mouseButtonEventArgs, columnName, filterType, ciList, null,
  //         sortEvent, filterConditionClearEvent, filterConditionEvent);
  // }

  // /// <summary>
  // /// フィルタを表示する
  // /// </summary>
  // /// <param name="headerCanvas">対象ヘッダーCanvas</param>
  // /// <param name="filterKey">フィルタキー</param>
  // /// <param name="mouseButtonEventArgs">マウスクリックイベントデータ</param>
  // /// <param name="columnName">項目名</param>
  // /// <param name="filterType">フィルタ種別</param>
  // /// <param name="ciList">ComboBoxItemリスト</param>
  // /// <param name="maxDateTime">最大時刻</param>
  // /// <param name="sortEvent">ソートイベント</param>
  // /// <param name="filterConditionClearEvent">絞り込みクリアイベント</param>
  // /// <param name="filterConditionEvent">絞り込みイベント</param>
  // private void CreateFilter(Canvas headerCanvas, int filterKey, MouseButtonEventArgs mouseButtonEventArgs,
  //     string columnName, FilterConst.FilterType filterType, List<ComboBoxItem> ciList, DateTime? maxDateTime,
  //     Filter.SortManager sortEvent, Filter.FilterConditionClearManager filterConditionClearEvent, Filter.FilterConditionManager filterConditionEvent)
  // {
  //     Point point = GetFilterPosition(headerCanvas, filterKey, mouseButtonEventArgs);
  //     Filter filter = controller.CreateFilter(point, filterKey, columnName, filterType, null, ciList, maxDateTime);
  //     filter.SortEvent += new Filter.SortManager(sortEvent);
  //     filter.FilterConditionClearEvent += new Filter.FilterConditionClearManager(filterConditionClearEvent);
  //     filter.FilterConditionEvent += new Filter.FilterConditionManager(filterConditionEvent);
  // }

  // /// <summary>
  // /// フィルタの表示位置を返す
  // /// </summary>
  // /// <param name="headerCanvas">対象ヘッダーCanvas</param>
  // /// <param name="filterKey">フィルタキー</param>
  // /// <param name="mouseButtonEventArgs">マウスクリックイベントデータ</param>
  // /// <returns>フィルタの表示位置</returns>
  // private Point GetFilterPosition(Canvas headerCanvas, int filterKey, MouseButtonEventArgs mouseButtonEventArgs)
  // {
  //     Canvas targetCanvas = headerCanvas.FindName(string.Format(GlobalConst.SORT_BORDER_CANVAS_KEY_STRING, filterKey)) as Canvas;
  //     Point AllCanvasPosion = controller.GetPosition(mouseButtonEventArgs);
  //     double targetCanvasPositionX = 0;
  //     double targetCanvasPositionY = 0;
  //     if (targetCanvas != null)
  //     {
  //         Canvas targetParentCanvas = targetCanvas.Parent as Canvas;
  //         if (targetParentCanvas != null)
  //         {
  //             Point targetParentCanvasPosition = mouseButtonEventArgs.GetPosition(targetParentCanvas);
  //             targetCanvasPositionX = targetParentCanvasPosition.X;
  //             targetCanvasPositionY = targetParentCanvasPosition.Y - targetParentCanvas.ActualHeight;
  //         }
  //     }
  //     return new Point((AllCanvasPosion.X - targetCanvasPositionX), (AllCanvasPosion.Y - targetCanvasPositionY));
  // }

  // /// <summary>
  // /// 全遮断チェック/アンチェック(Lブロック)
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void AllShutoffLblockCheck_CheckUnchecked(object sender, RoutedEventArgs e)
  // {
  //     if (lblockValList == null) return;

  //     // 全ての遮断をチェック(アンチェック)する
  //     foreach (LBlockValModel lv in lblockValList)
  //     {
  //         Canvas c = shutoffLblockListCanvas.FindName(string.Format(SHUTOFF_LBLOCK_CANVAS_KEY_STRING, lv.Key)) as Canvas;
  //         if (c == null) continue;
  //         CheckBox cb = (c.Children[(int)ShutoffLblockCanvasItem.ShutoffChecked] as Border).Child as CheckBox;
  //         if (cb == null) continue;

  //         lv.LBlock.IsChecked = (bool)(sender as CheckBox).IsChecked;
  //         cb.Checked -= ShutoffCheck_CheckUnchecked;
  //         cb.Unchecked -= ShutoffCheck_CheckUnchecked;
  //         cb.IsChecked = (bool)(sender as CheckBox).IsChecked;
  //         cb.Checked += ShutoffCheck_CheckUnchecked;
  //         cb.Unchecked += ShutoffCheck_CheckUnchecked;
  //         //controller.BlinkLBlockChildren(lv.LBlock.Name, (bool)(sender as CheckBox).IsChecked);
  //         controller.FillRemoteOperateLBlockChildren(lv.LBlock.Name, (bool)(sender as CheckBox).IsChecked);
  //         shutoffRowHighlight(lv);
  //     }

  //     // 需要家件数セット
  //     SetCustomerCount();

  //     // 道路上の被害推定(継続地区累計、合計)の埋め込み
  //     SetLblockLpSupplyDmgCnt();
  // }

  // /// <summary>
  // /// 遮断チェック/アンチェック(Lブロック)
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void ShutoffCheck_CheckUnchecked(object sender, RoutedEventArgs e)
  // {
  //     if (lblockValList == null) return;
  //     CheckBox cb = sender as CheckBox;
  //     int key = int.Parse(((cb.Parent as Border).Parent as Canvas).Name.Split('_')[1]);

  //     // Keyはユニークなので1つしか返らない
  //     foreach (var lv in lblockValList.Where(o => o.Key == key))
  //     {
  //         lv.LBlock.IsChecked = (bool)cb.IsChecked;
  //         //controller.BlinkLBlockChildren(lv.LBlock.Name, (bool)cb.IsChecked);
  //         controller.FillRemoteOperateLBlockChildren(lv.LBlock.Name, (bool)cb.IsChecked);
  //         shutoffRowHighlight(lv);
  //     }

  //     // 需要家件数セット
  //     SetCustomerCount();

  //     // 道路上の被害推定(継続地区累計、合計)の埋め込み
  //     SetLblockLpSupplyDmgCnt();
  // }

  // /// <summary>
  // /// 遠隔遮断指定ブロック行のハイライト表示のOn/Offを行う
  // /// </summary>
  // private void shutoffRowHighlight(LBlockValModel lv)
  // {
  //     // FindNameが効いているか判定する
  //     bool isFindName = IsFindNameEffective(shutoffLblockListCanvas);
  //     Canvas c = SearchCanvas(shutoffLblockListCanvas, string.Format(SHUTOFF_LBLOCK_CANVAS_KEY_STRING, lv.Key), isFindName);
  //     if (c == null) return;

  //     // 超過率塗りつぶし用
  //     var info = new OverKineRateInfo(lv);

  //     SolidColorBrush overLpDmgCntEmergencyBrush = new SolidColorBrush();

  //     if (!lv.LBlock.IsChecked)
  //     {
  //         // 本支管被害数塗りつぶし用
  //         if (lv.IsOverLpDmgCntEmergency2)
  //             overLpDmgCntEmergencyBrush = OVER_LP_DMG_CNT2_BORDER_COLOR;
  //         else if (lv.IsOverLpDmgCntEmergency1)
  //             overLpDmgCntEmergencyBrush = OVER_LP_DMG_CNT1_BORDER_COLOR;
  //         else
  //             overLpDmgCntEmergencyBrush = null;
  //     }

  //     foreach (ShutoffLblockCanvasItem item in Enum.GetValues(typeof(ShutoffLblockCanvasItem)))
  //     {
  //         if ((int)item == 0) continue;
  //         Border b1 = c.Children[(int)item] as Border;
  //         if (b1 == null) continue;
  //         var tb1 = b1.Child;
  //         if (tb1 == null) continue;

  //         if (lv.LBlock.IsChecked) b1.Background = new SolidColorBrush(SupColors.REMOTE_OPERATE_CHECK_BORDER_COLOR);
  //         else
  //         {
  //             b1.Background = null;
  //             switch (item)
  //             {
  //                 case ShutoffLblockCanvasItem.GraphShow: // グラフ表示
  //                     b1.Background = NO_COLUMN_BACKGROUND;
  //                     break;
  //                 case ShutoffLblockCanvasItem.RequestStatus: // 依頼状況
  //                     b1.Background = new SolidColorBrush(CommonUtil.GetShutoffStateColor(lv.ShutoffStatus));
  //                     break;
  //                 case ShutoffLblockCanvasItem.JudgeResult: // 停止判断
  //                     b1.Background = JUDGERESULT_BACKGROUND[lv.JudgeResult];
  //                     break;
  //                 case ShutoffLblockCanvasItem.Over30KineRate: // 30Kine超過率
  //                     b1.Background = info.over30KineBrush;
  //                     break;
  //                 case ShutoffLblockCanvasItem.Over60KineRate: // 60Kine超過率
  //                     b1.Background = info.over60KineBrush;
  //                     break;
  //                 case ShutoffLblockCanvasItem.Over70KineRate: // 70Kine超過率
  //                     b1.Background = info.over70KineBrush;
  //                     break;
  //                 case ShutoffLblockCanvasItem.Over80KineRate: // 80Kine超過率
  //                     b1.Background = info.over80KineBrush;
  //                     break;
  //                 case ShutoffLblockCanvasItem.Over90KineRate: // 90Kine超過率
  //                     b1.Background = info.over90KineBrush;
  //                     break;
  //                 case ShutoffLblockCanvasItem.MaxComAbleOver30KineRate: // 最大30Kine超過率
  //                     b1.Background = info.maxComAbleOver30KineBrush;
  //                     break;
  //                 case ShutoffLblockCanvasItem.MaxComAbleOver60KineRate: // 最大60Kine超過率
  //                     b1.Background = info.maxComAbleOver60KineBrush;
  //                     break;
  //                 case ShutoffLblockCanvasItem.MaxComAbleOver70KineRate: // 最大70Kine超過率
  //                     b1.Background = info.maxComAbleOver70KineBrush;
  //                     break;
  //                 case ShutoffLblockCanvasItem.MaxComAbleOver80KineRate: // 最大80Kine超過率
  //                     b1.Background = info.maxComAbleOver80KineBrush;
  //                     break;
  //                 case ShutoffLblockCanvasItem.MaxComAbleOver90KineRate: // 最大90Kine超過率
  //                     b1.Background = info.maxComAbleOver90KineBrush;
  //                     break;
  //                 case ShutoffLblockCanvasItem.LpSupplyDmgCntEmergency: // 本支管被害数（累計）・緊急
  //                     b1.Background = overLpDmgCntEmergencyBrush;
  //                     break;
  //                 case ShutoffLblockCanvasItem.LeakEncounterRate: // 漏えい遭遇率
  //                     b1.Background = new SolidColorBrush(SupColors.LightPink);
  //                     break;

  //             }
  //         }
  //     }
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) 階層マーク押下イベント
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void ShutoffLblockLayerMark_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
  // {
  //     Border b = sender as Border;
  //     string newLayerOnLblockId = b.Name.Split('_')[1].ToString();

  //     if (shutoffLblockLayerOnLblockId != "")
  //     {
  //         Border beforeBorder = shutoffLblockListCanvas.FindName(string.Format(SHUTOFF_LBLOCK_LAYER_MARK_KEY_STRING, shutoffLblockLayerOnLblockId)) as Border;
  //         if (beforeBorder != null)
  //         {
  //             beforeBorder.Child = getLayerMarkCanvas(true);
  //         }

  //         StackPanel sp = shutoffLblockListStackPanel.FindName(string.Format(SHUTOFF_LBLOCK_LAYER_STACK_PANEL_KEY_STRING, shutoffLblockLayerOnLblockId)) as StackPanel;
  //         if (sp != null)
  //         {
  //             sp.Children.Clear();
  //         }

  //         shutoffLblockListCanvas.Height = double.Parse(shutoffLblockListCanvas.Tag.ToString());
  //     }

  //     if (shutoffLblockLayerOnLblockId == newLayerOnLblockId)
  //     {
  //         shutoffLblockLayerOnLblockId = "";
  //     }
  //     else
  //     {
  //         b.Child = getLayerMarkCanvas(false);
  //         shutoffLblockLayerOnLblockId = newLayerOnLblockId;
  //     }

  //     ShowShutoffLblockLayerSblockList(shutoffLblockStoryboard, shutoffLblockLayerOnLblockId, true);
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) 子Sブロックのリストを表示する
  // /// </summary>
  // /// <param name="sb">ストーリーボード</param>
  // /// <param name="lblockId">子Sブロックを表示させるLブロックID</param>
  // private void ShowShutoffLblockLayerSblockList(Storyboard sb, string lblockId)
  // {
  //     ShowShutoffLblockLayerSblockList(sb, lblockId);
  // }

  // /// <summary>
  // /// 遠隔遮断実施画面(Lブロック) 子Sブロックのリストを表示する
  // /// </summary>
  // /// <param name="sb">ストーリーボード</param>
  // /// <param name="lblockId">子Sブロックを表示させるLブロックID</param>
  // /// <param name="isMouseLeftButtonDown">階層表示マーク押下時かどうか</param>
  // private void ShowShutoffLblockLayerSblockList(Storyboard sb, string lblockId, bool isMouseLeftButtonDown)
  // {
  //     sb.Stop();
  //     sb.Children.Clear();

  //     if (lblockId != "")
  //     {
  //         List<SBlockValModel> svs = sblockValList.Where(o => o.LBlockId == int.Parse(lblockId)).ToList();
  //         int svsCnt = svs.Count;

  //         string targetName = string.Format(SHUTOFF_LBLOCK_LAYER_STACK_PANEL_KEY_STRING, lblockId);

  //         DoubleAnimation da = GetLayerAnimation(targetName, svsCnt);

  //         sb.Children.Add(da);

  //         shutoffLblockListCanvas.Height += svsCnt * 25;

  //         sb.Begin();

  //         CreateShutoffLblockLayerSblockList(lblockId, svs, isMouseLeftButtonDown);
  //     }
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 階層マーク押下イベント
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void ShutoffReqStatusLayerMark_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
  // {
  //     Border b = sender as Border;
  //     string newLayerOnLblockId = b.Name.Split('_')[1].ToString();

  //     if (shutoffReqStatusLayerOnLblockId != "")
  //     {
  //         Border beforeBorder = shutoffReqStatusListCanvas.FindName(string.Format(SHUTOFF_REQ_STATUS_LAYER_MARK_KEY_STRING, shutoffReqStatusLayerOnLblockId)) as Border;
  //         if (beforeBorder != null)
  //         {
  //             beforeBorder.Child = getLayerMarkCanvas(true);
  //         }

  //         StackPanel sp = shutoffReqStatusListStackPanel.FindName(string.Format(SHUTOFF_REQ_STATUS_LAYER_STACK_PANEL_KEY_STRING, shutoffReqStatusLayerOnLblockId)) as StackPanel;
  //         if (sp != null)
  //         {
  //             sp.Children.Clear();
  //         }

  //         shutoffReqStatusListCanvas.Height = double.Parse(shutoffReqStatusListCanvas.Tag.ToString());
  //     }

  //     if (shutoffReqStatusLayerOnLblockId == newLayerOnLblockId)
  //     {
  //         shutoffReqStatusLayerOnLblockId = "";
  //     }
  //     else
  //     {
  //         b.Child = getLayerMarkCanvas(false);
  //         shutoffReqStatusLayerOnLblockId = newLayerOnLblockId;
  //     }

  //     ShowShutoffReqStatusSblockList(shutoffReqStatusStoryboard, shutoffReqStatusLayerOnLblockId, true);
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 子Sブロックのリストを表示する
  // /// </summary>
  // /// <param name="sb">ストーリーボード</param>
  // /// <param name="lblockId">子Sブロックを表示させるLブロックID</param>
  // private void ShowShutoffReqStatusSblockList(Storyboard sb, string lblockId)
  // {
  //     ShowShutoffReqStatusSblockList(sb, lblockId, false);
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面 子Sブロックのリストを表示する
  // /// </summary>
  // /// <param name="sb">ストーリーボード</param>
  // /// <param name="lblockId">子Sブロックを表示させるLブロックID</param>
  // /// <param name="isMouseLeftButtonDown">階層表示マーク押下時かどうか</param>
  // private void ShowShutoffReqStatusSblockList(Storyboard sb, string lblockId, bool isMouseLeftButtonDown)
  // {
  //     sb.Stop();
  //     sb.Children.Clear();

  //     if (lblockId != "")
  //     {
  //         List<SBlockValModel> svs = sblockValList.Where(o => o.LBlockId == int.Parse(lblockId)).ToList();
  //         int svsCnt = svs.Count();

  //         string targetName = string.Format(SHUTOFF_REQ_STATUS_LAYER_STACK_PANEL_KEY_STRING, lblockId);

  //         DoubleAnimation da = GetLayerAnimation(targetName, svsCnt);

  //         sb.Children.Add(da);

  //         shutoffReqStatusListCanvas.Height += svsCnt * 25;

  //         sb.Begin();

  //         CreateShutoffReqStatusLayerSblockList(lblockId, svs, isMouseLeftButtonDown);
  //     }
  // }

  // /// <summary>
  // /// Lブロック名称クリック
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void LblockNameText_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
  // {
  //     if (lblockValList == null) return;

  //     int key = int.Parse((((sender as TextBlock).Parent as Border).Parent as Canvas).Name.Split('_')[1]);
  //     foreach (var lv in lblockValList.Where(o => o.Key == key))
  //         // Keyはユニークなので1つしか返らない
  //         controller.ChangeMapViewL(lv.LBlock);
  // }

  // /// <summary>
  // /// ガバナ一覧表示クリック(Lブロック)
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // public void LblockGovernorListShowText_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
  // {
  //     if (lblockValList == null) return;

  //     int key = int.Parse((((sender as TextBlock).Parent as Border).Parent as Canvas).Name.Split('_')[1]);
  //     foreach (var lv in lblockValList.Where(o => o.Key == key))
  //     {
  //         // Keyはユニークなので1つしか返らない
  //         // 検索条件を設定する
  //         this.controller.SetGovernorListBlockNo(lv.LBlock.Name);

  //         // メニューを切り替える(ガバナ一覧)
  //         controller.MenuSelect((int)TopMenu.Lp, (int)LpMenu.Governor);
  //         controller.current_menu_selected_button_no = (int)NewMenu.GovernorList;
  //         controller.page.Menu.selectedButtonGridHilight((int)NewSubMenu.GovernorList);
  //     }
  // }

  // /// <summary>
  // /// ガバナ一覧表示クリック(Sブロック)
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // public void SblockGovernorListShowText_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
  // {
  //     if (sblockValList == null) return;

  //     int key = int.Parse((((sender as TextBlock).Parent as Border).Parent as Canvas).Name.Split('_')[1]);
  //     foreach (var sv in sblockValList.Where(o => o.Key == key))
  //     {
  //         // Keyはユニークなので1つしか返らない
  //         // 検索条件を設定する
  //         this.controller.SetGovernorListBlockNo(sv.SBlock.Name);

  //         // メニューを切り替える(ガバナ一覧)
  //         controller.MenuSelect((int)TopMenu.Lp, (int)LpMenu.Governor);
  //         controller.current_menu_selected_button_no = (int)NewMenu.GovernorList;
  //         controller.page.Menu.selectedButtonGridHilight((int)NewSubMenu.GovernorList);
  //     }
  // }

  // /// <summary>
  // /// グラフ表示クリック
  // /// Sブロック圧力・流量トレンドグラフを表示する
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void GraphShowText_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
  // {
  //     if (sblockValList == null) return;

  //     int key = int.Parse((((sender as TextBlock).Parent as Border).Parent as Canvas).Name.Split('_')[1]);
  //     foreach (var sv in sblockValList.Where(o => o.Key == key))
  //     {
  //         // Keyはユニークなので1つしか返らない
  //         controller.OpenLpTrendGraph(sv.SBlockId, null);
  //     }
  // }

  // /// <summary>
  // /// Sブロック名称クリック
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void SblockNameText_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
  // {
  //     if (sblockValList == null) return;

  //     int key = int.Parse((((sender as TextBlock).Parent as Border).Parent as Canvas).Name.Split('_')[1]);
  //     foreach (var sv in sblockValList.Where(o => o.Key == key))
  //         // Keyはユニークなので1つしか返らない
  //         controller.ChangeMapViewS(sv.SBlock);
  // }

  // /// <summary>
  // /// L復旧状況クリック
  // /// 復旧情報詳細画面(L)を表示する
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void LblockRestorationStatusText_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
  // {
  //     if (lblockValList == null) return;

  //     int key = int.Parse((((sender as TextBlock).Parent as Border).Parent as Canvas).Name.Split('_')[1]);
  //     foreach (var lv in lblockValList.Where(o => o.Key == key))
  //     {
  //         // Keyはユニークなので1つしか返らない
  //         controller.OpenRestorationWorkStatusDetailInfo(lv.LBlockId, true);
  //     }
  // }

  // /// <summary>
  // /// S復旧状況クリック
  // /// 復旧情報詳細画面(S)を表示する
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void SblockRestorationStatusText_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
  // {
  //     if (sblockValList == null) return;

  //     int key = int.Parse((((sender as TextBlock).Parent as Border).Parent as Canvas).Name.Split('_')[1]);
  //     foreach (var sv in sblockValList.Where(o => o.Key == key))
  //     {
  //         // Keyはユニークなので1つしか返らない
  //         controller.OpenRestorationWorkStatusDetailInfo(sv.SBlockId, false);
  //     }
  // }

  // /// <summary>
  // /// Lブロック遠隔遮断実行ボタンクリック
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void ShutoffExecuteButton_Click(object sender, RoutedEventArgs e)
  // {
  //     DateTime nowTime = DateTime.Now;

  //     if (lblockValList == null) return;

  //     // 停止実施連絡書の印刷(問い合わせ) ※印刷の問い合わせ結果に関わらず遮断は行う
  //     List<LBlockValModel> checkedLvList = lblockValList.Where(o => o.LBlock.IsChecked).ToList();
  //     if (checkedLvList.Count() == 0) return;

  //     ShutoffExecute();
  // }

  // /// <summary>
  // /// Sブロック遠隔遮断実行ボタンクリック
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void SblockShutoffExecuteButton_Click(object sender, RoutedEventArgs e)
  // {
  //     if (sblockValList == null) return;

  //     // 停止実施連絡書の印刷(問い合わせ) ※印刷の問い合わせ結果に関わらず遮断は行う
  //     if (sblockValList.Where(o => o.SBlock.IsChecked).Count() != 0) controller.OpenPrintConfirm(this, "sblockShutoff", false);
  // }

  // /// <summary>
  // /// Lブロック遮断実行
  // /// </summary>
  // public void ShutoffExecute()
  // {
  //     if (lblockValList == null) return;

  //     // ブロック遮断依頼
  //     controller.ShutoffStart(lblockValList.Where(o => o.LBlock.IsChecked).ToList(), false, nowPattern);
  // }

  // /// <summary>
  // /// Sブロック遮断実行
  // /// </summary>
  // public void SblockShutoffExecute()
  // {
  //     // ボタンが残っているので、空メソッドとして残す。
  // }

  // /// <summary>
  // /// Lブロック遮断操作履歴ボタンクリック
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void OperationHistoryButton_Click(object sender, RoutedEventArgs e)
  // {
  //     (sender as Button).IsEnabled = false;
  //     controller.OpenHistory((int)HistoryType.Lblock, (int)RemoteOperateType.Shutoff);
  // }

  // /// <summary>
  // /// Sブロック遮断操作履歴ボタンクリック
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void SblockOperationHistoryButton_Click(object sender, RoutedEventArgs e)
  // {
  //     (sender as Button).IsEnabled = false;
  //     controller.OpenHistory((int)HistoryType.Sblock, (int)RemoteOperateType.Shutoff);
  // }

  // /// <summary>
  // /// チェックシートボタンクリック
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void CheckSheetButton_Click(object sender, RoutedEventArgs e)
  // {
  //     if (lblockValList == null) return;

  //     (sender as Button).IsEnabled = false;

  //     var lBlockInfo = new List<CheckSheet.LBlockInfo>();
  //     foreach (var checkBlockList in lblockValList.Where(o => o.LBlock.IsChecked && o.JudgeResult != (int)LBlockLpStopJudgementConst.JudgeResult.First))
  //     {
  //         var info = new CheckSheet.LBlockInfo();
  //         info.KBlockNo = checkBlockList.LBlock.KBlockNo;
  //         info.LBlockNo = checkBlockList.LBlock.LBlockNo;
  //         info.BlockName = checkBlockList.LBlock.Name;
  //         lBlockInfo.Add(info);
  //     }

  //     if (lBlockInfo.Count > 0)
  //         controller.OpenCheckSheet(lBlockInfo);
  //     else
  //     {
  //         (sender as Button).IsEnabled = true;
  //         controller.ShowAlert(CHECKSHEET_OPEN_ERROR_MSG);
  //     }
  // }

  // /// <summary>
  // /// Sブロックチェックシートボタンクリック
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void SblockCheckSheetButton_Click(object sender, RoutedEventArgs e)
  // {
  //     if (sblockValList == null) return;

  //     (sender as Button).IsEnabled = false;

  //     var sBlockInfo = new List<SBlockCheckSheet.SBlockInfo>();
  //     foreach (var checkBlockList in sblockValList.Where(o => o.SBlock.IsChecked && o.LBlockVal.JudgeResult != (int)LBlockLpStopJudgementConst.JudgeResult.First))
  //     {
  //         var info = new SBlockCheckSheet.SBlockInfo();
  //         info.KBlockNo = checkBlockList.KBlockNo;
  //         info.LBlockNo = checkBlockList.LBlockNo;
  //         info.SBlockNo = checkBlockList.SBlockNo;
  //         info.LBlockName = checkBlockList.SBlock.Name.Remove(checkBlockList.SBlock.Name.IndexOf('-'));
  //         info.SBlockName = checkBlockList.SBlock.Name;
  //         sBlockInfo.Add(info);
  //     }

  //     if (sBlockInfo.Count > 0)
  //         controller.OpenSblockCheckSheet(sBlockInfo);
  //     else
  //     {
  //         (sender as Button).IsEnabled = true;
  //         controller.ShowAlert(CHECKSHEET_OPEN_ERROR_MSG);
  //     }
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面のソート用のタグをソートキーに変換して返す
  // /// </summary>
  // /// <param name="tag">タグ</param>
  // /// <returns>ソートキー</returns>
  // private int ConvertTagToKeyShutoffReqStatus(int tag)
  // {
  //     return tag + CommonUtil.GetEnumLength<ShutoffLblockTag>();
  // }

  // /// <summary>
  // /// 遠隔遮断依頼状況確認画面のソートキーをソート用のタグに変換して返す
  // /// </summary>
  // /// <param name="key">ソートキー</param>
  // /// <returns>タグ</returns>
  // private int ConvertKeyToTagShutoffReqStatus(int key)
  // {
  //     return key - CommonUtil.GetEnumLength<ShutoffLblockTag>();
  // }

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面のソート用のタグをソートキーに変換して返す
  // /// </summary>
  // /// <param name="tag">タグ</param>
  // /// <returns>ソートキー</returns>
  // private int ConvertTagToKeyFeelEqShutoffStatus(int tag)
  // {
  //     return tag + (CommonUtil.GetEnumLength<ShutoffLblockTag>() + CommonUtil.GetEnumLength<ShutoffReqStatusTag>());
  // }

  // /// <summary>
  // /// 感震遮断Sブロック状況確認画面のソートキーをソート用のタグに変換して返す
  // /// </summary>
  // /// <param name="key">ソートキー</param>
  // /// <returns>タグ</returns>
  // private int ConvertKeyToTagFeelEqShutoffStatus(int key)
  // {
  //     return key - (CommonUtil.GetEnumLength<ShutoffLblockTag>() + CommonUtil.GetEnumLength<ShutoffReqStatusTag>());
  // }

  // /// <summary>
  // /// 検索対象Canvasにおいて、FindNameが効いているかどうかを返す
  // /// </summary>
  // /// <param name="searchCanvas">検索対象Canvas</param>
  // /// <returns>FindNameが効いているかどうか</returns>
  // private bool IsFindNameEffective(Canvas searchCanvas)
  // {
  //     bool result = true;
  //     if (searchCanvas.Children.Count > 0)
  //     {
  //         if (searchCanvas.Children[0] as Canvas != null)
  //         {
  //             result = !(searchCanvas.FindName((searchCanvas.Children[0] as Canvas).Name) == null);
  //         }
  //         else if (searchCanvas.Children[0] as StackPanel != null)
  //         {
  //             StackPanel sp = searchCanvas.Children[0] as StackPanel;
  //             if (sp.Children.Count > 0)
  //             {
  //                 result = !(sp.FindName((sp.Children[0] as Canvas).Name) == null);
  //             }
  //         }
  //     }

  //     return result;
  // }

  // /// <summary>
  // /// 検索対象CanvasのChildrenから、検索対象名に一致する名前のキャンバスを検索する
  // /// </summary>
  // /// <param name="searchCanvas">検索対象Canvas</param>
  // /// <param name="searchName">検索対象名</param>
  // /// <param name="isFindName">FindNameが効いているかどうか</param>
  // /// <returns>検索結果</returns>
  // private Canvas SearchCanvas(Canvas searchCanvas, string searchName, bool isFindName)
  // {
  //     // 作成済みのキャンバスを探す(FindNameが効かない場合は自力で探す)
  //     // ※FindNameが効かない場合
  //     //   ①タブコントロールが切り替わっていて後ろに隠れている
  //     //   ②画面切り替え時の作成直後
  //     // ※いずれもSilverLightのバグである可能性が高いのでバージョンを上げれば改善する可能性がある
  //     Canvas c = null;
  //     if (isFindName)
  //         c = searchCanvas.FindName(searchName) as Canvas;
  //     else
  //     {
  //         if (searchCanvas.Children[0] as Canvas != null)
  //         {
  //             foreach (Canvas c2 in searchCanvas.Children)
  //             {
  //                 if (c2 != null && c2.Name == searchName)
  //                 {
  //                     c = c2;
  //                     break;
  //                 }
  //             }
  //         }
  //         else if (searchCanvas.Children[0] as StackPanel != null)
  //         {
  //             foreach (Canvas c2 in (searchCanvas.Children[0] as StackPanel).Children)
  //             {
  //                 if (c2 != null && c2.Name == searchName)
  //                 {
  //                     c = c2;
  //                     break;
  //                 }
  //             }
  //         }
  //     }

  //     return c;
  // }

  // /// <summary>
  // /// 階層表示マークを返す
  // /// </summary>
  // /// <param name="onFlg"></param>
  // /// <returns></returns>
  // private Canvas getLayerMarkCanvas(bool onFlg)
  // {
  //     Canvas markC = new Canvas();
  //     markC.Width = 17;
  //     markC.Height = 10;

  //     Rectangle r = new Rectangle();
  //     r.Stroke = new SolidColorBrush(Colors.Gray);
  //     r.StrokeThickness = 1;
  //     r.Fill = new SolidColorBrush(Color.FromArgb(255, 255, 183, 76));
  //     r.Width = 10;
  //     r.Height = 10;
  //     markC.Children.Add(r);

  //     Line l = new Line();
  //     l.Stroke = new SolidColorBrush(Colors.Black);
  //     l.StrokeThickness = 2;
  //     l.X1 = 2;
  //     l.Y1 = 5;
  //     l.X2 = 8;
  //     l.Y2 = 5;
  //     markC.Children.Add(l);

  //     if (onFlg)
  //     {
  //         Line l2 = new Line();
  //         l2.Stroke = new SolidColorBrush(Colors.Black);
  //         l2.StrokeThickness = 2;
  //         l2.X1 = 5;
  //         l2.Y1 = 2;
  //         l2.X2 = 5;
  //         l2.Y2 = 8;
  //         markC.Children.Add(l2);
  //     }

  //     return markC;
  // }

  // /// <summary>
  // /// Lブロックの一覧を使用するパターンかどうか
  // /// </summary>
  // /// <param name="pattern">パターン</param>
  // /// <returns>Lブロックの一覧を使用するパターンかどうか</returns>
  // public bool IsLblockPattern(int pattern)
  // {
  //     return USE_SHUTOFF_LBLOCK_LIST_PATTERN.Contains(pattern);
  // }

  // /// <summary>
  // /// 現在一覧で使用中のLブロックのリストを返す
  // /// </summary>
  // /// <returns>Lブロックのリスト</returns>
  // public List<LBlockValModel> GetLblockValList()
  // {
  //     return lblockValList;
  // }

  // /// <summary>
  // /// 現在一覧で使用中のSブロックのリストを返す
  // /// </summary>
  // /// <returns>Sブロックのリスト</returns>
  // public List<SBlockValModel> GetSblockValList()
  // {
  //     return sblockValList;
  // }

  // /// <summary>
  // /// ソート条件を返す
  // /// </summary>
  // /// <param name="pattern"></param>
  // /// <returns></returns>
  // private List<FilterManager.SortCondition> GetSortCondition(int pattern)
  // {
  //     List<FilterManager.SortCondition> sc;
  //     patternSortCondDic.TryGetValue(pattern, out sc);

  //     return sc;
  // }

  // /// <summary>
  // /// 広域端末起動時のブロック一覧画面は当該広域支社レコードで絞り込む
  // /// </summary>
  // /// <param name="baseNo"></param>
  // public void SetBranchFilterCondition(int baseNo)
  // {
  //     List<BaseModel> baseModels = ModelManager.GetList<BaseModel>(b => b.BaseNo == baseNo);
  //     BaseModel baseModel = new BaseModel();
  //     if (baseModels != null && baseModels.Count >= 1)
  //         baseModel = baseModels[0];
  //     else
  //         return;

  //     List<FilterManager.FilterCondition> fcFirstList = patternFilterCondDic[(int)ShutoffBlockPattern.FirstL];
  //     List<FilterManager.FilterCondition> fcSecondList = patternFilterCondDic[(int)ShutoffBlockPattern.SecondL];

  //     FilterManager.FilterCondition newFc = new FilterManager.FilterCondition();
  //     newFc.FilterTag = (int)ShutoffLblockCanvasItem.AreaName;
  //     newFc.ColumnName = GetShutoffLblockColumnName((int)ShutoffLblockCanvasItem.AreaName);
  //     newFc.Value = baseModel.Name;
  //     newFc.FilterType = FilterConst.FilterType.StringList;
  //     newFc.ValueType = FilterConst.ValueType.Equal;

  //     fcFirstList.Add(newFc);
  //     fcSecondList.Add(newFc);
  // }

  // /// <summary>
  // /// 漏えい遭遇率降順ソートボタンをクリック
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void SortLeakEncounterRateButton_Click(object sender, RoutedEventArgs e)
  // {
  //     List<FilterManager.SortCondition> nowSc = GetSortCondition(nowPattern);
  //     // 前の項目の強調表示を元に戻す
  //     int beforeFilterkey = nowSc.Last().SortTag;
  //     (ShutoffLblockGrid.FindName(string.Format(GlobalConst.SORT_BORDER_CANVAS_KEY_STRING, beforeFilterkey)) as Canvas).Visibility = Visibility.Collapsed;
  //     GradientStop nowGs = ShutoffLblockGrid.FindName(string.Format(GlobalConst.SORT_BORDER_GRADIENT_KEY_STRING, beforeFilterkey)) as GradientStop;
  //     if (nowGs != null) nowGs.Color = SupColors.HeaderCanvasColor;

  //     FilterManager.SortCondition s = new FilterManager.SortCondition();
  //     s.SortTag = (int)ShutoffLblockTag.LeakEncounterRate;
  //     s.IsUp = GetInitialSortType(nowPattern, s.SortTag);
  //     nowSc.Clear();
  //     nowSc.Add(s);
  //     SetSortConditionPartsText(); // ソート条件テキストの設定

  //     ShutoffLblock_GridSort(nowSc, nowPattern);
  //     // ソート
  //     if (lblockValList != null && lblockValList.Count() > 0)
  //     {
  //         SortShutoffLblockLblockValList(nowSc);
  //         CreateShutoffLblockList(false); // リスト更新
  //     }
  // }

  // /// <summary>
  // /// Kine超過率上限越え情報
  // /// </summary>
  // public class OverKineRateInfo
  // {
  //     /// <summary>
  //     /// 30Kine超過率上限越えしているかどうか
  //     /// </summary>
  //     public bool isOver30KineRate = false;

  //     /// <summary>
  //     /// 60Kine超過率上限越えしているかどうか
  //     /// </summary>
  //     public bool isOver60KineRate = false;

  //     /// <summary>
  //     /// 70Kine超過率上限越えしているかどうか
  //     /// </summary>
  //     public bool isOver70KineRate = false;

  //     /// <summary>
  //     /// 80Kine超過率上限越えしているかどうか
  //     /// </summary>
  //     public bool isOver80KineRate = false;

  //     /// <summary>
  //     /// 90Kine超過率上限越えしているかどうか
  //     /// </summary>
  //     public bool isOver90KineRate = false;

  //     /// <summary>
  //     /// 最大30Kine超過率上限越えしているかどうか
  //     /// </summary>
  //     public bool isMaxComAbleOver30KineRate = false;

  //     /// <summary>
  //     /// 最大60Kine超過率上限越えしているかどうか
  //     /// </summary>
  //     public bool isMaxComAbleOver60KineRate = false;

  //     /// <summary>
  //     /// 最大70Kine超過率上限越えしているかどうか
  //     /// </summary>
  //     public bool isMaxComAbleOver70KineRate = false;

  //     /// <summary>
  //     /// 最大80Kine超過率上限越えしているかどうか
  //     /// </summary>
  //     public bool isMaxComAbleOver80KineRate = false;

  //     /// <summary>
  //     /// 最大90Kine超過率上限越えしているかどうか
  //     /// </summary>
  //     public bool isMaxComAbleOver90KineRate = false;

  //     /// <summary>
  //     /// 30Kine超過率セル背景色
  //     /// </summary>
  //     public SolidColorBrush over30KineBrush;

  //     /// <summary>
  //     /// 60Kine超過率セル背景色
  //     /// </summary>
  //     public SolidColorBrush over60KineBrush;

  //     /// <summary>
  //     /// 70Kine超過率セル背景色
  //     /// </summary>
  //     public SolidColorBrush over70KineBrush;

  //     /// <summary>
  //     /// 80Kine超過率セル背景色
  //     /// </summary>
  //     public SolidColorBrush over80KineBrush;

  //     /// <summary>
  //     /// 90Kine超過率セル背景色
  //     /// </summary>
  //     public SolidColorBrush over90KineBrush;

  //     /// <summary>
  //     /// 最大30Kine超過率セル背景色
  //     /// </summary>
  //     public SolidColorBrush maxComAbleOver30KineBrush;

  //     /// <summary>
  //     /// 最大60Kine超過率セル背景色
  //     /// </summary>
  //     public SolidColorBrush maxComAbleOver60KineBrush;

  //     /// <summary>
  //     /// 最大70Kine超過率セル背景色
  //     /// </summary>
  //     public SolidColorBrush maxComAbleOver70KineBrush;

  //     /// <summary>
  //     /// 最大80Kine超過率セル背景色
  //     /// </summary>
  //     public SolidColorBrush maxComAbleOver80KineBrush;

  //     /// <summary>
  //     /// 最大90Kine超過率セル背景色
  //     /// </summary>
  //     public SolidColorBrush maxComAbleOver90KineBrush;

  //     /// <summary>
  //     /// Kine超過率塗りつぶし種別(印刷用)
  //     /// </summary>
  //     public FillOverKineRateType fillOverKineRateType = FillOverKineRateType.None;

  //     /// <summary>
  //     /// 最大Kine超過率塗りつぶし種別(印刷用)
  //     /// </summary>
  //     public FillOverKineRateType fillMaxComAbleOverKineRateType = FillOverKineRateType.None;

  //     /// <summary>
  //     /// コンストラクタ
  //     /// </summary>
  //     public OverKineRateInfo(LBlockValModel lv)
  //     {
  //         // 超過率上限越え判定
  //         isOver30KineRate = lv.IsOverKineRate(lv.Over30KineRate, CommonUtil.OVER_30KINE_RATE_LIMIT);
  //         isOver60KineRate = lv.IsOverKineRate(lv.Over60KineRate, CommonUtil.OVER_60KINE_RATE_LIMIT);
  //         isOver70KineRate = lv.IsOverKineRate(lv.Over70KineRate, CommonUtil.OVER_70KINE_RATE_LIMIT);
  //         isOver80KineRate = lv.IsOverKineRate(lv.Over80KineRate, CommonUtil.OVER_80KINE_RATE_LIMIT);
  //         isOver90KineRate = lv.IsOverKineRate(lv.Over90KineRate, CommonUtil.OVER_90KINE_RATE_LIMIT);
  //         isMaxComAbleOver30KineRate = lv.IsOverKineRate(lv.MaxComAbleOver30KineRate, CommonUtil.OVER_30KINE_RATE_LIMIT);
  //         isMaxComAbleOver60KineRate = lv.IsOverKineRate(lv.MaxComAbleOver60KineRate, CommonUtil.OVER_60KINE_RATE_LIMIT);
  //         isMaxComAbleOver70KineRate = lv.IsOverKineRate(lv.MaxComAbleOver70KineRate, CommonUtil.OVER_70KINE_RATE_LIMIT);
  //         isMaxComAbleOver80KineRate = lv.IsOverKineRate(lv.MaxComAbleOver80KineRate, CommonUtil.OVER_80KINE_RATE_LIMIT);
  //         isMaxComAbleOver90KineRate = lv.IsOverKineRate(lv.MaxComAbleOver90KineRate, CommonUtil.OVER_90KINE_RATE_LIMIT);

  //         // セル背景色判定
  //         // 上位のXXkine数から判定
  //         if (isOver90KineRate || isMaxComAbleOver90KineRate)
  //         {
  //             if (isOver90KineRate) over90KineBrush = new SolidColorBrush(GetPinkColorForOverKineRate(isOver90KineRate));
  //             if (isOver90KineRate) fillOverKineRateType = FillOverKineRateType.over90KineRate;
  //             if (isMaxComAbleOver90KineRate) maxComAbleOver90KineBrush = new SolidColorBrush(GetPinkColorForOverKineRate(isMaxComAbleOver90KineRate));
  //             if (isMaxComAbleOver90KineRate) fillMaxComAbleOverKineRateType = FillOverKineRateType.over90KineRate;
  //         }
  //         else if (isOver80KineRate || isMaxComAbleOver80KineRate)
  //         {
  //             if (isOver80KineRate) over80KineBrush = new SolidColorBrush(GetPinkColorForOverKineRate(isOver80KineRate));
  //             if (isOver80KineRate) fillOverKineRateType = FillOverKineRateType.over80KineRate;
  //             if (isMaxComAbleOver80KineRate) maxComAbleOver80KineBrush = new SolidColorBrush(GetPinkColorForOverKineRate(isMaxComAbleOver80KineRate));
  //             if (isMaxComAbleOver80KineRate) fillMaxComAbleOverKineRateType = FillOverKineRateType.over80KineRate;
  //         }
  //         else if (isOver70KineRate || isMaxComAbleOver70KineRate)
  //         {
  //             if (isOver70KineRate) over70KineBrush = new SolidColorBrush(GetPinkColorForOverKineRate(isOver70KineRate));
  //             if (isOver70KineRate) fillOverKineRateType = FillOverKineRateType.over70KineRate;
  //             if (isMaxComAbleOver70KineRate) maxComAbleOver70KineBrush = new SolidColorBrush(GetPinkColorForOverKineRate(isMaxComAbleOver70KineRate));
  //             if (isMaxComAbleOver70KineRate) fillMaxComAbleOverKineRateType = FillOverKineRateType.over70KineRate;
  //         }
  //         else if (isOver60KineRate || isMaxComAbleOver60KineRate)
  //         {
  //             if (isOver60KineRate) over60KineBrush = new SolidColorBrush(GetPinkColorForOverKineRate(isOver60KineRate));
  //             if (isOver60KineRate) fillOverKineRateType = FillOverKineRateType.over60KineRate;
  //             if (isMaxComAbleOver60KineRate) maxComAbleOver60KineBrush = new SolidColorBrush(GetPinkColorForOverKineRate(isMaxComAbleOver60KineRate));
  //             if (isMaxComAbleOver60KineRate) fillMaxComAbleOverKineRateType = FillOverKineRateType.over60KineRate;
  //         }
  //     }

  //     /// <summary>
  //     /// XXKine超過率を超えた場合、桃色を返す
  //     /// </summary>
  //     /// <param name="isOverKineRate">XXKine超過率が上限を超しているかどうか</param>
  //     /// <returns>XXKine超過率を超えた場合、桃色</returns>
  //     public Color GetPinkColorForOverKineRate(bool isOverKineRate)
  //     {
  //         return isOverKineRate ? SupColors.LightPink : new Color(); ;
  //     }
  // }

  // /// <summary>
  // /// 代表局最大SI値に対する塗りつぶし色を返す
  // /// </summary>
  // /// <param name="representMaxSi">代表局最大SI値</param>
  // /// <param name="shutoffBorderSi">遮断判定SI値</param>
  // /// <returns>塗りつぶし色</returns>
  // public Color GetRepresentMaxSiColor(double? representMaxSi, int shutoffBorderSi)
  // {
  //     Color color = new Color();

  //     if (representMaxSi != null)
  //     {
  //         if (representMaxSi >= shutoffBorderSi)
  //             color = SupColors.LightPink;
  //     }

  //     return color;
  // }

  // /// <summary>
  // /// 供給停止ブロック選択
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // /// <param name="overOutageNum">外管被害数累計閾値</param>
  // private void SelectOverOutage(object sender, RoutedEventArgs e, int overOutageNum)
  // {
  //     if (lblockValList == null) return;
  //     if (lblockValList.Count == 0) return;

  //     // 全選択チェックボックスのチェックを外す
  //     UncheckAllShutoff();
  //     // チェックボックスのチェックを外す
  //     foreach (var checkBlockList in lblockValList.Where(o => o.LBlock.IsChecked))
  //     {
  //         UncheckShutoffLblockId(checkBlockList.LBlockId);
  //     }

  //     // 漏えい遭遇ソート
  //     SortLeakEncounterRateButton_Click(sender, e);

  //     // 供給停止ブロック選択対象リスト
  //     var list = lblockValList.Where(o => o.LabelLpSupplyDmgCntEmergency >= THRESHOLD_DMG_CNT).ToList();

  //     // 漏えい遭遇率降順ソート後の本支管被害数(累計)緊急の累計
  //     var cnt = lblockValList[0].SumLpSupplyDmgCntEmergency;
  //     foreach (var wk in list)
  //     {
  //         if (overOutageNum > cnt) break;
  //         var c = shutoffLblockListCanvas.FindName(string.Format(SHUTOFF_LBLOCK_CANVAS_KEY_STRING, wk.LBlockId)) as Canvas;
  //         if (c == null)
  //         {
  //             App.Current.Logger.Warn(string.Format("遠隔遮断実施画面(Lブロック)のキャンバスの名前のキー文字列：{0} を取得できませんでした.", string.Format(SHUTOFF_LBLOCK_CANVAS_KEY_STRING, wk.LBlockId)));
  //             return;
  //         }
  //         cnt -= wk.LabelLpSupplyDmgCntEmergency;
  //         ((c.Children[(int)ShutoffLblockCanvasItem.ShutoffChecked] as Border).Child as CheckBox).IsChecked = true;

  //         wk.LBlock.IsChecked = true;
  //         controller.FillRemoteOperateLBlockChildren(wk.LBlock.Name, wk.LBlock.IsChecked);
  //         shutoffRowHighlight(wk);
  //     }

  //     // 需要家件数セット
  //     SetCustomerCount();

  //     // 道路上の被害推定(継続地区累計、合計)の埋め込み
  //     SetLblockLpSupplyDmgCnt();
  // }

  // /// <summary>
  // /// 休日・夜間(「外管被害数累計閾値(1)」件超)供給停止ブロック選択
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void SelectOverOutageForThresholdSumDmgCnt1Button_Click(object sender, RoutedEventArgs e)
  // {
  //     SelectOverOutage(sender, e, GlobalConst.THRESHOLD_SUM_DMG_CNT_1);
  // }

  // /// <summary>
  // /// 平日・日中(「外管被害数累計閾値(2)」件超)供給停止ブロック選択
  // /// </summary>
  // /// <param name="sender"></param>
  // /// <param name="e"></param>
  // private void SelectOverOutageForThresholdSumDmgCnt2Button_Click(object sender, RoutedEventArgs e)
  // {
  //     SelectOverOutage(sender, e, GlobalConst.THRESHOLD_SUM_DMG_CNT_2);
  // }

  /*End ShutoffBlock.cs */

  const [tableData, setTableData] = useState<TableCellType[]>([])
  const [subRowData, setSubRowData] = useState<TableCellType[]>([])
  const [sblockValList, setSblockValList] = useState<SBlockValModel[]>([])
  const [sblockList, setSblockList] = useState<SBlockModel[]>([])
  const [rowsCount, setRowsCount] = useState(0)
  const [isCheckAll, setIsCheckAll] = useState(false)
  const dispatch = useAppDispatch()
  const toggleCheckBox = (rowIndex: number) => {
    const newTableData = [...tableData]
    newTableData[rowIndex].遮断 = !newTableData[rowIndex].遮断
    setTableData(newTableData)
  }
  const toggleCheckAll = () => {
    const isCheck = !isCheckAll

    const newTableData = [...tableData]
    newTableData.map((data) => {
      data.遮断 = isCheck
      return data
    })
    setIsCheckAll(isCheck)
    setTableData(newTableData)
  }
  const showSubRow = (rowSelected: any) => {
    const lblockId = rowSelected.original.lblockId
    const dataFilter = sblockValList.filter((sb) => sb.LBlockId === lblockId)

    convertSBlockData(dataFilter, sblockList)
  }
  const showCheckPopup = () => {
    dispatch(
      createWindow({
        point: '2次の停止ブロックを選択(遮断にチェック)してください',
        modalType: ModalTypeConst.IS_CHECK,
        displayType: DisplayTypeConst.SINGLE_MODAL,
        isBlock: true,
        left: 0,
        top: 0,
      })
    )
  }
  const convertSBlockData = (sblockValList: SBlockValModel[], sblockList: SBlockModel[]) => {
    const isFirstDmgEstimationJudgeCompleted = true
    const subRowData: TableCellType[] = []
    for (const sv of sblockValList) {
      const tableCell = {
        遮断: '',
        ブロック番号: sv.getSBlock(sblockList)?.Name,
        停止判断: '',
        依頼状況: '',
        総需要家件数: sv.getSBlock(sblockList)?.CustomerCnt,
        供給継続需要家件数: sv.getContinueCustomerCnt(sblockList),
        ブロック区分: '',
        遮断設定: '',
        需要家漏えい遭遇率: sv.getLabelLeakEncounterRate(sblockList),
        緊急: isFirstDmgEstimationJudgeCompleted
          ? commonUtil.ToRoundUp(sv.LabelLpSupplyDmgCnt * LpDmgCntConst.EMERGENCY_RATE)
          : commonUtil.GetNoData(),
        最大SI: sv.LabelMaxSi,
        ガバナ停止率: sv.LabelGovernorStopRate,
        '最低LP(単独除く)': sv.LabelLpMinConnected,
        '最低LP(単独含む)': '(' + sv.LabelLpMin + ')',
        グラフ表示: '表示',
        ガバナ一覧: '表示',
        D復旧済Sブロック: sv.LabelRemoteOpenCompleted,
        停電率: sv.LabelPowerFailureRate,
        火災件数: sv.LabelFireCnt2 === commonUtil.GetNoData() ? 0 : sv.LabelFireCnt2, //
        漏えい受付: sv.LabelLeakCnt2 === commonUtil.GetNoData() ? 0 : sv.LabelLeakCnt2, //
      } as TableCellType
      subRowData.push(tableCell)
    }
    setSubRowData(subRowData)
  }
  const convertLBlockData = async (
    lblockValList: LBlockValModel[],
    lblockList: LBlockModel[],
    sblockValList: SBlockValModel[],
    sblockList: SBlockModel[],
    kDashBlockLBlockList: KDashBlockLBlockModel[],
    kDashBlockList: KDashBlockModel[]
  ) => {
    const tableCells: TableCellType[] = []

    for (const lv of lblockValList) {
      const LBlock = lv.getLBlock(lblockList)

      if (LBlock) {
        const tableCell: TableCellType = {
          lblockId: LBlock.Key,
          AllKBlockName: LBlock.getAllKBlockNameList(kDashBlockLBlockList, kDashBlockList),
          遮断: false,
          ブロック番号: LBlock.Name,
          停止判断: lv.LabelJudgeResult,
          依頼状況: lv.LabelShutoffStatus,
          総需要家件数: LBlock.CustomerCnt,
          供給継続需要家件数: lv.ContinueCustomerCnt(sblockValList, sblockList, lblockList),
          ブロック区分: LBlock.LabelBlockCategory,
          遮断設定: LBlock.ShutoffBorderSi,
          需要家漏えい遭遇率: '0.00', //
          緊急: '0 (0)', //
          最大SI: lv.LabelMaxSi,
          ガバナ停止率: lv.LabelGovernorStopRate,
          '最低LP(単独除く)': lv.LabelLpMinConnected,
          '最低LP(単独含む)': '(' + lv.LabelLpMin + ')',
          グラフ表示: '',
          ガバナ一覧: '表示',
          D復旧済Sブロック: lv.LabelExistRemoteOpenSBlock(sblockValList),
          停電率: isNaN(parseInt(lv.LabelPowerFailureRate))
            ? lv.LabelPowerFailureRate
            : parseInt(lv.LabelPowerFailureRate),
          火災件数: isNaN(parseInt(lv.LabelFireCnt)) ? lv.LabelFireCnt : parseInt(lv.LabelFireCnt),
          漏えい受付: isNaN(parseInt(lv.LabelLeakCnt))
            ? lv.LabelLeakCnt
            : parseInt(lv.LabelLeakCnt),
        } as TableCellType
        tableCells.push(tableCell)
      }
    }
    setTableData(tableCells)
  }

  const filterLblockValList = (lblockValList: LBlockValModel[], lblockList: LBlockModel[]) => {
    lblockValList = lblockValList.filter((o) => {
      const LBlock = o.getLBlock(lblockList)
      return LBlock != null && o.getKBlockNo(LBlock) < 90
    })
    lblockValList = lblockValList.filter((o) => !o.isShutoffFirstTarget)
    return lblockValList
  }
  const filterSblockValList = (
    sblockValList: SBlockValModel[],
    sblockList: SBlockModel[],
    lblockValList: LBlockValModel[],
    lblockList: LBlockModel[]
  ) => {
    sblockValList = sblockValList.filter((o) => {
      const SBlock = o.getSBlock(sblockList)
      const LBlockVal = o.getLBlockVal(lblockValList)
      return (
        SBlock != null &&
        LBlockVal != null &&
        LBlockVal.getLBlock(lblockList) != null &&
        o.getKBlockNo(sblockList) < 90
      )
    })

    return sblockValList
  }

  const lBlockValModels = useLiveQuery(() => db.LBlockValModel.toArray())
  const lBlockModels = useLiveQuery(() => db.LBlockModel.toArray())
  const sBlockValModels = useLiveQuery(() => db.SBlockValModel.toArray())
  const sBlockModels = useLiveQuery(() => db.SBlockModel.toArray())
  const kDashBlockLBlockModels = useLiveQuery(() => db.KDashBlockLBlockModel.toArray())
  const kDashBlockModels = useLiveQuery(() => db.KDashBlockModel.toArray())
  useEffect(() => {
    if (
      lBlockValModels &&
      lBlockModels &&
      sBlockValModels &&
      sBlockModels &&
      kDashBlockLBlockModels &&
      kDashBlockModels
    ) {
      let lblockValList = lBlockValModels.map((o) => Object.assign(new LBlockValModel(), o))
      const lblockList = lBlockModels.map((o) => Object.assign(new LBlockModel(), o))
      lblockValList = filterLblockValList(lblockValList, lblockList)

      let sblockValList = sBlockValModels.map((o) => Object.assign(new SBlockValModel(), o))
      const sblockList = sBlockModels.map((o) => Object.assign(new SBlockModel(), o))
      sblockValList = filterSblockValList(sblockValList, sblockList, lblockValList, lblockList)

      const kDashBlockLBlockList = kDashBlockLBlockModels.map((o) =>
        Object.assign(new KDashBlockLBlockModel(), o)
      )

      const kDashBlockList = kDashBlockModels.map((o) => Object.assign(new KDashBlockModel(), o))

      setSblockList(sblockList)
      setSblockValList(sblockValList)
      convertLBlockData(
        lblockValList,
        lblockList,
        sblockValList,
        sblockList,
        kDashBlockLBlockList,
        kDashBlockList
      )
    }
  }, [
    kDashBlockLBlockModels,
    kDashBlockModels,
    lBlockModels,
    lBlockValModels,
    sBlockModels,
    sBlockValModels,
  ])
  return (
    <Layout>
      <div className="ShutoffBlock">
        <div className="ShutoffBlock_top">
          <div className="ShutoffBlock__title">
            <span>ブロック一覧</span>
            <button className="btn">印刷・保存</button>
          </div>
          <div className="ShutoffBlock__Grid">
            <div style={{ width: 1100 }}>
              <table className="ShutoffBlock__PatternGrid">
                <tbody>
                  <tr>
                    <td></td>
                    <td colSpan={4}>ブロック遮断検討・操作</td>
                    <td>遮断結果依頼</td>
                    <td></td>
                    <td>感震遮断Sブロック</td>
                  </tr>

                  <tr>
                    <td></td>
                    <td>停止判断ブロック</td>
                    <td></td>
                    <td>津波ブロック</td>
                    <td>TGCS中圧供給停止</td>
                    <td>状況確認</td>
                    <td></td>
                    <td>状況確認</td>
                  </tr>

                  <tr>
                    <td></td>
                    <td>第1次緊急停止</td>
                    <td>第2次緊急停止</td>
                    <td style={{ fontSize: '9px' }}>※左の停止判断に係わらず</td>
                    <td>実施ブロック</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td></td>
                    <td>判断Lブロック</td>
                    <td>候補Lブロック</td>
                    <td style={{ fontSize: '9px' }}>津波ブロックを常に表示</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>Lブロック</td>
                    <td style={{ border: '3px solid red' }}>-</td>
                    <td style={{ border: '1px solid #aaaaaa' }}>-</td>
                    <td style={{ border: '1px solid #aaaaaa' }}>-</td>
                    <td style={{ border: '1px solid #aaaaaa' }}>-</td>
                    <td style={{ border: '1px solid #aaaaaa' }}>-</td>
                    <td></td>
                    <td style={{ border: '1px solid #aaaaaa' }}>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table className="ShutoffBlock__CustomerCountGrid">
                <tbody>
                  <tr>
                    <td>供給停止件数</td>
                    <td style={{ textAlign: 'right' }}>3,406,911 件</td>
                  </tr>
                  <tr>
                    <td>選択ブロック件数</td>
                    <td style={{ textAlign: 'right' }}>0 件</td>
                  </tr>
                  <tr>
                    <td>合計件数</td>
                    <td style={{ textAlign: 'right' }}>3,406,911 件</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="CommentStackPanel">
            <div className="TsunamiCommentLine">
              相模湾沿いで大津波警報と水位警報の発報を確認した場合、遮断を実行してください。
            </div>
            <div className="BranchCommentLine">{}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
            <h3
              style={{
                display: 'block',
                color: 'red',
                width: '160px',
                fontSize: '18px',
                fontWeight: 'normal',
                padding: '0 0 0 6px',
              }}
            >
              【遮断操作画面】
            </h3>
            <div
              className="ShutoffBlockListPatternBorder_1"
              style={{
                border: '1px solid black',
                borderRight: 'none',
                color: 'white',
                background: '#2F3699',
                width: '100px',
                height: '40px',
                lineHeight: '40px',
                textAlign: 'center',
                margin: '3px 0 3px 6px',
              }}
            >
              簡易表示
            </div>
            <div
              className="ShutoffBlockListPatternBorder_2"
              style={{
                border: '1px solid black',
                background: 'white',
                color: '#0000FF',
                width: '100px',
                height: '40px',
                lineHeight: '40px',
                textAlign: 'center',
                margin: '3px 6px 3px 0',
              }}
            >
              詳細表示
            </div>
            <FilterConditionPart className="ShutoffBlockFilterConditionParts" />
          </div>
          <div className="SortLeakEncounterRateStackPanel">
            <button className="btn" style={{ marginLeft: '15px', padding: '0 6px' }}>
              ①各ブロックを需要家漏えい遭遇率で並び替える
            </button>
            <span
              style={{
                fontSize: '12px',
                textAlign: 'center',
                margin: '4px 0 3px 6px',
                color: '#421173',
                whiteSpace: 'nowrap',
              }}
            >
              ※需要家漏えい遭遇率＝（供給継続地区の本支管被害数【緊急】）／（供給継続地区の需要家件数÷10000）
            </span>
          </div>
          <div className="SelectOverOutageStackPanel">
            <span style={{ marginLeft: '35px', verticalAlign: 'super' }}>|</span>
            <span style={{ verticalAlign: 'bottom' }}>----&gt;</span>
            <button
              className="SelectOverOutageButtonForThresholdSumDmgCnt1 btn"
              style={{
                margin: '0 3px',
              }}
            >
              {`②休日・夜間({0}件以上)供給停止ブロック選択`}
            </button>
            <span style={{ marginLeft: '35px', verticalAlign: 'super' }}>|</span>
            <span style={{ verticalAlign: 'bottom' }}>----&gt;</span>
            <button
              className="SelectOverOutageButtonForThresholdSumDmgCnt2 btn"
              style={{
                margin: '0 3px',
              }}
            >
              {`②平日・日中({0}件以上)供給停止ブロック選択`}
            </button>
            <span
              style={{
                fontSize: '12px',
                textAlign: 'center',
                marginLeft: '6px',
                color: '#421173',
              }}
            >
              ※本支管被害数【緊急】が5件以上のブロックから需要家漏えい遭遇率が高い順に対象ブロックを一括選択
            </span>
          </div>
          <div style={{ margin: '7px 5px 5px' }}>
            <div className="ShutoffLblockGrid"></div>
            <div className="ShutoffSblockGrid"></div>
            <div className="ShutoffReqStatusGrid"></div>
            <div className="FeelEqShutoffStatusGrid"></div>
          </div>
        </div>
        <TableGrid
          setRowsCount={setRowsCount}
          tableData={tableData}
          toggleCheckBox={toggleCheckBox}
          toggleCheckAll={toggleCheckAll}
          isCheckAll={isCheckAll}
          showSubRow={showSubRow}
          subRowData={subRowData}
        />
        <div className="ShutoffBlock__bottom">
          <div className="OperateStackPanel">
            <button className="btn ShutoffExecuteButton">遠隔遮断実行</button>
            <button className="btn CheckSheetButton" onClick={showCheckPopup}>
              チェックシート
            </button>
            <button className="btn OperationHistoryButton">操作履歴表示</button>
          </div>
          <div className="SblockOperateStackPanel">
            <button className="btn SblockShutoffExecuteButton">遠隔遮断実行</button>
            <button className="btn SblockCheckSheetButton">チェックシート</button>
            <button className="btn SblockOperationHistoryButton">操作履歴表示</button>
          </div>
          <div className="TotalShutoffCntText">{rowsCount}件を表示</div>
        </div>
      </div>
    </Layout>
  )
}

export default ShutoffBlock
