import type { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "../components/Layout";
import { LogoutIcon } from "@heroicons/react/solid";
import { UserInfo } from "../components/userInfo";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";

const Dashboard: NextPage = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const logout = async () => {
    queryClient.removeQueries(["tasks"]);
    queryClient.removeQueries(["user"]);
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    push("/");
  };
  return (
    <Layout title="Task Board">
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={logout}
      />
      <UserInfo />
      <TaskForm />
      <TaskList />
    </Layout>
  );
};

export default Dashboard;
