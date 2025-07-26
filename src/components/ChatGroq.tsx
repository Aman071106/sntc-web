import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User,
  Loader2,
  Sparkles
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const ChatGroq = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant for the SnTC website. I can help you with information about our clubs, projects, events, and more. How can I assist you today?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate API call to Groq
      const response = await simulateGroqAPI(input.trim());
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.",
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateGroqAPI = async (userInput: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const input = userInput.toLowerCase();
    
    // Website context for Groq
    const websiteContext = `
    This is the SnTC (Science and Technology Council) website for IIT Mandi. 
    
    Key Information:
    - Clubs: Programming Club, STAC (Space Technology), Robotronics Club, Yantrik Club, KBG (Bioengineering), GDG (Google Developers), SAE (Automotive), Nirmaan Club
    - Cells: SAIC (Cybersecurity), CG2D (Game Development), E-Cell (Entrepreneurship), Heuristics (AI/ML)
    - Projects: Mars Rover Project, SAE Efficycle, Wall Climber Robot, Formula Bharat, IN-SPACE CANSAT
    - Events: Utkarsh (March 15, 2025), Xpecto (October 20-22, 2025), Inter-IIT Bootcamp (July 10-15, 2025)
    - Location: IIT Mandi Campus
    - Website: sntc.iitmandi.co.in
    `;

    // Simple response logic based on keywords
    if (input.includes('club') || input.includes('clubs')) {
      return "SnTC has 8 main clubs: Programming Club, STAC (Space Technology), Robotronics Club, Yantrik Club, KBG (Bioengineering), GDG (Google Developers), SAE (Automotive), and Nirmaan Club. We also have 4 specialized cells: SAIC (Cybersecurity), CG2D (Game Development), E-Cell (Entrepreneurship), and Heuristics (AI/ML). Each club focuses on different technical domains and offers various activities, workshops, and competitions.";
    }
    
    if (input.includes('project') || input.includes('projects')) {
      return "Our current active projects include: 1) Mars Rover Project (Team Deimos) for University Rover Challenge, 2) SAE Efficycle '24 for energy-efficient vehicle design, 3) Wall Climber Robot using vacuum technology, 4) Formula Bharat for racing competitions, and 5) IN-SPACE CANSAT for satellite launch missions. These projects provide hands-on experience in robotics, automotive engineering, and space technology.";
    }
    
    if (input.includes('event') || input.includes('events')) {
      return "Upcoming events include: 1) Utkarsh (March 15, 2025) - our annual intra-college tech fest, 2) Xpecto (October 20-22, 2025) - premier inter-college tech fest, and 3) Inter-IIT Bootcamp (July 10-15, 2025) - intensive learning program. Registration links are available on our website sntc.iitmandi.co.in";
    }
    
    if (input.includes('register') || input.includes('registration')) {
      return "You can register for events and join clubs through our website sntc.iitmandi.co.in. For specific event registrations, check the events section on our website. Club memberships are typically open at the beginning of each semester.";
    }
    
    if (input.includes('contact') || input.includes('email')) {
      return "For general inquiries, you can reach SnTC through our website sntc.iitmandi.co.in. For specific club or project information, you can contact the respective club coordinators or project leads. The Technical Secretary is Aryan Singh.";
    }
    
    if (input.includes('location') || input.includes('where')) {
      return "SnTC is located at IIT Mandi campus. Our activities take place in various labs and facilities across the campus. The main SnTC office is in the academic block.";
    }
    
    if (input.includes('help') || input.includes('what can you do')) {
      return "I can help you with information about SnTC clubs, projects, events, registration processes, contact details, and general inquiries about IIT Mandi's technical community. Just ask me anything about SnTC!";
    }

    return "I'm here to help you with information about SnTC (Science and Technology Council) at IIT Mandi. You can ask me about our clubs, projects, events, registration, or any other general inquiries. What would you like to know?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        title="Chat with AI Assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 z-[300] bg-black/50 flex items-end justify-end p-4">
          <Card className="w-96 h-[500px] bg-card/95 backdrop-blur-md border-2 border-primary/20 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">SnTC Assistant</h3>
                  <p className="text-xs text-muted-foreground">Powered by Groq AI</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.role === 'assistant' && (
                        <Bot className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      {message.role === 'user' && (
                        <User className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-primary" />
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about SnTC..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  size="sm"
                  className="bg-primary text-primary-foreground hover:opacity-90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Powered by Groq AI • Ask about clubs, projects, events
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatGroq; 