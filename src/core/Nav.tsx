import React, { useState } from 'react';
import { Link } from 'react-router-dom';

enum NavType {
    LINK = 'LINK',
    SUB_LINK = 'SUB_LINK'
}

interface NavApi {
    name: String,
    type: NavType,
    pagePath?: String
    query?: String
    navItems?: NavApi[]
}

const NavData: NavApi[] = [
    { name: 'Home', type: NavType.LINK, pagePath: '' },
    {
        name: 'nav2',
        type: NavType.SUB_LINK,
        navItems: [
            { name: 'nav2.1', type: NavType.LINK, pagePath: 'tasks', query: 'themeId=21' },
            { name: 'nav2.2', type: NavType.LINK, pagePath: 'tasks', query: 'themeId=22' },
            { name: 'nav2.3', type: NavType.LINK, pagePath: 'tasks', query: 'themeId=23' },
            { name: 'nav2.4', type: NavType.LINK, pagePath: 'tasks', query: 'themeId=24' }
        ]
    },
    { name: 'nav3', type: NavType.LINK, pagePath: 'tasks', query: 'themeId=31' },
]

function NavItems({ name, type, navItems, pagePath }: NavApi) {
    const [show, setShow] = useState(false);
    if (type === NavType.LINK || navItems === undefined) return <></>

    return (<>
        <li onClick={x => setShow(!show)}><span>{name}</span></li>
        {
            show &&
            <ul className='nav flex-column'>
                {navItems.map(i => <NavGeneralItem key={`${pagePath}/${name}/${i.name}`} {...i} />)}
            </ul>
        }
    </>
    );
}


function NavGeneralItem({ name, type, navItems, pagePath, query }: NavApi) {
    if (type === NavType.LINK) {
        let q = '';
        if(query !== undefined) {
            q = '?' + query
        }
        return <li className='nav-item'><Link to={'' + pagePath + q}>{name}</Link></li>
    } else {
        if (navItems === undefined) return <></>
        return <NavItems name={name} type={type} navItems={navItems} pagePath={pagePath} query={query} />
    }
}

function Nav() {
    const navDatas = NavData;
    return (
        <nav>
            <ul className='nav flex-column'>
                {navDatas.map(i => <NavGeneralItem key={`/${i.name}`} {...i} />)}
            </ul>
        </nav>
    );
}



export default Nav;