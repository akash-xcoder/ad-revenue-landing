import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { registerVideoInDatabase } from '../lib/supabase';

// Mock function for now
const registerVideoInDatabase = async (storagePath: string, filename: string, metadata: any) => true;

export default function AdminPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const videos = [
    {
      storagePath: 'videos/AQOgywJRNGGe3EDs6oX3c3VRQ6PITTFh8dC8WXbj5zpjm9wpUGTMsLeucsUOthk35gL0vGbKBq_JBxmx_UnWF_brbpP6rXMSgJSdVAg.mp4',
      filename: 'video1.mp4',
      title: 'Sample Video 1',
      description: 'Watch this video and earn rewards',
      duration: 30,
    },
    {
      storagePath: 'videos/AQOx32u2qsJZGUEn31TpNftau3gxMG1lW8BFvrtXhwtU16MwF8O5XkCs2A9oh-f6xoWPA5pj7H14_BzBzsTmQGICIEvjkR-RDpPO5rU.mp4',
      filename: 'video2.mp4',
      title: 'Sample Video 2',
      description: 'Watch this video and earn rewards',
      duration: 30,
    },
  ];

  const handleRegisterVideos = async () => {
    setLoading(true);
    setMessage('Registering videos...');

    try {
      for (const video of videos) {
        const result = await registerVideoInDatabase(
          video.storagePath,
          video.filename,
          {
            title: video.title,
            description: video.description,
            duration: video.duration,
          }
        );

        if (result) {
          setMessage((prev) => `${prev}\n✓ Registered: ${video.title}`);
        } else {
          setMessage((prev) => `${prev}\n✗ Failed: ${video.title}`);
        }
      }

      setMessage((prev) => `${prev}\n\nAll videos registered! Redirecting...`);
      setTimeout(() => router.push('/watch-ads'), 2000);
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-neutral-dark text-neutral-light flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-dark-card rounded-2xl p-8 border border-neutral-light/10">
        <h1 className="text-3xl font-bold mb-6 gradient-text">Admin Panel</h1>
        
        <div className="mb-6 p-4 bg-neutral-dark rounded-lg border border-primary/30">
          <p className="text-sm text-neutral-light/70 mb-4">
            Click the button below to register all videos from storage to the database.
          </p>
          <p className="text-xs text-neutral-light/50">
            Videos found: {videos.length}
          </p>
        </div>

        <button
          onClick={handleRegisterVideos}
          disabled={loading}
          className="w-full btn-neon-solid py-3 rounded-lg font-semibold mb-4 disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register Videos'}
        </button>

        <button
          onClick={() => router.push('/')}
          className="w-full btn-neon px-6 py-3 rounded-lg font-semibold"
        >
          Back to Home
        </button>

        {message && (
          <div className="mt-6 p-4 bg-neutral-900/50 rounded-lg border border-neutral-light/10">
            <p className="text-sm text-neutral-light whitespace-pre-wrap font-mono">
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
