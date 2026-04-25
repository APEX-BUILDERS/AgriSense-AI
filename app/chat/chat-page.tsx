"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { sendChatMessage } from "@/lib/api";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AgriSense AI assistant. Ask me anything about farming, crops, or agriculture. You can provide context about your crop, location, and season for more personalized advice.",
    },
  ]);
  const [input, setInput] = useState("");
  const [crop, setCrop] = useState("");
  const [location, setLocation] = useState("");
  const [season, setSeason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendChatMessage({
        message: input,
        crop: crop || null,
        location: location || null,
        season: season || null,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast.error("Failed to send message. Please check if the backend is running.");
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col pt-12 md:pt-0">
      {/* Context Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Input
          placeholder="Crop Name (e.g., wheat, rice)"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          className="bg-input border-border text-foreground placeholder:text-muted-foreground"
        />
        <Input
          placeholder="Location (e.g., Punjab, Maharashtra)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-input border-border text-foreground placeholder:text-muted-foreground"
        />
        <Select value={season} onValueChange={setSeason}>
          <SelectTrigger className="bg-input border-border text-foreground">
            <SelectValue placeholder="Select Season" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Kharif">Kharif (Monsoon)</SelectItem>
            <SelectItem value="Rabi">Rabi (Winter)</SelectItem>
            <SelectItem value="Zaid">Zaid (Summer)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Chat Window */}
      <Card className="flex-1 bg-card border-border overflow-hidden">
        <CardContent className="p-0 h-full">
          <div className="h-full overflow-y-auto p-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-secondary text-secondary-foreground rounded-bl-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground rounded-2xl rounded-bl-sm px-4 py-3">
                    <Spinner className="h-5 w-5" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input Area */}
      <div className="mt-4 flex gap-2">
        <Input
          placeholder="Ask me anything about farming..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
          className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
