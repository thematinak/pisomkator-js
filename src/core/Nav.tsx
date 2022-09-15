import React, { useState } from 'react';
import { Link } from 'react-router-dom';

enum NavType {
    LINK = 'LINK',
    SUB_LINK = 'SUB_LINK'
}

interface NavApi {
    name: String,
    type: NavType,
    navItems?: NavApi[]
}

const NavData: NavApi[] = [
    { name: 'nav1', type: NavType.LINK },
    {
        name: 'nav2',
        type: NavType.SUB_LINK,
        navItems: [
            { name: 'nav2.1', type: NavType.LINK },
            { name: 'nav2.2', type: NavType.LINK },
            { name: 'nav2.3', type: NavType.LINK },
            { name: 'nav2.4', type: NavType.LINK }
        ]
    },
    { name: 'nav3', type: NavType.LINK },
]

interface NavItemProps extends NavApi {
    path: String
}

function NavItems({ name, type, navItems, path }: NavItemProps) {
    const [show, setShow] = useState(false);
    if (type === NavType.LINK || navItems === undefined) return <></>

    return (<>
        <li onClick={x => setShow(!show)}><span>{name}</span></li>
        {
            show &&
            <ul>
                {navItems.map(i => <NavGeneralItem key={`${path}/${name}/${i.name}`} {...i} path={`${path}/${name}`} />)}
            </ul>
        }
    </>
    );
}

function NavGeneralItem({ name, type, navItems, path }: NavItemProps) {
    if (type === NavType.LINK) {
        return <li><Link to={`${path}/${name}`}>{name}</Link></li>
    } else {
        if (navItems === undefined) return <></>
        return <NavItems name={name} type={type} navItems={navItems} path={path} />
    }
}

function Nav() {
    const navDatas = NavData;
    return (
        <nav>
            <ul>
                {navDatas.map(i => <NavGeneralItem key={`/${i.name}`} {...i} path='' />)}
            </ul>
        </nav>
    );
}



export default Nav;