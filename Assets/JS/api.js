const API_BASE = 'Assets/PHP';

export async function loadContacts() {
  const res = await fetch(`${API_BASE}/load.php`);
  if (!res.ok) throw new Error('Failed to load contacts');
  return await res.json();
}

export async function addContact(contact) {
  const res = await fetch(`${API_BASE}/add_contact.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to add contact');
  return data;
}

export async function deleteContact(id) {
  const res = await fetch(`${API_BASE}/delete_contact.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to delete contact');
  return data;
}

export async function editContact(contact) {
  const res = await fetch(`${API_BASE}/edit_contact.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to update contact');
  return data;
}