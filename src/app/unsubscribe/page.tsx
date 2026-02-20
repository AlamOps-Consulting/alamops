"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type Status = "loading" | "success" | "error" | "missing_params";

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? "";

  const [status, setStatus] = useState<Status>("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!email || !token) {
      setStatus("missing_params");
      return;
    }

    async function doUnsubscribe() {
      try {
        const res = await fetch(
          `${API_URL}/newsletter/unsubscribe?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`
        );
        if (res.ok) {
          setStatus("success");
        } else {
          const body = await res.json().catch(() => ({}));
          setErrorMsg(body.error ?? "Could not process your request.");
          setStatus("error");
        }
      } catch {
        setErrorMsg("Network error. Please try again later.");
        setStatus("error");
      }
    }

    doUnsubscribe();
  }, [email, token]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {status === "loading" && (
          <>
            <h1 className="text-2xl font-semibold">Processing...</h1>
            <p className="text-muted-foreground">
              Please wait while we process your unsubscribe request.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="text-2xl font-semibold">Unsubscribed</h1>
            <p className="text-muted-foreground">
              <strong>{email}</strong> has been successfully removed from our
              newsletter. You will no longer receive emails from us.
            </p>
            <Button asChild variant="outline">
              <Link href="/">Back to home</Link>
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-semibold">Something went wrong</h1>
            <p className="text-muted-foreground">{errorMsg}</p>
            <Button asChild variant="outline">
              <Link href="/">Back to home</Link>
            </Button>
          </>
        )}

        {status === "missing_params" && (
          <>
            <h1 className="text-2xl font-semibold">Invalid link</h1>
            <p className="text-muted-foreground">
              This unsubscribe link appears to be invalid or incomplete.
            </p>
            <Button asChild variant="outline">
              <Link href="/">Back to home</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
