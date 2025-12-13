import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dwhwkaihpqeypmhnciac.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3aHdrYWlocHFleXBtaG5jaWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NjI1NDYsImV4cCI6MjA4MTEzODU0Nn0.pzcyLHGoRKnhaw40fk03CNusqbAvuqdLKtHkq1qi6pY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Video types
export interface Video {
  id: number;
  user_id: string;
  filename: string;
  storage_path: string;
  title?: string;
  description?: string;
  duration?: number;
  thumbnail_url?: string;
  size: number;
  mime: string;
  created_at: string;
}

// Wallet types
export interface UserWallet {
  id: number;
  user_id: string;
  balance: number;
  total_earned: number;
  updated_at: string;
}

// Ad view types
export interface AdView {
  id: number;
  user_id: string;
  ad_id: number;
  watched_at: string;
  completed: boolean;
  earnings: number;
}

// Fetch all videos
export async function fetchVideos() {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
  return data || [];
}

// Fetch user wallet
export async function fetchUserWallet(userId: string) {
  const { data, error } = await supabase
    .from('user_wallets')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching wallet:', error);
  }
  return data;
}

// Create or update user wallet
export async function initializeUserWallet(userId: string) {
  const { data, error } = await supabase
    .from('user_wallets')
    .upsert([
      {
        user_id: userId,
        balance: 0,
        total_earned: 0,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error initializing wallet:', error);
    return null;
  }
  return data;
}

// Record ad view
export async function recordAdView(userId: string, adId: number, completed: boolean, earnings: number) {
  const { data, error } = await supabase
    .from('ad_views')
    .insert([
      {
        user_id: userId,
        ad_id: adId,
        completed,
        earnings: completed ? earnings : 0,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error recording ad view:', error);
    return null;
  }

  // Update wallet if ad was completed
  if (completed) {
    await updateWalletBalance(userId, earnings);
  }

  return data;
}

// Update wallet balance
export async function updateWalletBalance(userId: string, amount: number) {
  const wallet = await fetchUserWallet(userId);

  if (!wallet) {
    await initializeUserWallet(userId);
  }

  const { data, error } = await supabase
    .from('user_wallets')
    .update({
      balance: (wallet?.balance || 0) + amount,
      total_earned: (wallet?.total_earned || 0) + amount,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating wallet:', error);
    return null;
  }
  return data;
}

// Upload video
export async function uploadVideo(file: File, userId: string, metadata?: { title?: string; description?: string; duration?: number }) {
  const pathname = `uploads/${userId}/${Date.now()}_${file.name}`;

  // Upload to storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('videos')
    .upload(pathname, file, { cacheControl: '3600', upsert: false });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    throw uploadError;
  }

  // Save metadata to DB
  const { data: dbData, error: dbError } = await supabase
    .from('videos')
    .insert([
      {
        user_id: userId,
        filename: file.name,
        storage_path: uploadData.path,
        size: file.size,
        mime: file.type,
        title: metadata?.title || file.name,
        description: metadata?.description,
        duration: metadata?.duration,
      },
    ])
    .select()
    .single();

  if (dbError) {
    console.error('DB error:', dbError);
    throw dbError;
  }

  return dbData;
}

// Get public URL for video
export function getVideoPublicUrl(storagePath: string) {
  try {
    // The storagePath from database might be just the filename or full path
    // Supabase storage path format: bucket/path/to/file
    let cleanPath = storagePath;
    
    // Remove 'videos/' prefix if it exists since we're already in the videos bucket
    if (cleanPath.startsWith('videos/')) {
      cleanPath = cleanPath.substring(7);
    }
    
    const { data } = supabase.storage
      .from('videos')
      .getPublicUrl(cleanPath);
    
    const url = data.publicUrl;
    console.log('Storage path:', storagePath);
    console.log('Clean path:', cleanPath);
    console.log('Generated video URL:', url);
    return url;
  } catch (error) {
    console.error('Error generating video URL:', error);
    // Fallback: construct URL manually
    const baseUrl = 'https://dwhwkaihpqeypmhnciac.supabase.co/storage/v1/object/public/videos/';
    const cleanPath = storagePath.startsWith('videos/') 
      ? storagePath.substring(7) 
      : storagePath;
    const fallbackUrl = baseUrl + cleanPath;
    console.log('Using fallback URL:', fallbackUrl);
    return fallbackUrl;
  }
}

// Register videos from storage to database
export async function registerVideoInDatabase(storagePath: string, filename: string, metadata?: { title?: string; description?: string; duration?: number }) {
  try {
    // Check if video already exists
    const { data: existingVideos, error: checkError } = await supabase
      .from('videos')
      .select('*')
      .eq('storage_path', storagePath);

    if (checkError) {
      console.error('Error checking for existing video:', checkError);
    }

    if (existingVideos && existingVideos.length > 0) {
      console.log('Video already exists:', existingVideos[0]);
      return existingVideos[0];
    }

    // Register new video
    const { data, error } = await supabase
      .from('videos')
      .insert([
        {
          user_id: 'admin',
          filename: filename,
          storage_path: storagePath,
          size: 0,
          mime: 'video/mp4',
          title: metadata?.title || filename,
          description: metadata?.description || 'Watch this video and earn',
          duration: metadata?.duration || 30,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error registering video:', error);
      return null;
    }
    console.log('Video registered:', data);
    return data;
  } catch (error) {
    console.error('Error in registerVideoInDatabase:', error);
    return null;
  }
}
