declare module '@mf/*' {
  const content: any;

  export default content;
}

declare module '*.svg' {
  import type React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };
  export default ReactComponent;
}
