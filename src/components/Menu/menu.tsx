import {useState, createContext, Children, FunctionComponentElement, cloneElement } from "react";
import type { FC, CSSProperties } from "react";
import classNames from "classnames";
import type { MenuItemProps } from "./menuitem"

type MenuMode = "horizontal" | "vertical"
type SelectCallback = (selectedIndex: number) => void;
export interface MenuProps {
    className?: string;
    defaultIndex?: number;
    mode?: MenuMode;
    style?: CSSProperties;
    onSelect?: SelectCallback;
}
interface IMenuContext {
    index: number;
    onSelect?: SelectCallback;
    mode?:MenuMode;
}
export const MenuContext = createContext<IMenuContext>({index: 0})
const Menu: FC<MenuProps> = ({children, className, mode = "horizontal", style, onSelect, defaultIndex = 0}) => {
    const [active, setActive] = useState(defaultIndex)
    const handleClick = (index: number) => {
        setActive(index)
        if(onSelect) {
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: active,
        onSelect: handleClick,
        mode: mode
    }
    const classes = classNames("hsueh-menu", className, {
        [`menu-vertical`]: mode === "vertical",
        [`menu-horizontal`]: mode !== "vertical" 
    })
    const renderChildren = () => {
        return Children.map(children, (child, index)=> {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
             if(displayName === "MenuItem" || displayName === "SubMenu") {
                 return cloneElement(childElement, {
                     index
                 })
             } else {
                 console.error("Warning: Menu has a child which is not a MenuItem component")
             }
        })
    }
    // data-testid="test-menu" 为test提供testid 用于获取节点
    return (<ul className={classes} style={style} data-testid="test-menu">
     <MenuContext.Provider value={passedContext}>
         {renderChildren()}
     </MenuContext.Provider>
    </ul>)
}  
export default Menu