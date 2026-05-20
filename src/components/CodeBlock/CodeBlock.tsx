import React, { useState, useEffect } from 'react';
import { Check, Copy, Pencil, Eye } from 'lucide-react';
import type { CodeBlockProps } from './CodeBlock.types';
import './CodeBlock.css';

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code: initialCode,
  language,
  showLineNumbers = false,
  showCopyButton = true,
  label,
  variant = 'dark',
  isEditable = false,
  onCodeChange,
  className = '',
  ...props
}) => {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const lines = code.trim().split('\n');
  const hasHeader = !!(label || language || isEditable || (showCopyButton && (label || language)));

  const containerClasses = [
    'vega-code-block',
    `vega-code-block--${variant}`,
    hasHeader ? 'vega-code-block--with-header' : '',
    isEditing ? 'vega-code-block--editing' : '',
    className,
  ].filter(Boolean).join(' ');

  const copyButton = showCopyButton && (
    <button
      type="button"
      className={`vega-code-block__button vega-code-block__copy ${copied ? 'vega-code-block__copy--success' : ''}`}
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : 'Copy code'}
      title={copied ? 'Copied!' : 'Copy code'}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );

  const editToggleButton = isEditable && (
    <button
      type="button"
      className="vega-code-block__button vega-code-block__edit-toggle"
      onClick={() => setIsEditing(!isEditing)}
      aria-label={isEditing ? 'Show preview' : 'Edit code'}
      title={isEditing ? 'Show preview' : 'Edit code'}
    >
      {isEditing ? <Eye size={16} /> : <Pencil size={16} />}
    </button>
  );

  return (
    <div className={containerClasses}>
      {hasHeader && (
        <div className="vega-code-block__header">
          <div className="vega-code-block__header-left">
            {label && <span className="vega-code-block__label">{label}</span>}
            {label && language && <span style={{ margin: '0 0.5rem', opacity: 0.3 }}>|</span>}
            {language && <span className="vega-code-block__language">{language}</span>}
          </div>
          <div className="vega-code-block__header-right" style={{ display: 'flex', gap: '0.5rem' }}>
            {editToggleButton}
            {copyButton}
          </div>
        </div>
      )}

      {!hasHeader && (
        <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
          {editToggleButton}
          {copyButton}
        </div>
      )}

      {isEditing ? (
        <textarea
          className="vega-code-block__textarea"
          value={code}
          onChange={handleTextareaChange}
          placeholder="Enter code here..."
          spellCheck={false}
          rows={Math.max(lines.length, 3)}
        />
      ) : (
        <pre className="vega-code-block__content" {...props}>
          <code>
            {showLineNumbers ? (
              lines.map((line, index) => (
                <span key={index} className="vega-code-block__line">
                  <span className="vega-code-block__line-number">{index + 1}</span>
                  <span className="vega-code-block__line-content">{line}</span>
                </span>
              ))
            ) : (
              code.trim()
            )}
          </code>
        </pre>
      )}
    </div>
  );
};

CodeBlock.displayName = 'CodeBlock';
