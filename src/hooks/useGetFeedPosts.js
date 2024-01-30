import { useEffect, useState } from "react";
import usePostStore from '../store/postStore';
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";


const useGetFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { posts, setPosts } = usePostStore();
    const authUser = useAuthStore(state => state.user);
    const { setUserProfile } = useUserProfileStore();

    const showToast = useShowToast();

    useEffect(() => {
        const getFeedPosts = async () => {
            if (isLoading) return;
            setIsLoading(true);

            if (authUser.following.length === 0) {
                setIsLoading(false);
                setPosts([]);
                return;
            }

            let arrayPosts = [];
            arrayPosts = authUser.following;
            arrayPosts.push(authUser.uid);

            const q = query(collection(firestore, "posts"), where("createdBy", "in", arrayPosts));

            try {
                const querySnapshot = await getDocs(q);
                const feedPosts = [];

                querySnapshot.forEach(doc => {
                    feedPosts.push({ id: doc.id, ...doc.data() })
                });

                feedPosts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(feedPosts);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        if (authUser) getFeedPosts();
    }, [authUser, showToast, setPosts, setUserProfile]);

    return { posts, isLoading };
}

export default useGetFeedPosts;
