import { steps } from "../constants/form-constants";

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex justify-around items-center mb-6 relative">
      {steps.map((step) => {
        const StepIcon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        return (
          <div
            key={step.id}
            className={`
              relative flex flex-col items-center transition-all duration-500 z-10 min-w-[100px]
              ${isActive ? "transform scale-110" : ""}
            `}
          >
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-500
                ${
                  isActive
                    ? `bg-gradient-to-r ${step.color} shadow-lg shadow-purple-500/50 scale-110`
                    : isCompleted
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/30"
                    : "bg-slate-800 border-2 border-slate-600"
                }
              `}
            >
              <StepIcon
                className={`
                  w-5 h-5 transition-all duration-300
                  ${isActive || isCompleted ? "text-white" : "text-slate-400"}
                `}
              />
            </div>

            <div className="text-center">
              <div
                className={`
                  text-sm font-medium transition-all duration-300
                  ${
                    isActive
                      ? "text-purple-300"
                      : isCompleted
                      ? "text-green-300"
                      : "text-slate-400"
                  }
                `}
              >
                {step.title}
              </div>
              <div
                className={`
                  text-xs opacity-70 transition-all duration-300
                  ${
                    isActive
                      ? "text-purple-200"
                      : isCompleted
                      ? "text-green-200"
                      : "text-slate-500"
                  }
                `}
              >
                {step.subtitle}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
