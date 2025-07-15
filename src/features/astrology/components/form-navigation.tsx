import { Button } from "../../../components/ui/button";
import { ChevronLeft, ChevronRight, Stars } from "lucide-react";
import { steps } from "../constants/form-constants";
import type { FormData } from "../schemas/form-schema";

interface FormNavigationProps {
  currentStep: number;
  isSubmitting: boolean;
  prevStep: () => void;
  nextStep: () => void;
  onSubmit: (data: FormData) => void;
  handleSubmit: any;
}

export const FormNavigation = ({
  currentStep,
  isSubmitting,
  prevStep,
  nextStep,
  onSubmit,
  handleSubmit,
}: FormNavigationProps) => {
  const currentStepData = steps[currentStep - 1];

  return (
    <div className="flex justify-between items-center mt-4 pt-6 border-t border-slate-700/50">
      <Button
        type="button"
        variant="outline"
        onClick={prevStep}
        disabled={currentStep === 1}
        className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-full font-medium transition-all duration-300"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>

      {currentStep < steps.length ? (
        <Button
          type="button"
          onClick={nextStep}
          className={`
            bg-gradient-to-r ${currentStepData.color} hover:opacity-90
            text-white px-8 py-3 rounded-full font-medium
            transition-all duration-300 transform hover:scale-105
            shadow-lg shadow-purple-500/30
          `}
        >
          Continue
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
              Generating Chart...
            </>
          ) : (
            <>
              <Stars className="w-4 h-4 mr-2" />
              Generate My Chart
            </>
          )}
        </Button>
      )}
    </div>
  );
};
