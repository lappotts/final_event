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
import { RegistrationType } from '@/types/AuthTypes';

export const description = "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

export function RegisterForm() {
  // START OF BACKEND STUFF
const [data, setData] = useState<RegistrationType>({
  email: '',
  password: '',
  fName: '',
  lName: ''
});

// Use the signUp method from the AuthContext
const { signUp } = useAuth();
const router = useRouter();

const handleRegistration = async (e: any) => {
  e.preventDefault();
  try {
    await signUp(data.email, data.password, data.fName, data.lName);
    router.push('/');
  } catch (error: any) {
    console.log(error.message);
  }
  console.log(data);
};

// Destructure data from the data object
// const { ...allData } = data;

// Disable submit button until all fields are filled in
// const canSubmit = [...Object.values(allData)].every(Boolean);

// END OF BACKEND STUFF
  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
          onSubmit={handleRegistration}
          >
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="fName">First name</label>
                <input id="fName" placeholder="Max" required 
                onChange={(e: any) => {
									setData({
										...data,
										fName: e.target.value,
									});
								}}/>
              </div>
              <div className="grid gap-2">
                <label htmlFor="lName">Last name</label>
                <input id="lName" placeholder="Robinson" required 
                onChange={(e: any) => {
									setData({
										...data,
										lName: e.target.value,
									});
								}}/>
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
                onChange={(e: any) => {
									setData({
										...data,
										email: e.target.value,
									});
								}}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password"
              onChange={(e: any) => {
                setData({
                  ...data,
                  password: e.target.value,
                });
              }}/>
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with GitHub
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="./login" className="underline">
              Sign in
            </Link>
          </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
