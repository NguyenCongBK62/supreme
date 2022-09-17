import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DisplayTypeConst, ModalTypeConst } from '../../views/components/PopupWindow/PopupWindow'

interface Data {

}
interface UpdatePositionType {
  id: number;
  diffX: number,
  diffY: number;
}
interface PointData {
  id?: number
  modalType: number,
  displayType: number,
  left: number | 0,
  top: number | 0,
  point?: Data,
  isBlock?: boolean,
  message?: string
}

interface PointDataState {
  listPoints: PointData[]
  pointData: Data,
  alertModal: boolean,
  increment: number
}

const initialState: PointDataState = {
  listPoints: [],
  pointData: {},
  alertModal: false,
  increment: 0
}

const checkListData = (state: PointDataState, action: PointData) => {
  if (!action.isBlock) {
    action.isBlock = false;
  }
  if (action?.message) {
    let newData = {
      modalType: ModalTypeConst.IS_CONFIRM,
      id: ++state.increment,
      top: action.top,
      left: action.left,
      displayType: action.displayType,
      isBlock: action.isBlock,
      message: action.message
    }
    state.listPoints.forEach((item: PointData, index: number) => {
      if (item.modalType === ModalTypeConst.IS_CONFIRM) {
        state.listPoints.splice(index, 1)
      }
    })
    state.listPoints.push(newData)
    return
  }
  if (!action?.point) {
    if (action.displayType === DisplayTypeConst.SINGLE_MODAL) {
      let newData = {
        modalType: ModalTypeConst.IS_PRINT,
        id: ++state.increment,
        top: action.top,
        left: action.left,
        displayType: action.displayType,
        isBlock: action.isBlock
      }
      state.listPoints.forEach((item: PointData, index: number) => {
        if (item.modalType === ModalTypeConst.IS_PRINT) {
          state.listPoints.splice(index, 1)
        }
      })
      state.listPoints.push(newData)
    }

    if (action.displayType === DisplayTypeConst.MULTI_MODAL) {
      let newData = {
        modalType: ModalTypeConst.IS_CSA,
        id: ++state.increment,
        top: action.top,
        left: action.left,
        displayType: action.displayType,
        isBlock: action.isBlock
      }
      state.listPoints.push(newData)
    }
  }
  else {
    let dataPoint = action.point
    if (action.displayType === DisplayTypeConst.SINGLE_MODAL) {
      let newData = {
        point: dataPoint,
        modalType: 1,
        id: ++state.increment,
        top: action.top,
        left: action.left,
        displayType: action.displayType
      }
      state.listPoints.forEach((item: PointData, index: number) => {
        if (item.modalType === ModalTypeConst.IS_GAKAN) {
          state.listPoints.splice(index, 1)
        }
      })
      state.listPoints.push(newData)
    }

    if (action.displayType === DisplayTypeConst.MULTI_MODAL) {
      let newData = {
        point: dataPoint,
        modalType: ModalTypeConst.IS_CSA,
        id: ++state.increment,
        top: action.top,
        left: action.left,
        displayType: action.displayType
      }
      let count = 0
      for (let i = 0; i < state.listPoints.length; i++) {
        if (state.listPoints[i].modalType === ModalTypeConst.IS_CSA) {
          count++
        }
      }
      if (count < 10) {
        state.listPoints.push(newData)
      }
      if (count === 10) {
        state.alertModal = true
      }
    }
  }
}

export const pointDataSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    alertModal: (state) => {
      state.alertModal = false;
    },
    deleteModal: (state, action: PayloadAction<{}>) => {
      let index = -1
      for (let i = 0; i < state.listPoints.length; i++) {
        if (state.listPoints[i].id === action.payload) {
          index = i
          break
        }
      }
      if (index !== -1) {
        state.listPoints.splice(index, 1)
      }
    },
    createWindow: (state, action: PayloadAction<PointData>) => {
      const { innerWidth: widthPage, innerHeight: heightPage } = window;
      const modalType = action.payload.modalType
      const counter = state.listPoints.filter(item => item.modalType === modalType).length
      // this is a amazing ideal 
      let top = heightPage / 2 - 220;
      let left = widthPage / 2 - 200;
      if (modalType === ModalTypeConst.IS_GAKAN) {
        checkListData(state, { ...action.payload, top: top, left: left - 15 });
        return
      }
      // pw.isPopupMsg = isPopupMsg;
      if (counter > 0) {
        var pws = state.listPoints.filter(item => item.modalType === modalType);
        var lastPw = pws[pws.length - 1];
        left = lastPw.left + 30;
        top = lastPw?.top + 30;

        const maxTop = heightPage - pws[counter - 1].top - 150;
        let maxHeightCount = parseInt(((maxTop) / 30).toString());
        //   //OKボタンが表示可能な位置より下になる場合、最上位の高さに戻す
        if (top >= (pws[0]).top + 30 * maxHeightCount) {
          top = (pws[0]).top; // 一番先頭のポップアップの高さ
          left = left - 30 * maxHeightCount + 30;  // 直近の列の最上位ポップアップの左位置から+30
        }
      }
      checkListData(state, { ...action.payload, top: top, left: left });
    },
    updatePosition: (state, action: PayloadAction<UpdatePositionType>) => {
      for (let i = 0; i < state.listPoints.length; i++) {
        const point = state.listPoints[i];
        if (point.id === action.payload.id) {
          point.left = point.left + action.payload.diffX
          point.top = point.top + action.payload.diffY
        }
      }
    }
  }

})

export const { alertModal, deleteModal, createWindow, updatePosition } = pointDataSlice.actions

export default pointDataSlice.reducer