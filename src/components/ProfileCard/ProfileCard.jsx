import { Link } from "react-router-dom";
import { IconMail } from "@tabler/icons-react";
import axios from "axios";
import Apis from "./../../Api.json";
import { useQuery } from "react-query";
import Error from "../Error/Error";
import LoadingComponent from "../loading/Loading";
import { useContext } from "react";
import UserContext from "../../contexts/UserContextProvider";

const ApiUrl = `${import.meta.env.VITE_REACT_APP_BASE_URL_API_KEY}${
  Apis.profile
}`;

export const getProfileData = async (api, token) => {
  try {
    const response = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(response);

    return response.data;
  } catch ({ response: { data } }) {
    throw data;
  }
};

export default function ProfileCard({ token, t, i18n, profilePage = false }) {
  // console.log(token);
  const { User, updateUser } = useContext(UserContext);

  const { data, isLoading, error, isError } = useQuery(
    `profileData:${token}`,
    (_) => getProfileData(ApiUrl, token),
    {
      staleTime: 60 * 60 * 60,
      onSuccess: (data) => {
        updateUser({ ...User, imageName: data.user.imageName });
      },
    }
  );

  // console.log(data);

  return (
    <div className="card card-profile placeholder-glow position-relative">
      {isLoading ? (
        <LoadingComponent />
      ) : isError ? (
        <Error {...error} />
      ) : (
        <>
          <div
            className={`card-avatar shadow-lg img-thumbnail rounded-circle ${
              data.user.imageName ? "" : "placeholder"
            }`}
          >
            <div className="">
              <img className="w-100" src={data.user.imageName} />
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex gap-3 mb-3 align-items-center justify-content-center">
              <Link
                to={`/profile`}
                className={`${profilePage && "text-muted"}`}
              >
                <span className="text-muted">@</span>
                {data.code}
              </Link>

              <span className="badge text-bg-dark bg-opacity-50 mw-fit-content fs-3">
                {t(`profile.level_${data.level}`)}
              </span>
            </div>

            <h2 className="card-title fs-6 fw-normal mb-3 text-capitalize">
              {i18n.language == "ar" ? data.nameAR : data.name}
            </h2>

            <div className="d-flex justify-content-center align-items-center gap-1 my-2 text-muted">
              <IconMail size={20} />
              {data.user.academicEmail}
            </div>
            {!profilePage ? (
              <>
                <Link to={`/profile`} className="btn btn-primary w-50 mt-4">
                  {t("misc.My Profile")}
                </Link>
              </>
            ) : (
              <>
                <Link to={`/`} className="btn btn-primary w-50 mt-4">
                  {t("misc.Home")}
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
