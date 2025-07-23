import React, { useState } from 'react';
import styles from './styles.module.css';

interface ColorPaletteProps {
  colors: string[];
  showLabels?: boolean;
  className?: string;
}

export default function ColorPalette({
  colors,
  showLabels = true,
  className,
}: ColorPaletteProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleColorClick = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Erro ao copiar cor:', err);
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = color;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    }
  };

  return (
    <div className={`${styles.colorPalette} ${className || ''}`}>
      {colors.map((color, index) => (
        <div key={index} className={styles.colorItem}>
          <div
            className={`${styles.colorBlock} ${copiedColor === color ? styles.copied : ''}`}
            style={{ backgroundColor: color }}
            title={`Clique para copiar ${color}`}
            onClick={() => handleColorClick(color)}
          />
          {showLabels && (
            <span
              className={`${styles.colorLabel} ${copiedColor === color ? styles.copied : ''}`}
              onClick={() => handleColorClick(color)}
            >
              {copiedColor === color ? 'Copiado!' : color}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
