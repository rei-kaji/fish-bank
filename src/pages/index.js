import Head from "next/head";
// import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
// import FishDetail from "@/components/FishDetail";
import noImage from "../../public/assets/noimage.png";
import { Card, Grid, Row, Text } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [fishes, setFishes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://fish-species.p.rapidapi.com/fish_api/fishes",
        headers: {
          "X-RapidAPI-Key":
            "e8f200e498msheb2d1188ff51bc8p13cdc7jsne00b0cd50a98",
          "X-RapidAPI-Host": "fish-species.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);

      const data = response.data;
      setFishes(data);
      setLoading(false);
    };

    fishes.length == 0 && fetchData();
  }, []);
  return (
    <>
      <Head>
        <title>Fish Bank</title>
        <meta name="description" content="Fish Bank" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Fish Bank</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Grid.Container gap={2} justify="flex-start">
              {fishes.map((fish) => (
                <Grid xs={6} sm={3} key={fish.id}>
                  <Link
                    // Linking to dynamic paths using query string parameter
                    href={`/fishdetail/${encodeURIComponent(
                      fish.id
                    )}?fish=${JSON.stringify(fish)}`}
                    // and as path
                    as={`/fishdetail/${fish.id}`}
                  >
                    <Card isPressable>
                      <Card.Body css={{ p: 0 }}>
                        <Card.Image
                          src={
                            fish.img_src_set["1.5x"]
                              ? fish.img_src_set["1.5x"]
                              : noImage
                          }
                          objectFit="cover"
                          width="100%"
                          height={140}
                          alt={fish.name}
                        />
                      </Card.Body>
                      <Card.Footer css={{ justifyItems: "flex-start" }}>
                        <Row wrap="wrap" justify="space-between" align="center">
                          <Text b>{fish.name}</Text>
                          <Text
                            css={{
                              color: "$accents7",
                              fontWeight: "$semibold",
                              fontSize: "$sm",
                            }}
                          ></Text>
                        </Row>
                      </Card.Footer>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid.Container>
          </>
        )}
      </main>
    </>
  );
}
