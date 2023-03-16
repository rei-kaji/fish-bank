import {
  Button,
  Card,
  Col,
  Collapse,
  Container,
  Grid,
  Row,
  Text,
  Textarea,
  css,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";

const FishDetail = (props) => {
  const { id, name, url, img_src_set, meta, price } = props.fishInfo;
  console.log("meta", meta);

  const { addItem } = useShoppingCart();

  return (
    <Container css={{ mt: "$10" }}>
      <Grid.Container
        css={{ p: "$1" }}
        justify="space-between"
        alignItems="center"
      >
        <Grid
          xs={8}
          sm={8}
          alignItems="center"
          // justify={{ xs: "center", sm: "flex-start" }}
          container
        >
          <Text
            size={"$4xl"}
            b
            css={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Text>
        </Grid>
        <Grid
          xs={4}
          sm={2}
          justify="flex-end"
          css={{ pr: "0.5rem" }}
          alignItems="center"
        >
          <Text size={{ initial: "$xl", md: "$2xl" }} b>
            Price: ${price}
          </Text>
        </Grid>
        <Grid xs={12} sm={1} justify="flex-end" alignItems="center">
          <Button
            flat
            auto
            rounded
            color="secondary"
            onClick={() => addItem(props.fishInfo)}
          >
            <Text
              css={{ color: "inherit" }}
              size={{ initial: 12, md: 16 }}
              weight="bold"
              transform="uppercase"
            >
              Add Cart
            </Text>
          </Button>
        </Grid>
      </Grid.Container>

      <Grid xs={12} sm={12} key={id} css={{ mt: "$10" }}>
        <Card isPressable>
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              src={
                img_src_set["2x"]
                  ? img_src_set["2x"]
                  : "http://design-ec.com/d/e_others_50/l_e_others_501.png"
              }
              objectFit="cover"
              width="100%"
              height="40rem"
              alt={name}
            />
          </Card.Body>
          <Card.Divider />
          <Card.Body>
            <Collapse.Group accordion={false}>
              <Collapse title="BINOMIAL NAME">
                <Text size={"$6xl"}>{meta.binomial_name}</Text>
              </Collapse>
              <Collapse title="SCIENTIFIC CLASS">
                <Text size={"$6xl"}>
                  {meta.scientific_classification.class}
                </Text>
              </Collapse>
              <Collapse title="SPECIES">
                <Text size={"$6xl"}>
                  {meta.scientific_classification.species}
                </Text>
              </Collapse>
            </Collapse.Group>
          </Card.Body>
          <Card.Divider />
          <Card.Footer
            isBlurred
            css={{
              // position: "absolute",
              bgBlur: "#ffffff66",
              borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
              bottom: 0,
              zIndex: 1,
              justifyContent: "flex-end",
            }}
          >
            <Link
              href={url}
              target="_blank"
              style={{
                // border: "1px solid black",
                borderRadius: "5px",
                color: "white",
                textDecoration: "none",
                backgroundColor: "green",
                padding: "0.5rem",
              }}
            >
              Learn More
            </Link>
          </Card.Footer>
        </Card>
      </Grid>
    </Container>
  );
};

export default FishDetail;
