'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon } from 'lucide-react';

export const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    'SNTC Network Terminal v2.1',
    'Type \'help\' for available commands',
    ''
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: 'Available commands:\n- help: Show this help message\n- status: Show system status\n- clubs: List all club modules\n- projects: Show active projects\n- team: Display core team\n- events: Show upcoming events\n- clear: Clear terminal screen\n',
    status: 'SNTC Network Status: OPERATIONAL\nNetwork: Connected',
    clubs: 'Active Club Modules:\n[CLUB_001] Programming Club (KP)\n[CLUB_002] STAC (Space Technology)\n[CLUB_003] Robotronics Club\n[CLUB_004] Yantrik Club\n[CLUB_005] KBG (Bioengineering)\n[CLUB_006] GDG (Google Developers)\n[CLUB_007] SAE (Automotive)\n[CLUB_008] Nirmaan Club\n\nSpecialized Cells:\n[CELL_001] SAIC (Cybersecurity)\n[CELL_002] CG2D (Game Development)\n[CELL_003] E-Cell (Entrepreneurship)\n[CELL_004] Heuristics (AI/ML)',
    projects: 'Active Projects:\n[PROJ_001] Team Deimos - Mars Rover Project (URC)\n[PROJ_002] SAE Efficycle \'24 (TADPOLE_CONFIG)\n[PROJ_003] Wall Climber Robot (VACUUM_TECH)\n[PROJ_004] Formula Bharat (RAPTOR_RACING)\n[PROJ_005] IN-SPACE CANSAT (SATELLITE_LAUNCH)',
    team: 'Core Team Members:\n[USER_001] Aryan Singh- Technical Secretary ',
                  events: 'Scheduled Events:\n[EVENT_001] Utkarsh Tech Fest - March 15, 2025\n[EVENT_002] Xpecto Premier Fest - October 20-22, 2025\n[EVENT_003] Inter-IIT Bootcamp - July 10-15, 2025',
    clear: 'CLEAR_SCREEN',
    hack: 'ACCESS DENIED!\n[WARNING] Unauthorized access attempt detected\n[INFO] Incident logged to security database\n[JOKE] Nice try though! 😄'
  };

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    
    // Add command to history
    if (trimmedCommand && commandHistory[commandHistory.length - 1] !== trimmedCommand) {
      setCommandHistory(prev => [...prev, trimmedCommand]);
      setHistoryIndex(-1);
    }

    // Display command
    addOutput(`sntc@iitmandi:~$ ${command}`);

    // Execute command
    if (commands[trimmedCommand as keyof typeof commands]) {
      if (trimmedCommand === 'clear') {
        setOutput([
          'SNTC Network Terminal v2.1',
          'Type \'help\' for available commands',
          ''
        ]);
      } else {
        const response = commands[trimmedCommand as keyof typeof commands];
        const lines = response.split('\n');
        lines.forEach(line => addOutput(line));
      }
    } else if (trimmedCommand) {
      addOutput(`Command not found: ${trimmedCommand}. Type 'help' for available commands.`);
    }

    addOutput('');
  };

  const addOutput = (text: string) => {
    setOutput(prev => [...prev, text]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard shortcut to open terminal (Ctrl+` or Cmd+`)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <>
      {/* Terminal Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        {/* Terminal Window */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-card border-2 border-primary/50 rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between p-4 bg-primary/10 border-b border-primary/20 rounded-t-lg">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-primary">SNTC_TERMINAL_v2.1</span>
            </div>
            <button 
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Content */}
          <div className="p-4 h-80 flex flex-col">
            {/* Output Area */}
            <div 
              ref={outputRef}
              className="flex-1 font-mono text-sm text-foreground overflow-y-auto mb-4 space-y-1"
            >
              {output.map((line, index) => (
                <div key={index} className="terminal-line">
                  {line}
                </div>
              ))}
            </div>

            {/* Input Line */}
            <div className="flex items-center font-mono text-sm">
              <span className="text-primary mr-2">sntc@iitmandi:~$</span>
              <input
                ref={inputRef}
                type="text"
                className="flex-1 bg-transparent text-foreground outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck="false"
              />
              <span className="w-2 h-5 bg-primary animate-pulse ml-1"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Access Button */}
      <button 
        className="fixed bottom-6 right-6 bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 hover:scale-105 backdrop-blur-sm z-40 group"
        onClick={() => setIsOpen(true)}
        title="Open Terminal (Ctrl+`)"
      >
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4" />
          <span>TERMINAL</span>
        </div>
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card border border-primary/20 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Ctrl+`
        </div>
      </button>
    </>
  );
}; 