"use client";

import { useState, useEffect, createElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Compass } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import { formSchema, type FormData } from "../schemas/form-schema";
import { STORAGE_KEYS, steps } from "../constants/form-constants";
import { StepIndicator } from "./step-indicator";
import { PersonalInfoStep } from "./personal-info-step";
import { BirthInfoStep } from "./birth-info-step";
import { ReviewStep } from "./review-step";
import { SuccessView } from "./success-view";
import { BackgroundEffects } from "./background-effects";
import { FormNavigation } from "./form-navigation";

const AstrologyForm = () => {
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem(STORAGE_KEYS.CURRENT_STEP);
    return savedStep ? parseInt(savedStep, 10) : 1;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [_lastSaved, setLastSaved] = useState<Date | null>(() => {
    const savedDate = localStorage.getItem(STORAGE_KEYS.LAST_SAVED);
    return savedDate ? new Date(savedDate) : null;
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      gender: "female",
    },
  });

  const { handleSubmit, watch, reset, trigger } = form;

  useEffect(() => {
    if (isResetting) return;

    const savedData = localStorage.getItem(STORAGE_KEYS.FORM_DATA);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        reset(parsedData);
        toast.success("Welcome back! Your progress has been restored.", {
          icon: "🌟",
          duration: 3000,
        });
      } catch (error) {
        console.error("Error loading saved form data:", error);
        Object.values(STORAGE_KEYS).forEach((key) =>
          localStorage.removeItem(key)
        );
      }
    }
  }, [reset, isResetting]);

  useEffect(() => {
    if (isResetting) return;

    const formData = watch();
    const saveData = () => {
      if (
        !isResetting &&
        Object.keys(formData).some((key) => formData[key as keyof FormData])
      ) {
        localStorage.setItem(STORAGE_KEYS.FORM_DATA, JSON.stringify(formData));
        localStorage.setItem(STORAGE_KEYS.CURRENT_STEP, currentStep.toString());
        const now = new Date();
        localStorage.setItem(STORAGE_KEYS.LAST_SAVED, now.toISOString());
        setLastSaved(now);
      }
    };

    saveData();
    const saveInterval = setInterval(saveData, 10000);
    return () => clearInterval(saveInterval);
  }, [watch, currentStep, isResetting]);

  const currentStepFields = watch();

  const validateCurrentStep = async () => {
    const currentSchema = steps[currentStep - 1]?.schema;
    if (!currentSchema) return true;

    const fieldsToValidate = Object.keys(currentSchema.shape);
    const result = await trigger(fieldsToValidate as any);
    return result;
  };

  const nextStep = async () => {
    const isStepValid = await validateCurrentStep();
    if (!isStepValid) {
      toast.dismiss();
      const currentSchema = steps[currentStep - 1]?.schema;
      if (!currentSchema) return;

      const fieldsToValidate = Object.keys(currentSchema.shape);
      const missingFields = fieldsToValidate.filter(
        (field) => !currentStepFields[field as keyof FormData]
      );

      if (missingFields.length > 0) {
        toast.error(
          `Please complete: ${missingFields
            .map((f) => f.charAt(0).toUpperCase() + f.slice(1))
            .join(", ")}`,
          {
            icon: "⚠️",
            duration: 4000,
          }
        );
      }
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(process.env.WEBHOOK_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsResetting(true);

      Object.values(STORAGE_KEYS).forEach((key) =>
        localStorage.removeItem(key)
      );

      setIsSubmitted(true);
      setLastSaved(null);
      toast.success("Your cosmic chart is prepared! ✨", {
        duration: 5000,
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        icon: "❌",
      });
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      <BackgroundEffects />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-1000">
            <h1 className="text-6xl justify-center flex items-center gap-x-4 font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              Cosmic Navigator
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse" />
                <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full">
                  <Compass
                    className="w-8 h-8 text-white animate-spin"
                    style={{ animationDuration: "8s" }}
                  />
                </div>
              </div>
            </h1>
            <p className="text-xl text-purple-200 opacity-90 mx-auto leading-relaxed">
              Discover the celestial secrets written in the stars at the moment
              of your birth
            </p>
          </div>

          <div className="mb-8 animate-in fade-in slide-in-from-top duration-1000 delay-300">
            <StepIndicator currentStep={currentStep} />
          </div>

          <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-700/50 shadow-2xl shadow-purple-500/10 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-3">
                <div
                  className={`p-3 rounded-full bg-gradient-to-r ${currentStepData.color} shadow-lg`}
                >
                  {createElement(currentStepData.icon, {
                    className: "w-6 h-6 text-white",
                  })}
                </div>
              </div>

              <CardTitle className="text-2xl font-bold text-white mb-2">
                {currentStepData.title}
              </CardTitle>
              <CardDescription className="text-base text-slate-300 max-w-md mx-auto">
                {currentStepData.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 pb-6">
              {isSubmitted ? (
                <SuccessView
                  form={form}
                  setIsResetting={setIsResetting}
                  setIsSubmitted={setIsSubmitted}
                  setCurrentStep={setCurrentStep}
                  setLastSaved={setLastSaved}
                />
              ) : (
                <div className="space-y-6">
                  {currentStep === 1 && <PersonalInfoStep form={form} />}
                  {currentStep === 2 && <BirthInfoStep form={form} />}
                  {currentStep === 3 && (
                    <ReviewStep formData={currentStepFields} />
                  )}

                  <FormNavigation
                    currentStep={currentStep}
                    isSubmitting={isSubmitting}
                    prevStep={prevStep}
                    nextStep={nextStep}
                    onSubmit={onSubmit}
                    handleSubmit={handleSubmit}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AstrologyForm;
