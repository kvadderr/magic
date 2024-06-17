import { NextResponse } from 'next/server';
import {AuthApi} from "@/api/auth/auth.api";
import {AuthMiddleware} from "@/app/store/auth-middleware";

export default async function Store({searchParams}: { searchParams: any[string]}) {
  const id = searchParams["openid.identity"].split("https://steamcommunity.com/openid/id/")[1]
  const body = `openid.ns=${searchParams["openid.ns"]}&openid.mode=${searchParams["openid.mode"]}&openid.op_endpoint=${searchParams["openid.op_endpoint"]}&openid.claimed_id=${searchParams["openid.claimed_id"]}&openid.identity=${searchParams["openid.identity"]}&openid.return_to=${searchParams["openid.return_to"]}&openid.response_nonce=${searchParams["openid.response_nonce"]}&openid.assoc_handle=${searchParams["openid.assoc_handle"]}&openid.signed=${searchParams["openid.signed"]}&openid.sig=${searchParams["openid.sig"]}`
  const {data} = await AuthApi.steamLogin(id, body);

  return (
    <html>
    <body>
    <AuthMiddleware {...data}/>
    </body>
    </html>
  )
}