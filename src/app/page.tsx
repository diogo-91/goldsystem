import { GoldSystem } from "@/components/gold-system";

// Read delivery configuration at request time, including after a cloud restart.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <GoldSystem contactEnabled={Boolean(process.env.BRIEFING_WEBHOOK_URL)} />
  );
}
