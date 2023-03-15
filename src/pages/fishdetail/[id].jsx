import FishDetail from "../../components/FishDetail";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Error from "../../components/Error";
import Header from "../../components/Header";
import { Container } from "@nextui-org/react";

const index = () => {
  const [fishInfo, setFishInfo] = useState();
  const router = useRouter();
  const { id, fish } = router.query;

  useEffect(() => {
    // fishオブジェクトをパースする
    const data = fish ? JSON.parse(fish) : null;
    setFishInfo(data);
  }, []);
  // console.log("fishInfo", fishInfo);

  return (
    <>
      <Header />
      <Container>
        {fishInfo ? (
          <FishDetail fishInfo={fishInfo} />
        ) : (
          <>
            <Error />
          </>
        )}
        {/* <FishDetail fishInfo={fishInfo} /> */}
      </Container>
    </>
  );
};

export default index;
