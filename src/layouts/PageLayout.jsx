import { Box, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import Sidebar from "../components/Sidebar/Sidebar";
import { auth } from "../firebase/firebase";

function PageLayout({ children }) {
    const { pathname } = useLocation();
    const [user, loading, error] = useAuthState(auth);
    const canRenderSidebar = pathname !== "/auth" && user;

    return (
        <Flex>
            {canRenderSidebar ? (
                <Box w={{ base: "70px", md: "240px" }}>
                    <Sidebar />
                </Box>
            ) : null}

            <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}>
                {children}
            </Box>
        </Flex>
    );
}

export default PageLayout;
