import React, { useMemo } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { createWindow } from '../../../store/modules/PointData'
import { TableCellType } from '../../pages/ShutoffBlock/ShutoffBlock'

import { DisplayTypeConst, ModalTypeConst } from '../PopupWindow/PopupWindow'
import { filterCheckbox, filterCompareThan, filterEquals, filterKBlockName, NumberColumnFilter, SelectArrColumnFilter, SelectCheckboxFilter, SelectColumnFilter, SelectColumnKblocKNameFilter } from './components/Filter'
import TableChild from './components/TableChild'

import './table-grid.css'

type TableGridType = {
  setRowsCount: React.Dispatch<React.SetStateAction<number>>
  tableData: TableCellType[]
  toggleCheckBox: (rowIndex: number) => void
  toggleCheckAll: () => void
  isCheckAll: boolean
  showSubRow: (rowSelected: TableCellType) => void
  subRowData: TableCellType[]
}

const TableGrid = ({
  setRowsCount,
  tableData,
  toggleCheckBox,
  toggleCheckAll,
  isCheckAll,
  showSubRow,
  subRowData,
}: TableGridType) => {
  const data = useMemo(() => tableData, [tableData])

  const dispatch = useAppDispatch()
  const showPopupSBlock = (info: any) => {
    dispatch(
      createWindow({
        point: info,
        modalType: ModalTypeConst.IS_EXPRESS,
        displayType: DisplayTypeConst.SINGLE_MODAL,
        left: 0,
        top: 0,
      })
    )
  }
  const columns = useMemo(
    () => [
      // {
      //   Header: 'S表示',
      // },
      {
        // Make an expander cell
        Header: () => null,
        id: 'expander',
        columns: [
          {
            accessor: 'Not visible header 21',
            rowSpan: '2',
            Header: 'S表示',
            columns: [
              {
                Header: '',
                displayNone: true,

                accessor: 'expander', // It needs an ID
                Cell: ({ row, rows, preFilteredRows, toggleAllRowsExpanded }: any) => (
                  <span
                    {...row.getToggleRowExpandedProps({
                      onClick: () => {
                        const expandedRow =
                          rows.find((r: any) => r.isExpanded) ||
                          preFilteredRows.find((r: any) => r.isExpanded)
                        if (expandedRow) {
                          toggleAllRowsExpanded(false)
                        }
                        if (expandedRow?.id !== row.id) {
                          row.toggleRowExpanded()
                        }
                      },
                    })}
                  >
                    {row.isExpanded ? (
                      <h2>
                        <strong>-</strong>
                      </h2>
                    ) : (
                      <h2>
                        <strong
                          onClick={() => {
                            showSubRow(row)
                          }}
                        >
                          +
                        </strong>
                      </h2>
                    )}
                  </span>
                ),
                // We can override the cell renderer with a SubCell to be used with an expanded row
                SubCell: () => null, // No expander on an expanded row
                width: '2.82%',
              },
            ],
          },
        ],
      },
      {
        Header: <div className="noneClick">操作状況</div>,
        id: '操作状況',
        columns: [
          {
            accessor: 'Not visible header 20',
            rowSpan: '2',
            Header: (
              <div className="clickable" style={{ alignItems: 'center' }}>
                <p className="link">遮断</p>
                <input
                  onChange={() => {
                    toggleCheckAll()
                  }}
                  checked={isCheckAll}
                  type="checkbox"
                />
              </div>
            ),
            columns: [
              {
                Header: '',
                displayNone: true,

                accessor: '遮断',
                width: '3.45%',
                SubCell: (cellProps: any) => cellProps.value,
                Filter: SelectCheckboxFilter,
                filter: filterCheckbox,
              },
            ],
          },
          {
            accessor: 'Not visible header 19',
            rowSpan: '2',
            Header: (
              <div className="clickable">
                <p className="link">
                  ブロック <br /> 番号
                </p>
              </div>
            ),
            columns: [
              {
                Header: '',
                displayNone: true,

                accessor: 'ブロック番号',
                Filter: SelectColumnKblocKNameFilter,
                filter: filterKBlockName,
                width: '5.34%',
              },
            ],
          },
          {
            accessor: 'Not visible header 18',
            rowSpan: '2',
            Header: (
              <div className="clickable">
                <p className="link">停止判断</p>
              </div>
            ),
            columns: [
              {
                Header: '',
                displayNone: true,

                accessor: '停止判断',
                Filter: SelectColumnFilter,
                filter: 'includes',
                width: '8.38%',
                role: 'right',
              },
            ],
          },
          {
            accessor: 'Not visible header 17',
            rowSpan: '2',
            Header: (
              <div className="clickable">
                <p className="link">
                  依頼 <br /> 状況
                </p>
              </div>
            ),
            columns: [
              {
                Header: '',
                displayNone: true,

                accessor: '依頼状況',
                Filter: SelectColumnFilter,
                filter: filterEquals,
                width: '3.81%',
              },
            ],

            // disableFilters: true,
          },
        ],
      },
      {
        id: '基本情報',
        Header: <div className="noneClick">基本情報</div>,
        columns: [
          {
            accessor: 'Not visible header 16',
            rowSpan: '2',
            Header: (
              <div className="clickable">
                <p className="link">
                  総需要家 <br /> 件数
                </p>
              </div>
            ),
            columns: [
              {
                Header: '',
                displayNone: true,

                accessor: '総需要家件数',
                width: '5.56%',
                Filter: NumberColumnFilter,
                filter: filterCompareThan,
              },
            ],
          },
          {
            accessor: 'Not visible header 15',
            rowSpan: '2',
            Header: (
              <div className="clickable">
                <p className="link">
                  供給継続 <br /> 需要家件数
                </p>
              </div>
            ),
            columns: [
              {
                Header: '',
                displayNone: true,

                accessor: '供給継続需要家件数',
                width: '5.56%',
                Filter: NumberColumnFilter,
                filter: filterCompareThan,
              },
            ],
          },
          // {
          //   Header: 'エリア',
          //   accessor: 'エリア',
          // },
          {
            accessor: 'Not visible header 14',
            rowSpan: '2',
            Header: (
              <div className="clickable">
                <p className="link">ブロック区分</p>
              </div>
            ),
            columns: [
              {
                Header: '',
                displayNone: true,
                accessor: 'ブロック区分',
                Filter: SelectArrColumnFilter,
                filter: 'includes',
                width: '6.555%',
              },
            ],
          },
          {
            accessor: 'Not visible header 13',
            rowSpan: '2',
            Header: (
              <div className="clickable">
                <p className="link">
                  遮断 <br /> 設定
                </p>
              </div>
            ),
            columns: [
              {
                Header: '',
                displayNone: true,

                accessor: '遮断設定',
                width: '4.5%',
                Filter: NumberColumnFilter,
                filter: filterCompareThan,
              },
            ],
          },
          // {
          //   Header: 'Kブロック番号',
          //   accessor: 'Kブロック番号',
          // },
        ],
      },
      {
        id: '被害推定',
        Header: <div className="noneClick">被害推定</div>,
        columns: [
          {
            accessor: 'Not visible header 12',
            rowSpan: '2',
            Header: (
              <div className="clickable">
                <p className="link">
                  需要家 <br /> 漏えい遭遇率
                </p>
              </div>
            ),
            columns: [
              {
                Header: '',
                displayNone: true,

                width: '6.71%',
                accessor: '需要家漏えい遭遇率',
                Filter: NumberColumnFilter,
                filter: filterCompareThan,
              },
            ],
          },
          {
            accessor: 'Not visible header 11',
            rowSpan: '2',
            Header: (
              <div className="clickable">
                <div>本支管被害数(累計)</div>
                <p className="link">緊急</p>
              </div>
            ),
            columns: [
              {
                Header: '',
                displayNone: true,

                width: '8.77%',
                accessor: '緊急',
                Filter: NumberColumnFilter,
                filter: filterCompareThan,
              },
            ],
          },
        ],
      },
      {
        id: 'ガバナ情報',
        Header: <div className="noneClick">ガバナ情報</div>,
        columns: [
          {
            accessor: 'Not visible header 10',
            rowSpan: '2',
            Header: (
              <div className="clickable">
                <p className="link">最大SI</p>
              </div>
            ),
            columns: [
              {
                Header: '',
                displayNone: true,

                accessor: '最大SI',
                width: '3.43%',
                Filter: NumberColumnFilter,
                filter: filterCompareThan,
              },
            ],
          },
          {
            Header: (
              <div className="clickable">
                <p className="link">
                  ガバナ <br /> 停止率
                </p>
              </div>
            ),
            rowSpan: '2',
            accessor: 'Not visible header 9',
            columns: [
              {
                Header: '',
                displayNone: true,
                accessor: 'ガバナ停止率',
                Filter: NumberColumnFilter,
                filter: filterCompareThan,
              },
            ],
          },
          {
            Header: (
              <div className="clickable">
                <p>最低LP</p>{' '}
                {/* <span className="link" style={{ marginRight: '8px' }}>
                  単独除く
                </span>
                {'   '}
                <span className="link"> (含む)</span> */}
              </div>
            ),
            // displayNone: true,
            accessor: '最低LP単独除く(含む)',
            columns: [
              {
                Header: (
                  <div className="clickable">
                    <span className="link">単独除く</span>
                  </div>
                ),
                accessor: '最低LP(単独除く)',
                width: '1.35%',
                Filter: NumberColumnFilter,
                filter: filterCompareThan,
              },
              {
                Header: (
                  <div className="clickable">
                    <span className="link">(含む)</span>
                  </div>
                ),
                accessor: '最低LP(単独含む)',
                width: '4.35%',
                Filter: NumberColumnFilter,
                filter: filterCompareThan,
              },
            ],
          },
          {
            accessor: 'Not visible header 2',
            rowSpan: '2',
            Header: (
              <div>
                グラフ <br /> 表示
              </div>
            ),
            columns: [
              {
                Header: '',
                displayNone: true,

                accessor: 'グラフ表示',
                SubCell: (info: any) => {
                  return (
                    <span
                      className="link"
                      onClick={() => showPopupSBlock(info.row.original.ブロック番号)}
                    >
                      {info.value}
                    </span>
                  )
                },
                width: '2.97%',
                disableFilters: true,
                disableSortBy: true,
              },
            ],
          },
          {
            rowSpan: '2',
            Header: (
              <div>
                ガバナ <br /> 一覧
              </div>
            ),

            accessor: 'Not visible header 3',

            columns: [
              {
                Header: '',
                displayNone: true,
                accessor: 'ガバナ一覧',
                width: '2.97%',
                disableFilters: true,
                disableSortBy: true,
              },
            ],
          },
        ],
      },
      {
        id: '復旧情報',
        Header: <div className="noneClick">復旧情報</div>,
        columns: [
          {
            accessor: 'Not visible header 4',
            rowSpan: '2',
            Header: (
              <div className="clickable">
                <p className="link">
                  D復旧済 <br /> Sブロック
                </p>
              </div>
            ),
            columns: [
              {
                Header: '',
                displayNone: true,

                accessor: 'D復旧済Sブロック',
                width: '4.95%',
                Filter: SelectColumnFilter,
                filter: 'includes',
              },
            ],
          },
        ],
      },
      {
        id: '外部情報',
        Header: <div className="noneClick">外部情報</div>,
        columns: [
          {
            accessor: 'Not visible header 5',
            rowSpan: '2',
            Header: (
              <div className="clickable">
                <p className="link">停電率</p>
              </div>
            ),
            columns: [
              {
                Header: '',
                displayNone: true,

                accessor: '停電率',
                width: '3.35%',
                Filter: NumberColumnFilter,
                filter: filterCompareThan,
              },
            ],
          },
          {
            accessor: 'Not visible header 6',
            rowSpan: '2',
            Header: (
              <div className="clickable">
                <p className="link">
                  火災 <br /> 件数
                </p>
              </div>
            ),
            columns: [
              {
                Header: '',
                displayNone: true,

                accessor: '火災件数',
                width: '4.57%',
                Filter: NumberColumnFilter,
                filter: filterCompareThan,
              },
            ],
          },
          {
            accessor: 'Not visible header 7',
            rowSpan: '2',
            Header: (
              <div className="clickable">
                <p className="link">
                  漏えい
                  <br /> 受付
                </p>
              </div>
            ),
            columns: [
              {
                Header: '',
                displayNone: true,

                accessor: '漏えい受付',
                width: '4.57%',
                Filter: NumberColumnFilter,
                filter: filterCompareThan,
              },
            ],
          },
        ],
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isCheckAll, toggleCheckAll]
  )

  return (
    <div className="table-grid">
      <TableChild
        columns={columns}
        data={data}
        setRowsCount={setRowsCount}
        toggleCheckBox={toggleCheckBox}
        subRowData={subRowData}
      />
    </div>
  )
}

export default TableGrid
