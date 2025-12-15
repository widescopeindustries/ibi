-- Add slug column to profiles table for SEO-friendly URLs
-- Run this migration in your Supabase SQL editor

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS slug text;

-- Create unique index on slug
CREATE UNIQUE INDEX IF NOT EXISTS profiles_slug_idx ON public.profiles(slug);

-- Function to generate slug from first and last name
CREATE OR REPLACE FUNCTION generate_profile_slug(first_name text, last_name text, profile_id uuid)
RETURNS text AS $$
DECLARE
  base_slug text;
  final_slug text;
  counter int := 0;
BEGIN
  -- Create base slug from name
  base_slug := lower(trim(regexp_replace(
    concat(
      coalesce(first_name, ''),
      '-',
      coalesce(last_name, '')
    ),
    '[^a-zA-Z0-9]+', '-', 'g'
  )));
  
  -- Remove leading/trailing hyphens
  base_slug := trim(both '-' from base_slug);
  
  -- If slug is empty, use 'rep' as base
  IF base_slug = '' OR base_slug IS NULL THEN
    base_slug := 'rep';
  END IF;
  
  final_slug := base_slug;
  
  -- Check for uniqueness and append counter if needed
  WHILE EXISTS (SELECT 1 FROM profiles WHERE slug = final_slug AND id != profile_id) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Update existing profiles to have slugs
UPDATE public.profiles
SET slug = generate_profile_slug(first_name, last_name, id)
WHERE slug IS NULL;

-- Trigger to auto-generate slug on insert/update
CREATE OR REPLACE FUNCTION auto_generate_profile_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_profile_slug(NEW.first_name, NEW.last_name, NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profile_slug_trigger ON public.profiles;
CREATE TRIGGER profile_slug_trigger
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_profile_slug();
