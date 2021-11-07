import "../src/styles/index.scss"
import { withInfo } from "@storybook/addon-info"
import { addDecorator} from "@storybook/react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
library.add(fas)
addDecorator(withInfo)
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}