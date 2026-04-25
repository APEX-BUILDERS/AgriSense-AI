"use client";

import { useState, useCallback } from "react";
import { Upload, AlertTriangle, CheckCircle, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { detectDisease, type DiseaseDetectionResponse } from "@/lib/api";

export default function DiseasePage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiseaseDetectionResponse | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDetect = async () => {
    if (!file) return;

    setIsLoading(true);
    try {
      const response = await detectDisease(file);
      setResult(response);
    } catch (error) {
      toast.error("Failed to detect disease. Please check if the backend is running.");
      console.error("Disease detection error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isHealthy = result?.disease.toLowerCase() === "healthy" || 
                    result?.disease.toLowerCase() === "no disease detected";

  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Leaf className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Crop Disease Detector
        </h1>
      </div>

      {/* Upload Area */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-colors cursor-pointer ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) handleFile(selectedFile);
              }}
            />
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">
              Drop your crop photo here or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Supports JPG, PNG, WebP images
            </p>
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-6 flex flex-col items-center">
              <img
                src={preview}
                alt="Crop preview"
                className="max-h-64 rounded-lg border border-border"
              />
              <Button
                onClick={handleDetect}
                disabled={isLoading}
                className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? "Detecting..." : "Detect Disease"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card className="bg-card border-border">
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-16 w-full" />
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && !isLoading && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isHealthy ? (
                <CheckCircle className="h-6 w-6 text-primary" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-destructive" />
              )}
              <span
                className={`text-2xl ${
                  isHealthy ? "text-primary" : "text-destructive"
                }`}
              >
                {result.disease}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Confidence Badge */}
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Confidence:</span>
              <Badge
                variant="secondary"
                className="bg-primary/20 text-primary border-primary/30"
              >
                {result.confidence}
              </Badge>
            </div>

            {/* Treatment Steps */}
            {result.treatment && result.treatment.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">
                  Treatment Steps
                </h3>
                <ol className="list-decimal list-inside space-y-2">
                  {result.treatment.map((step, index) => (
                    <li key={index} className="text-muted-foreground">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Immediate Action */}
            {result.immediate_action && (
              <Alert
                className={`${
                  isHealthy
                    ? "border-primary/30 bg-primary/10"
                    : "border-destructive/30 bg-destructive/10"
                }`}
              >
                <AlertTriangle
                  className={`h-4 w-4 ${
                    isHealthy ? "text-primary" : "text-destructive"
                  }`}
                />
                <AlertTitle
                  className={isHealthy ? "text-primary" : "text-destructive"}
                >
                  Immediate Action
                </AlertTitle>
                <AlertDescription className="text-muted-foreground">
                  {result.immediate_action}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
