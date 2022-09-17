import './style.scss'

export type posModal = {
  top: number
  left: number
}

export type dataModal = {

}
function GakanDetailModal({
  modal,
}: {
  modal: any,
}) {
  // const [isD, setIsD] = useState<boolean>(false)
  const colTitle1 = [
    '[架管番号]',
    '[架管名称]',
    '[ＮＣ]',
    '[被災度ランク]',
    '[確認時刻]',
    '[圧力]',
    '[ＳＩ値]',
    '[架管形式]',
    '[適用示方書区分]',
    '[起点行政区]',
    '[終点行政区]',
    '[起点住所]',
    '[終点住所]',
  ]
  const dataModal = modal.point

  return (
    <div className="point-content-gakan">
      <div className="point-content-col-1">
        {colTitle1.map((title: string, index: number) => {
          return (
            <span>{title}</span>
          )
        })}
      </div>
      <div className="point-content-col-2">
        <span>{dataModal.GakanNo}</span>
        <span>{dataModal.Name}</span>
        <span>{dataModal.BaseName}</span>
        <span>ランク{dataModal.SufferRank}</span>
        <span>{dataModal.DataCheckedAt}</span>
        <span>{dataModal.PressCode}</span>
        <span>{dataModal.Si}</span>
        <span>{dataModal.GakanType}</span>
        <span>{dataModal.SpecificationType}</span>
        <span>{dataModal.StartGyouseikuName}</span>
        <span>{dataModal.EndGyouseikuName}</span>
        <span>{dataModal.StartAddress}</span>
        <span>{dataModal.EndAddress}</span>
      </div>
      <div className="point-content-col-3">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span>[口径]</span>
        <span>[ＰＬ値]</span>
      </div>
      <div className="point-content-col-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span>{dataModal.Caliber}</span>
        <span>{dataModal.Pl}</span>
      </div>
    </div>
  )
}

export default GakanDetailModal
