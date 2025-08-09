"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { logoutAction } from "@/action/user";

function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    const errorMessage = await logoutAction();

    if (!errorMessage) {
      router.push("/");
    } else {
      toast.error("Logout failed");
    }

    setLoading(false);
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      disabled={loading}
      className="w-24"
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log out"}
    </Button>
  );
}

export default LogoutButton;
