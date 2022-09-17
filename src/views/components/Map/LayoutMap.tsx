import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Tab from '@mui/material/Tab'
import { LatLngLiteral } from 'leaflet'
import * as React from 'react'
import { MapContainer } from 'react-leaflet'
import './LayoutMap.css'
import Map from './Map'

// Constants
const INIT_CENTER: LatLngLiteral = { lat: 35.65166105603015, lng: 139.72288850399204 }
const INIT_ZOOM = 9.78

interface mapOptionNormal {
  mapTypeNormal: String
  series: Array<String>
  deltaP?: Array<String>
  fillType?: Array<String>
  seriesLp?: Array<String>
}

type layoutMapProps = {
  mapWidth: number
  mapHeight: number
  setOpenHandlePrintConfirm: Function
}

export default function LayoutMap({
  setOpenHandlePrintConfirm,
  mapWidth,
  mapHeight,
}: layoutMapProps) {
  const [value, setValue] = React.useState('1')
  const [value111, setValue111] = React.useState('')
  const [mapOtherOpen, setMapOtherOpen] = React.useState(false)
  const [openMapBlockSelect, setOpenMapBlockSelect] = React.useState(false)
  const [value1, setValue1] = React.useState('')
  const [value11, setValue11] = React.useState('')
  const [value12, setValue12] = React.useState('')
  const [value112, setValue112] = React.useState('')
  const [mapOption, setMapOption] = React.useState('0')
  const [zoomReset, setZoomReset] = React.useState<boolean>(false)
  const [zoomOut, setZoomOut] = React.useState<boolean>(false)
  const [zoomIn, setZoomIn] = React.useState<boolean>(false)
  const [zoomBox, setZoomBox] = React.useState<boolean>(false)
  const [blockDetailOpen, setBlockDetailOpen] = React.useState(0)
  const openBlockDetail = (popOpen: number) => {
    if (blockDetailOpen !== popOpen) {
      setBlockDetailOpen(popOpen)
    } else {
      setBlockDetailOpen(0)
    }
  }
  const listType: Array<mapOptionNormal> = [
    {
      mapTypeNormal: '観測図',
      series: [
        'なし',
        'SI値',
        'GAL値',
        '中圧(MPA)',
        '中圧(MPB)',
        '低圧(LP)',
        '停止ガバナ',
        '閉巡回',
        '開巡回',
        'TC状態',
        '液状化警報',
        '停電',
        '水位警報',
      ],
    },
    {
      mapTypeNormal: '観測図(Kブロック地震計)',
      series: ['なし', 'SI値', 'GAL値'],
    },
    {
      mapTypeNormal: '観測図(XXXX＋幹線GS・その他地震計)',
      series: ['なし', 'SI値', 'GAL値'],
    },
    {
      mapTypeNormal: '観測図(外部情報)',
      series: [
        'なし',
        'SI値',
        'GAL値',
        '中圧(MPA)',
        '中圧(MPB)',
        '低圧(LP)',
        '停止ガバナ',
        '閉巡回',
        '開巡回',
        'TC状態',
        '液状化警報',
        '停電',
        '水位警報',
      ],
    },
    {
      mapTypeNormal: '低圧被害図',
      series: [
        'なし',
        'SI値',
        'GAL値',
        '中圧(MPA)',
        '中圧(MPB)',
        '低圧(LP)',
        '停止ガバナ',
        '閉巡回',
        '開巡回',
        'TC状態',
        '液状化警報',
        '停電',
        '水位警報',
      ],
      fillType: ['Lブロック単位', 'Sブロック単位', '50mメッシュ'],
      seriesLp: ['MPA', 'MPB'],
    },
    {
      mapTypeNormal: '中圧被害図',
      series: ['MPA', 'MPB'],
      deltaP: ['中圧低下度ΔP(15分)', '中圧低下度ΔP(最新)'],
    },
    {
      mapTypeNormal: '架管巡回',
      series: [
        'なし',
        'SI値',
        'GAL値',
        '中圧(MPA)',
        '中圧(MPB)',
        '低圧(LP)',
        '停止ガバナ',
        '閉巡回',
        '開巡回',
        'TC状態',
        '液状化警報',
        '停電',
        '水位警報',
      ],
    },
  ]

  const changeMapOption = (event: SelectChangeEvent) => {
    event.preventDefault()
    setMapOption(String(event.target.value))
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleChange1 = (event: React.SyntheticEvent, newValue: string) => {
    setValue1(newValue)
  }

  const handleChange11 = (event: React.SyntheticEvent, newValue: string) => {
    setValue11(newValue)
  }

  const handleChange12 = (event: React.SyntheticEvent, newValue: string) => {
    setValue12(newValue)
  }

  const handleChange111 = (event: React.SyntheticEvent, newValue: string) => {
    setValue111(newValue)
  }

  const handleChange112 = (event: React.SyntheticEvent, newValue: string) => {
    setValue112(newValue)
  }

  const CloseButton_Click = () => {
    setMapOtherOpen(!mapOtherOpen)
  }

  const handleOpenMapBlockSelect = (event: React.SyntheticEvent) => {
    setOpenMapBlockSelect(true)
    setBlockDetailOpen(0)
    event.preventDefault()
  }

  const handleCloseMapBlockSelect = (event: React.SyntheticEvent) => {
    setOpenMapBlockSelect(false)
    setBlockDetailOpen(0)
    event.preventDefault()
  }

  const onZoomResetEnd = React.useCallback(() => {
    setZoomReset((prevValue) => !prevValue)
  }, [])

  const onZoomOutEnd = React.useCallback(() => {
    setZoomOut((prevValue) => !prevValue)
  }, [])

  const onZoomInEnd = React.useCallback(() => {
    setZoomIn((prevValue) => !prevValue)
  }, [])

  const onZoomBoxEnd = React.useCallback(() => {
    setZoomBox((prevValue) => !prevValue)
  }, [])


  return (
    <div className="LayoutRoot" style={{ width: '100%' }}>
      <MapContainer
        center={INIT_CENTER}
        zoom={INIT_ZOOM}
        attributionControl={false}
        style={{ width: '100%', height: 'calc(100vh - 112px)' }}
        zoomControl={false}
        zoomDelta={0.25}
        zoomSnap={0}
        wheelPxPerZoomLevel={145}
        preferCanvas={true}
        keyboard={false}
      >
        <Map
          initCenter={INIT_CENTER}
          initZoom={INIT_ZOOM}
          zoomReset={zoomReset}
          zoomOut={zoomOut}
          zoomIn={zoomIn}
          zoomBox={zoomBox}
          onZoomResetEnd={onZoomResetEnd}
          onZoomOutEnd={onZoomOutEnd}
          onZoomInEnd={onZoomInEnd}
          onZoomBoxEnd={onZoomBoxEnd}
          mapWidth={mapWidth}
          mapHeight={mapHeight}
        />
      </MapContainer>
      {/* <div className="LayoutRootHeader"> */}
      <div className="MapOptionNormal">
        <Select
          id="MapTypeNormal"
          className="MapTypeNormal"
          value={mapOption}
          onChange={changeMapOption}
          size="small"
          MenuProps={{
            style: { top: '-5px', left: '-12px' },
          }}
        >
          {listType.map((type, index) => {
            return (
              <MenuItem value={String(index)} className="option">
                {type.mapTypeNormal}
              </MenuItem>
            )
          })}
        </Select>
        <Select
          id="series"
          className="series"
          defaultValue={mapOption === '0' || '5' ? 0 : 1}
          size="small"
          MenuProps={{
            style: { top: '-5px' },
          }}
        >
          {listType[Number(mapOption)].series.map((serie, index) => {
            return (
              <MenuItem value={index} className="option">
                {serie}
              </MenuItem>
            )
          })}
        </Select>
        {listType[Number(mapOption)].deltaP ? (
          <Select
            id="deltaP"
            className="deltaP"
            size="small"
            defaultValue={0}
            MenuProps={{
              style: { top: '-5px' },
            }}
          >
            {listType[Number(mapOption)].deltaP?.map((deltaPE, index) => {
              return (
                <MenuItem value={index} className="option">
                  {deltaPE}
                </MenuItem>
              )
            })}
          </Select>
        ) : undefined}
        {listType[Number(mapOption)].fillType ? (
          <Select
            id="fillTypeE"
            className="fillTypeE"
            defaultValue={0}
            size="small"
            MenuProps={{
              style: { top: '-5px' },
            }}
          >
            {listType[Number(mapOption)].fillType?.map((fillTypeE, index) => {
              return (
                <MenuItem value={index} className="option">
                  {fillTypeE}
                </MenuItem>
              )
            })}
          </Select>
        ) : undefined}
        {listType[Number(mapOption)].seriesLp ? (
          <Select
            id="seriesLp"
            className="seriesLp"
            defaultValue={0}
            size="small"
            MenuProps={{
              style: { top: '-5px' },
            }}
          >
            {listType[Number(mapOption)].seriesLp?.map((seriesLpE, index) => {
              return (
                <MenuItem value={index} className="option">
                  {seriesLpE}
                </MenuItem>
              )
            })}
          </Select>
        ) : undefined}
      </div>
      <div className="SettingPanel">
        <Select
          id="ChangeMapViewPicture"
          className="ChangeMapViewPicture"
          defaultValue={1}
          size="small"
          MenuProps={{
            style: { top: '-5px' },
          }}
        >
          <MenuItem value={1} className="option">
            背景地図(簡易)
          </MenuItem>
          <MenuItem value={2} className="option">
            背景地図(画像)
          </MenuItem>
        </Select>
        <Button
          variant="outlined"
          className="MapBlockSelectButton"
          onClick={handleOpenMapBlockSelect}
        >
          ブロック選択
        </Button>
        <Button variant="outlined" className="MapBlockSelectButton" onClick={CloseButton_Click}>
          その他の設定
        </Button>
        <Button
          variant="outlined"
          className="MapBlockSelectButton"
          onClick={() => {
            setOpenHandlePrintConfirm(true)
          }}
        >
          印刷・保存
        </Button>
      </div>
      {/* </div> */}
      <Dialog
        hideBackdrop
        open={openMapBlockSelect}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ position: 'absolute', top: 'calc(-60% - 25px)', left: '-60%' }}
        onClose={handleCloseMapBlockSelect}
        onBackdropClick={handleCloseMapBlockSelect}
      >
        <DialogContent>
          <div className="list-block-popup">
            <div className="list-block">
              <div
                className={blockDetailOpen === 1 ? 'block-select' : 'block'}
                onClick={() => openBlockDetail(1)}
              >
                <span>K1L1</span>
                <div
                  className={
                    blockDetailOpen === 1 && openMapBlockSelect ? 'dropdown-content' : 'hidden'
                  }
                >
                  <p>K1L1</p>
                  <p>K1L1</p>
                  <p>K1L1</p>
                  <p>K1L1</p>
                  <p>K1L1</p>
                  <p>K1L1</p>
                  <Button
                    onClick={() => openBlockDetail(0)}
                    className="close-dropdown-content-button"
                  >
                    キャンセル
                  </Button>
                </div>
              </div>
              <div
                className={blockDetailOpen === 2 ? 'block-select' : 'block'}
                onClick={() => openBlockDetail(2)}
              >
                K2L2
                <div
                  className={
                    blockDetailOpen === 2 && openMapBlockSelect ? 'dropdown-content' : 'hidden'
                  }
                >
                  <p>K1L1</p>
                  <p>K1L1</p>
                  <p>K1L1</p>
                  <p>K1L1</p>
                  <p>K1L1</p>
                  <p>K1L1</p>
                  <Button
                    onClick={() => openBlockDetail(0)}
                    className="close-dropdown-content-button"
                  >
                    キャンセル
                  </Button>
                </div>
              </div>
              <div className="block">K3L3</div>
              <div className="block">K1L2</div>
              <div className="block">K3L3</div>
            </div>
            <Button onClick={handleCloseMapBlockSelect} className="close-list-block-button">
              キャンセル
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className={mapOtherOpen ? 'mapOtherOpenContainer' : 'hidden'}>
        <TabContext value={value}>
          <div className="tabs">
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              className="tabs"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab label="表示位置" value="1" className="tab-label" />
              <Tab label="地図(ライン等)" value="2" className="tab-label" />
            </TabList>
            <Button variant="outlined" className="close-tabs-button" onClick={CloseButton_Click}>
              閉じる
            </Button>
          </div>
          <TabPanel value="1" className="ViewChangeListBox">
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                display: 'flex',
                height: '100%',
              }}
            >
              <TabContext value={value1}>
                <TabList
                  onChange={handleChange1}
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                  <Tab label="Kブロック" value="1.1" className="tab-label" />
                  <Tab label="エリア" value="1.2" className="tab-label" />
                </TabList>
                <TabPanel value="1.1" className="tab">
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      height: '100%',
                    }}
                  >
                    <TabContext value={value11}>
                      <TabList
                        onChange={handleChange11}
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                      >
                        <Tab label="K1-1" value="1.1.1" className="tab-label" />
                        <Tab label="k1-2" value="1.1.2" className="tab-label" />
                      </TabList>
                      <TabPanel value="1.1.1" className="tab">
                        <TabContext value={value111}>
                          <TabList
                            onChange={handleChange111}
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                          >
                            <Tab label="K1L1" value="1.1.1.1" className="tab-label" />
                            <Tab label="k1L2" value="1.1.1.2" className="tab-label" />
                          </TabList>
                        </TabContext>
                      </TabPanel>
                      <TabPanel value="1.1.2" className="tab">
                        <TabContext value={value112}>
                          <TabList
                            onChange={handleChange112}
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                          >
                            <Tab label="K2L1" value="1.1.2.1" className="tab-label" />
                            <Tab label="k2L2" value="1.1.2.2" className="tab-label" />
                            <Tab label="K2L3" value="1.1.2.3" className="tab-label" />
                            <Tab label="k2L4" value="1.1.2.4" className="tab-label" />
                          </TabList>
                        </TabContext>
                      </TabPanel>
                    </TabContext>
                  </Box>
                </TabPanel>
                <TabPanel value="1.2" className="tab">
                  <TabContext value={value12}>
                    <TabList
                      onChange={handleChange12}
                      orientation="vertical"
                      variant="scrollable"
                      value={value}
                      aria-label="Vertical tabs example"
                      sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                      <Tab label="K1L1" value="1.2.1" className="tab-label" />
                      <Tab label="k1L2" value="1.2.2" className="tab-label" />
                    </TabList>
                  </TabContext>
                </TabPanel>
              </TabContext>
            </Box>
          </TabPanel>
          <TabPanel value="2" className="ViewChangeListBox">
            <FormGroup className="VisibilityPanel">
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="局"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="局名称"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="Lブロックライン"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="Sブロックライン"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="Kブロックライン"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="第1次緊急停止判断Lブロック(色塗り)"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="30kine超過率50%以上のLブロック(色塗り)"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="遠隔遮断ブロック・停止Sブロック(色塗り)"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="遠隔D復旧実施済みブロック(色塗り)"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="Kブロック化判定結果"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Kブロック番号"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="Lブロック番号"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Lブロック属性非表示"
                sx={{ height: '20px' }}
              />
              <hr />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="MPA導管網"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="MPB導管網"
                sx={{ height: '20px' }}
              />
              <hr />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="背景地図"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="震央"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="拠点"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Lバルブ情報"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="架管巡回"
                sx={{ height: '20px' }}
              />
              <hr />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="漏えい情報"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="火災情報"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="京葉ガス局情報"
                sx={{ height: '20px' }}
              />
            </FormGroup>
          </TabPanel>
        </TabContext>
      </div>
      <div className="zoom-control">
        <div className="point-focus" onClick={onZoomResetEnd} title="初期表示位置に戻します">
          <div className="point-focus-content"></div>
        </div>
        <div className="zoom-out" onClick={onZoomOutEnd} title="地図を縮小します">
          <div className="zoom-out-content">
            <span>-</span>
          </div>
        </div>
        <div className="zoom-in" onClick={onZoomInEnd} title="地図を拡大します">
          <div className="zoom-in-content">
            <span>+</span>
          </div>
        </div>
        <div
          className="aria-focus"
          onClick={onZoomBoxEnd}
          title="地図上で範囲を指定して拡大表示します"
        >
          <div className="aria-focus-content"></div>
        </div>
      </div>
    </div>
  )
}
