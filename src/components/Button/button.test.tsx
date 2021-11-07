import { render, fireEvent} from "@testing-library/react"
import Button, {BaseButtonProps} from "./button"

const defaultProps = {
    onClick: jest.fn()
}
const testProps: BaseButtonProps = {
    btnType: "primary",
    size: "lg",
    className: "hsueh"
}
const disabledProps: BaseButtonProps = {
    disable: true,
    onClick: jest.fn()
}
describe("test Button component", () => {
    it("should render the correct default button", () => {
        const wrapper = render(<Button {...defaultProps}>hsueh</Button>)
        const element = wrapper.getByText("hsueh") as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element?.tagName).toEqual("BUTTON")
        expect(element).toHaveClass("btn btn-default")
        expect(element.disabled).toBeFalsy()
        fireEvent.click(element)
        //   方法被调用
        expect(defaultProps.onClick).toHaveBeenCalled()
    })
    it("should render the correct components based on diffeeent props", () => {
        const wrapper = render(<Button {...testProps}>hsueh</Button>)
        const element = wrapper.getByText("hsueh")
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass("btn-primary btn-lg hsueh")
    })
    it("should render a link when btnType equals link an href provide", () => {
        const wrapper = render(<Button btnType={"link"} href="https://baidu.com">Link</Button>)
        const element = wrapper.getByText("Link")
        expect(element.tagName).toEqual("A")
        expect(element).toHaveClass("btn btn-link")
    })
    it("测试disable属性", ()=>{
        const wrapper = render(<Button {...disabledProps}>dise</Button>)
        const element = wrapper.getByText("dise") as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()
        // 触发点击
        fireEvent.click(element)
        // 希望组件点击后，onclick并没有被调用
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })

})