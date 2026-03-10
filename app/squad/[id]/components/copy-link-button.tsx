"use client";

/**
 * CopyLinkButton component responsible for copying the current page URL to the clipboard.
 * When the button is clicked, it uses the Clipboard API to write the current URL to the user's clipboard and shows a success toast notification.
 */

import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function CopyLinkButton() {
  function handleCopy() {
    const url = window.location.href;

    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link kopiert!");
    });
  }

  return (
    <div
      className="flex flex-row gap-2 items-center cursor-pointer"
      onClick={handleCopy}
    >
      <Copy size={32} />
      <span>Link kopieren</span>
    </div>
  );
}
