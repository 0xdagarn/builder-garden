import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Router from "next/router";

import { ethers } from "ethers";
import { useAccount } from "wagmi";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import builderGardenABI from "../../../src/abis/BuilderGardenABI.json";
const builderGardenAddress = "0x345d7C0c8564F44484456a2933eF23B8027a5919";

const Modal = ({ isOpenModal, nickname, level, position }) => {
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
                      Congratulations!
                    </div>
                    <div className="text-var-brown font-feature-settings-0 text-xl font-extrabold leading-snug">
                      {position === "builder"
                        ? "You've created a builder profile on BuilderGarden! Excited to see how you grow as a bulilder"
                        : "Backer!"}
                    </div>
                    <Image
                      src="/builder.png"
                      width={250}
                      height={250}
                      alt="..."
                    />
                    <div className="flex">
                      <div>{nickname}SOnnyson</div>
                      <div>{level}Level </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <button
                        className="rounded-full text-center text-base font-bold leading-6 p-4 border-2 bg-green-800 text-white border-white"
                        onClick={() => Router.replace("./project")}
                      >
                        Create a Project
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

export default function Profile() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { address } = useAccount();

  const [position, setPosition] = useState("builder");
  const [nickname, setNickname] = useState("");
  const [role, setRole] = useState("");
  const [interesting, setInteresting] = useState("");
  const [discord, setDiscord] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [level, setLevel] = useState("");

  const { config } = usePrepareContractWrite({
    address: builderGardenAddress,
    abi: builderGardenABI,
    functionName: "builderSignUp",
    args: [nickname],
    enabled: Boolean(nickname),
  });
  const { data, write } = useContractWrite(config);

  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    setIsOpenModal(isSuccess);
  }, [isSuccess]);

  const create = async () => {
    const user = {
      nickName: nickname,
      walletAddress: address,
      userType: position,
      role: role,
      interest: [interesting],
      socials: {
        twitter,
        discord,
      },
      pow: {
        github,
        portfolio,
      },
    };

    // try {
    //   await axios.post("http://100.26.178.122:3001/user/", user);
    // } catch (err) {
    //   console.log("server error: ", err);
    // }

    // await write();
    setIsOpenModal(true);
  };

  return (
    <div>
      <Modal
        isOpenModal={isOpenModal}
        nickname={nickname}
        level={level}
        position={position}
      />

      <div className="text-var-brown font-feature-settings-0 text-4xl font-extrabold leading-9">
        Choose Your Wallet
      </div>
      <div className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed">
        {`Roles can't be changed in the current version`}
      </div>

      <div className="flex">
        <div
          className={`flex-1 rounded-full text-center text-base font-bold leading-6 p-4 border-2
        ${
          position === "builder"
            ? "bg-green-800 text-white border-white"
            : "bg-white-800 text-green-800 border-green-800"
        }`}
          onClick={() => setPosition("builder")}
        >
          Builder
        </div>
        <div
          className={`flex-1 rounded-full text-center text-base font-bold leading-6 p-4 border-2
        ${
          position === "backer"
            ? "bg-green-800 text-white border-white"
            : "bg-white-800 text-green-800 border-green-800"
        }`}
          onClick={() => setPosition("backer")}
        >
          Backer
        </div>
      </div>

      <div>
        <div className="text-var-brown font-feature-settings-0 text-4xl font-extrabold leading-9">
          Information
        </div>
        <div className="flex">
          <div className="flex-1">
            <div className="text-var-brown font-feature-settings-0 text-xl font-extrabold leading-snug">
              General
            </div>
            <label
              htmlFor="address"
              className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
            >
              Wallet address
            </label>
            <input
              type="text"
              id="address"
              className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              value={address}
              disabled
            />
            <label
              htmlFor="nickname"
              className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
            >
              Nickname
            </label>
            <input
              type="text"
              id="nickname"
              className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              onChange={(e) => setNickname(e.target.value)}
            />
            <div className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed">
              Role
            </div>
            <select
              id="small"
              className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Choose your role</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
            </select>
            <div className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed">
              Your interesting
            </div>
            <select
              id="small"
              className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setInteresting(e.target.value)}
            >
              <option value="">Choose your interesting</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="DeFi">DeFi</option>
              <option value="NFT">NFT</option>
              <option value="DAO">DAO</option>
              <option value="Social">Social</option>
            </select>
          </div>
          <div className="flex-1">
            <div className="text-var-brown font-feature-settings-0 text-xl font-extrabold leading-snug">
              Socials
            </div>
            <label
              htmlFor="discord"
              className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
            >
              Discord handle
            </label>
            <input
              type="text"
              id="discord"
              className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              onChange={(e) => setDiscord(e.target.value)}
              placeholder="Builder#1234"
            />
            <label
              htmlFor="twitter"
              className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
            >
              Twitter handle
            </label>
            <input
              type="text"
              id="twitter"
              className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="@Builder"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="text-var-brown font-feature-settings-0 text-4xl font-extrabold leading-9">
          Proof of yourself
        </div>
        <div className="flex">
          <div className="flex-1">
            <div className="text-var-brown font-feature-settings-0 text-xl font-extrabold leading-snug">
              Proof of work
            </div>
            <label
              htmlFor="github"
              className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
            >
              Github
            </label>
            <input
              type="text"
              id="github"
              className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              onChange={(e) => setGithub(e.target.value)}
            />
            <label
              htmlFor="portfolio"
              className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
            >
              Portfolio (Optional)
            </label>
            <input
              type="text"
              id="portfoli"
              className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              onChange={(e) => setPortfolio(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <div className="text-var-brown font-feature-settings-0 text-xl font-extrabold leading-snug">
              Sismo!!
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          className="rounded-full text-center text-base font-bold leading-6 p-4 border-2 bg-green-800 text-white border-white"
          onClick={() => create()}
        >
          Create an ERC6551 Account
        </button>
      </div>
    </div>
  );
}