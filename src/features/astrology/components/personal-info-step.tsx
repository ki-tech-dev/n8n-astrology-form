import { User, Heart } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import type { UseFormReturn } from "react-hook-form";
import type { FormData } from "../schemas/form-schema";

interface PersonalInfoStepProps {
  form: UseFormReturn<FormData>;
}

export const PersonalInfoStep = ({ form }: PersonalInfoStepProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-white flex items-center gap-2 text-sm font-medium"
          >
            <User className="w-4 h-4 text-blue-400" />
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            {...register("name")}
            className={`
              bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
              transition-all duration-300 h-10 rounded-lg
              ${
                errors.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : ""
              }
            `}
          />
          {errors.name && (
            <p className="text-red-400 text-xs flex items-center gap-1">
              <span className="w-1 h-1 bg-red-400 rounded-full" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="gender"
            className="text-white flex items-center gap-2 text-sm font-medium"
          >
            <Heart className="w-4 h-4 text-pink-400" />
            Gender
          </Label>
          <Select
            value={watch("gender")}
            onValueChange={(value) => setValue("gender", value)}
          >
            <SelectTrigger
              className={`
                bg-slate-800/50 border-slate-600 text-white
                focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20
                transition-all duration-300 h-10 rounded-lg
                ${
                  errors.gender
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : ""
                }
              `}
            >
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700 shadow-2xl">
              <SelectItem
                value="male"
                className="text-white hover:bg-blue-500/20 focus:bg-blue-500/20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  Male
                </div>
              </SelectItem>
              <SelectItem
                value="female"
                className="text-white hover:bg-pink-500/20 focus:bg-pink-500/20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full" />
                  Female
                </div>
              </SelectItem>
              <SelectItem
                value="other"
                className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  Other
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-red-400 text-xs flex items-center gap-1">
              <span className="w-1 h-1 bg-red-400 rounded-full" />
              {errors.gender.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
