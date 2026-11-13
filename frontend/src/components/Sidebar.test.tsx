import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

vi.hoisted(() => {
  vi.stubGlobal('localStorage', { getItem: () => null, setItem: () => undefined });
});

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ isAdmin: true, canManagePlatform: false, userEmail: 'a@b.co', logout: vi.fn() }),
}));
vi.mock('./SidebarFYSwitcher', () => ({ default: () => null }));

import Sidebar from './Sidebar';

function render(hasCompany: boolean) {
  const client = new QueryClient();
  client.setQueryData(['company-setup-required'], hasCompany ? { name: 'Acme' } : { name: '' });
  return renderToStaticMarkup(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={['/settings/company?setup=required']}>
        <Sidebar />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('Sidebar during company setup', () => {
  it('locks every page and keeps only company setup and logout usable', () => {
    const html = render(false);
    expect(html).toContain('Save your company details to open the rest of the app.');
    expect(html).toContain('aria-disabled="true"');
    expect(html).not.toContain('href="/invoices"');
    expect(html).toContain('href="/settings/company?setup=required"');
    expect(html).toContain('Logout');
  });

  it('is the normal sidebar once a company exists', () => {
    const html = render(true);
    expect(html).not.toContain('Save your company details');
    expect(html).not.toContain('aria-disabled');
    expect(html).toContain('href="/settings"');
  });
});
