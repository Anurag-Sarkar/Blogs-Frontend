import type { InputHTMLAttributes } from "react";
import type store from "../store/store";

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "writer";
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  role?: "admin" | "writer";
}

export interface ApiError {
  message: string;
  statusCode: number;
  success: boolean;
  errors?: string;
}

export interface BlogCardProps {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  image?: string;
}

export interface CategoryNav {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
}

export type InputVariant = "default" | "outlined" | "filled" | "ghost";
export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  variant?: InputVariant;
  size?: InputSize;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
}

export interface LeftFilterProps {
  onTopicsChange?: (selectedTopics: Set<string>) => void;
  initialSelectedTopics?: string[];
  maxInitialTopics?: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parent?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: { data: T };
  message?: string;
}

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: { name: string; avatar?: string } | string;
  category: { name: string }[];
  image?: string;
  blockContent: Block[];
  createdAt: string;
  previewImage: string;
}

export interface BlogState {
  allBlogs: Blog[];
  selectedBlog: Blog | null;
  loading: boolean;
  error: string | null;
}

export interface BlockContentText {
  type: string;
  text: string;
  styles?: Record<string, unknown>;
}
export interface Block {
  id: string;
  type: string;
  props: {
    textColor?: string;
    backgroundColor?: string;
    textAlignment?: string;
    level?: number;
    name?: string;
    url?: string;
    caption?: string;
    language?: string;
    showPreview?: boolean;
  };
  content?: BlockContentText[];
  children?: Block[];
}

export interface LeftFilterProps {
  onTopicsChange?: (topics: Set<string>) => void;
  maxInitialTopics?: number;
  categories?: Category[];
  loading?: boolean;
}
