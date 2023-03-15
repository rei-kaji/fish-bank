import Header from "../../components/Header";
import React, { useState } from "react";
import { Input, Button, Loading } from "@nextui-org/react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { useRouter } from "next/router";

const index = () => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [loading, setLoading] = useState(false);

  const { clearCart } = useShoppingCart();

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    alert("Thank you for buying fishes!");
    clearCart();
    router.push("/");
  };

  return (
    <>
      <Header />
      {loading ? (
        <Loading
          size="xl"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5rem",
          }}
        />
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              margin: "2rem auto",
              gap: "2rem",
            }}
          >
            <Input
              label="Name"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Card Number"
              value={cardNumber}
              type="number"
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            <Input
              label="Expiration Date"
              labelLeft="MM/YY"
              type="text"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              required
            />
            <Input
              label="Security Code"
              value={securityCode}
              type="number"
              onChange={(e) => setSecurityCode(e.target.value)}
              required
            />
            <Button type="submit">Check Out</Button>
          </form>
        </>
      )}
    </>
  );
};

export default index;
