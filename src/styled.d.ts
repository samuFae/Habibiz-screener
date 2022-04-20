// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {

  export interface IThemeColors {
    primary: string;
    secondary: string;
    black: string;
    blue: string;
    white: string;
    gray: string;
    lightBlue: string;
  }

  export interface IThemeFontType {
    bold: string,
    regular: string,
    lt: string,
    demi: string
    medium: string
  }

  export interface DefaultTheme {
    colors: IThemeColors
    padding: {
      default: string
    },
    fonts: {
      avenir: IThemeFontType
    }
  }
}