// fetch для админки: если сессия истекла, отправляем на страницу входа
export async function adminFetch(input: RequestInfo | URL, init?: RequestInit) {
  const res = await fetch(input, init)
  if (res.status === 401) {
    window.location.href = '/admin/login'
    throw new Error('Сессия истекла')
  }
  return res
}
