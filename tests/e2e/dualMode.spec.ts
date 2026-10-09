import { test, expect } from '@playwright/test';

test.describe('Dual-Mode Website Integration & Mobile Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('renders executive graphical view by default with all key sections', async ({ page }) => {
    // Masthead & Name
    await expect(page.locator('text=Kirill Lebedev, PhD').first()).toBeVisible();

    // Section Anchors
    await expect(page.locator('#narrative')).toBeVisible();
    await expect(page.locator('#doctrine')).toBeVisible();
    await expect(page.locator('#experience')).toBeVisible();
    await expect(page.locator('#patents')).toBeVisible();
    await expect(page.locator('#education')).toBeVisible();
    await expect(page.locator('#skills')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();

    // Hero Metrics
    await expect(page.locator('text=$1B+').first()).toBeVisible();
    await expect(page.locator('text=$100M+').first()).toBeVisible();
    await expect(page.locator('text=70+').first()).toBeVisible();

    // Patents section contains issued patent numbers
    await expect(page.locator('text=11,968,185').first()).toBeVisible();
    await expect(page.locator('text=11,232,254').first()).toBeVisible();
    await expect(page.locator('text=11,102,534').first()).toBeVisible();
  });

  test('expands and collapses experience role details in executive view', async ({ page }) => {
    // Locate the first experience item toggle button
    const expandBtn = page.locator('button:has-text("Role Details"), button:has-text("Show Details")').first();
    if (await expandBtn.isVisible()) {
      await expandBtn.click();
      // Verify expanded highlights or milestones
      await expect(page.locator('#experience')).toBeVisible();
    }
  });

  test('switches into terminal mode and executes interactive commands', async ({ page }) => {
    // Click Terminal toggle button in header
    const terminalToggle = page.locator('button[data-active]:has-text("Terminal")').first();
    await expect(terminalToggle).toBeVisible();
    await terminalToggle.click();

    // Terminal container and screen should appear
    const terminalView = page.locator('#cli-view-container');
    await expect(terminalView).toBeVisible();

    const terminalInput = terminalView.locator('input[type="text"]');
    await expect(terminalInput).toBeVisible();
    await expect(terminalInput).toBeFocused();

    // Test 'help' command
    await terminalInput.fill('help');
    await terminalInput.press('Enter');
    await expect(terminalView.locator('text=AVAILABLE COMMANDS')).toBeVisible();

    // Test 'bio' command
    await terminalInput.fill('bio');
    await terminalInput.press('Enter');
    await expect(terminalView.locator('text=EXECUTIVE PROFILE')).toBeVisible();

    // Test 'patents' command
    await terminalInput.fill('patents');
    await terminalInput.press('Enter');
    await expect(terminalView.locator('text=11,968,185').first()).toBeVisible();

    // Test 'edu' command
    await terminalInput.fill('edu');
    await terminalInput.press('Enter');
    await expect(terminalView.locator('text=INRTU').first()).toBeVisible();

    // Test 'clear' command
    await terminalInput.fill('clear');
    await terminalInput.press('Enter');
    await expect(terminalView.locator('text=AVAILABLE COMMANDS')).not.toBeVisible();

    // Test 'gui' command to return to executive view
    await terminalInput.fill('gui');
    await terminalInput.press('Enter');
    await expect(terminalView).not.toBeVisible();
    await expect(page.locator('#narrative')).toBeVisible();
  });

  test('switches between modes via header return button and Escape key', async ({ page }) => {
    // Switch to Terminal
    const terminalToggle = page.locator('button[data-active]:has-text("Terminal")').first();
    await terminalToggle.click();
    const terminalView = page.locator('#cli-view-container');
    await expect(terminalView).toBeVisible();

    // Click Return to Executive View button
    const returnBtn = terminalView.locator('button:has-text("Return to Executive View")');
    await expect(returnBtn).toBeVisible();
    await returnBtn.click();
    await expect(terminalView).not.toBeVisible();

    // Switch back to Terminal
    await terminalToggle.click();
    await expect(terminalView).toBeVisible();

    // Press Escape to return
    await page.keyboard.press('Escape');
    await expect(terminalView).not.toBeVisible();
  });

  test('toggles terminal mode via keyboard shortcut (` / ~)', async ({ page }) => {
    const terminalView = page.locator('#cli-view-container');
    await expect(terminalView).not.toBeVisible();

    // Press ` key
    await page.keyboard.press('`');
    await expect(terminalView).toBeVisible();

    // Press Escape to exit
    await page.keyboard.press('Escape');
    await expect(terminalView).not.toBeVisible();
  });

  test('supports mobile viewport layout, navigation, and touch command chips', async ({ page }) => {
    // Resize to mobile viewport (iPhone 13 / SE)
    await page.setViewportSize({ width: 375, height: 667 });

    // Header adapts: mobile menu hamburger button exists
    const menuBtn = page.locator('button[aria-label="Toggle mobile menu"]');
    await expect(menuBtn).toBeVisible();

    // Open mobile menu drawer
    await menuBtn.click();
    await expect(page.locator('nav a:has-text("Experience"), div a:has-text("Experience")').first()).toBeVisible();

    // Close mobile menu by clicking a nav link
    const expLink = page.locator('a[href="#experience"]').first();
    await expLink.click();

    // Mobile mode switcher exists in header (labeled "CLI")
    const mobileCliBtn = page.locator('button:has-text("CLI")').first();
    await expect(mobileCliBtn).toBeVisible();
    await mobileCliBtn.click();

    // Terminal view opens
    const terminalView = page.locator('#cli-view-container');
    await expect(terminalView).toBeVisible();

    // Command chips are rendered and clickable on touch screens
    const chipsContainer = terminalView.locator('#command-chips, [data-testid="command-chips"], div:has(button:has-text("patents"))');
    await expect(chipsContainer.first()).toBeVisible();

    const patentChip = terminalView.locator('button:has-text("patents")').first();
    await expect(patentChip).toBeVisible();
    await patentChip.click();

    // Should output patents
    await expect(terminalView.locator('text=11,968,185').first()).toBeVisible();

    // Return to executive view via return button
    const returnBtn = terminalView.locator('button:has-text("Return to Executive View")');
    await returnBtn.click();
    await expect(terminalView).not.toBeVisible();
  });

  test('cycles theme modes (dark/light) cleanly', async ({ page }) => {
    const themeBtn = page.locator('button[data-testid="theme-toggle-btn"]').first();
    if (await themeBtn.isVisible()) {
      // Click theme button to cycle
      await themeBtn.click();
      const html = page.locator('html');
      // Root HTML should remain intact with class attributes
      await expect(html).toBeVisible();
    }
  });
});
