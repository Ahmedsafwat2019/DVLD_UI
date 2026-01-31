import React from "react";
import PayPalButton from "@/components/Paypal/Paypal";
import { api } from "@/lib/api";
const Contact = () => 
    {
        console.log("Rendering PayPal Button with items",api.paypal);
  return  <PayPalButton
  items={[
    {
      applicationID: "123",
      Name: "رخصة قيادة",
      Description: "رسوم رخصة قيادة",
      Price: 10.0,
      Quantity: 1,
    },
  ]}
  
/>
 ;
};
export default Contact;
