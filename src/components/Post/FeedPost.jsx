import { Box, Flex, Image } from '@chakra-ui/react';

import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';

function FeedPost({ post }) {
    const { userProfile } = useGetUserProfileById(post.createdBy);

    return (
        <Flex flexDir={"column"} mb={5}>
            {userProfile && <PostHeader post={post} creatorProfile={userProfile} />}

            <Box my={2} borderRadius={4} overflow={"hidden"}>
                <Image src={post.imageURL} alt="post" />
            </Box>

            <PostFooter post={post} creatorProfile={userProfile} />
        </Flex>
    )
}

export default FeedPost
