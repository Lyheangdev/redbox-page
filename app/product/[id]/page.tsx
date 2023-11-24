"use client";

import cn from "classnames";
import { data } from "@/app/data/data";
import { ProductProps } from "@/components/product/interface";
import { Product } from "@/components/product/product";
import { Container } from "@/components/ui/container";
import { ImageNext } from "@/components/ui/image";
import { SwiperNext } from "@/components/ui/swiper";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { copyToClipboard } from "@/components/util/clipboard";

/**
 * Products Detail Page 👇
 */
export default function Page() {
  const relatedProducts: ProductProps[] = [];

  const params = useParams(); /* get product's id routed */

  /** get single product */
  const product = data.data.find((p) => p.id === +params.id);

  /** get related products */
  product?.related_product_id.map((p) => {
    let pd = data.data.find((p2) => p2.id === +p);
    relatedProducts.push(pd as never);
  });

  return (
    <Container>
      {/* Products Preview Slider Section */}
      <ProductPreview
        id={product?.id as number}
        images={product?.images as never}
      />

      {/* Product Detail Section */}
      <ProductDetail
        title={product?.title as string}
        description={product?.description as string}
        pricing={product?.pricing as string}
        socialMedia={product?.social_media as never}
        id={product?.id as never}
        images={product?.images as never}
      />

      {/* Related Product Section */}
      <RelatedProduct products={relatedProducts} />
    </Container>
  );
}

/**
 * Products Preview Slider Section 👇
 */
const ProductPreview: React.FC<ProductProps> = ({ images }) => (
  <div className="bg-gray-100 relative">
    <div className="bg-pink-600 absolute top-5 left-5 w-9 h-9 rounded-full text-white flex justify-center items-center">
      <Link href="/">
        <ImageNext src="/icons/back.svg" className="w-6 h-6" />
      </Link>
    </div>
    {/* swiper slider */}
    <div className="pt-28 pb-5">
      <SwiperNext images={images} />
    </div>
  </div>
);

/**
 * Product Detail Section 👇
 */
const ProductDetail: React.FC<ProductProps> = (props) => {
  const [isCopy, setIsCopy] = useState<boolean>(false);

  const { title, description, pricing, socialMedia } = props;

  const iconLinks = [
    /* social media local icons */ "/icons/facebook_ico.svg",
    "/icons/instagram_ico.svg",
    "/icons/telegram_ico.svg",
  ];

  /** copy link to clipboard */
  const copyLink = () => {
    const currentURL = window.location.href;
    if (!isCopy) {
      copyToClipboard(currentURL);
      setIsCopy(true);
    }
  };

  return (
    <div className="p-4 flex flex-col space-y-3">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-xs font-medium">{description}</p>
      <p className="font-medium text-xs">Pricing</p>
      <div>
        <span className="text-pink-600 font-medium text-xs">{pricing}</span>
      </div>
      <div className="flex space-x-3">
        {socialMedia?.map((s, i) => (
          <Link href={s} key={i} target="_blank">
            <ImageNext src={iconLinks[+i]} className="w-7 h-7" />
          </Link>
        ))}
      </div>
      <button
        onClick={copyLink}
        placeholder="Copy Link"
        className={cn(
          "w-full bg-pink-600 text-white rounded-md h-9 font-medium text-base",
          {
            "!bg-transparent !text-pink-600 outline outline-1 outline-pink-600":
              isCopy,
          }
        )}
      >
        {!isCopy ? "Copy Link " : "Copied"}
      </button>
    </div>
  );
};

/**
 * Related Product Section 👇
 */

const RelatedProduct: React.FC<{ products: ProductProps[] }> = ({
  products,
}) => (
  <div className="px-7 py-4 flex flex-col space-y-4">
    <h2 className="text-lg font-bold">Related Products</h2>
    <div className="flex flex-col space-y-3">
      {products.map((p, i) => (
        <Product isRelatedProduct {...p} key={i} />
      ))}
    </div>
  </div>
);
