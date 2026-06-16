import { useEffect } from 'react';

const SITE_NAME = 'Fly YouTube';

export function usePageTitle(title?: string, description?: string): void {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME;

    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      meta?.setAttribute('content', description);

      const ogDescription = document.querySelector('meta[property="og:description"]');
      ogDescription?.setAttribute('content', description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    ogTitle?.setAttribute('content', document.title);
  }, [title, description]);
}
