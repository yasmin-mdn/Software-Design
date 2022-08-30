export interface CommentDto {
  _id: string;
  user: string;
  text: string;
  parentComment?: string;
  replies?: CommentDto[];
  createdAt?: string;
}
