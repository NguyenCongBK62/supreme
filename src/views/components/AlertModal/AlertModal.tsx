import React from 'react'
import Draggable from "react-draggable";
import { useAppDispatch } from '../../../store/hooks';
import { alertModal } from '../../../store/modules/PointData';

import './style.scss'
function AlertModal() {
  const dispatch = useAppDispatch()
  return (
    <Draggable>
      <div className="alert-modal" style={{ top: `40%`, left: `40%` }}>
        <div className="alert-modal-header">
          <div className="alert-modal-header-title">詳細情報(架管被害推定)</div>
          <div className="alert-modal-header-button">
            <button onClick={() => dispatch(alertModal())}>x</button>
          </div>
        </div>
        <div className="alert-modal-content">
          <span>一度に表示できるのは10ヶ所までです</span>
        </div>
        <div className="alert-modal-footer">
          <button onClick={() => dispatch(alertModal())}>OK</button>
        </div>
      </div>
    </Draggable>
  )
}

export default AlertModal
