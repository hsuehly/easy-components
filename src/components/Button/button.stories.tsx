import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions"
import type { CSSProperties} from "react" 

import Button from "./button"

const style: CSSProperties =  {
    textAlign: "center"
}
const centerDecorator = (storyFn: any) => (<div style={style}>{storyFn()}</div>)
const defaultButton = ( )=> (<Button onClick={action("cliked")}>默认按钮</Button>)
const buttonWithSize = () =>(<>
<Button size="lg">大</Button>
<Button size="sm">小</Button>
</>)
const buttonWithType = () => (<>
<Button btnType="danger">danger</Button>
<Button btnType="default">default</Button>
<Button btnType="link">link</Button>
<Button btnType="primary">primary</Button>
</>)
storiesOf("Buton Component",module)
.addDecorator(centerDecorator)
.addParameters({
    info: {
        text: `
        this is a very nice component
        ## this is a header
        `,
        inline: true
    }
})
.add("默认Button",defaultButton)
.add("不同大小的按钮",buttonWithSize)
.add("不同类型的按钮",buttonWithType)  