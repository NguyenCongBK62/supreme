import React from 'react'
import Paginate from '../../components/Paginate/Paginate'

const PatrolList = () => {
  return (
    <div style={{ width: 1470, height: 555, background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <p className="SelectStation"></p>
        <p style={{ margin: '10px 0 0 18px' }}>停止判断：</p>
        <input type="radio" name="PatrolList__radio" id="全て" />
        <label htmlFor="全て">全て</label>
        <input type="radio" name="PatrolList__radio" id="1次" />
        <label htmlFor="1次">1次</label>
        <input type="radio" name="PatrolList__radio" id="2次" />
        <label htmlFor="2次">2次</label>
      </div>
      <div className="CommentForTsunami">
        <p className="CommentForTsunami1"></p>
        <div className="HelpLinkForTsunami">
          <p>(説明資料は、</p>
          <a href="http://172.16.34.152/supreme/help/doc/tsunami.pdf" className="TsunamiHelpLink">
            こちら
          </a>
          <p>)</p>
        </div>
        <p className="CommentForTsunami2"></p>
        <p className="CommentForTsunami3"></p>
      </div>

      <div>
        <Paginate
          canPreviousPage={false}
          canNextPage={false}
          pageCount={0}
          gotoPage={function (updater: number | ((pageIndex: number) => number)): void {
            throw new Error('Function not implemented.')
          }}
          nextPage={function (): void {
            throw new Error('Function not implemented.')
          }}
          previousPage={function (): void {
            throw new Error('Function not implemented.')
          }}
          totalRow={0}
        />
        <button className="btn">印刷・保存</button>
        <button className="btn">一括・印刷保存</button>
        <button className="btn">閉じる</button>
      </div>
    </div>
  )
}

export default PatrolList
