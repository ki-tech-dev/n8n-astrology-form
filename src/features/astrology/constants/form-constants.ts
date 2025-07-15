import { Stars, User, Calendar, CheckCircle } from "lucide-react";
import { step1Schema, step2Schema } from "../schemas/form-schema";

export const STORAGE_KEYS = {
  FORM_DATA: "astrology_form_data",
  CURRENT_STEP: "astrology_current_step",
  LAST_SAVED: "astrology_last_saved",
} as const;

export const steps = [
  {
    id: 1,
    title: "Personal",
    subtitle: "Who are you?",
    icon: User,
    color: "from-blue-500 to-purple-600",
    description:
      "Tell us about yourself so we can create your personalized chart",
    schema: step1Schema,
  },
  {
    id: 2,
    title: "Birth Info",
    subtitle: "When & where?",
    icon: Calendar,
    color: "from-purple-500 to-pink-600",
    description: "Your exact birth details help us map the cosmic alignment",
    schema: step2Schema,
  },
  {
    id: 3,
    title: "Review",
    subtitle: "All set?",
    icon: CheckCircle,
    color: "from-green-500 to-emerald-600",
    description:
      "Let's confirm everything looks perfect before we generate your chart",
  },
];
