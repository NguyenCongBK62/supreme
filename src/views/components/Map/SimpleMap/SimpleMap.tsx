import { LatLngLiteral } from 'leaflet'
import { memo } from 'react'
import { Polygon, Polyline } from 'react-leaflet'
import CommonUtil from '../../../../utilities/CommonUtil'
import { Visibility } from '../../../../constants/GlobalConst'
import * as MapUtil from '../MapUtil'

interface SimpleMapProps {
  lineData?: string;
  lineColor?: string;
  lineThickness?: number[];
  viewFlg?: Visibility;
  makeCount?: number;
  initCenter: LatLngLiteral;
  initZoom?: number;
}

export default memo(function SimpleMap(props: SimpleMapProps) {
  return (
    <>
      {props?.lineData?.split('\n').map((line, index) => {
        const pointData: string[] = line.split(' ')

        const points: LatLngLiteral[] = []
        for (let i = 2; i < pointData.length; i++) {
          const point: string[] = pointData[i].split(',')
          const [lat = 0.0, lng = 0.0] = MapUtil.XY2LL(parseInt(point[0]), parseInt(point[1]))
          points.push({ lat, lng })
        }

        let color = '', className = "simple-map--visible"

        // ライン区分(0:all 1:分割前 2:分割後)
        if (pointData[1] === "2") className = "simple-map--collapsed"

        // 種別による振り分け
        if (pointData[0].split(',')[1] === 'H' || pointData[0].split(',')[1] === 'I') {
          color = CommonUtil.argbToHex(255, 238, 234, 225)
          return <Polygon
            key={index}
            positions={points}
            color={color}
            className={className}
            stroke={false}
            fillOpacity={1}
          />
        } else if (pointData[0].split(',')[1] === 'R') {
          color = CommonUtil.argbToHex(255, 153, 179, 204)
          return <Polyline
            key={index}
            positions={points}
            color={color}
            className={className}
            weight={1}
            fillOpacity={1}
          />
        } else if (pointData[0].split(',')[1] === 'L') {
          color = CommonUtil.argbToHex(255, 153, 179, 204)
          return <Polygon
            key={index}
            positions={points}
            color={color}
            className={className}
            stroke={false}
            fillOpacity={1}
          />
        }
        return <Polyline
          key={index}
          positions={points}
          color={color}
          className={className}
          stroke={false}
          fillOpacity={1}
        />
      })}
    </>
  )
})
