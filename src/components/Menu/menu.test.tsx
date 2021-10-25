import { fireEvent, render, cleanup, waitFor} from "@testing-library/react";
import type{ RenderResult } from "@testing-library/react";
import Menu, {MenuProps} from "./menu"
import MenuItem from "./menuitem"
import SubMenu from "./subMenu";


const testProps: MenuProps = {
    defaultIndex: "0",
    onSelect: jest.fn(),
    className: "test"
}
const testVerProps: MenuProps = {
    defaultIndex: "0",
    mode: "vertical"
}
const generateMenu = (props: MenuProps)  => {
    return (
        <Menu {...props}>
        <MenuItem >
            active
          </MenuItem> 
          <MenuItem  disabled>
            disabled
          </MenuItem>
          <MenuItem >
            xyz
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>
                drop1
            </MenuItem>
          </SubMenu>
        </Menu>
    ) 

}
const createStyleFile = () => {
    const cssfile: string = `
    .hsueh-submenu {
        display: none;
      }
      .hseuh-submenu.menu-opened {
        display:block;
      }
    `
    const style = document.createElement("style")
    style.type = "text/css"
    style.innerHTML = cssfile
    return style
}
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe("testMenu adn MenuItem components", ()=>{
    // 在跑测试组之前会执行这个钩子
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        // 插入样式
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId("test-menu")
        activeElement = wrapper.getByText("active")
        disabledElement = wrapper.getByText("disabled")
    })
    it("提供默认属性，会不会显示正常的class名", ()=> {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass("hsueh-menu test")
        // expect(menuElement.getElementsByTagName("li").length).toEqual(3)
        expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4)
        expect(activeElement).toHaveClass("menu-item is-active")
        expect(disabledElement).toHaveClass("menu-item is-disabled")
    })
    it("点击后，会不会切换正确的item上， 回调会不会正常触发", ()=> {
        const thirdItem = wrapper.getByText("xyz")
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass("is-active")
        expect(activeElement).not.toHaveClass("is-active")
        expect(testProps.onSelect).toBeCalledWith("2")
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass("is-active")
        expect(testProps.onSelect).not.toBeCalledWith("1")
    }) 
    it("切换mode会不会正常显示class名", ()=> { 
        cleanup()
        const wrapper = render(generateMenu(testVerProps))
        const menuElement = wrapper.getByTestId("test-menu")
        expect(menuElement).toHaveClass("menu-vertical")
    }) 
    it("submenu组件默认横向模式", async () => {
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('dropdown')
        fireEvent.mouseEnter(dropdownElement)
        await waitFor(() => {
          expect(wrapper.queryByText('drop1')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('drop1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownElement)
        await waitFor(() => {
          expect(wrapper.queryByText('drop1')).not.toBeVisible()
        })
    })
})
