"use client";

import { useState } from "react";
import { Droplets, Check, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getIrrigationRecommendation, type IrrigationResponse } from "@/lib/api";

const weatherOptions = [
  { value: "Sunny", label: "☀️ Sunny" },
  { value: "Cloudy", label: "☁️ Cloudy" },
  { value: "Rainy", label: "🌧️ Rainy" },
  { value: "Windy", label: "💨 Windy" },
  { value: "Hot", label: "🔥 Hot" },
];

export default function IrrigationPage() {
  const [crop, setCrop] = useState("");
  const [soilMoisture, setSoilMoisture] = useState(50);
  const [weather, setWeather] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<IrrigationResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!crop || !weather) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await getIrrigationRecommendation({
        crop,
        soil_moisture: soilMoisture,
        weather,
      });
      setResult(response);
    } catch (error) {
      toast.error("Failed to get recommendation. Please check if the backend is running.");
      console.error("Irrigation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-cyan-400/10">
          <Droplets className="h-6 w-6 text-cyan-400" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Smart Irrigation Advisor
        </h1>
      </div>

      {/* Form */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Crop Name */}
            <div className="space-y-2">
              <Label htmlFor="crop" className="text-foreground">
                Crop Name
              </Label>
              <Input
                id="crop"
                placeholder="e.g., wheat, rice, cotton"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Soil Moisture */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-foreground">Soil Moisture</Label>
                <span className="text-lg font-semibold text-primary">
                  {soilMoisture}%
                </span>
              </div>
              <Slider
                value={[soilMoisture]}
                onValueChange={(value) => setSoilMoisture(value[0])}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Dry (0%)</span>
                <span>Optimal (50%)</span>
                <span>Wet (100%)</span>
              </div>
            </div>

            {/* Weather */}
            <div className="space-y-2">
              <Label className="text-foreground">Current Weather</Label>
              <Select value={weather} onValueChange={setWeather}>
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue placeholder="Select current weather" />
                </SelectTrigger>
                <SelectContent>
                  {weatherOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !crop || !weather}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              {isLoading ? "Getting Recommendation..." : "Get Recommendation"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Water Now Card */}
          <Card
            className={`border-2 ${
              result.water_now
                ? "border-cyan-500 bg-cyan-500/10"
                : "border-primary bg-primary/10"
            }`}
          >
            <CardContent className="p-8 text-center">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                  result.water_now ? "bg-cyan-500/20" : "bg-primary/20"
                }`}
              >
                {result.water_now ? (
                  <Droplets className="h-10 w-10 text-cyan-400" />
                ) : (
                  <Check className="h-10 w-10 text-primary" />
                )}
              </div>
              <h2
                className={`text-3xl font-bold ${
                  result.water_now ? "text-cyan-400" : "text-primary"
                }`}
              >
                {result.water_now ? "WATER NOW" : "NO IRRIGATION NEEDED"}
              </h2>
              <p className="text-muted-foreground mt-2">
                {result.water_now
                  ? "Your crops need watering"
                  : "Soil moisture is adequate"}
              </p>
            </CardContent>
          </Card>

          {/* Recommended Liters */}
          {result.water_now && (
            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground mb-2">Recommended Water</p>
                <p className="text-4xl font-bold text-cyan-400">
                  {result.recommended_water_liters}
                  <span className="text-lg font-normal text-muted-foreground ml-2">
                    liters
                  </span>
                </p>
              </CardContent>
            </Card>
          )}

          {/* Advice */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Expert Advice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{result.advice}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
