import React from 'react'
import { useTable, usePagination } from 'react-table'


function Table({ columns, data, spinner }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    )

    return (
        <>
           {spinner && <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>}
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="text-info">
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} >{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} >
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} className="shadow-lg p-3 mb-5 bg-white text-success rounded">
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()} className="shadow-lg p-3 mb-5 bg-white rounded">{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Table
