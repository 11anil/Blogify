import { useState } from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";

const Login = () => {
    const [isLoginState, setIsLoginState] = useState(true);

    return (
        <div className="flex items-center justify-center min-h-screen py-12">
            <div className="w-full flex flex-col items-center justify-center">
                {isLoginState ? (
                    <SignIn />
                ) : (
                    <SignUp />
                )}
                <div className="mt-4 text-center">
                    <p className="text-sm">
                        {isLoginState ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={() => setIsLoginState(!isLoginState)}
                            className="text-primary font-medium hover:underline ml-2"
                        >
                            {isLoginState ? "Sign Up" : "Login"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
