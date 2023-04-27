import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { SERVER_URL } from "../utils/constants";

export const Store = createContext()

export const AistationProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState(null)
    const [data, setData] = useState([])
    // const metamask_url = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en'
    //-------WALLET CONNECTION-----------

    async function connectWallet() {
        try {
            if (window.ethereum) {
                const account = await window?.ethereum?.request({
                    method: "eth_requestAccounts"
                })
                setCurrentAccount(account[0])
                return (account[0])
            }
            else {
                // window.open(metamask_url, '_blank');
                alert("Wallet not found")
                throw new Error(Error)
            }

        } catch (err) {

            // alert(err.message)
            // console.log(err)
            return (err)

        }

    }

    // useEffect(() => {
    //     if (!ethereum) {
    //         if (window.confirm("Please install metamask wallet and select ethereum network")) {
    //             // window.location.href = metamask_url;
    //             // window.open(metamask_url, '_blank');
    //             document.getElementById("metamast_link").click()
    //         } else {
    //             // window.location.href = metamask_url;
    //         }
    //     }
    // }, [])

    async function isWalletConnected() {
        try {
            const account = await window?.ethereum?.request({
                method: "eth_accounts"
            })
            // console.log("HEHEH")
            if (account?.length > 0) {
                setCurrentAccount(account[0])
            }

        } catch (err) {
            console.log(err)
        }

    }

    async function walletDisconnected() {
        try {
            const account = await window?.ethereum?.request({
                method: "eth_accounts"
            })
            if (account?.length == 0) {
                setCurrentAccount(null)
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function handleAccountChange(address) {
        setCurrentAccount(address)


    }

    window?.ethereum?.on('accountsChanged', (address) => {
        handleAccountChange(address)
    })


    const changeNetwork = async () => {
        try {
            setLoading(true);
            if (!ethereum) throw new Error("No crypto wallet found");
            await ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [
                    {
                        // chainId: "0x5"
                        chainId: "0x7A69",
                    },
                ],
            });
            await connectWallet();
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err.message);
        }
    };

    useEffect(() => {
        isWalletConnected()
        walletDisconnected()
        if (currentAccount !== null) {
            console.log(currentAccount.toString(), "hh")
            addUser()
        }
    }, [currentAccount])

    //-------WALLET CONNECTION-----------



    //-------GET DATA PRESALE-----------

    async function getData() {

        // e.preventDefault();
        try {
            const res = await axios.get(
                `${SERVER_URL}/api/getPresale`,
            );
            if (res.status == 200) {
                let _data = await res.data
                setData(_data)
                return _data;
                // alert("added")
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        (async () => {
            await getData()
        })();
    }, [])
    //-------GET DATA PRESALE-----------


    //-------ADD USER-----------

    const addUser = async () => {
        try {
            const post = {
                Address: currentAccount
            }
            const res = await axios.post(
                `${SERVER_URL}/api/addUser`,
                post
            )
            // console.log(res.data.message)

        } catch (err) {
            console.log(err)

        }
    }



    return (
        <Store.Provider value={{ connectWallet, currentAccount, data, getData }}>
            {children}
        </Store.Provider >
    )
}