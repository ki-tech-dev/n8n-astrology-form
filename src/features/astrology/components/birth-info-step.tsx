import { Calendar, MapPin } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import type { UseFormReturn } from "react-hook-form";
import type { FormData } from "../schemas/form-schema";

interface BirthInfoStepProps {
  form: UseFormReturn<FormData>;
}

export const BirthInfoStep = ({ form }: BirthInfoStepProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right duration-700">
      <div className="space-y-3">
        <Label className="text-white flex items-center gap-2 text-sm font-medium">
          <Calendar className="w-4 h-4 text-purple-400" />
          Birth Date & Time
        </Label>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          <div className="space-y-1">
            <Label htmlFor="day" className="text-slate-300 text-xs">
              Day
            </Label>
            <Input
              id="day"
              type="number"
              min="1"
              max="31"
              placeholder="DD"
              {...register("day")}
              className={`
                bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400
                focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                transition-all duration-300 h-9 rounded-lg text-center
                ${errors.day ? "border-red-500" : ""}
              `}
            />
            {errors.day && (
              <p className="text-red-400 text-xs">{errors.day.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="month" className="text-slate-300 text-xs">
              Month
            </Label>
            <Input
              id="month"
              type="number"
              min="1"
              max="12"
              placeholder="MM"
              {...register("month")}
              className={`
                bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400
                focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                transition-all duration-300 h-9 rounded-lg text-center
                ${errors.month ? "border-red-500" : ""}
              `}
            />
            {errors.month && (
              <p className="text-red-400 text-xs">{errors.month.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="year" className="text-slate-300 text-xs">
              Year
            </Label>
            <Input
              id="year"
              type="number"
              min="1900"
              max="2030"
              placeholder="YYYY"
              {...register("year")}
              className={`
                bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400
                focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                transition-all duration-300 h-9 rounded-lg text-center
                ${errors.year ? "border-red-500" : ""}
              `}
            />
            {errors.year && (
              <p className="text-red-400 text-xs">{errors.year.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="hour" className="text-slate-300 text-xs">
              Hour (24h)
            </Label>
            <Input
              id="hour"
              type="number"
              min="0"
              max="23"
              placeholder="HH"
              {...register("hour")}
              className={`
                bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                transition-all duration-300 h-9 rounded-lg text-center
                ${errors.hour ? "border-red-500" : ""}
              `}
            />
            {errors.hour && (
              <p className="text-red-400 text-xs">{errors.hour.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="min" className="text-slate-300 text-xs">
              Minutes
            </Label>
            <Input
              id="min"
              type="number"
              min="0"
              max="59"
              placeholder="MM"
              {...register("min")}
              className={`
                bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                transition-all duration-300 h-9 rounded-lg text-center
                ${errors.min ? "border-red-500" : ""}
              `}
            />
            {errors.min && (
              <p className="text-red-400 text-xs">{errors.min.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="place"
          className="text-white flex items-center gap-2 text-sm font-medium"
        >
          <MapPin className="w-4 h-4 text-red-400" />
          Birth Place
        </Label>
        <Input
          id="place"
          placeholder="City, State, Country"
          {...register("place")}
          className={`
            bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400
            focus:border-red-500 focus:ring-2 focus:ring-red-500/20
            transition-all duration-300 h-10 rounded-lg
            ${errors.place ? "border-red-500" : ""}
          `}
        />
        {errors.place && (
          <p className="text-red-400 text-xs flex items-center gap-1">
            <span className="w-1 h-1 bg-red-400 rounded-full" />
            {errors.place.message}
          </p>
        )}
      </div>
    </div>
  );
};
