"use client";

import { BrandSection } from "@/components/brand-section";
import { data } from "./data/data";
import { Promotion } from "@/components/promotion";
import { Product } from "@/components/product/product";
import { ImageNext } from "@/components/ui/image";
import { useState, useRef, useEffect } from "react";
import { EmptyState } from "@/components/ui/empty-state";
import { Container } from "@/components/ui/container";
import cn from "classnames";
import { ProductProps } from "@/components/product/interface";
import { convertToCamelCase } from "@/components/util/camel-converter";

export default function Page() {
  let ProductList;
  const [state, setState] = useState({
    isClick: false,
    menuId: data.menu[0].id,
    menuItem: data.menu[0].menu_item,
  });

  ProductList = Boolean(state.menuId)
    ? data.data.filter((p) => p.menu_id === state.menuId)
    : data.data;
  // convert to camelcase
  ProductList = ProductList.map((p) => (p = convertToCamelCase(p)));

  // animation reference elements
  const btnOpenMenuRef = useRef<HTMLElement>();
  const popUpRef = useRef<HTMLElement>();

  const onAnimationStart = () => {
    // add animation to element
    popUpRef.current?.classList.add("animate-start");
  };

  useEffect(() => {
    // Applying initial animation class to DOM when the the element is rendered
    const applyAnimate = () => {
      popUpRef.current?.classList.remove("animate-start");
      popUpRef.current?.classList.add("animate-start");
    };

    applyAnimate();

    // Triggering animation start when the button is clicked
    btnOpenMenuRef.current?.addEventListener("click", onAnimationStart);

    const cleanBtnStartEffect = btnOpenMenuRef.current;
    setTimeout(() => {
      popUpRef.current?.classList.remove("animate-start");
    }, 5000);
    return () => {
      // Clear applied animation from the element after clicked
      cleanBtnStartEffect?.removeEventListener("click", onAnimationStart);
    };
  });

  return (
    <div className="container">
      <Container className={cn("p-4", { "!overflow-y-hidden": state.isClick })}>
        {/* Top Menu */}
        <BrandSection
          storeBrand={data.store_brand}
          storeDesc={data.store_desc}
          storeLogo={data.store_logo}
          localizeLogo={data.localization_icon}
          socialMedia={data.social_media as never}
        />

        {/* Banner Promotion Section */}
        <Promotion status="Promotions" images={data.banners as never} />

        {/* Menu Section */}
        <div className="flex items-center space-x-2 py-6">
          <h4 className="text-base font-bold">Choose Categories :</h4>
          <button
            ref={btnOpenMenuRef as never}
            onClick={() => setState((s) => ({ ...s, isClick: true }))}
            className="flex items-center space-x-1"
          >
            <span className="text-base">
              {state.menuId === 0 ? state.menuItem : state.menuItem}
            </span>
            <ImageNext src="/icons/dropdown_ico.svg" className="w-6 h-6" />
          </button>
        </div>

        {/* Product List Section*/}
        <ProductsList products={ProductList} />
      </Container>

      {/* Menu PopUp Section*/}
      {state.isClick && (
        <div
          ref={popUpRef as never}
          className="bg-pink-700/95 absolute top-0 left-1/2 -translate-x-1/2 w-full h-[100vh] z-50 max-w-md "
        >
          <div className="absolute top-[15%] h-2/3 overflow-y-scroll p-3 hidden-scroll left-1/2 -translate-x-1/2 flex flex-col space-y-10">
            {data.menu.map((m, i) => (
              <button
                onClick={() =>
                  setState(() => ({
                    isClick: false,
                    menuId: m.id,
                    menuItem: m.menu_item,
                  }))
                }
                className="text-white text-2xl"
                key={i}
              >
                {m.menu_item}
              </button>
            ))}
          </div>
          <button
            onClick={() =>
              setState((s) => ({ ...s, isClick: false, menuId: 0 }))
            }
            className="bg-white absolute bottom-[10%] left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex justify-center items-center"
          >
            <ImageNext src="/icons/cross_ico.svg" className="w-7 h-7" />
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Product List
 */
const ProductsList: React.FC<{ products: ProductProps[] }> = ({ products }) => (
  <div className="py-5 flex flex-col space-y-5">
    {!products.length ? (
      <EmptyState
        image="/icons/empty-state.svg"
        title="Filter Result"
        subtitle="There is no item is found"
      />
    ) : (
      products.map((p, i) => (
        <Product
          key={i}
          id={+p.id as number}
          images={p.images as never}
          title={p.title}
          description={p.description}
          pricing={p.pricing}
        />
      ))
    )}
  </div>
);
