import { Calendar, User, MapPin, Clock, Sparkles } from "lucide-react";
import type { FormData } from "../schemas/form-schema";

interface ReviewStepProps {
  formData: FormData;
}

export const ReviewStep = ({ formData }: ReviewStepProps) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right duration-700">
      <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-xl p-6 backdrop-blur-sm border border-slate-600/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 rounded-lg p-5 border border-slate-700/50 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
            <h4 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <div className="bg-blue-500/20 p-2 rounded-full">
                <User className="w-4 h-4 text-blue-400" />
              </div>
              Personal Information
            </h4>
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-slate-400 text-sm">Name</span>
                <span className="text-white font-medium text-lg">
                  {formData.name}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-sm">Gender</span>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      formData.gender === "male"
                        ? "bg-blue-400"
                        : formData.gender === "female"
                        ? "bg-pink-400"
                        : "bg-purple-400"
                    }`}
                  ></div>
                  <span className="text-white font-medium text-lg capitalize">
                    {formData.gender}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 rounded-lg p-5 border border-slate-700/50 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"></div>
            <h4 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <div className="bg-purple-500/20 p-2 rounded-full">
                <Calendar className="w-4 h-4 text-purple-400" />
              </div>
              Birth Details
            </h4>
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-slate-400 text-sm">Date</span>
                <span className="text-white font-medium text-lg flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-300" />
                  {formData.day?.padStart(2, "0")}/
                  {formData.month?.padStart(2, "0")}/{formData.year}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-sm">Time</span>
                <span className="text-white font-medium text-lg flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-300" />
                  {formData.hour?.padStart(2, "0")}:
                  {formData.min?.padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-sm">Place</span>
                <span className="text-white font-medium text-lg flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-300" />
                  {formData.place}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-slate-300">
            <div className="p-2 bg-amber-500/20 rounded-full">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-sm">
              Your cosmic chart will be calculated based on the exact position
              of celestial bodies at the moment of your birth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
