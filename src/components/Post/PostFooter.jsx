import { useRef, useState } from "react";
import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";

import { timeAgo } from '../../utils/timeAgo';
import CommentsModal from "../Modals/CommentsModal";

function PostFooter({ post, isProfilePage, creatorProfile }) {
    const authUser = useAuthStore(state => state.user);

    const { isCommenting, handlePostComment } = usePostComment();
    const [comment, setComment] = useState('');
    const { isLiked, likes, handleLikePost } = useLikePost(post);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const commentRef = useRef(null);

    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment);
        setComment('');
    };

    return (
        <Box mb={10} marginTop={"auto"}>
            <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={6}>
                <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
                    {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
                </Box>

                <Box
                    cursor={"pointer"}
                    fontSize={18}
                    onClick={() => commentRef.current.focus()}
                >
                    <CommentLogo />
                </Box>
            </Flex>

            <Text fontWeight={600} fontSize={"sm"}>
                {likes} likes
            </Text>

            {isProfilePage && (
                <Text fontSize={12} color={"gray.400"}>
                    Posted {timeAgo(post.createdAt)}
                </Text>
            )}

            {!isProfilePage && (
                <>
                    <Text fontSize={"sm"} fontWeight={700}>
                        {creatorProfile?.username}{" "}
                        <Text as="span" fontWeight={400}>
                            {post.caption}
                        </Text>
                    </Text>

                    {post.comments.length > 0 && (
                        <Text
                            fontSize={"sm"}
                            color={"gray"}
                            cursor={"pointer"}
                            onClick={onOpen}
                        >
                            View all {post.comments.length} comments
                        </Text>
                    )}

                    {isOpen
                        ? <CommentsModal post={post} isOpen={isOpen} onClose={onClose} />
                        : null}
                </>
            )}

            {authUser && (
                <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
                    <InputGroup>
                        <Input
                            variant={"flushed"}
                            placeholder={"Add a comment..."}
                            fontSize={14}
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            ref={commentRef}
                        />
                        <InputRightElement>
                            <Button
                                fontSize={14}
                                color={"blue.500"}
                                fontWeight={600}
                                cursor={"pointer"}
                                _hover={{ color: "white" }}
                                bg={"transparent"}
                                onClick={handleSubmitComment}
                                isLoading={isCommenting}
                            >
                                Post
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Flex>
            )}
        </Box>
    )
}

export default PostFooter
