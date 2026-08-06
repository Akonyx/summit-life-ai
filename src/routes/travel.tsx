import { createFileRoute } from "@tanstack/react-router";
import { Backpack, Coins, MapPin, Plane } from "lucide-react";

import { FeaturePage } from "@/components/feature-page";

export const Route = createFileRoute("/travel")({
  head: () => ({
    meta: [
      { title: "Travel Planner — LifeHub AI" },
      { name: "description", content: "Plan destinations, budgets, itineraries and packing lists with AI travel recommendations." },
      { property: "og:title", content: "Travel Planner — LifeHub AI" },
      { property: "og:description", content: "Destinations, budgets, itineraries and packing checklists." },
    ],
  }),
  component: () => (
    <FeaturePage
      eyebrow="Travel"
      title="Travel Planner"
      description="From daydream to itinerary — budgets, checklists and AI-picked highlights."
      stats={[
        { label: "Next trip", value: "Cape Town", hint: "In 47 days" },
        { label: "Budget", value: "R12,000", hint: "R4,300 saved" },
        { label: "Packing list", value: "9 / 24" },
        { label: "Days planned", value: "4 / 6" },
      ]}
      panels={[
        { title: "Itinerary", icon: MapPin, wide: true, items: ["Day 1 · Arrive, V&A Waterfront sunset", "Day 2 · Table Mountain hike, Bo-Kaap walk", "Day 3 · Cape Point drive & penguins", "Day 4 · Winelands day trip"] },
        { title: "Budget planner", icon: Coins, progress: [{ label: "Flights", value: 100 }, { label: "Accommodation", value: 60 }, { label: "Food & activities", value: 25 }] },
        { title: "Packing checklist", icon: Backpack, items: ["Hiking shoes", "Windbreaker", "Sunscreen SPF 50", "Power bank"] },
        { title: "AI recommendations", icon: Plane, note: "Book Table Mountain for a weekday morning — 40% shorter queues and clearer views." },
      ]}
    />
  ),
});