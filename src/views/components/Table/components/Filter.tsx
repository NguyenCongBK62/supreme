import { MenuItem, Select, TextField } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch } from '../../../../store/hooks'
import { createWindow } from '../../../../store/modules/PointData'
import { DisplayTypeConst, ModalTypeConst } from '../../PopupWindow/PopupWindow'
type Filter = {
  filterValue: any
  preFilteredRows: any[]
  setFilter: (string: any) => void
  id?: any
}
const MESS_CONFIRM = '数値が正しく入力されていません'
function DefaultColumnFilter({ column }: { column: Filter }) {
  return (
    <TextField
      variant="standard"
      value={column.filterValue || ''}
      onChange={(e) => {
        column.setFilter(e.target.value || undefined)
      }}
    />
  )
}

function NumberColumnFilter({ column, handleClose }: { column: Filter; handleClose: () => void }) {
  const dispatch = useAppDispatch()
  const [filterOptions, setFilterOptions] = useState({
    value: '',
    option: '',
  })

  useEffect(() => {
    if (filterOptions.option !== '') {
      column.setFilter(filterOptions)
      if (JSON.stringify(filterOptions) !== JSON.stringify(column.filterValue)) {
        handleClose()
      }
    } else return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions.option])

  return (
    <>
      <TextField
        variant="outlined"
        size="small"
        type="text"
        value={filterOptions.value || ''}
        onChange={(e) => {
          setFilterOptions({ value: e.target.value, option: '' })
        }}
        style={{ marginRight: '4px' }}
      />
      <Select
        variant="outlined"
        fullWidth
        size="small"
        defaultValue=""
        onChange={(e) => {
          if (isNaN(parseFloat(filterOptions.value))) {
            dispatch(
              createWindow({
                message: MESS_CONFIRM,
                modalType: ModalTypeConst.IS_CONFIRM,
                displayType: DisplayTypeConst.SINGLE_MODAL,
                left: 0,
                top: 0,
                isBlock: true,
              })
            )
          }
          setFilterOptions({
            value: filterOptions.value.split(',').join(''),
            option: e.target.value || '',
          })
        }}
        disabled={!filterOptions.value}
      >
        <MenuItem value={BIGGER_THAN}>以上</MenuItem>
        <MenuItem value={SMALLER_THAN}>以下</MenuItem>
        <MenuItem value={EQUALS}>と等しい</MenuItem>
      </Select>
    </>
  )
}

const BIGGER_THAN = '以上'
const SMALLER_THAN = '以下'
const EQUALS = 'と等しい'

// Define a custom filter filter function!
function filterCompareThan(rows: any[], id: any, filterValue: any) {
  switch (filterValue.option) {
    case BIGGER_THAN:
      return rows.filter((row) => {
        const rowValue = row.values[id]
        return Number.parseInt(rowValue) > Number.parseInt(filterValue.value)
      })
    case SMALLER_THAN:
      return rows.filter((row) => {
        const rowValue = row.values[id]
        return Number.parseInt(rowValue) < Number.parseInt(filterValue.value)
      })
    case EQUALS:
      return rows.filter((row) => {
        const rowValue = row.values[id]
        return Number.parseInt(rowValue) === Number.parseInt(filterValue.value)
      })
    default:
      return rows
  }
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
//   filterGreaterThan.autoRemove = (val:any) => typeof val !== 'number'

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({ column, handleClose }: { column: Filter; handleClose: () => void }) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const optionsSelect = useMemo(() => {
    const newArrVal: any[] = []
    column.preFilteredRows.forEach((row) => {
      if (row.values[column.id] !== undefined) {
        newArrVal.push(...row.values[column.id].split(','))
      }
    })

    const options = new Set<any>(newArrVal)
    return Array.from(options)
  }, [column.id, column.preFilteredRows])

  // Render a multi-select box
  return (
    <Select
      fullWidth
      size="small"
      defaultValue=""
      onChange={(e) => {
        column.setFilter(e.target.value || undefined)
        handleClose()
      }}
    >
      {optionsSelect.map((option, i) => {
        if (option) {
          return (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          )
        } else if (option === '' || option === null) {
          return (
            <MenuItem key={i} value="空白">
              空白
            </MenuItem>
          )
        }
        return null
      })}
    </Select>
  )
}

function SelectColumnKblocKNameFilter({
  column,
  handleClose,
  kBlockNameList,
}: {
  column: Filter
  handleClose: () => void
  kBlockNameList: string[]
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const optionsSelect = useMemo(() => {
    return kBlockNameList
  }, [kBlockNameList])

  // Render a multi-select box
  return (
    <Select
      fullWidth
      size="small"
      defaultValue=""
      onChange={(e) => {
        column.setFilter(e.target.value || undefined)
        handleClose()
      }}
    >
      {optionsSelect.map((option, i) => {
        if (option) {
          return (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          )
        } else if (option === '' || option === null) {
          return (
            <MenuItem key={i} value="空白">
              空白
            </MenuItem>
          )
        }
        return null
      })}
    </Select>
  )
}
function SelectArrColumnFilter({
  column,
  handleClose,
}: {
  column: Filter
  handleClose: () => void
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const optionsSelect = useMemo(() => {
    const newArrVal: any[] = []
    column.preFilteredRows.forEach((row) => {
      if (row.values[column.id] !== undefined) {
        newArrVal.push(...row.values[column.id]?.split(','))
      }
    })

    const options = new Set<any>(newArrVal)
    return Array.from(options)
  }, [column.id, column.preFilteredRows])

  // Render a multi-select box
  return (
    <Select
      fullWidth
      size="small"
      defaultValue=""
      onChange={(e) => {
        column.setFilter(e.target.value || undefined)
        handleClose()
      }}
    >
      {optionsSelect.map((option, i) => {
        if (option) {
          return (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          )
        }
        return null
      })}
    </Select>
  )
}

function SelectCheckboxFilter({
  column,
  handleClose,
}: {
  column: Filter
  handleClose: () => void
}) {
  // Render a multi-select box
  return (
    <Select
      fullWidth
      size="small"
      defaultValue=""
      onChange={(e) => {
        column.setFilter(e.target.value || undefined)
        handleClose()
      }}
    >
      <MenuItem value="チェック">チェック</MenuItem>
      <MenuItem value="等しい">空白</MenuItem>
    </Select>
  )
}

function filterCheckbox(rows: any[], id: any, filterValue: any) {
  switch (filterValue) {
    case 'チェック':
      return rows.filter((row) => {
        const rowValue = row.values[id]
        return rowValue === true
      })
    case '等しい':
      return rows.filter((row) => {
        const rowValue = row.values[id]
        return rowValue === false
      })
    default:
      return rows
  }
}

function filterEquals(rows: any[], id: any, filterValue: any) {
  switch (filterValue) {
    case '空白':
      return rows.filter((row) => {
        const rowValue = row.values[id]
        return rowValue === ''
      })
    default:
      return rows.filter((row) => {
        const rowValue = row.values[id]
        return rowValue === filterValue
      })
  }
}

function filterKBlockName(rows: any[], id: any, filterValue: any) {
  return rows.filter((row) => {
    return row.original.AllKBlockName.includes(filterValue)
  })
}

export {
  DefaultColumnFilter,
  NumberColumnFilter,
  filterCompareThan,
  SelectColumnFilter,
  SelectCheckboxFilter,
  filterCheckbox,
  SelectArrColumnFilter,
  filterEquals,
  SelectColumnKblocKNameFilter,
  filterKBlockName,
}
