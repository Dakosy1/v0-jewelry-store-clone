import { NextRequest, NextResponse } from 'next/server'
import { signToken, verifyPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
  }

  const token = await signToken()

  const response = NextResponse.json({ ok: true })
  response.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 дней
    path: '/',
  })

  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete('admin_token')
  return response
}
