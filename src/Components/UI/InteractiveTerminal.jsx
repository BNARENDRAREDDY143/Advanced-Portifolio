import React, { useState, useRef, useEffect } from 'react';
import { soundFx } from '../../utils/audio';
import confetti from 'canvas-confetti';

const InteractiveTerminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: '✦ Cyber Terminal v3.4.0 [Initialized]' },
    { type: 'system', text: 'Type "help" to see available interactive commands or "skills" / "projects" / "hire".' }
  ]);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    soundFx.playClick();
    const newHistory = [...history, { type: 'user', text: `$ ${input}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available Commands:
  • bio          : Overview of Narendra Reddy
  • skills       : View technical & soft skill stack
  • projects     : List key featured projects
  • certs        : View certifications & credentials
  • contact      : Get email, phone, and social handles
  • stats        : Show LeetCode and academic achievements
  • matrix       : Toggle matrix digital rain mode
  • hire         : Trigger recruitment confetti
  • clear        : Clear terminal screen`
        });
        break;

      case 'bio':
        newHistory.push({
          type: 'output',
          text: `BAREDDY NARENDRA REDDY
B.Tech CSE Student @ Vignan's LARA Institute of Technology & Science (CGPA: 8.22)
Passionate Software & Full Stack Developer specializing in Python, React, SQL, and AI/ML.`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `[Core Languages]: Python, C, JavaScript (ES6+), SQL, HTML5, CSS3
[Frameworks & Tools]: React.js, Node.js, Express, Three.js, Git, Vite
[AI & ML]: Supervised Learning, Data Preprocessing, Predictive Models`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `1. AP Tourism Website (React, JS, CSS) - 100% responsive tourism platform
2. Chatbot for College Enquiries (Python, Web) - Automated 20+ query categories
3. Full Stack Social Media App (React, Node.js, SQL, Express)`
        });
        break;

      case 'certs':
        newHistory.push({
          type: 'output',
          text: `✓ Cisco: Introduction to Cyber Security
✓ AWS: Cloud Practitioner (Foundational)
✓ Udemy: Full Stack Development
✓ Infosys: Python Programming, Gen AI, Data Science`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `📧 Email: bareddynarendhareddy555@gmail.com
📱 Phone: +91 6302775072
🐙 GitHub: github.com/BNARENDRAREDDY143
💼 LinkedIn: linkedin.com/in/bareddy-narendra-reddy-338837343`
        });
        break;

      case 'stats':
        newHistory.push({
          type: 'output',
          text: `🏆 50 Days LeetCode Badge (125+ algorithmic problems solved)
🎓 B.Tech CSE CGPA: 8.22 | Inter MPC: 88.7% | SSC: 80%
💼 IBM Virtual Internship in AI & Machine Learning`
        });
        break;

      case 'matrix':
        setIsMatrixMode(!isMatrixMode);
        newHistory.push({
          type: 'system',
          text: `Matrix digital mode: ${!isMatrixMode ? 'ACTIVATED [Green Stream]' : 'DEACTIVATED [Standard Cyan]'}`
        });
        break;

      case 'hire':
      case 'sudo hire':
        soundFx.playSuccess();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
        newHistory.push({
          type: 'output',
          text: `🎉 Thank you for the interest! Narendra Reddy is actively open for Software Developer / Full Stack Internships. Let's build something extraordinary together!`
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for a list of available commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className={`interactive-terminal-card ${isMatrixMode ? 'matrix-active' : ''}`}>
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <div className="terminal-title">narendra@cyber-workstation:~</div>
        <div className="terminal-badge">INTERACTIVE CONSOLE</div>
      </div>

      <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
        {history.map((line, idx) => (
          <div key={idx} className={`terminal-line line-${line.type}`}>
            <pre className="terminal-text">{line.text}</pre>
          </div>
        ))}

        <div className="terminal-input-row">
          <span className="terminal-prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            placeholder="Type 'help' and press Enter..."
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} />
      </div>

      <div className="terminal-quick-actions">
        <span>Quick Run:</span>
        <button onClick={() => { setInput('skills'); setTimeout(() => inputRef.current?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })), 50); }}>skills</button>
        <button onClick={() => { setInput('projects'); setTimeout(() => inputRef.current?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })), 50); }}>projects</button>
        <button onClick={() => { setInput('stats'); setTimeout(() => inputRef.current?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })), 50); }}>stats</button>
        <button onClick={() => { setInput('hire'); setTimeout(() => inputRef.current?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })), 50); }}>hire 🚀</button>
      </div>
    </div>
  );
};

export default InteractiveTerminal;
