"use client";

import React from "react";
import { notFound } from "next/navigation";
import { StubPage } from "@/components/site/stub-page";
import { packages } from "@/lib/data";
import heroImg from "@/assets/hero-maldives.jpg";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function Page({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;
  const p = packages.find((x) => x.slug === slug);

  if (!p) {
    notFound();
  }

  return (
    <StubPage
      eyebrow={p.category}
      title={p.title}
      sub={`${p.nights} Nights / ${p.days} Days premium package.`}
      image={p.image.src ?? p.image ?? heroImg.src ?? heroImg}
    />
  );
}
