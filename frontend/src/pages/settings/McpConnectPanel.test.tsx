import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import McpConnectPanel, { MCP_GUIDE_URL } from './McpConnectPanel';

describe('McpConnectPanel', () => {
  it('shows the URL to paste, a copy button and the guide', () => {
    const html = renderToStaticMarkup(<McpConnectPanel mcpUrl="https://app.simpleinvoicings.com/mcp" />);
    expect(html).toContain('https://app.simpleinvoicings.com/mcp');
    expect(html).toContain('Copy MCP server URL');
    expect(html).toContain(`href="${MCP_GUIDE_URL}"`);
    expect(html).toContain('target="_blank"');
  });

  it('says MCP is off, and still links the guide, when the server has no URL', () => {
    const html = renderToStaticMarkup(<McpConnectPanel mcpUrl={null} />);
    expect(html).toContain('switched off');
    expect(html).not.toContain('Copy MCP server URL');
    expect(html).toContain(`href="${MCP_GUIDE_URL}"`);
  });

  it('shows neither while the config is loading', () => {
    const html = renderToStaticMarkup(<McpConnectPanel mcpUrl={undefined} isLoading />);
    expect(html).not.toContain('switched off');
    expect(html).not.toContain('Copy MCP server URL');
  });

  it('points at the AI assistants page of the guide', () => {
    expect(MCP_GUIDE_URL).toBe('https://guide.simpleinvoicings.com/integrations/ai-assistants');
  });
});
