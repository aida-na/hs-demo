export interface EmailBlock {
    id: string
    type: string
    content: any
    personalization: {
      [segmentId: string]: any
    }
  }
  
  export interface UserSegment {
    id: string
    name: string
    description: string
  }
  