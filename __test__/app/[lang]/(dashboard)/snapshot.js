import { render } from '@testing-library/react'
import Page from '../app/page'
import ReportsCleaner from "@/app/[lang]/(dashboard)/common/components/reports/ReportsCleaner";
 
it('renders homepage unchanged', () => {
  const { container } = render(<ReportsCleaner />)
  expect(container).toMatchSnapshot()
})