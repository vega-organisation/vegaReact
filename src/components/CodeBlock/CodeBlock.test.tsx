import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CodeBlock } from './CodeBlock';

// Mock clipboard API
const mockClipboard = {
  writeText: vi.fn().mockImplementation(() => Promise.resolve()),
};

Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
  configurable: true,
});

describe('CodeBlock', () => {
  const sampleCode = 'console.log("hello");';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders code correctly', () => {
    render(<CodeBlock code={sampleCode} />);
    expect(screen.getByText('console.log("hello");')).toBeInTheDocument();
  });

  it('renders language and label when provided', () => {
    render(<CodeBlock code={sampleCode} language="js" label="test.js" />);
    expect(screen.getByText('js')).toBeInTheDocument();
    expect(screen.getByText('test.js')).toBeInTheDocument();
  });

  it('shows copy button by default', () => {
    render(<CodeBlock code={sampleCode} />);
    expect(screen.getByRole('button', { name: /copy code/i })).toBeInTheDocument();
  });

  it('hides copy button when showCopyButton is false', () => {
    render(<CodeBlock code={sampleCode} showCopyButton={false} />);
    expect(screen.queryByRole('button', { name: /copy code/i })).not.toBeInTheDocument();
  });

  it('copies code to clipboard when clicking copy button', async () => {
    render(<CodeBlock code={sampleCode} />);
    const copyBtn = screen.getByRole('button', { name: /copy code/i });
    
    fireEvent.click(copyBtn);
    
    expect(mockClipboard.writeText).toHaveBeenCalledWith(sampleCode);
    
    // Check if icon changes (using aria-label or title)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument();
    });
  });

  it('renders line numbers when showLineNumbers is true', () => {
    const multiLineCode = 'line 1\nline 2';
    render(<CodeBlock code={multiLineCode} showLineNumbers />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('line 1')).toBeInTheDocument();
    expect(screen.getByText('line 2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CodeBlock code={sampleCode} className="custom-class" />);
    const container = screen.getByText('console.log("hello");').closest('.vega-code-block');
    expect(container).toHaveClass('custom-class');
  });

  it('shows edit button when isEditable is true', () => {
    render(<CodeBlock code={sampleCode} isEditable />);
    expect(screen.getByRole('button', { name: /edit code/i })).toBeInTheDocument();
  });

  it('switches to textarea when clicking edit button', () => {
    render(<CodeBlock code={sampleCode} isEditable />);
    const editBtn = screen.getByRole('button', { name: /edit code/i });
    
    fireEvent.click(editBtn);
    
    const textarea = screen.getByPlaceholderText(/enter code here/i);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue(sampleCode);
  });

  it('calls onCodeChange when editing', () => {
    const handleChange = vi.fn();
    render(<CodeBlock code={sampleCode} isEditable onCodeChange={handleChange} />);
    
    fireEvent.click(screen.getByRole('button', { name: /edit code/i }));
    const textarea = screen.getByPlaceholderText(/enter code here/i);
    
    fireEvent.change(textarea, { target: { value: 'new code' } });
    
    expect(handleChange).toHaveBeenCalledWith('new code');
    expect(textarea).toHaveValue('new code');
  });

  it('switches back to preview when clicking eye button', () => {
    render(<CodeBlock code={sampleCode} isEditable />);
    
    fireEvent.click(screen.getByRole('button', { name: /edit code/i }));
    expect(screen.getByPlaceholderText(/enter code here/i)).toBeInTheDocument();
    
    fireEvent.click(screen.getByRole('button', { name: /show preview/i }));
    expect(screen.queryByPlaceholderText(/enter code here/i)).not.toBeInTheDocument();
    expect(screen.getByText(sampleCode)).toBeInTheDocument();
  });
});
