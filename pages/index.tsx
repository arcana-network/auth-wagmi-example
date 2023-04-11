import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";

export default function Home() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { connector, address, isConnected, status } = useAccount();

  const [isMounted, setIsMounted] = useState(false);

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
      </div>
    );
  } else {
    return (
      <div className="main">
        {!isConnected &&
          connectors.map((connector) => (
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
          ))}
        {error && <div>{error.message}</div>}
      </div>
    );
  }
}
