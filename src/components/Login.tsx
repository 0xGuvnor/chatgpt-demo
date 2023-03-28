import { usePostLoginMutation, usePostSignUpMutation } from "@/redux/api";
import { login } from "@/redux/auth/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();
  const dispatch = useDispatch();

  const handleLogin = () => {
    triggerLogin({ username, password });
  };

  const handleSignUp = () => {
    triggerSignUp({ username, password });
  };

  useEffect(() => {
    if (resultLogin.data?.response) {
      dispatch(
        login({
          user: username,
          secret: password,
        })
      );
    }
  }, [resultLogin.data]);

  return (
    <div className="-mt-[10rem] flex flex-col">
      <div>
        <h2 className="text-2xl font-extrabold">ChatGPT App</h2>
        <p
          onClick={() => setIsRegistered((prev) => !prev)}
          className="text-sm text-teal-600 underline cursor-pointer hover:text-teal-900"
        >
          {isRegistered ? "Already a user?" : "Are you a new user?"}
        </p>

        <div className="flex flex-col mt-4 space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 bg-gray-300 rounded outline-none placeholder:text-sm placeholder:text-slate-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 bg-gray-300 rounded outline-none placeholder:text-sm placeholder:text-slate-500"
          />
        </div>

        <div className="flex justify-end mt-2">
          {isRegistered ? (
            <button
              onClick={handleSignUp}
              className="px-4 py-2 text-sm text-white transition-colors duration-300 ease-in-out rounded-md bg-slate-700 hover:text-black hover:bg-slate-400"
            >
              Register
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="px-4 py-2 text-sm text-white transition-colors duration-300 ease-in-out rounded-md bg-slate-700 hover:text-black hover:bg-slate-400"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
