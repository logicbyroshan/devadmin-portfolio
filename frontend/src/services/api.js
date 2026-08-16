const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function fetchWebsites() {
  try {
    const res = await fetch(`${API_BASE_URL}/websites/`);
    if (!res.ok) throw new Error('Failed to fetch websites');
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.warn('API Offline or unavailable, falling back to local multi-site config:', err.message);
    return null;
  }
}

export async function fetchBlogs(websiteSlug) {
  try {
    const url = websiteSlug ? `${API_BASE_URL}/blogs/?website=${websiteSlug}` : `${API_BASE_URL}/blogs/`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch blogs');
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.warn('API Offline, using local state for blogs:', err.message);
    return null;
  }
}

export async function fetchProjects(websiteSlug) {
  try {
    const url = websiteSlug ? `${API_BASE_URL}/projects/?website=${websiteSlug}` : `${API_BASE_URL}/projects/`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch projects');
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.warn('API Offline, using local state for projects:', err.message);
    return null;
  }
}

export async function fetchExperiences(websiteSlug) {
  try {
    const url = websiteSlug ? `${API_BASE_URL}/experiences/?website=${websiteSlug}` : `${API_BASE_URL}/experiences/`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch experiences');
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.warn('API Offline, using local state for experiences:', err.message);
    return null;
  }
}

export async function fetchSkills(websiteSlug) {
  try {
    const url = websiteSlug ? `${API_BASE_URL}/skills/?website=${websiteSlug}` : `${API_BASE_URL}/skills/`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch skills');
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.warn('API Offline, using local state for skills:', err.message);
    return null;
  }
}

export async function fetchContacts(websiteSlug) {
  try {
    const url = websiteSlug ? `${API_BASE_URL}/contacts/?website=${websiteSlug}` : `${API_BASE_URL}/contacts/`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch contacts');
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.warn('API Offline, using local state for contacts:', err.message);
    return null;
  }
}
