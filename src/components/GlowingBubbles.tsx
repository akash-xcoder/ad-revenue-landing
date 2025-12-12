import React, { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export default function GlowingBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Generate random bubbles
    const generateBubbles = () => {
      const colors = [
        'from-primary to-neon-blue',
        'from-neon-blue to-neon-purple',
        'from-neon-purple to-primary',
        'from-primary to-neon-green',
        'from-neon-green to-neon-blue',
      ];

      const newBubbles: Bubble[] = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 100 + 50, // 50-150px
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 20 + 15, // 15-35s
        delay: Math.random() * 5, // 0-5s
      }));

      setBubbles(newBubbles);
    };

    generateBubbles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={`absolute rounded-full bg-gradient-to-br ${bubble.color} opacity-20 blur-3xl`}
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            animation: `float-bubble ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`,
            filter: `blur(${bubble.size / 3}px)`,
          }}
        />
      ))}

      <style>{`
        @keyframes float-bubble {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.1;
          }
          25% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1);
            opacity: 0.2;
          }
          50% {
            transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) scale(0.9);
            opacity: 0.15;
          }
          75% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.05);
            opacity: 0.2;
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
}
