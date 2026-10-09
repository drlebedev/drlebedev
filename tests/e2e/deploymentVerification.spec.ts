import { test, expect } from '@playwright/test';

test.describe('Deployment & Multi-Target Discovery Verification (Playwright)', () => {
  test.describe('1. Static Crawler & Discovery Assets', () => {
    test('serves public/llms.txt for AI agents', async ({ request }) => {
      const response = await request.get('llms.txt');
      expect(response.status()).toBe(200);

      const text = await response.text();
      expect(text).toContain('Kirill Lebedev, PhD');
      expect(text).toContain('Director of Engineering');
      expect(text).toContain('$1B+');
      expect(text).toContain('$100M+ ARR');
      expect(text).toContain('LinkedIn');
      expect(text).toContain('11,968,185');
    });

    test('serves public/sitemap.xml with canonical site URL', async ({ request }) => {
      const response = await request.get('sitemap.xml');
      expect(response.status()).toBe(200);

      const text = await response.text();
      expect(text).toContain('<urlset');
      expect(text).toContain('https://drlebedev.com/');
    });

    test('serves public/robots.txt with crawler instructions', async ({ request }) => {
      const response = await request.get('robots.txt');
      expect(response.status()).toBe(200);

      const text = await response.text();
      expect(text).toContain('User-agent: *');
      expect(text).toContain('Allow: /');
      expect(text).toContain('Sitemap: https://drlebedev.com/sitemap.xml');
    });

    test('serves key brand visual assets', async ({ request }) => {
      const faviconRes = await request.get('favicon.svg');
      expect(faviconRes.status()).toBe(200);

      const ogCardRes = await request.get('assets/images/og-card.png');
      expect(ogCardRes.status()).toBe(200);

      const portraitRes = await request.get('assets/images/portrait.webp');
      expect(portraitRes.status()).toBe(200);
    });
  });

  test.describe('2. Live HTML Shell, Metadata & Schema.org JSON-LD', () => {
    test('renders page title and executive headline', async ({ page }) => {
      await page.goto('./');
      await expect(page).toHaveTitle(/Kirill Lebedev/i);

      // Verify lead bio or title is present in DOM
      const nameHeading = page.locator('h1, h2').filter({ hasText: 'Kirill Lebedev' }).first();
      await expect(nameHeading).toBeVisible();
    });

    test('injects Open Graph and Twitter card meta tags', async ({ page }) => {
      await page.goto('./');

      const ogTitle = page.locator('meta[property="og:title"]');
      await expect(ogTitle).toHaveAttribute('content', /Kirill Lebedev/i);

      const ogDescription = page.locator('meta[property="og:description"]');
      await expect(ogDescription).toHaveAttribute('content', /Director of Engineering/i);

      const ogImage = page.locator('meta[property="og:image"]');
      await expect(ogImage).toHaveAttribute('content', /og-card\.png/i);

      const twitterCard = page.locator('meta[name="twitter:card"]');
      await expect(twitterCard).toHaveAttribute('content', 'summary_large_image');
    });

    test('injects valid Schema.org Person JSON-LD structured data', async ({ page }) => {
      await page.goto('./');

      const jsonLdElement = page.locator('script[type="application/ld+json"][data-seo="true"]');
      await expect(jsonLdElement).toHaveCount(1);

      const text = await jsonLdElement.textContent();
      expect(text).toBeTruthy();

      const schema = JSON.parse(text || '{}');
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Person');
      expect(schema.name).toContain('Kirill Lebedev');
      expect(schema.jobTitle).toContain('Director of Engineering');
      expect(schema.worksFor?.name).toBe('LinkedIn');
      expect(schema.sameAs).toContain('https://www.linkedin.com/in/drlebedev/');
    });
  });

  test.describe('3. Dual-Mode Interface Interaction', () => {
    test('switches seamlessly between Graphical Dossier and Terminal modes', async ({ page }) => {
      await page.goto('./');

      // Verify Hero metrics are visible in Executive view
      await expect(page.getByText('$1B+').first()).toBeVisible();

      // Find mode toggle button
      const terminalToggle = page.locator('button').filter({ hasText: 'Terminal' }).first();
      await expect(terminalToggle).toBeVisible();
      await terminalToggle.click();

      // Terminal interface should be mounted
      const terminalInput = page.locator('input[type="text"]').last();
      await expect(terminalInput).toBeVisible();

      // Enter command 'help'
      await terminalInput.fill('help');
      await terminalInput.press('Enter');

      // Verify help commands output
      await expect(page.getByText('Available commands:').or(page.getByText('drlebedev:~$ help')).first()).toBeVisible();

      // Switch back using GUI toggle or 'gui' command
      await terminalInput.fill('gui');
      await terminalInput.press('Enter');

      // Executive view should be restored
      await expect(page.getByText('$1B+').first()).toBeVisible();
    });
  });
});
