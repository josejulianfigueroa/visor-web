import React, { CSSProperties } from 'react';

export type ThemedTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'titleBlack';
  style?: CSSProperties;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  // Reemplaza useThemeColor por lógica propia o props
  const color = lightColor || darkColor || (type === 'titleBlack' ? 'white' : undefined);

  const baseStyle: CSSProperties = {
    color,
    fontSize: 16,
    lineHeight: '24px',
    ...style
  };

  const typeStyles: { [key: string]: CSSProperties } = {
    defaultSemiBold: { fontWeight: 600 },
    title: { fontWeight: 'bold', fontSize: 32, lineHeight: '32px', fontFamily: 'KanitBold, sans-serif' },
    titleBlack: { fontWeight: 'bold', fontSize: 20, lineHeight: '32px', fontFamily: 'KanitBold, sans-serif', color: 'white' },
    subtitle: { fontWeight: 'bold', fontSize: 20 },
    link: { fontSize: 16, lineHeight: '30px', color: '#0a7ea4' }
  };

  const appliedTypeStyle = typeStyles[type] || {};

  return <span style={{ ...baseStyle, ...appliedTypeStyle }} {...rest} />;
}
