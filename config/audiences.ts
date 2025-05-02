export interface Audience {
  id: string;
  name: string;
  description: string;
}

export const audiences: Audience[] = [
  {
    id: 'all-members',
    name: 'All Members',
    description: 'All active members in the system'
  },
  {
    id: 'high-risk',
    name: 'High Risk Members',
    description: 'Members identified as high risk'
  },
  {
    id: 'new-members',
    name: 'New Members',
    description: 'Members enrolled within the last 30 days'
  },
  {
    id: 'chronic-condition',
    name: 'Chronic Condition',
    description: 'Members with chronic conditions'
  }
];