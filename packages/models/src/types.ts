/* Do not change, this code is generated from Golang structs */

export interface TagModel {
  id: string;
  createdAt: Time;
  name: string;
  posts: PostModel[];
}
export interface CommentModel {
  id: string;
  createdAt: Time;
  content: string;
  postID: string;
  post?: PostModel;
}
export interface UserModel {
  id: string;
  createdAt: Time;
  updatedAt: Time;
  username?: string;
  password: string;
  email: string;
  Post: PostModel[];
}
export interface Time {}
export interface PostModel {
  id: string;
  createdAt: Time;
  updatedAt: Time;
  title: string;
  published: boolean;
  desc?: string;
  userId: string;
  authorId?: UserModel;
  comments: CommentModel[];
  tags: TagModel[];
}
