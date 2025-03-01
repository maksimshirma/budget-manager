declare module '*.module.scss' {
  const classNames: {
    [className: string]: string;
  };
  export = classNames;
}

declare module '*.png';

declare module '*.jpg';

declare module '*.jpeg';

declare module '*.svg' {
  const svg: React.FC<React.SVGProps<SVGElement>>;
  export default svg;
}
