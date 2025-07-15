import { CheckCircle, Stars } from "lucide-react";
import { Button } from "../../../components/ui/button";
import type { UseFormReturn } from "react-hook-form";
import type { FormData } from "../schemas/form-schema";
import { STORAGE_KEYS } from "../constants/form-constants";
import toast from "react-hot-toast";
import type { Dispatch, SetStateAction } from "react";

interface SuccessViewProps {
  form: UseFormReturn<FormData>;
  setIsResetting: Dispatch<SetStateAction<boolean>>;
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  setLastSaved: Dispatch<SetStateAction<Date | null>>;
}

export const SuccessView = ({
  form,
  setIsResetting,
  setIsSubmitted,
  setCurrentStep,
  setLastSaved,
}: SuccessViewProps) => {
  const { reset } = form;

  const handleCreateAnother = () => {
    setIsResetting(true);

    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));

    reset();
    setIsSubmitted(false);
    setCurrentStep(1);
    setLastSaved(null);

    setTimeout(() => {
      setIsResetting(false);
      toast.success("Form cleared! Ready for a new chart.", {
        icon: "✨",
        duration: 2000,
      });
    }, 500);
  };

  return (
    <div className="text-center py-12 animate-in fade-in slide-in-from-bottom duration-1000">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-2xl opacity-30 animate-pulse" />
        <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-white animate-bounce" />
        </div>
      </div>
      <h3 className="text-3xl font-bold text-white mb-4">
        🌟 Chart Generated! 🌟
      </h3>
      <p className="text-lg text-slate-300 max-w-md mx-auto mb-8 leading-relaxed">
        Your personalized cosmic blueprint has been created and will be
        delivered shortly.
      </p>
      <Button
        onClick={handleCreateAnother}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
      >
        <Stars className="w-5 h-5 mr-2" />
        Create Another Chart
      </Button>
    </div>
  );
};
