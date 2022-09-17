/* eslint-disable react-hooks/exhaustive-deps */
import L from 'leaflet'
import { useEffect, useState } from 'react'
import { Marker, useMap } from 'react-leaflet'
import gakan_dmg_rank_A from '../../../../assets/images/gakan_dmg_rank_A.png'
import gakan_dmg_rank_B from '../../../../assets/images/gakan_dmg_rank_B.png'
import gakan_dmg_rank_C from '../../../../assets/images/gakan_dmg_rank_C.png'
import gakan_dmg_rank_D from '../../../../assets/images/gakan_dmg_rank_D.png'
import gakan_dmg_rank_E from '../../../../assets/images/gakan_dmg_rank_E.png'
import { useAppDispatch } from '../../../../store/hooks'
import { createWindow } from '../../../../store/modules/PointData'
import { DisplayTypeConst, ModalTypeConst } from '../../PopupWindow/PopupWindow'
import * as MapUtil from '../MapUtil'



export type Modal = {
  id: number,
  top: number,
  left: number,
  data?: DataModal
}
export type DataModal = {
  title: string
}
interface GakanProps {
  point: any
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PointOne {

}
interface PointTwo {
  GakanNo: number,
  SufferRank: number,
  Pl: number,
  Si: number,
  DataCheckedAt: string
}
interface GakanDmgBaseModel {
  width: number;
  [key: string]: any
}

export const SufferRankCheck = (SufferRank: number) => {
  let newData
  switch (SufferRank) {
    case 1:
      newData = 'A'
      break;
    case 2:
      newData = 'B'
      break;
    case 3:
      newData = 'C'
      break;
    case 4:
      newData = 'D'
      break;
    case 5:
      newData = 'E'
      break;
    // code block
  }
  return newData
}

export const PressCode = (PressCode: number) => {
  let newData
  switch (PressCode) {
    case 2:
      newData = 'MPA'
      break;
    case 3:
      newData = 'MPB'
      break;
    default: newData = 'None'
    // code block
  }
  return newData
}

export const GakanTypeCheck = (GakanType: number) => {
  let result;
  switch (GakanType) {
    case 1:
      result = "共用橋";
      break;
    case 2:
      result = "専用橋架管";
      break;
    case 3:
      result = "単独架管";
      break;
    case 4:
      result = "添架管";
      break;
  }
  return result;
}

export const SpecificationTypeCheck = (SpecificationType: number) => {
  let result = "";
  switch (SpecificationType) {
    case 1:
      result = "～1971年";
      break;
    case 2:
      result = "1972～1980年";
      break;
    case 3:
      result = "1981年～";
      break;
    case 0:
      result = "不明";
      break;
    default:
      break;
  }
  return result;
}

const markSizeTable: number[] = [0, 0, 2, 2, 3, 3, 5, 5, 8, 8, 10, 12, 16, 16, 20, 25, 25, 30, 30, 25]

function GakanDmgEstimation(props: GakanProps) {
  const [currentMarkSize, setCurrentMarkSize] = useState<number>(markSizeTable[2])
  const [points1, setPoints1] = useState<any[]>([])
  const [points2, setPoint2] = useState<PointTwo[]>([])
  const [datas, setDatas] = useState<any[]>([])

  const map = useMap()
  const dispatch = useAppDispatch()

  useEffect(() => {
    SizeChange(map.getZoom())
  }, [map.getZoom()])

  const SizeChange = (zoomLevel: number) => {
    if (currentMarkSize !== markSizeTable[Math.floor(zoomLevel)]) {
      setCurrentMarkSize(markSizeTable[Math.floor(zoomLevel)])
      setDatas(datas.map(gakan => ({
        ...gakan,
        markSize: markSizeTable[Math.floor(zoomLevel)],
        nameSize: zoomLevel >= 13,
      })))
    }
  }

  const getImage = (model: GakanDmgBaseModel) => {
    let imgGakan
    switch (model.SufferRank) {
      case 'A':
        imgGakan = gakan_dmg_rank_A
        break;
      case 'B':
        imgGakan = gakan_dmg_rank_B
        break;
      case 'C':
        imgGakan = gakan_dmg_rank_C
        break;
      case 'D':
        imgGakan = gakan_dmg_rank_D
        break;
      case 'E':
        imgGakan = gakan_dmg_rank_E
        break;
      default:
        break;
    }
    // code block
    return L.divIcon({
      className: 'gakan-icon',
      html: `
          <div class="gakan-img"><img src="${imgGakan}" class="gakan-img" width="${model.markSize * 1.28}" height="${model.markSize}"/></div>
          <div class="gakan-text" ><span>${model.nameSize ? model.Name : ''}</span></div>
        `
    });
  }

  const onClickIcon = (point: any) => {
    if (map.getZoom() < 12) {
      const [lat = 0, lng = 0] = MapUtil.XY2LL(point.mapX, point.mapY)
      map.setView({ lat, lng }, map.getZoom() + 1, { animate: true })
    } else {
      dispatch(createWindow({ point, modalType: ModalTypeConst.IS_GAKAN, displayType: DisplayTypeConst.SINGLE_MODAL, left: 0, top: 0 }))
    }
  }

  useEffect(() => {
    setPoints1(props.point.gakan_csv.split('\n').map((item: any, index: number) => {
      return {
        GakanNo: Number(item.split(",")[0]),
        Name: item.split(",")[1] as string,
        mapX: item.split(",")[2] as string,
        mapY: item.split(",")[3] as string,
        BaseNo: item.split(",")[4] as number,
        // if (ParseIntNullable(data[4]) != null) model.BaseNo = CommonUtil.ConvertBaseNoForPastEq(ParseInt(data[4]));
        BaseName: item.split(",")[5] as string,
        SpecificationType: SpecificationTypeCheck(Number(item.split(",")[6])),
        GakanType: GakanTypeCheck(Number(item.split(",")[7])),
        Caliber: item.split(",")[8],
        PressCode: PressCode(Number(item.split(",")[9])),
        StartGyouseikuCode: item.split(",")[10],
        StartGyouseikuName: item.split(",")[11],
        EndGyouseikuCode: item.split(",")[12],
        EndGyouseikuName: item.split(",")[13],
        StartAddress: item.split(",")[14],
        EndAddress: item.split(",")[15],
      }
    }))

    setPoint2(props.point.dmg_gakan_estimations.split('\n').map((item: any, index: number) => {
      return {
        GakanNo: Number(item.split(",")[0]),
        SufferRank: SufferRankCheck(Number(item.split(",")[1])),
        Pl: parseInt(item.split(",")[2], 10),
        Si: parseInt(item.split(",")[3], 10),
        DataCheckedAt: item.split(",")[4] as string
      }
    }))
  }, [props.point])

  const convertData = (points1: any, points2: any) => {
    let data: any = []
    for (let i = 0; i < points1.length; i++) {
      for (let j = 0; j < points2.length; j++) {
        if (points1[i].GakanNo === points2[j].GakanNo) {
          data = [...data, {
            ...points1[i],
            ...points2[j],
            markSize: currentMarkSize,
            nameSize: map.getZoom() >= 13,
          }]
        }
      }
    }
    setDatas(data)
  }
  useEffect(() => {
    if (points1.length > 0 && points2.length > 0) {
      convertData(points1, points2)
    }
  }, [points1.length, points2.length])

  return (
    <>
      {
        datas.map((data, index) => {
          const [lat = 0.0, lng = 0.0] = MapUtil.XY2LL(parseInt(data.mapX), parseInt(data.mapY))
          return !(isNaN(lat) || isNaN(lng)) ?
            <Marker position={{ lat, lng }} icon={getImage(data)} key={index}
              eventHandlers={{
                click: (e) => {
                  onClickIcon(data)
                }
              }}
            >
            </Marker> : null
        })
      }
    </>
  )
}

export default GakanDmgEstimation
