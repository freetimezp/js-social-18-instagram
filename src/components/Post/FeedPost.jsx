import { Box, Image } from '@chakra-ui/react';

import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

function FeedPost({ username, img, avatar }) {
    return (
        <>
            <PostHeader username={username} avatar={avatar} />

            <Box my={2} borderRadius={4} overflow={"hidden"}>
                <Image src={img} alt="post" />
            </Box>

            <PostFooter username={username} />
        </>
    )
}

export default FeedPost