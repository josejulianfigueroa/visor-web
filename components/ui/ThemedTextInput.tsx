import React, { useRef, useState, CSSProperties } from 'react';

interface ThemedTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string; // nombre del icono, si usaras iconos de alguna librería JS
  colorFont?: string;
  style?: CSSProperties;
}

export default function ThemedTextInput({
  icon,
  colorFont,
  style,
  ...rest
}: ThemedTextInputProps) {
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const borderColor = isActive ? (colorFont || 'white') : '#ccc';

  return (
    <div
      style={{
        borderWidth: 1,
        borderColor,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
      onMouseDown={() => inputRef.current?.focus()}
    >
      {icon && (
        <span
          style={{
            marginRight: 10,
            fontSize: 24,
            display: 'inline-block',
          }}
        >
          {icon}
        </span>
      )}

      <input
        ref={inputRef}
        style={{
          border: 'none',
          outline: 'none',
          flex: 1,
          color: 'white',
          
          fontSize: 16,
          fontWeight: 'bold',
        }}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        {...rest}
      />
    </div>
  );
}
