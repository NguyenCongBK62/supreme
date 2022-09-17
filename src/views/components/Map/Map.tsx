/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import L, { LatLngLiteral, LeafletEvent, LeafletMouseEvent, Point } from 'leaflet'
import { useEffect, useState } from 'react'
import { TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { Visibility } from '../../../constants/GlobalConst'
import Csa from './Csa/Csa'
import sup_csas from './Csa/sup_csas'
import gakan_csv from './GakanDmgEstimation/dmg_gakan_bases'
import dmg_gakan_estimations from './GakanDmgEstimation/dmg_gakan_estimations'
import GakanDmgEstimation from './GakanDmgEstimation/GakanDmgEstimation'
import './Map.css'
import simplemap from './simplemap'
import SimpleMap from './SimpleMap/SimpleMap'

// Constants
const MIN_ZOOM = 6
const MAX_ZOOM = 18
const SIMPLE_MAP_STOKE_THICKNESS = [
  1600, 1600, 1600, 800, 800, 96, 96, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]

interface MapProps {
  initCenter: LatLngLiteral
  initZoom: number
  zoomReset?: boolean
  zoomOut?: boolean
  zoomIn?: boolean
  zoomBox?: boolean
  mapWidth: number
  mapHeight: number
  onZoomResetEnd: () => void
  onZoomOutEnd: () => void
  onZoomInEnd: () => void
  onZoomBoxEnd: () => void
}

export default function Map(props: MapProps) {
  const [viewerWidthInPixels, setViewerWidthInPixels] = useState<number>(props.mapWidth);
  const [viewerHeightInPixels, setViewerHeightInPixels] = useState<number>(props.mapHeight);
  const [temporarilyOffFlg, setTemporarilyOffFlg] = useState<boolean>(false)
  const map = useMap()

  useMapEvents({
    click(e: LeafletMouseEvent) {
      map.setView(e.latlng, map.getZoom() + 1)
    },
    dragstart() {
      setTemporarilyOffFlg(true)
    },
    dragend() {
      setTemporarilyOffFlg(false)
    },
    zoomstart() {
      setTemporarilyOffFlg(true)
    },
    zoomend(e: LeafletEvent) {
      if (props.zoomReset) {
        props.onZoomResetEnd()
      }
      if (props.zoomOut) {
        props.onZoomOutEnd()
      }
      if (props.zoomIn) {
        props.onZoomInEnd()
      }
      if (props.zoomBox) {
        props.onZoomBoxEnd()
      }
      setTemporarilyOffFlg(false)
    },
  })

  useEffect(() => {
    if (props.zoomReset) {
      map.setView(props.initCenter, props.initZoom)
    }
  }, [props.zoomReset])

  useEffect(() => {
    if (props.zoomOut) {
      map.zoomOut(1)
    }
  }, [props.zoomOut])

  useEffect(() => {
    if (props.zoomIn) {
      map.zoomIn(1)
    }
  }, [props.zoomIn])

  useEffect(() => {
    if (props.zoomBox) {
      activateZoomBox()
    } else {
      deactivateZoomBox()
    }
  }, [props.zoomBox])

  const activateZoomBox = () => {
    // Bind to the map's boxZoom handler
    const _origMouseDown = (map.boxZoom as any)._onMouseDown;
    (map.boxZoom as any)._onMouseDown = function (e: MouseEvent) {
      if (e.button === 2) return;  // prevent right-click from triggering zoom box
      _origMouseDown.call(map.boxZoom, {
        clientX: e.clientX,
        clientY: e.clientY,
        which: 1,
        shiftKey: true
      });
    };

    map.dragging.disable();
    L.DomUtil.addClass(map.getContainer(), 'leaflet-crosshair')
    map.boxZoom.addHooks!()
  }

  const deactivateZoomBox = () => {
    map.dragging.enable();
    map.boxZoom.removeHooks!()
  }

  // Resize map
  useEffect(() => {
    Resize(props.mapWidth, props.mapHeight)
  }, [props.mapWidth, props.mapHeight])

  const Resize = (pixelWidth: number, pixelHeight: number) => {
    let viewerWidthProportion: number = 1, viewerHeightProportion: number = 1, maxViewerDimension = 0

    // 地図表示領域がない場合(ウィンドウが小さい)は何もしない
    if (props.mapWidth < 0 && props.mapHeight < 0) return

    const size: number = Math.max(pixelWidth, pixelHeight)

    if (size > 128 && (viewerWidthInPixels !== pixelWidth || viewerHeightInPixels !== pixelHeight)) {
      maxViewerDimension = Math.max(pixelWidth, pixelHeight)
      viewerWidthProportion = viewerWidthInPixels / maxViewerDimension
      viewerHeightProportion = viewerHeightInPixels / maxViewerDimension

      if (pixelWidth >= maxViewerDimension) {
        const containerPoint = new Point(0, 0),
          newZoom = props.initZoom + Math.log2(pixelWidth / (window.innerWidth * 0.5)),
          scale = map.getZoomScale(newZoom),
          viewHalf = map.getSize().divideBy(2),
          centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale),
          newCenter = map.containerPointToLatLng(viewHalf.add(new Point(0, centerOffset.y)))
        map.setView(newCenter, newZoom)
        map.invalidateSize()
      }

      // if (props.mapHeight >= maxViewerDimension) {
      //   const containerPoint = new Point(0, 0),
      //     newZoom = props.initZoom + Math.log2(props.mapHeight / (window.innerHeight - 112)),
      //     scale = map.getZoomScale(newZoom),
      //     viewHalf = map.getSize().divideBy(2),
      //     centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale),
      //     newCenter = map.containerPointToLatLng(viewHalf.add(new Point(centerOffset.x, 0)))
      //   map.setView(newCenter, newZoom)
      // }

      setViewerWidthInPixels(pixelWidth)
      setViewerHeightInPixels(pixelHeight)
    }
  }

  return (
    <>
      <TileLayer url="" crossOrigin={true} minZoom={MIN_ZOOM} maxZoom={MAX_ZOOM} />
      <SimpleMap
        lineData={simplemap}
        lineColor={''}
        lineThickness={SIMPLE_MAP_STOKE_THICKNESS}
        viewFlg={Visibility.Visible}
        makeCount={100}
        initCenter={props.initCenter}
        initZoom={props.initZoom}
      />
      {
        !temporarilyOffFlg ?
          <>
            <GakanDmgEstimation
              point={{ dmg_gakan_estimations, gakan_csv }}
            />
            <Csa
              point={sup_csas}
            />
          </> : null
      }
    </>
  )
}
