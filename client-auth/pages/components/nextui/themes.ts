import { createTheme } from "@nextui-org/react";


export const nextUILightTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      // brand colors
      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#4ADE7B',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$black',
      primaryShadow: '$green500',

      link: '#4AFE7B',
      background: '$white',
      primaryColor: '$white',

      // Attribute used for the `::selection`
      // pseudo-element
      selection: '$green700',
    },
    space: {},
    fonts: {},
  }
})
