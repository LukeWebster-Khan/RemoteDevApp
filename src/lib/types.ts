export type TJobItem = {
  badgeLetters: string;
  company: string;
  daysAgo: number;
  id: number;
  relevanceScore: number;
  title: string;
};

export type TJobItemFull = TJobItem & {
  description: string;
  duration: string;
  salary: string;
  location: string;
  qualifications: string[];
  reviews: string[];
  companyURL: string;
  coverImgURL: string;
};

export type sortBy = "relevant" | "recent";

export type pageDirection = "next" | "previous";
