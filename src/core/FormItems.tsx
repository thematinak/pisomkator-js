import React from 'react';

interface TextAreaData extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
};
export const TextArea = (props: TextAreaData) => (
    <div className='form-floating'>
        <textarea  {...{ className: 'form-control', ...props }} />
        {props.label && <label htmlFor='floatingTextarea'>{props.label}</label>}
    </div>
);

interface CheckBoxData extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
};
export const CheckBox = (props: CheckBoxData) => (
    <div className='form-check'>
        <input {...{ className: 'form-check-input', type: 'checkBox', ...props }} />
        {props.label && <label htmlFor='checkBox' className='form-check-label'>{props.label}</label>}
    </div>
);

export enum ButtonTypeEnum {
    PRIMARY = 'PRIMARY',
    SECONDARY = 'SECONDARY',
    SUCCESS = 'SUCCESS',
    WARN = 'WARN',
    DANGER = 'DANGER'
};
interface ButtonData extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    lvl: ButtonTypeEnum
};
export const Button = (props: ButtonData) => {
    let btnType = '';
    switch (props.lvl) {
        case ButtonTypeEnum.PRIMARY:
            btnType = 'btn-primary';
            break;
        case ButtonTypeEnum.SECONDARY:
            btnType = 'btn-secondary';
            break;
        case ButtonTypeEnum.DANGER:
            btnType = 'btn-danger';
            break;
        case ButtonTypeEnum.WARN:
            btnType = 'btn-warning';
            break;
        case ButtonTypeEnum.SUCCESS:
            btnType = 'btn-success';
            break;
        default:
            btnType = 'btn-primary';
    }
    // let newProps = {...props, }
    return <button {...{ className: `btn ${btnType}`, ...props }} />
};


interface ButtonGroupType extends React.HTMLAttributes<HTMLDivElement> {
};
export const ButtonGroup = (props: ButtonGroupType) => (
    <div {...{ className: 'btn-group', ...props }} />
);

interface RowType extends React.HTMLAttributes<HTMLDivElement> {
};
export const Row = (props:RowType) => <div className='row' {...props} />

function classHandlers(size?: number, addClassName?: string) {
    return (size === undefined ? 'col' : ('col-' + size))
        + (size !== undefined && addClassName !== undefined ? ' ' : '')
        + (addClassName === undefined ? '' : addClassName)
    ;
}

interface ColType {
    size?: number,
    addClassName?: string,
    children?: JSX.Element
};
export const Col = ({size, addClassName, children}:ColType) => <div className={classHandlers(size, addClassName)} children={children} />