import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Copy, RefreshCw, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

interface AIAssistantProps {
  section: string;
  currentContent?: string;
  onSuggestionApply: (suggestion: string) => void;
}

const AIAssistant = ({ section, currentContent, onSuggestionApply }: AIAssistantProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [customPrompt, setCustomPrompt] = useState('');

  // Mock AI suggestions - In a real app, this would call an AI API
  const generateSuggestions = async (prompt?: string) => {
    setIsGenerating(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let mockSuggestions: string[] = [];
    
    switch (section) {
      case 'summary':
        mockSuggestions = [
          'Experienced software engineer with 5+ years developing scalable web applications using React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and delivering high-quality solutions that improve user experience and business outcomes.',
          'Results-driven professional with expertise in full-stack development and agile methodologies. Passionate about creating innovative solutions and mentoring junior developers. Strong background in system architecture and performance optimization.',
          'Dynamic technology leader with a passion for building robust, user-centric applications. Skilled in modern JavaScript frameworks, cloud infrastructure, and DevOps practices. Committed to continuous learning and driving technical excellence.'
        ];
        break;
      case 'experience':
        mockSuggestions = [
          'Led development of customer-facing web application serving 100K+ users, resulting in 25% increase in user engagement',
          'Implemented automated testing pipeline reducing deployment time by 40% and improving code quality',
          'Collaborated with product team to design and develop new features, increasing customer satisfaction by 30%',
          'Mentored 3 junior developers and established coding standards that improved team productivity by 20%'
        ];
        break;
      case 'skills':
        mockSuggestions = [
          'JavaScript, TypeScript, React, Node.js, Python, AWS, Docker, Kubernetes',
          'Frontend: React, Vue.js, Angular, HTML5, CSS3, Sass, Tailwind CSS',
          'Backend: Node.js, Express, Python, Django, PostgreSQL, MongoDB, Redis',
          'DevOps: AWS, Docker, Kubernetes, CI/CD, Jenkins, GitHub Actions'
        ];
        break;
      default:
        mockSuggestions = [
          'Professional and impactful content suggestion for your resume',
          'Industry-specific terminology and keywords to enhance your profile',
          'Action-oriented phrases that highlight your achievements and skills'
        ];
    }
    
    if (prompt) {
      mockSuggestions = [
        `Custom suggestion based on: "${prompt}" - Professional content tailored to your specific requirements`,
        `Enhanced version incorporating your request: "${prompt}" with industry best practices`,
        `Optimized content addressing: "${prompt}" with ATS-friendly keywords and formatting`
      ];
    }
    
    setSuggestions(mockSuggestions);
    setIsGenerating(false);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const handleApply = (suggestion: string) => {
    onSuggestionApply(suggestion);
    toast.success('Suggestion applied');
  };

  const handleCustomGenerate = () => {
    if (!customPrompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }
    generateSuggestions(customPrompt);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          AI Assistant
          <Badge variant="secondary" className="ml-auto">Beta</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Generate */}
        <div className="space-y-2">
          <Button 
            onClick={() => generateSuggestions()} 
            disabled={isGenerating}
            className="w-full gap-2"
          >
            {isGenerating ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="h-4 w-4" />
            )}
            {isGenerating ? 'Generating...' : `Generate ${section} suggestions`}
          </Button>
        </div>

        {/* Custom Prompt */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Custom Request</label>
          <div className="flex gap-2">
            <Textarea
              placeholder={`Describe what you want for your ${section}...`}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="flex-1"
              rows={2}
            />
            <Button 
              onClick={handleCustomGenerate}
              disabled={isGenerating || !customPrompt.trim()}
              size="sm"
              className="self-end"
            >
              Generate
            </Button>
          </div>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">AI Suggestions</h4>
            {suggestions.map((suggestion, index) => (
              <Card key={index} className="p-3 bg-muted/30">
                <p className="text-sm mb-3">{suggestion}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(suggestion)}
                    className="gap-1"
                  >
                    <Copy className="h-3 w-3" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleApply(suggestion)}
                    className="gap-1"
                  >
                    <Wand2 className="h-3 w-3" />
                    Apply
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Tips */}
        <div className="text-xs text-muted-foreground p-3 bg-muted/20 rounded-md">
          <p className="font-medium mb-1">💡 Tips for better suggestions:</p>
          <ul className="space-y-1">
            <li>• Be specific about your role and industry</li>
            <li>• Mention key achievements or metrics</li>
            <li>• Include relevant technologies or skills</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;