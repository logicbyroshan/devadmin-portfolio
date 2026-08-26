/**
 * DevAdmin Centralized REST API Service Layer
 * Connects React UI to Django REST Framework backend with multi-tenant partitioning,
 * JWT authentication, automatic token refresh, parameter filtering, and error handling.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Helper for HTTP requests with automatic JWT Bearer token attachment and 401 refresh
async function request(endpoint, options = {}, isRetry = false) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = localStorage.getItem('access_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle token expiration / 401 Unauthorized
    if (response.status === 401 && !isRetry && !endpoint.includes('/auth/token/')) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const refreshRes = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }),
          });
          if (refreshRes.ok) {
            const data = await refreshRes.json();
            if (data.access) {
              localStorage.setItem('access_token', data.access);
              return request(endpoint, options, true);
            }
          }
        } catch {
          // Token refresh failed; proceed to error handling
        }
      }
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errorMessage = errData.error || errData.detail || errData.message || (typeof errData === 'object' ? Object.entries(errData).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(' ') : v}`).join(' | ') : null) || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    if (response.status === 204) return true;
    return await response.json();
  } catch (error) {
    console.warn(`[DevAdmin API] ${options.method || 'GET'} ${endpoint} failed:`, error.message);
    throw error;
  }
}

// 1. Websites API
export const websitesApi = {
  getAll: () => request('/websites/'),
  getBySlug: (slug) => request(`/websites/${slug}/`),
  update: (slug, data) => request(`/websites/${slug}/`, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (slug, data) => request(`/websites/${slug}/`, { method: 'PATCH', body: JSON.stringify(data) }),
};

// 2. Projects API
export const projectsApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/projects/${query ? `?${query}` : ''}`);
  },
  getById: (id) => request(`/projects/${id}/`),
  create: (data) => request('/projects/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/projects/${id}/`, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (id, data) => request(`/projects/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id) => request(`/projects/${id}/`, { method: 'DELETE' }),
  toggleVisibility: (id) => request(`/projects/${id}/toggle_visibility/`, { method: 'POST' }),
};

// 3. Blogs API
export const blogsApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/blogs/${query ? `?${query}` : ''}`);
  },
  getById: (id) => request(`/blogs/${id}/`),
  create: (data) => request('/blogs/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/blogs/${id}/`, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (id, data) => request(`/blogs/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id) => request(`/blogs/${id}/`, { method: 'DELETE' }),
  toggleVisibility: (id) => request(`/blogs/${id}/toggle_visibility/`, { method: 'POST' }),
};

// 4. Experiences API
export const experiencesApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/experiences/${query ? `?${query}` : ''}`);
  },
  getById: (id) => request(`/experiences/${id}/`),
  create: (data) => request('/experiences/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/experiences/${id}/`, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (id, data) => request(`/experiences/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id) => request(`/experiences/${id}/`, { method: 'DELETE' }),
  toggleVisibility: (id) => request(`/experiences/${id}/toggle_visibility/`, { method: 'POST' }),
};

// 5. Skills API
export const skillsApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/skills/${query ? `?${query}` : ''}`);
  },
  getById: (id) => request(`/skills/${id}/`),
  create: (data) => request('/skills/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/skills/${id}/`, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (id, data) => request(`/skills/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id) => request(`/skills/${id}/`, { method: 'DELETE' }),
  toggleVisibility: (id) => request(`/skills/${id}/toggle_visibility/`, { method: 'POST' }),
};

// 6. FAQs API
export const faqsApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/faqs/${query ? `?${query}` : ''}`);
  },
  getById: (id) => request(`/faqs/${id}/`),
  create: (data) => request('/faqs/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/faqs/${id}/`, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (id, data) => request(`/faqs/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id) => request(`/faqs/${id}/`, { method: 'DELETE' }),
  toggleVisibility: (id) => request(`/faqs/${id}/toggle_visibility/`, { method: 'POST' }),
};

// 7. Contact Inquiries & SMTP Relay API
export const contactsApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/contacts/${query ? `?${query}` : ''}`);
  },
  getById: (id) => request(`/contacts/${id}/`),
  create: (data) => request('/contacts/', { method: 'POST', body: JSON.stringify(data) }),
  reply: (id, replySubject, replyText) => request(`/contacts/${id}/reply/`, {
    method: 'POST',
    body: JSON.stringify({ reply_subject: replySubject, reply_text: replyText }),
  }),
  toggleStar: (id) => request(`/contacts/${id}/toggle_star/`, { method: 'POST' }),
  markRead: (id) => request(`/contacts/${id}/mark_read/`, { method: 'POST' }),
  delete: (id) => request(`/contacts/${id}/`, { method: 'DELETE' }),
};

// 8. Portfolio Profile Details API
export const profilesApi = {
  getByWebsite: (websiteSlug) => request(`/profiles/?website=${websiteSlug}`),
  update: (id, data) => request(`/profiles/${id}/`, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (id, data) => request(`/profiles/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
};

// 9. Dashboard Analytics API
export const dashboardApi = {
  getStats: (websiteSlug) => request(`/dashboard/stats/${websiteSlug ? `?website=${websiteSlug}` : ''}`),
  getActivities: (websiteSlug) => request(`/dashboard/activities/${websiteSlug ? `?website=${websiteSlug}` : ''}`),
  getHeatmap: () => request('/dashboard/heatmap/'),
};

// 10. Health API
export const healthApi = {
  check: () => request('/health/'),
};

// 11. Authentication API
export const authApi = {
  login: (username, password) => request('/auth/token/', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  }),
  register: (userData) => request('/auth/register/', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  refreshToken: (refresh) => request('/auth/token/refresh/', {
    method: 'POST',
    body: JSON.stringify({ refresh }),
  }),
  getMe: () => request('/auth/me/'),
  changePassword: (current_password, new_password) => request('/auth/change-password/', {
    method: 'POST',
    body: JSON.stringify({ current_password, new_password }),
  }),
};

export default {
  auth: authApi,
  websites: websitesApi,
  projects: projectsApi,
  blogs: blogsApi,
  experiences: experiencesApi,
  skills: skillsApi,
  faqs: faqsApi,
  contacts: contactsApi,
  profiles: profilesApi,
  dashboard: dashboardApi,
  health: healthApi,
};
