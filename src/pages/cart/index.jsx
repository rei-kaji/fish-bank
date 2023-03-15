import Header from "../../components/Header";
import { Button, Container, Table, Text, User } from "@nextui-org/react";
import React from "react";
import Router from "next/router";

import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
// import Image from "next/image";
import { DeleteIcon } from "../../components/Icon/DeleteIcon";
import Link from "next/link";

const index = () => {
  const { cartDetails, removeItem, redirectToCheckout } = useShoppingCart();

  return (
    <>
      <Header />

      <Container gap={2}>
        <Text size={"x-large"}>Your Cart</Text>
        <>
          <Table
            striped
            sticked
            aria-label=" static striped collection table"
            // selectionMode="multiple"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <Table.Header>
              <Table.Column>NAME</Table.Column>
              <Table.Column>PRICE</Table.Column>
              <Table.Column>DELETE</Table.Column>
            </Table.Header>
            <Table.Body>
              {Object.entries(cartDetails).map((item) => (
                <Table.Row key={item[0]}>
                  <Table.Cell>
                    <User
                      squared
                      src={
                        item[1].img_src_set["2x"]
                          ? item[1].img_src_set["2x"]
                          : "http://design-ec.com/d/e_others_50/l_e_others_501.png"
                      }
                      name={
                        <Link
                          // Linking to dynamic paths using query string parameter
                          href={`/fishdetail/${encodeURIComponent(
                            item[0]
                          )}?fish=${JSON.stringify(item[1])}`}
                          // and as path
                          as={`/fishdetail/${item[0]}`}
                        >
                          {item[1].name}
                        </Link>
                      }
                      css={{ p: 0 }}
                      textAlign="left"
                    >
                      {item[1].meta.type_species}
                    </User>
                  </Table.Cell>
                  <Table.Cell>${item[1].price}</Table.Cell>
                  <Table.Cell>
                    <Button
                      auto
                      color="primary"
                      icon={<DeleteIcon fill="currentColor" />}
                      onClick={() => {
                        removeItem(item[0]);
                      }}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </>
        <Container
          css={{ mt: "2rem", display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            onClick={() => {
              Router.push("/checkout");
            }}
          >
            Check Out
          </Button>
        </Container>
      </Container>
    </>
  );
};

export default index;
