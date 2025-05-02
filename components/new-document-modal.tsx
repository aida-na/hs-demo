"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SMART_COHORTS, CONTENT_TYPE_GUIDELINES, loadGuidelines } from '@/config/content-assets';
import { generateContent } from '@/lib/openai';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface NewDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContentGenerated: (content: string) => void;
}

export function NewDocumentModal({ isOpen, onClose, onContentGenerated }: NewDocumentModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCohort, setSelectedCohort] = useState('');
  const [contentType, setContentType] = useState<'email' | 'direct-mail'>('email');
  const [modelType, setModelType] = useState<'basic' | 'reasoning'>('basic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [guidelines, setGuidelines] = useState({ brand: '', compliance: '' });

  useEffect(() => {
    if (isOpen) {
      const savedGuidelines = loadGuidelines();
      setGuidelines(savedGuidelines);
    }
  }, [isOpen]);

  const handleCreate = async () => {
    if (!selectedCohort) {
      const content = `# ${title}\n\n${description}`;
      onContentGenerated(content);
      onClose();
      setTitle('');
      setDescription('');
      return;
    }

    try {
      setIsGenerating(true);
      const cohort = SMART_COHORTS.find(c => c.id === selectedCohort);
      
      if (!cohort) throw new Error('Cohort not found');

      const generatedContent = await generateContent(
        cohort.name,
        cohort.description,
        guidelines.brand,
        guidelines.compliance,
        contentType,
        CONTENT_TYPE_GUIDELINES[contentType],
        modelType
      );

      onContentGenerated(generatedContent);
      onClose();
      setTitle('');
      setDescription('');
      setSelectedCohort('');
      setContentType('email');
      setModelType('basic');
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Select value={selectedCohort} onValueChange={setSelectedCohort}>
              <SelectTrigger>
                <SelectValue placeholder="Select a cohort for AI generation (optional)" />
              </SelectTrigger>
              <SelectContent>
                {SMART_COHORTS.map((cohort) => (
                  <SelectItem key={cohort.id} value={cohort.id}>
                    {cohort.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Content Type</Label>
            <RadioGroup
              value={contentType}
              onValueChange={(value: 'email' | 'direct-mail') => setContentType(value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="direct-mail" id="direct-mail" />
                <Label htmlFor="direct-mail">Direct Mail</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>AI Model</Label>
            <div className="grid grid-cols-2 gap-4">
              <Card 
                className={`p-3 cursor-pointer transition-colors ${
                  modelType === 'basic' ? 'bg-primary/10 border-primary' : ''
                }`}
                onClick={() => setModelType('basic')}
              >
                <RadioGroup value={modelType} onValueChange={(value: 'basic' | 'reasoning') => setModelType(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="basic" id="basic" />
                    <div>
                      <Label htmlFor="basic" className="text-sm font-medium">Base Model</Label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Standard content generation with brand and compliance guidelines
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </Card>
              <Card 
                className={`p-3 cursor-pointer transition-colors ${
                  modelType === 'reasoning' ? 'bg-primary/10 border-primary' : ''
                }`}
                onClick={() => setModelType('reasoning')}
              >
                <RadioGroup value={modelType} onValueChange={(value: 'basic' | 'reasoning') => setModelType(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reasoning" id="reasoning" />
                    <div>
                      <Label htmlFor="reasoning" className="text-sm font-medium">Reasoning Model</Label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Advanced analysis and strategic content development
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </Card>
            </div>
          </div>

          <div className="space-y-2">
            <Input
              placeholder="Document Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Document Description or Manual Content"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreate} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : selectedCohort ? 'Generate with AI' : 'Create'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}