import { create } from "zustand";

const usePostStore = create((set) => ({
    posts: [],
    //create post
    createPost: (post) => set(state => ({ posts: [post, ...state.posts] })),
    //delete post
    //comment 
    //set posts
    setPosts: (posts) => set({ posts }),
}));

export default usePostStore;