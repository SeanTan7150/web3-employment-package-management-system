import { truncate } from "@/utils/utils";
import Link from "next/link";

interface LoaderProps {
  subtitle: string;
  tx?: string;
}

export const Loader = ({ subtitle, tx }: LoaderProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 animate-bounce">
          Ethiring
        </h1>
        <p className="text-lg text-gray-600 mt-2 animate-bounce-slow">
          {subtitle}
        </p>
        {tx && (
          <p className="text-lg text-gray-600 mt-2 animate-bounce-slow">
            Check out your transaction journey:
            <Link
              className="hover:text-blue-600 ml-2"
              href={`https://sepolia.etherscan.io/tx/${tx}`}
              target="_blank"
            >
              {truncate(tx)}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};
