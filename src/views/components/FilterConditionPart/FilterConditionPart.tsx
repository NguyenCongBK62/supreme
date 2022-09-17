import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { ClearFilterConditionParts } from '../../../store/modules/FilterConditionPart'

import './FilterConditionPart.scss'

export interface ObjectEl {
  Text: string
  style?: React.CSSProperties
}

const FilterConditionPart = ({ className }: { className?: string }) => {
  const filterArr = useAppSelector((state) => state.FilterConditionPartReducer.filterArr)
  const sortArr = useAppSelector((state) => state.FilterConditionPartReducer.sortArr)
  const dispatch = useAppDispatch()
  // /// <summary>
  // /// 絞り込み条件文字列(デフォルト)
  // /// </summary>
  // const DEFAULT_COND_STR = 'なし'
  // const FilterConditionPartsText: ObjectEl = {
  //   Text: '',
  // }

  // const SortConditionPartsText: ObjectEl = {
  //   Text: '',
  // }
  // const FilterConditionPartsStatusText: React.CSSProperties = {}
  // /// <summary>
  // /// 全件表示処理イベントハンドラ
  // /// </summary>
  // /// <param name="sender">イベント発生元オブジェクト</param>
  // /// <param name="e">イベントのデータ</param>
  // type AllShowEventHandler = (sender: object | null, e: any) => void

  /// <summary>
  /// 全件表示処理イベント
  /// </summary>
  // event  AllShowEvent: AllShowEventHandler;

  /// <summary>
  /// コンストラクタ
  /// </summary>
  // function FilterConditionParts() {
  //   InitializeComponent();
  //   アニメーション設定
  //   DoubleAnimation da = new DoubleAnimation();
  //   da.From = 1.0;
  //   da.To = 0.1;
  //   da.Duration = new Duration(new TimeSpan(0, 0, 0, 0, 500));
  //   da.SetValue(Storyboard.TargetNameProperty, FilterConditionPartsStatusText.Name);
  //   da.SetValue(Storyboard.TargetPropertyProperty, new PropertyPath("Opacity"));
  //   da.AutoReverse = true;
  //   da.RepeatBehavior = RepeatBehavior.Forever;
  //   FilterConditionPartsBlinkStory.Children.Add(da);
  // }

  // 初期化
  // ;(function Init() {
  //   ClearFilterConditionPartsText()
  // })()

  /// <summary>
  /// 絞り込み条件テキストの設定
  /// </summary>
  /// <param name="condStr">絞り込み条件文字列</param>
  // function SetFilterConditionPartsText(condStr: string) {
  //   if (condStr === '') condStr = DEFAULT_COND_STR

  //   FilterConditionPartsText.Text = condStr
  //   if (condStr === DEFAULT_COND_STR) {
  //     // FilterConditionPartsBlinkStory.Stop()
  //     FilterConditionPartsStatusText.visibility = 'collapse'
  //   } else {
  //     // FilterConditionPartsBlinkStory.Begin()
  //     FilterConditionPartsStatusText.visibility = 'visible'
  //   }
  // }

  /// <summary>
  /// 絞り込み条件テキストのクリア
  /// </summary>
  /// <param name="sender"></param>
  /// <param name="e"></param>
  // function ClearFilterConditionPartsText() {
  //   SetFilterConditionPartsText(DEFAULT_COND_STR)
  // }

  /// <summary>
  /// ソート条件テキストの設定
  /// </summary>
  /// <param name="condStr">絞り込み条件文字列</param>
  // function SetSortConditionPartsText(condStr: string) {
  //   if (condStr === '') condStr = DEFAULT_COND_STR

  //   SortConditionPartsText.Text = condStr
  // }

  /// <summary>
  /// 絞り込み条件テキストのクリア
  /// </summary>
  /// <param name="sender"></param>
  /// <param name="e"></param>
  // function ClearSortConditionPartsText() {
  //   SetSortConditionPartsText(DEFAULT_COND_STR)
  // }

  /// <summary>
  /// 全件表示ボタンクリック
  /// </summary>
  /// <param name="sender"></param>
  /// <param name="e"></param>
  // function AllShowButton_Click() {
  //   // 絞り込み条件テキストのクリア
  //   ClearFilterConditionPartsText()
  //   // ソート条件テキストのクリア
  //   ClearSortConditionPartsText()

  //   // if (AllShowEvent != null) AllShowEvent(null, null)
  // }

  return (
    <div className={`FilterConditionPart ${className ? className : ''}`}>
      <div className="FilterConditionPartsCommentText" style={{ fontSize: '20px' }}></div>
      <button
        className="btn ClearFilterConditionParts"
        onClick={() => {
          dispatch(ClearFilterConditionParts(true))
        }}
      >
        全件表示
      </button>
      <div style={{ display: 'inline-block' }}>
        <p>
          <span className="text0">絞込み条件</span>
          <span
            className={`FilterConditionPartsStatusText ${
              filterArr.length > 0 ? 'd-initial' : 'd-none'
            }`}
            // style={{ ...FilterConditionPartsStatusText }}
          >
            (絞込み表示中)
          </span>
          <span className="FilterConditionPartsBlinkStory"></span>
          <span style={{ margin: '3px 0 0 5px' }}>:</span>
          <span className="FilterConditionPartsText">
            {/* {FilterConditionPartsText.Text} */}
            {filterArr.length === 0
              ? 'なし'
              : filterArr
                  .map((item: { id: string; value: object }) => {
                    return `${item?.id} ${
                      typeof item.value === 'string'
                        ? item.value
                        : Object.values(item.value).join('')
                    }`
                  })
                  .join(' , ')}
          </span>
        </p>
        <p className="SortTextStackPanel">
          <span className="text1">ソート条件　</span>
          <span style={{ margin: '3px 0 0 5px' }}>:</span>
          <span className="SortConditionPartsText">
            {/* {SortConditionPartsText.Text} */}
            {sortArr.length === 0
              ? 'なし'
              : sortArr
                  .map((item: { id: string; desc: boolean }) => {
                    return `${item.id}  ${item.desc ? '降順' : '昇順'}`
                  })
                  .join(' , ')}
          </span>
        </p>
      </div>
    </div>
  )
}

export default FilterConditionPart
