'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Phone } from "lucide-react";

interface JourneyWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTemplateSelect: (template: JourneyTemplate) => void;
}

export interface JourneyTemplate {
  id: string;
  name: string;
  description: string;
  steps: {
    type: 'email' | 'text-message' | 'voice-call' | 'direct-mail';
    daysFromStart: number;
  }[];
}

const journeyTemplates: JourneyTemplate[] = [
  {
    id: 'new-member',
    name: 'New Member Onboarding',
    description: 'A 4-step journey to welcome new members into your program',
    steps: [
      { type: 'email', daysFromStart: 0 },
      { type: 'text-message', daysFromStart: 2 },
      { type: 'email', daysFromStart: 5 },
      { type: 'text-message', daysFromStart: 7 }
    ]
  },
  {
    id: 'preventive-care',
    name: 'Preventive Care Reminders',
    description: 'A 3-step journey to encourage members to schedule preventive care visits',
    steps: [
      { type: 'email', daysFromStart: 0 },
      { type: 'text-message', daysFromStart: 3 },
      { type: 'voice-call', daysFromStart: 7 }
    ]
  },
  {
    id: 'medication-adherence',
    name: 'Medication Adherence',
    description: 'A 5-step journey to improve compliance with prescribed medications',
    steps: [
      { type: 'email', daysFromStart: 0 },
      { type: 'text-message', daysFromStart: 2 },
      { type: 'direct-mail', daysFromStart: 5 },
      { type: 'text-message', daysFromStart: 7 },
      { type: 'voice-call', daysFromStart: 10 }
    ]
  }
];

export function JourneyWizardModal({ isOpen, onClose, onTemplateSelect }: JourneyWizardModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Magic Wizard</DialogTitle>
          <p className="text-muted-foreground mt-2">
            Need help creating journeys? Choose from these example templates.
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {journeyTemplates.map((template) => (
            <Card
              key={template.id}
              className="p-4 hover:bg-accent/50 cursor-pointer transition-colors"
              onClick={() => {
                onTemplateSelect(template);
                onClose();
              }}
            >
              <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
              <p className="text-muted-foreground mb-3">{template.description}</p>
              <div className="flex gap-2">
                {template.steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-muted-foreground"
                  >
                    {index > 0 && <span className="mx-1">→</span>}
                    {step.type === 'email' && <Mail className="h-4 w-4" />}
                    {step.type === 'text-message' && <MessageSquare className="h-4 w-4" />}
                    {step.type === 'voice-call' && <Phone className="h-4 w-4" />}
                    <span className="ml-1">Day {step.daysFromStart}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}