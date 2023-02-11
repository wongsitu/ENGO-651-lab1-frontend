import * as React from 'react';
import { IconProps } from './types';

const Star: React.FC<IconProps> = ({
  className,
  color: colorProp = '#181B32',
  size = 32,
  ignoreColor,
  animation = '',
}) => {
  const color = !ignoreColor ? colorProp : undefined;

  return (
    <svg
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animation}`}
    >
      <path
        d="M13.368 16.028a.836.836 0 01-.4-.1l-2.956-1.556-2.956 1.556a.866.866 0 01-.908-.064.847.847 0 01-.34-.844l.564-3.292L3.98 9.396a.864.864 0 01.476-1.472l3.304-.48 1.48-2.996a.851.851 0 01.772-.48c.332 0 .628.184.772.48l1.48 2.996 3.304.48a.852.852 0 01.696.588.848.848 0 01-.22.884l-2.392 2.332.564 3.292a.857.857 0 01-.344.844.826.826 0 01-.504.164zM4.9 8.884l2.232 2.172c.204.2.296.484.248.764l-.528 3.072 2.756-1.452a.866.866 0 01.804 0l2.756 1.448-.528-3.068a.863.863 0 01.248-.764L15.12 8.88l-3.084-.448a.856.856 0 01-.648-.472l-1.38-2.792-1.38 2.796a.873.873 0 01-.648.472l-3.08.448zm7.396-1.368h.008-.008zM10.148 4.9c-.004 0-.004 0 0 0z"
        fill={color}
      />
    </svg>
  );
};

export default Star;
