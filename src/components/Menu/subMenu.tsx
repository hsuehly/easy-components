import React, { Children, cloneElement, useContext, useState } from "react";
import type { FC, FunctionComponentElement, MouseEvent} from "react"
import classNames from "classnames";
import { MenuContext } from "./menu" 
import {MenuItemProps} from "./menuitem"
export interface SubMenuProps {
    index?: string;
    title?: string;
    className?: string;
}

const SubMenu: FC<SubMenuProps> = ({index, title, className,children}) => {
    const context = useContext(MenuContext)
    const opendSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpend= (index && context.mode === "vertical") ? opendSubMenus.includes(index) : false
    const [menuOpen, setMenuOpen] = useState(isOpend)
    const classes = classNames("menu-item submenu-item", className, {
        'is-active': context.index === index
    })
    const handleClick = (e: MouseEvent) => {
        e.preventDefault()
        setMenuOpen(!menuOpen)
    }
    let timer: any
    const handleMouse = (e: MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setMenuOpen(toggle)
        }, 300);
    }
    const clickEvents = context.mode === "vertical" ? {onClick: handleClick} : {}
    const hoveEvents = context.mode !== "vertical" ? {
        onMouseEnter: (e: MouseEvent) => { handleMouse(e,true)},
        onMouseLeave: (e: MouseEvent) => {handleMouse(e,false)}
    } : {}
    const renderChildren = () => {
        const subMenuClasses = classNames("hsueh-submenu", {
            "menu-opened": menuOpen
        })
        const childrenComponent = Children.map(children,(child, i)=> {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName === "MenuItem") {
                return cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
        return (
            <ul className={subMenuClasses} >
                {childrenComponent}
            </ul>
        )
    }
    return(
        <li key={index} className={classes} {...hoveEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
    
}

SubMenu.displayName = "SubMenu"
export default SubMenu