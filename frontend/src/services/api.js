const API_URL = 'http://localhost:3000';

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token');

  const defaultOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // Envia o token para o backend identificar o usuário logado
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${path}`, defaultOptions);
  
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return response.json();
}