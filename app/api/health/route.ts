/** Health endpoint referenced by /.well-known/api-catalog. */
export function GET() {
  return Response.json(
    { status: "ok" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
