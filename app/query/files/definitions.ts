export type FileOwnerType = 'project' | 'user' | 'company';

export type File = {
  id: string;
  title: string;
  comments?: string;
  url: string;
  type: string;
  size: number;
  owner_type: FileOwnerType;
  owner_id: string;
  created_at: string;
};
