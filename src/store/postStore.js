import { create } from "zustand";

const usePostStore = create((set) => ({
    posts: [],
    //create post
    createPost: (post) => set(state => ({ posts: [post, ...state.posts] })),
    //delete post
    deletePost: (id) => set(state => ({ posts: state.posts.filter(post => post.id !== id) })),
    //add comment 
    addComment: (postId, comment) => set(state => ({
        posts: state.posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: [...post.comments, comment]
                }
            }
            return post;
        })
    })),
    //set posts
    setPosts: (posts) => set({ posts }),
}));

export default usePostStore;