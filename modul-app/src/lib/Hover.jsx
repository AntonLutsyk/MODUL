// Element with an extra style applied while hovered (the design's `style-hover`).
import React, { useState } from 'react';

export function Hover({ as: Tag = 'div', style, hover, onMouseEnter, onMouseLeave, ...rest }) {
  const [on, setOn] = useState(false);
  return (
    <Tag
      {...rest}
      style={on && hover ? { ...style, ...hover } : style}
      onMouseEnter={e => { setOn(true); onMouseEnter && onMouseEnter(e); }}
      onMouseLeave={e => { setOn(false); onMouseLeave && onMouseLeave(e); }}
    />
  );
}
