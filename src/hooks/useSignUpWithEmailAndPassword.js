import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { auth, firestore } from "../firebase/firebase";
import { doc, setDoc } from 'firebase/firestore';
import useShowToast from './useShowToast';

function useSignUpWithEmailAndPassword() {
    const [
        createUserWithEmailAndPassword,
        loading,
        error
    ] = useCreateUserWithEmailAndPassword(auth);

    const showToast = useShowToast();

    const signup = async (inputs) => {
        //check empty fields
        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullname) {
            showToast("Error", "Please fill all fields..", "error");
            return;
        }

        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            //check if user is already exist
            if (!newUser && error) {
                showToast("Error", error.message, "error");
                return;
            }

            //create new user
            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    fullname: inputs.fullname,
                    bio: "",
                    profilePicURL: "",
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now()
                };

                //send user data to db firebase
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return { loading, error, signup };
}

export default useSignUpWithEmailAndPassword;
