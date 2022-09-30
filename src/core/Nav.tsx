import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNav, NavApiType } from '../api/navApi';
import { CollapseIcon, ExpandIcon } from './IconComponent';

function Nav() {
    const [navData, setNavData] = useState<NavApiType[]>([]);
    useEffect(() => getNav(setNavData), []);
    return (
        <nav className='navbar'>
            <NavUl items={navData}/>
        </nav>
    );
}

function NavItem({ name, navItems, pagePath, query }: NavApiType) {
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
    items: NavApiType[]
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
    items: NavApiType[],
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