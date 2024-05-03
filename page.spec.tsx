import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ReportsViewerAndAdmin from '@/app/[lang]/(dashboard)/common/components/reports/ReportsViewerAndAdmin';

describe('All Reports Page', () => {
  it('should render without crashing', () => {
    render(<ReportsViewerAndAdmin />);

    const title = screen.getByText(/All reports/);
    expect(title).toBeInTheDocument();
  });
});
