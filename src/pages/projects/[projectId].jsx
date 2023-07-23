import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { readContract, readContracts } from "@wagmi/core";
import Router from "next/router";
import * as PushAPI from "@pushprotocol/restapi";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import Image from "next/image";
import { ethers } from "ethers";
import { EmbedSDK } from "@pushprotocol/uiembed";
import BuilderVaultImplABI from "../abis/BuilderVaultImplABI.json";
const builderGardenContract = "0x345d7C0c8564F44484456a2933eF23B8027a5919";
import builderVaultFactoryABI from "../abis/BuilderVaultFactoryABI.json";
const builderVaultFactoryAddress = "0xfFeF6415C437725820CfaDE5E857d0eF15D0c40b";

const Modal = ({ isOpenModal, setIsOpenModal, nickname, level, position }) => {
  return (
    <div>
      {isOpenModal && (
        <div>
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="p-4 flex items-center justify-center flex-col">
                    <div className="text-var-brown font-feature-settings-0 text-4xl font-extrabold leading-9 mt-4">
                      Congratulations!
                    </div>
                    <div>
                      <input
                        type="text"
                        id="unit"
                        className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-8"
                        required
                        value="0.05 / 1 ETH ♦️"
                        disabled
                      />
                    </div>
                    <div className="text-var-brown font-feature-settings-0 text-xl font-extrabold leading-snug mt-4 mb-16">
                      Your funding has been successful!
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        className="rounded-full text-center text-base font-bold leading-6 p-4 border-2 bg-green-800 text-white border-white"
                        onClick={() => setIsOpenModal(false)}
                        // onClick={() => alert(1)}
                      >
                        Got it!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ClaimModal = ({
  isOpenModal,
  setIsOpenModal,
  nickname,
  level,
  position,
}) => {
  return (
    <div>
      {isOpenModal && (
        <div>
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="p-4 flex items-center justify-center flex-col">
                    <div className="text-var-brown font-feature-settings-0 text-4xl font-extrabold leading-9 mt-4">
                      Congratulations!
                    </div>
                    <div>
                      <input
                        type="text"
                        id="unit"
                        className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-8"
                        required
                        value="1 ETH ♦️"
                        disabled
                      />
                    </div>
                    <div className="text-var-brown font-feature-settings-0 text-xl font-extrabold leading-snug mt-4 mb-16">
                      Your claim has been successful!
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        className="rounded-full text-center text-base font-bold leading-6 p-4 border-2 bg-green-800 text-white border-white"
                        // onClick={() => setIsOpenModal(false)}
                      >
                        Got it!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function Profile() {
  return (
    <div
      style={{
        marginTop: "16px",
        borderRadius: "28px",
        background: "#f7ebe2",
        boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)",
        borderRadius: "28px",
        border: "1px solid grey",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <Image src="/builder.png" width={100} height={100} alt="..." />
      <div
        style={{
          color: "var(--brown, #38493C)",
          fontFamily: "Grillmaster Wide",
          fontSize: "24px",
          fontStyle: "normal",
          fontWeight: "900",
          lineHeight: "normal",
          marginTop: "8px",
        }}
        className="cursor-pointer"
        onClick={() => Router.replace("/inventory")}
      >
        0xMoncha
      </div>
      <div>Developer</div>
      <div>LV 1</div>
    </div>
  );
}

function Funding({ backers, vaultContract, setIsModal }) {
  const [fund, setFund] = useState(0.05);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { address } = useAccount();

  const fundingConfig = {
    totalAmount: "1000000000000000000",
    deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    title: "Title1234",
  };

  const { config } = usePrepareContractWrite({
    address: builderVaultFactoryAddress,
    abi: builderVaultFactoryABI,
    functionName: "deployVault",
    args: [fundingConfig],
  });
  const { data, write } = useContractWrite(config);

  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) setIsOpenModal(isSuccess);
  }, [isSuccess]);

  const fundNow = async () => {
    await write();
  };

  const add = () => {
    setFund((parseFloat(fund) + 0.05).toFixed(2));
  };

  const sub = () => {
    if (fund <= 0.05) return;
    setFund((fund - 0.05).toFixed(2));
  };
  return (
    <div>
      {address !== "0x501d30F946b61CCd1cee4182caeAa2af61580ee4" || (
        <div
          style={{
            marginTop: "16px",
            borderRadius: "28px",
            background: "#f7ebe2",
            boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)",
            borderRadius: "28px",
            border: "1px solid grey",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
          <div
            style={{
              color: "var(--brown, #38493C)",
              fontFamily: "Grillmaster Wide",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: "900",
              lineHeight: "normal",
            }}
          >
            Participate Fund
          </div>
          <div
            className="flex mt-4 mb-4"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <button
              style={{
                color: "var(--brown, #38493C)",
                textAlign: "center",
                fontFamily: "Grillmaster Wide",
                fontSize: "38px",
                fontStyle: "normal",
                fontWeight: "900",
                lineHeight: "normal",
                borderRadius: "20px",
                border: "1px solid #CCDBD0",
                padding: "10px 24px",
              }}
              onClick={() => sub()}
            >
              -
            </button>
            <span
              style={{
                color: "#38493C",
                textAlign: "center",
                fontFamily: "Grillmaster Wide",
                fontSize: "28px",
                fontStyle: "normal",
                fontWeight: "900",
                lineHeight: "normal",
                paddingLeft: "24px",
                paddingRight: "24px",
              }}
            >
              {fund} ETH
            </span>
            <button
              style={{
                color: "var(--brown, #38493C)",
                textAlign: "center",
                fontFamily: "Grillmaster Wide",
                fontSize: "38px",
                fontStyle: "normal",
                fontWeight: "900",
                lineHeight: "normal",
                borderRadius: "20px",
                border: "1px solid #CCDBD0",
                padding: "10px 24px",
              }}
              onClick={() => add()}
            >
              +
            </button>
          </div>
          <button
            style={{
              display: "flex",
              height: "60px",
              padding: "11px 24px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              alignSelf: "stretch",
              color: "#FFF",
              textAlign: "center",
              fontFamily: "Grillmaster Wide",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "18px",
              background: "#38493C",
              borderRadius: "50px",
            }}
            onClick={() => fundNow()}
          >
            Fund Now
          </button>
          {/* <div
        style={{
          width: "100%",
          marginTop: "16px",
        }}
      >
        <div
          style={{
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "20px",
            background: "rgba(204, 219, 208, 0.30)",
          }}
        >
          <div
            style={{
              color: "#38493C",
              fontFamily: "Grillmaster Wide",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "normal",
              marginBottom: "4px",
            }}
          >
            {backers?.length} Backers
          </div>
          <div
            style={{
              display: "flex",
              columnGap: "6px",
            }}
          >
            {backers &&
              backers.map((backer, index) => (
                <div
                  key={index}
                  style={{
                    height: "48px",
                    width: "48px",
                    backgroundColor: "#bbb",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
              ))}
          </div>
        </div>
      </div> */}
        </div>
      )}
    </div>
  );
}

function Backers({ isFundingCompleted }) {
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <div class="flex flex-col">
      <label
        htmlFor="unit"
        className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed mt-8"
      >
        Backers
      </label>
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full text-left text-sm font-light">
              <thead class="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" class="px-6 py-4">
                    #
                  </th>
                  <th scope="col" class="px-6 py-4">
                    Backer
                  </th>
                  <th scope="col" class="px-6 py-4">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                  <td
                    class="whitespace-nowrap px-6 py-4 cursor-pointer"
                    onClick={() => Router.replace("/backer")}
                  >
                    0xaB69eeB3b759239dB2214eC8261a1D8B000cAE3c
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">2</td>
                  <td
                    class="whitespace-nowrap px-6 py-4 cursor-pointer"
                    onClick={() => Router.replace("/backer")}
                  >
                    0x9e5581730DAC59918487D862540e3654fA2C6F8C
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">3</td>
                  <td
                    class="whitespace-nowrap px-6 py-4 cursor-pointer"
                    onClick={() => Router.replace("/backer")}
                  >
                    0xaB69eeB3b759239dB2214eC8261a1D8B000cAE3c
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">4</td>
                  <td
                    class="whitespace-nowrap px-6 py-4 cursor-pointer"
                    onClick={() => Router.replace("/backer")}
                  >
                    0x9e5581730DAC59918487D862540e3654fA2C6F8C
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">5</td>
                  <td class="whitespace-nowrap px-6 py-4" cursor-pointer>
                    0xaB69eeB3b759239dB2214eC8261a1D8B000cAE3c
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">6</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    0x9e5581730DAC59918487D862540e3654fA2C6F8C
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">7</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    0xaB69eeB3b759239dB2214eC8261a1D8B000cAE3c
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">8</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    0x9e5581730DAC59918487D862540e3654fA2C6F8C
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">9</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    0xaB69eeB3b759239dB2214eC8261a1D8B000cAE3c
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">10</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    0x9e5581730DAC59918487D862540e3654fA2C6F8C
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">11</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    0xaB69eeB3b759239dB2214eC8261a1D8B000cAE3c
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">12</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    0x9e5581730DAC59918487D862540e3654fA2C6F8C
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">13</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    0xaB69eeB3b759239dB2214eC8261a1D8B000cAE3c
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">14</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    0x9e5581730DAC59918487D862540e3654fA2C6F8C
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">15</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    0xaB69eeB3b759239dB2214eC8261a1D8B000cAE3c
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">16</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    0x9e5581730DAC59918487D862540e3654fA2C6F8C
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">17</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    0xaB69eeB3b759239dB2214eC8261a1D8B000cAE3c
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">18</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    0xaB69eeB3b759239dB2214eC8261a1D8B000cAE3c
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">19</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    0xaB69eeB3b759239dB2214eC8261a1D8B000cAE3c
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">20</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    0xaB69eeB3b759239dB2214eC8261a1D8B000cAE3c
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Claim({}) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const fundingConfig = {
    totalAmount: "1000000000000000000",
    deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    title: "Title1234",
  };

  const { config } = usePrepareContractWrite({
    address: builderVaultFactoryAddress,
    abi: builderVaultFactoryABI,
    functionName: "deployVault",
    args: [fundingConfig],
  });
  const { data, write } = useContractWrite(config);

  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) setIsOpenModal(isSuccess);
    // if (isSuccess) alert("Fund is completed!");
  }, [isSuccess]);

  return (
    <div
      style={{
        marginTop: "16px",
        borderRadius: "28px",
        background: "#f7ebe2",
        boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)",
        borderRadius: "28px",
        border: "1px solid grey",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <ClaimModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      <div
        style={{
          color: "var(--brown, #38493C)",
          fontFamily: "Grillmaster Wide",
          fontSize: "24px",
          fontStyle: "normal",
          fontWeight: "900",
          lineHeight: "normal",
          marginBottom: "16px",
        }}
      >
        Funding is completed! 🤘
      </div>
      <button
        style={{
          marginTop: "8px",
          display: "flex",
          height: "60px",
          padding: "11px 24px",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          alignSelf: "stretch",
          color: "#38493C",
          textAlign: "center",
          fontFamily: "Grillmaster Wide",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: "700",
          lineHeight: "18px",
          background: "#fff",
          borderRadius: "50px",
          border: "1px solid #38493C",
        }}
        onClick={() => write?.()}
      >
        Claim
      </button>
    </div>
  );
}

export default function Project() {
  const router = useRouter();
  const { projectId } = router.query;

  const { address, isConnected } = useAccount();

  const getFeed = async () => {
    const res = await PushAPI.user.getFeeds({
      user: "eip155:5:0xA29B144A449E414A472c60C7AAf1aaFfE329021D", // user address in CAIP
      env: "staging",
    });
    console.log("here", res);
  };

  useEffect(() => {
    if (address) {
      console.log("here", address);
      // 'your connected wallet address'
      EmbedSDK.init({
        headerText: "Unleashing Dreams", // optional
        targetID: "sdk-trigger-id", // mandatory
        appName: "FundMe", // mandatory
        user: `0xA29B144A449E414A472c60C7AAf1aaFfE329021D`, // mandatory
        chainId: 5, // mandatory
        viewOptions: {
          type: "sidebar", // optional [default: 'sidebar', 'modal']
          showUnreadIndicator: true, // optional
          unreadIndicatorColor: "#cc1919",
          unreadIndicatorPosition: "bottom-right",
        },
        theme: "light",
        onOpen: () => {
          console.log("-> client dApp onOpen callback");
        },
        onClose: () => {
          console.log("-> client dApp onClose callback");
        },
      });
    }

    return () => {
      EmbedSDK.cleanup();
    };
  }, [address]);

  // useEffect(() => {
  //   if (address) {
  //     EmbedSDK.init({
  //       headerText: "Hello DeFi", // optional
  //       targetID: "sdk-trigger-id", // mandatory
  //       appName: "FundMe", // mandatory
  //       user: address, // mandatory
  //       chainId: 5, // mandatory
  //       viewOptions: {
  //         type: "sidebar", // optional [default: 'sidebar', 'modal']
  //         showUnreadIndicator: true, // optional
  //         unreadIndicatorColor: "#cc1919",
  //         unreadIndicatorPosition: "top-right",
  //       },
  //       theme: "light",
  //       onOpen: () => {
  //         console.log("-> client dApp onOpen callback");
  //       },
  //       onClose: () => {
  //         console.log("-> client dApp onClose callback");
  //       },
  //     });
  //   }

  //   return () => {
  //     EmbedSDK.cleanup();
  //   };
  // }, [address]);

  return (
    <div
      style={{
        background: "#f7ebe2",
        padding: "31px",
        minHeight: "100vh",
      }}
    >
      <Modal />
      <div className="flex justify-center max-w-5xl flex-col mx-auto rounded-xl">
        <div className="flex justify-between">
          <div className="text-var-brown font-feature-settings-0 text-4xl font-extrabold leading-9 mb-4">
            Unleashing Dreams
          </div>
          <button id="sdk-trigger-id">
            <Image
              alt="push-protocol"
              src="/push-protocol.png"
              width={40}
              height={40}
            />
          </button>
          <div
            className="h-[50px] w-[50px] border-2"
            onClick={() => getFeed()}
          ></div>
        </div>

        <div className="flex gap-12">
          <div
            style={{
              flex: 1.6,
            }}
          >
            <label
              htmlFor="unit"
              className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
            >
              Builder
            </label>
            <input
              type="text"
              id="unit"
              className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
              required
              value="0xMoncha (0xb66ef21e98Df914409f5c638d6E3dAB8f093EB5A)"
              disabled
            />
            <label
              htmlFor="unit"
              className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
            >
              ERC6551 Wallet Address
            </label>
            <input
              type="text"
              id="unit"
              className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
              required
              value="0x1f9090aae28b8a3dceadf281b0f12828e676c326"
              disabled
            />
            <label
              htmlFor="unit"
              className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
            >
              Story
            </label>
            <textarea
              rows="10"
              id="unit"
              className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
              required
              value="In a small town, 0xMoncha, a passionate programmer, loved blockchain technology, especially Ethereum. When they learned about an Ethereum hackathon in another city, they wanted to go, but they had limited funds. So, 0xMoncha started a crowdfunding campaign with a heartfelt narrative about their passion for Ethereum and blockchain technology. The blockchain community responded generously, and 0xMoncha reached their funding goal and went to the hackathon. There, 0xMoncha met brilliant minds, collaborated on various Ethereum projects, and caught the attention of industry experts and potential employers. 0xMoncha realized the power of community and collective support, and this experience transformed their dreams into reality. Today, 0xMoncha is a successful blockchain developer and an active member of the Ethereum community, inspiring countless others to chase their passions and believe in the power of community and collective dreams."
              disabled
            />
            <label
              htmlFor="unit"
              className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
            >
              Funded
            </label>
            <input
              type="text"
              id="unit"
              className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              value={`${projectId === "1" ? "0 / 1 ETH ♦️" : "1 / 1 ETH ♦️"}`}
              disabled
            />
            {projectId === "0" ? <Backers /> : null}
          </div>
          <div className="flex-1 mt-2">
            <Profile />
            {projectId === "1" ? <Funding /> : <Claim />}
          </div>
        </div>
      </div>
    </div>
  );
}
