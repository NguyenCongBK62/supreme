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
      mapTypeNormal: '?????????',
      series: [
        '??????',
        'SI???',
        'GAL???',
        '??????(MPA)',
        '??????(MPB)',
        '??????(LP)',
        '???????????????',
        '?????????',
        '?????????',
        'TC??????',
        '???????????????',
        '??????',
        '????????????',
      ],
    },
    {
      mapTypeNormal: '?????????(K?????????????????????)',
      series: ['??????', 'SI???', 'GAL???'],
    },
    {
      mapTypeNormal: '?????????(XXXX?????????GS?????????????????????)',
      series: ['??????', 'SI???', 'GAL???'],
    },
    {
      mapTypeNormal: '?????????(????????????)',
      series: [
        '??????',
        'SI???',
        'GAL???',
        '??????(MPA)',
        '??????(MPB)',
        '??????(LP)',
        '???????????????',
        '?????????',
        '?????????',
        'TC??????',
        '???????????????',
        '??????',
        '????????????',
      ],
    },
    {
      mapTypeNormal: '???????????????',
      series: [
        '??????',
        'SI???',
        'GAL???',
        '??????(MPA)',
        '??????(MPB)',
        '??????(LP)',
        '???????????????',
        '?????????',
        '?????????',
        'TC??????',
        '???????????????',
        '??????',
        '????????????',
      ],
      fillType: ['L??????????????????', 'S??????????????????', '50m????????????'],
      seriesLp: ['MPA', 'MPB'],
    },
    {
      mapTypeNormal: '???????????????',
      series: ['MPA', 'MPB'],
      deltaP: ['?????????????????P(15???)', '?????????????????P(??????)'],
    },
    {
      mapTypeNormal: '????????????',
      series: [
        '??????',
        'SI???',
        'GAL???',
        '??????(MPA)',
        '??????(MPB)',
        '??????(LP)',
        '???????????????',
        '?????????',
        '?????????',
        'TC??????',
        '???????????????',
        '??????',
        '????????????',
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
            ????????????(??????)
          </MenuItem>
          <MenuItem value={2} className="option">
            ????????????(??????)
          </MenuItem>
        </Select>
        <Button
          variant="outlined"
          className="MapBlockSelectButton"
          onClick={handleOpenMapBlockSelect}
        >
          ??????????????????
        </Button>
        <Button variant="outlined" className="MapBlockSelectButton" onClick={CloseButton_Click}>
          ??????????????????
        </Button>
        <Button
          variant="outlined"
          className="MapBlockSelectButton"
          onClick={() => {
            setOpenHandlePrintConfirm(true)
          }}
        >
          ???????????????
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
                    ???????????????
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
                    ???????????????
                  </Button>
                </div>
              </div>
              <div className="block">K3L3</div>
              <div className="block">K1L2</div>
              <div className="block">K3L3</div>
            </div>
            <Button onClick={handleCloseMapBlockSelect} className="close-list-block-button">
              ???????????????
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
              <Tab label="????????????" value="1" className="tab-label" />
              <Tab label="??????(????????????)" value="2" className="tab-label" />
            </TabList>
            <Button variant="outlined" className="close-tabs-button" onClick={CloseButton_Click}>
              ?????????
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
                  <Tab label="K????????????" value="1.1" className="tab-label" />
                  <Tab label="?????????" value="1.2" className="tab-label" />
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
                label="???"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="?????????"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="L?????????????????????"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="S?????????????????????"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="K?????????????????????"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="???1?????????????????????L????????????(?????????)"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="30kine?????????50%?????????L????????????(?????????)"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="?????????????????????????????????S????????????(?????????)"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="??????D??????????????????????????????(?????????)"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="K???????????????????????????"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="K??????????????????"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="L??????????????????"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="L???????????????????????????"
                sx={{ height: '20px' }}
              />
              <hr />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="MPA?????????"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="MPB?????????"
                sx={{ height: '20px' }}
              />
              <hr />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="????????????"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="??????"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="??????"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="L???????????????"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="????????????"
                sx={{ height: '20px' }}
              />
              <hr />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="???????????????"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="????????????"
                sx={{ height: '20px' }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="?????????????????????"
                sx={{ height: '20px' }}
              />
            </FormGroup>
          </TabPanel>
        </TabContext>
      </div>
      <div className="zoom-control">
        <div className="point-focus" onClick={onZoomResetEnd} title="?????????????????????????????????">
          <div className="point-focus-content"></div>
        </div>
        <div className="zoom-out" onClick={onZoomOutEnd} title="????????????????????????">
          <div className="zoom-out-content">
            <span>-</span>
          </div>
        </div>
        <div className="zoom-in" onClick={onZoomInEnd} title="????????????????????????">
          <div className="zoom-in-content">
            <span>+</span>
          </div>
        </div>
        <div
          className="aria-focus"
          onClick={onZoomBoxEnd}
          title="??????????????????????????????????????????????????????"
        >
          <div className="aria-focus-content"></div>
        </div>
      </div>
    </div>
  )
}
