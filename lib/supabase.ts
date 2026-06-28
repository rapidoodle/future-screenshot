import { createClient } from '@supabase/supabase-js'
import type { Generation } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Save a generation to the database (user_id is nullable for anonymous)
export async function saveGeneration(
  data: Omit<Generation, 'id' | 'created_at'>
): Promise<Generation | null> {
  const { data: result, error } = await supabase
    .from('generations')
    .insert(data)
    .select()
    .single()

  if (error) {
    console.error('Error saving generation:', error)
    return null
  }

  return result
}

// Fetch a single generation by id
export async function getGeneration(id: string): Promise<Generation | null> {
  const { data, error } = await supabase
    .from('generations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching generation:', error)
    return null
  }

  return data
}

// Count today's generations for a given IP (rate limiting)
export async function countTodayGenerations(identifier: string): Promise<number> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { count, error } = await supabase
    .from('generations')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', identifier)
    .gte('created_at', today.toISOString())

  if (error) return 0
  return count ?? 0
}
