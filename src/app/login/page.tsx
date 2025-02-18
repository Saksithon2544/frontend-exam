"use client";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useForm, SubmitHandler } from "react-hook-form";
import DarkModeToggle from "@/components/DarkModeToggle";
import Link from "next/link";

interface ILoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Invalid credentials");
      }

      Swal.fire({
        title: "Success!",
        text: "Login Successful!",
        icon: "success",
        confirmButtonText: "OK",
      });

      reset(); // Clear form after successful submission
      router.push("/dashboard");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error instanceof Error ? error.message : "Something went wrong",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-800 transition-all">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Login
        </h2>
       
        <div className="text-center mb-6">
          <div className="bg-gray-100 dark:bg-gray-600 p-4 rounded-lg shadow-lg mb-2">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Username: <span className="text-blue-600">admin@gmail.com</span>
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-600 p-4 rounded-lg shadow-lg">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Password: <span className="text-red-600">1234</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-md mt-4 hover:bg-green-700"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </div>
        <div className="mt-4 text-center">
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
}
