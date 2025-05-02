export interface ContentAsset {
  id: string;
  name: string;
  description: string;
  type: 'email' | 'direct-mail';
}

export interface SmartCohort {
  id: string;
  name: string;
  description: string;
}

export interface Guidelines {
  brand: string;
  compliance: string;
}

export interface OpenAIPromptConfig {
  model: string;
  systemMessage: string;
  userMessageTemplate: string;
}

export const OPENAI_CONFIG = {
  basic: {
    model: "gpt-3.5-turbo",
    systemMessage: "You are a marketing content specialist who creates content that strictly adheres to brand guidelines and compliance requirements.",
    userMessageTemplate: `Generate {contentType} content for the following cohort: {cohortName}
Cohort description: {cohortDescription}

Content Type Guidelines:
{contentTypeGuidelines}

Brand Guidelines:
{brandGuidelines}

Compliance Requirements:
{complianceGuidelines}

Please provide {contentType} content that is specifically tailored for this audience segment while strictly following all guidelines and requirements provided above.

For email content, include:
- Subject line
- Preview text
- Main body content
- Call to action

For direct mail content, include:
- Headline
- Main body content
- Call to action
- Any special instructions for design elements`
  },
  reasoning: {
    model: "gpt-4",
    systemMessage: "You are an expert healthcare marketing strategist with deep understanding of medical communications and behavioral psychology. Create content that is evidence-based, empathetic, and strategically aligned with healthcare objectives while adhering to all guidelines.",
    userMessageTemplate: `Generate {contentType} content for the following cohort: {cohortName}
Cohort description: {cohortDescription}

Content Type Guidelines:
{contentTypeGuidelines}

Brand Guidelines:
{brandGuidelines}

Compliance Requirements:
{complianceGuidelines}

Please follow this structured approach:

1. Audience Analysis
- Consider the specific needs and challenges of this cohort
- Identify key motivators and potential barriers
- Determine optimal communication style and tone

2. Content Strategy
- Define primary and secondary messaging objectives
- Select key talking points that resonate with the audience
- Plan the content structure for maximum impact

3. Content Development
For {contentType}, create:
${'{contentType}' === 'email' ? `- Strategic subject line (under 50 characters)
- Engaging preview text
- Personalized main content
- Clear, motivating call to action` : `- Attention-grabbing headline
- Persuasive main content
- Strategic call to action
- Design element recommendations`}

4. Compliance Check
- Ensure all content aligns with provided guidelines
- Verify medical accuracy and regulatory compliance
- Confirm appropriate disclaimers are included

Please provide the final content with a brief explanation of your strategic choices.`
  }
};

export const CONTENT_TYPE_GUIDELINES = {
  email: `
- Keep subject lines under 50 characters
- Include a clear call to action
- Use personalization where appropriate
- Ensure mobile-friendly content
- Include preview text
- Keep paragraphs short and scannable`,
  'direct-mail': `
- Use attention-grabbing headlines
- Include clear contact information
- Maintain consistent branding
- Use white space effectively
- Include a compelling offer
- Make the call to action prominent`
};

export const SMART_COHORTS: SmartCohort[] = [
  {
    id: 'type-2-diabetes',
    name: 'Type 2 Diabetes Members',
    description: 'Members diagnosed with Type 2 Diabetes requiring specialized care and management'
  },
  {
    id: 'pre-diabetes',
    name: 'Pre-Diabetes Members',
    description: 'Members identified with pre-diabetes conditions who could benefit from preventive care'
  },
  {
    id: 'rural-markets',
    name: 'Rural Markets',
    description: 'Members located in rural areas with specific healthcare access needs'
  },
  {
    id: 'metformin',
    name: 'Metformin Members',
    description: 'Members currently prescribed metformin for diabetes management'
  }
];

export const loadGuidelines = (): Guidelines => {
  if (typeof window === 'undefined') return { brand: '', compliance: '' };
  
  const saved = localStorage.getItem('guidelines');
  return saved ? JSON.parse(saved) : { brand: '', compliance: '' };
};

export const saveGuidelines = (guidelines: Guidelines): void => {
  localStorage.setItem('guidelines', JSON.stringify(guidelines));
};