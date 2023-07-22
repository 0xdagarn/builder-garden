import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import Image from "next/image";

import Head from "next/head";
import Link from "next/link";

function Project({ project, projectId }) {
  return (
    <div
      style={{
        width: "370px",
        marginLeft: "-15px",
        paddingRight: "30px",
        marginBottom: "50px",
      }}
    >
      <Link href={{ pathname: `/projects/0` }}>
        <div
          className="px-8 py-4"
          style={{
            borderRadius: "28px",
            background: "#ffffff",
            paddingBottom: "25px",
          }}
        >
          {/* <span
            style={{
              width: "100px",
              overflow: "hidden",
              color: "#38493C",
              textOverflow: "ellipsis",
              fontFamily: "Grillmaster Wide",
              fontSize: "13px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "normal",
              display: "flex",
              padding: "6px 12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              borderRadius: "8px",
              background: "var(--green-2, #62F08A)",
            }}
          >
            2 Days Left
          </span> */}
          <div
            className="mt-4 mb-2"
            style={{
              overflow: "hidden",
              color: "#38493C",
              textOverflow: "ellipsis",
              fontFamily: "Grillmaster Wide",
              fontSize: "22px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "normal",
            }}
          >
            Unleashing Dreams
          </div>

          {/* <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5 mb-1 dark:bg-gray-300">
            <div
              className="bg-green-800 h-1.5 rounded-full dark:bg-green-800"
              style={{
                width: "50%",
              }}
            ></div>
          </div> */}
          <div className="flex items-center mt-2">
            <input
              type="text"
              id="unit"
              className="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              value="0.00 / 1 ETH ♦️"
              disabled
            />
          </div>

          <div
            className="flex items-center mt-4 p-4"
            style={{
              borderRadius: "16px",
              border: "1px solid #CCDBD0",
              background: "#F1F6F3",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Image src="/builder.png" width={100} height={100} alt="..." />
              <div
                style={{
                  width: "50px",
                  color: "#ffffff",
                  fontFamily: "Grillmaster Wide",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "normal",
                  borderRadius: "50px",
                  background: "#55e693",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "-10px",
                  border: "1px solid var(--white, #FFF)",
                  background:
                    "var(--grad-1, linear-gradient(90deg, #62F08A 0%, #07A4C7 100%))",
                }}
              >
                LV. 1
              </div>
            </div>
            <div className="ml-4">
              <div
                style={{
                  color: "#38493C",
                  fontFamily: "Grillmaster Wide",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "normal",
                }}
              >
                Alex
              </div>
              <div
                className="mt-1"
                style={{
                  color: "#38493C",
                  fontFamily: "Grillmaster Wide",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                }}
              >
                Developer
              </div>
              <div class="flex mt-1">
                <div
                  style={{
                    color: "#02C739",
                    fontFamily: "Grillmaster Wide",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",
                    marginRight: "7px",
                  }}
                >
                  #NFT
                </div>
              </div>
            </div>
          </div>

          {/* <div
            className="mt-4 mb-1 p-4"
            style={{
              color: "var(--brown, #38493C)",
              fontFamily: "Grillmaster Wide",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "normal",
              borderRadius: "14px",
              background: "#FFF",
              boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)",
            }}
          >
            Backers
            <div className="mt-2">
              <div className="flex">
                {project.backers &&
                  project.backers.map((backer) => (
                    <div
                      key={backer}
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
              <div className="flex"></div>
            </div>
          </div> */}
        </div>
      </Link>
    </div>
  );
}

export default function Home() {
  const [projects, setProjects] = useState([]);
  const { address, isConnected } = useAccount();

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://100.26.178.122:3001/user/one/${address}`
      );
      console.log(await response.json());
    } catch (err) {
      console.log(err.message);
      // if (isConnected) Router.replace("/profile");
    }
  };

  const getProjects = async () => {
    try {
      const response = await fetch("http://100.26.178.122:3001/vault/all");
      const jsonData = await response.json();
      setProjects(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (getUser()) getProjects();
  }, []);

  useEffect(() => {
    getUser();
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f7ebe2",
      }}
    >
      <Head>
        <title>Builder Garden</title>
        <meta name="description" content="A simple Next.js application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="mt-20 mb-8"
        style={{
          color: "#38493C",
          textAlign: "center",
          fontFamily: "Grillmaster Wide",
          fontSize: "72px",
          fontStyle: "normal",
          fontWeight: "900",
          lineHeight: "120%",
        }}
      >
        Raise your fund and <br />
        go out to the world
      </div>

      <div className="mt-12 mb-36 flex flex-row gap-16">
        <div className="flex-1">
          <Image
            src="/builder.png"
            width={200}
            height={1400}
            alt="Picture of the author"
          />
        </div>
        <div className="flex-1">
          <Image
            src="/backer.png"
            width={200}
            height={1400}
            alt="Picture of the author"
          />
        </div>
      </div>

      <div
        style={{
          width: "100%",
          background: "#ccdbd0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="mt-32 mb-8"
          style={{
            color: "#38493C",
            textAlign: "center",
            fontFamily: "Grillmaster Wide",
            fontSize: "56px",
            fontStyle: "normal",
            fontWeight: "900",
            lineHeight: "120%",
          }}
        >
          Discover builders to support
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              paddingBottom: "100px",
              columnGap: "50px",
              paddingLeft: "10%",
              paddingRight: "10%",
            }}
          >
            <Project />
            {/* {projects &&
              projects.map((project, projectId) => (
                <Project
                  project={project}
                  projectId={projectId}
                  key={projectId}
                />
              ))} */}
          </div>
        </div>
      </div>
    </div>
  );

  // useEffect(() => {
  //   if (address) Router.replace("/profile");
  // }, [address]);
}
