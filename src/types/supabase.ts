export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          created_at: string
          name: string
          price: number
          description: string
          category: string
          image_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          price: number
          description: string
          category: string
          image_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          price?: number
          description?: string
          category?: string
          image_url?: string | null
        }
      },
      settings: {
        Row: {
          id: number;
          shop_name: string;
          contact_email: string;
          whatsapp: string;
          address: string;
          language: string;
        };
        Insert: {
          shop_name: string;
          contact_email: string;
          whatsapp: string;
          address: string;
          language: string;
        };
        Update: {
          shop_name?: string;
          contact_email?: string;
          whatsapp?: string;
          address?: string;
          language?: string;
        };
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}