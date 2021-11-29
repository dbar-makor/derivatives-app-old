import React, { CSSProperties } from 'react';

import icons from '../../../assets/icons';

import SvgView from './Svg.view';

interface Props {
  readonly name: keyof typeof icons;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly onClick?: () => void;
}

const Svg: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  return (
    <SvgView
      style={props.style}
      className={props.className}
      name={props.name}
      onClick={props.onClick}
    >{props.children}</SvgView>
  );
};

Svg.displayName = 'Svg';
Svg.defaultProps = {};

export default React.memo(Svg);
