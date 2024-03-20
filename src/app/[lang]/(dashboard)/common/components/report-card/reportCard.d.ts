enum Category {
  Uncategorized = 'Uncategorized',
  Cleaned = 'Cleaned',
  Raw = 'Raw',
  Dangerous = 'Dangerous',
}

export type ReportCardProps = {
  title: string;
  date: string;
  reportType?: Category;
};
