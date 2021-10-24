import type { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from "react"
import classNames from "classnames"
export enum ButtonSize {
    Large = "lg",
    Small = "sm"
}

export enum ButtonType {
    Primary = "primary",
    Default = "default",
    Danger = "danger",
    Link = "link"
}

export interface  BaseButtonProps extends Partial<NactiveButtonProps&AnchorButtonProps>{
    // className?: string;
    disable?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    href?: string;
    // children: ReactNode;

}
type NactiveButtonProps = ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = AnchorHTMLAttributes<HTMLElement>
const Button: FC<BaseButtonProps> = ({children,disable,size,btnType,href,className, ...restProps}) => {
    const classse = classNames("btn",className,{
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        "disable": (btnType === ButtonType.Link) && disable
    }) 
    if(btnType === ButtonType.Link && href) {
        return (
            <a className={classse} href={href} {...restProps}>{children}</a>
        )
    } else {
        return (
            <button className={classse} disabled={disable} {...restProps}>{children}</button>
        )
    }
 
} 
Button.defaultProps = {
    disable: false,
    btnType: ButtonType.Default
}

export default Button