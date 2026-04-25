"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Leaf,
  Droplets,
  TrendingUp,
  ArrowRight,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const stats = [
  {
    title: "AI Chats Today",
    value: "24",
    icon: MessageSquare,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    title: "Diseases Detected",
    value: "3",
    icon: Leaf,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
  },
  {
    title: "Irrigation Alerts",
    value: "7",
    icon: Droplets,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
  },
  {
    title: "Yield Predictions",
    value: "12",
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const quickActions = [
  {
    href: "/chat",
    label: "Start AI Chat",
    icon: MessageSquare,
    description: "Get farming advice from AI",
  },
  {
    href: "/disease",
    label: "Detect Disease",
    icon: Leaf,
    description: "Upload crop photos for analysis",
  },
  {
    href: "/irrigation",
    label: "Irrigation Advice",
    icon: Droplets,
    description: "Get smart watering recommendations",
  },
  {
    href: "/yield",
    label: "Predict Yield",
    icon: TrendingUp,
    description: "Estimate harvest and market value",
  },
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial connection to backend
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">
            Connecting to AgriSense backend...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-12 md:pt-0">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-primary/20 to-primary/5 border-primary/30">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
                Welcome to AgriSense AI
              </h1>
              <p className="text-muted-foreground mt-2 text-pretty">
                Smart Farming Powered by AI — Your intelligent companion for
                crop management, disease detection, and yield optimization.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href}>
                <Card className="bg-card border-border hover:border-primary/50 hover:bg-card/80 transition-all cursor-pointer h-full group">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {action.label}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {action.description}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary group-hover:translate-x-1 transition-transform"
                    >
                      Get Started <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
