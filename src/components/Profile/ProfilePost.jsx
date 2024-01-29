import {
    Avatar,
    Button,
    Divider,
    Flex,
    GridItem,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
    useDisclosure
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import Comment from "../Comment/Comment";
import PostFooter from "../Post/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";

function ProfilePost({ post }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const userProfile = useUserProfileStore(state => state.userProfile);
    const authUser = useAuthStore(state => state.user);

    return (
        <>
            <GridItem
                cursor={"pointer"}
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                position={"relative"}
                aspectRatio={1 / 1}
                onClick={onOpen}
            >
                <Flex
                    opacity={0}
                    _hover={{ opacity: 1 }}
                    position={"absolute"}
                    top={0} left={0} right={0} bottom={0}
                    bg={"blackAlpha.700"}
                    transition={"all 0.4s ease-in-out"}
                    zIndex={1}
                    justifyContent={"center"}
                >
                    <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
                        <Flex>
                            <AiFillHeart size={20} />
                            <Text fontWeight={"bold"} ml={2}>
                                {post.likes.length}
                            </Text>
                        </Flex>

                        <Flex>
                            <FaComment size={20} />
                            <Text fontWeight={"bold"} ml={2}>
                                {post.comments.length}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Image
                    src={post.imageURL} alt="profile post"
                    w={"100%"} h={"100%"}
                    objectFit={"cover"}
                />
            </GridItem>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered={true}
                size={{ base: "3xl", md: "5xl" }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody bg={"black"} pb={5}>
                        <Flex
                            gap={4}
                            mx={"auto"}
                            w={{ base: "90%", sm: "70%", md: "full" }}
                            maxH={"90vh"}
                            minH={"50vh"}
                        >
                            <Flex
                                borderRadius={4}
                                overflow={"hidden"}
                                border={"1px solid"}
                                borderColor={"whiteAlpha.300"}
                                flex={1.5}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Image src={post.imageURL} alt="post" />
                            </Flex>
                            <Flex
                                flex={1}
                                flexDirection={"column"}
                                px={10}
                                display={{ base: "none", md: "flex" }}
                            >
                                <Flex alignItems={"center"} justifyContent={"space-between"}>
                                    <Flex alignItems={"center"} gap={4}>
                                        <Avatar src={userProfile.profilePicURL} size={"sm"} name="Freetime" />
                                        <Text fontWeight={"bold"} fontSize={12}>
                                            {userProfile.fullname}
                                        </Text>
                                    </Flex>

                                    {authUser?.uid === userProfile.uid && (
                                        <Button
                                            bg={"transparent"}
                                            _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                                            borderRadius={4}
                                            p={1}
                                            size={"sm"}
                                        >
                                            <MdDelete size={20} cursor={"pointer"} />
                                        </Button>
                                    )}
                                </Flex>

                                <Divider my={4} bg={"gray.500"} />

                                <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                                    <Comment
                                        createdAt="1d ago"
                                        username="Freetime"
                                        profilePic="/profilepic.png"
                                        text="Dummy image from unsplash"
                                    />
                                    <Comment
                                        createdAt="12d ago"
                                        username="Abramov"
                                        profilePic="https://bit.ly/dan-abramov"
                                        text="Some comment 1"
                                    />
                                    <Comment
                                        createdAt="3h ago"
                                        username="Kenny"
                                        profilePic="https://bit.ly/kent-c-dodds"
                                        text="Some comment 2"
                                    />
                                </VStack>

                                <Divider my={4} bg={"gray.800"} />

                                <PostFooter isProfilePage={true} />
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ProfilePost;
