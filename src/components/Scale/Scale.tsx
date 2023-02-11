import { FC, useState } from 'react';
import Star from '../../icons/Star';
import { ScaleProps } from './types';

const Scale: FC<ScaleProps> = ({ value, setValue, size, disabled }) => {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
        <button
          key={i}
          type="button"
          onMouseOver={() => {
            setHoverValue(i);
          }}
          onFocus={() => {
            setHoverValue(i);
          }}
          onMouseLeave={() => {
            setHoverValue(0);
          }}
          onClick={() => {
            if (setValue) {
              setValue(i);
            }
          }}
          disabled={disabled}
        >
          <Star
            size={size}
            color={(value ? value >= i : hoverValue >= i) ? 'yellow' : 'gray'}
          />
        </button>
      ))}
    </div>
  );
};

export default Scale;
