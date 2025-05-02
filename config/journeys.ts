export interface Position {
  x: number;
  y: number;
}

export interface JourneyNode {
  id: string;
  type: 'email' | 'direct-mail' | 'condition' | 'text-message' | 'voice-call';
  title: string;
  position: Position;
  daysFromStart?: number;
  audience?: string;
  contentAsset?: string;
  customName?: string;
}

export interface Journey {
  id: string;
  name: string;
  nodes: JourneyNode[];
}

export const defaultJourneys: Journey[] = [
  {
    id: 'new-member-journey',
    name: 'New Member Journey',
    nodes: [
      {
        id: 'welcome-email',
        type: 'email',
        title: 'Send Email',
        position: { x: 100, y: 200 },
        daysFromStart: 0,
        audience: 'new-members',
        contentAsset: 'welcome-email'
      },
      {
        id: 'welcome-packet',
        type: 'direct-mail',
        title: 'Send Direct Mail',
        position: { x: 300, y: 200 },
        daysFromStart: 7,
        audience: 'new-members',
        contentAsset: 'welcome-packet'
      }
    ]
  }
];