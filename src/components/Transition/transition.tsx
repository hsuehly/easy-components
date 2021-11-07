import { FC } from "react";
import { CSSTransition } from "react-transition-group";
import type { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName,
    wrapper? : boolean
}
const Transition: FC<TransitionProps> = ({children, classNames, animation,wrapper, ...props}) => {

    return (
    <CSSTransition
    classNames={classNames ? classNames : animation}
    {...props}
    >
     {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
    )
}
Transition.defaultProps = {
    unmountOnExit: true,
    // appear: true,
}

export default Transition