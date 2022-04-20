import { bitQueryAuthHeaders } from './../../utils/env';
import axios from "axios";
import { bitQueryEndPoint } from "@utils";


const Api = () => {
    const callBitQuery = (graphQuery: string) => {

        const graphql = {
            query: graphQuery
        };

        /*  GET    JSON.stringify(graphql)*/

        let headers = {
            headers: bitQueryAuthHeaders
        }

        return axios.post(bitQueryEndPoint, graphql, headers)
    }

    const prettifyResonse = (response: any) =>{
        let newTokens: any = [];
        let newToken: any ={};
        let counter = 3;
        response.data.data.ethereum.arguments.forEach((arg: any, index: number) => {
            console.log(arg);
            if(arg.argument.name === 'pair'){
                newToken = {...newToken,  pairAddress: arg.reference.address}
            }
            if(arg.argument.name === 'token0'){
                newToken = {...newToken,  tokenAddress: arg.reference.address}
            }
            console.log(newToken, counter)
            if(--counter < 1){
                console.log(counter)
                newTokens[Math.floor(index/3)] = newToken
                counter = 3
                newToken = {}
            }
        })
        console.log("TOKENS", newTokens);
        return newTokens;
    }

    const getLatestUniPairs  = (limit: number) => {
        const body = `{
            ethereum {
                arguments(smartContractAddress: {is: "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f"}, smartContractEvent: {is: "PairCreated"}, options: {desc: "block.height", limit: ${limit}}) {
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
        }`;
        callBitQuery(body).then((response) => {
            return prettifyResonse(response);
        }).catch((error) => {
            console.error("ERROR ON getLatestUniPairs\b", error);
        })
    }


    const searchOnDS = (address: string) =>{
        const url = "https://api.dexscreener.io/latest/dex/tokens/" + address;
        return axios.get(url);
    }

    const searchOnDT = (address: string) =>{
        const url = "https://www.dextools.io/chain-ethereum/api/Uniswap/poolx?pairSelected=" + address;
        return axios.get(url);
    }

    return {getLatestUniPairs}

}

export default Api