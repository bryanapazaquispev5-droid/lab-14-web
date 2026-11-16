"use client";

import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import("../components/LargeComponent"),
  { ssr: false },
);

export default function LazyLoadedComponent() {
  return <DynamicComponent />;
}
