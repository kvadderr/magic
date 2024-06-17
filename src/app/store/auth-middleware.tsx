"use client"
import {steamLoginData} from "@/api/auth/types";
import {useEffect} from "react";
import {redirect} from "next/navigation";

export const AuthMiddleware = ({accessToken, refreshToken, user}: steamLoginData) => {
  useEffect(() => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    redirect("/");
  }, [])

  return (
    <div></div>
  )
}