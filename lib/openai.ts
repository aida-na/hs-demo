import OpenAI from 'openai';
import { OPENAI_CONFIG } from '@/config/content-assets';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateContent(
  cohortName: string,
  cohortDescription: string,
  brandGuidelines: string,
  complianceGuidelines: string,
  contentType: 'email' | 'direct-mail' = 'email',
  contentTypeGuidelines: string,
  modelType: 'basic' | 'reasoning' = 'basic'
): Promise<string> {
  try {
    const config = OPENAI_CONFIG[modelType];
    const userMessage = config.userMessageTemplate
      .replace(/{cohortName}/g, cohortName)
      .replace(/{cohortDescription}/g, cohortDescription)
      .replace(/{brandGuidelines}/g, brandGuidelines)
      .replace(/{complianceGuidelines}/g, complianceGuidelines)
      .replace(/{contentType}/g, contentType)
      .replace(/{contentTypeGuidelines}/g, contentTypeGuidelines);

    const response = await openai.chat.completions.create({
      model: config.model,
      messages: [
        { role: 'system', content: config.systemMessage },
        { role: 'user', content: userMessage }
      ],
      temperature: modelType === 'basic' ? 0.7 : 0.8,
      max_tokens: modelType === 'basic' ? 1000 : 2000
    });

    return response.choices[0]?.message?.content || 'No content generated';
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content');
  }
}