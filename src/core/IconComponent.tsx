import React from 'react';

type IconType = {
    style?: React.CSSProperties
}

export const CheckIcon = ({style}: IconType) => {
    return <i className='material-icons' style={style}>check</i>
}

export const EditIcon = ({style}: IconType) => {
    return <i className='material-icons' style={style}>edit</i>
}

export const DeleteIcon = ({style}: IconType) => {
    return <i className='material-icons' style={style}>delete</i>
}

export const TagIcon = ({style}: IconType) => {
    return <i className='material-icons' style={style}>tag</i>
}

export const ExpandIcon = ({style}: IconType) => {
    return <i className='material-icons' style={style}>expand_more</i>
}

export const CollapseIcon = ({style}: IconType) => {
    return <i className='material-icons' style={style}>expand_less</i>
}