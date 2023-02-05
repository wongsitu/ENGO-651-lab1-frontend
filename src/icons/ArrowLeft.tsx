import * as React from 'react';
import { IconProps } from './types';

const ArrowLeft: React.FC<IconProps> = ({
  className = '',
  color: colorProp = '#181B32',
  size = 32,
  ignoreColor,
}) => {
  const color = !ignoreColor ? colorProp : undefined;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M3.976 10.52l3.268 3.268a.73.73 0 001.036 0 .73.73 0 000-1.036l-2.016-2.016h9.24a.732.732 0 000-1.464h-9.24L8.28 7.256a.73.73 0 000-1.036.733.733 0 00-1.04 0L3.976 9.48a.734.734 0 000 1.04z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowLeft;
