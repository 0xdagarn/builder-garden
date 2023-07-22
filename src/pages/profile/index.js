import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Router from "next/router";
import { randomBytes } from "crypto";
import { BN, ecsign, keccakFromString, toRpcSig } from "ethereumjs-util";
import * as secp256k1 from "secp256k1";

import { useAccount, useSignMessage } from "wagmi";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {
  SismoConnectButton, // the Sismo Connect React button displayed below
  SismoConnectConfig,
  AuthType,
  ClaimType,
} from "@sismo-core/sismo-connect-react";

import builderGardenABI from "../abis/BuilderGardenABI.json";
const builderGardenAddress = "0x345d7C0c8564F44484456a2933eF23B8027a5919";
import builderVaultFactoryABI from "../abis/BuilderVaultFactoryABI.json";
const builderVaultFactoryAddress = "0xfFeF6415C437725820CfaDE5E857d0eF15D0c40b";

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
                    <div className="flex items-center justify-center flex-col text-var-brown font-feature-settings-0 text-xl leading-snug px-5 my-5">
                      {"You've created a builder profile on BuilderGarden!"}
                      <br /> Excited to see how you grow as a bulilder.
                      {/* {position === "builder"
                        ? "You've created a builder profile on BuilderGarden! Excited to see how you grow as a bulilder"
                        : "Backer!"} */}
                    </div>
                    <Image
                      src="/builder.png"
                      width={250}
                      height={250}
                      alt="..."
                    />
                    <div className="flex">
                      {/* <div>{nickname}SOnnyson</div>
                      <div>{level}Level </div> */}
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
  const { address, isConnected } = useAccount();

  const [position, setPosition] = useState("builder");
  const [nickname, setNickname] = useState("");
  const [role, setRole] = useState("");
  const [interesting, setInteresting] = useState("");
  const [discord, setDiscord] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [level, setLevel] = useState("");
  const [responseBytes, setResponseBytes] = useState("");

  const [message, setMessage] = useState("");
  const [privKey, setPrivKey] = useState("");
  const [pubKey, setPubKey] = useState("");

  // const { config } = usePrepareContractWrite({
  //   address: builderGardenAddress,
  //   abi: builderGardenABI,
  //   functionName: "builderSignUp",
  //   args: [nickname],
  //   enabled: Boolean(nickname),
  // });
  // const { data, write } = useContractWrite(config);

  // const { isSuccess } = useWaitForTransaction({
  //   hash: data?.hash,
  // });

  // useEffect(() => {
  //   setIsOpenModal(isSuccess);
  // }, [isSuccess]);

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

  const {
    data: signature,
    isError,
    isLoading,
    signMessage,
  } = useSignMessage({
    message,
  });

  async function personalSign(message, privateKey) {
    const messageHash = keccakFromString(
      `\x19Ethereum Signed Message:\n${message.length}${message}`,
      256
    );
    const signature = ecsign(messageHash, privateKey);
    return Buffer.from(
      toRpcSig(signature.v, signature.r, signature.s).slice(2),
      "hex"
    );
  }

  const verifyIdentity = async () => {
    const msg = randomBytes(32);
    let privKey;
    do {
      privKey = randomBytes(32);
    } while (!secp256k1.privateKeyVerify(privKey));
    const pubKey = secp256k1.publicKeyCreate(privKey);
    const pubkeyHex = Buffer.from(pubKey).toString("hex");
    const privkeyHex = privKey.toString("hex");
    console.log(pubkeyHex, "\n", privkeyHex);

    const res = await axios.post(
      "https://proof-service.next.id/v1/proof/payload",
      {
        action: "create",
        platform: "ethereum",
        identity: "0xA29B144A449E414A472c60C7AAf1aaFfE329021D",
        public_key: pubkeyHex,
      }
    );

    console.log(res.data);
    const message = Buffer.from(res.data.sign_payload);
    setMessage("0x1234");

    const secretKey = Buffer.from(privkeyHex, "hex");
    const signatureSp = await personalSign(message, secretKey);
    const signatureSw = await signMessage();
    console.log("message", message);
    console.log("signatureSw", signatureSw);

    // console.log(signatureSw, signatureSw.slice(2));
    // console.log(Buffer.from(signatureSw.slice(2), "hex"));

    await axios.post("https://proof-service.next.id/v1/proof", {
      action: "create",
      platform: "ethereum",
      identity: address,
      public_key: pubkeyHex,
      extra: {
        signature: signatureSp.toString("base64"),
        wallet_signature: Buffer.from(signatureSw.slice(2), "hex").toString(
          "base64"
        ),
      },
      uuid: res.data.uuid,
      created_at: res.data.created_at,
    });

    setPrivKey(privkeyHex);
    setPubKey(pubkeyHex);

    // const res = await axios.post(
    //   "https://proof-service.next.id/v1/proof/payload",
    //   {
    //     action: "create",
    //     platform: "twitter",
    //     identity: "SeungAnJung",
    //     public_key: pubkeyHex,
    //   }
    // );
    // console.log(res.data);

    // console.log(signatureString);
    // const location = "1682520456652283905";
    // const uuid = "e8b9d935-3498-4e8a-b918-e0184ce02ce9";
    // const created_at = "1689979023";
    // await axios.post("https://proof-service.next.id/v1/proof", {
    //   action: "create",
    //   platform: "twitter",
    //   identity: "SeungAnJung",
    //   public_key:
    //     "029155ca00b9185656dc880489edc7f32023f835e91e1d279ddb07bb4278a64842",
    //   proof_location: location,
    //   extra: {},
    //   uuid,
    //   created_at,
    // });
    // const res1 = await axios.get(
    //   "https://proof-service.next.id/v1/proof?platform=twitter&identity=SeungAnJung"
    // );
    // console.log(res1.data.ids[0].proofs);
    // const msg = randomBytes(32);
    // let privKey;
    // do {
    //   privKey = randomBytes(32);
    // } while (!secp256k1.privateKeyVerify(privKey));
    // const pubKey = secp256k1.publicKeyCreate(privKey);
    // const pubkeyHex = Buffer.from(pubKey).toString("hex");
    // const privkeyHex = privKey.toString("hex");
    // console.log(pubkeyHex, "\n", privkeyHex);
    // const res = await axios.post(
    //   "https://proof-service.next.id/v1/proof/payload",
    //   {
    //     action: "create",
    //     platform: "ethereum",
    //     identity: "0xA29B144A449E414A472c60C7AAf1aaFfE329021D",
    //     public_key: pubkeyHex,
    //   }
    // );
    // console.log(res.data);
    // const message = Buffer.from(res.data.sign_payload);
    // const secretKey = Buffer.from(privkeyHex, "hex");
    // const signatureSp = await personalSign(message, secretKey);
    // const signatureSw = await mainDeployer.signMessage(message);
    // console.log(signatureSw, signatureSw.slice(2));
    // console.log(Buffer.from(signatureSw.slice(2), "hex"));
    // await axios.post("https://proof-service.next.id/v1/proof", {
    //   action: "create",
    //   platform: "ethereum",
    //   identity: mainDeployer.address,
    //   public_key: pubkeyHex,
    //   extra: {
    //     signature: signatureSp.toString("base64"),
    //     wallet_signature: Buffer.from(signatureSw.slice(2), "hex").toString(
    //       "base64"
    //     ),
    //   },
    //   uuid: res.data.uuid,
    //   created_at: res.data.created_at,
    // });
  };

  useEffect(() => {
    setIsOpenModal(isSuccess);
  }, [isSuccess]);

  const create = async () => {
    // const user = {
    //   nickName: nickname,
    //   walletAddress: address,
    //   userType: position,
    //   role: role,
    //   interest: [interesting],
    //   socials: {
    //     twitter,
    //     discord,
    //   },
    //   pow: {
    //     github,
    //     portfolio,
    //   },
    // };

    // try {
    //   await axios.post("http://100.26.178.122:3001/user/", user);
    // } catch (err) {
    //   console.log("server error: ", err);
    // }

    await write();
    // setIsOpenModal(true);
  };

  return (
    <div
      style={{
        background: "#f7ebe2",
        padding: "32px",
        minHeight: "100vh",
      }}
    >
      <div className="flex justify-center max-w-5xl flex-col mx-auto rounded-xl">
        <Modal
          isOpenModal={isOpenModal}
          nickname={nickname}
          level={level}
          position={position}
        />

        <div className="text-var-brown font-feature-settings-0 text-4xl font-extrabold leading-9">
          Create profile
        </div>
        <div className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed">
          {`Roles can't be changed in the current version`}
        </div>

        <div className="flex gap-10 mt-4 mb-12">
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

        <div className="mb-12">
          <div className="text-var-brown font-feature-settings-0 text-4xl font-extrabold leading-9 mb-4">
            Information
          </div>
          <div className="flex gap-10 mb-4">
            <div className="flex-1">
              <div className="text-var-brown font-feature-settings-0 text-xl font-extrabold leading-snug mb-2">
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
              <div className="text-var-brown font-feature-settings-0 text-xl font-extrabold leading-snug mb-2">
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
                placeholder="builder#1234"
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
                placeholder="builder"
              />
              <div className="flex-1">
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
                  placeholder="builder"
                  onChange={(e) => setGithub(e.target.value)}
                />
                <div className="flex justify-end gap-x-5 mt-4">
                  <button
                    className="rounded-full text-center text-base font-bold leading-6 p-4 border-2 text-white border-white bg-[#1b2847]"
                    onClick={() => verifyIdentity()}
                  >
                    Verify Your Identity
                  </button>
                  <Image src="/XID.png" width={100} height={20} alt="..." />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-var-brown font-feature-settings-0 text-4xl font-extrabold leading-9 mb-4">
            Proof of humanity
          </div>
          <div className="flex gap-10">
            <div className="flex-1">
              <div>
                <SismoConnectButton
                  config={{
                    appId: "0xf4977993e52606cfd67b7a1cde717069",
                  }}
                  auths={[
                    { authType: AuthType.TWITTER },
                    { authType: AuthType.GITHUB },
                  ]}
                  claims={[
                    {
                      groupId: "0x1cde61966decb8600dfd0749bd371f12",
                      value: 15,
                    },
                    {
                      groupId: "0x682544d549b8a461d7fe3e589846bb7b",
                      isOptional: true,
                    },
                  ]}
                  onResponseBytes={(responseBytes) => {
                    setResponseBytes(responseBytes);
                  }}
                  text={"Proove Your Humanity with Sismo"}
                  disabled={true}
                />
                {responseBytes != "" && (
                  <span className="text-[#38493C]">
                    Proof generated successfully. <br />
                    Click the button below to create your ERC-6551 Account!
                    <br />
                    Proof will verified in our contract.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-8">
          <button
            className="rounded-full text-center text-base font-bold leading-6 p-4 border-2 bg-green-800 text-white border-white mt-10"
            onClick={() => create()}
          >
            Create an ERC6551 Account
          </button>
        </div>
      </div>
    </div>
  );
}
