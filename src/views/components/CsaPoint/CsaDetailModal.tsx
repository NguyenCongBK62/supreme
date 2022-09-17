import './style.scss'
export type posModal = {
  top: number
  left: number
}

export type dataModal = {

}
function CsaDetailModal({
  modal,
}: {
  modal: any,
}) {
  return (
    <div className="point-content">
      <div className="point-content-row-1">
        <div className="row-col point-content-row-1-col-1">
          <span>名称{modal.point.CsaNo}</span>
          <span>ブロック番号</span>
          <span>低圧連絡あり</span>
        </div>
        <div className="row-col point-content-row-1-col-2">
          <span></span>
          <span>遮断設定SI値</span>
        </div>
        <div className="point-content-row-col-3"></div>
      </div>
      <div className="point-content-row-2">
        <div className="row-col point-content-row-2-col-1">
          <span>[データ更新時刻]</span>
        </div>
        <div className="row-col point-content-row-2-col-2">
          <span></span>
        </div>
        <div className="row-col point-content-row-2-col-3">
          <span></span>
        </div>
      </div>
      <div className="point-content-row-3">
        <div className="row-col point-content-row-3-col-1">
          <span>[LP]</span>
          <span>[流量1]</span>
          <span>[TC可]</span>
          <span>[SI]</span>
          <span>[最大SI]</span>
          <span>[供給状況]</span>
        </div>
        <div className="row-col point-content-row-3-col-2">
          <span>value</span>
          <span>value</span>
          <span>value</span>
          <span>value</span>
          <span>value</span>
          <span>value</span>
        </div>
        <div className="row-col point-content-row-3-col-3">
          <span>[MPA]</span>
          <span>[流量2]</span>
          <span>[停電]</span>
          <span>[GAL]</span>
          <span>[最大GAL]</span>
          <span>[液状化警報]</span>
        </div>
        <div className="row-col point-content-row-3-col-4">
          <span>value</span>
          <span>value</span>
          <span>value</span>
          <span>value</span>
          <span>value</span>
          <span>value</span>
        </div>
        <div className="row-col point-content-row-3-col-5">
          <span>[MPB]</span>
        </div>
        <div className="row-col point-content-row-3-col-6">
          <span>value</span>
        </div>
      </div>
      <div className="point-content-row-4">
        <div className="row-col point-content-row-4-col-1">
          <span>[中圧漏えい音検知]</span>
          <span>[SI  最大値更新]</span>
          <span>[GAL最大値更新]</span>
        </div>
        <div className="row-col point-content-row-4-col-2"></div>
      </div>
    </div>
  )
}

export default CsaDetailModal
