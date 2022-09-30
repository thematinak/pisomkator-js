import React, { useCallback, useEffect, useState } from 'react';


type TableRowDataType = {
    id: number,
    [key: string]: any
}

export interface RowType extends TableRowDataType {
    forceReload: () => void
}

type PageProps = {
    pageSize: number,
    page: number,
    pageMaxPage: number,
}

type ColumnHandler<R extends RowType> = {
    label: string,
    renderer: (data: R) => JSX.Element
}

type TableWithPagesType<T> = {
    columnHandler: ColumnHandler<T & RowType>[],
    loadData: ((offset: number, size: number, getDataF: (data: T[]) => void) => void)
}
function TableWithPages<T extends TableRowDataType>({ columnHandler, loadData }: TableWithPagesType<T>) {
    const [pageProps, setPageProps] = useState<PageProps>({ pageSize: 10, page: 0, pageMaxPage: 0 });
    const [rowData, setData] = useState<T[]>([]);
    const [reload, setReload] = useState(Boolean);

    useEffect(() => loadData(pageProps.page * pageProps.pageSize, pageProps.pageSize, setData), [pageProps.page, pageProps.pageSize, loadData, reload]);
    const forceReload = useCallback(() => setReload(!reload), [reload]);
    
    if (rowData.length === 0) {
        return <div />
    }
    return (
        <div>
            <div>
                <table className='card-body table table-hover'>
                    <thead>
                        <tr>
                            {columnHandler.map(handler => <th className='col' key={handler.label}>{handler.label}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rowData.map(r =>
                                <tr key={r.id}>
                                    {columnHandler.map(handler => <td className='col' key={handler.label}>{handler.renderer({ key: handler.label, ...r, forceReload: forceReload })}</td>)}
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <ul className='pagination justify-content-end'>
                    <li className='page-item'><button className='page-link' onClick={() => setPageProps({ ...pageProps, page: pageProps.page - 1 })} disabled={pageProps.page < 1}>{'<'}</button></li>
                    <li className='page-item'><div className='page-link'>{pageProps.page + 1}</div></li>
                    <li className='page-item'><button className='page-link' onClick={() => setPageProps({ ...pageProps, page: pageProps.page + 1 })} disabled={pageProps.page >= pageProps.pageMaxPage}>{'>'}</button></li>
                </ul>
            </div>
        </div>
    );
}

export default TableWithPages;