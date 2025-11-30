-- MomentVault Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    username TEXT UNIQUE,
    vault_name TEXT,
    relationship_start_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Moments table
CREATE TABLE IF NOT EXISTS public.moments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('photo', 'video', 'audio', 'text')),
    title TEXT,
    content TEXT NOT NULL,
    caption TEXT,
    media_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_moments_user_id ON public.moments(user_id);
CREATE INDEX IF NOT EXISTS idx_moments_created_at ON public.moments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_moments_type ON public.moments(type);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- RLS Policies for moments
CREATE POLICY "Users can view their own moments"
    ON public.moments FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own moments"
    ON public.moments FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own moments"
    ON public.moments FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own moments"
    ON public.moments FOR DELETE
    USING (auth.uid() = user_id);

-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public)
VALUES ('moments', 'moments', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload their own media"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'moments' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can view their own media"
    ON storage.objects FOR SELECT
    USING (
        bucket_id = 'moments' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete their own media"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'moments' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );
