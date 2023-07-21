import { useState, useEffect } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import Router from "next/router";

import builderVaultFactoryABI from "../../../src/abis/builderVaultFactoryABI.json";
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
                    <div className="text-var-brown font-feature-settings-0 text-xl font-extrabold leading-snug">
                      Your first crowdfunding round has been created!
                    </div>

                    <div className="flex items-center justify-center">
                      <button
                        className="rounded-full text-center text-base font-bold leading-6 p-4 border-2 bg-green-800 text-white border-white"
                        onClick={() => Router.replace("./profile")}
                      >
                        Go to the detail page
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

export default function Project() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [title, setTitle] = useState("");

  const fundingConfig = {
    totalAmount: "1000000000000000000",
    deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    title: title,
  };

  const { config } = usePrepareContractWrite({
    address: builderVaultFactoryAddress,
    abi: builderVaultFactoryABI,
    functionName: "deployVault",
    args: [fundingConfig],
    enabled: Boolean(title),
  });
  const { data, write } = useContractWrite(config);

  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const create = async () => {
    await write();
  };

  useEffect(() => {
    setIsOpenModal(isSuccess);
  }, [isSuccess]);

  return (
    <div
      style={{
        background: "#f7ebe2",
        padding: "32px",
        minHeight: "100vh",
      }}
    >
      <Modal />

      <div className="flex justify-center max-w-5xl flex-col mx-auto rounded-xl">
        <div className="text-var-brown font-feature-settings-0 text-4xl font-extrabold leading-9 mb-4">
          Create your project
        </div>

        <label
          htmlFor="hacakthon"
          className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
        >
          Hackathon
        </label>
        <input
          type="text"
          id="hacakthon"
          className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
          value="ETH GLOBAL PARIS 🇫🇷"
          disabled
        />
        <label
          htmlFor="max"
          className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
        >
          Max Amount
        </label>
        <input
          type="text"
          id="max"
          className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
          value="1 ETH ♦️"
          disabled
        />
        <label
          htmlFor="unit"
          className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed"
        >
          Funding Unit
        </label>
        <input
          type="text"
          id="unit"
          className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
          value="0.05 ETH ♦️"
          disabled
        />

        <label
          htmlFor="title"
          className="text-var-brown font-feature-settings-0 text-base font-normal leading-relaxed mt-4"
        >
          Project title
        </label>
        <input
          type="text"
          id="title"
          className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="my-8">
          <div className="text-var-brown font-feature-settings-0 text-xl font-extrabold leading-snug">
            Tell us your hacakthon story
          </div>
          <div
            className="text-var-brown font-feature-settings-0 text-base font-normal
        leading-relaxed"
          >
            Include the reason why you want to participate in the hackathon and
            how you would be using the funding round.
          </div>

          <input
            type="text"
            id="title"
            className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="rounded-full text-center text-base font-bold leading-6 p-4 border-2 bg-green-800 text-white border-white"
            onClick={() => create()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
