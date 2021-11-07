import { FC } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome"

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps
}
const Icon: FC<IconProps> = ({theme, className, ...props}) => {
    const classes = classNames("hsueh-icon",className, {
        [`icon-${theme}`]: theme
    })

    return(<FontAwesomeIcon className={classes} {...props}></FontAwesomeIcon>)

}
export default Icon;