import React, { useEffect, useState } from 'react';

type RowType = {
    id: number,
    [key: string]: any
}

type PageProps = {
    rowOffset: number,
    pageSize: number,
    page: number,
    pageMaxPage: number,
}

type ColumnHandler = {
    name: string,
    renderer: (data: any) => JSX.Element
}

function handleSelected(isSelected: boolean, id: number, state: { [id: number]: boolean }, disp: (obj: any) => void) {
    if (isSelected) {
        disp({ ...state, [id]: true });
    } else {
        let newState = { ...state };
        delete newState[id];
        disp(newState);
    }
}

type TableWithPagesType = {
    columnHandler: ColumnHandler[],
    actions: { label: string, action: (ids: number[]) => boolean }[]
    loadData: ((offset: number, size: number) => RowType[])
}
function TableWithPages({ columnHandler, actions, loadData }: TableWithPagesType) {
    const [pageProps, setPageProps] = useState<PageProps>({
        rowOffset: 0,
        pageSize: 10,
        page: 0,
        pageMaxPage: 0
    });
    const [rowData, setData] = useState<RowType[]>([]);
    const [selectedIds, setSelectedIds] = useState<{ [key: string]: boolean }>({});
    useEffect(() => setData(loadData(pageProps.rowOffset, pageProps.pageSize)), [pageProps.rowOffset, pageProps.pageSize]);
    if (rowData.length === 0) {
        return <div />
    }
    console.log(selectedIds);
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {columnHandler.map(handler => <th key={handler.name}>{handler.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        rowData.map(r =>
                            <tr key={r.id}>
                                <td><input type='checkbox' checked={selectedIds[r.id] || false} onChange={(e) => handleSelected(e.target.checked, r.id, selectedIds, setSelectedIds)} /></td>
                                {columnHandler.map(handler => <td key={handler.name}>{handler.renderer({ key: handler.name, ...r[handler.name] })}</td>)}
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div>
                {actions.map((a) => <button key={a.label} onClick={() => a.action(Object.keys(selectedIds).map(Number))}>{a.label}</button>)}
                <button onClick={() => setPageProps({ ...pageProps, page: pageProps.page - 1 })} disabled={pageProps.page < 1}>{'<'}</button>
                {pageProps.page + 1}
                <button onClick={() => setPageProps({ ...pageProps, page: pageProps.page + 1 })} disabled={pageProps.page >= pageProps.pageMaxPage}>{'>'}</button>
            </div>
        </div>
    );
}

export default TableWithPages;