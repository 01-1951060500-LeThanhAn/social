import { useState } from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const AccountTrailer = () => {
  const [accounts] = useState([
    {
      id: 1,
      title: "neymarjr",
      avatar:
        "https://i.pinimg.com/originals/78/38/a4/7838a41fa579b9815096c9a44f4095a0.jpg",
    },
    {
      id: 2,
      title: "cristiano",
      avatar:
        "https://www.cristianoronaldo.com/assets/images/brand_eyewear.jpg?832236",
    },
    {
      id: 3,
      title: "realmadrid",
      avatar:
        "http://item.com.vn/fileupload/source/San-pham-tem/Logo-cau-lac-bo/Logo-cau-lac-bo-20.jpg",
    },
    {
      id: 4,
      title: "leomessi",
      avatar:
        "https://vtv1.mediacdn.vn/zoom/700_438/2019/5/23/lionel-messi-1558625894082436368399-crop-1558625901749462544445.jpg",
    },
    {
      id: 5,
      title: "Maguire",
      avatar:
        "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt07d62336ee8ed926/6214ab2690aa357658b8e4cc/18-maguire.jpg",
    },
  ]);
  SwiperCore.use([Autoplay]);

  return (
    <>
      <div className="md:mt-20 lg:mt-2 xl:mt-0 ">

        <div className="w-full lg:w-90 px-2 mx-auto flex items-center justify-center border-slate-100 border-2 ">
          <Swiper
           modules={[Navigation, Autoplay]}
            freeMode={true}
            grabCursor={true}
            spaceBetween={10}
            slidesPerView={5}
            autoplay={{ delay: 2000 }}
            loop={true}
            breakpoints={{
              1366: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              600: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              414: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
          >
            {accounts.map((account) => (
              <SwiperSlide key={account.id}>
                <div className="flex justify-center items-center flex-col">
                  <div className="">
                    <img
                      className="w-70 h-70 object-cover rounded-full"
                      src={account.avatar}
                      alt={account.title}
                    />
                  </div>
                  <div className="text-center font-bold">
                    <p>{account.title}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default AccountTrailer;
