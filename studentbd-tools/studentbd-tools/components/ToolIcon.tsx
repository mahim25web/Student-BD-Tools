import {
  GraduationCap,
  School,
  Calculator,
  Percent,
  CalendarDays,
  ClipboardList,
  Timer,
  Hourglass,
  AlarmClock,
  type LucideIcon,
} from "lucide-react";
import type { ToolMeta } from "@/lib/seo/toolsData";

const ICON_MAP: Record<ToolMeta["icon"], LucideIcon> = {
  "graduation-cap": GraduationCap,
  school: School,
  calculator: Calculator,
  percent: Percent,
  "calendar-days": CalendarDays,
  "clipboard-list": ClipboardList,
  timer: Timer,
  hourglass: Hourglass,
  "alarm-clock": AlarmClock,
};

export function ToolIcon({
  icon,
  className,
}: {
  icon: ToolMeta["icon"];
  className?: string;
}) {
  const Icon = ICON_MAP[icon];
  return <Icon className={className} aria-hidden="true" />;
}
