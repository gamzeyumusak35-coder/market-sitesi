import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const kategori = searchParams.get('kategori')

  let query = supabase
    .from('urunler')
    .select('*, kategoriler(ad, slug)')
    .eq('aktif', true)

  if (kategori) {
    query = query.eq('kategoriler.slug', kategori)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ hata: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}