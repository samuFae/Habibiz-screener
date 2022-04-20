import React, { useEffect } from "react";
import axios from "axios";
import Api from "../../hooks/api/Api";

export const MainPage: React.FC = () => {

  const { getLatestUniPairs } = Api();

  const baseQuery = `{
    ethereum {
      arguments(smartContractAddress: {is: "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f"}, smartContractEvent: {is: "PairCreated"}, options: {desc: "block.height", limit: 9}) {
        block {
          height
        }
        argument {
          name
        }
        reference {
          address
        }
      }
    }
  }`

  const specificQuery = (address: string) =>`{
    ethereum {
      address(address: {is: "${address}"}) {
        annotation
        address
        smartContract {
          contractType
          currency {
            symbol
            name
            decimals
            tokenType
          }
        }
        balance
      }
    }
  }`

  const callGraph = (graphQuery: any) => {
    const endPoint = "https://graphql.bitquery.io";

    const graphql = {
      query: graphQuery
    };

   /*  ----- JSON.stringify(graphql) ----- */

    let headers = {headers: { "X-API-KEY": "BQYFuQ7CZXn8Lp8DtuGgotbm7ZpIGecy" }}

    return axios.post("https://graphql.bitquery.io", graphql, headers)
  }

  useEffect(() => {
    setInterval(() => {
      callGraph(baseQuery).then((response) => {
        console.clear();
        console.log(response.data.data.ethereum);
        response.data.data.ethereum.arguments.forEach((arg: any, index: any) => {
          callGraph(specificQuery(arg.reference.address)).then((response) => {
            if (response.data.data.ethereum.address[0].smartContract.currency.symbol !== "UNI-V2" && response.data.data.ethereum.address[0].smartContract.currency.symbol !== "WETH") {
              console.log("---------------------------------------------------------");
              console.log(index);
              console.log(response.data.data.ethereum.address[0].smartContract.currency.symbol);
              console.log(response.data.data.ethereum.address[0].smartContract.currency.name);
              console.log(response.data.data.ethereum.address[0].address);
              console.log("---------------------------------------------------------");
            }
          })
        })
      })
    }, 35000)
  }, []);

    /* useEffect(() => {
      getLatestUniPairs(9);
    }) */

  return <div>

    </div>
};
