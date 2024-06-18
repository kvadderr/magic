"use client";
import {useEffect} from "react";


export const CustomPageContent = ({html}: {html: string}) => {
  useEffect(() => {
    // @ts-ignore
    window.copy = function (text: string) {
      navigator.clipboard.writeText(text)
    }
  }, [])


  return <div className="question-text" dangerouslySetInnerHTML={{__html: html}}/>;
}