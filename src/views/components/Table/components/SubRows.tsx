import { TableCell, TableRow } from '@mui/material'
import React from 'react'
type SubRowsType = {
  row: any
  data?: any
  rowProps: any
  visibleColumns: any
}

const fakeData = [
  {
    遮断: true,
    ブロック番号: 'K1L3-1',
    停止判断: '',
    依頼状況: '',
    総需要家件数: 67357,
    供給継続需要家件数: 67258,
    ブロック区分: '',
    遮断設定: '',
    需要家漏えい遭遇率: '0.00',
    緊急: '0(0)',
    最大SI: '-',
    ガバナ停止率: 0,
    '最低LP単独除く(含む)': '- ( - )',
    グラフ表示: '表示',
    ガバナ一覧: 'ガバ',
    D復旧済Sブロック: '',
    停電率: 0,
    火災件数: 0,
    漏えい受付: 0,
  },
]

function SubRows({ row, rowProps, visibleColumns, data = fakeData }: SubRowsType) {
  return (
    <>
      {data.map((x: any, i: number) => {
        return (
          <TableRow {...rowProps} key={`${rowProps.key}-expanded-${i}`} className="sub-data-row">
            {row.cells.map((cell: any) => {
              return (
                <TableCell
                  align={`${typeof cell.value === 'number' ? 'right' : 'left'}`}
                  {...cell.getCellProps()}
                  id="sub-data-cell"
                  className={`${
                    cell.column.accessor(x, i) === '' ||
                    typeof cell.column.accessor(x, i) === 'boolean'
                      ? 'disabled'
                      : ''
                  }`}
                >
                  {cell.render(cell.column.SubCell ? 'SubCell' : 'Cell', {
                    value:
                      cell.column.accessor && typeof cell.column.accessor(x, i) === 'number'
                        ? parseInt(cell.column.accessor(x, i)).toLocaleString()
                        : cell.column.accessor(x, i),
                    row: { ...row, original: x },
                  })}
                </TableCell>
              )
            })}
          </TableRow>
        )
      })}
    </>
  )
}

export default SubRows
