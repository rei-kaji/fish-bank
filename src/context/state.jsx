import { createContext, useContext } from "react";

const MyContext = createContext();

export function MyProvider({ children }) {
  const [sharedData, setSharedData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "e8f200e498msheb2d1188ff51bc8p13cdc7jsne00b0cd50a98",
          "X-RapidAPI-Host": "fish-species.p.rapidapi.com",
        },
      };

      const response = await fetch(
        "https://fish-species.p.rapidapi.com/fish_api/fishes",
        options
      );
      data = await response.json();
      setSharedData(data);
    };
    getData();
  }, []);

  return <MyContext.Provider value={sharedData}>{children}</MyContext.Provider>;
}

export function useMyContext() {
  return useContext(MyContext);
}

// export const getStaticProps = async () => {
//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "e8f200e498msheb2d1188ff51bc8p13cdc7jsne00b0cd50a98",
//       "X-RapidAPI-Host": "fish-species.p.rapidapi.com",
//     },
//   };

//   const response = await fetch(
//     "https://fish-species.p.rapidapi.com/fish_api/fishes",
//     options
//   );
//   const data = await response.json();
//   return {
//     props: {
//       data,
//     },
//   };
// };
