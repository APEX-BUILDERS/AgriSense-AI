"use client";

import { useState } from "react";
import { TrendingUp, Sprout, DollarSign, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { predictYield, type YieldResponse } from "@/lib/api";

const seasonOptions = [
  { value: "Kharif", label: "Kharif (Monsoon - June to October)" },
  { value: "Rabi", label: "Rabi (Winter - October to March)" },
  { value: "Zaid", label: "Zaid (Summer - March to June)" },
];

export default function YieldPage() {
  const [crop, setCrop] = useState("");
  const [landSize, setLandSize] = useState("");
  const [season, setSeason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<YieldResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!crop || !landSize || !season) {
      toast.error("Please fill in all fields");
      return;
    }

    const landSizeNum = parseFloat(landSize);
    if (isNaN(landSizeNum) || landSizeNum <= 0) {
      toast.error("Please enter a valid land size");
      return;
    }

    setIsLoading(true);
    try {
      const response = await predictYield({
        crop,
        land_size: landSizeNum,
        season,
      });
      setResult(response);
    } catch (error) {
      toast.error("Failed to predict yield. Please check if the backend is running.");
      console.error("Yield prediction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Yield & Market Value Predictor
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
                placeholder="e.g., wheat, rice, sugarcane"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Land Size */}
            <div className="space-y-2">
              <Label htmlFor="landSize" className="text-foreground">
                Land Size (acres)
              </Label>
              <Input
                id="landSize"
                type="number"
                placeholder="e.g., 5"
                min="0.1"
                step="0.1"
                value={landSize}
                onChange={(e) => setLandSize(e.target.value)}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Season */}
            <div className="space-y-2">
              <Label className="text-foreground">Season</Label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  {seasonOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !crop || !landSize || !season}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? "Predicting..." : "Predict Yield"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Expected Yield */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-amber-500/10">
                    <Sprout className="h-8 w-8 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Expected Yield
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {result.expected_yield}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Value */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Estimated Market Value
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {result.estimated_market_value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendation */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{result.recommendation}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
