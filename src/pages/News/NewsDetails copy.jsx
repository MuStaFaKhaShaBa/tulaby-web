// import { Helmet } from "react-helmet";
// import { getAllNewsAPI } from "../../layout/News/News";
// import { useQuery } from "react-query";
// import Apis from "./../../Api.json";
// import { Link, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import LoadingComponent from "../../components/loading/Loading";
// import axios from "axios";
// import { convertDate, convertDateTime } from "../../Helpers/Methods";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import ProfileCard from "../../components/ProfileCard/ProfileCard";
// import { useTranslation } from "react-i18next";
// import { useContext } from "react";
// import UserContext from "../../contexts/UserContextProvider";
// import NewsSlider from "../../components/News/NewsSlider/NewsSlider";
// import Error from "../../components/Error/Error";
// import { error } from "jquery";
// import { IconEye, IconPencil, IconThumbUpFilled } from "@tabler/icons-react";

// const ApiUrl = `${import.meta.env.VITE_REACT_APP_BASE_URL_API_KEY}${
//   Apis.getNews
// }`;

// const getNewsDetails = async (id) => {
//   try {
//     const { data } = await axios.get(`${ApiUrl}/${id}`);
//     // console.log(`${ApiUrl}/${id}`, data);
//     return data;
//   } catch ({ response: { data } }) {
//     // console.log(data);
//     throw data;
//   }
// };

// export default function NewsDetails() {
//   const { t, i18n } = useTranslation();
//   const { User } = useContext(UserContext);

//   const { id } = useParams();
//   const [news, setNews] = useState({
//     data: {},
//     isLoading: true,
//     error: null,
//   });
//   const [isLoadingNews, setIsLoadingNews] = useState(true);

//   const settings = {
//     customPaging: function (i) {
//       return (
//         <span>
//           <img
//             className="img-fluid"
//             src={news?.data.images[i].imageName}
//             alt={news?.title}
//           />
//         </span>
//       );
//     },
//     dots: true,
//     dotsClass: "slick-dots slick-thumb",
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     speed: 1000,
//     autoplaySpeed: 3000,
//     cssEase: "linear",
//     pauseOnHover: true,
//   };

//   useEffect(() => {
//     setIsLoadingNews(true);
//     getNewsDetails(id)
//       .then((res) => {
//         // console.log(res);
//         setNews((prev) => ({
//           ...prev,
//           data: res,
//           isLoading: false,
//         }));

//         setIsLoadingNews(false);
//       })
//       .catch((err) => {
//         // console.log(err);

//         setNews((prev) => ({
//           ...prev,
//           isLoading: false,
//           error: err,
//         }));

//         setIsLoadingNews(false);
//       });
//   }, [id]);

//   // to handle slider package issue # images must be greater than 1
//   if (news?.data?.images?.length == 1) {
//     news.images.push(news.data.images[0].imageName);
//   }
//   // console.log(news?.data.images);

//   return (
//     <>
//       <Helmet>
//         <title>
//           {(news.data == null && t("news.news")) ||
//             (i18n.language == "en" ? news.data.title : news.data.titleAR)}
//         </title>
//         <link rel="icon" href="../../assets/icons/news.svg" />
//       </Helmet>

//       {news.isLoading ? (
//         <LoadingComponent />
//       ) : (
//         <div className="news-details row px-3 justify-content-center mt-4">
//           <div className="col-lg-8">
//             <div
//               className="row pt-5 flex-column justify-content-center align-items-center bg-white shadow-sm rounded-2 p-4 position-relative"
//               style={{ minHeight: "100vh" }}
//             >
//               {news.data.isBreakingNews && (
//                 <div
//                   className="position-absolute d-flex align-items-center top-0 start-0 fs-3 bg-primary p-1 text-dark"
//                   style={{
//                     zIndex: 555,
//                   }}
//                 >
//                   {t("news.isBreaking")}
//                 </div>
//               )}

//               {news.error != null ? (
//                 <Error {...news.error} />
//               ) : (
//                 <>
//                   {isLoadingNews ? (
//                     <LoadingComponent />
//                   ) : (
//                     <>
//                       <div className="col">
//                         <div className="row">
//                           <div className="col-md-6">
//                             <div className="img rounded-1 overflow-hidden">
//                               <img
//                                 src={news.data.coverImage}
//                                 className="w-100"
//                                 alt={`${news.data.title} Image Cover`}
//                               />
//                             </div>
//                           </div>

//                           <div className="col-md-6">
//                             <div className="d-flex flex-column py-3 gap-3">
//                               <div className="d-flex align-items-center">
//                                 <p
//                                   className="m-0 me-3 text-muted pe-4 border-end border-light-subtle border-3"
//                                   style={{ width: "35%" }}
//                                 >
//                                   {t("news.wroteBy")}
//                                 </p>

