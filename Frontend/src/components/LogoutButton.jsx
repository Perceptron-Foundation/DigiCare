import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <>
        <button
          className="bg-indigo-500 text-black px-6 py-2 rounded-2xl transition-colors duration-300 btn btn-primary logoutBtn text-xl pl-5 hover:text-red-600 cursor-pointer rounded-full "
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Logout
        </button>
        <br />
      </>
    );
  }
};

export default LogoutButton;