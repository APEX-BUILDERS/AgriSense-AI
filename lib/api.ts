// ============================================================
// AgriSense AI — API Client
// All calls go to your FastAPI backend
// Change API_BASE when you deploy to Railway
// ============================================================

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ─── Helper ──────────────────────────────────────────────────
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || `HTTP ${res.status}`);
  }
  return res.json();
}

// ─── CHAT ────────────────────────────────────────────────────
export interface ChatRequest {
  message: string;
  crop?: string | null;
  location?: string | null;
  season?: string | null;
}

export interface ChatResponse {
  reply: string;
  status: string;
}

export async function sendChatMessage(data: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<ChatResponse>(res);
}

// ─── DISEASE DETECTION ───────────────────────────────────────
export interface DiseaseDetectionResponse {
  disease: string;
  confidence: string;
  treatment: string[];
  immediate_action: string;
}

export async function detectDisease(file: File): Promise<DiseaseDetectionResponse> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_BASE}/api/disease/detect`, {
    method: "POST",
    body: formData,
  });
  return handleResponse<DiseaseDetectionResponse>(res);
}

// ─── IRRIGATION ──────────────────────────────────────────────
export interface IrrigationRequest {
  crop: string;
  soil_moisture: number;
  weather: string;
}

export interface IrrigationResponse {
  water_now: boolean;
  recommended_water_liters: number;
  advice: string;
}

export async function getIrrigationRecommendation(
  data: IrrigationRequest
): Promise<IrrigationResponse> {
  const res = await fetch(`${API_BASE}/api/irrigation/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<IrrigationResponse>(res);
}

// ─── YIELD PREDICTION ────────────────────────────────────────
export interface YieldRequest {
  crop: string;
  land_size: number;
  season: string;
}

export interface YieldResponse {
  expected_yield: string;
  estimated_market_value: string;
  recommendation: string;
}

export async function predictYield(data: YieldRequest): Promise<YieldResponse> {
  const res = await fetch(`${API_BASE}/api/yield/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<YieldResponse>(res);
}

// ─── RECOMMENDATIONS ─────────────────────────────────────────
export interface RecommendationResponse {
  crop: string;
  irrigation: string;
  fertilizer: string;
  seasonal_tips: string;
}

export async function getRecommendations(
  crop: string
): Promise<RecommendationResponse> {
  const res = await fetch(
    `${API_BASE}/api/recommendations?crop=${encodeURIComponent(crop)}`
  );
  return handleResponse<RecommendationResponse>(res);
}
