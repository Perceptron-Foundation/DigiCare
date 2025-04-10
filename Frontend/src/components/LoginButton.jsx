import { useAuth0 } from "@auth0/auth0-react";
 
const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    if (!isAuthenticated) {
        return (
          
            <button className=" bg-indigo-500 text-black px-6 py-2 rounded-2xl transition-colors duration-300 btn btn-primary text-xl pl-5 hover:text-gray-300 cursor-pointer rounded-full loginBtn"
            onClick={() => loginWithRedirect()}>
            Log In</button>
           
        );
    }
};
 
export default LoginButton;