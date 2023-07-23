import Link from "@mui/material/Link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Router from "next/router";
import { useRouter } from "next/router";

import { useAccount } from "wagmi";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import builderGardenABI from "../abis/BuilderGardenABI.json";
const builderGardenAddress = "0x345d7C0c8564F44484456a2933eF23B8027a5919";
import builderVaultFactoryABI from "../abis/BuilderVaultFactoryABI.json";
const builderVaultFactoryAddress = "0xfFeF6415C437725820CfaDE5E857d0eF15D0c40b";

const Modal = ({ isOpenModal, close }) => {
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
                    <div className="text-var-brown font-feature-settings-0 text-4xl font-extrabold leading-9">
                      Attestation is submitted!
                    </div>
                    <Image
                      src="/builderV2.png"
                      width={250}
                      height={250}
                      alt="..."
                    />
                    <div className="text-lg mb-14">{"Level Up!🥳"}</div>
                    <div className="flex items-center justify-center">
                      <button
                        className="rounded-full text-center text-base font-bold leading-6 p-4 border-2 bg-green-800 text-white border-white"
                        onClick={() => close()}
                      >
                        Close
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

function Backers({ isFundingCompleted }) {
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div
            style={{
              height: "150px",
              overflowY: "scroll",
            }}
          >
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
                  <td class="whitespace-nowrap px-6 py-4">
                    0xaB69eeB3b759239dB2214eC8261a1D8B000cAE3c
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">2</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    0x9e5581730DAC59918487D862540e3654fA2C6F8C
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">3</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    0xaB69eeB3b759239dB2214eC8261a1D8B000cAE3c
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">4</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    0x9e5581730DAC59918487D862540e3654fA2C6F8C
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">0.05 ETH</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">5</td>
                  <td class="whitespace-nowrap px-6 py-4">
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

function Sponsors({ step }) {
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div
            style={{
              height: "150px",
              overflowY: "scroll",
            }}
          >
            <table class="min-w-full text-left text-sm font-light">
              <thead class="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" class="px-6 py-4">
                    #
                  </th>
                  <th scope="col" class="px-6 py-4">
                    Sponsor
                  </th>
                  <th scope="col" class="px-6 py-4">
                    Status
                  </th>
                </tr>
              </thead>
              {step >= 3 && (
                <tbody>
                  <tr class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                    <td class="whitespace-nowrap px-6 py-4">eas.eth</td>
                    <td class="whitespace-nowrap px-6 py-4">
                      {step === "3" ? "Waiting" : "Verified ✅"}
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Profile({ step }) {
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
      {step >= 3 ? (
        <Image src="/builderV2.png" width={160} height={160} alt="..." />
      ) : (
        <Image src="/builder.png" width={160} height={160} alt="..." />
      )}
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
      >
        0xMoncha
      </div>
      <div>Developer</div>
      <div>LV {step >= 3 ? "2" : "1"}</div>
    </div>
  );
}

// function Project({ project, projectId }) {
//   return (
//     <div
//       style={{
//         width: "370px",
//         marginLeft: "-15px",
//         paddingRight: "30px",
//         marginBottom: "50px",
//       }}
//     >
//       <Link href={{ pathname: `/projects/0` }}>
//         <div
//           className="px-8 py-4"
//           style={{
//             borderRadius: "28px",
//             background: "#ffffff",
//             paddingBottom: "25px",
//           }}
//         >
//           {/* <span
//             style={{
//               width: "100px",
//               overflow: "hidden",
//               color: "#38493C",
//               textOverflow: "ellipsis",
//               fontFamily: "Grillmaster Wide",
//               fontSize: "13px",
//               fontStyle: "normal",
//               fontWeight: "700",
//               lineHeight: "normal",
//               display: "flex",
//               padding: "6px 12px",
//               justifyContent: "center",
//               alignItems: "center",
//               gap: "12px",
//               borderRadius: "8px",
//               background: "var(--green-2, #62F08A)",
//             }}
//           >
//             2 Days Left
//           </span> */}
//           <div
//             className="mt-4 mb-2"
//             style={{
//               overflow: "hidden",
//               color: "#38493C",
//               textOverflow: "ellipsis",
//               fontFamily: "Grillmaster Wide",
//               fontSize: "22px",
//               fontStyle: "normal",
//               fontWeight: "700",
//               lineHeight: "normal",
//             }}
//           >
//             Unleashing Dreams
//           </div>

//           {/* <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5 mb-1 dark:bg-gray-300">
//             <div
//               className="bg-green-800 h-1.5 rounded-full dark:bg-green-800"
//               style={{
//                 width: "50%",
//               }}
//             ></div>
//           </div> */}
//           <div className="flex items-center mt-2">
//             <input
//               type="text"
//               id="unit"
//               className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//               required
//               value="0.00 / 1 ETH ♦️"
//               disabled
//             />
//           </div>

//           <div
//             className="flex items-center mt-4 p-4"
//             style={{
//               borderRadius: "16px",
//               border: "1px solid #CCDBD0",
//               background: "#F1F6F3",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexDirection: "column",
//               }}
//             >
//               <Image src="/builder.png" width={100} height={100} alt="..." />
//               <div
//                 style={{
//                   width: "50px",
//                   color: "#ffffff",
//                   fontFamily: "Grillmaster Wide",
//                   fontSize: "14px",
//                   fontStyle: "normal",
//                   fontWeight: "700",
//                   lineHeight: "normal",
//                   borderRadius: "50px",
//                   background: "#55e693",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   marginTop: "-10px",
//                   border: "1px solid var(--white, #FFF)",
//                   background:
//                     "var(--grad-1, linear-gradient(90deg, #62F08A 0%, #07A4C7 100%))",
//                 }}
//               >
//                 LV. 1
//               </div>
//             </div>
//             <div className="ml-4">
//               <div
//                 style={{
//                   color: "#38493C",
//                   fontFamily: "Grillmaster Wide",
//                   fontSize: "16px",
//                   fontStyle: "normal",
//                   fontWeight: "700",
//                   lineHeight: "normal",
//                 }}
//               >
//                 0xMoncha
//               </div>
//               <div
//                 className="mt-1"
//                 style={{
//                   color: "#38493C",
//                   fontFamily: "Grillmaster Wide",
//                   fontSize: "14px",
//                   fontStyle: "normal",
//                   fontWeight: "400",
//                   lineHeight: "normal",
//                 }}
//               >
//                 Developer
//               </div>
//               <div class="flex mt-1">
//                 <div
//                   style={{
//                     color: "#02C739",
//                     fontFamily: "Grillmaster Wide",
//                     fontSize: "14px",
//                     fontStyle: "normal",
//                     fontWeight: "400",
//                     lineHeight: "normal",
//                     marginRight: "7px",
//                   }}
//                 >
//                   #NFT
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* <div
//             className="mt-4 mb-1 p-4"
//             style={{
//               color: "var(--brown, #38493C)",
//               fontFamily: "Grillmaster Wide",
//               fontSize: "16px",
//               fontStyle: "normal",
//               fontWeight: "700",
//               lineHeight: "normal",
//               borderRadius: "14px",
//               background: "#FFF",
//               boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)",
//             }}
//           >
//             Backers
//             <div className="mt-2">
//               <div className="flex">
//                 {project.backers &&
//                   project.backers.map((backer) => (
//                     <div
//                       key={backer}
//                       style={{
//                         height: "48px",
//                         width: "48px",
//                         backgroundColor: "#bbb",
//                         borderRadius: "50%",
//                         display: "inline-block",
//                       }}
//                     />
//                   ))}
//               </div>
//               <div className="flex"></div>
//             </div>
//           </div> */}
//         </div>
//       </Link>
//     </div>
//   );
// }

export default function Inventory() {
  const [isOpenModal, setIsOpenModal] = useState(true);
  const [step, setStep] = useState("2");
  const [sponsor, setSponsor] = useState("");

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
    setIsOpenModal(isSuccess);

    if (isSuccess) {
      setStep("3");
      setTimeout(() => {
        setStep("4");
      }, 10000);
    }
  }, [isSuccess]);

  const attest = async () => {
    await write();
  };

  return (
    <div
      style={{
        background: "#f7ebe2",
        padding: "31px",
        minHeight: "100vh",
      }}
    >
      <Modal isOpenModal={isOpenModal} close={() => setIsOpenModal(false)} />
      <div className="flex justify-center max-w-5xl flex-col mx-auto rounded-xl">
        <div className="flex gap-12">
          {/* <div>
            <Image src="/verified.png" width={80} height={250} alt="..." />
          </div> */}
          <div style={{ flex: 1 }}>
            <Profile step={step} />
            <div className="flex justify-center items-center flex-col">
              <div
                className="flex justify-center items-center mt-44"
                style={{
                  height: "72px",
                  width: "72px",
                  backgroundColor: step >= "1" ? "#b4eb67" : "#bbb",
                  borderRadius: "50%",
                }}
              >
                Created
              </div>
              <div
                style={{
                  borderLeft: "6px solid #bbb",
                  borderLeft:
                    step >= "1" ? "6px solid #b4eb67" : "6px solid #bbb",
                  height: "100px",
                }}
              />
              <div
                className="flex justify-center items-center"
                style={{
                  height: "72px",
                  width: "72px",
                  backgroundColor: step >= "2" ? "#b4eb67" : "#bbb",
                  borderRadius: "50%",
                }}
              >
                Funded
              </div>
              <div
                style={{
                  borderLeft: "6px solid #bbb",
                  borderLeft:
                    step >= "2" ? "6px solid #b4eb67" : "6px solid #bbb",
                  height: "190px",
                }}
              />
              <div
                className="flex justify-center items-center"
                style={{
                  height: "72px",
                  width: "72px",
                  backgroundColor: step >= "3" ? "#b4eb67" : "#bbb",
                  borderRadius: "50%",
                }}
              >
                Attested
              </div>
              <div
                style={{
                  borderLeft: "6px solid #bbb",
                  borderLeft:
                    step >= "3" ? "6px solid #b4eb67" : "6px solid #bbb",
                  height: "220px",
                }}
              />
              <div
                className="flex justify-center items-center"
                style={{
                  height: "72px",
                  width: "72px",
                  backgroundColor: step >= "4" ? "#b4eb67" : "#bbb",
                  borderRadius: "50%",
                }}
              >
                Verified
              </div>
            </div>
          </div>
          <div style={{ flex: 1.5 }}>
            <div className="mt-18">
              <div className="text-var-brown font-feature-settings-0 text-xl font-extrabold leading-snug mb-2 my-6">
                Tokens
              </div>
              <label
                htmlFor="hacakthon"
                className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
              >
                ECR6551 Wallet
              </label>
              <input
                type="text"
                id="hacakthon"
                className="mb-4 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                value="0xAaF22F9533683A1e6D259333aff5ffA5C684bC0E"
                disabled
              />
              <label
                htmlFor="hacakthon"
                className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
              >
                ETH
              </label>
              <input
                type="text"
                id="hacakthon"
                className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                value="1 ♦️"
                disabled
              />
              <label
                htmlFor="hacakthon"
                className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
              >
                Builder Garden Token
              </label>
              <input
                type="text"
                id="hacakthon"
                className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                value="1"
                disabled
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center gap-x-10">
                <Image
                  src="/lens.svg"
                  width={40}
                  height={40}
                  alt="lens"
                  className="ml-[3px]"
                />
                <Link
                  href="https://www.lensfrens.xyz/buildergarden.lens"
                  underline="hover"
                >
                  buildergarden.lens
                </Link>
              </div>
              <div className="flex gap-x-[10px]">
                <Image
                  src="/poap.png"
                  width={45}
                  height={45}
                  alt="poap"
                  className="mr-[8px]"
                />
                <Image
                  src="https://assets.airstack.xyz/image/poap/100/145286/original_image.png"
                  width={45}
                  height={45}
                  alt="poap"
                />
                <Image
                  src="https://assets.airstack.xyz/image/poap/100/128312/original_image.aaf"
                  width={45}
                  height={45}
                  alt="poap"
                />
                <Image
                  src="https://assets.airstack.xyz/image/poap/100/143341/original_image.aaf"
                  width={45}
                  height={45}
                  alt="poap"
                />
                <Image
                  src="https://assets.airstack.xyz/image/poap/100/145280/original_image.gif"
                  width={45}
                  height={45}
                  alt="poap"
                />
                <Image
                  src="https://assets.airstack.xyz/image/poap/100/124804/original_image.gif"
                  width={45}
                  height={45}
                  alt="poap"
                />
                <Image
                  src="https://assets.airstack.xyz/image/poap/100/117921/original_image.gif"
                  width={45}
                  height={45}
                  alt="poap"
                />
                <Image
                  src="https://assets.airstack.xyz/image/poap/100/105558/original_image.gif"
                  width={45}
                  height={45}
                  alt="poap"
                />
                <Image
                  src="https://assets.airstack.xyz/image/poap/100/58080/original_image.gif"
                  width={45}
                  height={45}
                  alt="poap"
                />
              </div>
              <div className=" self-end flex items-center">
                <span>Import from</span>
                <Image
                  src="/airstack.png"
                  width={25}
                  height={25}
                  alt="airstack"
                />
              </div>
            </div>
            <div className="mt-10">
              <div>
                <div className="text-var-brown font-feature-settings-0 text-xl font-extrabold leading-snug mb-2">
                  My Project
                </div>
                <input
                  type="text"
                  id="hacakthon"
                  className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value="Unleashing Dreams"
                  disabled
                  // onClick={() => Router.replace("/projects/0")}
                />
              </div>
              <div className="h-48">
                <div className="text-var-brown font-feature-settings-0 text-xl font-extrabold leading-snug mt-24">
                  Attestations
                </div>
                <Backers />
              </div>

              <div className="h-48 mt-14">
                <div className="text-var-brown font-feature-settings-0 text-xl font-extrabold leading-snug mb-2 mt-14">
                  Submit Attestation
                </div>
                <label
                  htmlFor="title"
                  className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
                >
                  Showcase Link
                </label>
                {step >= 3 ? (
                  <div>
                    <input
                      type="text"
                      id="hacakthon"
                      className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      value="https://ethglobal.com/showcase/builder-garden"
                      disabled
                      // onClick={() => Router.replace("/projects/0")}
                    />
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      id="title"
                      className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      // onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                )}
                <label
                  htmlFor="title"
                  className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
                >
                  Got prize from
                </label>
                {step >= 3 ? (
                  <div>
                    <input
                      type="text"
                      id="hacakthon"
                      className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      value="Ethereum Attestation Service"
                      disabled
                      // onClick={() => Router.replace("/projects/0")}
                    />
                  </div>
                ) : (
                  <div>
                    <select
                      id="small"
                      className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      onChange={(e) => setSponsor(e.target.value)}
                    >
                      <option value="">Choose sponsor</option>
                      <option value="designer">Sismo</option>
                      <option value="eas">EAS</option>
                      <option value="designer">XMTP</option>
                      <option value="designer">Push Protocol</option>
                      <option value="designer">Air stack</option>
                    </select>
                    {/* <input
                      type="text"
                      id="title"
                      className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      // onChange={(e) => setTitle(e.target.value)}
                    /> */}
                    <div
                      className="rounded-full text-center text-base font-bold leading-6 p-4 border-2 bg-green-800 text-white border-white mt-4"
                      onClick={() => attest()}
                    >
                      Submit
                    </div>
                  </div>
                )}
              </div>
              <div className="text-var-brown font-feature-settings-0 text-xl font-extrabold leading-snug mt-28">
                Sponsors
              </div>
              <Sponsors step={step} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
