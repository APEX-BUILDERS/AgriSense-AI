# Core configuration - loads environment variables
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OPENAI_API_KEY: str = "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"
    SUPABASE_URL: str = "https://iwpqsgmqpdwajekkjibs.supabase.co/"
    SUPABASE_ANON_KEY: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3cHFzZ21xcGR3YWpla2tqaWJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNDM0MjUsImV4cCI6MjA5MjYxOTQyNX0.7zf5Fd5DHJQgf08XxhxxnFrGuE340lxpNv8SeENpS9o"
    SUPABASE_SERVICE_KEY: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3cHFzZ21xcGR3YWpla2tqaWJzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzA0MzQyNSwiZXhwIjoyMDkyNjE5NDI1fQ.OHsmK6KejKHEjR-iB7jnRygzEL01dXPJL0jbCVYNmig"

    class Config:
        env_file = ".env"

# Global settings object used across the app
settings = Settings()