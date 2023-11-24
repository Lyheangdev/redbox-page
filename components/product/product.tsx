"use client";

import cn from "classnames";
import { ImageNext } from "@/components/ui/image";
import { ProductProps } from "./interface";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { copyToClipboard } from "../util/clipboard";

export const Product: React.FC<ProductProps> = (props) => {
  const { id, images, title, description, pricing, isRelatedProduct } = props;
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const route = useRouter();

  /** Copy Link to clipboard */
  const copyLink = () => {
    let currentURL = window.location.href; /* get the url */
    if (isRelatedProduct) {
      currentURL = currentURL.replace(/\/product\/\d/, `/product/${id}`);
    } else {
      currentURL = `${currentURL}product/${id}`;
    }

    if (!isCopy) {
      copyToClipboard(currentURL);
      setIsCopy(true); /* use to update the status and ui */
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div
        className="relative bg-gray-100 rounded-md"
        onClick={() => route.push(`/product/${id}`)}
      >
        <ImageNext src={images[0]} className="aspect-square" />
        <p className="absolute top-[15%] left-0 h-5 w-20 text-xs bg-pink-600 rounded-r-md text-center text-white flex items-center justify-center">
          50% off
        </p>
      </div>
      <div className="flex flex-col space-y-1">
        <p className="text-base font-semibold">{title}</p>
        <p className="text-xs​​ text-pink-600 font-medium flex space-x-5">
          {pricing?.split(" ").map((p, i) => (
            <span key={i}>{p}</span>
          ))}
        </p>
        <p className="text-xs font-medium line-clamp-6">{description}</p>
        <div className="flex py-2 space-x-2 items-center">
          <Link
            className="w-16 min-[400px]:w-20 text-white text-[10px] h-6 bg-pink-600 rounded-md flex justify-center items-center"
            href={`/product/${id}`}
          >
            View Detail
          </Link>
          <Button
            className={cn({ "!bg-pink-500 !text-white !outline-none": isCopy })}
            onClick={() => copyLink()}
            variant="outline"
            foregroundColor="primary"
          >
            {!isCopy ? "Copy Link" : "Copied"}
          </Button>
        </div>
      </div>
    </div>
  );
};
