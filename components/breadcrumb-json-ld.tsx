import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";

/** Server component: emits BreadcrumbList JSON-LD for a content path. */
export function BreadcrumbJsonLd({ path }: { path: string }) {
  return <JsonLd data={breadcrumbJsonLd(path)} />;
}
