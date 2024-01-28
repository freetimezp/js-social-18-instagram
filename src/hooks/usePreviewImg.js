import { useState } from "react";
import useShowToast from './useShowToast';


const usePreviewImg = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const showToast = useShowToast();
    const maxFileSizeInBytes = 2 * 1024 * 1024; // 2 mb

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        //check file type, its img or not
        if (file && file.type.startsWith("image/")) {
            //check img size
            if (file.size > maxFileSizeInBytes) {
                showToast("Error", "File size must be less than 2MB..", "error");
                setSelectedFile(null);
                return;
            }

            //set file if its img
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(reader.result);
            }
            reader.readAsDataURL(file);
        } else {
            showToast("Error", "Please select and upload am image file", "error");
            setSelectedFile(null);
        }
    };

    return { selectedFile, handleImageChange, setSelectedFile };
}

export default usePreviewImg;
