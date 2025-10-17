import React, { useRef, useState, CSSProperties } from 'react';

interface ThemedTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string; // nombre del icono, si usaras iconos de alguna librería JS
  style?: CSSProperties;
}

export default function ThemedTextInput({
  icon,
  style,
  ...rest
}: ThemedTextInputProps) {
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const borderColor = isActive ? '#1e357a' : '#ccc'; // color del borde al enfocar

  return (
    <div
      style={{
        borderWidth: 1,
        borderColor,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white', // fondo estático blanco
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
          backgroundColor: 'white', // fondo blanco estático
          color: 'black', // texto negro estático
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
