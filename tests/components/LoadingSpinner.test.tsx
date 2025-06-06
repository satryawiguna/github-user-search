import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroUIProvider } from '@heroui/react';
import { LoadingSpinner } from '../../src/components/LoadingSpinner';

const renderWithProvider = (component: React.ReactElement) => {
  return render(<HeroUIProvider>component}</HeroUIProvider>);
};

describe('LoadingSpinner', () => {
  it('should render loading spinner with default label', () => {
    renderWithProvider(<LoadingSpinner />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render with custom label', () => {
    renderWithProvider(<LoadingSpinner label="Please wait" />);
    
    expect(screen.getByText('Please wait')).toBeInTheDocument();
  });

  it('should render without label when label is empty', () => {
    renderWithProvider(<LoadingSpinner label="" />);
    
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
