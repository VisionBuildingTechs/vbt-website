import { getFinanceData } from "@/lib/finance-data";

export const dynamic = "force-dynamic";
export async function GET() {
  return Response.json(await getFinanceData(), {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=900",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
