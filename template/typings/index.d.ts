export interface DefaultTheme {}

declare namespace React {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: import('react').CSSProperties
  }
}

declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>
}

declare module 'react' {
  interface DOMAttributes<T> {
    css?: InterpolationWithTheme<DefaultTheme>
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      css?: InterpolationWithTheme<DefaultTheme>
    }
  }
}
