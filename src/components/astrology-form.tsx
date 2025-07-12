"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Stars,
  User,
  MapPin,
  Calendar,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Moon,
  Sun,
  Zap,
  Heart,
  Compass,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";

const step1Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  gender: z.string().min(1, "Please select your gender"),
});

const step2Schema = z.object({
  day: z
    .string()
    .min(1, "Day is required")
    .refine(
      (val) => parseInt(val) >= 1 && parseInt(val) <= 31,
      "Day must be between 1 and 31"
    ),
  month: z
    .string()
    .min(1, "Month is required")
    .refine(
      (val) => parseInt(val) >= 1 && parseInt(val) <= 12,
      "Month must be between 1 and 12"
    ),
  year: z
    .string()
    .min(1, "Year is required")
    .refine(
      (val) => parseInt(val) >= 1900 && parseInt(val) <= 2030,
      "Year must be between 1900 and 2030"
    ),
  hour: z
    .string()
    .min(1, "Hour is required")
    .refine(
      (val) => parseInt(val) >= 0 && parseInt(val) <= 23,
      "Hour must be between 0 and 23"
    ),
  min: z
    .string()
    .min(1, "Minutes are required")
    .refine(
      (val) => parseInt(val) >= 0 && parseInt(val) <= 59,
      "Minutes must be between 0 and 59"
    ),
  place: z.string().min(3, "Place must be at least 3 characters"),
});

const formSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
});

type FormData = z.infer<typeof formSchema>;

const steps = [
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

const STORAGE_KEYS = {
  FORM_DATA: "astrology_form_data",
  CURRENT_STEP: "astrology_current_step",
  LAST_SAVED: "astrology_last_saved",
} as const;

const AstrologyStepForm = () => {
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem(STORAGE_KEYS.CURRENT_STEP);
    return savedStep ? parseInt(savedStep, 10) : 1;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [_, setLastSaved] = useState<Date | null>(() => {
    const savedDate = localStorage.getItem(STORAGE_KEYS.LAST_SAVED);
    return savedDate ? new Date(savedDate) : null;
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      gender: "female",
    },
  });

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
      const response = await fetch(
        "https://n8n.neurohiveai.agency/webhook/59f8d8f9-4fb1-4610-946f-c733411b6b71",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

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
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <div className="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => {
            const icons = [Stars, Moon, Sun, Sparkles, Zap];
            const Icon = icons[i % icons.length];
            return (
              <div
                key={i}
                className="absolute animate-float opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${6 + Math.random() * 4}s`,
                }}
              >
                <Icon className="w-6 h-6 text-purple-300" />
              </div>
            );
          })}
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-1000">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse" />
                <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full">
                  <Compass
                    className="w-8 h-8 text-white animate-spin"
                    style={{ animationDuration: "8s" }}
                  />
                </div>
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              Cosmic Navigator
            </h1>
            <p className="text-xl text-purple-200 opacity-90 mx-auto leading-relaxed">
              Discover the celestial secrets written in the stars at the moment
              of your birth
            </p>
          </div>

          <div className="mb-8 animate-in fade-in slide-in-from-top duration-1000 delay-300">
            <div className="flex justify-between items-center mb-6 relative">
              {steps.map((step) => {
                const StepIcon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div
                    key={step.id}
                    className={`
                      relative flex flex-col items-center transition-all duration-500 z-10
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
                          ${
                            isActive || isCompleted
                              ? "text-white"
                              : "text-slate-400"
                          }
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
          </div>

          <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-700/50 shadow-2xl shadow-purple-500/10 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-3">
                <div
                  className={`p-3 rounded-full bg-gradient-to-r ${currentStepData.color} shadow-lg`}
                >
                  {React.createElement(currentStepData.icon, {
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
                    Your personalized cosmic blueprint has been created and will
                    be delivered shortly.
                  </p>
                  <Button
                    onClick={() => {
                      setIsResetting(true);

                      Object.values(STORAGE_KEYS).forEach((key) =>
                        localStorage.removeItem(key)
                      );

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
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    <Stars className="w-5 h-5 mr-2" />
                    Create Another Chart
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {currentStep === 1 && (
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
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right duration-700">
                      <div className="space-y-3">
                        <Label className="text-white flex items-center gap-2 text-sm font-medium">
                          <Calendar className="w-4 h-4 text-purple-400" />
                          Birth Date & Time
                        </Label>
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
                          <div className="space-y-1">
                            <Label
                              htmlFor="day"
                              className="text-slate-300 text-xs"
                            >
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
                              <p className="text-red-400 text-xs">
                                {errors.day.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-1">
                            <Label
                              htmlFor="month"
                              className="text-slate-300 text-xs"
                            >
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
                              <p className="text-red-400 text-xs">
                                {errors.month.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-1">
                            <Label
                              htmlFor="year"
                              className="text-slate-300 text-xs"
                            >
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
                              <p className="text-red-400 text-xs">
                                {errors.year.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-1">
                            <Label
                              htmlFor="hour"
                              className="text-slate-300 text-xs"
                            >
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
                              <p className="text-red-400 text-xs">
                                {errors.hour.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-1">
                            <Label
                              htmlFor="min"
                              className="text-slate-300 text-xs"
                            >
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
                              <p className="text-red-400 text-xs">
                                {errors.min.message}
                              </p>
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
                  )}

                  {currentStep === 3 && (
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
                                <span className="text-slate-400 text-sm">
                                  Name
                                </span>
                                <span className="text-white font-medium text-lg">
                                  {currentStepFields.name}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-slate-400 text-sm">
                                  Gender
                                </span>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-2 h-2 rounded-full ${
                                      currentStepFields.gender === "male"
                                        ? "bg-blue-400"
                                        : currentStepFields.gender === "female"
                                        ? "bg-pink-400"
                                        : "bg-purple-400"
                                    }`}
                                  ></div>
                                  <span className="text-white font-medium text-lg capitalize">
                                    {currentStepFields.gender}
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
                                <span className="text-slate-400 text-sm">
                                  Date
                                </span>
                                <span className="text-white font-medium text-lg flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-purple-300" />
                                  {currentStepFields.day?.padStart(2, "0")}/
                                  {currentStepFields.month?.padStart(2, "0")}/
                                  {currentStepFields.year}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-slate-400 text-sm">
                                  Time
                                </span>
                                <span className="text-white font-medium text-lg flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-blue-300" />
                                  {currentStepFields.hour?.padStart(2, "0")}:
                                  {currentStepFields.min?.padStart(2, "0")}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-slate-400 text-sm">
                                  Place
                                </span>
                                <span className="text-white font-medium text-lg flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-red-300" />
                                  {currentStepFields.place}
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
                              Your cosmic chart will be calculated based on the
                              exact position of celestial bodies at the moment
                              of your birth.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-700/50">
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
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AstrologyStepForm;
