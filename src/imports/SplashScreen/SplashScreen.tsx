import imgImageCustomInteriors from "./567210d0fafcd692004671dd66b4a733d1fccc4a.png";
import imgImageDressingRoom from "./f7b6f623fd087cbd7d7e431d00e962e72498cef0.png";
import imgImageTheOakKitchen from "./0b7f033fb21dd8ee9e26a8255b80ba7c0205ccf4.png";
import imgImageKitchens from "./b05518179cdbc57e1530e6e5165e2110ca56e5ec.png";
import imgImageTheLivingSpace from "./73f461a24ea54993b01b159b86354004bc4ec84f.png";
import img6LogoWhiteWithoutTagline1 from "./9e20d6ca92f392c0038262e39e596eb1e5d5f8f1.png";

function ImageCustomInteriors() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="Image (Custom Interiors)">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-29.1%] max-w-none top-0 w-[290.91%]" src={imgImageCustomInteriors} />
      </div>
      <div className="absolute bg-[rgba(35,23,23,0.3)] h-[1024px] left-0 top-0 w-[385px]" />
    </div>
  );
}

function ImageDressingRoom() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="Image (Dressing Room)">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-337.56%] max-w-none top-0 w-[775.12%]" src={imgImageDressingRoom} />
      </div>
      <div className="absolute bg-[rgba(35,23,23,0.3)] h-[1024px] left-0 top-0 w-[385px]" />
    </div>
  );
}

function ImageTheOakKitchen() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative" data-name="Image (The Oak Kitchen)">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-0.26%] max-w-none top-0 w-[327.74%]" src={imgImageTheOakKitchen} />
      </div>
      <div className="absolute bg-[rgba(35,23,23,0.3)] h-[1024px] left-0 top-0 w-[385px]" />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex gap-[2px] h-[1024px] items-center justify-center left-0 top-0 w-[951px]">
      <ImageCustomInteriors />
      <ImageDressingRoom />
      <ImageTheOakKitchen />
    </div>
  );
}

function ImageKitchens() {
  return (
    <div className="h-[1193px] overflow-clip relative w-full" data-name="Image (Kitchens)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageKitchens} />
      <div className="absolute bg-[rgba(35,23,23,0.3)] h-[1193px] left-0 top-0 w-[242px]" />
    </div>
  );
}

function ImageDressingRoom1() {
  return (
    <div className="flex-[1_0_0] min-h-px overflow-clip relative w-full" data-name="Image (Dressing Room)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageDressingRoom} />
      <div className="absolute flex h-[269px] items-center justify-center left-0 top-[-1px] w-[1193px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="bg-[rgba(35,23,23,0.3)] h-[1193px] w-[269px]" />
        </div>
      </div>
    </div>
  );
}

function ImageTheLivingSpace() {
  return (
    <div className="flex-[1_0_0] min-h-px overflow-clip relative w-full" data-name="Image (The Living Space)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageTheLivingSpace} />
      <div className="absolute flex h-[242px] items-center justify-center left-0 top-0 w-[1193px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="bg-[rgba(35,23,23,0.3)] h-[1193px] w-[242px]" />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[903px] items-start left-[952px] top-0 w-[968px]">
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px relative w-[1193px]" style={{ containerType: "size", "--transform-inner-width": "1200", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="flex-none rotate-90 w-[100cqh]">
          <ImageKitchens />
        </div>
      </div>
      <ImageDressingRoom1 />
      <ImageTheLivingSpace />
    </div>
  );
}

function Desktop() {
  return (
    <div className="absolute bg-white h-[903px] left-0 overflow-clip top-0 w-[1920px]" data-name="Desktop - 1">
      <Frame />
      <Frame1 />
    </div>
  );
}

export default function SplashScreen() {
  return (
    <div className="bg-white relative size-full" data-name="SPLASH SCREEN">
      <Desktop />
      <div className="absolute bg-[rgba(44,13,12,0.6)] h-[903px] left-0 top-0 w-[1920px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[225px] left-1/2 top-1/2 w-[404px]" data-name="6- Logo white-without  Tagline 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img6LogoWhiteWithoutTagline1} />
      </div>
    </div>
  );
}