//                                 <Link
//                                   to={`/news?search.publisherId=${news.data.publisherId}`}
//                                   className="d-flex align-items-center gap-2"
//                                   title="Show Articles By This Author"
//                                 >
//                                   {i18n.language == "en"
//                                     ? news.data.publisher.name
//                                     : news.data.publisher.nameAR}
//                                   <IconPencil size={15} />
//                                 </Link>
//                               </div>

//                               <div className="d-flex align-items-center">
//                                 <p
//                                   className="m-0 me-3 text-muted pe-4 border-end border-light-subtle border-3"
//                                   style={{ width: "35%" }}
//                                 >
//                                   {t("news.tags")}
//                                 </p>

//                                 <div className="">
//                                   <span className="text-dark fw-bolder fs-4">
//                                     #
//                                   </span>
//                                   {news.data.tags
//                                     .split(" ")
//                                     .map((tag, i, arr) => (
//                                       <Link
//                                         key={tag}
//                                         to={`/news?search.tag=${tag}`}
//                                         title={`search for articles with same Tag ${tag}`}
//                                       >
//                                         <span className="fw-bolder">{tag}</span>
//                                         <span className="text-dark">
//                                           {arr.length - 1 != i && "_"}
//                                         </span>
//                                       </Link>
//                                     ))}
//                                 </div>
//                               </div>

//                               <div className="d-flex align-items-center">
//                                 <p
//                                   className="m-0 me-3 text-muted pe-4 border-end border-light-subtle border-3"
//                                   style={{ width: "35%" }}
//                                 >
//                                   {t("news.date")}
//                                 </p>

//                                 <p className="m-0 text-danger fs-3">
//                                   {convertDateTime(news.data.publicationDate)}
//                                 </p>
//                               </div>

//                               <div className="d-flex align-items-center text-primary">
//                                 <p
//                                   className="m-0 me-3 text-muted pe-4 border-end border-light-subtle border-3"
//                                   style={{ width: "35%" }}
//                                 >
//                                   {t("misc.likes")}
//                                 </p>

//                                 <div className="d-flex align-items-center gap-1">
//                                   <span className="fs-3">
//                                     {news.data.likes}
//                                   </span>
//                                   <IconThumbUpFilled size={15} />
//                                 </div>
//                               </div>

//                               <div className="d-flex align-items-center text-primary">
//                                 <p
//                                   className="m-0 me-3 text-muted pe-4 border-end border-light-subtle border-3"
//                                   style={{ width: "35%" }}
//                                 >
//                                   {t("misc.views")}
//                                 </p>

//                                 <div className="d-flex align-items-center gap-1">
//                                   <span className="fs-3">
//                                     {news.data.views}
//                                   </span>
//                                   <IconEye size={15} />
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="text-primary p-2 px-5">
//                         <hr className="border border-primary border-3 opacity-25" />
//                       </div>

//                       <div className="col py-3">
//                         <h1 className="post-title h4 text-center text-capitalize">
//                           {i18n.language == "en"
//                             ? news.data.title
//                             : news.data.titleAR}
//                         </h1>

//                         <div className="text-primary mx-auto opacity-25">
//                           <hr />
//                         </div>

//                         <div className="post-body">
//                           <p className="">
//                             {i18n.language == "en"
//                               ? news.data.content
//                               : news.data.contentAR}
//                           </p>
//                         </div>
//                       </div>

//                       {news.data.images.length > 0 && (
//                         <div className="col-10 col-md-8 col-lg-6">
//                           <Slider
//                             {...settings}
//                             pauseOnHover={true}
//                             className="images-slider mb-5"
//                             style={{ height: "300px" }}
//                           >
//                             {news?.data.images?.map(({ imageName }, index) => (
//                               <div key={index} className="slide">
//                                 <img
//                                   className={`img-fluid w-100`}
//                                   src={imageName}
//                                   alt={news.data.title}
//                                 />
//                               </div>
//                             ))}
//                           </Slider>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//           <div className="col-lg-4 mt-5 mt-lg-0 position-relative">
//             <div className="row">
//               {User?.code && (
//                 <div className="col-12 col-sm-9 col-md-6 col-lg-12 mt-4">
//                   <ProfileCard t={t} i18n={i18n} {...User} />
//                 </div>
//               )}

//               <div
//                 className={`col-12 col-sm-9 col-md-6 col-lg-12 ${
//                   User?.code && " mt-4"
//                 }`}
//               >
//                 <div className="news-slider bg-white shadow-sm rounded-2">
//                   <NewsSlider t={t} i18n={i18n} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }