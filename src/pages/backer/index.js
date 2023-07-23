import Image from "next/image";

export default function Backer() {
  return (
    <div
      style={{
        background: "#f7ebe2",
        padding: "31px",
        minHeight: "100vh",
      }}
    >
      <div className="flex justify-center max-w-5xl flex-col mx-auto rounded-xl">
        <Image
          src="/backer_inventory.png"
          width={1600}
          height={1400}
          alt="Picture of the author"
          onClick={() => Router.replace("/profile")}
        />
      </div>
    </div>
  );
}
