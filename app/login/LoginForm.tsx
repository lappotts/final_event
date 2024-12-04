"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/context/AuthContext';
import { LoginType } from '@/types/AuthTypes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export function LoginForm() {
  // State to manage form data
  const [data, setData] = useState<LoginType>({
    email: '',
    password: '',
  });

  // State for error message
  const [error, setError] = useState<string | null>(null);

  const { logIn } = useAuth(); // Get logIn function from context
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logIn(data.email, data.password);
      router.push('/'); // Redirect to dashboard on successful login
    } catch (error: any) {
      setError("Incorrect email or password"); // Set error message if login fails
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Welcome back to The Event center!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
                onChange={(e) => {
                  setData({
                    ...data,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <label htmlFor="password">Password</label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                required
                onChange={(e) => {
                  setData({
                    ...data,
                    password: e.target.value,
                  });
                }}
              />
            </div>

            {/* Display error message if login fails */}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="./register" className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
