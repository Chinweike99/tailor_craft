"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/_input";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { usePost } from "@/_utils/useApi";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
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

// Forgot password icon
const ForgotPasswordIcon = () => (
  <motion.div
    className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mx-auto mb-4"
    animate={{
      scale: [1, 1.05, 1],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      className="text-purple-600"
      animate={{
        y: [0, -2, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      }}
    >
      <path
        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 6L12 13L2 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M12 13L12 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  </motion.div>
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

export default function ForgotPasswordPage() {
  const router = useRouter();

  const { mutate: forgotPassword, isPending } = usePost<
    { message: string; response: any },
    { email: string }
  >(["auth"], "/auth/forgot-password");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    forgotPassword(values, {
      onSuccess: () => {
        router.push(`/reset-password?email=${encodeURIComponent(values.email)}`);
      },
      onError: (error: AxiosError) => {
        const message = (error.response?.data as { message?: string })?.message;
        form.setError("root", {
          message: message || "Failed to send reset email",
        });
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

        <motion.div variants={itemVariants} className="text-center">
          <ForgotPasswordIcon />
          <motion.h2
            className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Forgot your password?
          </motion.h2>
          <motion.p
            className="mt-2 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            No worries! Enter your email address and we&apos;ll send you a code to reset your password
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
                            placeholder="Enter your email address"
                            className="transition-all bg-white text-black  duration-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-xl"
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
                        Sending Reset Code...
                      </span>
                    ) : (
                      "Send Reset Code"
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
          Remember your password?{" "}
          <motion.button
            onClick={() => router.push("/login")}
            className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Back to Login
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}