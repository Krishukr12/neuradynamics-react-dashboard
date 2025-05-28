import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../Button';

describe('Button', () => {
  it('render with label text', () => {
    render(<Button label="testing-label"></Button>);
    expect(screen.getByText('testing-label')).toBeInTheDocument();
  });

  it('renders children correctly if passed', () => {
    render(
      <Button label="testing-label">
        <span>Child</span>
      </Button>
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
    expect(screen.queryByText('testing-label')).not.toBeInTheDocument();
  });

  it('handles click event', () => {
    const onClick = vi.fn();
    render(<Button label="Click me" onClick={onClick}></Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('arial label should be present if given', () => {
    render(<Button label="Click me" aria-label="test-aria-label"></Button>);
    expect(screen.getByLabelText('test-aria-label')).toBeInTheDocument();
  });

  it('additional classname should be applied', () => {
    render(<Button className="testing-classname"></Button>);
    expect(screen.getByRole('button')).toHaveClass('testing-classname');
  });

  it('label should be default arial label if not given', () => {
    render(<Button label="click-me"></Button>);
    expect(screen.getByLabelText('click-me')).toBeInTheDocument();
  });

  it('is disabled when `disabled` prop is true', () => {
    render(<Button label="Can't click" disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
