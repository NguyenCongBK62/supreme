import "leaflet-canvas-markers";
import React, { useEffect, useState } from 'react';
import { CircleMarker, useMap } from 'react-leaflet';
import { useAppDispatch } from '../../../../store/hooks';
import { createWindow } from '../../../../store/modules/PointData';
import { DisplayTypeConst, ModalTypeConst } from '../../PopupWindow/PopupWindow';
import * as MapUtil from '../MapUtil';

interface CsaProps {
  point: any;
}
const Csa = React.memo(function Csa(props: CsaProps) {
  const dispatch = useAppDispatch()
  const map = useMap()
  const [points, setPoints] = useState<any[]>([])

  useEffect(() => {
    setPoints(props.point.split('\n').map((item: any, index: number) => {
      return {
        CsaNo: item.split(",")[0],
        FuncId: item.split(",")[1],
        LBlockId: item.split(",")[2],
        SBlockId: item.split(",")[3],
        Name: item.split(",")[4],
        mapX: item.split(",")[5],
        mapY: item.split(",")[6],
        IsBypassShut: item.split(",")[7],
        HasTcUnit: item.split(",")[8],
        IsTcActive: item.split(",")[9],
        SupplyMethod: item.split(",")[10],
        ObsDisplayFlags: item.split(",")[11],
        SiSensorType: item.split(",")[12],
        IsLqAlarmObservable: item.split(",")[13],
        IsLpConnected: item.split(",")[14],
        BlockflowType: item.split(",")[15],
        Address: item.split(",")[16],
        ShutoffSi: item.split(",")[17],
        MpLeakSoundLineNo: item.split(",")[18],
        IsLBlockRepresent: item.split(",")[19],
        KBlockNo: item.split(",")[20],
        KDashBlockNo: item.split(",")[21],
        LBlockNo: item.split(",")[22],
        BaseNo: item.split(",")[23],
        BaseName: item.split(",")[24],
        GyouseikuCode: item.split(",")[25],
        GyouseikuName: item.split(",")[26],
        IsOpenable: item.split(",")[27],
        isPrimary: item.split(",")[28],
      }
    }))
  }, [props.point])

  const onClickIcon = (point: any) => {
    if (map.getZoom() < 12) {
      const [lat = 0, lng = 0] = MapUtil.XY2LL(point.mapX, point.mapY)
      map.setView({ lat, lng }, map.getZoom() + 1, { animate: true })
    } else {
      dispatch(createWindow({ point, modalType: ModalTypeConst.IS_CSA, displayType: DisplayTypeConst.MULTI_MODAL, left: 0, top: 0 }))
    }
  }
  return (
    <>
      {
        points.slice(0, 100).map((point, index) => {
          const [lat = 0.0, lng = 0.0] = MapUtil.XY2LL(parseInt(point.mapX), parseInt(point.mapY))
          return !(isNaN(lat) || isNaN(lng)) ?
            <CircleMarker
              key={index}
              center={{ lat, lng }}
              radius={5}
              pathOptions={{
                stroke: false,
                fill: true,
                fillColor: '#aaa',
                fillOpacity: 1,
                bubblingMouseEvents: false,
              }}
              eventHandlers={{
                click: (e) => {
                  onClickIcon(point)
                }
              }}
            >
            </CircleMarker>
            : null
        })
      }
    </>
  )
});

export default Csa;