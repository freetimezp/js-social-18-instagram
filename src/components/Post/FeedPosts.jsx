import { useEffect, useState } from 'react';
import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react";

import FeedPost from "./FeedPost";

function FeedPosts() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <Container maxW={"container.sm"} py={10} px={2}>
            {isLoading && [0, 1, 2, 3].map((_, idx) => (
                <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
                    <Flex gap={2}>
                        <SkeletonCircle size={10} />
                        <VStack gap={2} alignItems={"flex-start"}>
                            <Skeleton height="10px" w={"200px"} />
                            <Skeleton height="10px" w={"200px"} />
                        </VStack>
                    </Flex>

                    <Skeleton w={"full"}>
                        <Box h={"500px"}>contents wrapped</Box>
                    </Skeleton>
                </VStack>
            ))}

            {!isLoading && (
                <>
                    <FeedPost username="beautylady" img="/img1.jpg" avatar="/img1.jpg" />
                    <FeedPost username="freetime" img="/img2.jpg" avatar="/img2.jpg" />
                    <FeedPost username="dinnyk" img="/img3.jpg" avatar="/img3.jpg" />
                    <FeedPost username="vooody" img="/img4.jpg" avatar="/img4.jpg" />
                </>
            )}

        </Container>
    );
}

export default FeedPosts;
