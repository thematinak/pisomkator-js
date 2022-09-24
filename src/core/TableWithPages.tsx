import React, { useEffect, useState } from 'react';

type RowType = {
    id: number,
    [key: string]: any
}

type PageProps = {
    pageSize: number,
    page: number,
    pageMaxPage: number,
}

type ColumnHandler = {
    label: string,
    renderer: (data: any) => JSX.Element
}



type TableWithPagesType = {
    columnHandler: ColumnHandler[],
    loadData: ((offset: number, size: number) => RowType[])
}
function TableWithPages({ columnHandler, loadData }: TableWithPagesType) {
    const [pageProps, setPageProps] = useState<PageProps>({
        pageSize: 10,
        page: 0,
        pageMaxPage: 0
    });
    const [rowData, setData] = useState<RowType[]>([]);
    
    useEffect(() => setData(loadData(pageProps.page * pageProps.pageSize, pageProps.pageSize)), [pageProps.page, pageProps.pageSize, loadData]);
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
                                    {columnHandler.map(handler => <td className='col' key={handler.label}>{handler.renderer({ key: handler.label, ...r })}</td>)}
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