import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CollapseIcon, ExpandIcon } from './IconComponent';

interface NavApi {
    name: string,
    pagePath?: string
    query?: string
    navItems?: NavApi[]
}

const NavData: NavApi[] = [
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

function Nav() {
    const navDatas = NavData;
    return (
        <nav className='navbar'>
            <NavUl items={navDatas}/>
        </nav>
    );
}

function NavItem({ name, navItems, pagePath, query }: NavApi) {
    if (navItems === undefined) {
        let q = '';
        if (query !== undefined) {
            q = '?' + query
        }
        return <NavLi><Link className='nav-link active' to={'' + pagePath + q} >{name}</Link></NavLi>
    } else {
        if (navItems === undefined) return <></>
        return <NavExpand name={name} items={navItems} />
    }
}

type NavExpandType = {
    name: string,
    items: NavApi[]
}
function NavExpand({ name, items }: NavExpandType) {
    const [show, setShow] = useState(false);
    return (
        <>
            <NavLi onClick={x => setShow(!show)}>
                <span className='nav-link active'>
                    {name}
                    {show ? <ExpandIcon style={{ fontSize: '18px' }} /> : <CollapseIcon style={{ fontSize: '18px' }} />}
                </span>
            </NavLi>
            {
                show && <NavUl items={items} />
            }
        </>
    );
}

type NavUlType = {
    items: NavApi[],
}
function NavUl({ items }: NavUlType) {
    return (
        <ul className='nav flex-column'>
            {items.map(i => <NavItem key={i.name} {...i} />)}
        </ul>
    );
}

function NavLi(props: React.LiHTMLAttributes<HTMLLIElement>) {
    return <li className='nav-item' {...props} />
}


export default Nav;