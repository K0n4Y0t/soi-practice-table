import { createFileRoute } from "@tanstack/react-router";
import { PlayTable } from "@/components/game/play-table";

export const Route = createFileRoute("/")({ component: PlayTable });
