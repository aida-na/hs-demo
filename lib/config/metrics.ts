export interface Metric {
  metric_name: string
  value: string
  description: string
}

export const metrics: Metric[] = [
  {
    metric_name: 'members_processed',
    value: '45k',
    description: 'Number of members processed'
  },
  {
    metric_name: 'fixes_applied',
    value: '78k',
    description: 'Fixes applied to member data for usability'
  },
  {
    metric_name: 'processing_days',
    value: '3 Days',
    description: 'From receipt of data to returning score + Smart Cohorts'
  },
  {
    metric_name: 'data_sources',
    value: '15',
    description: 'Number of disconnected data sources'
  },
  {
    metric_name: 'rows_reconciled',
    value: '>10M',
    description: 'Rows of data reconciled'
  },
  {
    metric_name: 'gender_zip',
    value: '>77k',
    description: 'Gender & Zip Code reconciled across 15 sources'
  },
  {
    metric_name: 'last_run_date',
    value: 'March 16, 2025',
    description: 'Date of the most recent HDE processing run'
  }
]