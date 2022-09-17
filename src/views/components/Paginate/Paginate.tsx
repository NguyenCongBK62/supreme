import { Button } from '@mui/material'
import { styled } from '@mui/styles'
import React from 'react'
import './Paginate.scss'

const PagenateButton = styled(Button)({
    color: 'black',
    fontSize: '12px',
})

type PagenateType = {
  pagenateNum?: number
  style?: React.CSSProperties
  canPreviousPage: boolean
  canNextPage: boolean
  pageOptions?: number[]
  pageCount: number
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void
  nextPage: () => void
  previousPage: () => void
  totalRow: number
}
const Paginate = ({
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  totalRow,
  nextPage,
  previousPage,
  style,
}: PagenateType) => {
  const [pageIndex, pageSize]: number[] = pageOptions!
  // /// <summary>
  //       /// 現在のページ番号
  //       /// </summary>
  //       let pageNum = 0;

  //       /// <summary>
  //       /// ページネートする件数
  //       /// </summary>
  //       let pagenateNum = 0;

  //       /// <summary>
  //       /// 表示データ総件数
  //       /// </summary>
  //       let allCount: number | null = null;

  //       /// <summary>
  //       /// 表示データ開始数
  //       /// </summary>
  //       let firstCount: number | null = null;

  //       /// <summary>
  //       /// 表示データ終了数
  //       /// </summary>
  //       let lastCount: number | null = null;

  //       /// <summary>
  //       /// ページネート(リンク部)クリック時に発生させるイベントハンドラ
  //       /// </summary>
  //       /// <param name="sender">イベント発生元オブジェクト</param>
  //       /// <param name="e">イベントのデータ</param>
  //       type PagenateEventHandler = (sender: object, e: any) => void;

  //       // public event PagenateEventHandler PagenateEvent;

  //       /// <summary>
  //       /// コンストラクタ
  //       /// </summary>
  //       // public Pagenate()
  //       // {
  //       //     InitializeComponent();
  //       // }

  //       /// <summary>
  //       /// 初期化処理
  //       /// </summary>
  //       /// <param name="pagenateNum"></param>
  //       function Init(pagenateNumParam: number)
  //       {
  //           pagenateNum = pagenateNumParam;

  //           // ページネートテキストの初期化
  //           InitPagenateText();
  //       }
  //       Init(pagenateNum)

  //       /// <summary>
  //       /// ページネート再描画
  //       /// </summary>
  //       /// <param name="allCount"></param>
  //       function RedrawPagenate(allCountParam: number)
  //       {
  //           allCount = allCountParam;
  //           SetPagenate();
  //       }

  //       /// <summary>
  //       /// ページネートセット
  //       /// </summary>
  //       function SetPagenate()
  //       {
  //           if (allCount != 0 && allCount)
  //           {
  //               while ((pagenateNum * pageNum) + 1 > allCount)
  //                   pageNum -= 1;

  //               firstCount = (pagenateNum * pageNum) + 1;
  //               lastCount = (pagenateNum * (pageNum + 1));
  //               if (lastCount > allCount) { lastCount = allCount; }

  //               for (const v of PagenateStackPanel.Children)
  //               {
  //                   TextBlock tb = v as TextBlock;
  //                   // 詳細部をセット
  //                   if (tb != null && tb.Name == "PagenateDetail")
  //                   {
  //                       tb.Text = string.Format("{0}件中{1}-{2}件を表示", allCount, firstCount, lastCount);
  //                   }
  //                   // 最初/前テキストセット
  //                   else if (tb != null && (tb.Name == "PagenateFirst" || tb.Name == "PagenatePrev"))
  //                   {
  //                       SetPagenateLinkText(tb, (firstCount != 1));
  //                   }
  //                   // 次/最後テキストセット
  //                   else if (tb != null && (tb.Name == "PagenateNext" || tb.Name == "PagenateLast"))
  //                   {
  //                       SetPagenateLinkText(tb, (lastCount < allCount));
  //                   }
  //               }
  //           }
  //           else
  //           {
  //               firstCount = 0;
  //               lastCount = 0;
  //               InitPagenateText();
  //           }
  //       }

  //       /// <summary>
  //       /// ページネートする件数を設定する
  //       /// </summary>
  //       /// <param name="pagenateNum">ページネートする件数</param>
  //       public void SetPagenateNum(int pagenateNum)
  //       {
  //           this.pagenateNum = pagenateNum;
  //       }

  //       /// <summary>
  //       /// ページネートする件数を返す
  //       /// </summary>
  //       /// <returns>ページネートする件数</returns>
  //       public int GetPagenateNum()
  //       {
  //           return pagenateNum;
  //       }

  //       /// <summary>
  //       /// 現在のページを設定する
  //       /// </summary>
  //       /// <param name="pageNum">ページ</param>
  //       public void SetPageNum(int pageNum)
  //       {
  //           this.pageNum = pageNum;
  //       }

  //       /// <summary>
  //       /// 現在のページを返す
  //       /// </summary>
  //       /// <returns>現在のページ</returns>
  //       public int GetPageNum()
  //       {
  //           return pageNum;
  //       }

  //       /// <summary>
  //       /// 表示データ開始数を返す
  //       /// </summary>
  //       /// <returns>表示データ開始数</returns>
  //       public int GetFirstCount()
  //       {
  //           return firstCount;
  //       }

  //       /// <summary>
  //       /// 表示データ終了数を返す
  //       /// </summary>
  //       /// <returns>表示データ終了数</returns>
  //       public int GetLastCount()
  //       {
  //           return lastCount;
  //       }

  //       /// <summary>
  //       /// 現在のページをクリアする
  //       /// </summary>
  //       public void ClearPage()
  //       {
  //           pageNum = 0;
  //           SetPagenate();
  //       }

  //       /// <summary>
  //       /// ページネートテキストの初期化
  //       /// </summary>
  //       private void InitPagenateText()
  //       {
  //           foreach (var v in PagenateStackPanel.Children)
  //           {
  //               TextBlock tb = v as TextBlock;
  //               if (tb.Name != "")
  //               {
  //                   if (tb.Name == "PagenateDetail")
  //                   {
  //                       tb.Text = "";
  //                   }
  //                   else
  //                   {
  //                       SetPagenateLinkText(tb, false);
  //                   }
  //               }
  //           }
  //       }

  //       // <summary>
  //       /// ページネートテキスト(リンク部)をセット
  //       /// </summary>
  //       /// <param name="tb">対象のTextBlock</param>
  //       /// <param name="isLink">リンクするかどうか</param>
  //       private void SetPagenateLinkText(TextBlock tb, bool isLink)
  //       {
  //           tb.MouseLeftButtonDown -= Pagenate_MouseLeftButtonDown;
  //           if (isLink)
  //           {
  //               tb.Foreground = new SolidColorBrush(Colors.Blue);
  //               tb.Opacity = 1;
  //               tb.TextDecorations = TextDecorations.Underline;
  //               tb.Cursor = Cursors.Hand;
  //               tb.MouseLeftButtonDown += Pagenate_MouseLeftButtonDown;
  //           }
  //           else
  //           {
  //               tb.Foreground = new SolidColorBrush(Colors.Black);
  //               tb.Opacity = 0.5;
  //               tb.TextDecorations = null;
  //               tb.Cursor = null;
  //           }
  //       }

  //       /// <summary>
  //       /// ページネートテキスト(リンク部)クリックイベントハンドラ
  //       /// </summary>
  //       /// <param name="sender"></param>
  //       /// <param name="e"></param>
  //       private void Pagenate_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
  //       {
  //           TextBlock tb = sender as TextBlock;

  //           if (tb.Name == "PagenateFirst")
  //           {
  //               pageNum = 0;
  //           }
  //           else if (tb.Name == "PagenatePrev")
  //           {
  //               pageNum -= 1;
  //           }
  //           else if (tb.Name == "PagenateNext")
  //           {
  //               pageNum += 1;
  //           }
  //           else if (tb.Name == "PagenateLast")
  //           {
  //               // 最後のページを求める
  //               int tempNum = (allCount / pagenateNum);
  //               // 表示件数でちょうど割り切れる場合は前のページ
  //               if (allCount % pagenateNum == 0) { tempNum -= 1; }

  //               pageNum = tempNum;
  //           }

  //           SetPagenate();
  //           if (PagenateEvent != null) PagenateEvent(null, null);
  //       }
  return (
    <div className="PagenateStackPanel" style={{ ...style }}>
      <div className="PagenateDetail">{`${totalRow}件中${pageIndex * pageSize + 1}-${
        canNextPage ? (pageIndex + 1) * pageSize : totalRow
      }件を表示`}</div>
      <PagenateButton
        className={`PagenateFirst`}
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      >
        最初
      </PagenateButton>
      <span>|</span>
      <PagenateButton
        className={`PagenatePrev`}
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        前
      </PagenateButton>
      <span>|</span>
      <PagenateButton
        className={`PagenateNext`}
        onClick={() => nextPage()}
        disabled={!canNextPage}
      >
        次
      </PagenateButton>
      <span>|</span>
      <PagenateButton
        className={`PagenateLast`}
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        最後
      </PagenateButton>
    </div>
  )
}

export default Paginate
