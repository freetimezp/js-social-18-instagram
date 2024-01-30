import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import useFollowUser from '../../hooks/useFollowUser';

function PostHeader({ post, creatorProfile }) {
    const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(post.createdBy);

    return (
        <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"full"}
            my={2}
        >
            <Flex alignItems={"center"} gap={2}>
                {creatorProfile ? (
                    <Link to={`/${creatorProfile.username}`}>
                        <Avatar src={creatorProfile.profilePicURL} alt="user" size={"sm"} />
                    </Link>
                ) : (
                    <SkeletonCircle size={10} />
                )}
                <Flex fontSize={12} fontWeight={"bold"} gap="2" _hover={{ color: "blue.200" }}>
                    {creatorProfile ? (
                        <>
                            <Link to={`/${creatorProfile.username}`}>
                                {creatorProfile.username}
                            </Link>
                            <Box color={"gray.500"}>
                                &#x2022; 1w
                            </Box>
                        </>
                    ) : (
                        <Skeleton w={"100px"} h={"10px"} />
                    )}

                </Flex>
            </Flex>

            <Box cursor={"pointer"}>
                <Button
                    size={"xs"}
                    bg={"transparent"}
                    fontSize={12}
                    color={"blue.500"}
                    fontWeight={"bold"}
                    _hover={{ color: "white" }}
                    transition={"0.4s ease-in-out"}
                    onClick={handleFollowUser}
                    isLoading={isUpdating}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            </Box>
        </Flex>
    )
}

export default PostHeader
