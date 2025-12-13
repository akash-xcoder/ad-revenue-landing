"use client";

import { useEffect, useState } from 'react';

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Generate random bubbles only on client
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
      size: Math.random() * 100 + 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));

    setBubbles(newBubbles);
  }, []);

  // Don't render anything on server to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={`absolute rounded-full bg-gradient-to-br ${bubble.color} opacity-20 blur-3xl animate-float-bubble`}
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
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
            transform: translate(30px, -40px) scale(1.1);
            opacity: 0.2;
          }
          50% {
            transform: translate(-20px, 50px) scale(0.9);
            opacity: 0.15;
          }
          75% {
            transform: translate(40px, 20px) scale(1.05);
            opacity: 0.2;
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.1;
          }
        }
        .animate-float-bubble {
          animation: float-bubble ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
