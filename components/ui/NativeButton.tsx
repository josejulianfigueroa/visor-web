import React from 'react';

interface NativeButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  icon?: React.ReactNode; // ícono opcional
}

export function NativeButton({
  onClick,
  disabled = false,
  loading = false,
  loadingText = "Ingresando...",
  children,
  backgroundColor = '#3b82f6', // azul por defecto
  textColor = '#fff',           // blanco por defecto
  icon,
}: NativeButtonProps) {
  return (
    <button
      key={disabled ? "disabled" : "enabled"}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 16px',
        borderRadius: 6,
        backgroundColor: disabled ? '#a5b4fc' : backgroundColor,
        opacity: disabled ? 0.6 : 1,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: textColor,
        fontWeight: 600,
        fontSize: 14,
        width: '100%'
      }}
    >
      {loading ? (
        <>
          <span
            className="spinner"
            style={{ 
              width: 16, height: 16, border: `2px solid ${textColor}`, 
              borderTop: `2px solid transparent`, borderRadius: '50%', 
              marginRight: 8, animation: 'spin 1s linear infinite'
            }}
          />
          <span>{loadingText}</span>
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {icon && <div style={{ marginRight: 10 }}>{icon}</div>}
          <span>{children}</span>
        </div>
      )}

      {/* Spinner keyframes */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </button>
  );
}
