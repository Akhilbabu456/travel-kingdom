export function head(opts: {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
}) {
  const t = `${opts.title} | Travel Kingdom`;
  return () => ({
    meta: [
      { title: t },
      { name: "description", content: opts.description },
      { property: "og:title", content: t },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: "website" },
      ...(opts.image ? [{ property: "og:image", content: opts.image }] : []),
      { name: "twitter:card", content: "summary_large_image" },
    ],
    ...(opts.canonical ? { links: [{ rel: "canonical", href: opts.canonical }] } : {}),
  });
}
