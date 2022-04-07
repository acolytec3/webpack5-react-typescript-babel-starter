import React from "react";
import { Discv5, ENR } from "@chainsafe/discv5";
import PeerId from "peer-id";
import { Multiaddr } from "multiaddr";

const App = () => {
  const [node, setNode] = React.useState<Discv5>();
  const init = async () => {
    const id = await PeerId.create({ keyType: "secp256k1" });
    const enr = ENR.createFromPeerId(id); //@ts-ignore
    enr.setLocationMultiaddr(new Multiaddr("/ip4/127.0.0.1/udp/0"));
    const node = await Discv5.create({
      enr,
      peerId: id,
      multiaddr: enr.getLocationMultiaddr("udp")!,
    });
    await node.start();
  };

  React.useEffect(() => {
    init();
  }, []);
  return <h1>My node is {node?.enr.nodeId}</h1>;
};

export default App;
