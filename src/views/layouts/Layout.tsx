import React, { useEffect, useState } from 'react'
import Split from 'react-split'
import KDashBlockModelLogic from '../../logic/KDashBlockModelLogic'
import LBlockValModelLogic from '../../logic/LBlockValModelLogic'
import SBlockValModelLogic from '../../logic/SBlockValModelLogic'
import { RootState } from '../../store'
import { useAppSelector } from '../../store/hooks'
import CommonUtil from '../../utilities/CommonUtil'
import AlertModal from '../components/AlertModal/AlertModal'
import { CheckModal } from '../components/CheckModal/CheckModal'
import ConfirmModal from '../components/ConfirmModal/ConfirmModal'
import CsaDetailModal from '../components/CsaPoint/CsaDetailModal'
import ExpressModal from '../components/ExpressModal/ExpressModal'
import GakanDetailModal from '../components/GakanPoint/GakanDetailModal'
import LayoutMap from '../components/Map/LayoutMap'
import PopupWindow, { ModalTypeConst } from '../components/PopupWindow/PopupWindow'
import PrintConfirm from '../components/PrintConfirm/PrintConfirm'
import Header from './Header/Header'
import './style.scss'

const Layout = ({children}: {children: any}) => {
  const [openHandlePrintConfirm, setOpenHandlePrintConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mapWidth, setMapWidth] = useState(window.innerWidth * 0.5)
  const [mapHeight, setMapHeight] = useState(window.innerWidth - 112)
  const pointData = useAppSelector((state: RootState) => state.pointData.listPoints)
  const alertModal = useAppSelector((state: RootState) => state.pointData.alertModal)
  const MinimizeMap = () => {
    const ratio = CommonUtil.ToRoundUp(mapWidth / window.innerWidth, 1)
    if (ratio > 0.5) setMapWidth(window.innerWidth * 0.5)
    else if (ratio > 0.3) setMapWidth(window.innerWidth * 0.3)
    else setMapWidth(window.innerWidth * 0.0)
  }
  const MaximizeMap = () => {
    const ratio = CommonUtil.ToRoundUp(mapWidth / window.innerWidth, 1)
    if (ratio < 0.5) setMapWidth(window.innerWidth * 0.5)
    else if (ratio < 0.7) setMapWidth(window.innerWidth * 0.7)
    else setMapWidth(window.innerWidth * 1.0)
  }

  useEffect(() => {
    // MainController()
    new LBlockValModelLogic().RequestData(true)

    new SBlockValModelLogic().RequestData(true)

    new KDashBlockModelLogic().RequestData(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  const renderPopup = (item: any) => {
    if (item.modalType === ModalTypeConst.IS_GAKAN) {
      return <GakanDetailModal modal={item} key={item.id} />
    }
    if (item.modalType === ModalTypeConst.IS_CSA)
      return <CsaDetailModal modal={item} key={item.id} />
    if (item.modalType === ModalTypeConst.IS_CONFIRM)
      return <ConfirmModal modal={item} key={item.id} />
    if (item.modalType === ModalTypeConst.IS_EXPRESS)
      return <ExpressModal modal={item} key={item.id} />
    if (item.modalType === ModalTypeConst.IS_CHECK) return <CheckModal modal={item} key={item.id} />
  }

  const getHeader = (item: any) => {
    switch (item.modalType) {
      case 1:
        return '詳細情報(架管被害推定)'
      case 2:
        return '詳細情報(ガバナ)'
      case 4:
        return '確認'
      case ModalTypeConst.IS_EXPRESS:
        return 'Sブロック圧力・流量トレンドグラフ'
      case ModalTypeConst.IS_CHECK:
        return '確認'
      default:
        return ''
    }
  }

  useEffect(() => {
    function resize() {
      setMapHeight(window.innerHeight)
    }
    window.addEventListener('resize', resize)
    resize()
    return () => window.removeEventListener('resize', resize)
  }, [])

  if (isLoading) {
    return <h1>Loading...</h1>
  } else
    return (
      <div style={{ overflow: 'hidden' }}>
        <Header />
        <Split
          className="split"
          cursor="w-resize"
          onDrag={(size) => setMapWidth((window.innerWidth * size[0]) / 100)}
        >
          <div
            id="body-left"
            style={{
              width: `${(mapWidth / window.innerWidth) * 100}%`,
              position: 'relative',
            }}
          >
            <LayoutMap
              setOpenHandlePrintConfirm={setOpenHandlePrintConfirm}
              mapWidth={mapWidth}
              mapHeight={mapHeight}
            />
            <div className="resize-left" onClick={MinimizeMap}>
              <div className="resize-content-left">≪</div>
            </div>
          </div>
          <div
            id="body-right"
            style={{
              width: `${100 - (mapWidth / window.innerWidth) * 100}%`,
              position: 'relative',
            }}
          >
            {children}
            <div className="resize-right" onClick={MaximizeMap}>
              <div className="resize-content-right">≫</div>
            </div>
          </div>
        </Split>
        {pointData.map((item: any) => {
          return (
            <PopupWindow header={getHeader(item)} footer={<button>閉じる</button>} item={item}>
              {renderPopup(item)}
            </PopupWindow>
          )
        })}
        {openHandlePrintConfirm ? <div className="back-drop"></div> : undefined}
        {openHandlePrintConfirm ? (
          <PrintConfirm handlePrintConfirm={setOpenHandlePrintConfirm} />
        ) : undefined}
        {alertModal ? <AlertModal /> : null}
      </div>
    )
}

export default Layout
