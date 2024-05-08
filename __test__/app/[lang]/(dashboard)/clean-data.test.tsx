import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import '@testing-library/jest-dom/extend-expect';
import ReportsCleaner from '@/app/[lang]/(dashboard)/common/components/reports/ReportsCleaner';

describe('dashboard page', () => {
  it('should render properly', () => {
    render(<ReportsCleaner />);

    const header = screen.getByRole('heading', { level: 1 });
    const headerText = 'All reports';

    expect(header).toHaveTextContent(headerText);
    // expect(header).toBeInTheDocument();
  });
});
