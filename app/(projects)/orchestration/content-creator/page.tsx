'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, FileText, Save, Plus, File, Bold, Italic, Underline, Trash2, ListOrdered, List, Heading1, Heading2, Link as LinkIcon } from "lucide-react";
import { marked } from 'marked';
import { NewDocumentModal } from '@/components/new-document-modal';
import { loadGuidelines } from '@/lib/config';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null);
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const [isNewDocumentOpen, setIsNewDocumentOpen] = useState(false);
  const [guidelines, setGuidelines] = useState({ brand: '', compliance: '' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);

  useEffect(() => {
    const savedDocs = localStorage.getItem('documents');
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    }
    setGuidelines(loadGuidelines());
  }, []);

  const handleSave = () => {
    if (!title.trim()) return;

    const newDoc: Document = {
      id: selectedDoc || Date.now().toString(),
      title: title.trim(),
      content,
      createdAt: new Date().toISOString(),
    };

    const updatedDocs = selectedDoc
      ? documents.map(doc => doc.id === selectedDoc ? newDoc : doc)
      : [newDoc, ...documents];

    setDocuments(updatedDocs);
    localStorage.setItem('documents', JSON.stringify(updatedDocs));
    
    // Save as markdown file
    const markdown = `# ${title}\n\n${content}`;
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleNewDocument = () => {
    setIsNewDocumentOpen(true);
  };

  const handleContentGenerated = (generatedContent: string) => {
    setSelectedDoc(null);
    setTitle('Generated Content');
    setContent(generatedContent);
  };

  const loadDocument = (doc: Document) => {
    setSelectedDoc(doc.id);
    setTitle(doc.title);
    setContent(doc.content);
  };

  const handleDeleteClick = (docId: string) => {
    setDocumentToDelete(docId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!documentToDelete) return;

    const updatedDocs = documents.filter(doc => doc.id !== documentToDelete);
    setDocuments(updatedDocs);
    localStorage.setItem('documents', JSON.stringify(updatedDocs));

    if (selectedDoc === documentToDelete) {
      setSelectedDoc(null);
      setTitle('');
      setContent('');
    }

    setDeleteDialogOpen(false);
    setDocumentToDelete(null);
  };

  const insertText = (before: string, after: string = '') => {
    if (!textareaRef) return;

    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;
    const selectedText = content.substring(start, end);
    const newContent = content.substring(0, start) + 
                      before + selectedText + after + 
                      content.substring(end);
    
    setContent(newContent);
    
    setTimeout(() => {
      textareaRef.focus();
      textareaRef.setSelectionRange(
        start + before.length,
        end + before.length
      );
    }, 0);
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <img src="/radiant-graph-logo.png" alt="Radiant Graph" className="h-8" />
        </div>
        <div className="p-4">
          <Button onClick={handleNewDocument} className="w-full flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Document
          </Button>
        </div>
        <ScrollArea className="flex-1 px-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`w-full text-left p-3 rounded-lg mb-2 flex items-center gap-2 hover:bg-muted ${
                selectedDoc === doc.id ? 'bg-muted' : ''
              }`}
            >
              <button
                onClick={() => loadDocument(doc)}
                className="flex-1 flex items-center gap-2"
              >
                <File className="w-4 h-4" />
                <div className="truncate">
                  <div className="font-medium truncate">{doc.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(doc.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </ScrollArea>
      </div>

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title..."
              className="text-2xl font-semibold bg-transparent border-none focus:outline-none focus:ring-0 w-full"
            />
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsGuidelinesOpen(true)}
              >
                Guidelines
              </Button>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save
              </Button>
            </div>
          </div>

          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-wrap gap-2 mb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => insertText('**', '**')}
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => insertText('*', '*')}
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => insertText('__', '__')}
                title="Underline"
              >
                <Underline className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => insertText('# ', '')}
                title="Heading 1"
              >
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => insertText('## ', '')}
                title="Heading 2"
              >
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => insertText('1. ', '\n')}
                title="Ordered List"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => insertText('- ', '\n')}
                title="Unordered List"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => insertText('[', '](url)')}
                title="Link"
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => insertText('\n\n')}
                className="px-3"
              >
                New Paragraph
              </Button>
            </div>

            <Card className="min-h-[500px]">
              <TabsContent value="edit" className="p-0">
                <textarea
                  ref={setTextareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your content here..."
                  className="w-full h-[500px] p-6 bg-white resize-none focus:outline-none font-mono"
                />
              </TabsContent>

              <TabsContent value="preview" className="markdown-preview">
                <div 
                  className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto p-6 bg-white"

                />
              </TabsContent>
            </Card>
          </Tabs>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{content.length} characters</span>
            <span>{content.split(/\s+/).filter(Boolean).length} words</span>
          </div>
        </div>
      </main>


      <NewDocumentModal
        isOpen={isNewDocumentOpen}
        onClose={() => setIsNewDocumentOpen(false)}
        onContentGenerated={handleContentGenerated}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this document? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}