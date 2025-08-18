"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AxiosError } from "axios";
import { useAuthStore } from "@/store/authstore";
import { usePost } from "@/_utils/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/components/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Fashion-related SVG icons
const FashionIcon = () => (
  <motion.svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    className="text-purple-600"
    animate={{
      rotateY: [0, 360],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <motion.path
      d="M40 10 L50 25 L65 20 L60 35 L70 45 L55 50 L60 65 L45 60 L40 70 L35 60 L20 65 L25 50 L10 45 L20 35 L15 20 L30 25 Z"
      fill="currentColor"
      animate={{
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </motion.svg>
);

const FloatingElement = ({ delay = 0, children }: { delay?: number; children: React.ReactNode }) => (
  <motion.div
    animate={{
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    className="absolute opacity-20"
  >
    {children}
  </motion.div>
);

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setToken, setLoading } = useAuthStore();

  const { mutate: login, isPending } = usePost<any, { email: string; password: string }>(
    ["auth"],
    "/auth/login"
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    login(values, {
      onSuccess: (data) => {
        console.log("Login response:", data);

        setUser(data.result.user);
        setToken(data.result.tokens.accessToken);
        
        // Set the auth cookie that middleware expects
        document.cookie = `auth=${data.result.tokens.accessToken}; path=/; secure; samesite=strict`;
        
        router.push(
          data.result.user.role === "ADMIN" ? "/admin/dashboard" : "/client/dashboard"
        );
      },
      onError: (error: AxiosError) => {
        const message = (error.response?.data as { message?: string })?.message;
        form.setError("root", {
          message: message || "Login failed",
        });
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const formVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background floating elements */}
      <FloatingElement delay={0}>
        <div className="w-16 h-16 bg-purple-300 rounded-full blur-sm" />
      </FloatingElement>
      <FloatingElement delay={1}>
        <div className="w-12 h-12 bg-pink-300 rounded-lg blur-sm absolute top-20 right-20" />
      </FloatingElement>
      <FloatingElement delay={2}>
        <div className="w-20 h-8 bg-indigo-300 rounded-full blur-sm absolute bottom-32 left-16" />
      </FloatingElement>
      <FloatingElement delay={0.5}>
        <div className="w-8 h-8 bg-rose-300 rounded-full blur-sm absolute top-40 left-32" />
      </FloatingElement>
      <FloatingElement delay={1.5}>
        <div className="w-14 h-14 bg-violet-300 rounded-lg blur-sm absolute bottom-40 right-32" />
      </FloatingElement>

      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, purple 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, pink 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, indigo 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, purple 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="max-w-md w-full space-y-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Fashion icon animation */}
        <motion.div
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <FashionIcon />
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.h2
            className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Sign in to your account
          </motion.h2>
          <motion.p
            className="mt-2 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Welcome back to Tailor Craft
          </motion.p>
        </motion.div>

        <motion.div
          variants={formVariants}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20"
        >
          <Form {...form}>
            <motion.form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {form.formState.errors.root && (
                <motion.div
                  className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {form.formState.errors.root.message}
                </motion.div>
              )}

              <div className="space-y-4">
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Email address</FormLabel>
                        <FormControl>
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Input
                              type="email"
                              autoComplete="email"
                              placeholder="your@email.com"
                              className="transition-all duration-300 bg-white text-black  focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-xl"
                              {...field}
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                        <FormControl>
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Input
                              type="password"
                              autoComplete="current-password"
                              placeholder="••••••••"
                              className="transition-all bg-white text-black duration-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-xl"
                              {...field}
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </div>

              <motion.div
                className="flex items-center justify-between"
                variants={itemVariants}
              >
                <motion.div
                  className="flex items-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-all duration-200"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700 cursor-pointer"
                  >
                    Remember me
                  </label>
                </motion.div>

                <div className="text-sm">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Link
                      href="/forgot-password"
                      className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
                    >
                      Forgot your password?
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 transform hover:shadow-xl"
                    disabled={isPending || form.formState.isSubmitting}
                  >
                    {isPending || form.formState.isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <motion.svg
                          className="-ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </motion.svg>
                        Signing in...
                      </span>
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.form>
          </Form>
        </motion.div>

        <motion.div
          className="text-center text-sm text-gray-600"
          variants={itemVariants}
        >
          Don&apos;t have an account?{" "}
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link
              href="/register"
              className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
            >
              Sign up
            </Link>
            <Link
              href="/"
              className="font-medium ml-5 underline text-purple-600 hover:text-purple-500 transition-colors duration-200"
            >
              back to home page
            </Link>

          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}