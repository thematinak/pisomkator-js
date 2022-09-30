
export interface NavApiType {
    name: string,
    pagePath?: string
    query?: string
    navItems?: NavApiType[]
}
export function getNav(callBack: (navData: NavApiType[]) => void): void {
    callBack(
        [
            { name: 'Home', pagePath: '' },
            {
                name: 'nav2',
                navItems: [
                    { name: 'nav2.1', pagePath: 'tasks', query: 'themeId=21' },
                    { name: 'nav2.2', pagePath: 'tasks', query: 'themeId=22' },
                    { name: 'nav2.3', pagePath: 'tasks', query: 'themeId=23' },
                    { name: 'nav2.4', pagePath: 'tasks', query: 'themeId=24' }
                ]
            },
            { name: 'nav3', pagePath: 'tasks', query: 'themeId=31' },
        ]
    );
}