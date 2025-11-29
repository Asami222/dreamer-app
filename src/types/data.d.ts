import { FileData } from 'src/components/molecules/InputImages'
import type {
   User as PrismaUser,
   Profile as PrismaProfile,
   Reward as PrismaReward,
   GotReward as PrismaGodReward,
   Todo as PrismaTodo 
} from "@prisma/client";

/*
export type ApiContext = {
  apiRootUrl: string
}
*/
export type Profile = PrismaProfile; 
// prisma の model User と型を同期する。スキーマを変更して npx prisma generate したときにも自動で反映される。
export type User = PrismaUser;

/* 手動の場合
export type User = {
  id: string
  username: string
  displayName: string
  password: string
  profileImageUrl: string
  dream: string
  limit: string
  numberOfStars: number
  createdAt?: string
}
*/

export type TodoFormData = {
  image?: FileData[]
  category: Category
  todo: string
  limit1?: number[]
  limit2?: number[]
  detail?: string
  description?: string
  starNum?: number
}
/*
export type Todo = {
  id: number
  todo: string
  category: Category
  limit?: number[]
  detail?: string
  description?: string
  imageUrl?: string
  blurDataUrl?: string
  starNum?: number
  owner: Pick<User, "id" | "username">
}
*/

type TodoUIModel = {
  id: string;
  title: string;
  category?: Category;
  star?: number;
  limit?: number[];
  detail?: string;
  description?: string;
  image?: string;
  createdAt?: string;
}

export type Todo = PrismaTodo;
/*
export type Reward = {
  id: number
  name: string
  starPieces: number
  imageUrl: string
  owner: Pick<User, "id" | "username">
}
*/
type RewardUIModel = {
  id: string;
  title: string;
  star?: number;
  image?: string;
  createdAt: string;
}

export type Reward = PrismaReward;
/*
export type GotReward = {
  id: number
  name: string
  starPieces: number
  time: string
  owner: Pick<User, "id" | "username">
}
*/

type GotRewardUIModel = {
  id: string;
  title: string;
  star?: number;
  createdAt: string;
}

export type GotReward = PrismaGodReward;

export type Category = 'all' | 'year' | 'month' | 'week' | 'day' | 'time'

export type Category2 =  'year' | 'month' | 'week' | 'day' | 'time'