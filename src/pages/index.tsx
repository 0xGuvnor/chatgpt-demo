import Login from "@/components/Login";
import { RootState } from "@/redux/store";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const secret = useSelector((state: RootState) => state.auth.secret);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) {
      router.push("/chat");
    }
  }, [isAuth]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center justify-center h-screen bg-gray-100">
        <Login />
      </main>
    </>
  );
}
