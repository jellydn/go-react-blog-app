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
export interface Time {}
export interface PostModel {
  id: string;
  createdAt: Time;
  updatedAt: Time;
  title: string;
  published: boolean;
  desc?: string;
  comments: CommentModel[];
  tags: TagModel[];
}
