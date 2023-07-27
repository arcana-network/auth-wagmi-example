import { USDCAbi } from "@/utils/constants";
import { ArcanaConnector } from "@arcana/auth-wagmi";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useContractWrite } from "wagmi";

export default function Home() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { connector, address, isConnected, status } = useAccount();

  const [isMounted, setIsMounted] = useState(false);

  const { data, write, writeAsync } = useContractWrite({
    abi: USDCAbi,
    address: "0xdA5289fCAAF71d52a80A254da614a192b693e977",
    functionName: "approve",
    args: ["0x0000000000000000000000000000000000000000", 10000000 * 10 ** 6], // using zero address
    chainId: 80001, // specify chain id here
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <></>;
  }
  if (isConnected) {
    return (
      <div className="main">
        <div className="connected-msg">
          Connected to {connector?.name} with address {address}
        </div>
        <button onClick={() => write?.()}>Write</button>
      </div>
    );
  } else {
    return (
      <div className="main">
        <div>
          {!isConnected &&
            connectors.map((connector) => (
              <>
                <button
                  className="connect-btn"
                  key={connector.id}
                  onClick={() => connect({ connector })}
                >
                  Connect to {connector.name}
                  {isLoading &&
                    pendingConnector?.id === connector.id &&
                    " (connecting)"}
                </button>
                <div>
                  <button
                    className="connect-btn"
                    key={connector.id}
                    onClick={() => {
                      if (connector.id == "arcana") {
                        (connector as unknown as ArcanaConnector).setLogin({
                          provider: "google",
                        });
                      }
                      connect({ connector });
                    }}
                  >
                    Connect to {connector.name} (google)
                    {isLoading &&
                      pendingConnector?.id === connector.id &&
                      " (connecting)"}
                  </button>
                </div>
              </>
            ))}
        </div>
        {error && <div className="error-box">{error.message}</div>}
      </div>
    );
  }
}
