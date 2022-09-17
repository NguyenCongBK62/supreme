import {
  Divider,
  ListItem,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ColumnInstance, useExpanded, useFilters, useSortBy, useTable } from "react-table";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ClearFilterConditionParts, SetFilter, SetSort } from "../../../../store/modules/FilterConditionPart";
import { MenuPosition } from "../../../layouts/Header/Header";
import { TableCellType } from "../../../pages/ShutoffBlock/ShutoffBlock";
import { DefaultColumnFilter } from "./Filter";
import SubRows from "./SubRows";


type tableChildType = {
  columns: any[];
  data: any[];
  setRowsCount: React.Dispatch<React.SetStateAction<number>>;
  toggleCheckBox: (index: number) => void;
  subRowData: TableCellType[];
};

function TableChild({
  columns,
  data,
  setRowsCount,
  toggleCheckBox,
  subRowData,
}: tableChildType) {
  const isclearAllFilter = useAppSelector(
    (state) => state.FilterConditionPartReducer.isclearAll
  );
  const filterStateArr = useAppSelector(
    (state) => state.FilterConditionPartReducer.filterArr
  );
  const sortStateArr = useAppSelector(
    (state) => state.FilterConditionPartReducer.sortArr
  );
  const [kBlockNameList, setKBlockNameList] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const formatKBlockName = (kblockName: string) => {
    kblockName = kblockName.substring(1);
    if (kblockName.indexOf("-") !== -1) {
      kblockName += "-0";
    }
    return kblockName;
  };
  useEffect(() => {
    let list: string[] = [];
    for (const d of data) {
      list = list.concat(d.AllKBlockName);
    }
    list.sort((o1, o2) => {
      o1 = formatKBlockName(o1);
      o2 = formatKBlockName(o2);

      const d1 = o1.split("-");
      const d2 = o2.split("-");
      if (parseInt(d1[0]) === parseInt(d2[0])) {
        return parseInt(d1[1]) - parseInt(d2[1]);
      }
      return parseInt(d1[0]) > parseInt(d2[0]) ? 1 : -1;
    });
    const distinctList = Array.from(new Set(list));
    setKBlockNameList(distinctList);
  }, [data]);

  const defaultColumn = React.useMemo(
    () => ({
      // Default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  useEffect(() => {
    if (isclearAllFilter) {
      setAllFilters([]);
      setSortBy([
        {
          id: "ブロック番号",
          desc: false,
        },
      ]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isclearAllFilter]);

  const [sortPosition, setSortPosition] = useState<MenuPosition>({
    anchorEl: null,
    popno: "",
  });

  const handleSortClick = (e: React.MouseEvent, _popno: string) => {
    setSortPosition({ anchorEl: e.currentTarget, popno: _popno });
  };

  const handleClose = async () => {
    await setSortPosition({ anchorEl: null, popno: "" });
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // page,
    rows,
    prepareRow,
    setAllFilters,
    visibleColumns,
    // canPreviousPage,
    // canNextPage,
    // pageCount,
    // gotoPage,
    // nextPage,
    // previousPage,
    state,
    toggleAllRowsExpanded,
    setSortBy,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        sortBy:
          sortStateArr.length > 0
            ? sortStateArr
            : [
                {
                  id: "ブロック番号",
                  desc: false,
                },
              ],
        filters: filterStateArr.length > 0 ? sortStateArr : [],
        // pageSize: 25,
        // pageIndex: 0,
      },
    },
    useFilters, // useFilters!
    useSortBy,
    useExpanded
    // useBlockLayout,
    // useSticky
    // usePagination
  );
  useEffect(() => {
    if (state.filters?.length !== 0 || state.sortBy?.length !== 0) {
      dispatch(ClearFilterConditionParts(false));
    }
    const payloadFilter = [...state.filters];
    const payloadSort = [...state.sortBy];

    if (
      JSON.stringify(payloadFilter) !== JSON.stringify(filterStateArr) ||
      JSON.stringify(payloadSort) !== JSON.stringify(sortStateArr)
    ) {
      toggleAllRowsExpanded(false);
      dispatch(SetFilter(payloadFilter));
      dispatch(SetSort(payloadSort));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    setRowsCount(rows.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows.length]);

  // useEffect(() => {
  //   state.expanded = {}
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state.expanded])
  // Render the UI for your table
  return (
    <div style={{ overflow: "auto", maxHeight: 500, width: "fit-content" }}>
      <Table stickyHeader {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, index) => (
            <TableRow
              {...headerGroup.getHeaderGroupProps({
                style: { width: headerGroup.width },
              })}
              key={index}
            >
              {headerGroup.headers.map((column: any, i) => {
                const ChildrenColumnSort = column.columns?.find(
                  (item: ColumnInstance<object>) =>
                    item.id === state.sortBy[state.sortBy.length - 1]?.id
                );
                return (
                  <TableCell
                    id="table-grid__header"
                    align="center"
                    {...column.getHeaderProps()}
                    key={i}
                    onClick={(e) => {
                      if (
                        (e.target as HTMLElement).classList.contains("link")
                      ) {
                        handleSortClick(
                          e,
                          `${column.columns ? column.columns[0].id : column.id}`
                        );
                      }
                    }}
                    rowSpan={`${column.rowSpan ?? 1}`}
                    style={{
                      display: column.displayNone ? "none" : "",
                      width: column.width || column.columns[0].width,
                    }}
                  >
                    {column.render("Header")}
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        fontSize: 10,
                      }}
                    >
                      {ChildrenColumnSort
                        ? ChildrenColumnSort.isSortedDesc
                          ? "🔽"
                          : "🔼"
                        : ""}
                    </span>

                    {sortPosition.popno === `${column.id}` && (
                      <Menu
                        BackdropProps={{
                          style: {
                            background: "rgba(0, 0, 0, 0.3)",
                          },
                        }}
                        open={!!sortPosition.anchorEl}
                        anchorEl={sortPosition.anchorEl}
                        PaperProps={{
                          style: {
                            width: 200,
                          },
                        }}
                        MenuListProps={{
                          style: {
                            padding: "0",
                          },
                        }}
                      >
                        <ListItem
                          style={{
                            outline: "none",
                            backgroundColor: "#EEEEEE",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {column.id}{" "}
                          <button
                            style={{ minWidth: "fit-content" }}
                            onClick={() => {
                              handleClose();
                            }}
                          >
                            X
                          </button>
                        </ListItem>
                        <Divider />
                        <MenuItem
                          onClick={(e) => {
                            const pos = state.sortBy
                              .map(function (e) {
                                return e.id;
                              })
                              .indexOf(column.id);
                            handleClose();
                            if (
                              state.sortBy.length === 1 &&
                              state.sortBy[0].id === "ブロック番号"
                            ) {
                              setSortBy([]);
                            }
                            if (state.sortBy.length > 1 && pos !== -1) {
                              state.sortBy.splice(pos, 1);
                              setSortBy(state.sortBy);
                            }
                            column.toggleSortBy(false, true);
                          }}
                        >
                          昇順で並び替え
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            const pos = state.sortBy
                              .map(function (e) {
                                return e.id;
                              })
                              .indexOf(column.id);
                            handleClose();
                            if (
                              state.sortBy.length === 1 &&
                              state.sortBy[0].id === "ブロック番号"
                            ) {
                              setSortBy([]);
                            }
                            if (state.sortBy.length > 1 && pos !== -1) {
                              state.sortBy.splice(0, 1);
                              setSortBy(state.sortBy);
                            }
                            column.toggleSortBy(true, true);
                          }}
                        >
                          降順で並び替え
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            handleClose();
                            column.setFilter(undefined);
                          }}
                        >
                          全て
                        </MenuItem>
                        {column.canFilter && (
                          <MenuItem>
                            {column.canFilter
                              ? column.render("Filter", {
                                  handleClose,
                                  kBlockNameList,
                                })
                              : null}
                          </MenuItem>
                        )}
                      </Menu>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            const rowProps = row.getRowProps();
            return (
              <>
                <TableRow {...row.getRowProps()} key={i}>
                  {row.cells.map((cell, index) => {
                    return (
                      <TableCell
                        align={`${
                          typeof cell.value === "boolean"
                            ? "center"
                            : typeof cell.value === "number"
                            ? "right"
                            : "left"
                        }`}
                        {...cell.getCellProps()}
                        className="table-data"
                        id="data"
                        key={index}
                      >
                        {typeof cell.value === "boolean" && (
                          <input
                            type="checkbox"
                            name=""
                            onChange={() => {
                              toggleCheckBox(i);
                            }}
                            checked={cell.value}
                          />
                        )}
                        {typeof cell.value === "number"
                          ? cell.value.toLocaleString()
                          : cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
                {row.isExpanded && (
                  <SubRows
                    row={row}
                    rowProps={rowProps}
                    visibleColumns={visibleColumns}
                    data={subRowData}
                  />
                )}
              </>
            );
          })}
        </TableBody>
      </Table>
      {/* <Pagenate
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageOptions={[state.pageIndex, state.pageSize]}
        pageCount={pageCount}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        totalRow={rows.length}
        style={{ display: 'flex', justifyContent: 'flex-end', }}
      /> */}
    </div>
  );
}

export default TableChild;
