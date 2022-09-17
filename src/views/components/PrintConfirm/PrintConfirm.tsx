import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'
import Draggable from 'react-draggable'
import './PrintConfirm.scss'
export default function PrintConfirm({ handlePrintConfirm }: { handlePrintConfirm: Function }) {
  return (
    <Draggable>
      <div className="print-confirm">
        <div className="print-confirm-header">
          <span>印刷・保存確認</span>
          <button onClick={() => handlePrintConfirm(false)} className="print-confirm-close-button">
            x
          </button>
        </div>
        <div className="print-confirm-content">
          <span>印刷を行いますか？</span>
          <div className="print-confirm-option">
            <button onClick={() => handlePrintConfirm(false)} className="print-confirm-button">
              はい
            </button>
            <button onClick={() => handlePrintConfirm(false)} className="print-confirm-button">
              いいえ
            </button>
          </div>
          <div className="print-confirm-option">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="印刷を実施する
                  "
                className="print-checkbox"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="保存を実施する"
                className="print-checkbox"
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </Draggable>
  )
}
