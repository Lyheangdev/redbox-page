import Link from "next/link";
import { ImageNext } from "./ui/image";

export interface BrandProps {
  storeLogo: string;
  localizeLogo?: string;
  storeBrand: string;
  storeDesc: string;
  socialMedia?: [string];
}

export const BrandSection: React.FC<BrandProps> = (props) => {
  const { storeBrand, storeDesc, storeLogo, localizeLogo, socialMedia } = props;

  const iconLinks = [
    /* local icons for social media */
    "/icons/facebook_ico.svg",
    "/icons/instagram_ico.svg",
    "/icons/telegram_ico.svg",
  ];

  return (
    <div className="flex flex-col space-y-1">
      {/* Brand and Localize Logo */}
      <BrandLogoSection storeLogo={storeLogo} localizeLogo={localizeLogo} />
      {/* Store Information */}
      <BrandInfoSection storeBrand={storeBrand} storeDesc={storeDesc} />
      {/* Social Media */}
      <BrandSocialMediaSection iconLinks={iconLinks as never} socialMedia={socialMedia} />
    </div>
  );
};

/**
 * Brand Logo
 */
const BrandLogoSection: React.FC<
  Pick<BrandProps, "storeLogo" | "localizeLogo">
> = ({ storeLogo, localizeLogo }) => (
  <div className="flex justify-between items-center">
    <ImageNext src={storeLogo} className="w-40 h-16" />
    <ImageNext src={localizeLogo as never} className="w-7 h-7" />
  </div>
);

/**
 * Brand Info
 */
const BrandInfoSection: React.FC<
  Pick<BrandProps, "storeBrand" | "storeDesc">
> = ({ storeBrand, storeDesc }) => (
  <div className="flex flex-col space-y-2">
    <h4 className="text-base font-bold">{storeBrand}</h4>
    <p className="text-xs">{storeDesc}</p>
  </div>
);

/**
 * Brand Social
 */
const BrandSocialMediaSection: React.FC<
  Pick<BrandProps, "socialMedia"> & { iconLinks: [string] }
> = ({ socialMedia, iconLinks }) => (
  <div className="flex space-x-3 py-2">
    {socialMedia?.map((__src, i) => (
      <Link href={__src} key={i} target="_blank">
        <ImageNext src={iconLinks[+i]} className="w-7 h-7" />
      </Link>
    ))}
  </div>
);
