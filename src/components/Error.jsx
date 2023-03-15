import React from "react";
import Link from "next/link";
import { Container, Text } from "@nextui-org/react";

const Error = () => {
  return (
    <Container>
      <Text h1>Somethig error happened... </Text>
      <Text h2>
        Please return to the
        <Link href={"/"}> Home</Link>
      </Text>
    </Container>
  );
};

export default Error;
