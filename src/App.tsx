import { ChangeEvent, useState } from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import Button from "./components/Button/button"
import Menu from "./components/Menu/menu"
import MenuItem from "./components/Menu/menuitem"
import SubMenu from "./components/Menu/subMenu"
import Icon from "./components/Icond/icon"
import Transition from "./components/Transition/transition"
import Input from "./components/Input/input"
// import AutoComplete from "./components/AutoComplete/autoComplete"
import axios from "axios"
library.add(fas)
function App() {
  const [show,setShow] = useState(false)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if(files) {
      const uploadedFile = files[0]
      const formData = new FormData()
      formData.append(uploadedFile.name, uploadedFile)
      axios.post("https://jsonplaceholder.typicode.com/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res=> {
        console.log(res);
        
      })
    }

  }

  return (
    <div className="App">
      <Icon icon={"coffee"} theme="primary" size="10x"/>
      <Menu defaultIndex="0" onSelect={(e)=>{alert(e)}}mode="horizontal" defaultOpenSubMenus={["2"]}>
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
   <Button children={"heoloo"} btnType={"primary"} onClick={(e)=> {console.log(e);
   }}
   className="sssss"
   />
   <Button btnType={"link"} target="_blank" size={"lg"} href="www.baidu.com" children={"heoloo"}/>
   <Button btnType={"danger"}  size={"lg"} disable={true}>hello</Button>
   <Button btnType={"default"} size={"sm"} disable={true}>hello</Button>
   <Button  size="lg" onClick={()=> setShow(!show)}>切换</Button>
   <Transition in={show} timeout={300} animation="zoom-in-top" wrapper={true}>
     <div>dsadasdadadadaasd</div>
     <div>dsadasdadadadaasd</div>
     <div>dsadasdadadadaasd</div>
     <div>dsadasdadadadaasd</div>
     <div>dsadasdadadadaasd</div>
     <Button size="sm" btnType="primary">dadas</Button>
   </Transition>
   <Input disabled={true} size="lg" />
   <Input icon={"search"} size="sm" placeholder="搜索"/>
   <Input defaultValue={"prend text"} prepend={"https://"} size="lg" placeholder="搜索"/>
   <Input defaultValue={"google"} append={".com"}  style={{width: "300px"}}/>
   {/* <AutoComplete fetchSuggestions={handleFetch} onSelect={handleSelect}/> */}
   {/* 上传 */}
   <div>
     <input type="file" name="myFile" onChange={handleFileChange} />
   </div>
    </div>
  );
}

export default App;
