import Head from "next/head";
// import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import noImage from "../../public/assets/noimage.png";
import {
  Card,
  Grid,
  Row,
  Text,
  Pagination,
  Button,
  Switch,
  Col,
} from "@nextui-org/react";
import { Loading } from "@nextui-org/react";
import Header from "../components/Header";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
  const [fishes, setFishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [fishesPerPage] = useState(21);

  const { addItem } = useShoppingCart();

  useEffect(() => {
    setLoading(true);
    setFishes(data);
    setLoading(false);
  }, []);

  // Pagination
  const indexOfLastFishes = currentPage * fishesPerPage;
  const indexOfFirstFishes = indexOfLastFishes - fishesPerPage;

  const currentFishes = fishes.slice(indexOfFirstFishes, indexOfLastFishes);

  const paginate = (event) => {
    setCurrentPage(event);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!fishes.length) return <Loading />;
  return (
    <>
      <Head>
        <title>Fish Bank</title>
        <meta name="description" content="Fish Bank" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <main>
        <Header />
        <Suspense fallback={<Loading />}>
          <Grid.Container
            gap={2}
            justify="center"
            css={{ marginTop: "1.5rem" }}
          >
            {currentFishes.map((fish) => {
              const fishPrice = Math.round(Math.random() * 10000);
              fish.price = fishPrice;
              return (
                <Grid xs={12} md={6} lg={4} key={fish.id} justify="center">
                  <Card
                    isPressable
                    css={{
                      "&:hover": {
                        boxShadow: "2px 2px 5px gray",
                      },
                    }}
                  >
                    <Link
                      // Linking to dynamic paths using query string parameter
                      href={`/fishdetail/${encodeURIComponent(
                        fish.id
                      )}?fish=${JSON.stringify(fish)}`}
                      // and as path
                      as={`/fishdetail/${fish.id}`}
                      zindex={1}
                    >
                      <Card.Body
                        css={{
                          p: 0,
                        }}
                      >
                        <Card.Image
                          src={
                            fish.img_src_set["1.5x"]
                              ? fish.img_src_set["1.5x"]
                              : "http://design-ec.com/d/e_others_50/l_e_others_501.png"
                          }
                          objectFit="fill"
                          width={500}
                          height={200}
                          alt={fish.name}
                        />
                      </Card.Body>
                      <Card.Footer css={{ justifyItems: "flex-start" }}>
                        <Row
                          wrap="nowrap"
                          justify="space-between"
                          align="center"
                        >
                          <Text b>{fish.name}</Text>
                        </Row>
                      </Card.Footer>
                    </Link>
                    <Button
                      flat
                      auto
                      rounded
                      color="secondary"
                      css={{
                        zindex: 10,
                        position: "absolute",
                        right: 5,
                        bottom: 4.5,
                      }}
                      onClick={() => addItem(fish)}
                    >
                      <Text
                        css={{ color: "inherit" }}
                        size={12}
                        weight="bold"
                        transform="uppercase"
                      >
                        Add Cart
                      </Text>
                    </Button>
                  </Card>
                </Grid>
              );
            })}
          </Grid.Container>
          {/* </>
        )} */}
          <Grid.Container gap={2} justify="center">
            <Grid xs={12} justify="center">
              {fishes.length > 9 && (
                <Pagination
                  color="primary"
                  initialPage={1}
                  total={Math.ceil(fishes.length / fishesPerPage)}
                  page={currentPage}
                  onChange={paginate}
                  // size="large"
                />
              )}
            </Grid>
          </Grid.Container>
        </Suspense>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e8f200e498msheb2d1188ff51bc8p13cdc7jsne00b0cd50a98",
      "X-RapidAPI-Host": "fish-species.p.rapidapi.com",
    },
  };

  const response = await fetch(
    "https://fish-species.p.rapidapi.com/fish_api/fishes",
    options
  );
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
};
