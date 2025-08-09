"use client";

import * as React from "react";
import { useToast } from "./use-toast";
import { Toast } from "./toast";
// import { Toast } from "@/src/_components/ui/toast";
// import { useToast } from "@/src/_components/ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <Toast>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <span>{title}</span>}
              {description && (
                // <Toast.Description>{description}</Toast.Description>
                <p>{description}</p>
              )}
            </div>
            {action}
            {/* <Toast.Close /> */}
          </Toast>
        );
      })}
      {/* <Toast.Viewport /> */}
    </Toast>
  );
}