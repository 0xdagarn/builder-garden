import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { readContract, readContracts } from "@wagmi/core";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import Image from "next/image";
import { ethers } from "ethers";

import BuilderVaultImplABI from "../../../src/abis/BuilderVaultImplABI.json";
const builderGardenContract = "0x345d7C0c8564F44484456a2933eF23B8027a5919";

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
      >
        Sonny
      </div>
      <div>Full stack developer</div>
      <div>LV 1</div>
    </div>
  );
}

function Funding({ backers, vaultContract }) {
  const [fund, setFund] = useState(0.05);

  const fundNow = async () => {
    if (vaultContract) {
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const BuilderVault = new ethers.Contract(
          vaultContract,
          BuilderVaultImplABI,
          signer
        );
        const unit = Math.ceil(fund / 0.05);
        console.log(
          unit,
          ethers.utils.parseEther((parseFloat(unit) * 0.05).toFixed(2))
        );
        await BuilderVault.fund(unit, {
          value: ethers.utils.parseEther((parseFloat(unit) * 0.05).toFixed(2)),
        });
      }
    }
  };

  const add = () => {
    setFund((parseFloat(fund) + 0.05).toFixed(2));
  };

  const sub = () => {
    if (fund <= 0.05) return;
    setFund((fund - 0.05).toFixed(2));
  };
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
  );
}

function Backers() {
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

function Claim() {
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
        onClick={() => fundNow()}
      >
        Claim
      </button>
    </div>
  );
}

export default function Project() {
  return (
    <div
      style={{
        background: "#f7ebe2",
        padding: "31px",
        minHeight: "100vh",
      }}
    >
      <div className="flex justify-center max-w-5xl flex-col mx-auto rounded-xl">
        <div className="text-var-brown font-feature-settings-0 text-4xl font-extrabold leading-9 mb-4">
          Project Name
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
              value="0xb66ef21e98Df914409f5c638d6E3dAB8f093EB5A"
              disabled
            />
            <label
              htmlFor="unit"
              className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
            >
              Story
            </label>
            <input
              type="text"
              id="unit"
              className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
              required
              value="My story is blarblarblar"
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
              value="0.05 / 1 ETH ♦️"
              disabled
            />
            <Backers />
          </div>
          <div className="flex-1 mt-2">
            <Profile />
            <Funding />
            <Claim />
          </div>
        </div>
      </div>
    </div>
  );
}
