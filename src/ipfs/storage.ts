import { Address, fromHex, toHex } from "viem";
// @ts-expect-error - no types
import { Web3Storage } from "web3.storage";

const WEB3_STORAGE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGMzMWQyOTJjMTQ3NjViMDA1MTQ5ZEUwYzZGMGVCRDczOTRCRkVmMDQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTAwOTM1MTY1ODQsIm5hbWUiOiJoYWNrYXRob24ifQ.2PIjfEuhPG8xMRZqPkk9WDl9M4IVYEKdlG8zvxHZes4";

const client = new Web3Storage({ token: WEB3_STORAGE_TOKEN });

function makeFile(contents: string, filename: string) {
  const blob = new Blob([contents], { type: "application/json" });
  return new File([blob], filename);
}

export async function store(object: unknown): Promise<Address> {
  const cid = await client.put([
    makeFile(JSON.stringify(object), "metadata.json"),
  ]);
  return toHex(cid);
}

export async function retrieve(cidHex: Address) {
  const cid = fromHex(cidHex, "string");

  const res = await client.get(cid);
  const [file]: File[] = await res.files();
  return JSON.parse(Buffer.from(await file.arrayBuffer()).toString("utf-8"));
}
