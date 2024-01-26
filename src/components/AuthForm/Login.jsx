import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";

function Login() {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    return (
        <>
            <Input
                placeholder="Email"
                fontSize={14}
                type="email"
                size={"sm"}
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <Input
                placeholder="Password"
                fontSize={14}
                type="password"
                size={"sm"}
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />

            <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={14} >
                Log in
            </Button>
        </>
    );
}

export default Login;
