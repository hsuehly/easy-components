import { ButtonSize, ButtonType } from "./components/Button/button"
import Button from "./components/Button/button"
import Menu from "./components/Menu/menu"
import MenuItem from "./components/Menu/menuitem"
import SubMenu from "./components/Menu/subMenu"
function App() {
  return (
    <div className="App">
      <Menu onSelect={(e)=>{alert(e)}}mode="vertical">
      <MenuItem >
          cool link
        </MenuItem> 
        <MenuItem  disabled>
          cool link 2
        </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
          </SubMenu>
        <MenuItem >
          cool link 3
        </MenuItem>
      </Menu>
  <hr />
   <h1>hello word</h1>
   <h2>hello word</h2>
   <h3>helloword</h3>
   <Button children={"heoloo"} btnType={ButtonType.Primary} onClick={(e)=> {console.log(e);
   }}
   className="sssss"
   />
   <Button btnType={ButtonType.Link} target="_blank" size={ButtonSize.Large} href="www.baidu.com" children={"heoloo"}/>
   <Button btnType={ButtonType.Danger}  size={ButtonSize.Large} disable={true}>hello</Button>
   <Button btnType={ButtonType.Default} size={ButtonSize.Small} disable={true}>hello</Button>
    </div>
  );
}

export default App;
