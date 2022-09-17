import React from 'react'
import Draggable, { DraggableEvent } from 'react-draggable'
import { useAppDispatch } from '../../../store/hooks'
import { deleteModal, updatePosition } from '../../../store/modules/PointData'
import './PopupWindow.scss'


interface PopupWindowProps {
  children: React.ReactNode
  header: React.ReactNode
  footer: React.ReactNode
  item: any
}
export const ModalTypeConst = {
  DEFAULT: 0,
  IS_GAKAN: 1,
  IS_CSA: 2,
  IS_PRINT: 3,
  IS_CONFIRM: 4,
  IS_EXPRESS: 5,
  IS_CHECK: 6,
}

export const DisplayTypeConst = {
  SINGLE_MODAL: 1,
  MULTI_MODAL: 2,
}

function PopupWindow(props: PopupWindowProps) {
  const dispatch = useAppDispatch()
  const onStart = {
    X: 0,
    Y: 0,
  }

  const handleClient = (e: DraggableEvent) => {
    const mouseEvent = e as MouseEvent
    onStart.X = mouseEvent.clientX
    onStart.Y = mouseEvent.clientY
  }

  return (
    <div className={props.item.isBlock ? 'is-block' : ''}>
      <Draggable
        {...(props.item.displayType === 2 ? { position: { x: 0, y: 0 } } : {})}
        onStop={(e) => {
          const mouseEvent = e as MouseEvent
          const diffX = mouseEvent.clientX - onStart.X
          const diffY = mouseEvent.clientY - onStart.Y
          if (props.item.displayType === DisplayTypeConst.MULTI_MODAL)
            dispatch(updatePosition({ diffX, diffY, id: props.item.id }))
        }}
        onStart={(e) => {
          handleClient(e)
        }}
      >
        <div
          className="point-detail"
          style={{ top: `${props.item.top}px`, left: `${props.item.left}px` }}
        >
          <div className="point-header">
            <div className="point-header-title">{props.header}</div>
            <div className="point-header-button">
              <button
                onClick={() => {
                  dispatch(deleteModal(props.item.id))
                }}
              >
                x
              </button>
            </div>
          </div>
          {props.children}
          <div
            className="point-footer"
            onClick={() => {
              dispatch(deleteModal(props.item.id))
            }}
          >
            {props.footer}
          </div>
        </div>
      </Draggable>
    </div>
  )
}

export default PopupWindow
