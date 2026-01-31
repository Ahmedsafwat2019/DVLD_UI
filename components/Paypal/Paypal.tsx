"use client";

import { useEffect, useRef } from "react";
import { api } from "@/lib/api";

export default function PayPalButton({ items }: { items: any[] }) {
  const paypalRef = useRef<HTMLDivElement>(null);
  const isRendered = useRef(false);
 console.log("Rendering PayPal Button with items",api.paypal);
  useEffect(() => {
    if (typeof window === "undefined") return;

    const renderButtons = () => {
      if (!paypalRef.current || isRendered.current) return;

      if (!(window as any).paypal) return;

      isRendered.current = true; // 🔥 مهم جدًا

      (window as any).paypal
        .Buttons({
          createOrder: async () => {
            const res = await api.paypal.createOrder(items);
            const data = await res.json();
            return data.id;
          },
          onApprove: async (data: any) => {
            const res = await api.paypal.captureOrder(data.orderID);
            const captureData = await res.json();
            console.log(captureData);
            alert("تم الدفع بنجاح");
          },
        })
        .render(paypalRef.current);
    };

    // لو السكريبت موجود
    if ((window as any).paypal) {
      renderButtons();
      return;
    }

    // لو مش موجود
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ASCZysNOzSwr_va2wgyW0KiCxBKDJDaCjtpZpWuOUe-YJGkAadmqjPrIKWTm2-1RYJLTK8EGWHs3vE0N&currency=USD&intent=capture&components=buttons";
    script.async = true;
    script.onload = renderButtons;

    document.body.appendChild(script);
  }, []); // ⛔ مهم: dependency فاضية

  
  return <div ref={paypalRef} />;
}
